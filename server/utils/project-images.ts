import { join } from "node:path";

interface ProjectImagesUploadDirOptions {
  cwd?: string;
}

export function getProjectImagesUploadDir(
  options: ProjectImagesUploadDirOptions = {},
): string {
  const cwd = options.cwd ?? process.cwd();

  return join(cwd, "public", "images", "projects");
}
