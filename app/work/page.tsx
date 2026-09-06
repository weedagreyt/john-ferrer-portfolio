import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import Reveal from "../components/Reveal";
import { ArrowIcon } from "../components/UiIcons";
import { projectSummaries } from "../lib/portfolio";
import styles from "./work.module.css";

const assets = {
  kove: "https://www.figma.com/api/mcp/asset/a4f118aa-caf3-42cf-91e1-aae3af51fc05.png",
  unimotors: "https://www.figma.com/api/mcp/asset/c0d21f3a-2bd4-4f1b-994f-f494084d10d2.png",
  dope: "https://www.figma.com/api/mcp/asset/5d08bcf7-f229-4889-9d34-08401c51103e.png",
  yensanities: "https://www.figma.com/api/mcp/asset/6e2edb3a-539b-4bd7-9e3c-5f7fd984d6b5.png",
  retrophorics: "https://www.figma.com/api/mcp/asset/987640d0-65bc-44ca-b925-6e8c63fdbd7f.png",
  art: "https://www.figma.com/api/mcp/asset/6cb4bb8e-5d0d-4291-b03f-9c168d84f928.png",
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
        <h1>Design that speaks.<br />Stories that connect.</h1>
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
