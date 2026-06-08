import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const distIndex = join(root, "dist", "index.html");
const mockupIndex = join(root, "dist", "utopicrx-mockup", "index.html");

if (!existsSync(mockupIndex)) {
  console.error("postbuild-utopicrx: mockup index not found at", mockupIndex);
  process.exit(1);
}

copyFileSync(mockupIndex, distIndex);
console.log("postbuild-utopicrx: dist/index.html set to Utopic RX homepage");
