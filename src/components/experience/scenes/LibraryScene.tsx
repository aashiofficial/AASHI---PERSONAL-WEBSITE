import s from "@/styles/experience.module.css";
import DustParticles from "../effects/DustParticles";
import Vignette from "../effects/Vignette";

export default function LibraryScene() {
  return (
    <div className={`${s.layer} ${s.libraryLayer}`} data-layer="library">
      <div className={s.libraryFrame} data-el="libraryFrame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/library.webp"
          width={1600}
          height={900}
          alt="A vast Victorian reading hall: tiered galleries of books, a wrought-iron spiral staircase, chandeliers, tall arched windows and shafts of daylight falling across long reading tables."
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className={s.libraryBreathe} aria-hidden="true" />
      <DustParticles count={30} />
      <Vignette />
    </div>
  );
}
