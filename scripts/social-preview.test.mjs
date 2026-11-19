import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { inflateSync } from "node:zlib";

// Pixel-level asset checks, not a replacement for inspecting real social-service cards.
// Facebook guidance: https://developers.facebook.com/documentation/sharing/webmasters/images
const image = readFileSync(
  new URL("../public/static/images/site-cover-social.png", import.meta.url),
);
const metadata = readFileSync(
  new URL("../data/siteMetadata.js", import.meta.url),
  "utf8",
);
const width = image.readUInt32BE(16);
const height = image.readUInt32BE(20);

function contentBounds() {
  assert.equal(image[24], 8, "8-bit PNG");
  assert.equal(image[25], 2, "RGB PNG");
  assert.equal(image[28], 0, "non-interlaced PNG");
  const chunks = [];
  for (let offset = 8; offset < image.length; ) {
    const length = image.readUInt32BE(offset);
    if (image.toString("ascii", offset + 4, offset + 8) === "IDAT") {
      chunks.push(image.subarray(offset + 8, offset + 8 + length));
    }
    offset += length + 12;
  }
  const raw = inflateSync(Buffer.concat(chunks));
  const stride = width * 3;
  let previous = Buffer.alloc(stride);
  let minX = width,
    minY = height,
    maxX = -1,
    maxY = -1;
  const paeth = (a, b, c) => {
    const p = a + b - c;
    const pa = Math.abs(p - a),
      pb = Math.abs(p - b),
      pc = Math.abs(p - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
  };
  for (let y = 0; y < height; y++) {
    const offset = y * (stride + 1);
    const filter = raw[offset];
    assert.ok(filter <= 4);
    const row = Buffer.from(raw.subarray(offset + 1, offset + stride + 1));
    for (let i = 0; i < stride; i++) {
      const left = i >= 3 ? row[i - 3] : 0;
      const up = previous[i];
      const upperLeft = i >= 3 ? previous[i - 3] : 0;
      const predictor = [
        0,
        left,
        up,
        Math.floor((left + up) / 2),
        paeth(left, up, upperLeft),
      ][filter];
      row[i] = (row[i] + predictor) & 255;
    }
    for (let x = 0; x < width; x++) {
      if (Math.min(...row.subarray(x * 3, x * 3 + 3)) < 245) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
    previous = row;
  }
  assert.ok(maxX > minX && maxY > minY, "artwork is not empty");
  return { minX, minY, maxX, maxY };
}

test("social-only PNG has a cache-distinct metadata path and large-card dimensions", () => {
  assert.equal(image.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.deepEqual([width, height], [1200, 630]);
  assert.ok(image.length < 5_000_000);
  assert.match(
    metadata,
    /socialBanner: '\/static\/images\/site-cover-social\.png'/,
  );
});

for (const [name, ratio] of [
  ["Facebook large card", 1200 / 630],
  ["X wide-card crop", 2],
  ["defensive square thumbnail", 1],
]) {
  test(`${name}: all visible artwork fits within the center crop with a margin`, () => {
    const bounds = contentBounds();
    const cropWidth = Math.min(width, height * ratio);
    const cropHeight = Math.min(height, width / ratio);
    assert.ok(bounds.minX >= (width - cropWidth) / 2 + 16);
    assert.ok(bounds.maxX <= (width + cropWidth) / 2 - 16);
    assert.ok(bounds.minY >= (height - cropHeight) / 2 + 16);
    assert.ok(bounds.maxY <= (height + cropHeight) / 2 - 16);
  });
}
