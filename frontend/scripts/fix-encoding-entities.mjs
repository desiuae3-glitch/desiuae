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

function fix(text) {
  let t = text;
  // Mojibake from UTF-8 em dash misread as Latin-1
  t = t.replace(/â€"/g, "&mdash;");
  t = t.replace(/â€“/g, "&ndash;");
  t = t.replace(/ï¿½/g, "&mdash;");
  t = t.replace(/\uFFFD/g, "&mdash;");

  // Raw Unicode dashes in HTML (keep &mdash; in attributes safe)
  t = t.replace(/([\d])—([\d])/g, "$1&ndash;$2"); // ranges like 15—360
  t = t.replace(/4—\s*AA/g, "4&times; AA");
  t = t.replace(/4—AA/g, "4&times; AA");
  t = t.replace(/T—rkiye/g, "T&uuml;rkiye");
  t = t.replace(/Türkiye/g, "T&uuml;rkiye");

  // Broken emoji placeholders on homepage
  t = t.replace("???? Made in T&uuml;rkiye", "Made in T&uuml;rkiye");
  t = t.replace('<div class="promo-ico">??</div>\n      <strong>Cash on Delivery</strong>', '<div class="promo-ico" aria-hidden="true">&#128179;</div>\n      <strong>Cash on Delivery</strong>');
  t = t.replace('<div class="promo-ico">??</div>\n      <strong>Free Installation*</strong>', '<div class="promo-ico" aria-hidden="true">&#128736;</div>\n      <strong>Free Installation*</strong>');
  t = t.replace('<div class="promo-ico">???</div>\n      <strong>2-Year Warranty</strong>', '<div class="promo-ico" aria-hidden="true">&#9989;</div>\n      <strong>2-Year Warranty</strong>');
  t = t.replace('<div class="qt-ico">??</div>Free delivery', '<div class="qt-ico" aria-hidden="true">&#128666;</div>Free delivery');
  t = t.replace('<div class="qt-ico">??</div>Free installation', '<div class="qt-ico" aria-hidden="true">&#128736;</div>Free installation');
  t = t.replace('<div class="qt-ico">??</div>Cash on Delivery', '<div class="qt-ico" aria-hidden="true">&#128179;</div>Cash on Delivery');
  t = t.replace('<div class="qt-ico">???</div>2-year manufacturer', '<div class="qt-ico" aria-hidden="true">&#9989;</div>2-year manufacturer');
  t = t.replace('<div class="qt-ico">??</div>7-day returns', '<div class="qt-ico" aria-hidden="true">&#128230;</div>7-day returns');
  t = t.replace('<div class="qt-ico">??</div>WhatsApp support', '<div class="qt-ico" aria-hidden="true">&#128172;</div>WhatsApp support');

  // Stray ? used as arrow
  t = t.replace(/Full specs &amp; FAQ \?/g, "Full specs &amp; FAQ &rarr;");
  t = t.replace(/View product \?/g, "View product &rarr;");
  t = t.replace(/Not Sure\? Ask Us \?/g, "Not Sure? Ask Us &rarr;");
  t = t.replace(/Get Quote \?/g, "Get Quote &rarr;");
  t = t.replace(/Learn more \?/g, "Learn more &rarr;");

  // Product links → absolute /products/ paths
  const linkFixes = [
    ['href="products/', 'href="/products/'],
    ['href="utopic-rx.html"', 'href="/products/utopic-rx.html"'],
    ['href="fingerprint-reader.html"', 'href="/products/fingerprint-reader.html"'],
    ['href="face-reader.html"', 'href="/products/face-reader.html"'],
    ['href="wifi-bridge.html"', 'href="/products/wifi-bridge.html"'],
    ['href="door-sensor.html"', 'href="/products/door-sensor.html"'],
    ['href="remote-controller.html"', 'href="/products/remote-controller.html"'],
    ['href="smart-home-interface.html"', 'href="/products/smart-home-interface.html"'],
    ['href="auto-lock-module.html"', 'href="/products/auto-lock-module.html"'],
    ['href="faq.html"', 'href="/faq"'],
  ];
  for (const [from, to] of linkFixes) t = t.split(from).join(to);

  // Cache bust
  t = t.replace(/\?v=20260610/g, "?v=20260705");

  return t;
}

const dirs = [join(ROOT, "utopicrx-mockup"), join(ROOT, "utopicrx")];
let n = 0;
for (const dir of dirs) {
  if (!statSync(dir).isDirectory()) continue;
  for (const file of walk(dir)) {
    const before = readFileSync(file, "utf8");
    const after = fix(before);
    if (after !== before) {
      writeFileSync(file, after, "utf8");
      n++;
      console.log("fixed:", file.replace(ROOT + "\\", "").replace(ROOT + "/", ""));
    }
  }
}
console.log(`fix-encoding-entities: updated ${n} files`);
