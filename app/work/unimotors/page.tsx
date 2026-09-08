import type { Metadata } from "next";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import CaseStudyStory from "../../components/CaseStudyStory";
import styles from "../case-study.module.css";

export const metadata: Metadata = {
  title: "UNIMOTORS — John Ferrer",
  description:
    "An automotive identity built from brand-character exploration into a clear, recognizable visual system.",
};

const assets = {
  hero: "/work/unimotors/hero.jpg",
  direction1: "/work/unimotors/direction-1.jpg",
  direction2: "/work/unimotors/direction-2.jpg",
  direction3: "/work/unimotors/direction-3.jpg",
  card: "/work/unimotors/card.jpg",
  hang: "/work/unimotors/hang.jpg",
  vehicle: "/work/unimotors/vehicle.jpg",
  next: "/work/unimotors/next.svg",
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
          <Reveal><div className={styles.unimotorsHero}><img src={assets.hero} alt="UNIMOTORS garage identity" /></div></Reveal>
          <Reveal><div className={styles.unimotorsStrip}><img src={assets.direction1} alt="UNIMOTORS brand direction one" /></div></Reveal>
          <Reveal><div className={styles.unimotorsStrip}><img src={assets.direction2} alt="UNIMOTORS brand direction two" /></div></Reveal>
          <Reveal><div className={styles.unimotorsStrip}><img src={assets.direction3} alt="UNIMOTORS brand direction three" /></div></Reveal>

          <Reveal>
            <div className={styles.unimotorsDetail}>
              <div className={styles.unimotorsDetailLeft}>
                <p className={styles.copyWide}>Once the client chose the strongest direction, the focus shifted from broad exploration to refinement — building a logo and visual system that felt cohesive, memorable and practical to use.</p>
                <div className={styles.unimotorsMirror}><img src={assets.hang} alt="UNIMOTORS mirror hang" /></div>
              </div>
              <div className={styles.unimotorsCard}><img src={assets.card} alt="UNIMOTORS business card" /></div>
            </div>
          </Reveal>

          <Reveal><div className={styles.unimotorsVehicle}><img src={assets.vehicle} alt="UNIMOTORS vehicle branding" /></div></Reveal>
        </div>
      </article>

      <Reveal className={styles.next}><small>Next Project</small><a href="/work/dope-marketing"><h2>DOPE MARKETING</h2><img src={assets.next} alt="" /></a></Reveal>
      <SiteFooter />
    </main>
  );
}
