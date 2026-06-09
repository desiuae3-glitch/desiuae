import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = join(import.meta.dirname, "../public/utopicrx-mockup/products");

function fix(html) {
  let s = html;
  s = s.replace(/\uFFFD/g, "&mdash;");
  s = s.replace(/ï¿½/g, "&mdash;");
  s = s.replace(/\? Compatible/g, "&#10003; Compatible");
  s = s.replace(/\? Fits/g, "&#10003; Fits");
  s = s.replace(/\? Engineered/g, "&#10003; Engineered");
  s = s.replace(/\? Incorrect/g, "&#9888; Incorrect");
  s = s.replace(/\? <strong>NOT/g, "&#9888; <strong>NOT");
  s = s.replace(/\? 2026 Utopic RX \? DESi/g, "&copy; 2026 Utopic RX &mdash; DESi");
  s = s.replace(/User manual \?/g, "User manual &rarr;");
  s = s.replace(/Series \? Core/g, "Series &mdash; Core");
  s = s.replace(/touch \? mounted/g, "touch &mdash; mounted");
  s = s.replace(/outside \? even/g, "outside &mdash; even");
  s = s.replace(/4 screws \? no/g, "4 screws &mdash; no");
  s = s.replace(/Yes \? anytime/g, "Yes &mdash; anytime");
  s = s.replace(/daily use \? BLE/g, "daily use &mdash; BLE");
  s = s.replace(/next door \? ideal/g, "next door &mdash; ideal");
  s = s.replace(/removable \? zero/g, "removable &mdash; zero");
  s = s.replace(/operation \? ideal/g, "operation &mdash; ideal");
  s = s.replace(/inside \? lock/g, "inside &mdash; lock");
  s = s.replace(/(\d)\?(\d)/g, "$1&ndash;$2");
  s = s.replace(/2\? Allen/g, "2&times; Allen");
  s = s.replace(/1\? CR2032/g, "1&times; CR2032");
  s = s.replace(/5\?12/g, "5&ndash;12");
  s = s.replace(/<div class="icon">\?<\/div>/g, '<div class="icon">&#9889;</div>');
  s = s.replace(/<div class="icon">\?\?\?<\/div>/g, '<div class="icon">&#128273;</div>');
  s = s.replace(/<div class="icon">\?\?<\/div>/g, '<div class="icon">&#128267;</div>');
  s = s.replace(/<span>\?\?<\/span>Utopic RX Smart Lock/g, "<span>&#128274;</span>Utopic RX Smart Lock");
  s = s.replace(/<span>\?\?<\/span>Type-C USB Cable/g, "<span>&#128268;</span>Type-C USB Cable");
  s = s.replace(/<span>\?\?<\/span>2&times; Allen/g, "<span>&#128295;</span>2&times; Allen");
  s = s.replace(/<span>\?\?<\/span>Door Surface/g, "<span>&#128204;</span>Door Surface");
  s = s.replace(/<span>\?\?<\/span>Plastic Key/g, "<span>&#128273;</span>Plastic Key");
  s = s.replace(/<span>\?\?\?<\/span>Thumbturn/g, "<span>&#128736;</span>Thumbturn");
  s = s.replace(/ ([\w]) \? ([\w])/g, " $1 &mdash; $2");
  s = s.replace(/ · /g, " &middot; ");
  s = s.replace(/ – /g, " &ndash; ");
  s = s.replace(/ — /g, " &mdash; ");
  return s;
}

for (const file of readdirSync(dir).filter((f) => f.endsWith(".html"))) {
  const path = join(dir, file);
  const out = fix(readFileSync(path, "utf8"));
  writeFileSync(path, out, "utf8");
  console.log("fixed", file);
}
