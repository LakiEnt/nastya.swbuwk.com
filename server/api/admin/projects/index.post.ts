import { createProject } from "../../../utils/projects";

export default defineEventHandler(async () => {
  const project = await createProject();

  return { project };
});
