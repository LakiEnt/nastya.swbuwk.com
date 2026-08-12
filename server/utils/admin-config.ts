import type { AdminCredentialsConfig } from "./admin-auth";

export type AdminRuntimeConfig = AdminCredentialsConfig;

export function getAdminRuntimeConfig(): AdminRuntimeConfig {
  return {
    adminUsername: process.env.ADMIN_USERNAME,
    adminPasswordHash: process.env.ADMIN_PASSWORD_HASH,
  };
}
