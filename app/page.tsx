"use client";

import { useEffect, useRef, useState } from "react";
import IntroSequence from "./components/IntroSequence";
import BrandBackground from "./components/BrandBackground";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import { projectSummaries, resumeUrl, services, siteAssets } from "./lib/portfolio";

const assets = {
  portrait: "https://www.figma.com/api/mcp/asset/444382a5-690d-483b-a881-9ec4956476c0.png",
  kove: "https://www.figma.com/api/mcp/asset/a4f118aa-caf3-42cf-91e1-aae3af51fc05.png",
  unimotors: "https://www.figma.com/api/mcp/asset/c0d21f3a-2bd4-4f1b-994f-f494084d10d2.png",
  dope: "https://www.figma.com/api/mcp/asset/5d08bcf7-f229-4889-9d34-08401c51103e.png",
};

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
    <main>
      <IntroSequence />

      <section id="top" className="hero">
        <BrandBackground variant="hero" />
        <SiteNav theme="light" />

        <div className="hero-shell shell">
          <div className="hero-copy">
            <p className="hero-eyebrow">Hi, I’m John Ferrer</p>
            <h1>
              Creative Thinker<span>.</span><br />
              Problem Solver<span>.</span><br />
              Visual Storyteller<span>.</span>
            </h1>
            <p className="hero-sub">I turn ideas into impactful visual experiences that connect, inspire, and leave a lasting impression.</p>
            <a className="button hero-button" href="/contact">Let’s Talk →</a>
          </div>

          <div className="hero-portrait" aria-label="Portrait of John Ferrer">
            <img src={assets.portrait} alt="John Ferrer" />
          </div>
        </div>
      </section>

      <section id="work" className="work-section dark">
        <div className="shell">
          <div className="section-head work-head">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h2>Design that speaks.<br />Stories that connect.</h2>
            </div>
            <a className="button outline large-action" href="/work">View All Projects →</a>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <a className="project-card" key={project.name} href={project.href} aria-label={`View ${project.name} case study`}>
                <img src={project.image} alt={`${project.name} project`} />
                <div className="project-card-copy">
                  <p>{project.type}</p>
                  <h3>{project.name}</h3>
                  <span>{project.description}</span>
                  <b>View case study ↗</b>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="capabilities shell">
        <div className="capability-heading">
          <p className="eyebrow">Capabilities</p>
          <h2>Built around ideas,<br />not just software.</h2>
        </div>
        <div className="capability-grid">
          {services.map((item, index) => (
            <div className="capability" key={item}>
              <span>0{index + 1}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="experience-section" ref={experienceRef}>
        <div className="experience-watermark" aria-hidden="true"><img src={siteAssets.logo} alt="" /></div>
        <div className="shell experience-shell">
          <div className="experience-title">
            <p className="eyebrow">Experience</p>
            <h2>My Journey</h2>
          </div>
          <a className="button outline experience-resume" href={resumeUrl} target="_blank" rel="noreferrer">Download Résumé →</a>

          <div className="experience-track" aria-label="Professional experience timeline">
            {experience.map(([role, company, dates], index) => {
              const threshold = index / experience.length;
              const visible = experienceProgress > threshold + .04;
              return (
                <article className={`experience-item${visible ? " is-visible" : ""}`} key={role}>
                  <div className="experience-copy">
                    <h3>{role}</h3>
                    <p>{company}</p>
                    <small>{dates}</small>
                  </div>
                  {index < experience.length - 1 && <div className="experience-connector" aria-hidden="true"><span /><i /></div>}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="testimonials shell">
        <div className="testimonial-heading">
          <p className="eyebrow">Kind Words</p>
          <h2>What they say.</h2>
        </div>
        <div className="quote-grid">
          <blockquote>
            <span className="quote-mark">“</span>
            <div><p>John is a talented designer who brings ideas to life with creativity and precision. He understands the brief quickly and delivers beyond expectations.</p><footer>— Grace Hare<small>DOPE Design Manager</small></footer></div>
          </blockquote>
          <blockquote>
            <span className="quote-mark">“</span>
            <div><p>Professional, reliable, and easy to work with. The designs were modern, clean, and exactly what our brand needed.</p><footer>— April Justo<small>KOVE Owner</small></footer></div>
          </blockquote>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
