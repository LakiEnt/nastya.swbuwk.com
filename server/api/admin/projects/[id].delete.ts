import { deleteProject } from "../../../utils/projects";

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid project id",
    });
  }

  const deleted = await deleteProject(id);

  if (!deleted) {
    throw createError({
      statusCode: 404,
      statusMessage: "Project not found",
    });
  }

  return { ok: true };
});
