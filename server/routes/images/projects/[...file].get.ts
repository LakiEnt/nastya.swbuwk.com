import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { basename, extname, join } from "node:path";

import { sendStream, setHeader } from "h3";

import { getProjectImagesUploadDir } from "../../../utils/project-images";

const contentTypes = new Map([
  [".gif", "image/gif"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".png", "image/png"],
  [".webp", "image/webp"],
]);

export default defineEventHandler(async (event) => {
  const file = getRouterParam(event, "file");

  if (!file || file !== basename(file) || file.startsWith(".")) {
    throw createError({
      statusCode: 404,
      statusMessage: "Image not found",
    });
  }

  const extension = extname(file).toLowerCase();
  const contentType = contentTypes.get(extension);

  if (!contentType) {
    throw createError({
      statusCode: 404,
      statusMessage: "Image not found",
    });
  }

  const filePath = join(getProjectImagesUploadDir(), file);

  try {
    const fileStat = await stat(filePath);

    if (!fileStat.isFile()) {
      throw new Error("Not a file");
    }
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: "Image not found",
    });
  }

  setHeader(event, "content-type", contentType);
  setHeader(event, "cache-control", "public, max-age=31536000, immutable");

  return sendStream(event, createReadStream(filePath));
});
