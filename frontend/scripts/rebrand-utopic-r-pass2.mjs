/** Second-pass fixes after Utopic R rebrand */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(import.meta.dirname, "..", "public", "utopicrx-mockup");

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (/\.(html|txt)$/.test(name)) files.push(p);
  }
  return files;
}

const ORG_OLD =
  "Authorized UAE and GCC retailer and distributor of DESi Utopic R smart locks — no-drill retrofit smart locks for euro-profile cylinder doors. Not affiliated with medical or pharmaceutical products.";
const ORG_NEW =
  "Authorized UAE and GCC retailer and distributor of DESi Utopic R smart locks for euro-profile cylinder doors. Not affiliated with medical or pharmaceutical products.";

const REL_OLD = `<a class="rel-card" href="utopic-rx.html"><div class="img"><img src="../../utopicrx/desi-assets/products/desi-utopic-rx-smart-lock-europrofile-smart-locks-169-67-K.webp" alt=""></div><div class="body"><h3>Utopic R Lock`;
const REL_NEW = `<a class="rel-card" href="utopic-rx.html"><div class="img"><img src="../../utopicrx/desi-assets/products/utopic-r-main.png" alt=""></div><div class="body"><h3>Utopic R Lock`;

let n = 0;
for (const file of walk(ROOT)) {
  let html = readFileSync(file, "utf8");
  const orig = html;
  html = html.split(ORG_OLD).join(ORG_NEW);
  html = html.split(REL_OLD).join(REL_NEW);
  html = html.replace(/Utopic R Lock \(required\)<\/h3><div class="price">699 AED/g, 'Utopic R Lock (required)</h3><div class="price">799 AED');
  html = html.replace(/<h3>Utopic R Lock<\/h3><div class="price">699 AED/g, '<h3>Utopic R Lock</h3><div class="price">799 AED');
  html = html.replace(/View Utopic R &mdash; 699 AED/g, "View Utopic R &mdash; 799 AED");
  html = html.replace(/Shop Utopic R &mdash; 699 AED/g, "Shop Utopic R &mdash; 799 AED");
  if (html !== orig) {
    writeFileSync(file, html);
    n++;
    console.log(relative(join(import.meta.dirname, ".."), file));
  }
}

// llms.txt
const llms = join(ROOT, "llms.txt");
let t = readFileSync(llms, "utf8");
t = t.replace(
  /no-drill,\s*euro-profile retrofit lock[^\n]*/i,
  "compact euro-profile cylinder smart lock for UAE & GCC"
);
t = t.replace(/699 AED, euro-profile retrofit, 37 users, 6-month battery/, "799 AED, euro-profile cylinder, 37 users, rechargeable battery");
writeFileSync(llms, t);

// FAQ schema in index.html
const indexPath = join(ROOT, "index.html");
let idx = readFileSync(indexPath, "utf8");
idx = idx.replace(
  /The patented design even lets you open from outside when another key is already inserted inside &mdash; no other smart lock offers this\./g,
  "Five keys are included in the box. Your physical key works even when the battery is completely flat."
);
idx = idx.replace(
  /Zero damage\. Mounts on the existing cylinder\. Remove it and the door is completely original\. Perfect for rentals\./g,
  "No extra holes. Installed like replacing a standard euro cylinder barrel."
);
idx = idx.replace(
  /~6 months per charge via USB-C\./g,
  "About 1.5&ndash;2.5 months per charge via Micro USB."
);
writeFileSync(indexPath, idx);

console.log(`Patched ${n} files + index FAQ schema + llms.txt`);
