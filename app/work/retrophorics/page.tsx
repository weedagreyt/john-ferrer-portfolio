import type { Metadata } from "next";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import CaseStudyStory from "../../components/CaseStudyStory";
import CaseVideo from "./CaseVideo";
import styles from "../case-study.module.css";
import local from "./retrophorics.module.css";

export const metadata: Metadata = {
  title: "Retrophorics — John Ferrer",
  description:
    "A retro-fashion identity combining bold typography, collage, campaign art and social storytelling.",
};

const assets = {
  hero: "/work/retrophorics/hero.jpg",
  brandLogo: "/work/retrophorics/brand-logo.jpg",
  kfc: "/work/retrophorics/kfc.jpg",
  hershey: "/work/retrophorics/hershey.jpg",
  johnnie: "/work/retrophorics/johnnie.jpg",
  sexy: "/work/retrophorics/sexy.jpg",
  flirty: "/work/retrophorics/flirty.jpg",
  business: "/work/retrophorics/business.jpg",
  rockabilly: "/work/retrophorics/rockabilly.jpg",
  hippy: "/work/retrophorics/hippy.jpg",
  posh: "/work/retrophorics/posh.jpg",
  motion: "/work/retrophorics/motion.jpg",
  priority: "/work/retrophorics/priority.jpg",
  coco: "/work/retrophorics/coco.jpg",
  denim: "/work/retrophorics/denim.jpg",
  express: "/work/retrophorics/express.jpg",
  next: "/work/retrophorics/next.svg",
  brandFilmVideo: "/work/retrophorics/brand-film.mp4",
  motionVideo: "/work/retrophorics/motion-exploration.mp4",
};

const characterTiles = [assets.sexy, assets.flirty, assets.business, assets.rockabilly, assets.hippy, assets.posh];

export default function RetrophoricsPage() {
  return (
    <main className={styles.page}>
      <SiteNav theme="dark" />

      <article className={styles.case}>
        <Reveal className={local.intro}>
          <div className={styles.titleBlock}>
            <h1>RETROPHORICS</h1>
            <p>Retrophorics is a fashion brand focused on retro-style tops for women ages 25–35. I built the brand identity, visual direction and marketing language around nostalgia, but kept the execution energetic enough to feel like a contemporary fashion brand.</p>
            <img className={local.brandLogo} src={assets.brandLogo} alt="Retrophorics logo" />
          </div>
          <CaseVideo className={local.heroVideo} src={assets.hero} videoSrc={assets.brandFilmVideo} alt="Retrophorics brand presentation" />
        </Reveal>

        <CaseStudyStory
          challenge="Create a distinctive fashion identity that feels genuinely retro without looking like a copy of one specific era or becoming visually dated."
          role="Brand identity, art direction, marketing design, campaign design and social content."
          thinking="Mix recognizable retro cues with a more modern editorial rhythm. Bold type, collage, color and character-based styling gave the system range while keeping a consistent attitude."
          execution="Developed the logo, visual references, character directions, campaign artwork, social posts and motion concepts that could support both brand storytelling and product marketing."
          outcome="A flexible fashion identity with a distinctive retro voice that can stretch across static campaigns, social content and motion."
        />

        <div className={local.gallery}>
          <Reveal><div className={local.three}><img src={assets.kfc} alt="Retrophorics KFC-inspired style board" /><img src={assets.hershey} alt="Retrophorics Hershey-inspired style board" /><img src={assets.johnnie} alt="Retrophorics Johnnie Walker-inspired style board" /></div></Reveal>
          <Reveal><div className={local.characters}>{characterTiles.map((src, i) => <img src={src} alt={`Retrophorics brand character ${i + 1}`} key={src} />)}</div></Reveal>
          <Reveal><CaseVideo className={local.motionVideo} src={assets.motion} videoSrc={assets.motionVideo} alt="Retrophorics motion design preview" /></Reveal>
          <Reveal><div className={local.socialGrid}><img src={assets.denim} alt="Retrophorics denim social post" /><img src={assets.coco} alt="Retrophorics Coco Chanel social post" /><img src={assets.priority} alt="Retrophorics make yourself a priority social post" /><img src={assets.express} alt="Retrophorics dress to express social post" /></div></Reveal>
        </div>
      </article>

      <Reveal className={styles.next}><small>Next Project</small><a href="/work/art-exploration"><h2>ART &amp; EXPLORATION</h2><img src={assets.next} alt="" /></a></Reveal>
      <SiteFooter />
    </main>
  );
}
