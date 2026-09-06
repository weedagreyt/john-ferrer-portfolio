import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import CaseStudyStory from "../../components/CaseStudyStory";
import styles from "../case-study.module.css";
import local from "./yensanities.module.css";

const assets = {
  brandLogo: "https://www.figma.com/api/mcp/asset/ed3df94c-a2eb-42ec-b905-48d00af8f471.png",
  cover: "https://www.figma.com/api/mcp/asset/2eeb50a0-b174-44e6-bfa0-d6a31cbd118b.png",
  year2022: "https://www.figma.com/api/mcp/asset/e24866f4-2177-485f-ba7d-960a1ffb53df.png",
  anniversary: "https://www.figma.com/api/mcp/asset/6ebb5c56-cac9-4d8c-8615-3fb82c4ec9b7.png",
  bikini: "https://www.figma.com/api/mcp/asset/747b0096-884f-4d8d-8ac5-cd21bd3b754c.png",
  summer: "https://www.figma.com/api/mcp/asset/a8bc06ab-5554-49fd-b43e-2a910492ce19.png",
  watermelon: "https://www.figma.com/api/mcp/asset/15ccfa6b-a80d-4f34-97b0-e4b419bd7978.png",
  swimming: "https://www.figma.com/api/mcp/asset/ac3e9e05-d6a4-46c4-b92b-8ed0709d6b72.png",
  sizeChart: "https://www.figma.com/api/mcp/asset/50284b86-b442-4024-ae63-3b14a8610826.png",
  song: "https://www.figma.com/api/mcp/asset/80bef956-4c85-4138-a794-7f5accfe5a2c.png",
  sale: "https://www.figma.com/api/mcp/asset/b09d53f2-c12e-4fca-a2fe-2811890ef8b9.png",
  image4: "https://www.figma.com/api/mcp/asset/64327711-c6ad-4202-a5e1-a07e7f925cbd.png",
  image5: "https://www.figma.com/api/mcp/asset/9fb2a607-7cc4-417f-9e01-6974a57c9f79.png",
  next: "https://www.figma.com/api/mcp/asset/104b1a9d-0139-47c6-9925-bb69397c39d5.svg",
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

      <Reveal className={styles.next}><small>Next Project</small><a href="/work/retrophorics"><h2>RETROPHORICS</h2><img src={assets.next} alt="" /></a></Reveal>
      <SiteFooter />
    </main>
  );
}
