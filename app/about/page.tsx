import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import BrandBackground from "../components/BrandBackground";
import Reveal from "../components/Reveal";
import { ArrowIcon } from "../components/UiIcons";
import { resumeUrl } from "../lib/portfolio";
import styles from "./about.module.css";

const assets = {
  portrait: "/about/john-workspace-premium.webp",
  quoteLogo: "https://www.figma.com/api/mcp/asset/1019fb12-df56-4bec-bc8b-c7999866735f.svg",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <SiteNav theme="light" />

      <section className={styles.about}>
        <BrandBackground variant="about" />
        <div className={styles.content}>
          <Reveal className={styles.visual} delay={70}>
            <img className={styles.portrait} src={assets.portrait} alt="John Ferrer working in his design studio" />
            <div className={styles.imageTag}><span /> Creative direction in progress</div>
          </Reveal>

          <Reveal className={styles.copy}>
            <p className={styles.eyebrow}>Independent Graphic Designer</p>
            <h1>More than<br />just <span>pixels.</span></h1>
            <p className={styles.intro}>I’m a graphic designer with a passion for storytelling through design. I believe great design is not just about looking good — it’s about solving problems and making a real impact.</p>
            <a className={styles.learnButton} href={resumeUrl} target="_blank" rel="noreferrer">View My Résumé <ArrowIcon diagonal size={17} style={{ marginLeft: 10 }} /></a>
          </Reveal>

          <Reveal className={styles.detailPanel} delay={140}>
            <div className={styles.traits}>
              <span>Detail-oriented</span>
              <span>Deadline-driven</span>
              <span>Always learning</span>
            </div>
            <blockquote>“Good design isn’t just how it looks. It’s how it works.”</blockquote>
            <img src={assets.quoteLogo} alt="" />
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
