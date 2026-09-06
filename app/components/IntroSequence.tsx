"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./intro-sequence.module.css";

const DURATION = 5103;
const SKIP_DURATION = 340;

const slides = [
  { src: "https://www.figma.com/api/mcp/asset/cfe94c45-518e-446d-a21f-3213aa22e356.png", reveal: 0, land: .60, x: 29.2, y: 42, scale: 1.09, stack: 0, position: "center center" },
  { src: "https://www.figma.com/api/mcp/asset/29e58c31-4e48-48a7-a486-96b9741e7984.png", reveal: .105, land: .58, x: 29.2, y: 40.4, scale: 1.1, stack: 1, position: "center center" },
  { src: "https://www.figma.com/api/mcp/asset/6fb1535d-68ca-4b99-9538-632aeba19343.png", reveal: .18, land: .555, x: 0, y: 42, scale: 1.15, stack: 0, position: "center center" },
  { src: "https://www.figma.com/api/mcp/asset/8fc3bd57-447c-47d2-aae4-1510de805512.png", reveal: .25, land: .535, x: 0, y: 40.3, scale: 1.15, stack: 1, position: "center center" },
  { src: "https://www.figma.com/api/mcp/asset/f2680699-650e-45ba-aeae-3d5fe6713bf8.png", reveal: .315, land: .515, x: 0, y: 38.6, scale: 1.15, stack: 2, position: "center center" },
  { src: "https://www.figma.com/api/mcp/asset/10663815-e71b-4ce3-bfdd-4a51d0e37383.png", reveal: .375, land: .49, x: -29.2, y: 42, scale: 1.15, stack: 0, position: "center 68%" },
  { src: "https://www.figma.com/api/mcp/asset/8400cef9-dffe-45bf-babe-6a5447a6faa0.png", reveal: .435, land: .47, x: -29.2, y: 40.4, scale: 1.05, stack: 1, position: "center center" },
] as const;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function IntroSequence() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const progressRef = useRef(0);
  const skipStartRef = useRef(0);
  const skipFromRef = useRef(0);
  const skippingRef = useRef(false);

  const skip = useCallback(() => {
    if (!visible || skippingRef.current) return;
    skippingRef.current = true;
    skipFromRef.current = progressRef.current;
    skipStartRef.current = performance.now();
  }, [visible]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisible(false);
      return;
    }

    startRef.current = performance.now();

    const tick = (now: number) => {
      let next: number;
      if (skippingRef.current) {
        const fast = clamp((now - skipStartRef.current) / SKIP_DURATION);
        next = lerp(skipFromRef.current, 1, easeOut(fast));
      } else {
        next = clamp((now - startRef.current) / DURATION);
      }

      progressRef.current = next;
      setProgress(next);

      if (next >= .999) {
        setVisible(false);
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    const wheel = () => skip();
    const touch = () => skip();
    window.addEventListener("wheel", wheel, { passive: true });
    window.addEventListener("touchmove", touch, { passive: true });

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("touchmove", touch);
    };
  }, [skip]);

  if (!visible) return null;

  const exit = easeInOut(clamp((progress - .86) / .14));
  const overlayStyle = {
    transform: `translate3d(0, ${-105 * exit}%, 0)`,
    opacity: 1 - clamp((progress - .94) / .06),
  } as CSSProperties;

  return (
    <div className={styles.overlay} style={overlayStyle} onPointerDown={skip} role="button" tabIndex={0} aria-label="Portfolio intro animation. Click or scroll to skip." onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") skip(); }}>
      <div className={styles.stage}>
        {slides.map((slide, index) => {
          if (progress < slide.reveal) return null;

          const arrival = easeOut(clamp((progress - slide.reveal) / .085));
          const landing = easeInOut(clamp((progress - slide.land) / (.79 - slide.land)));
          const scaleBeforeLanding = lerp(slide.scale, 1, arrival);
          const scale = lerp(scaleBeforeLanding, .285, landing);
          const x = slide.x * landing;
          const y = slide.y * landing;
          const radius = 22 * landing;
          const opacity = clamp((progress - slide.reveal) / .012);

          return (
            <div
              className={styles.slide}
              key={slide.src}
              style={{
                zIndex: 20 + index,
                opacity,
                borderRadius: `${radius}px`,
                transform: `translate3d(${x}vw, ${y}vh, 0) scale(${scale})`,
                boxShadow: landing > .1 ? `0 ${12 + slide.stack * 3}px 42px rgba(0,0,0,.28)` : "none",
              }}
            >
              <img src={slide.src} alt="" style={{ objectPosition: slide.position }} />
            </div>
          );
        })}
      </div>
      <div className={styles.skipHint}><span>Skip animation</span><i>Click or scroll</i></div>
    </div>
  );
}
