import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  createSessionToken,
  verifyAdminCredentials,
  verifySessionToken,
} from "../../server/utils/admin-auth.ts";
import { getAdminRuntimeConfig } from "../../server/utils/admin-config.ts";

describe("admin auth helpers", () => {
  it("verifies the configured admin username and plain password", async () => {
    assert.equal(
      await verifyAdminCredentials("admin", "change-me-admin-password", {
        adminUsername: "admin",
      }),
      true,
    );

    assert.equal(
      await verifyAdminCredentials("admin", "wrong-password", {
        adminUsername: "admin",
      }),
      false,
    );
  });

  it("rejects a session token after the admin password changes", () => {
    const token = createSessionToken("admin", "first-password", 60_000);

    assert.equal(
      verifySessionToken(token, "first-password")?.username,
      "admin",
    );
    assert.equal(verifySessionToken(token, "second-password"), null);
  });

  it("does not include SESSION_SECRET in admin runtime config", () => {
    const previousSessionSecret = process.env.SESSION_SECRET;
    process.env.SESSION_SECRET = "unused-session-secret";

    try {
      assert.equal(
        Object.hasOwn(getAdminRuntimeConfig(), "sessionSecret"),
        false,
      );
    } finally {
      if (previousSessionSecret === undefined) {
        delete process.env.SESSION_SECRET;
      } else {
        process.env.SESSION_SECRET = previousSessionSecret;
      }
    }
  });

  it("does not include ADMIN_PASSWORD in admin runtime config", () => {
    const previousAdminPassword = process.env.ADMIN_PASSWORD;
    process.env.ADMIN_PASSWORD = "env-password";

    try {
      assert.equal(
        Object.hasOwn(getAdminRuntimeConfig(), "adminPassword"),
        false,
      );
    } finally {
      if (previousAdminPassword === undefined) {
        delete process.env.ADMIN_PASSWORD;
      } else {
        process.env.ADMIN_PASSWORD = previousAdminPassword;
      }
    }
  });
});
