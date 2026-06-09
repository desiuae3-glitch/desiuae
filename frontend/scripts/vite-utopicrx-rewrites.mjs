/** Mirrors frontend/vercel.json rewrites for local dev and preview. */
const EXACT = {
  "/": "/utopicrx-mockup/index.html",
  "/faq": "/utopicrx-mockup/faq.html",
  "/smart-lock-rented-apartment": "/utopicrx-mockup/smart-lock-rented-apartment.html",
  "/airbnb-smart-lock-dubai": "/utopicrx-mockup/airbnb-smart-lock-dubai.html",
  "/blog/smart-lock-rented-apartment-dubai": "/utopicrx-mockup/blog/smart-lock-rented-apartment-dubai.html",
  "/blog/best-smart-locks-dubai-apartments-2026": "/utopicrx-mockup/blog/best-smart-locks-dubai-apartments-2026.html",
  "/compare/desi-vs-nuki": "/utopicrx-mockup/compare/desi-vs-nuki.html",
  "/sitemap.xml": "/utopicrx-mockup/sitemap.xml",
  "/robots.txt": "/utopicrx-mockup/robots.txt",
  "/returns-warranty": "/utopicrx-mockup/returns-warranty.html",
  "/returns-warranty.html": "/utopicrx-mockup/returns-warranty.html",
  "/product-manuals": "/utopicrx-mockup/product-manuals.html",
  "/product-manuals.html": "/utopicrx-mockup/product-manuals.html",
  "/products": "/utopicrx-mockup/products/index.html",
  "/theme.css": "/utopicrx-mockup/theme.css",
  "/nav.js": "/utopicrx-mockup/nav.js",
  "/content.css": "/utopicrx-mockup/content.css",
  "/privacy": "/utopicrx/privacy.html",
  "/utopicrx-mockup": "/utopicrx-mockup/index.html",
  "/utopicrx": "/utopicrx/index.html",
};

const PREFIX = [
  [/^\/products\/(.+)$/, "/utopicrx-mockup/products/$1"],
];

function rewritePath(pathname) {
  if (EXACT[pathname]) return EXACT[pathname];
  for (const [pattern, dest] of PREFIX) {
    const match = pathname.match(pattern);
    if (match) return dest.replace("$1", match[1]);
  }
  return null;
}

function attachRewrites(server) {
  server.middlewares.use((req, _res, next) => {
    const raw = req.url || "/";
    const q = raw.indexOf("?");
    const pathname = q === -1 ? raw : raw.slice(0, q);
    const query = q === -1 ? "" : raw.slice(q);
    const target = rewritePath(pathname);
    if (target) req.url = target + query;
    next();
  });
}

export function utopicrxRewritePlugin() {
  return {
    name: "utopicrx-rewrites",
    configureServer: attachRewrites,
    configurePreviewServer: attachRewrites,
  };
}
