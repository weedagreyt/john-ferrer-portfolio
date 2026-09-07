"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { siteAssets } from "../lib/portfolio";
import styles from "./intro-sequence.module.css";

const TOTAL = 4400;
const SKIP_RATE = 8;

const montageSlides = [
  "https://www.figma.com/api/mcp/asset/0b093f40-9db8-4e28-94d1-3d0f70f9b02a.png",
  "https://www.figma.com/api/mcp/asset/f00753b7-021b-409e-8319-3853d25d6864.png",
  "https://www.figma.com/api/mcp/asset/5875dd2d-14aa-4675-ae0b-a3602f9564c5.png",
  "https://www.figma.com/api/mcp/asset/955c43f1-8a4f-4fd4-a587-c83b8d53a7ab.png",
  "https://www.figma.com/api/mcp/asset/87e28bf9-578b-4500-8862-f82e3cabd110.png",
] as const;

const featuredProjects = [
  {
    name: "KOVE",
    type: "BRAND IDENTITY · ART DIRECTION",
    src: "https://www.figma.com/api/mcp/asset/a4f118aa-caf3-42cf-91e1-aae3af51fc05.png",
  },
  {
    name: "UNIMOTORS",
    type: "BRAND IDENTITY · MARKETING",
    src: "https://www.figma.com/api/mcp/asset/c0d21f3a-2bd4-4f1b-994f-f494084d10d2.png",
  },
  {
    name: "DOPE",
    type: "CAMPAIGN · PRINT · MARKETING",
    src: "https://www.figma.com/api/mcp/asset/5d08bcf7-f229-4889-9d34-08401c51103e.png",
  },
] as const;

const montageStarts = [560, 1030, 1410, 1750, 2050] as const;
const montageDurations = [790, 690, 620, 590, 560] as const;

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.src = src;
    image.onload = async () => {
      try {
        await image.decode();
      } catch {
        // The browser already has usable pixels; continue the intro.
      }
      resolve();
    };
    image.onerror = () => resolve();
  });
}

export default function IntroSequence() {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const coverRef = useRef<HTMLDivElement | null>(null);
  const atmosphereRef = useRef<HTMLImageElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const ignitionRef = useRef<HTMLDivElement | null>(null);
  const createRef = useRef<HTMLDivElement | null>(null);
  const solveRef = useRef<HTMLDivElement | null>(null);
  const beamRef = useRef<HTMLDivElement | null>(null);
  const skipHintRef = useRef<HTMLDivElement | null>(null);
  const montageRefs = useRef<Array<HTMLElement | null>>([]);
  const stackRefs = useRef<Array<HTMLElement | null>>([]);
  const animationsRef = useRef<Animation[]>([]);
  const masterRef = useRef<Animation | null>(null);
  const skippingRef = useRef(false);

  const snapHomeToTop = useCallback(() => {
    const isHomeTop =
      window.location.pathname === "/" &&
      (!window.location.hash || window.location.hash === "#top");

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
      window.setTimeout(snapHomeToTop, 60);
    });
  }, [snapHomeToTop]);

  const fastForward = useCallback(() => {
    if (!visible || skippingRef.current) return;

    if (!ready) {
      finishIntro();
      return;
    }

    skippingRef.current = true;
    animationsRef.current.forEach((animation) => {
      animation.playbackRate = SKIP_RATE;
    });

    if (masterRef.current) {
      masterRef.current.playbackRate = SKIP_RATE;
    }
  }, [finishIntro, ready, visible]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishIntro();
      return;
    }

    let cancelled = false;
    const sources = [...montageSlides, ...featuredProjects.map((project) => project.src), siteAssets.logo];
    const preloaders = sources.map(preloadImage);

    Promise.race([
      Promise.allSettled(preloaders.slice(0, 4)),
      new Promise<void>((resolve) => window.setTimeout(resolve, 420)),
    ]).then(() => {
      if (!cancelled) setReady(true);
    });

    Promise.allSettled(preloaders).catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [finishIntro]);

  useEffect(() => {
    const previousRestoration =
      "scrollRestoration" in window.history ? window.history.scrollRestoration : undefined;

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
    if (!ready || !visible) return;

    const animations: Animation[] = [];
    const animate = (
      node: Element | null,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions,
    ) => {
      if (!node) return null;
      const animation = node.animate(keyframes, {
        fill: "both",
        ...options,
      });
      animations.push(animation);
      return animation;
    };

    animate(
      atmosphereRef.current,
      [
        { opacity: 0.08, transform: "scale(1.01)" },
        { opacity: 0.58, transform: "scale(1.07)" },
      ],
      { duration: TOTAL, easing: "linear" },
    );

    animate(
      logoRef.current,
      [
        { opacity: 0, transform: "translate3d(0,8px,0) scale(.94)", filter: "blur(7px)" },
        { opacity: 1, transform: "translate3d(0,0,0) scale(1)", filter: "blur(0px)", offset: 0.28 },
        { opacity: 1, transform: "translate3d(0,0,0) scale(1)", filter: "blur(0px)", offset: 0.62 },
        { opacity: 0.22, transform: "translate3d(0,-4px,0) scale(1.02)", filter: "blur(0px)" },
      ],
      { duration: 760, delay: 80, easing: "cubic-bezier(.16,1,.3,1)" },
    );

    animate(
      ignitionRef.current,
      [
        { opacity: 0, transform: "translate3d(-72vw,0,0) skewX(-16deg) scaleX(.5)" },
        { opacity: 1, transform: "translate3d(-8vw,0,0) skewX(-16deg) scaleX(1)", offset: 0.34 },
        { opacity: 0.9, transform: "translate3d(18vw,0,0) skewX(-16deg) scaleX(1.15)", offset: 0.7 },
        { opacity: 0, transform: "translate3d(84vw,0,0) skewX(-16deg) scaleX(.6)" },
      ],
      { duration: 760, delay: 120, easing: "cubic-bezier(.7,0,.2,1)" },
    );

    montageRefs.current.forEach((node, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      const enterX = direction * (82 + index * 4);
      const exitX = -direction * (66 + index * 3);
      const rotation = direction * -5.5;

      animate(
        node,
        [
          {
            opacity: 0,
            transform: `translate3d(${enterX}vw, ${direction * 5}vh, 0) rotate(${rotation - direction * 5}deg) scale(.9)`,
            filter: "blur(5px) brightness(.72)",
          },
          {
            opacity: 1,
            transform: `translate3d(0, 0, 0) rotate(${rotation}deg) scale(1)`,
            filter: "blur(0px) brightness(.94)",
            offset: 0.22,
          },
          {
            opacity: 1,
            transform: `translate3d(${direction * -2}vw, ${direction}vh, 0) rotate(${rotation + direction}deg) scale(1.025)`,
            filter: "blur(0px) brightness(.92)",
            offset: 0.72,
          },
          {
            opacity: 0,
            transform: `translate3d(${exitX}vw, ${direction * -4}vh, 0) rotate(${rotation + direction * 7}deg) scale(.94)`,
            filter: "blur(3px) brightness(.68)",
          },
        ],
        {
          duration: montageDurations[index],
          delay: montageStarts[index],
          easing: "cubic-bezier(.2,.8,.2,1)",
        },
      );
    });

    animate(
      createRef.current,
      [
        { opacity: 0, transform: "translate3d(-8vw,36px,0) skewX(-8deg) scaleX(.88)", filter: "blur(7px)" },
        { opacity: 1, transform: "translate3d(0,0,0) skewX(-8deg) scaleX(1)", filter: "blur(0px)", offset: 0.24 },
        { opacity: 1, transform: "translate3d(2vw,0,0) skewX(-8deg) scaleX(1.015)", filter: "blur(0px)", offset: 0.72 },
        { opacity: 0, transform: "translate3d(14vw,-16px,0) skewX(-8deg) scaleX(.96)", filter: "blur(3px)" },
      ],
      { duration: 720, delay: 930, easing: "cubic-bezier(.16,1,.3,1)" },
    );

    animate(
      solveRef.current,
      [
        { opacity: 0, transform: "translate3d(12vw,40px,0) skewX(-8deg) scaleX(.9)", filter: "blur(7px)" },
        { opacity: 1, transform: "translate3d(0,0,0) skewX(-8deg) scaleX(1)", filter: "blur(0px)", offset: 0.24 },
        { opacity: 1, transform: "translate3d(-2vw,0,0) skewX(-8deg) scaleX(1.02)", filter: "blur(0px)", offset: 0.7 },
        { opacity: 0, transform: "translate3d(-14vw,-18px,0) skewX(-8deg) scaleX(.95)", filter: "blur(3px)" },
      ],
      { duration: 720, delay: 1580, easing: "cubic-bezier(.16,1,.3,1)" },
    );

    const stackTargets = [
      "translate3d(-8vw,-8vh,0) rotate(-9deg) scale(.86)",
      "translate3d(0,0,0) rotate(-5deg) scale(.92)",
      "translate3d(8vw,8vh,0) rotate(-1deg) scale(.98)",
    ];
    const stackEntries = [
      "translate3d(-92vw,18vh,0) rotate(-19deg) scale(1.12)",
      "translate3d(88vw,-16vh,0) rotate(10deg) scale(1.12)",
      "translate3d(0,82vh,0) rotate(-12deg) scale(1.1)",
    ];

    stackRefs.current.forEach((node, index) => {
      animate(
        node,
        [
          { opacity: 0, transform: stackEntries[index], filter: "blur(5px) brightness(.68)" },
          { opacity: 1, transform: stackTargets[index], filter: "blur(0px) brightness(.88)", offset: 0.68 },
          { opacity: 1, transform: stackTargets[index], filter: "blur(0px) brightness(.9)" },
        ],
        {
          duration: 820,
          delay: 2220 + index * 70,
          easing: "cubic-bezier(.14,.86,.18,1)",
        },
      );
    });

    animate(
      skipHintRef.current,
      [
        { opacity: 0 },
        { opacity: 0.68, offset: 0.16 },
        { opacity: 0.68, offset: 0.76 },
        { opacity: 0 },
      ],
      { duration: 3100, delay: 180, easing: "linear" },
    );

    animate(
      beamRef.current,
      [
        { opacity: 0, transform: "translate3d(-38vw,0,0) rotate(-17deg) scaleX(.65)" },
        { opacity: 1, transform: "translate3d(-5vw,0,0) rotate(-17deg) scaleX(1)", offset: 0.18 },
        { opacity: 1, transform: "translate3d(84vw,0,0) rotate(-17deg) scaleX(1.18)", offset: 0.72 },
        { opacity: 0, transform: "translate3d(128vw,0,0) rotate(-17deg) scaleX(.75)" },
      ],
      { duration: 900, delay: 3400, easing: "cubic-bezier(.72,0,.18,1)" },
    );

    animate(
      coverRef.current,
      [
        { transform: "translate3d(0,0,0) skewX(0deg)" },
        { transform: "translate3d(0,0,0) skewX(0deg)", offset: 0.04 },
        { transform: "translate3d(116%,0,0) skewX(-7deg)" },
      ],
      { duration: 830, delay: 3520, easing: "cubic-bezier(.82,0,.18,1)" },
    );

    const master = rootRef.current?.animate([{ opacity: 1 }, { opacity: 1 }], {
      duration: TOTAL,
      fill: "both",
    });

    if (master) {
      master.onfinish = finishIntro;
      masterRef.current = master;
    }

    animationsRef.current = animations;

    const allowWheelSkip = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      fastForward();
    };

    if (allowWheelSkip) {
      window.addEventListener("wheel", onWheel, { passive: false });
    }

    return () => {
      animations.forEach((animation) => animation.cancel());
      if (master) master.cancel();
      animationsRef.current = [];
      masterRef.current = null;
      if (allowWheelSkip) {
        window.removeEventListener("wheel", onWheel);
      }
    };
  }, [fastForward, finishIntro, ready, visible]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className={styles.overlay}
      onClick={fastForward}
      role="button"
      tabIndex={0}
      aria-label="Portfolio intro animation. Tap or click to skip."
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") fastForward();
      }}
    >
      <div ref={coverRef} className={styles.cover} aria-hidden="true">
        <img
          ref={atmosphereRef}
          className={styles.atmosphere}
          src="/racing-atmosphere.svg"
          alt=""
        />

        <div ref={logoRef} className={styles.logoFlash}>
          <img src={siteAssets.logo} alt="" />
          <span>JOHN FERRER · CREATIVE SYSTEM</span>
        </div>

        <div ref={ignitionRef} className={styles.ignition}>
          <i />
          <span>IGNITION</span>
        </div>

        <div className={styles.montage}>
          {montageSlides.map((src, index) => (
            <figure
              className={styles.montagePanel}
              key={src}
              ref={(node) => {
                montageRefs.current[index] = node;
              }}
            >
              <img src={src} alt="" loading="eager" decoding="async" />
            </figure>
          ))}
        </div>

        <div ref={createRef} className={`${styles.titleBeat} ${styles.createBeat}`}>
          CREATE<span>.</span>
        </div>
        <div ref={solveRef} className={`${styles.titleBeat} ${styles.solveBeat}`}>
          SOLVE<span>.</span>
        </div>

        <div className={styles.stack}>
          {featuredProjects.map((project, index) => (
            <figure
              className={styles.stackCard}
              key={project.name}
              ref={(node) => {
                stackRefs.current[index] = node;
              }}
            >
              <img src={project.src} alt="" loading="eager" decoding="async" />
              <b>0{index + 1}</b>
              <figcaption>
                <strong>{project.name}</strong>
                <span>{project.type}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div ref={beamRef} className={styles.beam} aria-hidden="true">
        <i />
      </div>

      <div ref={skipHintRef} className={styles.skipHint} aria-hidden="true">
        <span>Skip intro</span>
        <i>Tap / click</i>
      </div>
    </div>
  );
}
