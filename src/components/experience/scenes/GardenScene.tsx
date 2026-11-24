import s from "@/styles/experience.module.css";
import Petals from "../effects/Petals";
import LanternGlow from "../effects/LanternGlow";

export default function GardenScene() {
  return (
    <div className={`${s.layer} ${s.gardenLayer}`} data-layer="garden">
      <div className={s.gardenViewport}>
        <div className={s.gardenFrame} data-el="gardenFrame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/garden.webp"
            width={1600}
            height={900}
            alt="A colossal cherry blossom tree at sunset, its trunk opening into a glowing arched doorway at the top of mossy stone steps, with a solarpunk city, wind turbines and a waterfall beyond."
            fetchPriority="high"
            decoding="async"
          />
          <div className={s.gardenShade} aria-hidden="true" />
          <div className={s.portal} data-el="portal" aria-hidden="true" />
        </div>
      </div>

      <Petals count={18} />
      <LanternGlow x={9} y={35} size={17} delay={0.4} />
      <LanternGlow x={40} y={32} size={13} delay={1.8} duration={8} />
      <LanternGlow x={55} y={47} size={12} delay={0.9} duration={6} />
      <LanternGlow x={46} y={51} size={9} delay={2.4} duration={9} />
      <LanternGlow x={17} y={63} size={10} delay={1.2} duration={7.5} />

      <div className={s.intro} data-el="intro">
        <p className={s.eyebrow}>A private archive</p>
        <h1 className={s.introTitle}>
          Aashi&rsquo;s <em>Portfolio</em>
        </h1>
        <p className={s.introText}>
          Some things are easier to find once you stop looking for a website
          and start looking for a door.
        </p>
      </div>

      <div className={s.hint} data-el="hint">
        <span className={s.hintLabel}>Scroll to explore</span>
        <span className={s.hintLine} aria-hidden="true" />
      </div>
    </div>
  );
}
