import type { AboutUpdate } from "../../utils/about";
import { updateAbout } from "../../utils/about";

function sanitizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeItem(value: unknown) {
  const item = typeof value === "object" && value !== null
    ? value as { title?: unknown; description?: unknown }
    : {};

  return {
    title: sanitizeText(item.title),
    description: sanitizeText(item.description),
  };
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    titlePrefix?: string;
    titleAccent?: string;
    intro?: string[];
    items?: unknown[];
    contactText?: string;
  }>(event);
  const items = Array.isArray(body.items)
    ? body.items.map(sanitizeItem)
    : [];
  const update: AboutUpdate = {
    titlePrefix: sanitizeText(body.titlePrefix),
    titleAccent: sanitizeText(body.titleAccent),
    intro: [
      sanitizeText(body.intro?.[0]),
      sanitizeText(body.intro?.[1]),
    ],
    items,
    contactText: sanitizeText(body.contactText),
  };

  if (!update.titlePrefix || !update.titleAccent || !update.contactText) {
    throw createError({
      statusCode: 400,
      statusMessage: "Title and contact text are required",
    });
  }

  if (update.intro.some((paragraph) => !paragraph)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Intro paragraphs are required",
    });
  }

  if (!update.items.length || update.items.some((item) => !item.title || !item.description)) {
    throw createError({
      statusCode: 400,
      statusMessage: "About items are required",
    });
  }

  return updateAbout(update);
});
