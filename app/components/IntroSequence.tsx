"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./intro-sequence.module.css";

const TOTAL = 5750;
const CURTAIN_END = 650;
const STACK_START = 4400;
const STACK_STAGGER = 55;
const STACK_DURATION = 540;
const OUT_START = 5180;
const OUT_DURATION = 390;
const SKIP_DURATION = 480;

const slides = [
  { src: "https://www.figma.com/api/mcp/asset/0b093f40-9db8-4e28-94d1-3d0f70f9b02a.png", start: 0, end: 1450, zoomFrom: 1.10, zoomEnd: 1450, x: 29.2, y: 42.0, stack: 0, position: "center center" },
  { src: "https://www.figma.com/api/mcp/asset/f00753b7-021b-409e-8319-3853d25d6864.png", start: 1450, end: 2100, zoomFrom: 1.09, zoomEnd: 2100, x: 29.2, y: 40.4, stack: 1, position: "center center" },
  { src: "https://www.figma.com/api/mcp/asset/5875dd2d-14aa-4675-ae0b-a3602f9564c5.png", start: 2100, end: 2580, zoomFrom: 1.13, zoomEnd: 2580, x: 0, y: 42.0, stack: 0, position: "center center" },
  { src: "https://www.figma.com/api/mcp/asset/955c43f1-8a4f-4fd4-a587-c83b8d53a7ab.png", start: 2580, end: 2960, zoomFrom: 1.10, zoomEnd: 2960, x: 0, y: 40.3, stack: 1, position: "center center" },
  { src: "https://www.figma.com/api/mcp/asset/87e28bf9-578b-4500-8862-f82e3cabd110.png", start: 2960, end: 3270, zoomFrom: 1.10, zoomEnd: 3270, x: 0, y: 38.6, stack: 2, position: "center center" },
  { src: "https://www.figma.com/api/mcp/asset/5c29087d-9312-4a09-a5cf-f270ce4514c0.png", start: 3270, end: 3520, zoomFrom: 1.09, zoomEnd: 3520, x: -29.2, y: 42.0, stack: 0, position: "center 68%" },
  { src: "https://www.figma.com/api/mcp/asset/8b2d80b7-ed3a-41da-a7a8-2e8c5453e7ac.png", start: 3520, end: STACK_START, zoomFrom: 1.07, zoomEnd: 4040, x: -29.2, y: 40.4, stack: 1, position: "center center" },
] as const;

const finalStackX: Record<number, number> = {
  0: -29.2,
  1: -29.2,
  3: -29.2,
  4: 0,
  6: 0,
  2: 29.2,
  5: 29.2,
};

const finalStackZ: Record<number, number> = {
  0: 90,
  6: 90,
  2: 90,
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);
const easeIn = (t: number) => t * t * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function IntroSequence() {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [time, setTime] = useState(0);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const timeRef = useRef(0);
  const skippingRef = useRef(false);
  const skipStartRef = useRef(0);
  const skipFromRef = useRef(0);

  const snapHomeToTop = useCallback(() => {
    const isHomeTop = window.location.pathname === "/" && (!window.location.hash || window.location.hash === "#top");
    if (!isHomeTop) return;

    const scrollingElement = document.scrollingElement;
    if (scrollingElement) scrollingElement.scrollTop = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const finishIntro = useCallback(() => {
    snapHomeToTop();
    setVisible(false);
    requestAnimationFrame(() => {
      snapHomeToTop();
      window.setTimeout(snapHomeToTop, 80);
    });
  }, [snapHomeToTop]);

  const fastForward = useCallback(() => {
    if (!visible || !ready || skippingRef.current) return;
    skippingRef.current = true;
    skipStartRef.current = performance.now();
    skipFromRef.current = timeRef.current;
  }, [visible, ready]);

  useEffect(() => {
    const previousRestoration = "scrollRestoration" in window.history
      ? window.history.scrollRestoration
      : undefined;

    if (previousRestoration !== undefined) {
      window.history.scrollRestoration = "manual";
    }

    snapHomeToTop();
    const firstFrame = requestAnimationFrame(snapHomeToTop);
    const onPageShow = () => requestAnimationFrame(snapHomeToTop);

    window.addEventListener("pageshow", onPageShow);
    return () => {
      cancelAnimationFrame(firstFrame);
      window.removeEventListener("pageshow", onPageShow);
      if (previousRestoration !== undefined) {
        window.history.scrollRestoration = previousRestoration;
      }
    };
  }, [snapHomeToTop]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishIntro();
      return;
    }

    let cancelled = false;

    const preload = async () => {
      await Promise.allSettled(
        slides.map((slide) => new Promise<void>((resolve) => {
          const image = new Image();
          image.src = slide.src;
          image.decoding = "async";
          image.onload = async () => {
            try { await image.decode(); } catch { /* already loaded; continue */ }
            resolve();
          };
          image.onerror = () => resolve();
        }))
      );

      if (!cancelled) setReady(true);
    };

    preload();
    return () => { cancelled = true; };
  }, [finishIntro]);

  useEffect(() => {
    if (!ready || !visible) return;

    startRef.current = performance.now();

    const tick = (now: number) => {
      let next: number;
      if (skippingRef.current) {
        const p = clamp((now - skipStartRef.current) / SKIP_DURATION);
        next = lerp(skipFromRef.current, TOTAL, easeOut(p));
      } else {
        next = Math.min(TOTAL, now - startRef.current);
      }

      timeRef.current = next;
      setTime(next);

      if (next >= TOTAL - 1) {
        finishIntro();
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    const allowWheelSkip = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      fastForward();
    };

    if (allowWheelSkip) {
      window.addEventListener("wheel", onWheel, { passive: false });
    }

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (allowWheelSkip) {
        window.removeEventListener("wheel", onWheel);
      }
    };
  }, [fastForward, finishIntro, ready, visible]);

  if (!visible) return null;

  const curtain = ready ? easeIn(clamp(time / CURTAIN_END)) : 0;
  const out = easeIn(clamp((time - OUT_START) / OUT_DURATION));
  const overlayFade = smooth(clamp((time - (OUT_START + OUT_DURATION - 55)) / 95));
  const stacking = time >= STACK_START;

  return (
    <div
      className={styles.overlay}
      style={{ opacity: 1 - overlayFade } as CSSProperties}
      onClick={fastForward}
      role="button"
      tabIndex={0}
      aria-label="Portfolio intro animation. Tap or click to skip."
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") fastForward();
      }}
    >
      <div className={styles.stage}>
        {slides.map((slide, index) => {
          const zoomProgress = smooth(clamp((time - slide.start) / Math.max(1, slide.zoomEnd - slide.start)));
          const sceneScale = lerp(slide.zoomFrom, 1, zoomProgress);

          const stackDelay = (slides.length - 1 - index) * STACK_STAGGER;
          const stackProgress = easeInOut(clamp((time - (STACK_START + stackDelay)) / STACK_DURATION));
          const cardScale = lerp(sceneScale, .285, stackProgress);
          const targetX = finalStackX[index] ?? slide.x;
          const x = targetX * stackProgress;
          const baseY = slide.y * stackProgress;
          const y = baseY + out * 108;
          const radius = 22 * stackProgress;
          const finalScale = lerp(cardScale, .245, out);

          const isCurrentScene = time >= slide.start && time < slide.end;
          const show = ready && (stacking || isCurrentScene);
          const zIndex = stacking ? (finalStackZ[index] ?? 20 + index) : 20 + index;

          return (
            <div
              className={styles.slide}
              key={slide.src}
              aria-hidden={!show}
              style={{
                zIndex,
                opacity: show ? 1 : 0,
                visibility: show ? "visible" : "hidden",
                borderRadius: `${radius}px`,
                transform: `translate3d(${x}vw, ${y}vh, 0) scale(${finalScale})`,
                boxShadow: stackProgress > .08 ? `0 ${12 + slide.stack * 3}px 42px rgba(0,0,0,.30)` : "none",
              }}
            >
              <img
                src={slide.src}
                alt=""
                loading="eager"
                decoding="async"
                fetchPriority={index < 2 ? "high" : "auto"}
                style={{ objectPosition: slide.position }}
              />
            </div>
          );
        })}

        <div
          className={`${styles.curtain} ${styles.curtainTop}`}
          style={{ transform: `translate3d(0, ${-100 * curtain}%, 0)` }}
          aria-hidden="true"
        />
        <div
          className={`${styles.curtain} ${styles.curtainBottom}`}
          style={{ transform: `translate3d(0, ${100 * curtain}%, 0)` }}
          aria-hidden="true"
        />
      </div>

      {ready && (
        <div className={styles.skipHint} aria-hidden="true">
          <span>Skip animation</span>
          <i>Tap or click</i>
        </div>
      )}
    </div>
  );
}
