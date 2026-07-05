import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const MOCKUP = join(import.meta.dirname, "..", "public", "utopicrx-mockup");
const PUBLIC = join(import.meta.dirname, "..", "public");

function walkHtml(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkHtml(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function fixEncoding(text) {
  let t = text;
  const pairs = [
    ["Utopic R UAE ? DESi Smart Locks", "Utopic R UAE — DESi Smart Locks"],
    ["Utopic R ? DESi Smart Locks UAE & GCC", "Utopic R — DESi Smart Locks UAE & GCC"],
    ["Utopic R smart lock ? one", "Utopic R smart lock — one"],
    ["Products ? Utopic R System", "Products | Utopic R System"],
    ["Utopic R Smart Lock ? Full Specs", "Utopic R Smart Lock — Full Specs"],
    ["buyer?s", "buyer&rsquo;s"],
    ["Buyer?s", "Buyer&rsquo;s"],
    ["Yes ? if", "Yes — if"],
    ["closes ? wireless", "closes — wireless"],
    ["products ? lock", "products — lock"],
    ["Pocket remote ? 50m", "Pocket remote — 50m"],
    ["Wireless mount ? PIN keypad backup ? Face reader", "Wireless mount · PIN keypad backup · Face reader"],
    ["Utopic R ? minimal design", "Utopic R — minimal design"],
    ["Rechargeable ? Micro USB", "Rechargeable · Micro USB"],
    ["15?360 sec", "15–360 sec"],
    ["seconds ? or on a schedule", "seconds — or on a schedule"],
    ["DESi Utopic ? face recognition", "Utopic — face recognition"],
    ["Mon?Sat 9am?7pm", "Mon–Sat 9am–7pm"],
    ["4? AA", "4× AA"],
    ["4×AA", "4× AA"],
    ["close ? triggers", "close → triggers"],
    ["Learn more ?", "Learn more →"],
    ["T?rkiye", "T&uuml;rkiye"],
    ["?? No Damage", "✓ No Damage"],
    ["?? Free UAE Delivery", "✓ Free UAE Delivery"],
    ["?? Key Always Works", "✓ Key Always Works"],
    ["???? Made in T&uuml;rkiye", "🇹🇷 Made in T&uuml;rkiye"],
    ["???? Made in Türkiye", "🇹🇷 Made in Türkiye"],
    ["?? Face Scan", "✓ Face Scan"],
    ["?? Fingerprint", "✓ Fingerprint"],
    ["?? Mobile App", "✓ Mobile App"],
    ["??</div>WhatsApp", "✓</div>WhatsApp"],
    ["Sending?", "Sending…"],
    ["Thanks ? we", "Thanks — we"],
    ["`  + ${a.name} ? ${q}`", "`  + ${a.name} × ${q}`"],
    ["`${qty}? base lock`", "`${qty}× base lock`"],
    ["`${qty}? lock +", "`${qty}× lock +"],
    ["`? Utopic R Lock ? ${qty}`", "`• Utopic R Lock × ${qty}`"],
    ["||'?'", "||'—'"],
    ["T&uuml;rkiye ? UAE", "T&uuml;rkiye · UAE"],
    ["June 2026 ? utopicrx.com", "June 2026 · utopicrx.com"],
  ];
  for (const [from, to] of pairs) t = t.split(from).join(to);
  t = t.replace(/\uFFFD/g, "—");
  return t;
}

function removeKeywordFooters(text) {
  return text.replace(
    /<p class="content-note">Keywords:[\s\S]*?<\/p>\s*/g,
    ""
  );
}

function fixProductIndexLinks(text) {
  const map = {
    'href="utopic-rx.html"': 'href="/products/utopic-rx.html"',
    'href="fingerprint-reader.html"': 'href="/products/fingerprint-reader.html"',
    'href="face-reader.html"': 'href="/products/face-reader.html"',
    'href="wifi-bridge.html"': 'href="/products/wifi-bridge.html"',
    'href="smart-home-interface.html"': 'href="/products/smart-home-interface.html"',
    'href="remote-controller.html"': 'href="/products/remote-controller.html"',
    'href="door-sensor.html"': 'href="/products/door-sensor.html"',
  };
  let t = text;
  for (const [from, to] of Object.entries(map)) t = t.split(from).join(to);
  return t;
}

const PRODUCT_SCHEMA = {
  "face-reader.html": {
    name: "Face Recognition + Touch Keypad",
    description:
      "3D face recognition and touch keypad accessory for Utopic R. 100 faces, PIN backup, AES-256 GCM wireless. Wall mount.",
    image:
      "https://utopicrx.com/utopicrx/desi-assets/products/desi-utopic-rx-rxe-compatible-face-reader-and-wireless-touch-keypad-accessories-283-81-O.webp",
    price: "602",
    url: "https://utopicrx.com/products/face-reader.html",
  },
  "fingerprint-reader.html": {
    name: "Fingerprint Reader + Touch Keypad V3",
    description:
      "500 DPI fingerprint reader and touch keypad for Utopic R. 100 fingerprints, PIN backup, wireless wall mount.",
    image:
      "https://utopicrx.com/utopicrx/desi-assets/products/desi-utopic-rx-rxe-compatible-fingerprint-reader-and-wireless-touch-keypad-v3-accessories-344-74-O.webp",
    price: "602",
    url: "https://utopicrx.com/products/fingerprint-reader.html",
  },
  "wifi-bridge.html": {
    name: "WiFi Bridge Hub",
    description:
      "WiFi bridge for Utopic R remote access, Alexa, Google Home, and Home Assistant. Manages up to 4 locks.",
    image:
      "https://utopicrx.com/utopicrx/desi-assets/products/desi-utopic-series-compatible-wifi-bridge-hub-accessories-338-45-O.webp",
    price: "228",
    url: "https://utopicrx.com/products/wifi-bridge.html",
  },
  "door-sensor.html": {
    name: "Door Sensor + Auto Lock V3BL",
    description:
      "Wireless door sensor that triggers auto-lock when the door closes. Adhesive mount for Utopic R.",
    image:
      "https://utopicrx.com/utopicrx/desi-assets/products/desi-utopic-door-sensor-auto-lock-module-accessories-384-92-O.jpg",
    price: "81",
    url: "https://utopicrx.com/products/door-sensor.html",
  },
  "remote-controller.html": {
    name: "Wireless Remote Controller V2BL",
    description:
      "Pocket remote for Utopic R. 50m range, rolling code AES encryption, 3-year CR2032 battery.",
    image:
      "https://utopicrx.com/utopicrx/desi-assets/products/desi-utopic-rx-rxe-wireless-remote-controller-v2bl-accessories-383-93-O.jpg",
    price: "81",
    url: "https://utopicrx.com/products/remote-controller.html",
  },
};

function productSchemaBlock(p) {
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": ${JSON.stringify(p.name)},
  "description": ${JSON.stringify(p.description)},
  "brand": {"@type": "Brand", "name": "DESi"},
  "image": ${JSON.stringify(p.image)},
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AED",
    "price": ${JSON.stringify(p.price)},
    "availability": "https://schema.org/InStock",
    "url": ${JSON.stringify(p.url)},
    "seller": {"@type": "Organization", "name": "Utopic R UAE"}
  }
}
</script>`;
}

function addProductSchema(text, fileName) {
  const p = PRODUCT_SCHEMA[fileName];
  if (!p || text.includes('"@type": "Product"')) return text;
  const block = productSchemaBlock(p);
  return text.replace("</head>", `${block}\n</head>`);
}

function articleToBlogPosting(text) {
  return text.replace(
    /"@type":\s*"Article"/g,
    '"@type": "BlogPosting"'
  );
}

function addOrgSameAs(text) {
  if (!text.includes('"@id": "https://utopicrx.com/#organization"')) return text;
  if (text.includes('"sameAs": [')) return text;
  return text.replace(
    /("@type": "Organization"[\s\S]*?"contactPoint": \{[\s\S]*?\}\s*\})/,
    (m) =>
      m.replace(
        /(\s*\})\s*$/,
        `,
      "sameAs": [
        "https://www.instagram.com/desismartlock/",
        "https://www.youtube.com/user/desialarmsecurity"
      ]$1`
      )
  );
}

// Remove duplicate face reader video card (keep Face Recognition & Keypad, drop Wireless Face Recognition duplicate)
function dedupeFaceVideos(text) {
  if (!text.includes('HDLMe3ESSvI')) return text;
  return text.replace(
    /\s*<button class="vc" onclick="playV\(this,'HDLMe3ESSvI'\)"[\s\S]*?<\/button>/,
    ""
  );
}

const files = walkHtml(MOCKUP);
for (const file of files) {
  let t = readFileSync(file, "utf8");
  t = fixEncoding(t);
  t = removeKeywordFooters(t);
  if (file.endsWith("products\\index.html") || file.endsWith("products/index.html")) {
    t = fixProductIndexLinks(t);
  }
  if (file.includes("\\products\\") || file.includes("/products/")) {
    const base = file.split(/[/\\]/).pop();
    t = addProductSchema(t, base);
  }
  if (file.includes("\\blog\\") || file.includes("/blog/")) {
    t = articleToBlogPosting(t);
  }
  if (file.endsWith("index.html") && !file.includes("products")) {
    t = addOrgSameAs(t);
    t = dedupeFaceVideos(t);
  }
  writeFileSync(file, t, "utf8");
}

// privacy.html encoding
const privacy = join(PUBLIC, "utopicrx", "privacy.html");
if (statSync(privacy).isFile()) {
  writeFileSync(privacy, fixEncoding(readFileSync(privacy, "utf8")), "utf8");
}

// llms.txt
writeFileSync(
  join(PUBLIC, "llms.txt"),
  `# Utopic R — Smart Lock for UAE & GCC

> Utopic R is a euro-profile smart lock sold in the UAE by an authorized distributor. Installs in under 5 minutes on any euro-cylinder door without drilling. Renter-friendly and fully removable.

## Products
- [Utopic R Smart Lock](https://utopicrx.com/products/utopic-rx.html): 799 AED. Euro-profile retrofit, 37 users, rechargeable battery, app control, optional face/fingerprint readers.
- [Face Reader + Keypad](https://utopicrx.com/products/face-reader.html): 602 AED add-on.
- [Fingerprint Reader V3](https://utopicrx.com/products/fingerprint-reader.html): 602 AED add-on.
- [WiFi Bridge Hub](https://utopicrx.com/products/wifi-bridge.html): 228 AED add-on. Enables remote access, Alexa, Google Home.

## Guides
- [Smart Lock for Rented Apartments Dubai](https://utopicrx.com/blog/smart-lock-rented-apartment-dubai)
- [Buyer's Guide 2026](https://utopicrx.com/blog/smart-lock-buyers-guide-dubai-2026)
- [DESi vs Nuki UAE](https://utopicrx.com/compare/desi-vs-nuki)
- [Airbnb & Holiday Homes Dubai](https://utopicrx.com/airbnb-smart-lock-dubai)

## Contact
- WhatsApp: +971526187729
- Email: support@utopicrx.com
- Free installation in Dubai & Sharjah. Ships to all UAE & GCC.
`,
  "utf8"
);

// robots.txt — add llms.txt reference
const robotsPath = join(PUBLIC, "robots.txt");
let robots = readFileSync(robotsPath, "utf8");
if (!robots.includes("llms.txt")) {
  robots = robots.replace(
    "Sitemap: https://utopicrx.com/sitemap.xml",
    "Sitemap: https://utopicrx.com/sitemap.xml\n\n# LLM / AI crawlers\n# https://utopicrx.com/llms.txt"
  );
  writeFileSync(robotsPath, robots, "utf8");
}

console.log(`seo-audit-fixes: processed ${files.length} HTML files`);
