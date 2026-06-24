import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "public", "utopicrx-mockup");

const OFFER_EXTRAS = {
  shippingDetails: {
    "@type": "OfferShippingDetails",
    shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "AED" },
    shippingDestination: { "@type": "DefinedRegion", addressCountry: "AE" },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 2, unitCode: "DAY" },
      transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 4, unitCode: "DAY" },
    },
  },
  hasMerchantReturnPolicy: {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "AE",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 7,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
  },
};

const ACCESSORIES = {
  "face-reader.html": {
    name: "DESi Face Recognition + Touch Keypad",
    description:
      "3D face recognition reader with touch keypad for Utopic R. 100 faces, PIN backup, AES-256 GCM wireless. Wall mount, no cables.",
    image: "https://utopicrx.com/utopicrx/desi-assets/products/desi-utopic-rx-rxe-compatible-face-reader-and-wireless-touch-keypad-accessories-283-81-O.webp",
    sku: "FACE-READER-KEYPAD",
    price: "602",
    breadcrumb: "Face Reader + Keypad",
  },
  "fingerprint-reader.html": {
    name: "DESi Fingerprint Reader + Touch Keypad V3",
    description:
      "500 DPI capacitive fingerprint reader with secure wireless keypad for Utopic R. 100 fingerprints, 10 PIN codes, AES-256 GCM.",
    image: "https://utopicrx.com/utopicrx/desi-assets/products/desi-utopic-rx-rxe-compatible-fingerprint-reader-and-wireless-touch-keypad-v3-accessories-344-74-O.webp",
    sku: "FINGERPRINT-READER-V3",
    price: "602",
    breadcrumb: "Fingerprint Reader + Keypad V3",
  },
  "wifi-bridge.html": {
    name: "DESi Smart Bridge WiFi Hub",
    description:
      "WiFi bridge for Utopic R remote lock/unlock. Alexa, Google Home and Home Assistant compatible. Manages up to 4 locks.",
    image: "https://utopicrx.com/utopicrx/desi-assets/products/desi-utopic-series-compatible-wifi-bridge-hub-accessories-338-45-O.webp",
    sku: "WIFI-BRIDGE",
    price: "228",
    breadcrumb: "WiFi Bridge Hub",
  },
  "door-sensor.html": {
    name: "DESi Door Sensor + Auto-Lock V3BL",
    description:
      "Wireless door sensor for Utopic R that auto-locks when the door closes. Adhesive mount, no wiring, pairs in DESi Smart app.",
    image: "https://utopicrx.com/utopicrx/desi-assets/products/desi-utopic-door-sensor-auto-lock-module-accessories-384-92-O.jpg",
    sku: "DOOR-SENSOR-V3BL",
    price: "81",
    breadcrumb: "Door Sensor + Auto-Lock",
  },
  "smart-home-interface.html": {
    name: "DESi Smart Home Interface V3BL",
    description:
      "Dry-contact relay interface for Utopic R integration with KNX, BMS and custom automation systems. RX-only accessory.",
    image: "https://utopicrx.com/utopicrx/desi-assets/products/desi-utopic-rx-smart-home-automation-interface-v3-accessories-385-85-O.jpg",
    sku: "SMART-HOME-INTERFACE-V3BL",
    price: "118",
    breadcrumb: "Smart Home Interface",
  },
  "remote-controller.html": {
    name: "DESi Wireless Remote Controller V2BL",
    description:
      "Pocket remote for Utopic R lock/unlock. 50 m range, AES rolling code, 3-year CR2032 battery life.",
    image: "https://utopicrx.com/utopicrx/desi-assets/products/desi-utopic-rx-rxe-wireless-remote-controller-v2bl-accessories-383-93-O.jpg",
    sku: "REMOTE-CONTROLLER-V2BL",
    price: "81",
    breadcrumb: "Wireless Remote Controller V2BL",
  },
  "auto-lock-module.html": {
    name: "DESi Auto-Lock Module V2",
    description:
      "Wireless auto-lock module for Utopic R, ROK and 3 series — not compatible with Utopic R. Locks automatically on door close.",
    image: "https://utopicrx.com/utopicrx/desi-assets/products/desi-utopic-door-sensor-auto-lock-module-accessories-384-92-O.jpg",
    sku: "AUTO-LOCK-MODULE-V2",
    price: "81",
    breadcrumb: "Auto-Lock Module V2",
  },
};

const PRODUCT_BREADCRUMBS = {
  "utopic-rx.html": "Utopic R Smart Lock",
};

const BLOG_BREADCRUMBS = {
  "blog/smart-lock-rented-apartment-dubai.html": {
    title: "Smart Lock for Rented Apartments in Dubai",
    url: "https://utopicrx.com/blog/smart-lock-rented-apartment-dubai",
  },
  "blog/smart-lock-buyers-guide-dubai-2026.html": {
    title: "Smart Lock Buyer's Guide Dubai 2026",
    url: "https://utopicrx.com/blog/smart-lock-buyers-guide-dubai-2026",
  },
};

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function productSchema(slug, data) {
  const url = `https://utopicrx.com/products/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.description,
    image: [data.image],
    sku: data.sku,
    brand: { "@type": "Brand", name: "DESi" },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "AED",
      price: data.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      ...OFFER_EXTRAS,
    },
  };
}

function injectBeforeHeadClose(html, blocks) {
  const marker = "</head>";
  const idx = html.indexOf(marker);
  if (idx === -1) throw new Error("No </head> found");
  const scripts = blocks
    .map((b) => `<script type="application/ld+json">\n${JSON.stringify(b, null, 2)}\n</script>`)
    .join("\n");
  return html.slice(0, idx) + scripts + "\n" + html.slice(idx);
}

function stripExisting(html, type) {
  const re = new RegExp(
    `<script type="application/ld\\+json">\\s*\\{[^<]*"@type"\\s*:\\s*"${type}"[^<]*\\}\\s*</script>\\s*`,
    "g"
  );
  return html.replace(re, "");
}

for (const [file, data] of Object.entries(ACCESSORIES)) {
  const path = join(ROOT, "products", file);
  let html = readFileSync(path, "utf8");
  html = stripExisting(html, "Product");
  html = stripExisting(html, "BreadcrumbList");
  const blocks = [
    productSchema(file, data),
    breadcrumbSchema([
      { name: "Home", url: "https://utopicrx.com/" },
      { name: "Products", url: "https://utopicrx.com/products" },
      { name: data.breadcrumb, url: `https://utopicrx.com/products/${file}` },
    ]),
  ];
  writeFileSync(path, injectBeforeHeadClose(html, blocks));
  console.log("Updated", file);
}

for (const [file, name] of Object.entries(PRODUCT_BREADCRUMBS)) {
  const path = join(ROOT, "products", file);
  let html = readFileSync(path, "utf8");
  html = stripExisting(html, "BreadcrumbList");
  const blocks = [
    breadcrumbSchema([
      { name: "Home", url: "https://utopicrx.com/" },
      { name: "Products", url: "https://utopicrx.com/products" },
      { name, url: `https://utopicrx.com/products/${file}` },
    ]),
  ];
  writeFileSync(path, injectBeforeHeadClose(html, blocks));
  console.log("Breadcrumb on", file);
}

for (const [rel, data] of Object.entries(BLOG_BREADCRUMBS)) {
  const path = join(ROOT, rel);
  let html = readFileSync(path, "utf8");
  html = stripExisting(html, "BreadcrumbList");
  const blocks = [
    breadcrumbSchema([
      { name: "Home", url: "https://utopicrx.com/" },
      { name: "Blog", url: "https://utopicrx.com/blog" },
      { name: data.title, url: data.url },
    ]),
  ];
  writeFileSync(path, injectBeforeHeadClose(html, blocks));
  console.log("Breadcrumb on", rel);
}

console.log("Done.");
