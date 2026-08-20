import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  getProjectNavigation,
  getProjectNavigationLabel,
} from "../../app/utils/project-navigation.ts";

describe("project navigation", () => {
  it("disables the previous project link and points to the next project for the first item", () => {
    const navigation = getProjectNavigation([{ id: 1 }, { id: 2 }, { id: 3 }], 1);

    assert.equal(navigation.label, "Следующий проект");
    assert.equal(navigation.previousId, null);
    assert.equal(navigation.nextId, 2);
  });

  it("points to the previous and next projects for middle items", () => {
    const navigation = getProjectNavigation([{ id: 1 }, { id: 2 }, { id: 3 }], 2);

    assert.equal(navigation.label, "Предыдущий проект");
    assert.equal(navigation.previousId, 1);
    assert.equal(navigation.nextId, 3);
  });

  it("uses the hovered arrow direction for the visible label", () => {
    const navigation = getProjectNavigation([{ id: 1 }, { id: 2 }, { id: 3 }], 2);

    assert.equal(getProjectNavigationLabel(navigation, "previous"), "Предыдущий проект");
    assert.equal(getProjectNavigationLabel(navigation, "next"), "Следующий проект");
    assert.equal(getProjectNavigationLabel(navigation, null), "Предыдущий проект");
  });
});
