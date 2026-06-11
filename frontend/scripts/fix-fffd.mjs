import { readFileSync, writeFileSync } from "node:fs";

const R = "\uFFFD";

const FIXES = {
  "public/utopicrx-mockup/product-manuals.html": [
    [`products ${R} lock`, "products &mdash; lock"],
    [`</a> ${R} <a href="https://wa.me`, `</a> &middot; <a href="https://wa.me`],
  ],
  "public/utopicrx-mockup/returns-warranty.html": [
    [`T&uuml;rkiye ${R} UAE`, "T&uuml;rkiye &middot; UAE"],
    [`June 2026 ${R} utopicrx.com ${R} v1.9`, "June 2026 &middot; utopicrx.com &middot; v1.9"],
    [`Change of mind ${R}`, "Change of mind &mdash;"],
    [`warranty ${R} see Section`, "warranty &mdash; see Section"],
    [`Restocking fee ${R}`, "Restocking fee &mdash;"],
    [`face reader ${R} 24 months`, "face reader &mdash; 24 months"],
    [`rechargeable battery ${R} 24 months`, "rechargeable battery &mdash; 24 months"],
    [`wireless readers ${R} not warranted`, "wireless readers &mdash; not warranted"],
    [`OTA updates ${R} provided`, "OTA updates &mdash; provided"],
    [`7${R}14 working days`, "7&ndash;14 working days"],
    [`Email</strong> ${R}`, "Email</strong> &mdash;"],
    [`WhatsApp</strong> ${R}`, "WhatsApp</strong> &mdash;"],
    [`Hours</strong> ${R}`, "Hours</strong> &mdash;"],
    [`09:00 ${R} 18:00`, "09:00 &ndash; 18:00"],
    [`${R} 2026 DESi UAE`, "&copy; 2026 DESi UAE"],
    [`GCC ${R} Authorized distributor ${R}`, "GCC &middot; Authorized distributor &middot;"],
  ],
};

for (const [file, pairs] of Object.entries(FIXES)) {
  let t = readFileSync(file, "utf8");
  for (const [from, to] of pairs) t = t.split(from).join(to);
  writeFileSync(file, t);
  const left = (t.match(new RegExp(R, "g")) || []).length;
  console.log(`${file} remaining replacement chars: ${left}`);
}
