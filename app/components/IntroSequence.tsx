"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { siteAssets } from "../lib/portfolio";

const TOTAL_MS = 4400;
const INTRO_VERSION = "jf:intro:v15";

const projectScenes = [
  {
    src: "/intro/scene-01.jpg",
    delay: 0.52,
    duration: 0.92,
    position: "52% 50%",
    mobilePosition: "0% 42%",
    x0: "4.5%",
    y0: "2.5%",
    x1: "-4%",
    y1: "-2%",
    s0: "1.01",
    s1: "1.035",
    r0: "-0.45deg",
    r1: "0.18deg",
  },
  {
    src: "/intro/scene-02.jpg",
    videoSrc: "/work/art-exploration/unicorn-2.mp4",
    delay: 1.12,
    duration: 0.88,
    position: "48% 48%",
    mobilePosition: "50% 50%",
    x0: "-5%",
    y0: "-1%",
    x1: "3.5%",
    y1: "2.5%",
    s0: "1.01",
    s1: "1.035",
    r0: "0.35deg",
    r1: "-0.18deg",
  },
  {
    src: "/intro/scene-03.jpg",
    delay: 1.74,
    duration: 0.9,
    position: "54% 50%",
    mobilePosition: "58% 47%",
    x0: "2%",
    y0: "-2%",
    x1: "-2.5%",
    y1: "1.5%",
    s0: "1.015",
    s1: "1.035",
    r0: "-0.2deg",
    r1: "0.12deg",
  },
  {
    src: "/intro/scene-04-unimotors.jpg",
    delay: 2.34,
    duration: 0.86,
    position: "50% 50%",
    mobilePosition: "50% 50%",
    x0: "-4%",
    y0: "2%",
    x1: "4%",
    y1: "-1.5%",
    s0: "1.01",
    s1: "1.035",
    r0: "0.35deg",
    r1: "-0.15deg",
  },
  {
    src: "/intro/scene-05.jpg",
    mobileSrc: "/retrophorics-mobile-intro.jpg",
    delay: 2.9,
    duration: 0.96,
    position: "51% 51%",
    mobilePosition: "78% 50%",
    x0: "1%",
    y0: "1.5%",
    x1: "-1%",
    y1: "-2%",
    s0: "1.05",
    s1: "1.1",
    r0: "-0.32deg",
    r1: "0.16deg",
  },
] as const;

function safeSessionGet(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSessionSet(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in hardened/private contexts. The intro still works.
  }
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.src = src;
    image.onload = async () => {
      try {
        await image.decode();
      } catch {
        // onload already guarantees usable pixels.
      }
      resolve();
    };
    image.onerror = () => resolve();
  });
}

function preloadScene(scene: (typeof projectScenes)[number]) {
  return "videoSrc" in scene ? Promise.resolve() : preloadImage(sceneSource(scene));
}

function sceneSource(scene: (typeof projectScenes)[number]) {
  return "mobileSrc" in scene && window.matchMedia("(max-width:760px)").matches
    ? scene.mobileSrc
    : scene.src;
}

export default function IntroSequence() {
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [exiting, setExiting] = useState(false);
  const completeTimer = useRef<number | null>(null);
  const markTimers = useRef<number[]>([]);
  const finishing = useRef(false);

  const finish = useCallback((animated = false) => {
    if (finishing.current) return;
    finishing.current = true;
    safeSessionSet(INTRO_VERSION, "seen");

    if (animated) {
      setExiting(true);
      window.setTimeout(() => setVisible(false), 130);
    } else {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isHome = window.location.pathname === "/" && window.location.hash === "";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = safeSessionGet(INTRO_VERSION) === "seen";
    const historyRestore = navigation?.type === "back_forward";

    if (!isHome || reducedMotion || alreadySeen || historyRestore) {
      setVisible(false);
      return;
    }

    let cancelled = false;
    const critical = Promise.all(projectScenes.map(preloadScene));
    const timeout = new Promise<"timeout">((resolve) => {
      window.setTimeout(() => resolve("timeout"), 2500);
    });

    Promise.race([critical.then(() => "ready" as const), timeout]).then((result) => {
      if (cancelled) return;
      if (result === "ready") {
        setReady(true);
      } else {
        finish(false);
      }
    });

    void preloadImage(siteAssets.logo);

    return () => {
      cancelled = true;
    };
  }, [finish]);

  useEffect(() => {
    if (!ready || !visible) return;

    finishing.current = false;
    performance.mark?.("jf-intro:start");

    const marks: Array<[string, number]> = [
      ["jf-intro:project", 520],
      ["jf-intro:macro", 1740],
      ["jf-intro:crescendo", 2340],
      ["jf-intro:handoff", 3540],
      ["jf-intro:hero", 3820],
    ];

    markTimers.current = marks.map(([name, ms]) =>
      window.setTimeout(() => performance.mark?.(name), ms),
    );

    completeTimer.current = window.setTimeout(() => {
      performance.mark?.("jf-intro:complete");
      finish(false);
    }, TOTAL_MS + 40);

    return () => {
      if (completeTimer.current !== null) window.clearTimeout(completeTimer.current);
      markTimers.current.forEach((timer) => window.clearTimeout(timer));
      markTimers.current = [];
    };
  }, [finish, ready, visible]);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        performance.mark?.("jf-intro:skip");
        finish(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [finish, visible]);

  if (!visible) return null;

  const sceneStyle = (scene: (typeof projectScenes)[number]) =>
    ({
      "--delay": `${scene.delay}s`,
      "--duration": `${scene.duration}s`,
      "--mobile-position": scene.mobilePosition,
      "--x0": scene.x0,
      "--y0": scene.y0,
      "--x1": scene.x1,
      "--y1": scene.y1,
      "--s0": scene.s0,
      "--s1": scene.s1,
      "--r0": scene.r0,
      "--r1": scene.r1,
    }) as CSSProperties;

  const skip = () => {
    performance.mark?.("jf-intro:skip");
    finish(true);
  };

  return (
    <div
      className={`jf-intro ${ready ? "jf-intro--play" : ""} ${exiting ? "jf-intro--exit" : ""}`}
      aria-label="John Ferrer portfolio opening sequence"
      onClick={skip}
    >
      <style>{INTRO_CSS}</style>

      <div className="jf-intro__cover" aria-hidden="true">
        <img className="jf-intro__atmosphere" src="/racing-atmosphere.svg" alt="" />

        <div className="jf-intro__logo-lockup">
          <img src={siteAssets.logo} alt="" />
          <span>JOHN FERRER</span>
        </div>

        <div className="jf-intro__ignition">
          <span className="jf-intro__ignition-core" />
          <span className="jf-intro__ignition-copy">VISUAL SYSTEM / 001</span>
        </div>

        <div className="jf-intro__scenes">
          {projectScenes.map((scene, index) => (
            <figure className="jf-intro__scene" data-mobile-framed={"mobileSrc" in scene ? "true" : undefined} style={sceneStyle(scene)} key={scene.src}>
              {"videoSrc" in scene ? (
                <video src={scene.videoSrc} autoPlay loop muted playsInline preload="auto" />
              ) : (
                <picture>
                  {"mobileSrc" in scene && <source media="(max-width:760px)" srcSet={scene.mobileSrc} />}
                  <img src={scene.src} alt="" style={{ objectPosition: scene.position }} />
                </picture>
              )}
              <span className="jf-intro__scene-index">0{index + 1}</span>
            </figure>
          ))}
        </div>

        <div className="jf-intro__microcopy">DESIGN / DIRECTION / IMPACT</div>
      </div>

      <svg className="jf-intro__line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path
          className="jf-intro__line-glow"
          pathLength="100"
          d="M -8 82 C 12 72, 18 34, 42 44 S 68 78, 108 18"
        />
        <path
          className="jf-intro__line-core"
          pathLength="100"
          d="M -8 82 C 12 72, 18 34, 42 44 S 68 78, 108 18"
        />
      </svg>

      <div className="jf-intro__occluder" aria-hidden="true">
        <i />
      </div>
      <div className="jf-intro__hero-flare" aria-hidden="true" />

      <button
        className="jf-intro__skip"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          skip();
        }}
      >
        Skip intro
      </button>
    </div>
  );
}

const INTRO_CSS = String.raw`
.jf-intro{
  position:fixed;
  inset:0;
  z-index:9999;
  overflow:hidden;
  background:transparent;
  touch-action:none;
  isolation:isolate;
  transition:opacity .13s linear;
}
.jf-intro--exit{opacity:0}
.jf-intro__cover{
  position:absolute;
  inset:0 -7vw 0 -7vw;
  overflow:hidden;
  background:#030405;
  transform-origin:50% 50%;
  will-change:transform;
}
.jf-intro--play .jf-intro__cover{
  animation:jfCoverOut .68s cubic-bezier(.83,0,.17,1) 3.72s both;
}
.jf-intro__atmosphere{
  position:absolute;
  inset:-8%;
  width:116%;
  height:116%;
  max-width:none;
  object-fit:cover;
  object-position:68% 48%;
  opacity:.16;
  transform:scale(1.02);
  pointer-events:none;
}
.jf-intro--play .jf-intro__atmosphere{
  animation:jfAtmosphere 4.4s linear both;
}
.jf-intro__cover::before{
  content:"";
  position:absolute;
  inset:0;
  z-index:2;
  pointer-events:none;
  background:
    radial-gradient(circle at 76% 29%,rgba(240,24,32,.25),transparent 30%),
    linear-gradient(90deg,rgba(3,4,5,.74),rgba(3,4,5,.06) 62%,rgba(3,4,5,.28));
}
.jf-intro__cover::after{
  content:"";
  position:absolute;
  inset:0;
  z-index:48;
  pointer-events:none;
  box-shadow:inset 0 0 120px rgba(0,0,0,.72);
  background:linear-gradient(180deg,rgba(0,0,0,.12),transparent 42%,rgba(0,0,0,.48));
}
.jf-intro__logo-lockup{
  position:absolute;
  left:clamp(22px,4vw,64px);
  top:clamp(20px,4vh,46px);
  z-index:70;
  display:flex;
  align-items:center;
  gap:14px;
  opacity:0;
  pointer-events:none;
}
.jf-intro__logo-lockup img{
  width:clamp(66px,7vw,94px);
  height:auto;
  filter:brightness(0) invert(1);
}
.jf-intro__logo-lockup span{
  color:rgba(255,255,255,.68);
  font-size:8px;
  font-weight:900;
  letter-spacing:.24em;
}
.jf-intro--play .jf-intro__logo-lockup{
  animation:jfLogo .72s cubic-bezier(.16,1,.3,1) .06s both;
}
.jf-intro__ignition{
  position:absolute;
  left:7vw;
  right:7vw;
  top:50%;
  z-index:72;
  display:flex;
  align-items:center;
  gap:14px;
  opacity:0;
  transform:translateY(-50%);
  pointer-events:none;
}
.jf-intro__ignition-core{
  height:5px;
  flex:1;
  border-radius:99px;
  background:linear-gradient(90deg,transparent,#8d050a 18%,#f01820 47%,#fff 52%,#f01820 58%,transparent);
  box-shadow:0 0 14px rgba(240,24,32,.84),0 0 34px rgba(240,24,32,.42);
  transform-origin:left center;
}
.jf-intro__ignition-copy{
  color:rgba(255,255,255,.54);
  font-size:8px;
  font-weight:900;
  letter-spacing:.22em;
  white-space:nowrap;
}
.jf-intro--play .jf-intro__ignition{
  animation:jfIgnition .62s cubic-bezier(.7,0,.22,1) .08s both;
}
.jf-intro__scenes{position:absolute;inset:0;z-index:8;pointer-events:none}
.jf-intro__scene{
  position:absolute;
  inset:-3%;
  margin:0;
  overflow:hidden;
  opacity:0;
  transform-origin:center;
  will-change:transform,opacity;
}
.jf-intro__scene img,
.jf-intro__scene video{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  max-width:none;
  object-fit:cover;
  display:block;
  background:#030405;
  transform:scale(1);
  filter:saturate(1.04) contrast(1.04) brightness(.88);
}
.jf-intro__scene::before{
  content:"";
  position:absolute;
  inset:0;
  z-index:2;
  pointer-events:none;
  background:linear-gradient(100deg,rgba(0,0,0,.5),transparent 42%,rgba(240,24,32,.08));
}
.jf-intro__scene::after{
  content:"";
  position:absolute;
  z-index:3;
  left:-18%;
  top:14%;
  width:136%;
  height:22px;
  filter:blur(9px);
  background:linear-gradient(90deg,transparent,rgba(240,24,32,.34),rgba(255,214,212,.6),rgba(240,24,32,.34),transparent);
  transform:rotate(-17deg) translate3d(-35%,0,0);
  opacity:0;
}
.jf-intro--play .jf-intro__scene{
  animation:jfScene var(--duration) cubic-bezier(.16,1,.3,1) var(--delay) both;
}
.jf-intro--play .jf-intro__scene::after{
  animation:jfSceneEdge var(--duration) cubic-bezier(.7,0,.22,1) var(--delay) both;
}
.jf-intro__scene-index{
  position:absolute;
  left:calc(7% + 18px);
  bottom:calc(7% + 18px);
  z-index:4;
  color:rgba(255,255,255,.48);
  font-size:8px;
  font-weight:900;
  letter-spacing:.22em;
}
.jf-intro__type{
  position:absolute;
  z-index:34;
  margin:0;
  font-family:var(--font-race-display),"Arial Narrow",Impact,sans-serif;
  font-weight:700;
  font-size:clamp(128px,24vw,380px);
  line-height:.72;
  letter-spacing:-.018em;
  white-space:nowrap;
  opacity:0;
  pointer-events:none;
  text-shadow:0 10px 35px rgba(0,0,0,.64);
  will-change:transform,opacity;
}
.jf-intro__type--create{left:-2vw;top:55%;color:#f6f6f3}
.jf-intro__type--solve{right:-2vw;top:38%;color:#f01820}
.jf-intro--play .jf-intro__type--create{animation:jfTypeLeft .48s cubic-bezier(.16,1,.3,1) 1.42s both}
.jf-intro--play .jf-intro__type--solve{animation:jfTypeRight .48s cubic-bezier(.16,1,.3,1) 2.08s both}
.jf-intro__microcopy{
  position:absolute;
  left:clamp(22px,4vw,64px);
  bottom:clamp(24px,4vh,46px);
  z-index:52;
  color:rgba(255,255,255,.42);
  font-size:8px;
  font-weight:900;
  letter-spacing:.22em;
  opacity:0;
  pointer-events:none;
}
.jf-intro--play .jf-intro__microcopy{animation:jfMicro 2.9s linear .7s both}
.jf-intro__line{
  position:absolute;
  inset:-8%;
  z-index:82;
  width:116%;
  height:116%;
  overflow:visible;
  pointer-events:none;
}
.jf-intro__line-glow,
.jf-intro__line-core{
  fill:none;
  stroke-linecap:round;
  vector-effect:non-scaling-stroke;
  stroke-dasharray:100;
  stroke-dashoffset:100;
  opacity:0;
}
.jf-intro__line-glow{stroke:#f01820;stroke-width:20;opacity:0;filter:blur(6px)}
.jf-intro__line-core{stroke:rgba(255,164,164,.82);stroke-width:1.1;filter:blur(.3px)}
.jf-intro--play .jf-intro__line-glow{animation:jfLineGlow 4.4s linear both}
.jf-intro--play .jf-intro__line-core{animation:jfLineCore 4.4s linear both}
.jf-intro__occluder{
  position:absolute;
  z-index:90;
  left:-36vw;
  top:-48vh;
  width:clamp(160px,18vw,320px);
  height:200vh;
  opacity:0;
  filter:blur(18px);
  transform:rotate(-17deg) translate3d(-40vw,0,0);
  background:linear-gradient(90deg,transparent,rgba(240,24,32,.06) 30%,rgba(240,36,42,.34) 46%,rgba(255,214,212,.5) 50%,rgba(240,36,42,.34) 54%,rgba(240,24,32,.06) 70%,transparent);
  pointer-events:none;
  will-change:transform,opacity;
}
.jf-intro__occluder i{
  position:absolute;
  left:50%;
  top:0;
  width:1px;
  height:100%;
  background:rgba(255,255,255,.6);
  box-shadow:0 0 24px rgba(255,255,255,.5),0 0 60px rgba(240,24,32,.35);
}
.jf-intro--play .jf-intro__occluder{animation:jfOccluder .76s cubic-bezier(.72,0,.18,1) 3.48s both}
.jf-intro__hero-flare{
  position:absolute;
  inset:0;
  z-index:88;
  pointer-events:none;
  opacity:0;
  background:radial-gradient(circle at 74% 35%,rgba(240,24,32,.26),transparent 28%);
}
.jf-intro--play .jf-intro__hero-flare{animation:jfHeroFlare .72s ease-out 3.7s both}
.jf-intro__skip{
  position:absolute;
  right:18px;
  bottom:18px;
  z-index:120;
  border:0;
  padding:10px 12px;
  background:rgba(3,4,5,.3);
  color:rgba(255,255,255,.68);
  font:800 9px/1 system-ui,sans-serif;
  letter-spacing:.16em;
  text-transform:uppercase;
  cursor:pointer;
  opacity:0;
}
.jf-intro--play .jf-intro__skip{animation:jfSkip 3.35s linear .18s both}
.jf-intro__skip:focus-visible{outline:1px solid #fff;outline-offset:3px}
@keyframes jfAtmosphere{from{opacity:.1;transform:scale(1.02)}to{opacity:.42;transform:scale(1.075)}}
@keyframes jfLogo{0%{opacity:0;transform:translate3d(0,8px,0) scale(.96)}28%,72%{opacity:1;transform:translate3d(0,0,0) scale(1)}100%{opacity:.16;transform:translate3d(0,-4px,0) scale(1.015)}}
@keyframes jfIgnition{0%{opacity:0;transform:translate3d(-58vw,-50%,0)}22%{opacity:1}62%{opacity:1;transform:translate3d(3vw,-50%,0)}100%{opacity:0;transform:translate3d(82vw,-50%,0)}}
@keyframes jfScene{0%{opacity:0;transform:translate3d(var(--x0),var(--y0),0) scale(var(--s0)) rotate(var(--r0))}8%{opacity:1}72%{opacity:1}100%{opacity:0;transform:translate3d(var(--x1),var(--y1),0) scale(var(--s1)) rotate(var(--r1))}}
@keyframes jfSceneEdge{0%,10%{opacity:0;transform:rotate(-17deg) translate3d(-38%,0,0)}28%{opacity:.82}64%{opacity:.18}100%{opacity:0;transform:rotate(-17deg) translate3d(50%,0,0)}}
@keyframes jfTypeLeft{0%{opacity:0;transform:translate3d(-12vw,32px,0) skewX(-7deg) scaleX(.94)}20%,74%{opacity:.96;transform:translate3d(0,0,0) skewX(-7deg) scaleX(1)}100%{opacity:0;transform:translate3d(10vw,-10px,0) skewX(-7deg) scaleX(.97)}}
@keyframes jfTypeRight{0%{opacity:0;transform:translate3d(12vw,30px,0) skewX(-7deg) scaleX(.94)}20%,72%{opacity:.98;transform:translate3d(0,0,0) skewX(-7deg) scaleX(1)}100%{opacity:0;transform:translate3d(-10vw,-8px,0) skewX(-7deg) scaleX(.97)}}
@keyframes jfMicro{0%,8%{opacity:0}18%,82%{opacity:.48}100%{opacity:0}}
@keyframes jfLineCore{0%,5%{opacity:0;stroke-dashoffset:100}12%{opacity:1}76%{opacity:.82;stroke-dashoffset:8}91%{opacity:1;stroke-dashoffset:0}100%{opacity:0;stroke-dashoffset:-8}}
@keyframes jfLineGlow{0%,7%{opacity:0;stroke-dashoffset:100}15%{opacity:.12}75%{opacity:.22;stroke-dashoffset:7}91%{opacity:.3;stroke-dashoffset:0}100%{opacity:0;stroke-dashoffset:-8}}
@keyframes jfOccluder{0%{opacity:0;transform:rotate(-17deg) translate3d(-38vw,0,0)}16%{opacity:1}68%{opacity:1;transform:rotate(-17deg) translate3d(92vw,0,0)}100%{opacity:0;transform:rotate(-17deg) translate3d(146vw,0,0)}}
@keyframes jfHeroFlare{0%{opacity:0}34%{opacity:.78}100%{opacity:0}}
@keyframes jfCoverOut{0%,10%{transform:translate3d(0,0,0) skewX(0)}100%{transform:translate3d(116%,0,0) skewX(-6deg)}}
@keyframes jfSkip{0%,8%{opacity:0}16%,82%{opacity:.68}100%{opacity:0}}
@media(max-width:760px){
  .jf-intro__cover{inset:0 -10vw 0 -10vw}
  .jf-intro__atmosphere{inset:-10%;width:120%;height:120%;object-position:72% 48%}
  .jf-intro__logo-lockup{left:20px;top:22px}
  .jf-intro__logo-lockup img{width:72px}
  .jf-intro__logo-lockup span{font-size:7px;letter-spacing:.2em}
  .jf-intro__ignition{left:5vw;right:5vw}
  .jf-intro__ignition-copy{font-size:7px;letter-spacing:.18em}
  .jf-intro__scene{inset:-8%}
  .jf-intro .jf-intro__scene img{object-position:var(--mobile-position)!important}
  .jf-intro .jf-intro__scene video{object-position:50% 50%!important}
  /* Keep the supplied mobile artwork intact inside the visible viewport. */
  .jf-intro__scene[data-mobile-framed]{inset:0 10vw;background:#030405}
  .jf-intro--play .jf-intro__scene[data-mobile-framed]{animation-name:jfMobileFramedScene}
  .jf-intro .jf-intro__scene[data-mobile-framed] img{object-fit:contain;object-position:50% 50%!important;transform:none}
  .jf-intro__type{font-size:clamp(94px,29vw,144px)}
  .jf-intro__type--create{left:-5vw;top:59%}
  .jf-intro__type--solve{right:-6vw;top:40%}
  .jf-intro__microcopy{left:20px;bottom:22px;font-size:7px}
  .jf-intro__occluder{width:118px;left:-46vw}
}
@keyframes jfMobileFramedScene{0%,100%{opacity:0}8%,72%{opacity:1}}
@media(prefers-reduced-motion:reduce){.jf-intro{display:none!important}}
`;
