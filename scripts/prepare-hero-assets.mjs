import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();

function decodeSingle(source, output) {
  const encoded = readFileSync(resolve(root, source), "utf8").trim();
  writeFileSync(resolve(root, output), Buffer.from(encoded, "base64"));
}

function decodeChunks(parts, output) {
  const encoded = parts
    .map((part) => readFileSync(resolve(root, part), "utf8").trim())
    .join("");
  writeFileSync(resolve(root, output), Buffer.from(encoded, "base64"));
}

decodeSingle(
  "public/hero-mobile-composite.avif.b64",
  "public/hero-mobile-composite.avif",
);

decodeChunks(
  [
    "public/hero-mobile-retina.part00.b64",
    "public/hero-mobile-retina.part01.b64",
    "public/hero-mobile-retina.part02.b64",
    "public/hero-mobile-retina.part03.b64",
    "public/hero-mobile-retina.part04.b64",
    "public/hero-mobile-retina.part05.b64",
  ],
  "public/hero-mobile-retina.avif",
);
