import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "public");

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
  t = t.replace(/Buyer\u2014s/g, "Buyer&rsquo;s");
  return t;
}

let n = 0;
for (const dir of ["utopicrx-mockup", "utopicrx"]) {
  const base = join(ROOT, dir);
  if (!statSync(base).isDirectory()) continue;
  for (const file of walk(base)) {
    const before = readFileSync(file, "utf8");
    const after = fixMetaEntities(before);
    if (after !== before) {
      writeFileSync(file, after, "utf8");
      n++;
      console.log(file);
    }
  }
}
console.log(`fix-meta-entities: ${n} files`);
