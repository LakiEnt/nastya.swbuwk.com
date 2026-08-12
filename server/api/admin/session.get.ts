import {
  ADMIN_PASSWORD,
  ADMIN_SESSION_COOKIE,
  verifySessionToken,
} from "../../utils/admin-auth";

export default defineEventHandler((event) => {
  const token = getCookie(event, ADMIN_SESSION_COOKIE);
  const session = verifySessionToken(token, ADMIN_PASSWORD);

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
