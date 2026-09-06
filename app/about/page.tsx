import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import BrandBackground from "../components/BrandBackground";
import Reveal from "../components/Reveal";
import { ArrowIcon } from "../components/UiIcons";
import { resumeUrl } from "../lib/portfolio";
import styles from "./about.module.css";

const assets = {
  portrait: "https://www.figma.com/api/mcp/asset/91c4b357-dde5-4390-b7fd-1847cb4d3ceb.png",
  quoteLogo: "https://www.figma.com/api/mcp/asset/1019fb12-df56-4bec-bc8b-c7999866735f.svg",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <SiteNav theme="light" />

      <section className={styles.about}>
        <BrandBackground variant="about" />
        <div className={styles.content}>
          <Reveal className={styles.copy}>
            <p className={styles.eyebrow}>About Me</p>
            <h1>More than just pixels.</h1>
            <p className={styles.intro}>I’m a graphic designer with a passion for storytelling through design. I believe great design is not just about looking good — it’s about solving problems and making a real impact.</p>
            <ul>
              <li>Detail-oriented</li>
              <li>Deadline-driven</li>
              <li>Always Learning</li>
            </ul>
            <a className={styles.learnButton} href={resumeUrl} target="_blank" rel="noreferrer">View My Résumé <ArrowIcon diagonal size={17} style={{ marginLeft: 10 }} /></a>
          </Reveal>

          <Reveal className={styles.visual} delay={90}>
            <img className={styles.portrait} src={assets.portrait} alt="John Ferrer" />
            <div className={styles.quoteCard}>
              <span>“</span>
              <p>Good design isn’t just how it looks. It’s how it works.</p>
              <img src={assets.quoteLogo} alt="" />
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
