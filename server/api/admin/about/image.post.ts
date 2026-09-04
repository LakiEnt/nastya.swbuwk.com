import { mkdir, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

import { getAboutImagesUploadDir } from "../../../utils/about-images";
import { readAbout, updateAbout } from "../../../utils/about";

const allowedMimeTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

function sanitizeFileName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  const image = formData?.find((item) => item.name === "image" && item.filename);

  if (!image) {
    throw createError({
      statusCode: 400,
      statusMessage: "Image file is required",
    });
  }

  const extension =
    allowedMimeTypes.get(image.type ?? "") ||
    extname(image.filename ?? "").toLowerCase();

  if (![".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(extension)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Unsupported image type",
    });
  }

  const about = await readAbout();
  const uploadDir = getAboutImagesUploadDir();
  const baseName = basename(image.filename ?? "about", extname(image.filename ?? ""));
  const fileName = `${Date.now()}-${sanitizeFileName(baseName)}${extension}`;
  const filePath = join(uploadDir, fileName);
  const publicPath = `/images/about/${fileName}`;

  await mkdir(uploadDir, { recursive: true });
  await writeFile(filePath, image.data);

  return updateAbout({
    image: {
      ...about.image,
      src: publicPath,
      webp: publicPath,
    },
  });
});
