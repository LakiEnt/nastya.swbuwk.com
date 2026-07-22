import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  verifyAdminCredentials,
} from "../../utils/admin-auth";
import { getAdminRuntimeConfig } from "../../utils/admin-config";

const sessionMaxAgeSeconds = 60 * 60 * 24 * 7;

export default defineEventHandler(async (event) => {
  const body = await readBody<{ username?: string; password?: string }>(event);
  const config = getAdminRuntimeConfig();

  if (!config.sessionSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: "Admin session secret is not configured",
    });
  }

  const isValid = await verifyAdminCredentials(
    body.username?.trim() ?? "",
    body.password ?? "",
    config,
  );

  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid username or password",
    });
  }

  const token = createSessionToken(
    body.username?.trim() ?? "",
    config.sessionSecret,
    sessionMaxAgeSeconds * 1000,
  );

  setCookie(event, ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    maxAge: sessionMaxAgeSeconds,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return { ok: true };
});
