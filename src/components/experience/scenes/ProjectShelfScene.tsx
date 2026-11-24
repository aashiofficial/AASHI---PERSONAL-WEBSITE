import s from "@/styles/experience.module.css";
import { projects, type ProjectId } from "@/data/projects";
import ProjectBook from "@/components/projects/ProjectBook";
import Vignette from "../effects/Vignette";

/**
 * Hit areas are locked to the three outward-facing volumes in the artwork.
 * Adjust these percentages if you swap the bookshelf image.
 */
const BOOK_LAYOUT = [
  { left: 28.9, width: 11.8 },
  { left: 44.1, width: 11.9 },
  { left: 60.1, width: 11.8 },
];

type ProjectShelfSceneProps = {
  onSelect: (id: ProjectId) => void;
  interactive: boolean;
};

export default function ProjectShelfScene({
  onSelect,
  interactive,
}: ProjectShelfSceneProps) {
  return (
    <div className={`${s.layer} ${s.shelfLayer}`} data-layer="shelf">
      <div className={s.shelfViewport}>
        <div
          className={s.shelfBackdrop}
          data-el="shelfBackdrop"
          aria-hidden="true"
        />

        <div
          className={s.shelfFrame}
          data-el="shelfFrame"
          style={{ pointerEvents: interactive ? "auto" : "none" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/bookshelf.webp"
            width={1600}
            height={893}
            alt="An ornate Victorian bookshelf under a carved sign reading Projects and Creations, with three featured volumes: ReRoute, InjectMeNot and FuturePath."
            loading="lazy"
            decoding="async"
          />

          <h2 id="shelf-heading" className={s.srOnly}>
            Projects &amp; Creations
          </h2>
          <p className={s.shelfHeadingMobile} aria-hidden="true">
            Projects &amp; Creations
          </p>

          {projects.map((project, index) => (
            <ProjectBook
              key={project.id}
              project={project}
              left={BOOK_LAYOUT[index].left}
              width={BOOK_LAYOUT[index].width}
              onSelect={onSelect}
            />
          ))}

          <p className={s.shelfHint}>
            {interactive ? "Choose a volume" : "Three volumes, recently bound"}
          </p>
        </div>
      </div>

      <Vignette />
    </div>
  );
}
