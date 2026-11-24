"use client";

import { useEffect, useRef } from "react";
import s from "@/styles/experience.module.css";
import { getProject, type ProjectId } from "@/data/projects";
import ProjectDetails from "./ProjectDetails";

type ProjectModalProps = {
  projectId: ProjectId | null;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({
  projectId,
  onClose,
}: ProjectModalProps) {
  const project = projectId ? getProject(projectId) : undefined;
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!project) return;

    const previous = document.activeElement as HTMLElement | null;
    document.body.classList.add("modal-open");
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !overlayRef.current) return;

      const nodes = Array.from(
        overlayRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((node) => node.offsetParent !== null);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !overlayRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
      previous?.focus?.();
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      className={s.modalOverlay}
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        className={s.modalClose}
        onClick={onClose}
        ref={closeRef}
        aria-label="Close project details"
      >
        <span aria-hidden="true">✕</span>
      </button>

      <div className={s.modalCard}>
        <ProjectDetails project={project} />
      </div>
    </div>
  );
}
