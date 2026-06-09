import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const dist = join(root, "dist");
const distIndex = join(dist, "index.html");
const mockupIndex = join(dist, "utopicrx-mockup", "index.html");

if (!existsSync(mockupIndex)) {
  console.error("postbuild-utopicrx: mockup index not found at", mockupIndex);
  process.exit(1);
}

copyFileSync(mockupIndex, distIndex);
console.log("postbuild-utopicrx: dist/index.html set to Utopic RX homepage");

for (const file of ["sitemap.xml", "robots.txt"]) {
  const src = join(dist, file);
  if (!existsSync(src)) {
    console.error(`postbuild-utopicrx: missing ${file} in dist output`);
    process.exit(1);
  }
  console.log(`postbuild-utopicrx: ${file} present at dist/${file}`);
}
