import s from "@/styles/experience.module.css";
import type { Project } from "@/data/projects";

export default function ProjectDetails({ project }: { project: Project }) {
  return (
    <>
      <p className={s.modalEyebrow}>
        Volume {project.number} &middot; {project.kicker}
      </p>
      <h2 id="project-modal-title" className={s.modalTitle}>
        {project.title}
      </h2>
      <p className={s.modalTagline}>{project.tagline}</p>

      <div className={s.metaRow}>
        <span>
          <strong>Status</strong> {project.status}
        </span>
        <span>
          <strong>Role</strong> {project.role}
        </span>
      </div>

      <section className={s.section}>
        <h3 className={s.sectionTitle}>Overview</h3>
        <p className={s.prose}>{project.overview}</p>
      </section>

      <section className={s.section}>
        <h3 className={s.sectionTitle}>The problem</h3>
        <p className={s.prose}>{project.problem}</p>
      </section>

      <section className={s.section}>
        <h3 className={s.sectionTitle}>Objective</h3>
        <p className={s.prose}>{project.objective}</p>
      </section>

      <section className={s.section}>
        <h3 className={s.sectionTitle}>Technologies</h3>
        <ul className={s.stackList}>
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={s.section}>
        <h3 className={s.sectionTitle}>Main features</h3>
        <ul className={s.list}>
          {project.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className={s.section}>
        <h3 className={s.sectionTitle}>Architecture &amp; workflow</h3>
        <ol className={s.steps}>
          {project.architecture.map((step) => (
            <li key={step.title}>
              <span className={s.stepTitle}>{step.title}</span>
              {step.detail}
            </li>
          ))}
        </ol>
      </section>

      <section className={s.section}>
        <h3 className={s.sectionTitle}>Screenshots</h3>
        <div className={s.shotGrid}>
          {project.screenshots.map((shot) => (
            <div className={s.shot} key={shot.caption}>
              {shot.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={shot.src} alt={shot.caption} loading="lazy" />
              ) : (
                <span className={s.shotEmpty}>
                  <span>{shot.caption}</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={s.section}>
        <h3 className={s.sectionTitle}>Challenges</h3>
        <ul className={s.list}>
          {project.challenges.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={s.section}>
        <h3 className={s.sectionTitle}>Learnings</h3>
        <ul className={s.list}>
          {project.learnings.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div className={s.links}>
        {project.github ? (
          <a
            className={s.link}
            href={project.github.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {project.github.label} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className={s.linkMuted}>Repository link — to be added</span>
        )}
        {project.demo ? (
          <a
            className={s.link}
            href={project.demo.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {project.demo.label} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <span className={s.linkMuted}>Live demo — not yet published</span>
        )}
      </div>

      <p className={s.modalFooter}>
        Project copy lives in <code>src/data/projects.ts</code>.
      </p>
    </>
  );
}
