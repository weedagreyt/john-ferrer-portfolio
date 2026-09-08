import type { Metadata } from "next";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import CaseStudyStory from "../../components/CaseStudyStory";
import styles from "../case-study.module.css";

export const metadata: Metadata = {
  title: "KOVE — John Ferrer",
  description:
    "A bold, premium identity for a café + car wash, shaped by industrial cues and extended into event campaigns.",
};

const assets = {
  brandLogo: "/work/kove/brand-logo.png",
  hero: "/work/kove/hero.jpg",
  moodboards: "/work/kove/moodboards.jpg",
  moodPhoto: "/work/kove/mood-photo.jpg",
  product: "/work/kove/product.jpg",
  exterior: "/work/kove/exterior.jpg",
  poster: "/work/kove/poster.jpg",
  eventPhoto: "/work/kove/event-photo.jpg",
  countdown: "/work/kove/countdown.jpg",
  photobooth: "/work/kove/photobooth.jpg",
  eventDetail: "/work/kove/event-detail.jpg",
  next: "/work/kove/next.svg",
};

export default function KovePage() {
  return (
    <main className={styles.page}>
      <SiteNav theme="dark" />

      <article className={styles.case}>
        <Reveal className={styles.introRow}>
          <div className={styles.titleBlock}>
            <h1>KOVE KAFE &amp; KARWASH</h1>
            <p>KOVE KAFE + KARWASH needed a brand identity for a café and car wash connected to the owner’s construction business. The direction had to feel industrial and bold, but still polished enough to support a premium customer experience.</p>
          </div>
          <div className={styles.brandLogo}><img src={assets.brandLogo} alt="KOVE Kafe & Karwash logo" /></div>
        </Reveal>

        <CaseStudyStory
          challenge="Build one premium identity that could connect a café, car wash and construction-influenced aesthetic without feeling too heavy or mechanical."
          role="Brand strategy, visual direction, identity design, campaign design and art direction."
          thinking="Use industrial cues as the foundation, then balance them with hospitality polish. I explored several mood-board directions before committing to the final visual language."
          execution="Developed the identity system and applied it across environmental imagery, branded touchpoints and a separate EDM event campaign while keeping the core brand recognizable."
          outcome="A cohesive visual system that can move between the physical location, everyday marketing and higher-energy event promotions without losing the KOVE identity."
        />

        <div className={styles.gallery}>
          <Reveal><div className={styles.koveHero}><img src={assets.hero} alt="KOVE Kafe and Karwash exterior at night" /></div></Reveal>

          <Reveal>
            <div className={styles.splitTextMedia}>
              <div>
                <p className={styles.text}>The early exploration focused on finding the right balance between construction-inspired structure, premium finishes and an approachable café personality.</p>
                <div className={styles.koveMoodPhoto}><img src={assets.moodPhoto} alt="KOVE brand exploration" /></div>
              </div>
              <div className={styles.koveMoodboards}><img src={assets.moodboards} alt="KOVE mood board options" /></div>
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.twoUp}>
              <div className={styles.koveProduct}><img src={assets.product} alt="KOVE branded product" /></div>
              <div className={styles.koveExterior}><img src={assets.exterior} alt="KOVE cafe exterior" /></div>
            </div>
          </Reveal>

          <Reveal>
            <div className={styles.eventGrid}>
              <div className={styles.eventLeft}>
                <p className={styles.copyWide}>I extended the identity into campaign materials for KOVE’s EDM event, shifting the energy toward nightlife and promotion while keeping enough of the original system to make the event feel connected to the brand.</p>
                <div className={styles.koveEventPhoto}><img src={assets.eventPhoto} alt="KOVE EDM event" /></div>
              </div>
              <div className={styles.eventRight}><div className={styles.kovePoster}><img src={assets.poster} alt="KOVE EDM event poster" /></div></div>
            </div>
          </Reveal>

          <Reveal><div className={styles.eventBottom}><div className={styles.eventBottomCrop}><img src={assets.countdown} alt="KOVE event countdown artwork" /></div><div className={`${styles.eventBottomCrop} ${styles.eventBottomCropSquare}`}><img src={assets.photobooth} alt="KOVE photobooth artwork" /></div><div className={`${styles.eventBottomCrop} ${styles.eventBottomCropSquare}`}><img src={assets.eventDetail} alt="KOVE event detail" /></div></div></Reveal>
        </div>
      </article>

      <Reveal className={styles.next}><small>Next Project</small><a href="/work/unimotors"><h2>UNIMOTORS</h2><img src={assets.next} alt="" /></a></Reveal>
      <SiteFooter />
    </main>
  );
}
