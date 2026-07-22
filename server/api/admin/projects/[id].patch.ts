import type { ProjectType, ProjectUpdate } from "../../../utils/projects";
import { updateProject } from "../../../utils/projects";

const projectTypes = new Set<ProjectType>([
  "Сайт",
  "Айдентика",
  "Фирменный стиль",
  "SMM",
]);

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid project id",
    });
  }

  const body = await readBody<{
    title?: string;
    description?: string;
    detailDescriptions?: string[];
    type?: ProjectType;
    year?: number | string;
  }>(event);
  const update: ProjectUpdate = {
    title: body.title?.trim(),
    description: body.description?.trim(),
    detailDescriptions: [
      body.detailDescriptions?.[0]?.trim() ?? "",
      body.detailDescriptions?.[1]?.trim() ?? "",
    ],
    type: body.type,
    year: Number(body.year),
  };

  if (!update.title || !update.description) {
    throw createError({
      statusCode: 400,
      statusMessage: "Title and description are required",
    });
  }

  if (!Number.isInteger(update.year) || update.year < 1900 || update.year > 2200) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid project year",
    });
  }

  if (!update.type || !projectTypes.has(update.type)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid project type",
    });
  }

  const project = await updateProject(id, update);

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: "Project not found",
    });
  }

  return project;
});
