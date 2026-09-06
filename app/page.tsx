"use client";

import { useEffect, useRef, useState } from "react";
import IntroSequence from "./components/IntroSequence";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import { projectSummaries, resumeUrl, services, siteAssets } from "./lib/portfolio";

const assets = {
  portrait: "https://www.figma.com/api/mcp/asset/444382a5-690d-483b-a881-9ec4956476c0.png",
  kove: "https://www.figma.com/api/mcp/asset/a4f118aa-caf3-42cf-91e1-aae3af51fc05.png",
  unimotors: "https://www.figma.com/api/mcp/asset/c0d21f3a-2bd4-4f1b-994f-f494084d10d2.png",
  dope: "https://www.figma.com/api/mcp/asset/5d08bcf7-f229-4889-9d34-08401c51103e.png",
};

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="ui-arrow" viewBox="0 0 20 20" aria-hidden="true">
      {diagonal ? (
        <><path d="M5 15 15 5" /><path d="M8 5h7v7" /></>
      ) : (
        <><path d="M3.5 10h12" /><path d="m11.5 6 4 4-4 4" /></>
      )}
    </svg>
  );
}

const experience = [
  ["Print Production / Designer", "Bothends Computer Solutions", "Nov 2015 – Jul 2019"],
  ["Founder", "SciHigh Clothing", "Feb 2016"],
  ["Creative Director", "West Shadows Production", "Aug 2016 – Sep 2019"],
  ["Graphic Design Department Head", "Project Pentagon", "Feb 2019 – Nov 2019"],
  ["Freelance Graphic Designer", "Project Base Work", "Nov 2019 – Dec 2020"],
  ["Senior Graphic Designer", "Dope Marketing", "Jan 2021 – Nov 2025"],
] as const;

const projects = [
  { ...projectSummaries.kove, image: assets.kove, href: "/work/kove" },
  { ...projectSummaries.unimotors, image: assets.unimotors, href: "/work/unimotors" },
  { ...projectSummaries.dope, image: assets.dope, href: "/work/dope-marketing" },
] as const;

export default function HomePage() {
  const [experienceProgress, setExperienceProgress] = useState(0);
  const experienceRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateExperience = () => {
      const section = experienceRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * .88;
      const end = -rect.height * .16;
      const raw = (start - rect.top) / (start - end);
      setExperienceProgress(Math.max(0, Math.min(1, raw)));
    };
    updateExperience();
    window.addEventListener("scroll", updateExperience, { passive: true });
    window.addEventListener("resize", updateExperience);
    return () => {
      window.removeEventListener("scroll", updateExperience);
      window.removeEventListener("resize", updateExperience);
    };
  }, []);

  return (
    <main className="race-home">
      <IntroSequence />

      <section id="top" className="hero">
        <SiteNav theme="light" />
        <div className="hero-speed hero-speed-a" aria-hidden="true" />
        <div className="hero-speed hero-speed-b" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <img className="hero-mark" src={siteAssets.logo} alt="" aria-hidden="true" />

        <div className="hero-shell shell">
          <div className="hero-copy">
            <p className="hero-eyebrow">Hi, I’m John Ferrer</p>
            <h1>
              <span className="hero-line">Creative Thinker<span className="dot">.</span></span>
              <span className="hero-line hero-red">Problem Solver<span className="dot">.</span></span>
              <span className="hero-line">Visual Storyteller<span className="dot">.</span></span>
            </h1>
            <p className="hero-sub">I turn ideas into impactful visual experiences that connect, inspire, and leave a lasting impression.</p>
            <a className="button hero-button icon-link" href="/contact"><span>Let’s Talk</span><ArrowIcon /></a>
            <div className="hero-location"><i /> <span>Arlington, VA<br />USA</span></div>
          </div>

          <div className="hero-portrait" aria-label="Portrait of John Ferrer">
            <img src={assets.portrait} alt="John Ferrer" />
          </div>

          <div className="hero-side-note" aria-hidden="true"><span>Ideas</span><span>Interfaces</span><span>Impact</span><i /></div>
          <div className="hero-scroll" aria-hidden="true"><span>Scroll</span><i /></div>
        </div>
      </section>

      <section id="work" className="work-section dark">
        <div className="shell">
          <div className="section-head work-head">
            <div>
              <p className="eyebrow section-index">02</p>
              <h2>Selected <span>Work</span></h2>
            </div>
            <a className="button outline large-action icon-link" href="/work"><span>View All Projects</span><ArrowIcon /></a>
          </div>
          <div className="mobile-swipe-hint"><span>Swipe through selected work</span><ArrowIcon /></div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <a className="project-card" key={project.name} href={project.href} aria-label={`View ${project.name} case study`}>
                <span className="project-number">0{index + 1}</span>
                <img src={project.image} alt={`${project.name} project`} />
                <div className="project-card-copy">
                  <p>{project.type}</p>
                  <h3>{project.name}</h3>
                  <span>{project.description}</span>
                  <b className="case-study-link"><span>View case study</span><ArrowIcon diagonal /></b>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="approach-section">
        <div className="shell approach-shell">
          <div className="approach-visual">
            <div className="approach-frame" aria-hidden="true" />
            <img src={assets.portrait} alt="John Ferrer" />
            <p>“Good design should feel inevitable.”</p>
          </div>
          <div className="approach-copy">
            <p className="eyebrow section-index">03 · My Approach</p>
            <h2>Human-centered.<br /><span>Outcome-driven.</span></h2>
            <p className="approach-intro">I combine strategy, visual craft, and practical problem-solving to create work that looks strong and works hard.</p>
            <div className="approach-grid">
              {services.slice(0, 4).map((item, index) => (
                <div className="approach-item" key={item}><span>0{index + 1}</span><strong>{item}</strong></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="experience-section" ref={experienceRef}>
        <div className="experience-watermark" aria-hidden="true"><img src={siteAssets.logo} alt="" /></div>
        <div className="shell experience-shell">
          <div className="experience-title">
            <p className="eyebrow section-index">04 · Experience</p>
            <h2>Built through <span>doing.</span></h2>
          </div>
          <a className="button outline experience-resume icon-link" href={resumeUrl} target="_blank" rel="noreferrer"><span>Download Résumé</span><ArrowIcon diagonal /></a>
          <div className="experience-track" aria-label="Professional experience timeline">
            {experience.map(([role, company, dates], index) => {
              const visible = experienceProgress > index / experience.length + .04;
              return (
                <article className={`experience-item${visible ? " is-visible" : ""}`} key={role}>
                  <span className="experience-number">0{index + 1}</span>
                  <div className="experience-copy"><h3>{role}</h3><p>{company}</p><small>{dates}</small></div>
                  {index < experience.length - 1 && <div className="experience-connector" aria-hidden="true"><span /><i /></div>}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="shell">
          <div className="testimonial-heading"><p className="eyebrow section-index">05 · Kind Words</p><h2>Proof in the <span>work.</span></h2></div>
          <div className="quote-grid">
            <blockquote><span className="quote-mark">“</span><div><p>John is a talented designer who brings ideas to life with creativity and precision. He understands the brief quickly and delivers beyond expectations.</p><footer>— Grace Hare<small>DOPE Design Manager</small></footer></div></blockquote>
            <blockquote><span className="quote-mark">“</span><div><p>Professional, reliable, and easy to work with. The designs were modern, clean, and exactly what our brand needed.</p><footer>— April Justo<small>KOVE Owner</small></footer></div></blockquote>
          </div>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        .ui-arrow{width:18px;height:18px;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:1.65;stroke-linecap:round;stroke-linejoin:round;transition:transform .28s cubic-bezier(.2,.8,.2,1)}
        .icon-link{gap:10px}.icon-link:hover .ui-arrow{transform:translateX(3px)}
        .case-study-link{display:inline-flex!important;align-items:center;gap:6px;width:fit-content}.case-study-link .ui-arrow{width:14px;height:14px}
        .mobile-swipe-hint{display:none}
      `}</style>
    </main>
  );
}
