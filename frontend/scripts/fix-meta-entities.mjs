import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const useDist = process.argv.includes("--dist");
const ROOT = useDist
  ? join(import.meta.dirname, "..", "dist")
  : join(import.meta.dirname, "..", "public");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function fixMetaEntities(text) {
  let t = text;
  t = t.replace(/content="([^"]*)\u2014([^"]*)"/g, (_, a, c) => `content="${a}&mdash;${c}"`);
  t = t.replace(/content="([^"]*)\u2013([^"]*)"/g, (_, a, c) => `content="${a}&ndash;${c}"`);
  t = t.replace(/<title>([^<]*)\u2014([^<]*)<\/title>/g, (_, a, c) => `<title>${a}&mdash;${c}</title>`);
  t = t.replace(/Buyer\u2014s/g, "Buyer&rsquo;s");
  t = t.replace(/â€"/g, "&mdash;");
  // HTML entities decode in static markup only — not in <script> (textContent shows &mdash; literally)
  t = t.split(/(<script[\s\S]*?<\/script>)/gi).map((part) => {
    if (/^<script/i.test(part)) return part;
    return part.replace(/\uFFFD/g, "&mdash;");
  }).join("");
  return t;
}

const targets = useDist
  ? walk(ROOT)
  : [...walk(join(ROOT, "utopicrx-mockup")), ...walk(join(ROOT, "utopicrx"))];

let n = 0;
for (const file of targets) {
  const before = readFileSync(file, "utf8");
  const after = fixMetaEntities(before);
  if (after !== before) {
    writeFileSync(file, after, "utf8");
    n++;
    console.log(file);
  }
}
console.log(`fix-meta-entities${useDist ? " (dist)" : ""}: ${n} files`);
