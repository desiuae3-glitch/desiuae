import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

for (const f of walk("public/utopicrx-mockup")) {
  let t = readFileSync(f, "utf8");
  const o = t;
  t = t.split('href="../index.html#').join('href="/#');
  t = t.split('href="../index.html"').join('href="/"');
  if (t !== o) {
    writeFileSync(f, t);
    console.log("links fixed:", f);
  }
}
console.log("done");
