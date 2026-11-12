import sharp from "sharp";

/**
 * Remove a flat background from a logo image by mapping pixel distance
 * from the reference background color to alpha, then crop to the
 * non-transparent bounding box.
 */
async function cut(src, out, bg, t0 = 15, t1 = 55) {
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let i = 0; i < width * height; i++) {
    const o = i * channels;
    const dr = data[o] - bg[0];
    const dg = data[o + 1] - bg[1];
    const db = data[o + 2] - bg[2];
    const d = Math.sqrt(dr * dr + dg * dg + db * db);
    const a = Math.max(0, Math.min(255, ((d - t0) / (t1 - t0)) * 255));
    data[o + 3] = a;
    if (a > 10) {
      const x = i % width;
      const y = Math.floor(i / width);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < 0) {
    console.error("no foreground pixels found in", src);
    process.exit(1);
  }

  const pad = 6;
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const w = Math.min(width, maxX + pad + 1) - left;
  const h = Math.min(height, maxY + pad + 1) - top;

  await sharp(Buffer.from(data), { raw: { width, height, channels } })
    .extract({ left, top, width: w, height: h })
    .png()
    .toFile(out);
  console.log("wrote", out, `${w}x${h}`);
}

// mauve logo on cream #F7F2EA  -> transparent logo.png (light surfaces)
await cut("public/images/logo-src-light.png", "public/images/logo.png", [
  247, 242, 234,
]);

// pale logo on dark brown #2B2123 -> transparent logo-light.png (dark surfaces)
await cut("public/images/logo-src-dark.png", "public/images/logo-light.png", [
  43, 33, 35,
]);
