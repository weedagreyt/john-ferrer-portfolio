import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import CaseStudyStory from "../../components/CaseStudyStory";
import styles from "../case-study.module.css";

const assets = {
  brandLogo: "https://www.figma.com/api/mcp/asset/6bbc0805-89e2-4d1b-b3d1-b8973354a9f2.png",
  hero: "https://www.figma.com/api/mcp/asset/e6146070-4f97-4e23-b368-71c3657ba4b9.png",
  moodboards: "https://www.figma.com/api/mcp/asset/58e6085f-6946-470a-9b23-e1d3e8de98b7.png",
  moodPhoto: "https://www.figma.com/api/mcp/asset/988c38e0-f017-4cda-9845-d36fc6bd9a7d.png",
  product: "https://www.figma.com/api/mcp/asset/c3a1dfee-11d5-4946-aaad-af6ccc7556b7.png",
  exterior: "https://www.figma.com/api/mcp/asset/74ebebf6-40fb-495f-a846-17b1f1078773.png",
  poster: "https://www.figma.com/api/mcp/asset/2d71a627-31a6-4661-a57a-2e0bd9145124.png",
  eventPhoto: "https://www.figma.com/api/mcp/asset/a46d7f4d-4257-4ffe-b995-a06b9169689f.png",
  countdown: "https://www.figma.com/api/mcp/asset/3bba8acb-717a-4ebd-8362-4f21bd660d3f.png",
  photobooth: "https://www.figma.com/api/mcp/asset/8c8f3321-3285-4740-b24e-5276d421f908.png",
  eventDetail: "https://www.figma.com/api/mcp/asset/2c6c591a-f74a-4198-9f7b-0c5f4e5cbeb1.png",
  next: "https://www.figma.com/api/mcp/asset/1ad79bf8-f49c-4cdb-8a27-ffdfb7a5ce7f.svg",
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
          <Reveal><div className={styles.full}><img src={assets.hero} alt="KOVE Kafe and Karwash exterior at night" /></div></Reveal>

          <Reveal>
            <div className={styles.splitTextMedia}>
              <div>
                <p className={styles.text}>The early exploration focused on finding the right balance between construction-inspired structure, premium finishes and an approachable café personality.</p>
                <img src={assets.moodPhoto} alt="KOVE brand exploration" />
              </div>
              <img src={assets.moodboards} alt="KOVE mood board options" />
            </div>
          </Reveal>

          <Reveal><div className={styles.twoUp}><img src={assets.product} alt="KOVE branded product" /><img src={assets.exterior} alt="KOVE cafe exterior" /></div></Reveal>

          <Reveal><p className={styles.copyWide}>I extended the identity into campaign materials for KOVE’s EDM event, shifting the energy toward nightlife and promotion while keeping enough of the original system to make the event feel connected to the brand.</p></Reveal>

          <Reveal>
            <div className={styles.eventGrid}>
              <div className={styles.eventLeft}><img src={assets.eventPhoto} alt="KOVE EDM event" /></div>
              <div className={styles.eventRight}><img src={assets.poster} alt="KOVE EDM event poster" /></div>
            </div>
          </Reveal>

          <Reveal><div className={styles.eventBottom}><img src={assets.countdown} alt="KOVE event countdown artwork" /><img src={assets.photobooth} alt="KOVE photobooth artwork" /><img src={assets.eventDetail} alt="KOVE event detail" /></div></Reveal>
        </div>
      </article>

      <Reveal className={styles.next}><small>Next Project</small><a href="/work/unimotors"><h2>UNIMOTORS</h2><img src={assets.next} alt="" /></a></Reveal>
      <SiteFooter />
    </main>
  );
}
