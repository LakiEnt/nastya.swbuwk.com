import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_PASSWORD = "change-me-admin-password";

export interface AdminCredentialsConfig {
  adminUsername?: string;
}

interface SessionPayload {
  username: string;
  expiresAt: number;
}

function base64UrlEncode(value: string | Buffer): string {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export async function verifyAdminCredentials(
  username: string,
  password: string,
  config: AdminCredentialsConfig,
): Promise<boolean> {
  if (!config.adminUsername) {
    return false;
  }

  if (!safeEqual(username, config.adminUsername)) {
    return false;
  }

  return safeEqual(password, ADMIN_PASSWORD);
}

export function createSessionToken(
  username: string,
  secret: string,
  maxAgeMs: number,
): string {
  const payload = base64UrlEncode(
    JSON.stringify({
      username,
      expiresAt: Date.now() + maxAgeMs,
    } satisfies SessionPayload),
  );
  const signature = sign(payload, secret);

  return `${payload}.${signature}`;
}

export function verifySessionToken(
  token: string | undefined,
  secret: string | undefined,
): SessionPayload | null {
  if (!token || !secret) {
    return null;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature || !safeEqual(sign(payload, secret), signature)) {
    return null;
  }

  try {
    const session = JSON.parse(base64UrlDecode(payload)) as SessionPayload;

    if (!session.username || session.expiresAt < Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}
