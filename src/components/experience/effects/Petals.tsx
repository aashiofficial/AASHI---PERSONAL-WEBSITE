"use client";

import type { CSSProperties } from "react";
import s from "@/styles/experience.module.css";

/** Deterministic pseudo-random so server and client markup match. */
const seed = (index: number, factor: number) => {
  const value = Math.sin((index + 1) * factor) * 10000;
  return value - Math.floor(value);
};

export default function Petals({ count = 16 }: { count?: number }) {
  return (
    <div className={s.petals} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => {
        const style = {
          left: `${seed(index, 12.9898) * 100}%`,
          "--dx": `${-60 + seed(index, 3.31) * 140}px`,
          "--dur": `${15 + seed(index, 78.233) * 15}s`,
          "--delay": `${-seed(index, 43.7) * 24}s`,
          "--s": `${0.6 + seed(index, 9.1) * 0.9}`,
          "--o": `${0.28 + seed(index, 7.7) * 0.42}`,
        } as CSSProperties;

        return <span key={index} className={s.petal} style={style} />;
      })}
    </div>
  );
}
