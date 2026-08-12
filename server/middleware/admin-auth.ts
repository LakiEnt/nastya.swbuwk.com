import {
  ADMIN_PASSWORD,
  ADMIN_SESSION_COOKIE,
  verifySessionToken,
} from "../utils/admin-auth";

export default defineEventHandler((event) => {
  const pathname = getRequestURL(event).pathname;
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isPublicAdminRoute =
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/api/admin/login");

  if ((!isAdminPage && !isAdminApi) || isPublicAdminRoute) {
    return;
  }

  const token = getCookie(event, ADMIN_SESSION_COOKIE);
  const session = verifySessionToken(token, ADMIN_PASSWORD);

  if (!session) {
    if (isAdminApi) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    return sendRedirect(event, "/admin/login", 302);
  }
});
