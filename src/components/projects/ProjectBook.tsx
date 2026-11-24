"use client";

import s from "@/styles/experience.module.css";
import type { Project, ProjectId } from "@/data/projects";

type ProjectBookProps = {
  project: Project;
  /** Position over the artwork, in percent of the shelf frame. */
  left: number;
  width: number;
  onSelect: (id: ProjectId) => void;
};

export default function ProjectBook({
  project,
  left,
  width,
  onSelect,
}: ProjectBookProps) {
  return (
    <button
      type="button"
      className={s.book}
      style={{ left: `${left}%`, width: `${width}%` }}
      onClick={() => onSelect(project.id)}
      aria-label={`${project.title} — open project details`}
    >
      <span className={s.bookName} aria-hidden="true">
        {project.title}
      </span>
    </button>
  );
}
