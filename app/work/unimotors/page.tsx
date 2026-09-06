import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import CaseStudyStory from "../../components/CaseStudyStory";
import styles from "../case-study.module.css";

const assets = {
  hero: "https://www.figma.com/api/mcp/asset/4e5ca8b8-94ae-45f1-8951-8aed9ce1d339.png",
  direction1: "https://www.figma.com/api/mcp/asset/8ee6baa5-888f-4975-af52-bcf915865b75.png",
  direction2: "https://www.figma.com/api/mcp/asset/a77b6778-89ec-4f22-9c35-e4d20130a44f.png",
  direction3: "https://www.figma.com/api/mcp/asset/18a41cd5-75b3-43fd-b01a-926432635a6d.png",
  card: "https://www.figma.com/api/mcp/asset/3c815ae3-d0b9-4865-a05a-35d9850fa79a.png",
  hang: "https://www.figma.com/api/mcp/asset/f3063a87-e540-402c-bafe-4cb165f5393a.png",
  vehicle: "https://www.figma.com/api/mcp/asset/86d9efe9-f5fd-41c3-8281-cc0f703553e4.png",
  next: "https://www.figma.com/api/mcp/asset/c3bde017-f2fb-48a7-a370-65e8ef742145.svg",
};

export default function UnimotorsPage() {
  return (
    <main className={styles.page}>
      <SiteNav theme="dark" />

      <article className={styles.case}>
        <Reveal className={styles.introRow}>
          <div className={styles.titleBlock}>
            <h1>UNIMOTORS</h1>
            <p>UNIMOTORS is a buy, sell and trade automotive business that needed a clear identity from a blank starting point. Instead of jumping straight into a logo, I first built different brand-character directions to establish the personality the identity should express.</p>
          </div>
          <div />
        </Reveal>

        <CaseStudyStory
          challenge="Create a distinctive automotive identity for a business with no defined visual direction or established brand personality."
          role="Brand direction, identity design, logo exploration and marketing collateral."
          thinking="Define the character before designing the mark. I created three different brand directions so the client could react to personality, tone and visual language first."
          execution="After a direction was selected, I developed three logo concepts and carried the chosen system into business collateral, mirror hangers and vehicle applications."
          outcome="A clearer and more recognizable identity system that can stay consistent across customer-facing automotive touchpoints."
        />

        <div className={styles.gallery}>
          <Reveal><div className={styles.full}><img src={assets.hero} alt="UNIMOTORS garage identity" /></div></Reveal>
          <Reveal><div className={styles.full}><img src={assets.direction1} alt="UNIMOTORS brand direction one" /></div></Reveal>
          <Reveal><div className={styles.full}><img src={assets.direction2} alt="UNIMOTORS brand direction two" /></div></Reveal>
          <Reveal><div className={styles.full}><img src={assets.direction3} alt="UNIMOTORS brand direction three" /></div></Reveal>
          <Reveal><p className={styles.copyWide}>Once the client chose the strongest direction, the focus shifted from broad exploration to refinement — building a logo and visual system that felt cohesive, memorable and practical to use.</p></Reveal>
          <Reveal><div className={styles.twoUp}><img src={assets.hang} alt="UNIMOTORS mirror hang" /><img src={assets.card} alt="UNIMOTORS business card" /></div></Reveal>
          <Reveal><div className={styles.full}><img src={assets.vehicle} alt="UNIMOTORS vehicle branding" /></div></Reveal>
        </div>
      </article>

      <Reveal className={styles.next}><small>Next Project</small><a href="/work/dope-marketing"><h2>DOPE MARKETING</h2><img src={assets.next} alt="" /></a></Reveal>
      <SiteFooter />
    </main>
  );
}
