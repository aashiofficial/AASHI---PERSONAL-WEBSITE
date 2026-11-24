"use client";

import s from "@/styles/experience.module.css";
import { SCENE_MARKS } from "@/lib/animations";

type ProgressRailProps = {
  scene: number;
  onJump: (fraction: number) => void;
  visible: boolean;
};

/** Jump targets, one per scene, expressed as journey progress. */
export const SCENE_JUMPS = [0.015, 0.5, 0.7, 0.85, 0.985];

export default function ProgressRail({
  scene,
  onJump,
  visible,
}: ProgressRailProps) {
  return (
    <nav
      className={s.rail}
      aria-label="Journey chapters"
      style={{ opacity: visible ? 1 : 0, transition: "opacity .6s ease" }}
    >
      {SCENE_MARKS.map((mark, index) => (
        <button
          key={mark.id}
          type="button"
          className={`${s.railButton} ${scene === index ? s.railActive : ""}`.trim()}
          onClick={() => onJump(SCENE_JUMPS[index])}
          aria-current={scene === index ? "step" : undefined}
          aria-label={`Go to ${mark.label}`}
        >
          <span className={s.railDot} aria-hidden="true" />
          <span className={s.railLabel} aria-hidden="true">
            {mark.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
