import { mkdir, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

import { getProject, updateProject } from "../../../../utils/projects";

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

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid project id",
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

  const uploadDir = join(process.cwd(), "public", "images", "projects");
  const baseName = basename(image.filename ?? "project", extname(image.filename ?? ""));
  const fileName = `${id}-${Date.now()}-${sanitizeFileName(baseName)}${extension}`;
  const filePath = join(uploadDir, fileName);
  const publicPath = `/images/projects/${fileName}`;

  await mkdir(uploadDir, { recursive: true });
  await writeFile(filePath, image.data);

  const nextProject = await updateProject(id, {
    image: {
      src: publicPath,
      webp: publicPath,
      alt: project.title,
      width: project.image.width,
      height: project.image.height,
    },
  });

  return nextProject;
});
