import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  createSessionToken,
  hashPassword,
  verifyAdminCredentials,
  verifySessionToken,
} from "../../server/utils/admin-auth.ts";
import { getAdminRuntimeConfig } from "../../server/utils/admin-config.ts";

describe("admin auth helpers", () => {
  it("verifies the configured admin username and password hash", async () => {
    const passwordHash = await hashPassword("correct-password", "fixed-salt");

    assert.equal(
      await verifyAdminCredentials("admin", "correct-password", {
        adminUsername: "admin",
        adminPasswordHash: passwordHash,
      }),
      true,
    );

    assert.equal(
      await verifyAdminCredentials("admin", "wrong-password", {
        adminUsername: "admin",
        adminPasswordHash: passwordHash,
      }),
      false,
    );
  });

  it("rejects a session token after the admin password hash changes", () => {
    const token = createSessionToken("admin", "first-password-hash", 60_000);

    assert.equal(
      verifySessionToken(token, "first-password-hash")?.username,
      "admin",
    );
    assert.equal(verifySessionToken(token, "second-password-hash"), null);
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
});
