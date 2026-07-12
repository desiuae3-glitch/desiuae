// Phase 2 SEO: static product links, compare footer link, auto-lock on products hub.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const MOCKUP = join(import.meta.dirname, "..", "public", "utopicrx-mockup");

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".html")) out.push(p);
  }
  return out;
}

const COMPARE_LINK = `<a href="/compare/utopic-r-vs-nuki">Utopic R vs Nuki</a>`;
const BUYERS_GUIDE_MARKER = `<a href="/blog/smart-lock-buyers-guide-dubai-2026">Smart Lock Buyer&rsquo;s Guide</a>`;

const HOMEPAGE_SHOP_COLUMN = `    <div class="fcc">
      <h4>Shop</h4>
      <a href="/products/utopic-rx.html">Utopic RX Lock</a>
      <a href="/products/face-reader.html">Face Reader</a>
      <a href="/products/fingerprint-reader.html">Fingerprint Reader</a>
      <a href="/products/wifi-bridge.html">WiFi Bridge</a>
      <a href="/products/door-sensor.html">Door Sensor</a>
      <a href="/products/smart-home-interface.html">Smart Home Interface</a>
      <a href="/products/remote-controller.html">Remote Controller</a>
      <a href="/products">All products</a>
    </div>`;

const OLD_HOMEPAGE_PRODUCT_COLUMN = `    <div class="fcc">
      <h4>Product</h4>
      <a href="#how-it-works">How It Works</a>
      <a href="#configure">Build Yours</a>
      <a href="#features">Features</a>
      <a href="#specs">Specs</a>
      <a href="products/index.html">All Products</a>
    </div>`;

const AUTO_LOCK_CARD = `      <a class="p-card" href="auto-lock-module.html">
        <div class="img"><span class="flag other">R/ROK/3</span><img src="../../utopicrx/desi-assets/products/desi-utopic-door-sensor-auto-lock-module-accessories-384-92-O.jpg" alt="Auto-Lock Module V2"></div>
        <div class="body">
          <h3>Wireless Auto-Lock Module V2</h3>
          <p class="desc">For Utopic R, ROK &amp; 3 series. Triggers auto-lock when the door closes.</p>
          <div class="price">81 AED</div>
          <span class="link">View details</span>
        </div>
      </a>
`;

const DOOR_SENSOR_SECTION_END = `      </a>
    </div>
  </section>

  <section class="catalog-section" style="padding-bottom:3rem">`;

let nCompare = 0;
let nHome = 0;
let nHub = 0;

for (const f of walk(MOCKUP)) {
  let html = readFileSync(f, "utf8");
  const orig = html;

  if (html.includes(BUYERS_GUIDE_MARKER) && !html.includes('/compare/utopic-r-vs-nuki">Utopic R vs Nuki')) {
    html = html.replace(
      BUYERS_GUIDE_MARKER,
      `${BUYERS_GUIDE_MARKER}\n      ${COMPARE_LINK}`,
    );
    nCompare++;
  }

  if (f.replace(/\\/g, "/").endsWith("utopicrx-mockup/index.html")) {
    if (html.includes(OLD_HOMEPAGE_PRODUCT_COLUMN)) {
      html = html.replace(OLD_HOMEPAGE_PRODUCT_COLUMN, HOMEPAGE_SHOP_COLUMN);
      nHome++;
    }
  }

  if (f.replace(/\\/g, "/").endsWith("utopicrx-mockup/products/index.html")) {
    if (!html.includes("auto-lock-module.html")) {
      html = html.replace(DOOR_SENSOR_SECTION_END, `      </a>
${AUTO_LOCK_CARD}    </div>
  </section>

  <section class="catalog-section" style="padding-bottom:3rem">`);
      nHub++;
    }
  }

  if (html !== orig) {
    writeFileSync(f, html);
    console.log("updated:", f.replace(MOCKUP + "\\", "").replace(MOCKUP + "/", ""));
  }
}

console.log(`\ncompare footer: ${nCompare}, homepage shop: ${nHome}, products hub: ${nHub}`);
