import { mkdir, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

import { getProjectImagesUploadDir } from "../../../../../utils/project-images";
import { getProject, updateProject } from "../../../../../utils/projects";

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
  const id = Number(getRouterParam(event, "id"));
  const slot = Number(getRouterParam(event, "slot"));

  if (!Number.isInteger(id) || !Number.isInteger(slot) || slot < 0 || slot > 3) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid project image slot",
    });
  }

  const project = await getProject(id);

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: "Project not found",
    });
  }

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

  const uploadDir = getProjectImagesUploadDir();
  const baseName = basename(image.filename ?? "project", extname(image.filename ?? ""));
  const fileName = `${id}-gallery-${slot + 1}-${Date.now()}-${sanitizeFileName(baseName)}${extension}`;
  const publicPath = `/images/projects/${fileName}`;
  const galleryImages = [...project.galleryImages] as typeof project.galleryImages;

  await mkdir(uploadDir, { recursive: true });
  await writeFile(join(uploadDir, fileName), image.data);

  galleryImages[slot] = {
    src: publicPath,
    webp: publicPath,
    alt: `${project.title} ${slot + 1}`,
    width: project.image.width,
    height: project.image.height,
  };

  return updateProject(id, {
    galleryImages,
  });
});
