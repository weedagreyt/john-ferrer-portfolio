"use client";

import IntroSequence from "./components/IntroSequence";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import { projectSummaries, services, siteAssets } from "./lib/portfolio";

const assets = {
  portrait: "https://www.figma.com/api/mcp/asset/444382a5-690d-483b-a881-9ec4956476c0.png",
  heroPortrait: "/john-hero-rimlight.webp",
  kove: "https://www.figma.com/api/mcp/asset/a4f118aa-caf3-42cf-91e1-aae3af51fc05.png",
  unimotors: "https://www.figma.com/api/mcp/asset/c0d21f3a-2bd4-4f1b-994f-f494084d10d2.png",
  dope: "https://www.figma.com/api/mcp/asset/5d08bcf7-f229-4889-9d34-08401c51103e.png",
};

const projects = [
  { ...projectSummaries.kove, image: assets.kove, href: "/work/kove" },
  { ...projectSummaries.unimotors, image: assets.unimotors, href: "/work/unimotors" },
  { ...projectSummaries.dope, image: assets.dope, href: "/work/dope-marketing" },
] as const;

function ArrowIcon() {
  return (
    <svg className="race-arrow" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3.5 10h12" />
      <path d="m11.5 6 4 4-4 4" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="race-home">
      <IntroSequence />

      <section id="top" className="hero">
        <div className="hero-art" aria-hidden="true" />
        <SiteNav theme="light" />
        <img className="hero-mark" src={siteAssets.logo} alt="" aria-hidden="true" />
        <img className="hero-bottom-mark" src={siteAssets.logo} alt="" aria-hidden="true" />

        <div className="hero-shell shell">
          <div className="hero-copy">
            <div className="hero-intro" aria-label="Section 01, Hi, I’m John Ferrer">
              <div className="hero-intro-rule"><span>01</span><i /></div>
              <p>Hi, I’m John Ferrer</p>
            </div>
            <h1>
              <span>Creative Thinker<span className="dot">.</span></span>
              <span className="hero-red">Problem Solver<span className="dot">.</span></span>
              <span>Visual Storyteller<span className="dot">.</span></span>
            </h1>
            <p className="hero-sub">
              I turn ideas into impactful visual experiences that connect, inspire, and leave a lasting impression.
            </p>
            <a className="race-button" href="/contact">
              <span>Let’s Talk</span><ArrowIcon />
            </a>
            <div className="hero-location"><i /><span>Arlington, VA<br />USA</span></div>
          </div>

          <div className="hero-portrait" aria-label="Portrait of John Ferrer">
            <div className="portrait-aura" aria-hidden="true" />
            <img src={assets.heroPortrait} alt="John Ferrer" />
          </div>

          <div className="hero-side-note" aria-hidden="true">
            <span>Ideas</span><span>Interfaces</span><span>Impact</span><i />
          </div>
          <div className="hero-scroll" aria-hidden="true"><span>Scroll</span><i /></div>
        </div>
      </section>

      <section id="work" className="work-section">
        <div className="shell">
          <div className="race-heading">
            <div>
              <p>02</p>
              <h2>Selected <span>Work</span></h2>
            </div>
            <a href="/work">View all projects <ArrowIcon /></a>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <a className="project-card" key={project.name} href={project.href}>
                <b>0{index + 1}</b>
                <img src={project.image} alt={`${project.name} project`} />
                <div className="project-card-overlay">
                  <h3>{project.name}</h3>
                  <p>{project.type}</p>
                  <ArrowIcon />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="approach-section">
        <div className="shell">
          <p className="section-no">03</p>
          <div className="approach-grid">
            <div className="approach-photo">
              <img src={assets.portrait} alt="John Ferrer" />
              <blockquote>“Good design<br />should feel inevitable.”<small>— John Ferrer</small></blockquote>
            </div>

            <div className="approach-copy">
              <p className="micro-label">My Approach</p>
              <h2>Human-centered.<br /><span>Outcome-driven.</span></h2>
              <p className="approach-intro">
                I combine research, strategy, and design to create work that not only looks good, but makes a real difference in people’s lives.
              </p>
              <div className="approach-steps">
                {services.slice(0, 4).map((service, index) => (
                  <div key={service}><b>0{index + 1}</b><strong>{service}</strong></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="build-section">
        <div className="build-art" aria-hidden="true" />
        <div className="shell build-inner">
          <p className="section-no">04</p>
          <h2>Build what’s <span>next.</span></h2>
          <p>Have a project in mind? Let’s create something great together.</p>
          <a className="race-button" href="/contact"><span>Let’s Talk</span><ArrowIcon /></a>
          <div className="build-note" aria-hidden="true">Ideas<br />to a brighter<br />tomorrow<i /></div>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        .hero-eyebrow{display:none!important}
        .hero-intro{margin:0 0 30px;color:#fff;text-transform:uppercase}
        .hero-intro-rule{display:flex;align-items:center;width:min(330px,90%);gap:17px;margin-bottom:16px}
        .hero-intro-rule span{color:#ef171f;font-size:10px;font-weight:900;letter-spacing:.18em}
        .hero-intro-rule i{display:block;flex:1;height:1px;background:rgba(255,255,255,.7)}
        .hero-intro p{margin:0;color:#fff;font-size:10px;font-weight:800;letter-spacing:.29em}
        .hero-bottom-mark{display:none}

        .hero-portrait {
          right: -3% !important;
          top: 18px !important;
          width: min(830px, 61vw) !important;
          height: 800px !important;
        }
        .hero-portrait img {
          filter: brightness(.98) contrast(1.04) !important;
          transform: scale(1.16) !important;
          transform-origin: center bottom !important;
        }
        .portrait-aura {
          opacity: .34 !important;
          right: 7% !important;
          top: 5% !important;
          width: 70% !important;
          height: 72% !important;
          filter: blur(32px) !important;
        }
        .hero-portrait::before { opacity: .52; }
        .hero-portrait::after {
          left: -8% !important;
          width: 29% !important;
          background: linear-gradient(90deg,#050607 0%,rgba(5,6,7,.68) 48%,transparent 100%) !important;
        }

        @media (max-width: 760px) {
          .hero { height: 1120px !important; min-height: 1120px !important; }
          .hero-shell { height: calc(100% - 88px) !important; }
          .hero-art {
            background-position: 68% 45% !important;
            background-size: auto 100% !important;
            background-image: linear-gradient(90deg,#050607 0%,#050607 30%,rgba(5,6,7,.96) 42%,rgba(5,6,7,.44) 63%,rgba(5,6,7,.12) 100%),url('/racing-atmosphere.svg') !important;
          }
          .hero-art::after {
            background: linear-gradient(180deg,rgba(5,6,7,.02) 0 62%,rgba(5,6,7,.16) 76%,#050607 100%) !important;
          }
          .hero-copy {
            top: 14px !important;
            width: 100% !important;
            max-width: none !important;
            z-index: 9 !important;
          }
          .hero-copy::after {
            left: -18px !important;
            top: 100px !important;
            width: 108% !important;
            height: 630px !important;
            background: linear-gradient(90deg,rgba(5,6,7,.995) 0%,rgba(5,6,7,.93) 44%,rgba(5,6,7,.55) 64%,rgba(5,6,7,.12) 87%,transparent 100%) !important;
          }
          .hero-intro{margin-bottom:44px!important}
          .hero-intro-rule{width:340px;max-width:93%;gap:16px;margin-bottom:17px}
          .hero-intro-rule span{font-size:10px}
          .hero-intro p{font-size:10px;letter-spacing:.28em}
          .hero h1 {
            width: 111% !important;
            max-width: none !important;
            font-family: Impact, Haettenschweiler, "Arial Narrow Bold", "Arial Black", sans-serif !important;
            font-size: clamp(50px, 13.25vw, 58px) !important;
            line-height: 1.03 !important;
            letter-spacing: -.012em !important;
            font-style: oblique 12deg !important;
            text-shadow: 0 5px 18px rgba(0,0,0,.9) !important;
          }
          .hero h1>span{margin-bottom:3px!important}
          .hero-sub {
            width: 345px !important;
            max-width: 86% !important;
            margin-top: 32px !important;
            font-size: 14px !important;
            line-height: 1.6 !important;
          }
          .hero .race-button{margin-top:26px!important;width:205px!important;height:54px!important}
          .hero-location{margin-top:57px!important}

          .hero-portrait {
            left: 50% !important;
            right: auto !important;
            top: -16px !important;
            bottom: auto !important;
            width: 178vw !important;
            height: 1060px !important;
            transform: translateX(-37%) !important;
            z-index: 5 !important;
          }
          .hero-portrait img {
            object-position: center bottom !important;
            transform: scale(1.0) !important;
            filter: brightness(.98) contrast(1.04) !important;
          }
          .portrait-aura {
            right: 18% !important;
            top: 7% !important;
            width: 57% !important;
            height: 50% !important;
            opacity: .2 !important;
            filter: blur(38px)!important;
          }
          .hero-portrait::before{opacity:.34!important}
          .hero-portrait::after {
            left: 0 !important;
            width: 45% !important;
            background: linear-gradient(90deg,#050607 0%,rgba(5,6,7,.84) 42%,rgba(5,6,7,.25) 76%,transparent 100%) !important;
          }
          .hero-side-note { top: 58% !important; right: 8px !important; }
          .hero-scroll { display:grid!important; right:18px!important; bottom:66px!important; }
          .hero-bottom-mark{
            display:block;position:absolute;left:3%;bottom:34px;width:310px;max-width:72vw;z-index:2;
            opacity:.045;filter:brightness(0) invert(1);pointer-events:none;
          }
        }
      `}</style>
    </main>
  );
}
