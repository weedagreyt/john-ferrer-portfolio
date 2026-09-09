"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

const TOTAL_MS = 4600;
const INTRO_VERSION = "jf:intro:v15";

const projectScenes = [
  {
    src: "/KOVE Kafe - Intro.png",
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
    sliceAngle: "-20deg",
    sliceScale: "1.15",
    sliceTop: "10%",
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
    sliceAngle: "-10deg",
    sliceScale: "0.6",
    sliceTop: "58%",
  },
  {
    src: "/DOPE - Intro.png",
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
    sliceAngle: "-16deg",
    sliceScale: "1",
    sliceDouble: true,
    sliceTop: "22%",
  },
  {
    src: "/Unimotors - Intro.png",
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
    sliceAngle: "-24deg",
    sliceScale: "1.2",
    sliceTop: "68%",
  },
  {
    src: "/Retrophorics - Intro.png",
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
    sliceAngle: "-8deg",
    sliceScale: "0.55",
    sliceTop: "38%",
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
    image.onload = () => resolve();
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
      "--slice-angle": scene.sliceAngle,
      "--slice-scale": scene.sliceScale,
      "--slice-top": scene.sliceTop,
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
        <div className="jf-intro__streaks jf-intro__streaks--open" aria-hidden="true" />
        <div className="jf-intro__sparks jf-intro__sparks--open" aria-hidden="true">
          <span /><span /><span /><span />
        </div>

        <div className="jf-intro__ignition">
          <span className="jf-intro__ignition-core" />
        </div>

        <div className="jf-intro__scenes">
          {projectScenes.map((scene, index) => (
            <figure
              className="jf-intro__scene"
              data-mobile-framed={"mobileSrc" in scene ? "true" : undefined}
              style={sceneStyle(scene)}
              key={scene.src}
            >
              {"videoSrc" in scene ? (
                <video src={scene.videoSrc} autoPlay loop muted playsInline preload="auto" />
              ) : (
                <picture>
                  {"mobileSrc" in scene && <source media="(max-width:760px)" srcSet={scene.mobileSrc} />}
                  <img src={scene.src} alt="" style={{ objectPosition: scene.position }} />
                </picture>
              )}
              {"sliceDouble" in scene && scene.sliceDouble && <span className="jf-intro__scene-slice2" />}
              <span className="jf-intro__scene-smoke" />
              <span className="jf-intro__scene-spark" />
              <span className="jf-intro__scene-index">0{index + 1}</span>
            </figure>
          ))}
        </div>
      </div>

      <div className="jf-intro__occluder--trail" aria-hidden="true" />
      <div className="jf-intro__occluder" aria-hidden="true">
        <i />
      </div>
      <div className="jf-intro__hero-flare" aria-hidden="true" />
      <div className="jf-intro__streaks jf-intro__streaks--close" aria-hidden="true" />
      <div className="jf-intro__sparks jf-intro__sparks--close" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

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
  animation:jfCoverOut .7s cubic-bezier(.83,0,.17,1) 3.88s both;
}
.jf-intro__streaks{
  position:absolute;
  z-index:5;
  left:50%;
  top:50%;
  width:220vmax;
  height:220vmax;
  transform:translate3d(-50%,-50%,0) rotate(-17deg);
  background:
    radial-gradient(circle at 76% 29%,rgba(200,0,10,.34),transparent 32%),
    linear-gradient(90deg,rgba(3,4,5,.92) 0%,rgba(3,4,5,.22) 58%,rgba(3,4,5,.42) 100%),
    linear-gradient(90deg,transparent 0 59%,rgba(70,0,4,.4) 60%,rgba(210,0,10,.9) 62%,rgba(60,0,3,.4) 66%,transparent 67%),
    linear-gradient(90deg,transparent 0 47%,rgba(60,0,3,.55) 49%,rgba(190,0,9,.45) 51%,transparent 52%),
    linear-gradient(90deg,transparent 0 80%,rgba(215,0,10,.95) 82%,rgba(60,0,3,.45) 85%,transparent 86%),
    linear-gradient(90deg,transparent 0 12.8%,rgba(120,0,6,.35) 13.1%,rgba(255,255,255,.16) 13.35%,rgba(120,0,6,.35) 13.6%,transparent 15%),
    linear-gradient(90deg,transparent 0 72.8%,rgba(120,0,6,.35) 73.1%,rgba(255,255,255,.16) 73.35%,rgba(120,0,6,.35) 73.6%,transparent 75%),
    #030304;
  pointer-events:none;
  will-change:transform,opacity;
}
.jf-intro__streaks--close{
  z-index:85;
  opacity:0;
  mix-blend-mode:screen;
  filter:saturate(1.6) brightness(1.2) hue-rotate(-4deg);
  background:
    radial-gradient(circle at 76% 29%,rgba(200,0,10,.3),transparent 32%),
    linear-gradient(90deg,transparent 0 59%,rgba(70,0,4,.35) 60%,rgba(210,0,10,.85) 62%,rgba(60,0,3,.35) 66%,transparent 67%),
    linear-gradient(90deg,transparent 0 47%,rgba(60,0,3,.5) 49%,rgba(190,0,9,.4) 51%,transparent 52%),
    linear-gradient(90deg,transparent 0 80%,rgba(215,0,10,.9) 82%,rgba(60,0,3,.4) 85%,transparent 86%),
    linear-gradient(90deg,transparent 0 12.9%,rgba(120,0,6,.3) 13.15%,rgba(255,255,255,.1) 13.35%,rgba(120,0,6,.3) 13.55%,transparent 15%),
    linear-gradient(90deg,transparent 0 72.9%,rgba(120,0,6,.3) 73.15%,rgba(255,255,255,.1) 73.35%,rgba(120,0,6,.3) 73.55%,transparent 75%);
}
.jf-intro--play .jf-intro__streaks--open{animation:jfStreaksOpen .8s cubic-bezier(.7,0,.2,1) 0s both}
.jf-intro--play .jf-intro__streaks--close{animation:jfStreaksClose .9s cubic-bezier(.45,0,.3,1) 3.48s both}
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
  background:radial-gradient(130% 130% at 50% 42%,transparent 52%,rgba(0,0,0,.55) 100%);
}
.jf-intro__ignition{
  position:absolute;
  left:0;
  right:0;
  top:50%;
  z-index:72;
  opacity:0;
  pointer-events:none;
}
.jf-intro__ignition-core{
  position:absolute;
  left:0;
  top:50%;
  width:460px;
  height:6px;
  border-radius:99px;
  transform:translateY(-50%);
  background:linear-gradient(90deg,transparent,rgba(240,24,32,.1) 22%,rgba(240,24,32,.4) 48%,rgba(240,24,32,.8) 74%,#fff 95%,#fff 100%);
}
.jf-intro__ignition-core::after{
  content:"";
  position:absolute;
  right:-5px;
  top:50%;
  width:12px;
  height:12px;
  border-radius:50%;
  background:#fff;
  transform:translateY(-50%);
  box-shadow:0 0 10px 3px rgba(255,255,255,.95),0 0 28px 8px rgba(240,24,32,.8),0 0 56px 18px rgba(240,24,32,.4);
}
.jf-intro--play .jf-intro__ignition{
  animation:jfIgnition .85s cubic-bezier(.6,0,.25,1) .08s both;
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
.jf-intro__scene::after,
.jf-intro__scene-slice2{
  content:"";
  position:absolute;
  z-index:3;
  left:-18%;
  top:var(--slice-top,14%);
  width:calc(var(--slice-scale,1) * 136%);
  height:64px;
  background:url(/intro/sword-fx-h.svg) center/100% 100% no-repeat;
  transform:rotate(var(--slice-angle,-17deg)) translate3d(-35%,0,0);
  opacity:0;
}
.jf-intro__scene-slice2{top:calc(var(--slice-top,14%) + 16%);height:48px}
.jf-intro__scene-smoke{
  position:absolute;
  z-index:3;
  top:calc(var(--slice-top,14%) - 6%);
  left:60%;
  width:120px;
  height:120px;
  border-radius:50%;
  background:radial-gradient(circle,rgba(220,220,225,.18),rgba(220,220,225,.05) 55%,transparent 75%);
  opacity:0;
  pointer-events:none;
}
.jf-intro--play .jf-intro__scene-smoke{animation:jfSmoke var(--duration) ease-out calc(var(--delay) + .04s) both}
.jf-intro__scene-spark{
  position:absolute;
  z-index:4;
  top:var(--slice-top,14%);
  left:62%;
  width:3px;
  height:3px;
  border-radius:50%;
  background:#fff5f0;
  opacity:0;
  box-shadow:
    6px -4px 0 1px rgba(255,120,60,.9),
    -8px 6px 0 0 rgba(255,80,40,.85),
    10px 8px 0 -1px rgba(255,180,90,.85),
    -4px -10px 0 0 rgba(255,60,30,.8),
    14px -2px 0 -1px rgba(255,140,70,.75);
  pointer-events:none;
}
.jf-intro--play .jf-intro__scene-spark{animation:jfSpark var(--duration) ease-out var(--delay) both}
.jf-intro__sparks{position:absolute;inset:0;z-index:94;pointer-events:none}
.jf-intro__sparks--close{z-index:97}
.jf-intro__sparks span{
  position:absolute;
  width:5px;
  height:5px;
  border-radius:50%;
  background:#ff0a10;
  opacity:0;
  box-shadow:
    0 0 3px 1px rgba(255,10,16,.9),
    0 0 12px 4px rgba(255,10,16,.95),
    0 0 30px 11px rgba(138,0,8,.55);
}
.jf-intro__sparks--open span:nth-child(1){left:14%;top:28%}
.jf-intro__sparks--open span:nth-child(2){left:58%;top:52%}
.jf-intro__sparks--open span:nth-child(3){left:36%;top:74%}
.jf-intro__sparks--open span:nth-child(4){left:76%;top:18%}
.jf-intro--play .jf-intro__sparks--open span{animation:jfSparkSweep 1.1s cubic-bezier(.3,0,.2,1) both}
.jf-intro--play .jf-intro__sparks--open span:nth-child(1){animation-delay:.05s}
.jf-intro--play .jf-intro__sparks--open span:nth-child(2){animation-delay:.22s}
.jf-intro--play .jf-intro__sparks--open span:nth-child(3){animation-delay:.4s}
.jf-intro--play .jf-intro__sparks--open span:nth-child(4){animation-delay:.58s}
.jf-intro__sparks--close span:nth-child(1){left:20%;top:32%}
.jf-intro__sparks--close span:nth-child(2){left:56%;top:58%}
.jf-intro__sparks--close span:nth-child(3){left:42%;top:20%}
.jf-intro__sparks--close span:nth-child(4){left:70%;top:68%}
.jf-intro--play .jf-intro__sparks--close span{animation:jfSparkSweep 1.1s cubic-bezier(.3,0,.2,1) both}
.jf-intro--play .jf-intro__sparks--close span:nth-child(1){animation-delay:3.5s}
.jf-intro--play .jf-intro__sparks--close span:nth-child(2){animation-delay:3.68s}
.jf-intro--play .jf-intro__sparks--close span:nth-child(3){animation-delay:3.86s}
.jf-intro--play .jf-intro__sparks--close span:nth-child(4){animation-delay:4.04s}
.jf-intro--play .jf-intro__scene{
  animation:jfScene var(--duration) cubic-bezier(.16,1,.3,1) var(--delay) both;
}
.jf-intro--play .jf-intro__scene::after{
  animation:jfSceneEdge var(--duration) cubic-bezier(.7,0,.22,1) var(--delay) both;
}
.jf-intro--play .jf-intro__scene-slice2{
  animation:jfSceneEdge var(--duration) cubic-bezier(.7,0,.22,1) calc(var(--delay) + .1s) both;
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
.jf-intro__occluder{
  position:absolute;
  z-index:90;
  left:-40vw;
  top:-48vh;
  width:clamp(140px,15vw,280px);
  height:230vh;
  opacity:0;
  transform:rotate(23deg) translate3d(-40vw,0,0);
  background:url(/intro/sword-fx-v.svg) center/100% 100% no-repeat;
  filter:saturate(1.5) brightness(1.2) hue-rotate(-4deg);
  pointer-events:none;
  will-change:transform,opacity;
}
.jf-intro__occluder i{display:none}
.jf-intro--play .jf-intro__occluder{animation:jfOccluder .76s cubic-bezier(.72,0,.18,1) 3.48s both}
.jf-intro__occluder--trail{
  position:absolute;
  z-index:89;
  left:-40vw;
  top:-48vh;
  width:clamp(140px,15vw,280px);
  height:230vh;
  opacity:0;
  transform:rotate(23deg) translate3d(-42vw,0,0);
  background:url(/intro/sword-fx-v.svg) center/100% 100% no-repeat;
  mix-blend-mode:screen;
  filter:blur(24px) saturate(1.6) brightness(1.25) hue-rotate(-4deg);
  pointer-events:none;
  will-change:transform,opacity;
}
.jf-intro--play .jf-intro__occluder--trail{animation:jfOccluderTrail .84s cubic-bezier(.72,0,.18,1) 3.56s both}
.jf-intro__hero-flare{
  position:absolute;
  inset:0;
  z-index:88;
  pointer-events:none;
  opacity:0;
  background:radial-gradient(circle at 74% 35%,rgba(239,23,31,.42),transparent 30%);
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
@keyframes jfStreaksOpen{0%{opacity:1;transform:translate3d(-50%,-50%,0) rotate(-17deg) translate3d(0,0,0)}100%{opacity:1;transform:translate3d(-50%,-50%,0) rotate(-17deg) translate3d(-60%,0,0)}}
@keyframes jfStreaksClose{0%{opacity:0;transform:translate3d(-50%,-50%,0) rotate(23deg) translate3d(-60%,0,0)}14%{opacity:1}72%{opacity:1}100%{opacity:0;transform:translate3d(-50%,-50%,0) rotate(23deg) translate3d(60%,0,0)}}
@keyframes jfSmoke{0%,55%{opacity:0;transform:scale(.6) translate3d(0,0,0)}70%{opacity:.7;transform:scale(1) translate3d(2%,-4%,0)}100%{opacity:0;transform:scale(1.4) translate3d(6%,-10%,0)}}
@keyframes jfSpark{0%,60%{opacity:0;transform:scale(.4) translate3d(0,0,0)}66%{opacity:1;transform:scale(1) translate3d(0,0,0)}100%{opacity:0;transform:scale(1.6) translate3d(6px,4px,0)}}
@keyframes jfSparkSweep{0%{opacity:0;transform:scale(.5) translate3d(0,0,0) rotate(23deg)}12%{opacity:1;transform:scale(1) translate3d(0,0,0) rotate(23deg)}100%{opacity:0;transform:scale(.6) translate3d(46vw,-19vw,0) rotate(23deg)}}
@keyframes jfIgnition{0%{opacity:0;transform:translate3d(-14vw,-50%,0)}14%{opacity:1}82%{opacity:1}100%{opacity:0;transform:translate3d(112vw,-50%,0)}}
@keyframes jfScene{0%{opacity:0;transform:translate3d(var(--x0),var(--y0),0) scale(var(--s0)) rotate(var(--r0))}8%{opacity:1}72%{opacity:1}100%{opacity:0;transform:translate3d(var(--x1),var(--y1),0) scale(var(--s1)) rotate(var(--r1))}}
@keyframes jfSceneEdge{0%,10%{opacity:0;transform:rotate(-17deg) translate3d(-38%,0,0)}28%{opacity:.82}64%{opacity:.18}100%{opacity:0;transform:rotate(-17deg) translate3d(50%,0,0)}}
@keyframes jfTypeLeft{0%{opacity:0;transform:translate3d(-12vw,32px,0) skewX(-7deg) scaleX(.94)}20%,74%{opacity:.96;transform:translate3d(0,0,0) skewX(-7deg) scaleX(1)}100%{opacity:0;transform:translate3d(10vw,-10px,0) skewX(-7deg) scaleX(.97)}}
@keyframes jfTypeRight{0%{opacity:0;transform:translate3d(12vw,30px,0) skewX(-7deg) scaleX(.94)}20%,72%{opacity:.98;transform:translate3d(0,0,0) skewX(-7deg) scaleX(1)}100%{opacity:0;transform:translate3d(-10vw,-8px,0) skewX(-7deg) scaleX(.97)}}
@keyframes jfOccluder{0%{opacity:0;transform:rotate(23deg) translate3d(-38vw,0,0)}16%{opacity:1}68%{opacity:1;transform:rotate(23deg) translate3d(92vw,0,0)}100%{opacity:0;transform:rotate(23deg) translate3d(146vw,0,0)}}
@keyframes jfOccluderTrail{0%{opacity:0;transform:rotate(23deg) translate3d(-42vw,0,0)}18%{opacity:.4}70%{opacity:.4;transform:rotate(23deg) translate3d(88vw,0,0)}100%{opacity:0;transform:rotate(23deg) translate3d(142vw,0,0)}}
@keyframes jfHeroFlare{0%{opacity:0}34%{opacity:.78}100%{opacity:0}}
@keyframes jfCoverOut{0%,10%{transform:translate3d(0,0,0) skewX(0)}100%{transform:translate3d(116%,0,0) skewX(-6deg)}}
@keyframes jfSkip{0%,8%{opacity:0}16%,82%{opacity:.68}100%{opacity:0}}
@media(max-width:760px){
  .jf-intro__cover{inset:0 -10vw 0 -10vw}
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
  .jf-intro__occluder,.jf-intro__occluder--trail{width:76px;left:-46vw}
}
@keyframes jfMobileFramedScene{0%,100%{opacity:0}8%,72%{opacity:1}}
@media(prefers-reduced-motion:reduce){.jf-intro{display:none!important}}
`;
