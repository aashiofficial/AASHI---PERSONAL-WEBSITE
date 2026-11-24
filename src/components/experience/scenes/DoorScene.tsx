import s from "@/styles/experience.module.css";
import Vignette from "../effects/Vignette";

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
