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

        <div className="hero-shell shell">
          <div className="hero-copy">
            <p className="hero-eyebrow">Hi, I’m John Ferrer</p>
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
        /* The rim light is baked into the real portrait asset now. CSS only supports it. */
        .hero-portrait {
          right: -3% !important;
          top: 26px !important;
          width: min(820px, 60vw) !important;
          height: 790px !important;
        }
        .hero-portrait img {
          filter: brightness(.97) contrast(1.03) !important;
          transform: scale(1.14) !important;
          transform-origin: center bottom !important;
        }
        .portrait-aura {
          opacity: .42 !important;
          right: 7% !important;
          top: 5% !important;
          width: 70% !important;
          height: 72% !important;
          filter: blur(32px) !important;
        }
        .hero-portrait::before { opacity: .66; }
        .hero-portrait::after {
          left: -8% !important;
          width: 31% !important;
          background: linear-gradient(90deg,#050607 0%,rgba(5,6,7,.72) 48%,transparent 100%) !important;
        }

        @media (max-width: 760px) {
          .hero { height: 920px !important; min-height: 920px !important; }
          .hero-art {
            background-position: 62% 46% !important;
            background-image: linear-gradient(90deg,#050607 0%,#050607 31%,rgba(5,6,7,.93) 44%,rgba(5,6,7,.32) 67%,rgba(5,6,7,.12) 100%),url('/racing-atmosphere.svg') !important;
          }
          .hero-copy {
            top: 14px !important;
            width: 100% !important;
            z-index: 9 !important;
          }
          .hero-copy::after {
            left: -18px !important;
            top: 54px !important;
            width: 104% !important;
            height: 520px !important;
            background: linear-gradient(90deg,rgba(5,6,7,.99) 0%,rgba(5,6,7,.94) 48%,rgba(5,6,7,.34) 78%,transparent 100%) !important;
          }
          .hero h1 {
            max-width: 380px !important;
            font-size: clamp(40px, 10.7vw, 48px) !important;
            line-height: 1.01 !important;
          }
          .hero-sub { max-width: 340px !important; }
          .hero-portrait {
            left: 50% !important;
            right: auto !important;
            top: 245px !important;
            bottom: auto !important;
            width: 122vw !important;
            height: 675px !important;
            transform: translateX(-39%) !important;
            z-index: 5 !important;
          }
          .hero-portrait img {
            object-position: center bottom !important;
            transform: scale(1.18) !important;
          }
          .portrait-aura {
            right: 15% !important;
            top: 7% !important;
            width: 64% !important;
            height: 58% !important;
            opacity: .34 !important;
          }
          .hero-portrait::after {
            left: 0 !important;
            width: 42% !important;
            background: linear-gradient(90deg,#050607 0%,rgba(5,6,7,.73) 46%,rgba(5,6,7,.12) 88%,transparent 100%) !important;
          }
          .hero-side-note { top: 51% !important; right: 6px !important; }
        }
      `}</style>
    </main>
  );
}
