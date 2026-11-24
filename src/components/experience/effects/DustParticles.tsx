"use client";

import type { CSSProperties } from "react";
import s from "@/styles/experience.module.css";

const seed = (index: number, factor: number) => {
  const value = Math.sin((index + 1) * factor) * 10000;
  return value - Math.floor(value);
};

type DustParticlesProps = {
  count?: number;
};

export default function DustParticles({ count = 22 }: DustParticlesProps) {
  return (
    <div className={s.dust} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => {
        const style = {
          left: `${seed(index, 12.9898) * 100}%`,
          top: `${seed(index, 4.7) * 40}%`,
          "--dx": `${-30 + seed(index, 3.31) * 70}px`,
          "--dur": `${16 + seed(index, 78.233) * 18}s`,
          "--delay": `${-seed(index, 43.7) * 28}s`,
          "--size": `${1 + seed(index, 5.3) * 3}px`,
          "--o": `${0.18 + seed(index, 7.7) * 0.42}`,
        } as CSSProperties;

        return <span key={index} className={s.mote} style={style} />;
      })}
    </div>
  );
}
