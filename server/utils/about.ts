import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export interface AboutImage {
  src: string;
  webp: string;
  width: number;
  height: number;
  alt: string;
}

export interface AboutItem {
  title: string;
  description: string;
}

export interface AboutContent {
  titlePrefix: string;
  titleAccent: string;
  image: AboutImage;
  intro: [string, string];
  items: AboutItem[];
  contactText: string;
}

export interface AboutUpdate {
  titlePrefix?: string;
  titleAccent?: string;
  intro?: [string, string];
  items?: AboutItem[];
  contactText?: string;
}

function getAboutFilePath(): string {
  return process.env.ABOUT_FILE_PATH ?? join(process.cwd(), "content", "about.json");
}

function normalizeAbout(about: AboutContent): AboutContent {
  const intro = about.intro ?? ["", ""];

  return {
    ...about,
    intro: [
      intro[0] ?? "",
      intro[1] ?? "",
    ],
    items: (about.items ?? []).map((item) => ({
      title: item.title ?? "",
      description: item.description ?? "",
    })),
  };
}

export async function readAbout(filePath = getAboutFilePath()): Promise<AboutContent> {
  const file = await readFile(filePath, "utf8");
  const about = JSON.parse(file) as AboutContent;

  return normalizeAbout(about);
}

export async function writeAbout(
  about: AboutContent,
  filePath = getAboutFilePath(),
): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(normalizeAbout(about), null, 2)}\n`);
}

export async function updateAbout(
  update: AboutUpdate,
  filePath = getAboutFilePath(),
): Promise<AboutContent> {
  const about = await readAbout(filePath);
  const nextAbout = normalizeAbout({
    ...about,
    ...update,
    image: about.image,
    intro: update.intro ?? about.intro,
    items: update.items ?? about.items,
  });

  await writeAbout(nextAbout, filePath);

  return nextAbout;
}
