import {
  ADMIN_SESSION_COOKIE,
  verifySessionToken,
} from "../utils/admin-auth";
import { getAdminRuntimeConfig } from "../utils/admin-config";

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

  const config = getAdminRuntimeConfig();
  const token = getCookie(event, ADMIN_SESSION_COOKIE);
  const session = verifySessionToken(token, config.adminPasswordHash);

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
