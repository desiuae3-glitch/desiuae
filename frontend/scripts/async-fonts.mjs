// Makes the Google Fonts stylesheet non-render-blocking on every mockup page.
// Pattern: preload + media="print" swap, with a <noscript> fallback.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".html")) out.push(p);
  }
  return out;
}

const RE = /<link href="(https:\/\/fonts\.googleapis\.com\/css2[^"]+)" rel="stylesheet">/;
let n = 0;

for (const f of walk("public/utopicrx-mockup")) {
  let html = readFileSync(f, "utf8");
  if (html.includes(`onload="this.media`)) continue; // already async
  const m = html.match(RE);
  if (!m) continue;
  const url = m[1];
  const block = [
    `<link rel="preload" as="style" href="${url}">`,
    `<link href="${url}" rel="stylesheet" media="print" onload="this.media='all'">`,
    `<noscript><link href="${url}" rel="stylesheet"></noscript>`,
  ].join("\n");
  html = html.replace(RE, block);
  writeFileSync(f, html);
  n++;
  console.log("async fonts:", f);
}

console.log(`\n${n} files updated`);
