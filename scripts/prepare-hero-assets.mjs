import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const assets = [
  ["public/hero-mobile-composite.avif.b64", "public/hero-mobile-composite.avif"],
];

for (const [source, output] of assets) {
  const encoded = readFileSync(resolve(root, source), "utf8").trim();
  writeFileSync(resolve(root, output), Buffer.from(encoded, "base64"));
}
