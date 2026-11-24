import s from "@/styles/experience.module.css";
import Vignette from "../effects/Vignette";
import Petals from "../effects/Petals";
import DustParticles from "../effects/DustParticles";
import LanternGlow from "../effects/LanternGlow";

type DoorSceneProps = {
  open: boolean;
  unlocked: boolean;
  onOpen: () => void;
};

export default function DoorScene({
  open,
  unlocked,
  onOpen,
}: DoorSceneProps) {
  return (
    <div
      className={`${s.layer} ${s.doorLayer} ${open ? s.doorOpen : ""}`.trim()}
      data-layer="door"
    >
      <div className={s.doorBackdrop} aria-hidden="true" />

      <div className={s.doorViewport}>
        <div className={s.doorFrame} data-el="doorFrame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={s.doorArt}
            src="/images/door.webp"
            width={1600}
            height={893}
            alt="A carved double door of dark oak with iron ring handles, set in a vine-covered stone arch at the bottom of a brick shaft. A brass plaque to the right reads Aashi's Portfolio — Ideas, Experiments, Creations."
            loading="lazy"
            decoding="async"
          />

          {/* The two wall lanterns, breathing over the painted flames */}
          <LanternGlow x={14.7} y={38.6} size={13} delay={0.3} duration={6.5} />
          <LanternGlow x={91.9} y={39.2} size={13} delay={1.7} duration={7.4} />

          <button
            type="button"
            className={s.doorGroup}
            onClick={onOpen}
            aria-label="Open the archive door"
            aria-expanded={open}
          >
            {/* What waits behind the leaves: the library, lit from within */}
            <span className={s.doorAperture} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={s.doorApertureImg}
                src="/images/library.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span className={s.doorGlow} />
            </span>

            <span className={`${s.leaf} ${s.leafLeft}`} aria-hidden="true">
              <span className={s.leafInner}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={s.leafImg}
                  src="/images/door.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </span>
            </span>

            <span className={`${s.leaf} ${s.leafRight}`} aria-hidden="true">
              <span className={s.leafInner}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className={s.leafImg}
                  src="/images/door.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </span>
            </span>
          </button>
        </div>
      </div>

      <Petals count={7} />
      <DustParticles count={20} />

      <div className={`${s.doorUi} ${open ? s.doorOpenUi : ""}`.trim()}>
        <p className={s.doorPrompt}>
          {unlocked
            ? "An archive, sealed since who knows when"
            : "A door in the dark"}
        </p>
        <button type="button" className={s.doorCta} onClick={onOpen}>
          Open the door
        </button>
      </div>

      <Vignette />
    </div>
  );
}
