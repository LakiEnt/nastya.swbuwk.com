import type { AdminCredentialsConfig } from "./admin-auth";

export interface AdminRuntimeConfig extends AdminCredentialsConfig {
  sessionSecret?: string;
}

export function getAdminRuntimeConfig(): AdminRuntimeConfig {
  return {
    adminUsername: process.env.ADMIN_USERNAME,
    adminPasswordHash: process.env.ADMIN_PASSWORD_HASH,
    sessionSecret: process.env.SESSION_SECRET,
  };
}
