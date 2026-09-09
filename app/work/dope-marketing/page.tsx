import type { Metadata } from "next";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import CaseStudyStory from "../../components/CaseStudyStory";
import CaseStudyCta from "../../components/CaseStudyCta";
import styles from "../case-study.module.css";
import local from "./dope.module.css";

export const metadata: Metadata = {
  title: "DOPE Marketing — John Ferrer",
  description:
    "Five years of print, campaign and internal creative work for a fast-moving direct-mail marketing company.",
};

const assets = {
  printProducts: "/work/dope-marketing/print-products.jpg",
  postcards: "/work/dope-marketing/postcards.jpg",
  targeted: "/work/dope-marketing/targeted.jpg",
  sign: "/work/dope-marketing/sign.jpg",
  yardsigns: "/work/dope-marketing/yard-signs.jpg",
  rollup: "/work/dope-marketing/rollup.jpg",
  mascot: "/work/dope-marketing/mascot.png",
  brochure: "/work/dope-marketing/brochure.jpg",
  social1: "/work/dope-marketing/social-1.jpg",
  flyer: "/work/dope-marketing/flyer.jpg",
  social2: "/work/dope-marketing/social-2.jpg",
  social3: "/work/dope-marketing/social-3.jpg",
  next: "/work/dope-marketing/next.svg",
};

export default function DopeMarketingPage() {
  return (
    <main className={styles.page}>
      <SiteNav theme="dark" />

      <article className={styles.case}>
        <Reveal className={local.intro}>
          <div className={local.introLeft}>
            <div className={styles.titleBlock}>
              <h1>DOPE MARKETING</h1>
              <p>DOPE Marketing is a Minnesota-based direct print and mail company serving local businesses. I worked remotely with the team for five years, starting as one of their early designers and later becoming Senior Graphic Designer.</p>
            </div>
            <div className={local.postcards}><img src={assets.postcards} alt="DOPE postcard designs" /></div>
          </div>
          <div className={local.printProducts}><img src={assets.printProducts} alt="DOPE Marketing print products" /></div>
        </Reveal>

        <CaseStudyStory
          challenge="Support a growing direct-print and mail company across many client and internal projects while keeping work fast, clear and production-ready."
          role="Senior Graphic Designer working across campaign design, print production, internal creative and day-to-day visual problem solving."
          thinking="Direct-response work has to communicate immediately. I balanced strong visual hooks with consistency, readability and the practical needs of physical print production."
          execution="Created postcards, print campaigns, signage, roll-up banners, brochures, flyers, social graphics and internal brand work while handling multiple projects at once."
          outcome="Long-term creative support across an expanding mix of brand, client and production touchpoints, with a visual approach built to work at real marketing speed."
        />

        <div className={local.gallery}>
          <Reveal><div className={local.leadGrid}><div className={local.targeted}><img src={assets.targeted} alt="DOPE targeted postcards campaign" /></div><div className={local.mascot}><img src={assets.mascot} alt="DOPE mascot" /></div></div></Reveal>
          <Reveal><div className={local.productionRow}><img src={assets.sign} alt="DOPE sign mockup" /><img src={assets.yardsigns} alt="DOPE yard signs" /><div className={local.rollup}><img src={assets.rollup} alt="DOPE roll-up banner" /></div></div></Reveal>
          <Reveal><div className={local.brochureRow}><img src={assets.brochure} alt="DOPE brochure mockup" /><img src={assets.social1} alt="DOPE social media design" /></div></Reveal>
          <Reveal><div className={local.socialRow}><img src={assets.flyer} alt="DOPE flyer mockup" /><img src={assets.social2} alt="DOPE social media design" /><img src={assets.social3} alt="DOPE social media design" /></div></Reveal>
        </div>
      </article>

      <Reveal><CaseStudyCta /></Reveal>
      <Reveal className={styles.next}><small>Next Project</small><a href="/work/yensanities"><h2>YENSANITIES</h2><img src={assets.next} alt="" /></a></Reveal>
      <SiteFooter />
    </main>
  );
}
