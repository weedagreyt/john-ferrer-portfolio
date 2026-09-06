"use client";

import { useEffect, useRef, useState } from "react";

const assets = {
  logo: "https://www.figma.com/api/mcp/asset/d08ff3ba-c18e-4f12-bcf1-8663c3a16414.svg",
  logoFooter: "https://www.figma.com/api/mcp/asset/6d3716e9-208e-48b3-9ba4-221accad7fba.svg",
  logoWatermark: "https://www.figma.com/api/mcp/asset/8b82f3de-86eb-48cf-a251-5f41312b8613.svg",
  portrait: "https://www.figma.com/api/mcp/asset/419fb359-2402-4a85-8204-e73eab1fb774.png",

  kove: "https://www.figma.com/api/mcp/asset/5d91335e-73b4-4cf1-bea6-abd728443d6b.png",
  unimotors: "https://www.figma.com/api/mcp/asset/ba8480b5-6706-46d6-8d54-14b372575ccc.png",
  dope: "https://www.figma.com/api/mcp/asset/84221a32-57e8-41ab-af29-4e97a0fdccad.png",

  introKove: "https://www.figma.com/api/mcp/asset/93416d34-118b-4903-952e-55b437dd2b1b.png",
  introUnicorn: "https://www.figma.com/api/mcp/asset/3d19b2d4-07eb-4a73-955f-2a3e822a75fd.png",
  introDopePostcards: "https://www.figma.com/api/mcp/asset/c7c33483-297e-4e28-a211-82b9115989e4.png",
  introKoveMoodboard: "https://www.figma.com/api/mcp/asset/c9ba12fa-291c-4745-8727-9bb700fd4ca9.png",
  introRetrophorics: "https://www.figma.com/api/mcp/asset/9807e5a3-2e8d-4b5c-b70f-9d87c3b0056d.png",
  introDopePortrait: "https://www.figma.com/api/mcp/asset/767357fd-bfdc-4c71-bf8e-20979585c325.png",
  introUnimotors: "https://www.figma.com/api/mcp/asset/afbebb9f-ea15-4ded-8dca-9229030fca09.png",

  heroVector1: "https://www.figma.com/api/mcp/asset/5ab4195b-cf07-4c72-ae72-e6c77a51a4b1.svg",
  heroVector2: "https://www.figma.com/api/mcp/asset/3287b682-08c3-4d3c-a285-e57de68b3a2f.svg",
  heroVector3: "https://www.figma.com/api/mcp/asset/97f8be82-3b66-498c-a3c7-22c3b03a3e98.svg",

  behance: "https://www.figma.com/api/mcp/asset/364fda00-cce1-400d-b3b8-519d6e8187c4.png",
  designs99: "https://www.figma.com/api/mcp/asset/8293b9ea-f1c6-4836-b41f-56dde4bda46e.png",
  designhill: "https://www.figma.com/api/mcp/asset/86c29073-6f55-4e7b-a354-91db2b8fc948.png",
};

const resumeUrl = "https://drive.google.com/file/d/1JzH0wXGffM_iplyQ8bkOOlfRHDjreQxp/view?usp=sharing";

const experience = [
  ["Print Production / Designer", "Bothends Computer Solutions", "Nov 2015 – Jul 2019"],
  ["Founder", "SciHigh Clothing", "Feb 2016"],
  ["Creative Director", "West Shadows Production", "Aug 2016 – Sep 2019"],
  ["Graphic Design Department Head", "Project Pentagon", "Feb 2019 – Nov 2019"],
  ["Freelance Graphic Designer", "Project Base Work", "Nov 2019 – Dec 2020"],
  ["Senior Graphic Designer", "Dope Marketing", "Jan 2021 – Nov 2025"],
] as const;

const projects = [
  { name: "KOVE", image: assets.kove, href: "/work/kove" },
  { name: "UNIMOTORS", image: assets.unimotors, href: "/work/unimotors" },
  { name: "DOPE", image: assets.dope, href: "/work/dope-marketing" },
] as const;

const capabilities = [
  "Branding & Identity",
  "Marketing Design",
  "Campaign Design",
  "Social Media Design",
  "Print & Editorial",
  "Art Direction",
] as const;

const introSlides = [
  assets.introKove,
  assets.introUnicorn,
  assets.introDopePostcards,
  assets.introKoveMoodboard,
  assets.introRetrophorics,
  assets.introDopePortrait,
  assets.introUnimotors,
] as const;

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [introIndex, setIntroIndex] = useState(0);
  const [experienceProgress, setExperienceProgress] = useState(0);
  const experienceRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setShowIntro(false);
      return;
    }

    const interval = window.setInterval(() => {
      setIntroIndex((current) => Math.min(current + 1, introSlides.length - 1));
    }, 235);
    const leave = window.setTimeout(() => setIntroLeaving(true), 1740);
    const finish = window.setTimeout(() => setShowIntro(false), 2160);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(leave);
      window.clearTimeout(finish);
    };
  }, []);

  useEffect(() => {
    const updateExperience = () => {
      const section = experienceRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const start = viewport * 0.88;
      const end = -rect.height * 0.16;
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
      {showIntro && (
        <div className={`intro-screen${introLeaving ? " is-leaving" : ""}`} aria-hidden="true">
          {introSlides.map((image, index) => (
            <div className={`intro-slide${introIndex === index ? " is-active" : ""}`} key={image}>
              <img src={image} alt="" />
            </div>
          ))}
          <div className="intro-shutter intro-shutter-left" />
          <div className="intro-shutter intro-shutter-right" />
        </div>
      )}

      <section id="top" className="hero">
        <div className="hero-brand-lines" aria-hidden="true">
          <img className="hero-line hero-line-1" src={assets.heroVector1} alt="" />
          <img className="hero-line hero-line-2" src={assets.heroVector2} alt="" />
          <img className="hero-line hero-line-3" src={assets.heroVector3} alt="" />
        </div>

        <header className="site-header shell">
          <a href="#top" className="brand" aria-label="John Ferrer home">
            <img src={assets.logo} alt="John Ferrer logo" />
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a className="active" href="/">Home</a>
            <a href="/work">Work</a>
            <a href="/about">About</a>
            <a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a>
            <a className="button nav-contact" href="/contact">Contact Me</a>
          </nav>
        </header>

        <div className="hero-shell shell">
          <div className="hero-copy">
            <p className="hero-eyebrow">Hi, I’m John Ferrer</p>
            <h1>
              Creative Thinker<span>.</span><br />
              Problem Solver<span>.</span><br />
              Visual Storyteller<span>.</span>
            </h1>
            <p className="hero-sub">
              Senior Graphic Designer focused on creating thoughtful brands, campaigns, and visual experiences that connect with people.
            </p>
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
          {capabilities.map((item, index) => (
            <div className="capability" key={item}>
              <span>0{index + 1}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="experience-section" ref={experienceRef}>
        <div className="experience-watermark" aria-hidden="true">
          <img src={assets.logoWatermark} alt="" />
        </div>
        <div className="shell experience-shell">
          <div className="experience-title">
            <p className="eyebrow">Experience</p>
            <h2>My Journey</h2>
          </div>
          <a className="button outline experience-resume" href={resumeUrl} target="_blank" rel="noreferrer">Download Résumé →</a>

          <div className="experience-track" aria-label="Professional experience timeline">
            {experience.map(([role, company, dates], index) => {
              const threshold = index / experience.length;
              const visible = experienceProgress > threshold + 0.04;
              return (
                <article className={`experience-item${visible ? " is-visible" : ""}`} key={role}>
                  <div className="experience-copy">
                    <h3>{role}</h3>
                    <p>{company}</p>
                    <small>{dates}</small>
                  </div>
                  {index < experience.length - 1 && (
                    <div className="experience-connector" aria-hidden="true">
                      <span />
                      <i />
                    </div>
                  )}
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
            <div>
              <p>John is a talented designer who brings ideas to life with creativity and precision. He understands the brief quickly and delivers beyond expectations.</p>
              <footer>— Grace Hare<small>DOPE Design Manager</small></footer>
            </div>
          </blockquote>
          <blockquote>
            <span className="quote-mark">“</span>
            <div>
              <p>Professional, reliable, and easy to work with. The designs were modern, clean, and exactly what our brand needed.</p>
              <footer>— April Justo<small>KOVE Owner</small></footer>
            </div>
          </blockquote>
        </div>
      </section>

      <footer className="site-footer">
        <img className="footer-watermark" src={assets.logoWatermark} alt="" aria-hidden="true" />
        <div className="shell footer-grid">
          <div className="footer-brand-column">
            <a className="footer-wordmark" href="/" aria-label="John Ferrer Design home">
              <img src={assets.logoFooter} alt="" />
              <span><em>John Ferrer</em><strong>Design</strong></span>
            </a>
            <p>Graphic designer focused on creating visual solutions that inspire and deliver results.</p>
            <div className="social-links" aria-label="Social links">
              <a href="https://www.behance.net/weedagreyt" target="_blank" rel="noreferrer"><img src={assets.behance} alt="Behance" /></a>
              <a href="https://99designs.com/profiles/3055278" target="_blank" rel="noreferrer"><img src={assets.designs99} alt="99designs" /></a>
              <a href="https://www.designhill.com/member/weedagreyt" target="_blank" rel="noreferrer"><img src={assets.designhill} alt="Designhill" /></a>
            </div>
            <small className="footer-copyright">© 2026 John Ferrer Design. All rights reserved.</small>
          </div>

          <div className="footer-column">
            <p className="footer-label">Quick Links</p>
            <a href="/">Home</a>
            <a href="/work">Work</a>
            <a href="/about">About</a>
            <a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a>
          </div>

          <div className="footer-column services-column">
            <p className="footer-label">Services</p>
            {capabilities.map((item) => <span key={item}>{item}</span>)}
          </div>

          <div className="footer-column footer-contact-column">
            <p className="footer-label">Let’s Work Together</p>
            <p>Have a project in mind?<br />Let’s create something amazing.</p>
            <a className="button footer-contact" href="/contact">Contact Me</a>
            <a href="mailto:weetotwee@gmail.com">weetotwee@gmail.com</a>
            <a href="tel:+16893400216">+1 689 340 0216</a>
            <span>Arlington, VA</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
