import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(import.meta.dirname, "..", "public");

const URL_MAP = {
  "utopicrx-mockup/index.html": "https://utopicrx.com/",
  "utopicrx-mockup/index_revised.html": "https://utopicrx.com/",
  "utopicrx-mockup/experience.html": "https://utopicrx.com/",
  "utopicrx-mockup/faq.html": "https://utopicrx.com/faq",
  "utopicrx-mockup/smart-lock-rented-apartment.html": "https://utopicrx.com/smart-lock-rented-apartment",
  "utopicrx-mockup/airbnb-smart-lock-dubai.html": "https://utopicrx.com/airbnb-smart-lock-dubai",
  "utopicrx-mockup/returns-warranty.html": "https://utopicrx.com/returns-warranty",
  "utopicrx-mockup/product-manuals.html": "https://utopicrx.com/product-manuals",
  "utopicrx-mockup/blog/index.html": "https://utopicrx.com/blog",
  "utopicrx-mockup/blog/smart-lock-rented-apartment-dubai.html":
    "https://utopicrx.com/blog/smart-lock-rented-apartment-dubai",
  "utopicrx-mockup/blog/smart-lock-buyers-guide-dubai-2026.html":
    "https://utopicrx.com/blog/smart-lock-buyers-guide-dubai-2026",
  "utopicrx-mockup/compare/desi-vs-nuki.html": "https://utopicrx.com/compare/desi-vs-nuki",
  "utopicrx-mockup/products/index.html": "https://utopicrx.com/products",
  "redesign-preview.html": "https://utopicrx.com/redesign-preview.html",
  "utopicrx-mockup/products/utopic-rx.html": "https://utopicrx.com/products/utopic-rx.html",
  "utopicrx-mockup/products/wifi-bridge.html": "https://utopicrx.com/products/wifi-bridge.html",
  "utopicrx-mockup/products/smart-home-interface.html":
    "https://utopicrx.com/products/smart-home-interface.html",
  "utopicrx-mockup/products/remote-controller.html": "https://utopicrx.com/products/remote-controller.html",
  "utopicrx-mockup/products/fingerprint-reader.html":
    "https://utopicrx.com/products/fingerprint-reader.html",
  "utopicrx-mockup/products/face-reader.html": "https://utopicrx.com/products/face-reader.html",
  "utopicrx-mockup/products/door-sensor.html": "https://utopicrx.com/products/door-sensor.html",
  "utopicrx-mockup/products/auto-lock-module.html": "https://utopicrx.com/products/auto-lock-module.html",
  "utopicrx/privacy.html": "https://utopicrx.com/privacy",
  "utopicrx/index.html": "https://utopicrx.com/utopicrx",
  "utopicrx/returns-warranty.html": "https://utopicrx.com/returns-warranty",
  "utopicrx/product-manuals.html": "https://utopicrx.com/product-manuals",
};

const HOME_META =
  "DESi Utopic RX smart lock — no-drill retrofit keyless lock for UAE renters. Face recognition, fingerprint & PIN. Installs in 3 minutes, leaves no trace. Ships across Dubai and GCC.";
const PRODUCT_META =
  "Buy DESi Utopic RX smart lock in UAE. Retrofit euro-cylinder design, no drilling required. Face recognition, fingerprint, PIN and app access. Landlord-friendly, renter-safe.";
const ABOUT_META =
  "Utopic RX is the UAE retail partner for DESi smart locks. Fast Dubai delivery, local warranty, and support for renters, Airbnb hosts, and property managers across the GCC.";

const NOINDEX_PAGES = new Set([
  "utopicrx-mockup/experience.html",
  "utopicrx-mockup/index_revised.html",
]);

// Unified Organization — smart-lock retailer; omit sameAs (no Utopic-owned social profiles).
const ORG_NODE = {
  "@type": "Organization",
  "@id": "https://utopicrx.com/#organization",
  name: "Utopic RX UAE",
  url: "https://utopicrx.com/",
  logo: "https://utopicrx.com/utopicrx/desi-assets/logo/utopic-rx-logo.png",
  description:
    "Authorized UAE and GCC retailer and distributor of DESi Utopic RX smart locks — no-drill retrofit smart locks for euro-profile cylinder doors. Not affiliated with medical or pharmaceutical products.",
  email: "support@utopicrx.com",
  areaServed: ["AE", "SA", "QA", "KW", "BH", "OM"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@utopicrx.com",
    contactType: "customer support",
  },
};

const ORG_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [ORG_NODE],
};

const HOME_ORG = {
  "@context": "https://schema.org",
  ...ORG_NODE,
};

const MANUFACTURER_PRODUCT_URL =
  "https://en.desi.com.tr/desi-utopic-rx-smart-lock-europrofile";

// Complete Product schema for rich results (Fix Pack #1, Fix 2).
const PRODUCT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "DESi Utopic RX Smart Lock",
  description:
    "No-drill retrofit smart lock for euro-profile cylinder doors. App control, 37 users, offline e-keys, auto-lock, 6-month battery, physical key backup. Optional face recognition and fingerprint readers.",
  image: [
    "https://utopicrx.com/utopicrx/desi-assets/products/rx-knob-unit.png",
    "https://utopicrx.com/utopicrx/desi-assets/banners/RX2new.jpg",
  ],
  sku: "UTOPIC-RX",
  brand: { "@type": "Brand", name: "DESi" },
  sameAs: [MANUFACTURER_PRODUCT_URL],
  offers: {
    "@type": "Offer",
    url: "https://utopicrx.com/products/utopic-rx.html",
    priceCurrency: "AED",
    price: "699",
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
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
  },
};

const HOMEPAGE = "utopicrx-mockup/index.html";
const MAIN_PRODUCT_PAGE = "utopicrx-mockup/products/utopic-rx.html";

function walkHtml(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walkHtml(p, files);
    else if (name.endsWith(".html")) files.push(p);
  }
  return files;
}

function resolveUrl(relPath) {
  const key = relPath.replace(/\\/g, "/");
  if (URL_MAP[key]) return URL_MAP[key];
  const m = key.match(/^utopicrx-mockup\/products\/(.+\.html)$/);
  if (m) return `https://utopicrx.com/products/${m[1]}`;
  return null;
}

function getMetaDescription(relPath, html) {
  const key = relPath.replace(/\\/g, "/");
  if (key === HOMEPAGE) return HOME_META;
  if (key.startsWith("utopicrx-mockup/products/")) return PRODUCT_META;
  if (
    ["utopicrx/returns-warranty.html", "utopicrx/product-manuals.html", "utopicrx/privacy.html"].includes(key)
  )
    return ABOUT_META;
  const m = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  return m ? decodeHtmlEntities(m[1]) : ABOUT_META;
}

function decodeHtmlEntities(s) {
  return s
    .replace(/&mdash;/g, "\u2014")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&middot;/g, "\u00b7")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&rdquo;/g, "\u201d")
    .replace(/&ldquo;/g, "\u201c")
    .replace(/&uuml;/g, "\u00fc")
    .replace(/&copy;/g, "\u00a9")
    .replace(/&hellip;/g, "\u2026")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
}

function getTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? decodeHtmlEntities(m[1].trim()) : "Utopic RX";
}

function upsertCanonical(html, url) {
  const tag = `<link rel="canonical" href="${url}" />`;
  if (/<link\s+rel="canonical"/i.test(html)) {
    return html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, tag);
  }
  return html.replace(/(<meta\s+name="viewport"[^>]*>)/i, `$1\n${tag}`);
}

function upsertMetaDescription(html, desc) {
  const tag = `<meta name="description" content="${escAttr(desc)}">`;
  if (/<meta\s+name="description"/i.test(html)) {
    return html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, tag);
  }
  return html.replace(/(<link\s+rel="canonical"[^>]*>)/i, `$1\n${tag}`);
}

function upsertRobotsMeta(html, noindex) {
  const tag = noindex
    ? `<meta name="robots" content="noindex, follow">`
    : `<meta name="robots" content="index, follow">`;
  if (/<meta\s+name="robots"/i.test(html)) {
    return html.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i, tag);
  }
  return html.replace(/(<meta\s+name="viewport"[^>]*>)/i, `$1\n${tag}`);
}

/** Remove blocks this script previously injected, so re-runs stay idempotent. */
function removeInjectedBlocks(html) {
  return (
    html
      // pretty-printed @graph blocks
      .replace(
        /<script type="application\/ld\+json">\s*\{\s*"@context":\s*"https:\/\/schema\.org",\s*"@graph":\s*\[[\s\S]*?\]\s*\}\s*<\/script>\s*/gi,
        "",
      )
      // pretty-printed standalone Organization / Product blocks
      .replace(
        /<script type="application\/ld\+json">\s*\{\s*"@context":\s*"https:\/\/schema\.org",\s*"@type":\s*"(Organization|Product)",[\s\S]*?\}\s*<\/script>\s*/gi,
        "",
      )
      // legacy minified Product blocks (note the schema.org trailing slash)
      .replace(
        /<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org\/","@type":"Product".*?<\/script>\s*/gi,
        "",
      )
  );
}

function removePartialOg(html) {
  return html
    .replace(/\s*<meta property="og:title"[^>]*>\s*/gi, "\n")
    .replace(/\s*<meta property="og:description"[^>]*>\s*/gi, "\n")
    .replace(/\s*<meta property="og:type"[^>]*>\s*/gi, "\n")
    .replace(/\s*<meta property="og:site_name"[^>]*>\s*/gi, "\n")
    .replace(/\s*<meta property="og:url"[^>]*>\s*/gi, "\n")
    .replace(/\s*<meta property="og:image"[^>]*>\s*/gi, "\n")
    .replace(/\s*<meta name="twitter:card"[^>]*>\s*/gi, "\n")
    .replace(/\s*<meta name="twitter:title"[^>]*>\s*/gi, "\n")
    .replace(/\s*<meta name="twitter:description"[^>]*>\s*/gi, "\n");
}

function escAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildOgBlock(title, desc, url) {
  return `<meta property="og:type" content="website" />
<meta property="og:site_name" content="Utopic RX" />
<meta property="og:title" content="${escAttr(title)}" />
<meta property="og:description" content="${escAttr(desc)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="https://utopicrx.com/utopicrx/desi-assets/banners/RX2new.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escAttr(title)}" />
<meta name="twitter:description" content="${escAttr(desc)}" />`;
}

function ldJson(obj) {
  return `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>`;
}

const htmlFiles = walkHtml(ROOT).filter((f) => {
  const rel = relative(ROOT, f).replace(/\\/g, "/");
  return rel.startsWith("utopicrx-mockup/") || rel.startsWith("utopicrx/") || rel === "redesign-preview.html";
});

let updated = 0;
for (const file of htmlFiles) {
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  const url = resolveUrl(rel);
  if (!url) {
    console.log("skip (no URL map):", rel);
    continue;
  }

  let html = readFileSync(file, "utf8");
  const desc = getMetaDescription(rel, html);
  const title = getTitle(html);

  html = upsertCanonical(html, url);
  html = upsertMetaDescription(html, desc);
  html = upsertRobotsMeta(html, NOINDEX_PAGES.has(rel));
  html = removePartialOg(html);
  html = removeInjectedBlocks(html);

  const blocks = [buildOgBlock(title, desc, url)];
  if (rel === HOMEPAGE) {
    blocks.push(ldJson(HOME_ORG), ldJson(PRODUCT_SCHEMA));
  } else if (rel === MAIN_PRODUCT_PAGE) {
    blocks.push(ldJson(ORG_GRAPH), ldJson(PRODUCT_SCHEMA));
  } else {
    blocks.push(ldJson(ORG_GRAPH));
  }

  html = html.replace("</head>", `${blocks.join("\n")}\n</head>`);
  writeFileSync(file, html);
  updated++;
  console.log("updated:", rel);
}

console.log(`Done. ${updated} HTML files updated.`);
