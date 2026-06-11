/**
 * Repairs files containing invalid UTF-8 byte sequences (show up as U+FFFD when
 * decoded). Invalid bytes are assumed to be stray Windows-1252 characters and
 * are re-encoded as proper UTF-8.
 */
import { readFileSync, writeFileSync } from "node:fs";

const CP1252 = {
  0x80: 0x20ac, 0x82: 0x201a, 0x83: 0x0192, 0x84: 0x201e, 0x85: 0x2026,
  0x86: 0x2020, 0x87: 0x2021, 0x88: 0x02c6, 0x89: 0x2030, 0x8a: 0x0160,
  0x8b: 0x2039, 0x8c: 0x0152, 0x8e: 0x017d, 0x91: 0x2018, 0x92: 0x2019,
  0x93: 0x201c, 0x94: 0x201d, 0x95: 0x2022, 0x96: 0x2013, 0x97: 0x2014,
  0x98: 0x02dc, 0x99: 0x2122, 0x9a: 0x0161, 0x9b: 0x203a, 0x9c: 0x0153,
  0x9e: 0x017e, 0x9f: 0x0178,
};

function utf8SeqLen(b) {
  if (b < 0x80) return 1;
  if ((b & 0xe0) === 0xc0) return 2;
  if ((b & 0xf0) === 0xe0) return 3;
  if ((b & 0xf8) === 0xf0) return 4;
  return 0;
}

function isValidSeq(buf, i, len) {
  if (i + len > buf.length) return false;
  for (let k = 1; k < len; k++) {
    if ((buf[i + k] & 0xc0) !== 0x80) return false;
  }
  return true;
}

function repair(buf) {
  const out = [];
  let fixed = 0;
  let i = 0;
  while (i < buf.length) {
    const b = buf[i];
    const len = utf8SeqLen(b);
    if (len === 1) {
      out.push(b);
      i++;
    } else if (len > 1 && isValidSeq(buf, i, len)) {
      for (let k = 0; k < len; k++) out.push(buf[i + k]);
      i += len;
    } else {
      const cp = CP1252[b] ?? (b >= 0xa0 ? b : 0xfffd);
      const enc = Buffer.from(String.fromCodePoint(cp), "utf8");
      for (const eb of enc) out.push(eb);
      fixed++;
      i++;
    }
  }
  return { buf: Buffer.from(out), fixed };
}

for (const file of process.argv.slice(2)) {
  const orig = readFileSync(file);
  const { buf, fixed } = repair(orig);
  if (fixed > 0) {
    writeFileSync(file, buf);
    console.log(`repaired ${fixed} bytes: ${file}`);
  } else {
    console.log(`clean: ${file}`);
  }
}
