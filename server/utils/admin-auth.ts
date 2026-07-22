import {
  createHmac,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

export const ADMIN_SESSION_COOKIE = "admin_session";

export interface AdminCredentialsConfig {
  adminUsername?: string;
  adminPasswordHash?: string;
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

export async function hashPassword(
  password: string,
  salt = randomBytes(16).toString("base64url"),
): Promise<string> {
  const n = 16_384;
  const r = 8;
  const p = 1;
  const key = (await scrypt(password, salt, 64, { N: n, r, p })) as Buffer;

  return `scrypt$${n}$${r}$${p}$${salt}$${key.toString("base64url")}`;
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const [algorithm, n, r, p, salt, expectedKey] = storedHash.split("$");

  if (algorithm !== "scrypt" || !n || !r || !p || !salt || !expectedKey) {
    return false;
  }

  const key = (await scrypt(password, salt, 64, {
    N: Number(n),
    r: Number(r),
    p: Number(p),
  })) as Buffer;

  return safeEqual(key.toString("base64url"), expectedKey);
}

export async function verifyAdminCredentials(
  username: string,
  password: string,
  config: AdminCredentialsConfig,
): Promise<boolean> {
  if (!config.adminUsername || !config.adminPasswordHash) {
    return false;
  }

  if (!safeEqual(username, config.adminUsername)) {
    return false;
  }

  return verifyPassword(password, config.adminPasswordHash);
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
