"use client";

import { useState } from "react";
import s from "@/styles/experience.module.css";
import type { ProjectId } from "@/data/projects";
import GardenScene from "./scenes/GardenScene";
import ShaftScene from "./scenes/ShaftScene";
import DoorScene from "./scenes/DoorScene";
import LibraryScene from "./scenes/LibraryScene";
import ProjectShelfScene from "./scenes/ProjectShelfScene";

/**
 * Reduced-motion alternative: the same five environments, stacked in normal
 * document flow with no scroll hijacking, pinning or camera animation.
 */
export default function StaticJourney({
  onSelect,
}: {
  onSelect: (id: ProjectId) => void;
}) {
  const [doorOpen, setDoorOpen] = useState(false);

  return (
    <div className={s.staticRoot}>
      <section className={s.staticSection} aria-label="The garden">
        <GardenScene />
        <p className={s.staticCaption}>I · The Garden</p>
      </section>

      <section className={s.staticSection} aria-label="The descent">
        <ShaftScene />
        <p className={s.staticCaption}>II · The Descent</p>
      </section>

      <section className={s.staticSection} aria-label="The chamber door">
        <DoorScene
          open={doorOpen}
          unlocked
          onOpen={() => setDoorOpen(true)}
        />
        <p className={s.staticCaption}>III · The Chamber Door</p>
      </section>

      <section className={s.staticSection} aria-label="The library">
        <LibraryScene />
        <p className={s.staticCaption}>IV · The Library</p>
      </section>

      <section className={s.staticSection} aria-label="Projects and creations">
        <ProjectShelfScene onSelect={onSelect} interactive />
        <p className={s.staticCaption}>V · Projects &amp; Creations</p>
      </section>
    </div>
  );
}
