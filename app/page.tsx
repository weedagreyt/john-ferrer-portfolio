"use client";

import IntroSequence from "./components/IntroSequence";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import ExperienceJourney from "./components/ExperienceJourney";
import { projectSummaries, siteAssets } from "./lib/portfolio";

const assets = {
  heroPortrait: "/hero-portrait-retina.avif",
  kove: "/work/thumbs/kove.jpg",
  unimotors: "/work/thumbs/unimotors.jpg",
  dope: "/work/thumbs/dope.jpg",
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
  const skipIntroFromGesture = () => {
    document.querySelector<HTMLElement>(".jf-intro")?.click();
  };

  return (
    <main className="race-home" onWheel={skipIntroFromGesture} onTouchMove={skipIntroFromGesture}>
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
            <h1 aria-label="Creative Thinker. Problem Solver. Visual Storyteller.">
              <span className="hero-line">Creative</span>
              <span className="hero-line">Thinker<span className="dot">.</span></span>
              <span className="hero-line hero-red">Problem</span>
              <span className="hero-line hero-red">Solver<span className="dot">.</span></span>
              <span className="hero-line">Visual</span>
              <span className="hero-line">Storyteller<span className="dot">.</span></span>
            </h1>
            <p className="hero-sub">
              I turn ideas into impactful visual experiences that connect, inspire, and leave a lasting impression.
            </p>
            <a className="race-button" href="/contact">
              <span>Let’s Talk</span><ArrowIcon />
            </a>
            <div className="hero-location hero-location--mobile"><i /><span>Arlington, VA<br />USA</span></div>
          </div>

          <div className="hero-portrait" aria-label="Portrait of John Ferrer">
            <div className="portrait-aura" aria-hidden="true" />
            <img src={assets.heroPortrait} alt="John Ferrer" />
          </div>

          <div className="hero-location hero-location--desktop"><i /><span>Arlington, VA<br />USA</span></div>

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

      <ExperienceJourney />

      <section className="build-section">
        <div className="build-art" aria-hidden="true" />
        <div className="shell build-inner">
          <h2>Build what’s <span>next.</span></h2>
          <p>Have a project in mind? Let’s create something great together.</p>
          <a className="race-button" href="/contact"><span>Let’s Talk</span><ArrowIcon /></a>
          <div className="build-note" aria-hidden="true">Ideas<br />to a brighter<br />tomorrow<i /></div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
