"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import s from "@/styles/experience.module.css";
import {
  buildJourney,
  SCENE_MARKS,
  type Journey,
} from "@/lib/animations";
import type { ProjectId } from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import GardenScene from "./scenes/GardenScene";
import ShaftScene from "./scenes/ShaftScene";
import DoorScene from "./scenes/DoorScene";
import LibraryScene from "./scenes/LibraryScene";
import ProjectShelfScene from "./scenes/ProjectShelfScene";
import StaticJourney from "./StaticJourney";
import LoadingScreen from "@/components/ui/LoadingScreen";
import TopBar from "@/components/ui/TopBar";
import ProgressRail from "@/components/ui/ProgressRail";
import ProjectModal from "@/components/projects/ProjectModal";

/** Everything the journey needs, preloaded before the first scroll. */
const IMAGES = [
  "/images/garden.webp",
  "/images/shaft.webp",
  "/images/door.webp",
  "/images/library.webp",
  "/images/bookshelf.webp",
];

export default function Experience() {
  const reduced = useReducedMotion();
  const scrollProgress = useScrollProgress();

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scene, setScene] = useState(0);
  const [doorOpen, setDoorOpen] = useState(false);
  const [doorUnlocked, setDoorUnlocked] = useState(false);
  const [shelfReady, setShelfReady] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectId | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<Journey | null>(null);
  const doorOpenRef = useRef(false);

  /* ---------- Preload the five environments ---------- */
  useEffect(() => {
    let cancelled = false;
    let finished = 0;

    const settle = () => {
      if (cancelled) return;
      finished += 1;
      setLoadProgress(finished / IMAGES.length);
      if (finished === IMAGES.length) setLoaded(true);
    };

    IMAGES.forEach((src) => {
      const img = new Image();
      let counted = false;
      const once = () => {
        if (counted) return;
        counted = true;
        settle();
      };
      img.onload = once;
      img.onerror = once;
      img.src = src;
      if (typeof img.decode === "function") {
        img.decode().then(once).catch(() => {
          /* onload/onerror still settles this image */
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------- Build the scroll-driven journey ---------- */
  useEffect(() => {
    if (!loaded || reduced !== false || !stageRef.current || !trackRef.current)
      return;

    const stage = stageRef.current;
    const journey = buildJourney(stage, trackRef.current, {
      onSceneChange: setScene,
      onDoorZoneChange: setDoorUnlocked,
      onDoorAutoOpen: (open) => {
        if (!open) return;
        doorOpenRef.current = true;
        setDoorOpen(true);
      },
      onShelfReady: setShelfReady,
      onProgress: (progress) => {
        if (progress < 0.6 && doorOpenRef.current) {
          doorOpenRef.current = false;
          setDoorOpen(false);
        }
      },
    });

    journeyRef.current = journey;

    return () => {
      journey?.kill();
      journeyRef.current = null;
    };
  }, [loaded, reduced]);

  /* ---------- Door + navigation ---------- */
  const openDoor = useCallback(() => {
    if (doorOpenRef.current) return;
    doorOpenRef.current = true;
    setDoorOpen(true);

    const trigger = journeyRef.current?.trigger;
    if (!trigger || trigger.progress >= 0.8) return;

    gsap.to(window, {
      scrollTo: {
        y: trigger.start + (trigger.end - trigger.start) * 0.815,
      },
      duration: 2.6,
      delay: 0.55,
      ease: "power2.inOut",
    });
  }, []);

  const jumpTo = useCallback((fraction: number) => {
    const trigger = journeyRef.current?.trigger;
    if (!trigger) return;
    gsap.to(window, {
      scrollTo: { y: trigger.start + (trigger.end - trigger.start) * fraction },
      duration: 1.6,
      ease: "power2.inOut",
    });
  }, []);

  const closeProject = useCallback(() => setActiveProject(null), []);

  return (
    <>
      <LoadingScreen done={loaded} progress={loadProgress} />

      {reduced === null ? null : reduced ? (
        <StaticJourney onSelect={setActiveProject} />
      ) : (
        <div className={s.root}>
          <div className={s.journey} ref={trackRef}>
            <div className={s.stage} ref={stageRef}>
            <GardenScene />
            <ShaftScene />
            <DoorScene
              open={doorOpen}
              unlocked={doorUnlocked}
              onOpen={openDoor}
            />
            <LibraryScene />
            <ProjectShelfScene
              onSelect={setActiveProject}
              interactive={shelfReady}
            />
            <div
              className={s.blackout}
              data-el="blackout"
              aria-hidden="true"
            />
            <div
              className={s.flash}
              data-el="flash"
              aria-hidden="true"
            />
            <div className={s.grain} aria-hidden="true" />
            </div>
          </div>

          <TopBar onSkip={() => jumpTo(0.985)} />
          <ProgressRail
            scene={scene}
            onJump={jumpTo}
            visible={scrollProgress > 0.008}
          />
          <p className={s.caption} key={scene}>
            {SCENE_MARKS[scene].caption}
          </p>
        </div>
      )}

      <ProjectModal projectId={activeProject} onClose={closeProject} />
    </>
  );
}
