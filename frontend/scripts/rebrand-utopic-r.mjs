/**
 * Rebrand live mockup: Utopic RX product → Utopic R (799 AED base lock).
 * Keeps utopicrx.com domain, utopic-rx.html URL, and accessory AED prices.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const MOCKUP = join(import.meta.dirname, "..", "public", "utopicrx-mockup");
const SCRIPTS = join(import.meta.dirname);
const EXTRA = [
  join(import.meta.dirname, "..", "public", "sitemap.xml"),
  join(import.meta.dirname, "..", "public", "utopicrx-mockup", "llms.txt"),
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (/\.(html|txt|xml|mjs)$/.test(name)) files.push(p);
  }
  return files;
}

const LOCK_PRICE_REPLACEMENTS = [
  [/\bBASE=699\b/g, "BASE=799"],
  [/"price":\s*"699"/g, '"price": "799"'],
  [/price:\s*"699"/g, 'price: "799"'],
  [/<div class="cb-price">699 /g, '<div class="cb-price">799 '],
  [/<div class="p-price">699 AED/g, '<div class="p-price">799 AED'],
  [/<span class="total-price" id="totalPrice">699 /g, '<span class="total-price" id="totalPrice">799 '],
  [/699 AED, free Dubai install/g, "799 AED, free Dubai install"],
  [/699 AED incl/g, "799 AED incl"],
  [/from 699 AED/g, "from 799 AED"],
  [/>\s*699\s*<span class="cur">AED<\/span>/g, '>799 <span class="cur">AED</span>'],
];

function rebrandContent(html) {
  const guards = [];
  const guard = (re, token) => {
    html = html.replace(re, (m) => {
      guards.push({ token, value: m });
      return token;
    });
  };

  guard(/utopicrx\.com/gi, "__GUARD_DOMAIN__");
  guard(/utopic-rx\.html/gi, "__GUARD_PRODUCT_URL__");
  guard(/utopicrx-mockup/gi, "__GUARD_MOCKUP__");
  guard(/support@utopicrx\.com/gi, "__GUARD_EMAIL__");
  guard(/utopic-rx-logo/gi, "__GUARD_LOGO__");
  guard(/\/utopicrx\//gi, "__GUARD_ASSET__");
  guard(/UTOPIC-RX/g, "__GUARD_SKU__");

  // Brand: product name only (domain/email paths protected)
  html = html.replace(/UTOPIC\s+<span>RX<\/span>/g, "UTOPIC <span>R</span>");
  html = html.replace(/Utopic RXe/g, "Utopic RXe"); // no-op safeguard
  html = html.replace(/Utopic RX/g, "Utopic R");
  html = html.replace(/UTOPIC RX/g, "UTOPIC R");

  html = html.replace(
    /https:\/\/en\.desi\.com\.tr\/desi-utopic-rx-smart-lock-europrofile/g,
    "https://en.desi.com.tr/desi-utopic-r-smart-lock-iosandroid-compatible-euro-profile"
  );

  html = html.replace(/sku":\s*"UTOPIC-RX"/g, 'sku": "UTOPIC-R"');
  html = html.replace(/__GUARD_SKU__/g, "UTOPIC-RX"); // restore filename refs if any

  for (const [re, rep] of LOCK_PRICE_REPLACEMENTS) {
    html = html.replace(re, rep);
  }

  // Restore guards
  for (const { token, value } of guards) {
    html = html.split(token).join(value);
  }

  return html;
}

const files = [
  ...walk(MOCKUP),
  join(SCRIPTS, "apply-seo-fixes.mjs"),
  join(SCRIPTS, "add-product-breadcrumb-schema.mjs"),
  ...EXTRA.filter((p) => {
    try {
      statSync(p);
      return true;
    } catch {
      return false;
    }
  }),
];

let changed = 0;
for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const next = rebrandContent(raw);
  if (next !== raw) {
    writeFileSync(file, next);
    changed++;
    console.log("updated", relative(join(import.meta.dirname, ".."), file));
  }
}
console.log(`Done. ${changed} file(s) updated.`);
