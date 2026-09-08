import type { Metadata } from "next";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import CaseStudyStory from "../../components/CaseStudyStory";
import styles from "../case-study.module.css";
import local from "./art.module.css";

export const metadata: Metadata = {
  title: "Art & Exploration — John Ferrer",
  description:
    "A self-directed creative lab for testing new ideas, tools and visual techniques beyond client work.",
};

const assets = {
  pgLogo: "/work/art-exploration/pg-logo.jpg",
  donut: "/work/art-exploration/donut.jpg",
  poster1: "/work/art-exploration/poster-1.jpg",
  rainbow: "/work/art-exploration/rainbow.jpg",
  unicorn2: "/work/art-exploration/unicorn-2.jpg",
  unicorn1: "/work/art-exploration/unicorn-1.jpg",
  portrait: "/work/art-exploration/portrait.jpg",
  poster2: "/work/art-exploration/poster-2.jpg",
  poster3: "/work/art-exploration/poster-3.jpg",
  poster4: "/work/art-exploration/poster-4.jpg",
  poster5: "/work/art-exploration/poster-5.jpg",
  poster6: "/work/art-exploration/poster-6.jpg",
  poster7: "/work/art-exploration/poster-7.jpg",
  poster8: "/work/art-exploration/poster-8.jpg",
  next: "/work/art-exploration/next.svg",
};

export default function ArtExplorationPage() {
  return (
    <main className={styles.page}>
      <SiteNav theme="dark" />

      <article className={styles.case}>
        <Reveal className={local.intro}>
          <div className={styles.titleBlock}>
            <h1>ART &amp; EXPLORATION</h1>
            <p>This is my self-directed creative lab — personal work made to explore new ideas, techniques and tools beyond client assignments. It includes illustration, vector work, 3D experiments and motion-driven thinking.</p>
          </div>
          <img src={assets.pgLogo} alt="Personal project artwork" />
        </Reveal>

        <CaseStudyStory
          challenge="Keep developing creatively outside routine client work and avoid becoming limited to one visual style, toolset or production method."
          role="Self-directed artist and designer — defining the brief, experimenting, making and evaluating the result."
          thinking="Choose experiments that force me to learn something new rather than only making work I already know how to make."
          execution="Explored illustration, vector art, 3D, character work, poster design and motion-oriented concepts through self-initiated projects."
          outcome="A broader creative range and a stronger visual problem-solving toolkit that feeds back into my professional design work."
        />

        <div className={local.masonry}>
          <div className={local.leftCol}>
            <Reveal><img src={assets.donut} alt="3D donut artwork" /></Reveal>
            <Reveal><img src={assets.unicorn2} alt="3D unicorn artwork" /></Reveal>
            <Reveal><img src={assets.rainbow} alt="Rainbow illustration" /></Reveal>
            <Reveal><div className={local.poster6Crop}><img src={assets.poster6} alt="Illustrated portrait artwork" /></div></Reveal>
          </div>
          <div className={local.rightArea}>
            <Reveal><div className={local.topPair}><div className={local.cropFill}><img src={assets.portrait} alt="Illustration artwork" /></div><div className={local.cropFill}><img src={assets.unicorn1} alt="Unicorn character artwork" /></div></div></Reveal>
            <Reveal><div className={local.midPair}><div className={local.cropFill}><img src={assets.poster1} alt="Poster illustration" /></div><div className={local.cropFill}><img src={assets.poster2} alt="Poster illustration" /></div></div></Reveal>
            <Reveal><div className={local.lower}><div className={local.cropFill}><img src={assets.poster3} alt="Illustrated poster" /></div><div className={local.stack}><div className={local.cropFill}><img src={assets.poster4} alt="Illustrated artwork" /></div><div className={local.poster5Crop}><img src={assets.poster5} alt="Illustrated artwork" /></div></div></div></Reveal>
            <Reveal><div className={local.bottomPair}><div className={local.cropFill}><img src={assets.poster7} alt="Illustrated poster" /></div><div className={local.cropFill}><img src={assets.poster8} alt="Illustrated poster" /></div></div></Reveal>
          </div>
        </div>
      </article>

      <Reveal className={styles.next}><small>Next Project</small><a href="/work/kove"><h2>KOVE</h2><img src={assets.next} alt="" /></a></Reveal>
      <SiteFooter />
    </main>
  );
}
