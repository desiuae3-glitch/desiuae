import { writeFileSync } from "node:fs";
import { join } from "node:path";

const LASTMOD = "2026-07-12";

const URLS = [
  "https://utopicrx.com/",
  "https://utopicrx.com/products",
  "https://utopicrx.com/products/utopic-r",
  "https://utopicrx.com/products/face-reader.html",
  "https://utopicrx.com/products/fingerprint-reader.html",
  "https://utopicrx.com/products/wifi-bridge.html",
  "https://utopicrx.com/products/smart-home-interface.html",
  "https://utopicrx.com/products/remote-controller.html",
  "https://utopicrx.com/products/door-sensor.html",
  "https://utopicrx.com/blog",
  "https://utopicrx.com/blog/smart-lock-rented-apartment-dubai",
  "https://utopicrx.com/blog/smart-lock-buyers-guide-dubai-2026",
  "https://utopicrx.com/smart-lock-rented-apartment",
  "https://utopicrx.com/airbnb-smart-lock-dubai",
  "https://utopicrx.com/smart-lock-installation-dubai",
  "https://utopicrx.com/smart-lock-sharjah",
  "https://utopicrx.com/smart-lock-abu-dhabi",
  "https://utopicrx.com/retrofit-lock-uae",
  "https://utopicrx.com/retrofit-lock-dubai",
  "https://utopicrx.com/smartlock",
  "https://utopicrx.com/compare/utopic-r-vs-nuki",
  "https://utopicrx.com/compare/utopic-r-vs-yale",
  "https://utopicrx.com/compare/utopic-r-vs-philips",
  "https://utopicrx.com/compare/utopic-r-vs-smart-centrum",
  "https://utopicrx.com/faq",
  "https://utopicrx.com/returns-warranty",
  "https://utopicrx.com/product-manuals",
  "https://utopicrx.com/privacy",
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${URLS.map((loc) => `  <url><loc>${loc}</loc><lastmod>${LASTMOD}</lastmod><changefreq>weekly</changefreq><priority>${loc.endsWith("/") ? "1.0" : loc.includes("/products/utopic-r") && !loc.endsWith("/products") ? "0.9" : "0.8"}</priority></url>`).join("\n")}
</urlset>
`;

const publicDir = join(import.meta.dirname, "..", "public");
writeFileSync(join(publicDir, "sitemap.xml"), xml, "utf8");
console.log(`generate-sitemap: wrote ${URLS.length} URLs to public/sitemap.xml`);
