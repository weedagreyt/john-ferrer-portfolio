"use client";

import { useEffect, useRef, useState } from "react";
import { resumeUrl } from "../lib/portfolio";

type ExperienceLink = {
  label: string;
  href: string;
};

type ExperienceItem = {
  stage: string;
  role: string;
  company: string;
  dates: string;
  description: string;
  skills: readonly string[];
  projects?: readonly string[];
  links?: readonly ExperienceLink[];
};

const experience: readonly ExperienceItem[] = [
  {
    stage: "Ownership",
    role: "Co-Founder",
    company: "Sci High Clothing",
    dates: "Feb 2015 – Mar 2016",
    description:
      "Designed T-shirt collections, managed clothing production, and created content for the brand's target customers.",
    skills: ["T-Shirt Design", "Production", "Brand Content"],
  },
  {
    stage: "Production",
    role: "Print Designer & Operator",
    company: "Bothends Computer Solutions",
    dates: "Nov 2015 – Jul 2019",
    description:
      "Assisted clients with their printing needs, designed promotional and large-format materials, prepared designs for print production, and operated printing equipment.",
    skills: ["Client Service", "Large Format", "Prepress", "Print Operations"],
  },
  {
    stage: "Creative Direction",
    role: "Creative Director",
    company: "West Shadows Production",
    dates: "Aug 2016 – Sep 2019",
    description:
      "Handled graphic design projects for local clients, worked with engineering, architectural, photography, and video teams, and created content for social media advertising.",
    skills: ["Creative Direction", "Cross-Team Work", "Client Projects", "Social Advertising"],
  },
  {
    stage: "Leadership",
    role: "Graphic Design Department Head",
    company: "Project Pentagon",
    dates: "Feb 2019 – Nov 2019",
    description:
      "Handled graphic design projects for local clients, worked with engineering, architectural, photography, and video teams, and created content for social media advertising.",
    skills: ["Design Leadership", "Cross-Team Work", "Client Delivery", "Social Advertising"],
  },
  {
    stage: "Project Work",
    role: "Project Work Highlights",
    company: "Selected client & brand projects",
    dates: "Nov 2019 – Dec 2020",
    description:
      "Selected client and brand projects across brand design, social media, asset design, vehicle decals, and comics editing.",
    skills: ["Brand Design", "Social Media", "Asset Design", "Production"],
    projects: [
      "Toomics Global — Comics Editing",
      "Unimotors — Brand Design",
      "Pueblo de Panay — Vehicle Decals",
      "Edney Lane — Asset Design",
      "Retrophorics — Soc Med & Branding",
      "Storey Teller — Soc Med & Branding",
      "Yensanities — Soc Med & Branding",
      "The Fit CEO — Soc Med & Branding",
    ],
    links: [
      { label: "Unimotors", href: "/work/unimotors" },
      { label: "Retrophorics", href: "/work/retrophorics" },
      { label: "Yensanities", href: "/work/yensanities" },
    ],
  },
  {
    stage: "Senior Designer",
    role: "Senior Graphic Designer",
    company: "DOPE Marketing",
    dates: "Jan 2021 – Nov 2025",
    description:
      "Designed direct mail and marketing materials, created branded advertising and social media content, and provided design training and support to the team.",
    skills: ["Direct Mail", "Advertising", "Social Media", "Team Support"],
    links: [{ label: "View selected DOPE work", href: "/work/dope-marketing" }],
  },
] as const;

function ArrowIcon() {
  return (
    <svg className="race-arrow" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3.5 10h12" />
      <path d="m11.5 6 4 4-4 4" />
    </svg>
  );
}

export default function ExperienceJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const zoneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const navRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateActiveChapter = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;

      const sectionRect = section.getBoundingClientRect();
      if (sectionRect.bottom < 0 || sectionRect.top > window.innerHeight) return;

      const target = window.innerHeight * 0.5;
      let nextIndex = 0;

      zoneRefs.current.forEach((zone, index) => {
        if (!zone) return;
        const rect = zone.getBoundingClientRect();
        if (rect.top <= target) nextIndex = index;
      });

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveChapter);
    };

    updateActiveChapter();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 760px)").matches) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    navRefs.current[activeIndex]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  const jumpToChapter = (index: number) => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActiveIndex(index);
    zoneRefs.current[index]?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  const activeExperience = experience[activeIndex];
  const progress = experience.length > 1 ? (activeIndex / (experience.length - 1)) * 100 : 0;

  return (
    <section ref={sectionRef} id="experience" className="approach-section experience-home journey-section">
      <div className="shell">
        <div className="experience-home-head journey-head">
          <div>
            <p className="micro-label">My Journey</p>
            <h2 className="experience-tenure" aria-label="10 plus years of experience">
              <span className="experience-tenure-number">10+</span>
              <span className="experience-tenure-copy">
                <span>Years of</span>
                <span>Experience</span>
              </span>
            </h2>
          </div>
          <a className="experience-resume-link" href={resumeUrl} target="_blank" rel="noreferrer">
            Download Résumé <ArrowIcon />
          </a>
        </div>

        <div className="journey-story">
          <div className="journey-stage">
            <aside className="journey-stage-nav" aria-label="Career timeline navigation">
              <nav className="journey-nav">
                <span className="journey-nav-line" aria-hidden="true" />
                <span className="journey-nav-progress" style={{ height: `${progress}%` }} aria-hidden="true" />

                {experience.map((item, index) => (
                  <button
                    ref={(node) => {
                      navRefs.current[index] = node;
                    }}
                    className={`journey-nav-item${activeIndex === index ? " is-active" : ""}`}
                    type="button"
                    key={`${item.role}-${item.dates}`}
                    onClick={() => jumpToChapter(index)}
                    aria-current={activeIndex === index ? "step" : undefined}
                  >
                    <span className="journey-nav-marker" aria-hidden="true" />
                    <span className="journey-nav-date">{item.dates}</span>
                    <span className="journey-nav-stage">{item.stage}</span>
                  </button>
                ))}
              </nav>
            </aside>

            <div className="journey-card-frame" aria-live="polite" aria-atomic="true">
              <article
                className="journey-card journey-card-single"
                key={`${activeExperience.company}-${activeExperience.dates}`}
              >
                <div className="journey-card-meta">
                  <span>{activeExperience.stage}</span>
                  <time>{activeExperience.dates}</time>
                </div>

                <h3>{activeExperience.role}</h3>
                <p className="journey-company">{activeExperience.company}</p>
                <p className="journey-description">{activeExperience.description}</p>

                <div className="journey-skills" aria-label="Skills and focus areas">
                  {activeExperience.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                {activeExperience.projects ? (
                  <div className="journey-projects" aria-label="Project work highlights">
                    {activeExperience.projects.map((project) => (
                      <span key={project}>{project}</span>
                    ))}
                  </div>
                ) : null}

                {activeExperience.links ? (
                  <div className="journey-links">
                    {activeExperience.links.map((link) => (
                      <a href={link.href} key={link.href}>
                        {link.label} <ArrowIcon />
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            </div>
          </div>

          <div className="journey-scroll-zones" aria-hidden="true">
            {experience.map((item, index) => (
              <div
                ref={(node) => {
                  zoneRefs.current[index] = node;
                }}
                className="journey-scroll-zone"
                key={`scroll-${item.stage}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
