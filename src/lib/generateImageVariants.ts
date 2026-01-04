import sharp from "sharp";
import { VariantUrls } from "./uploadVariants";

export async function generateImageVariants(buffer: Buffer) {
  const variants = [
    { name: "thumbnail", width: 200, quality: 60 },
    { name: "optimized", width: 1200, quality: 60 },
  ];

  const results: { name: string; buffer: Buffer }[] = [];

  for (const v of variants) {
    const buf = await sharp(buffer)
      .rotate()
      .resize({ width: v.width, withoutEnlargement: true })
      .jpeg({ quality: v.quality })
      .toBuffer();

    results.push({ name: v.name, buffer: buf });
  }
  return results;
}
