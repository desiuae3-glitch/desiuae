import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, posix } from "node:path";

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
  'DESi Utopic RX smart lock — no-drill retrofit keyless lock for UAE renters. Face recognition, fingerprint & PIN. Installs in 3 minutes, leaves no trace. Ships across Dubai and GCC.';
const PRODUCT_META =
  "Buy DESi Utopic RX smart lock in UAE. Retrofit euro-cylinder design, no drilling required. Face recognition, fingerprint, PIN and app access. Landlord-friendly, renter-safe.";
const ABOUT_META =
  "Utopic RX is the UAE retail partner for DESi smart locks. Fast Dubai delivery, local warranty, and support for renters, Airbnb hosts, and property managers across the GCC.";

const ORG_ONLY = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://utopicrx.com/#organization",
      name: "Utopic RX",
      url: "https://utopicrx.com",
      logo: "https://utopicrx.com/utopicrx/desi-assets/logo/utopic-rx-logo.png",
      description:
        "UAE and GCC retail brand for DESi modular retrofit smart door locks. No-drill keyless smart locks for renters, Airbnb hosts, and property managers in Dubai.",
      areaServed: ["AE", "SA", "QA", "KW", "BH", "OM"],
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@utopicrx.com",
        contactType: "customer support",
      },
      sameAs: [],
    },
  ],
};

const ORG_PRODUCT = {
  "@context": "https://schema.org",
  "@graph": [
    ...ORG_ONLY["@graph"],
    {
      "@type": "Product",
      name: "DESi Utopic RX Smart Lock",
      brand: { "@type": "Brand", name: "DESi" },
      description:
        "AI-powered retrofit smart lock for euro-cylinder doors. No drilling required. Face recognition, fingerprint, PIN, and app access. Designed for UAE renters and Airbnb hosts.",
      url: "https://utopicrx.com/",
      offers: {
        "@type": "Offer",
        priceCurrency: "AED",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Utopic RX" },
      },
    },
  ],
};

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

function isProductPage(relPath) {
  const p = relPath.replace(/\\/g, "/");
  return p === "utopicrx-mockup/index.html" || p.startsWith("utopicrx-mockup/products/");
}

function getMetaDescription(relPath, html) {
  if (relPath.replace(/\\/g, "/") === "utopicrx-mockup/index.html") return HOME_META;
  if (relPath.replace(/\\/g, "/").startsWith("utopicrx-mockup/products/")) return PRODUCT_META;
  if (
    ["utopicrx/returns-warranty.html", "utopicrx/product-manuals.html", "utopicrx/privacy.html"].includes(
      relPath.replace(/\\/g, "/"),
    )
  )
    return ABOUT_META;
  const m = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  return m ? m[1] : ABOUT_META;
}

function decodeHtmlEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
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
  const tag = `<meta name="description" content="${desc}">`;
  if (/<meta\s+name="description"/i.test(html)) {
    return html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, tag);
  }
  return html.replace(/(<link\s+rel="canonical"[^>]*>)/i, `$1\n${tag}`);
}

function removeExistingSeoGraph(html) {
  return html.replace(
    /<script type="application\/ld\+json">\s*\{\s*"@context":\s*"https:\/\/schema\.org",\s*"@graph":\s*\[[\s\S]*?\]\s*\}\s*<\/script>\s*/i,
    "",
  );
}

function removePartialOg(html) {
  return html
    .replace(/\s*<meta property="og:title"[^>]*>\s*/gi, "")
    .replace(/\s*<meta property="og:description"[^>]*>\s*/gi, "")
    .replace(/\s*<meta property="og:type"[^>]*>\s*/gi, "")
    .replace(/\s*<meta property="og:site_name"[^>]*>\s*/gi, "")
    .replace(/\s*<meta property="og:url"[^>]*>\s*/gi, "")
    .replace(/\s*<meta property="og:image"[^>]*>\s*/gi, "")
    .replace(/\s*<meta name="twitter:card"[^>]*>\s*/gi, "")
    .replace(/\s*<meta name="twitter:title"[^>]*>\s*/gi, "")
    .replace(/\s*<meta name="twitter:description"[^>]*>\s*/gi, "");
}

function buildOgBlock(title, desc, url) {
  const esc = (s) =>
    s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<meta property="og:type" content="website" />
<meta property="og:site_name" content="Utopic RX" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="https://utopicrx.com/utopicrx/desi-assets/banners/RX2new.jpg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(desc)}" />`;
}

function injectBeforeHeadClose(html, block) {
  if (html.includes(block.trim().slice(0, 40))) return html;
  return html.replace("</head>", `${block}\n</head>`);
}

const htmlFiles = walkHtml(ROOT).filter((f) => {
  const rel = relative(ROOT, f).replace(/\\/g, "/");
  return (
    rel.startsWith("utopicrx-mockup/") ||
    rel.startsWith("utopicrx/") ||
    rel === "redesign-preview.html"
  );
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
  html = removePartialOg(html);
  html = removeExistingSeoGraph(html);

  const schema = isProductPage(rel) ? ORG_PRODUCT : ORG_ONLY;
  const schemaBlock = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  const ogBlock = buildOgBlock(title, desc, url);

  html = injectBeforeHeadClose(html, `${ogBlock}\n${schemaBlock}`);
  writeFileSync(file, html);
  updated++;
  console.log("updated:", rel);
}

console.log(`Done. ${updated} HTML files updated.`);
