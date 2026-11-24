"use client";

import s from "@/styles/experience.module.css";

export default function TopBar({ onSkip }: { onSkip: () => void }) {
  return (
    <header className={s.topBar}>
      <p className={s.wordmark}>Aashi</p>
      <button type="button" className={s.skip} onClick={onSkip}>
        Skip to projects
      </button>
    </header>
  );
}
