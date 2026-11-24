import s from "@/styles/experience.module.css";
import DustParticles from "../effects/DustParticles";
import LanternGlow from "../effects/LanternGlow";
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
        {/* Chandeliers and the far doorway, breathing inside the shot */}
        <LanternGlow x={50} y={12} size={30} delay={0.2} duration={9} />
        <LanternGlow x={50} y={29} size={16} delay={1.4} duration={7.5} />
        <LanternGlow x={50} y={64} size={13} delay={2.1} duration={8.5} />
      </div>

      <div className={s.libraryBreathe} aria-hidden="true" />
      <DustParticles count={30} />
      <Vignette />
    </div>
  );
}
