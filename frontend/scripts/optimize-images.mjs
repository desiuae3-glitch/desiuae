// Converts heavy PNG/JPG/GIF assets referenced by the mockup pages to WebP
// and rewrites the references. Keeps originals on disk (og:image and any
// external consumers still point at them). Idempotent: skips work already done.
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import sharp from "sharp";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname.slice(1)), "..");
const PUBLIC = join(ROOT, "public");
const MOCKUP = join(PUBLIC, "utopicrx-mockup");

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".html")) out.push(p);
  }
  return out;
}

const htmlFiles = walk(MOCKUP);

// Collect relative asset refs (skip absolute https URLs used by og:image).
const REF_RE = /(?:\.\.\/)+utopicrx\/desi-assets\/[^"'`\s)]+\.(?:png|jpe?g|gif)/g;
const refs = new Set();
for (const f of htmlFiles) {
  const html = readFileSync(f, "utf8");
  for (const m of html.match(REF_RE) ?? []) refs.add(m.replace(/^(\.\.\/)+/, ""));
}

const MIN_BYTES = 30 * 1024; // don't bother with tiny files
const converted = new Map(); // rel path -> savings

for (const rel of refs) {
  const src = join(PUBLIC, rel);
  if (!existsSync(src)) {
    console.log("MISSING:", rel);
    continue;
  }
  const origSize = statSync(src).size;
  if (origSize < MIN_BYTES) continue;

  const out = src.replace(/\.(png|jpe?g|gif)$/i, ".webp");
  const isGif = /\.gif$/i.test(src);
  if (!existsSync(out)) {
    const img = sharp(src, { animated: isGif, limitInputPixels: false });
    await img.webp({ quality: isGif ? 72 : 80, effort: 5 }).toFile(out);
  }
  const newSize = statSync(out).size;
  if (newSize >= origSize * 0.9) {
    console.log("SKIP (no gain):", rel, `${Math.round(origSize / 1024)}KB -> ${Math.round(newSize / 1024)}KB`);
    continue;
  }
  converted.set(rel, { origSize, newSize });
  console.log(
    "webp:",
    rel,
    `${Math.round(origSize / 1024)}KB -> ${Math.round(newSize / 1024)}KB`,
  );
}

// Rewrite refs in HTML (src=, poster=, JS arrays — anything relative).
let totalSaved = 0;
for (const { origSize, newSize } of converted.values()) totalSaved += origSize - newSize;

for (const f of htmlFiles) {
  let html = readFileSync(f, "utf8");
  const before = html;
  html = html.replace(REF_RE, (m) => {
    const rel = m.replace(/^(\.\.\/)+/, "");
    if (!converted.has(rel)) return m;
    return m.replace(/\.(png|jpe?g|gif)$/i, ".webp");
  });
  if (html !== before) {
    writeFileSync(f, html);
    console.log("refs updated:", f.slice(PUBLIC.length + 1));
  }
}

console.log(`\nTotal saved: ${Math.round(totalSaved / 1024)} KB across ${converted.size} images`);
