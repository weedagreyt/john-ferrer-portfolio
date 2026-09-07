"use client";

import IntroSequence from "./components/IntroSequence";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import { projectSummaries, resumeUrl, siteAssets } from "./lib/portfolio";

const assets = {
  portrait: "https://www.figma.com/api/mcp/asset/444382a5-690d-483b-a881-9ec4956476c0.png",
  heroPortrait: "/hero-portrait-retina.avif",
  kove: "https://www.figma.com/api/mcp/asset/a4f118aa-caf3-42cf-91e1-aae3af51fc05.png",
  unimotors: "https://www.figma.com/api/mcp/asset/c0d21f3a-2bd4-4f1b-994f-f494084d10d2.png",
  dope: "https://www.figma.com/api/mcp/asset/5d08bcf7-f229-4889-9d34-08401c51103e.png",
};

const projects = [
  { ...projectSummaries.kove, image: assets.kove, href: "/work/kove" },
  { ...projectSummaries.unimotors, image: assets.unimotors, href: "/work/unimotors" },
  { ...projectSummaries.dope, image: assets.dope, href: "/work/dope-marketing" },
] as const;

const experience = [
  { role: "Print Production / Designer", company: "Bothends Computer Solutions", dates: "Nov 2015 – Jul 2019" },
  { role: "Founder", company: "SciHigh Clothing", dates: "Feb 2016" },
  { role: "Creative Director", company: "West Shadows Production", dates: "Aug 2016 – Sep 2019" },
  { role: "Graphic Design Department Head", company: "Project Pentagon", dates: "Feb 2019 – Nov 2019" },
  { role: "Freelance Graphic Designer", company: "Project-Based Work", dates: "Nov 2019 – Dec 2020" },
  { role: "Senior Graphic Designer", company: "DOPE Marketing", dates: "Jan 2021 – Nov 2025" },
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

      <section className="approach-section experience-home">
        <div className="shell">
          <div className="experience-home-head">
            <div>
              <p className="micro-label">Experience</p>
              <h2>My <span>Journey</span></h2>
            </div>
            <a className="experience-resume-link" href={resumeUrl} target="_blank" rel="noreferrer">Download Résumé <ArrowIcon /></a>
          </div>
          <div className="experience-home-track">
            {experience.map((item, index) => (
              <article className="experience-home-item" key={`${item.company}-${item.dates}`}>
                <span className="experience-home-dot" aria-hidden="true" />
                <span className="experience-home-index" aria-hidden="true">0{index + 1}</span>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
                <time>{item.dates}</time>
              </article>
            ))}
          </div>
        </div>
      </section>

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
