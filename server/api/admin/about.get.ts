import { readAbout } from "../../utils/about";

export default defineEventHandler(async () => {
  return readAbout();
});
