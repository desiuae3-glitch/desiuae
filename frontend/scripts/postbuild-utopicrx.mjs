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

const mockup404 = join(dist, "utopicrx-mockup", "404.html");
const dist404 = join(dist, "404.html");
if (existsSync(mockup404)) {
  copyFileSync(mockup404, dist404);
  console.log("postbuild-utopicrx: dist/404.html set from mockup 404 page");
}

for (const file of ["sitemap.xml", "robots.txt", "llms.txt"]) {
  const rootFile = join(dist, file);
  if (!existsSync(rootFile)) {
    console.error(`postbuild-utopicrx: missing ${file} in dist output`);
    process.exit(1);
  }
  console.log(`postbuild-utopicrx: ${file} present at dist/${file}`);
}
