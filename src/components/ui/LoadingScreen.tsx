"use client";

import type { CSSProperties } from "react";
import s from "@/styles/experience.module.css";

type LoadingScreenProps = {
  done: boolean;
  progress: number;
};

export default function LoadingScreen({ done, progress }: LoadingScreenProps) {
  return (
    <div
      className={`${s.loader} ${done ? s.loaderHidden : ""}`.trim()}
      aria-hidden={done}
      role="status"
      aria-live="polite"
    >
      <div className={s.loaderInner}>
        <p className={s.loaderMark}>A private archive</p>
        <h1 className={s.loaderTitle}>Aashi&rsquo;s Portfolio</h1>
        <p className={s.loaderText}>
          {done ? "The door is open" : "Gathering the garden\u2026"}
        </p>
        <div className={s.loaderBar}>
          <div
            className={s.loaderFill}
            style={{ "--p": progress } as CSSProperties}
          />
        </div>
      </div>
    </div>
  );
}
