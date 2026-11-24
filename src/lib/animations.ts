import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

/* ============================================================
   Journey geometry
   ------------------------------------------------------------
   Garden:   1600x900 reference, glowing tree doorway at 33.2% / 49%
   Shaft:    1600x900 reference, the vortex sits at 50% / 64%
   Shelf:    1600x900 reference, three books across the middle
   ============================================================ */

export const GARDEN = { x: 0.332, y: 0.49, aspect: 1600 / 900 };
export const SHAFT = { x: 0.5, y: 0.64 };

/** Scene marks used by the progress rail and the caption. */
export const SCENE_MARKS = [
  { id: "garden", label: "The Garden", caption: "I · The Garden" },
  { id: "shaft", label: "The Descent", caption: "II · The Descent" },
  { id: "door", label: "The Door", caption: "III · The Chamber Door" },
  { id: "library", label: "The Library", caption: "IV · The Library" },
  { id: "shelf", label: "The Bookshelf", caption: "V · Projects & Creations" },
] as const;

export type Journey = {
  trigger: ScrollTrigger;
  kill: () => void;
};

export type JourneyOptions = {
  onProgress?: (progress: number) => void;
  onSceneChange?: (index: number) => void;
  onDoorZoneChange?: (inZone: boolean) => void;
  onDoorAutoOpen?: (open: boolean) => void;
  onShelfReady?: (ready: boolean) => void;
};

const isMobile = () => window.innerWidth <= 720;

export function buildJourney(
  stage: HTMLElement,
  /** The tall container the sticky stage travels through. */
  scroller: HTMLElement,
  options: JourneyOptions
): Journey | null {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const el = (name: string) =>
    stage.querySelector<HTMLElement>(`[data-el="${name}"]`);
  const layer = (name: string) =>
    stage.querySelector<HTMLElement>(`[data-layer="${name}"]`);

  const garden = layer("garden");
  const gardenFrame = el("gardenFrame");
  const portal = el("portal");
  const intro = el("intro");
  const hint = el("hint");
  const shaft = layer("shaft");
  const shaftFrame = el("shaftFrame");
  const shaftShade = el("shaftShade");
  const door = layer("door");
  const doorFrame = el("doorFrame");
  const library = layer("library");
  const libraryFrame = el("libraryFrame");
  const shelf = layer("shelf");
  const shelfFrame = el("shelfFrame");
  const shelfBackdrop = el("shelfBackdrop");
  const blackout = el("blackout");

  if (
    !garden ||
    !gardenFrame ||
    !portal ||
    !shaft ||
    !shaftFrame ||
    !door ||
    !doorFrame ||
    !library ||
    !libraryFrame ||
    !shelf ||
    !shelfFrame ||
    !blackout
  ) {
    return null;
  }

  /** Garden framing: mobile shifts the composition right to keep the door visible. */
  const gardenMetrics = () => {
    const width = gardenFrame.offsetWidth;
    const height = gardenFrame.offsetHeight;
    const mobile = isMobile();
    const preX = mobile ? width * 0.13 : 0;
    return {
      preX,
      preY: 0,
      x: -preX + (0.5 - GARDEN.x) * width,
      y: (0.5 - GARDEN.y) * height,
      scale: mobile ? 3 : 3.6,
    };
  };

  let sceneIndex = -1;
  let inDoorZone = false;
  let autoOpen = false;
  let shelfReady = false;
  let scrollTrigger: ScrollTrigger | undefined;

  const ctx = gsap.context(() => {
    const mobile = isMobile();
    const initial = gardenMetrics();

    gsap.set([shaft, door, library, shelf], { autoAlpha: 0 });
    gsap.set(gardenFrame, {
      transformOrigin: `${GARDEN.x * 100}% ${GARDEN.y * 100}%`,
      x: initial.preX,
      y: initial.preY,
    });
    gsap.set(shaftFrame, {
      transformOrigin: `${SHAFT.x * 100}% ${SHAFT.y * 100}%`,
    });
    gsap.set(portal, { autoAlpha: 0, scale: 0.45 });
    gsap.set(blackout, { autoAlpha: 0 });

    const timeline = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: scroller,
        start: 0,
        end: () => Math.max(1, scroller.offsetHeight - window.innerHeight),
        scrub: 0.9,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          options.onProgress?.(progress);

          const nextScene =
            progress < 0.41
              ? 0
              : progress < 0.68
                ? 1
                : progress < 0.82
                  ? 2
                  : progress < 0.93
                    ? 3
                    : 4;
          if (nextScene !== sceneIndex) {
            sceneIndex = nextScene;
            options.onSceneChange?.(nextScene);
          }

          const nextZone = progress > 0.695 && progress < 0.845;
          if (nextZone !== inDoorZone) {
            inDoorZone = nextZone;
            options.onDoorZoneChange?.(nextZone);
          }

          const nextAuto = progress > 0.775;
          if (nextAuto !== autoOpen) {
            autoOpen = nextAuto;
            options.onDoorAutoOpen?.(nextAuto);
          }

          const nextShelf = progress > 0.97;
          if (nextShelf !== shelfReady) {
            shelfReady = nextShelf;
            options.onShelfReady?.(nextShelf);
          }
        },
      },
    });

    scrollTrigger = timeline.scrollTrigger;

    /* ---------- I. The garden ---------- */
    if (hint) {
      timeline.to(hint, { autoAlpha: 0, duration: 4 }, 0.5);
    }
    if (intro) {
      timeline.to(
        intro,
        { autoAlpha: 0, y: -26, duration: 7, ease: "power1.out" },
        2.5
      );
    }

    // Camera approaches the tree without ever fully stopping, so the hand-off
    // into the light happens while the frame is still drifting forward.
    timeline.to(
      gardenFrame,
      {
        scale: () => gardenMetrics().scale,
        x: () => gardenMetrics().x,
        y: () => gardenMetrics().y,
        duration: 33,
        ease: "power1.in",
      },
      8
    );

    // Warm spill from the doorway, then the light swallows the frame.
    timeline.to(
      portal,
      { autoAlpha: 1, scale: 1, duration: 12, ease: "power2.in" },
      26
    );
    timeline.to(portal, { scale: 2.4, duration: 6, ease: "power2.in" }, 33);
    timeline.to(blackout, { autoAlpha: 1, duration: 5, ease: "power2.in" }, 36);
    timeline.to(garden, { autoAlpha: 0, duration: 4, ease: "power1.inOut" }, 40);

    /* ---------- II. The descent ---------- */
    timeline.fromTo(
      shaft,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 8, ease: "power1.inOut" },
      42
    );
    timeline.to(blackout, { autoAlpha: 0, duration: 6, ease: "power2.out" }, 45);

    // Fall into the shaft: scale into the vortex with a slow spiral.
    timeline.to(shaftFrame, { scale: () => (mobile ? 2.2 : 2.7), duration: 21 }, 45);
    timeline.to(shaftFrame, { rotate: mobile ? -4 : -7, duration: 21 }, 45);
    timeline.to(shaftShade, { opacity: 1, duration: 21 }, 45);

    /* ---------- III. The chamber door ---------- */
    // A soft dip through black here: the shaft and the door are visually
    // unrelated shots, so a hard cross-dissolve reads as a double exposure.
    timeline.to(shaft, { autoAlpha: 0, duration: 7, ease: "power1.inOut" }, 64);
    timeline.to(blackout, { autoAlpha: 1, duration: 4.5, ease: "power2.in" }, 66);
    timeline.fromTo(
      door,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 9, ease: "power1.inOut" },
      67.5
    );
    // The camera walks up to the doorway; the leaves open as it closes in.
    gsap.set(doorFrame, { transformOrigin: "50.9% 52%", scale: 1 });
    timeline.to(
      doorFrame,
      { scale: () => (mobile ? 1.75 : 2.1), duration: 18, ease: "power1.in" },
      67
    );
    timeline.to(blackout, { autoAlpha: 0, duration: 5.5, ease: "power2.out" }, 71);

    /* ---------- IV. The library ---------- */
    // The doorway is filled by now, so the library can rise through it.
    timeline.to(door, { autoAlpha: 0, duration: 7.5, ease: "power1.inOut" }, 81.5);
    timeline.to(library, { autoAlpha: 1, duration: 10, ease: "power1.inOut" }, 80);
    timeline.fromTo(
      libraryFrame,
      { scale: 1.3 },
      { scale: 1, duration: 15, ease: "power2.out" },
      80
    );
    timeline.to(
      libraryFrame,
      { scale: 1.12, duration: 7, ease: "power1.in" },
      86.5
    );

    /* ---------- V. The bookshelf ---------- */
    // The hall lets go of the frame first, then the shelf resolves out of the
    // haze a long way off and the camera travels in to meet it. One continuous
    // push-in instead of two pictures trading places.
    timeline.to(library, { autoAlpha: 0, duration: 6.5, ease: "power1.inOut" }, 89);
    timeline.fromTo(
      shelf,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 6, ease: "power1.inOut" },
      87.5
    );
    gsap.set(shelfFrame, { transformOrigin: "50% 50%" });
    timeline.fromTo(
      shelfFrame,
      { scale: 0.28, filter: "blur(3px)" },
      { scale: 1, filter: "blur(0px)", duration: 12, ease: "sine.inOut" },
      87
    );
    // The blurred room behind drifts in more slowly than the shelf itself, so
    // the two layers separate in depth on the way in.
    if (shelfBackdrop) {
      timeline.fromTo(
        shelfBackdrop,
        { scale: 1.22 },
        { scale: 1, duration: 12, ease: "sine.inOut" },
        87
      );
    }
  }, stage);

  if (!scrollTrigger) {
    ctx.revert();
    return null;
  }

  return { trigger: scrollTrigger, kill: () => ctx.revert() };
}
