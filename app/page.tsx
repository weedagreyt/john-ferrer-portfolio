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
          <p className="mobile-swipe-hint">Swipe through selected work →</p>
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

      <style>{`
        .mobile-swipe-hint { display: none; }

        @media (max-width: 620px) {
          .shell { width: min(100% - 28px, 1240px); }

          /* Mobile hero: editorial copy first, portrait as a deliberate second beat. */
          .hero { height: 780px; min-height: 780px; }
          .hero-shell { height: calc(100% - 92px); }
          .hero-copy { top: 18px; width: 100%; }
          .hero-eyebrow { margin-bottom: 10px; font-size: 13px; letter-spacing: .08em; }
          .hero h1 { max-width: 350px; font-size: clamp(39px, 11.3vw, 48px); line-height: 1.01; letter-spacing: -.055em; }
          .hero-sub { width: min(335px, 94%); margin-top: 15px; font-size: 15px; line-height: 1.48; }
          .hero-button { width: 174px; min-height: 48px; margin-top: 21px; font-size: 16px; }
          .hero-portrait { left: 50%; right: auto; bottom: -18px; width: 455px; max-width: 122vw; height: 390px; transform: translateX(-43%); opacity: .96; }
          .hero-portrait::before { content: ""; position: absolute; left: 17%; bottom: 34px; width: 270px; height: 270px; border: 1px solid rgba(198,17,17,.18); border-radius: 50%; z-index: -1; }

          /* Selected work: swipeable portfolio reel with a visible next-card cue. */
          .work-section { padding: 54px 0 60px; overflow: hidden; }
          .work-head { gap: 20px; margin-bottom: 0; }
          .section-head h2, .capability-heading h2, .experience-title h2, .testimonial-heading h2 { font-size: 36px; line-height: 1.02; }
          .work-head .large-action { order: 2; width: 100%; min-height: 52px; margin-top: 2px; font-size: 15px; }
          .mobile-swipe-hint { display: block; margin: 24px 0 12px; color: rgba(255,255,255,.52); font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
          .project-grid { display: flex; gap: 14px; overflow-x: auto; margin-right: -14px; padding: 0 14px 12px 0; scroll-snap-type: x mandatory; scrollbar-width: none; }
          .project-grid::-webkit-scrollbar { display: none; }
          .project-card, .project-card:last-child { flex: 0 0 min(82vw, 330px); width: min(82vw, 330px); aspect-ratio: 4 / 5; scroll-snap-align: start; border-radius: 16px; }
          .project-card-copy { padding: 20px; }
          .project-card-copy h3 { font-size: 25px; }
          .project-card-copy span { font-size: 12px; line-height: 1.45; }
          .project-card-copy b { margin-top: 12px; }

          /* Capabilities: compact two-column index instead of a long one-column stack. */
          .capabilities { padding: 58px 0 66px; }
          .capability-heading { margin-bottom: 28px; }
          .capability-grid { grid-template-columns: 1fr 1fr; }
          .capability { min-height: 112px; padding: 15px; }
          .capability strong { font-size: 16px; line-height: 1.18; }
          .capability span { font-size: 10px; }

          /* Experience: swipeable career cards keep the page from becoming overly tall. */
          .experience-section { min-height: 0; padding: 54px 0 62px; }
          .experience-title { margin-bottom: 20px; }
          .experience-resume { width: 100%; min-height: 52px; margin-bottom: 28px; font-size: 15px; }
          .experience-track { display: flex; gap: 12px; overflow-x: auto; margin-right: -14px; padding: 0 14px 10px 0; scroll-snap-type: x mandatory; scrollbar-width: none; }
          .experience-track::-webkit-scrollbar { display: none; }
          .experience-item { flex: 0 0 min(76vw, 285px); min-width: min(76vw, 285px); min-height: 158px; padding: 20px; border: 1px solid rgba(247,247,247,.13); border-radius: 14px; background: rgba(247,247,247,.045); opacity: 1 !important; transform: none !important; scroll-snap-align: start; }
          .experience-item::before { width: 34px; height: 3px; left: 20px; top: 20px; border-radius: 10px; }
          .experience-copy { max-width: 235px; padding-top: 28px; }
          .experience-copy h3 { font-size: 14px; }
          .experience-copy p, .experience-copy small { white-space: normal; }
          .experience-connector { display: none; }
          .experience-watermark { width: 390px; right: -150px; top: -20px; }

          /* Testimonials: cards instead of two large stacked quotes. */
          .testimonials { padding: 56px 0 64px; overflow: hidden; }
          .testimonial-heading { margin-bottom: 22px; }
          .quote-grid { display: flex; gap: 12px; overflow-x: auto; margin-right: -14px; padding: 0 14px 10px 0; scroll-snap-type: x mandatory; scrollbar-width: none; }
          .quote-grid::-webkit-scrollbar { display: none; }
          blockquote, blockquote + blockquote { flex: 0 0 min(86vw, 330px); min-height: 0; padding: 22px 18px; border: 1px solid var(--line); border-radius: 14px; scroll-snap-align: start; grid-template-columns: 34px 1fr; }
          blockquote + blockquote { border-left: 1px solid var(--line); }
          .quote-mark { margin-top: 12px; font-size: 64px; }
          blockquote p { font-size: 16px; line-height: 1.55; }
          blockquote footer { margin-top: 20px; font-size: 13px; }
          blockquote footer small { font-size: 12px; }
        }
      `}</style>
    </main>
  );
}
