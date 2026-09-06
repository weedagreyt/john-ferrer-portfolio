import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import CaseStudyStory from "../../components/CaseStudyStory";
import styles from "../case-study.module.css";
import local from "./art.module.css";

const assets = {
  pgLogo: "https://www.figma.com/api/mcp/asset/10c3177c-cf3d-4909-8da9-85c5ec5ab883.png",
  donut: "https://www.figma.com/api/mcp/asset/e57047c5-8f6f-41f4-ad9b-802ae25c41f8.png",
  poster1: "https://www.figma.com/api/mcp/asset/086b8519-2b2b-4984-b06d-1b4ed598162f.png",
  rainbow: "https://www.figma.com/api/mcp/asset/967849af-18b1-484c-b048-13d0aa1be737.png",
  unicorn2: "https://www.figma.com/api/mcp/asset/f81f69c7-caaa-4548-912e-deec98252487.png",
  unicorn1: "https://www.figma.com/api/mcp/asset/8684d0a0-9d94-4c3c-99b6-9a17eda6b2ce.png",
  portrait: "https://www.figma.com/api/mcp/asset/fcdd9bfc-c573-4114-9225-b606076e8996.png",
  poster2: "https://www.figma.com/api/mcp/asset/1cb1eda5-a55c-4313-85d2-a98a5c50864a.png",
  poster3: "https://www.figma.com/api/mcp/asset/7887b5c0-80a0-48c8-b29b-b7be5965b8b3.png",
  poster4: "https://www.figma.com/api/mcp/asset/7289e13f-a6de-4c97-9c3b-ba3e781d31c5.png",
  poster5: "https://www.figma.com/api/mcp/asset/e219da30-9376-4971-80c3-13ab9ae18e97.png",
  poster6: "https://www.figma.com/api/mcp/asset/60d50d35-c98f-4da1-b58f-553722868526.png",
  poster7: "https://www.figma.com/api/mcp/asset/56e5c623-cda4-4dcb-8928-7bdc0cdbcdea.png",
  poster8: "https://www.figma.com/api/mcp/asset/a4dfe1e0-3613-4afe-aafb-2a9a10e4115f.png",
  next: "https://www.figma.com/api/mcp/asset/354e5b17-f24b-409e-88ef-a4d923dbff96.svg",
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
            <Reveal><div className={local.topPair}><img src={assets.portrait} alt="Illustration artwork" /><img src={assets.unicorn1} alt="Unicorn character artwork" /></div></Reveal>
            <Reveal><div className={local.midPair}><img src={assets.poster1} alt="Poster illustration" /><img src={assets.poster2} alt="Poster illustration" /></div></Reveal>
            <Reveal><div className={local.lower}><img className={local.tall} src={assets.poster3} alt="Illustrated poster" /><div className={local.stack}><img src={assets.poster4} alt="Illustrated artwork" /><div className={local.poster5Crop}><img src={assets.poster5} alt="Illustrated artwork" /></div></div></div></Reveal>
            <Reveal><div className={local.bottomPair}><img src={assets.poster7} alt="Illustrated poster" /><img src={assets.poster8} alt="Illustrated poster" /></div></Reveal>
          </div>
        </div>
      </article>

      <Reveal className={styles.next}><small>Next Project</small><a href="/work/kove"><h2>KOVE</h2><img src={assets.next} alt="" /></a></Reveal>
      <SiteFooter />
    </main>
  );
}
