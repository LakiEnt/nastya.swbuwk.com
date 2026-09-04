import { join } from "node:path";

interface AboutImagesUploadDirOptions {
  cwd?: string;
}

export function getAboutImagesUploadDir(
  options: AboutImagesUploadDirOptions = {},
): string {
  const cwd = options.cwd ?? process.cwd();

  return join(cwd, "public", "images", "about");
}
