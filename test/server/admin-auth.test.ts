import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  createSessionToken,
  hashPassword,
  verifyAdminCredentials,
  verifySessionToken,
} from "../../server/utils/admin-auth.ts";

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

  it("rejects a session token signed with another secret", () => {
    const token = createSessionToken("admin", "first-secret", 60_000);

    assert.equal(verifySessionToken(token, "first-secret")?.username, "admin");
    assert.equal(verifySessionToken(token, "second-secret"), null);
  });
});
