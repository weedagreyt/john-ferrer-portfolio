import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import Reveal from "../components/Reveal";
import { ArrowIcon } from "../components/UiIcons";
import { projectSummaries } from "../lib/portfolio";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Selected Work — John Ferrer",
  description:
    "A selection of identity, campaign, marketing and exploratory work from John Ferrer — each built around a different creative problem.",
};

const assets = {
  kove: "/work/thumbs/kove.jpg",
  unimotors: "/work/thumbs/unimotors.jpg",
  dope: "/work/thumbs/dope.jpg",
  yensanities: "/work/thumbs/yensanities.jpg",
  retrophorics: "/work/thumbs/retrophorics.jpg",
  art: "/work/thumbs/art.jpg",
};

const projects = [
  { ...projectSummaries.kove, image: assets.kove, href: "/work/kove" },
  { ...projectSummaries.unimotors, image: assets.unimotors, href: "/work/unimotors" },
  { ...projectSummaries.dope, image: assets.dope, href: "/work/dope-marketing" },
  { ...projectSummaries.yensanities, image: assets.yensanities, href: "/work/yensanities" },
  { ...projectSummaries.retrophorics, image: assets.retrophorics, href: "/work/retrophorics" },
  { ...projectSummaries.art, image: assets.art, href: "/work/art-exploration" },
] as const;

export default function WorkPage() {
  return (
    <main className={styles.page}>
      <SiteNav theme="dark" />

      <section className={styles.hero}>
        <p>Selected Work</p>
        <h1>Design that speaks.<br /><span>Stories that connect.</span></h1>
        <span>A selection of identity, campaign, marketing and exploratory work — each built around a different creative problem.</span>
      </section>

      <section className={styles.grid} aria-label="Portfolio projects">
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={(index % 2) * 80}>
            <a href={project.href} className={styles.card} aria-label={`Open ${project.name} project`}>
              <img src={project.image} alt={`${project.name} project`} />
              <div className={styles.cardGradient} />
              <div className={styles.cardCopy}>
                <p>{project.type}</p>
                <h2>{project.name}</h2>
                <span>{project.description}</span>
                <b>Explore project <i><ArrowIcon diagonal size={16} /></i></b>
              </div>
            </a>
          </Reveal>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
