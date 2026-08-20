import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";

import {
  readAbout,
  updateAbout,
  writeAbout,
} from "../../server/utils/about.ts";

describe("about JSON storage", () => {
  it("reads about page content with normalized list items", async () => {
    const filePath = join(await mkdtemp(join(tmpdir(), "portfolio-about-")), "about.json");

    await writeAbout(
      {
        titlePrefix: "немного",
        titleAccent: "обо мне",
        image: {
          src: "/images/front3.png",
          webp: "/images/front3.png",
          width: 272,
          height: 380,
          alt: "Настя Сергеева",
        },
        intro: ["Intro one", "Intro two"],
        items: [
          {
            title: "Образование",
            description: "Описание образования",
          },
          {
            title: "Опыт",
          },
        ],
        contactText: "БУДУ РАДА ПООБЩАТЬСЯ",
      },
      filePath,
    );

    const about = await readAbout(filePath);

    assert.deepEqual(about.intro, ["Intro one", "Intro two"]);
    assert.equal(about.items[0].description, "Описание образования");
    assert.equal(about.items[1].description, "");
    assert.equal(about.contactText, "БУДУ РАДА ПООБЩАТЬСЯ");
  });

  it("updates editable about page fields", async () => {
    const filePath = join(await mkdtemp(join(tmpdir(), "portfolio-about-")), "about.json");

    await writeAbout(
      {
        titlePrefix: "немного",
        titleAccent: "обо мне",
        image: {
          src: "/images/front3.png",
          webp: "/images/front3.png",
          width: 272,
          height: 380,
          alt: "Настя Сергеева",
        },
        intro: ["Intro one", "Intro two"],
        items: [
          {
            title: "Образование",
            description: "Описание образования",
          },
        ],
        contactText: "БУДУ РАДА ПООБЩАТЬСЯ",
      },
      filePath,
    );

    const about = await updateAbout(
      {
        titlePrefix: "больше",
        titleAccent: "о работе",
        intro: ["Updated one", "Updated two"],
        items: [
          {
            title: "Новый блок",
            description: "Новое описание",
          },
        ],
        contactText: "Напишите мне",
      },
      filePath,
    );

    assert.equal(about.titlePrefix, "больше");
    assert.equal(about.titleAccent, "о работе");
    assert.deepEqual(about.intro, ["Updated one", "Updated two"]);
    assert.equal(about.items.length, 1);
    assert.equal(about.items[0].title, "Новый блок");
    assert.equal(about.items[0].description, "Новое описание");
    assert.equal(about.image.src, "/images/front3.png");
    assert.equal((await readAbout(filePath)).contactText, "Напишите мне");
  });
});
