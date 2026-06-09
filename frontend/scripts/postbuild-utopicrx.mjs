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
  const root = join(dist, file);
  const mockup = join(dist, "utopicrx-mockup", file);
  if (!existsSync(root)) {
    console.error(`postbuild-utopicrx: missing ${file} in dist output`);
    process.exit(1);
  }
  if (!existsSync(mockup)) {
    console.error(`postbuild-utopicrx: missing utopicrx-mockup/${file} in dist output`);
    process.exit(1);
  }
  console.log(`postbuild-utopicrx: ${file} present at dist/${file} and dist/utopicrx-mockup/${file}`);
}
