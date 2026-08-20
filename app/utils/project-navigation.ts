interface ProjectNavigationItem {
  id: number;
}

export interface ProjectNavigation {
  label: "Следующий проект" | "Предыдущий проект";
  previousId: number | null;
  nextId: number | null;
}

export type ProjectNavigationDirection = "previous" | "next";

export function getProjectNavigation(
  projects: ProjectNavigationItem[],
  currentProjectId: number,
): ProjectNavigation {
  const currentIndex = projects.findIndex((project) => project.id === currentProjectId);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 ? projects[currentIndex + 1] : null;

  return {
    label: previousProject ? "Предыдущий проект" : "Следующий проект",
    previousId: previousProject?.id ?? null,
    nextId: nextProject?.id ?? null,
  };
}

export function getProjectNavigationLabel(
  navigation: ProjectNavigation,
  hoveredDirection: ProjectNavigationDirection | null,
): ProjectNavigation["label"] {
  if (hoveredDirection === "previous" && navigation.previousId) {
    return "Предыдущий проект";
  }

  if (hoveredDirection === "next" && navigation.nextId) {
    return "Следующий проект";
  }

  return navigation.label;
}
