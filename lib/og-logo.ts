import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export async function logoDataUri(
  relativePath: string,
  width: number,
): Promise<string> {
  const svg = await readFile(join(process.cwd(), relativePath));
  const png = await sharp(svg).resize({ width }).png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}
