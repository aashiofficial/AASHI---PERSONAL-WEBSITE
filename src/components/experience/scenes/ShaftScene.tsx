import s from "@/styles/experience.module.css";
import DustParticles from "../effects/DustParticles";
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

      <Vignette />
    </div>
  );
}
