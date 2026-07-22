import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";

import {
  createProject,
  deleteProject,
  readProjects,
  updateProject,
  writeProjects,
} from "../../server/utils/projects.ts";

describe("project JSON storage", () => {
  it("creates a project with the next numeric id", async () => {
    const filePath = join(await mkdtemp(join(tmpdir(), "portfolio-projects-")), "projects.json");

    await writeProjects(
      [
        {
          id: 1,
          title: "First",
          description: "First description",
          type: "Сайт",
          year: 2024,
          image: {
            src: "/images/projects/first.png",
            webp: "/images/projects/first.png",
            alt: "First",
            width: 655,
            height: 373,
          },
        },
      ],
      filePath,
    );

    const project = await createProject(filePath);

    assert.equal(project.id, 2);
    assert.equal(project.title, "Новый проект");
    assert.deepEqual(
      (await readProjects(filePath)).map((item) => item.id),
      [1, 2],
    );
  });

  it("deletes a project by id", async () => {
    const filePath = join(await mkdtemp(join(tmpdir(), "portfolio-projects-")), "projects.json");

    await writeProjects(
      [
        {
          id: 1,
          title: "First",
          description: "First description",
          type: "Сайт",
          year: 2024,
          image: {
            src: "/images/projects/first.png",
            webp: "/images/projects/first.png",
            alt: "First",
            width: 655,
            height: 373,
          },
        },
        {
          id: 2,
          title: "Second",
          description: "Second description",
          type: "SMM",
          year: 2025,
          image: {
            src: "/images/projects/second.png",
            webp: "/images/projects/second.png",
            alt: "Second",
            width: 655,
            height: 373,
          },
        },
      ],
      filePath,
    );

    assert.equal(await deleteProject(1, filePath), true);
    assert.deepEqual(
      (await readProjects(filePath)).map((item) => item.id),
      [2],
    );
    assert.equal(await deleteProject(10, filePath), false);
  });

  it("updates editable project fields", async () => {
    const filePath = join(await mkdtemp(join(tmpdir(), "portfolio-projects-")), "projects.json");

    await writeProjects(
      [
        {
          id: 1,
          title: "First",
          description: "First description",
          type: "Сайт",
          year: 2024,
          image: {
            src: "/images/projects/first.png",
            webp: "/images/projects/first.png",
            alt: "First",
            width: 655,
            height: 373,
          },
        },
      ],
      filePath,
    );

    const project = await updateProject(
      1,
      {
        title: "Updated title",
        description: "Updated description",
        type: "SMM",
        year: 2026,
      },
      filePath,
    );

    assert.equal(project?.title, "Updated title");
    assert.equal(project?.description, "Updated description");
    assert.equal(project?.type, "SMM");
    assert.equal(project?.year, 2026);
    assert.equal(project?.image.src, "/images/projects/first.png");
    assert.equal(await updateProject(99, { title: "Missing" }, filePath), null);
  });

  it("updates project page descriptions and gallery images", async () => {
    const filePath = join(await mkdtemp(join(tmpdir(), "portfolio-projects-")), "projects.json");

    await writeProjects(
      [
        {
          id: 1,
          title: "First",
          description: "First description",
          type: "Сайт",
          year: 2024,
          image: {
            src: "/images/projects/first.png",
            webp: "/images/projects/first.png",
            alt: "First",
            width: 655,
            height: 373,
          },
        },
      ],
      filePath,
    );

    const project = await updateProject(
      1,
      {
        detailDescriptions: ["Top page text", "Bottom page text"],
        galleryImages: [
          {
            src: "/images/projects/one.png",
            webp: "/images/projects/one.png",
            alt: "One",
            width: 655,
            height: 373,
          },
          {
            src: "/images/projects/two.png",
            webp: "/images/projects/two.png",
            alt: "Two",
            width: 655,
            height: 373,
          },
          {
            src: "/images/projects/three.png",
            webp: "/images/projects/three.png",
            alt: "Three",
            width: 655,
            height: 373,
          },
          {
            src: "/images/projects/four.png",
            webp: "/images/projects/four.png",
            alt: "Four",
            width: 655,
            height: 373,
          },
        ],
      },
      filePath,
    );

    assert.deepEqual(project?.detailDescriptions, ["Top page text", "Bottom page text"]);
    assert.equal(project?.galleryImages?.length, 4);
    assert.equal(project?.galleryImages?.[3].src, "/images/projects/four.png");
  });
});
