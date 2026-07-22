import {
  ADMIN_SESSION_COOKIE,
  verifySessionToken,
} from "../../utils/admin-auth";
import { getAdminRuntimeConfig } from "../../utils/admin-config";

export default defineEventHandler((event) => {
  const config = getAdminRuntimeConfig();
  const token = getCookie(event, ADMIN_SESSION_COOKIE);
  const session = verifySessionToken(token, config.sessionSecret);

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  return {
    username: session.username,
  };
});
