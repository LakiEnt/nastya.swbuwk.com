import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export type ProjectType = "Сайт" | "Айдентика" | "Фирменный стиль" | "SMM";

export interface ProjectImage {
  src: string;
  webp: string;
  width: number;
  height: number;
  alt: string;
}

export interface Project {
  id: number;
  title: string;
  year: number;
  type: ProjectType;
  description: string;
  image: ProjectImage;
  detailDescriptions: [string, string];
  galleryImages: [ProjectImage, ProjectImage, ProjectImage, ProjectImage];
}

export interface ProjectUpdate {
  title?: string;
  year?: number;
  type?: ProjectType;
  description?: string;
  image?: ProjectImage;
  detailDescriptions?: [string, string];
  galleryImages?: [ProjectImage, ProjectImage, ProjectImage, ProjectImage];
}

function getProjectsFilePath(): string {
  return process.env.PROJECTS_FILE_PATH ?? join(process.cwd(), "content", "projects.json");
}

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((left, right) => left.id - right.id);
}

function normalizeProject(project: Project): Project {
  const detailDescriptions = project.detailDescriptions ?? ["", ""];
  const galleryImages = project.galleryImages ?? [
    project.image,
    project.image,
    project.image,
    project.image,
  ];

  return {
    ...project,
    detailDescriptions: [
      detailDescriptions[0] ?? "",
      detailDescriptions[1] ?? "",
    ],
    galleryImages: [
      galleryImages[0] ?? project.image,
      galleryImages[1] ?? project.image,
      galleryImages[2] ?? project.image,
      galleryImages[3] ?? project.image,
    ],
  };
}

export async function readProjects(filePath = getProjectsFilePath()): Promise<Project[]> {
  const file = await readFile(filePath, "utf8");
  const projects = JSON.parse(file) as Project[];

  return sortProjects(projects.map(normalizeProject));
}

export async function writeProjects(
  projects: Project[],
  filePath = getProjectsFilePath(),
): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(sortProjects(projects), null, 2)}\n`);
}

export async function getProject(
  id: number,
  filePath = getProjectsFilePath(),
): Promise<Project | null> {
  const projects = await readProjects(filePath);

  return projects.find((project) => project.id === id) ?? null;
}

export async function createProject(filePath = getProjectsFilePath()): Promise<Project> {
  const projects = await readProjects(filePath);
  const nextId = projects.reduce((maxId, project) => Math.max(maxId, project.id), 0) + 1;
  const project: Project = {
    id: nextId,
    title: "Новый проект",
    description: "Описание проекта",
    type: "Сайт",
    year: new Date().getFullYear(),
    image: {
      src: "/images/projects/dental.png",
      webp: "/images/projects/dental.png",
      alt: "Новый проект",
      width: 655,
      height: 373,
    },
    detailDescriptions: ["", ""],
    galleryImages: [
      {
        src: "/images/projects/dental.png",
        webp: "/images/projects/dental.png",
        alt: "Новый проект",
        width: 655,
        height: 373,
      },
      {
        src: "/images/projects/dental.png",
        webp: "/images/projects/dental.png",
        alt: "Новый проект",
        width: 655,
        height: 373,
      },
      {
        src: "/images/projects/dental.png",
        webp: "/images/projects/dental.png",
        alt: "Новый проект",
        width: 655,
        height: 373,
      },
      {
        src: "/images/projects/dental.png",
        webp: "/images/projects/dental.png",
        alt: "Новый проект",
        width: 655,
        height: 373,
      },
    ],
  };

  await writeProjects([...projects, project], filePath);

  return project;
}

export async function deleteProject(
  id: number,
  filePath = getProjectsFilePath(),
): Promise<boolean> {
  const projects = await readProjects(filePath);
  const nextProjects = projects.filter((project) => project.id !== id);

  if (nextProjects.length === projects.length) {
    return false;
  }

  await writeProjects(nextProjects, filePath);

  return true;
}

export async function updateProject(
  id: number,
  update: ProjectUpdate,
  filePath = getProjectsFilePath(),
): Promise<Project | null> {
  const projects = await readProjects(filePath);
  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex === -1) {
    return null;
  }

  const currentProject = projects[projectIndex];
  const nextProject: Project = {
    ...currentProject,
    ...update,
    image: update.image ?? currentProject.image,
    detailDescriptions: update.detailDescriptions ?? currentProject.detailDescriptions,
    galleryImages: update.galleryImages ?? currentProject.galleryImages,
  };
  const nextProjects = [...projects];
  nextProjects[projectIndex] = nextProject;

  await writeProjects(nextProjects, filePath);

  return nextProject;
}
