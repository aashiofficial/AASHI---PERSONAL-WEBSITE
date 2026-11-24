import s from "@/styles/experience.module.css";
import DustParticles from "../effects/DustParticles";
import LanternGlow from "../effects/LanternGlow";
import Vignette from "../effects/Vignette";

export default function ShaftScene() {
  return (
    <div className={`${s.layer} ${s.shaftLayer}`} data-layer="shaft">
      <div className={s.shaftBackdrop} aria-hidden="true" />

      <div className={s.shaftViewport}>
        <div className={s.shaftFrame} data-el="shaftFrame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/shaft.webp"
            width={1600}
            height={900}
            alt="Looking down a spiralling brick drainage shaft, its curved walls hung with vintage posters, framed illustrations and warm lanterns, with ivy growing between the bricks."
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className={s.shaftShade} data-el="shaftShade" aria-hidden="true" />
      <DustParticles count={26} />

      <LanternGlow x={11} y={47} size={13} delay={0.2} duration={6.5} />
      <LanternGlow x={28} y={34} size={10} delay={1.6} duration={8} />
      <LanternGlow x={59} y={39} size={9} delay={0.7} duration={7} />
      <LanternGlow x={66} y={61} size={11} delay={2.2} duration={9} />
      <LanternGlow x={46} y={57} size={8} delay={1.1} duration={5.5} />

      <Vignette />
    </div>
  );
}
