import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import Reveal from "../components/Reveal";
import { ArrowIcon } from "../components/UiIcons";
import { resumeUrl } from "../lib/portfolio";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <SiteNav theme="light" />
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.visual}>
          <img src="/about/john-workspace-clean.webp" alt="John Ferrer seated at his laptop" width={1586} height={992} fetchPriority="high" />
        </div>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>About me</p>
          <h1 id="about-title">Art at heart.<br /><span>Purpose in design.</span></h1>
          <p>I’m John, a self-taught graphic designer. I started with a love for drawing and painting, then found new ways to create through digital design.</p>
          <p>Over time, my curiosity grew beyond how things look. I became interested in what makes people stop, connect, and take action.</p>
          <a className={styles.button} href={resumeUrl} target="_blank" rel="noreferrer">View my résumé <ArrowIcon diagonal size={17} /></a>
        </div>
      </section>
      <section className={styles.journey} aria-labelledby="journey-title">
        <Reveal className={styles.journeyIntro}>
          <p className={styles.eyebrow}>My journey</p>
          <h2 id="journey-title">From making art<br /><span>to making connections.</span></h2>
          <p>Design has always been my way of exploring ideas, solving problems, and finding better ways to communicate with people.</p>
        </Reveal>
        <Reveal className={styles.story} delay={80}>
          <p>My early work in a local advertising and print shop taught me how ideas become real materials—and how to listen to the people behind each project. Freelance work opened the door to different brands, audiences, and challenges.</p>
          <p>At DOPE Marketing, I grew into a senior designer, combining creativity with practical problem-solving. That experience helped me approach design with a marketer’s mindset: understanding the audience, finding the message, and giving it a clear visual voice.</p>
          <blockquote>I enjoy seeing people interact with my work. A design feels meaningful when it sparks curiosity, starts a conversation, or helps someone take the next step.</blockquote>
        </Reveal>
      </section>
      <section className={styles.contact} aria-labelledby="connect-title">
        <h2 id="connect-title">Let’s build something <span>that connects.</span></h2>
        <a className={styles.button} href="/contact">Start a conversation <ArrowIcon diagonal size={17} /></a>
      </section>
      <SiteFooter />
    </main>
  );
}
