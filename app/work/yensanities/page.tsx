import type { Metadata } from "next";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import CaseStudyStory from "../../components/CaseStudyStory";
import CaseStudyCta from "../../components/CaseStudyCta";
import styles from "../case-study.module.css";
import local from "./yensanities.module.css";

export const metadata: Metadata = {
  title: "Yensanities — John Ferrer",
  description:
    "A bright tropical identity and flexible social system designed for a young swimwear audience.",
};

const assets = {
  brandLogo: "/work/yensanities/brand-logo.jpg",
  cover: "/work/yensanities/cover.jpg",
  year2022: "/work/yensanities/year-2022.jpg",
  anniversary: "/work/yensanities/anniversary.jpg",
  bikini: "/work/yensanities/bikini.jpg",
  summer: "/work/yensanities/summer.jpg",
  watermelon: "/work/yensanities/watermelon.jpg",
  swimming: "/work/yensanities/swimming.jpg",
  sizeChart: "/work/yensanities/size-chart.jpg",
  song: "/work/yensanities/song.jpg",
  sale: "/work/yensanities/sale.jpg",
  image4: "/work/yensanities/image-4.jpg",
  image5: "/work/yensanities/image-5.jpg",
  next: "/work/yensanities/next.svg",
};

export default function YensanitiesPage() {
  return (
    <main className={styles.page}>
      <SiteNav theme="dark" />

      <article className={styles.case}>
        <Reveal className={local.intro}>
          <div className={styles.titleBlock}>
            <h1>YENSANITIES</h1>
            <p>Yensanities is a bikini retailer built for a young-adult audience. I developed the visual identity from the ground up around a tropical, playful personality that could stay recognizable through frequent product, promotional and social content.</p>
            <img className={local.cover} src={assets.cover} alt="Yensanities Facebook cover" />
          </div>
          <img className={local.brandLogo} src={assets.brandLogo} alt="Yensanities logo" />
        </Reveal>

        <CaseStudyStory
          challenge="Build a complete identity from scratch for a swimwear retailer that needed to feel youthful, tropical and energetic without becoming visually inconsistent."
          role="Brand identity, logo design, color system, campaign design and social-media creative."
          thinking="Create a small set of recognizable visual ingredients — tropical shapes, bright brand colors and playful typography — that could flex across many kinds of content."
          execution="Developed the logo and brand language, then applied the system to covers, anniversary campaigns, sales, bikini promotions, sizing information and recurring social content."
          outcome="A consistent tropical visual system that gives product information and promotional content a recognizable Yensanities personality."
        />

        <div className={local.gallery}>
          <Reveal><div className={local.three}><img src={assets.year2022} alt="Yensanities 2022 campaign" /><img src={assets.anniversary} alt="Yensanities anniversary campaign" /><img src={assets.bikini} alt="Yensanities bikini contest campaign" /></div></Reveal>
          <Reveal><div className={local.three}><img src={assets.summer} alt="Yensanities summer sale" /><img src={assets.watermelon} alt="Yensanities tropical campaign" /><img src={assets.swimming} alt="Yensanities swimming campaign" /></div></Reveal>
          <Reveal><div className={local.featureRow}><img className={local.sizeChart} src={assets.sizeChart} alt="Yensanities size chart" /><div className={local.stack}><img src={assets.song} alt="Yensanities recommended song post" /><img src={assets.sale} alt="Yensanities sale post" /></div></div></Reveal>
          <Reveal><div className={local.bottom}><img src={assets.image4} alt="Yensanities lifestyle campaign" /><img src={assets.image5} alt="Yensanities beach social post" /></div></Reveal>
        </div>
      </article>

      <Reveal><CaseStudyCta /></Reveal>
      <Reveal className={styles.next}><small>Next Project</small><a href="/work/retrophorics"><h2>RETROPHORICS</h2><img src={assets.next} alt="" /></a></Reveal>
      <SiteFooter />
    </main>
  );
}
