"use client";

import type { CSSProperties } from "react";
import s from "@/styles/experience.module.css";

type LanternGlowProps = {
  /** Percentages of the containing scene. */
  x: number;
  y: number;
  size: number;
  delay?: number;
  duration?: number;
};

export default function LanternGlow({
  x,
  y,
  size,
  delay = 0,
  duration = 7,
}: LanternGlowProps) {
  const style = {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}%`,
    aspectRatio: "1 / 1",
    transform: "translate(-50%, -50%)",
    "--delay": `${delay}s`,
    "--dur": `${duration}s`,
  } as CSSProperties;

  return <span className={s.lanternGlow} style={style} aria-hidden="true" />;
}
