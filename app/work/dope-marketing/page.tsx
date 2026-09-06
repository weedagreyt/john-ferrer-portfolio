import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import CaseStudyStory from "../../components/CaseStudyStory";
import styles from "../case-study.module.css";
import local from "./dope.module.css";

const assets = {
  printProducts: "https://www.figma.com/api/mcp/asset/a6bec33f-2973-4df2-909b-c8c8e86ea1f1.png",
  postcards: "https://www.figma.com/api/mcp/asset/2bde42ae-40a4-4382-af28-6f558c00af9d.png",
  targeted: "https://www.figma.com/api/mcp/asset/0a5f43a0-9bac-45df-a57b-0fe3a51317ec.png",
  sign: "https://www.figma.com/api/mcp/asset/d1e5a67f-a70b-42fa-b386-3677a6e94bcd.png",
  yardsigns: "https://www.figma.com/api/mcp/asset/ca0a9826-a652-4d5b-a78e-46ac32af812b.png",
  rollup: "https://www.figma.com/api/mcp/asset/5b2be463-3a5b-414b-98a3-5cde687ec36f.png",
  mascot: "https://www.figma.com/api/mcp/asset/5305a6b0-6cc6-4b8b-924d-8ae525cc96bf.png",
  brochure: "https://www.figma.com/api/mcp/asset/2f766a15-86bb-478f-bdcf-476771cfebe2.png",
  social1: "https://www.figma.com/api/mcp/asset/c4bd82a4-002d-43ef-8666-f787d86d8f33.png",
  flyer: "https://www.figma.com/api/mcp/asset/2410d660-6d61-42e2-8c05-0128974e66a1.png",
  social2: "https://www.figma.com/api/mcp/asset/88932d33-0226-47ca-ba61-3f4157fa97c7.png",
  social3: "https://www.figma.com/api/mcp/asset/12f8f175-71df-4bc1-a8e6-cde1b02dfa35.png",
  next: "https://www.figma.com/api/mcp/asset/47ffa696-06fd-4374-a3ed-7a49ded1fe1d.svg",
};

export default function DopeMarketingPage() {
  return (
    <main className={styles.page}>
      <SiteNav theme="dark" />

      <article className={styles.case}>
        <Reveal className={local.intro}>
          <div className={styles.titleBlock}>
            <h1>DOPE MARKETING</h1>
            <p>DOPE Marketing is a Minnesota-based direct print and mail company serving local businesses. I worked remotely with the team for five years, starting as one of their early designers and later becoming Senior Graphic Designer.</p>
          </div>
          <img src={assets.printProducts} alt="DOPE Marketing print products" />
        </Reveal>

        <CaseStudyStory
          challenge="Support a growing direct-print and mail company across many client and internal projects while keeping work fast, clear and production-ready."
          role="Senior Graphic Designer working across campaign design, print production, internal creative and day-to-day visual problem solving."
          thinking="Direct-response work has to communicate immediately. I balanced strong visual hooks with consistency, readability and the practical needs of physical print production."
          execution="Created postcards, print campaigns, signage, roll-up banners, brochures, flyers, social graphics and internal brand work while handling multiple projects at once."
          outcome="Long-term creative support across an expanding mix of brand, client and production touchpoints, with a visual approach built to work at real marketing speed."
        />

        <div className={local.gallery}>
          <Reveal><div className={local.heroPair}><img src={assets.postcards} alt="DOPE postcard designs" /><img src={assets.targeted} alt="DOPE targeted postcards campaign" /></div></Reveal>

          <Reveal>
            <div className={local.mascotFeature}>
              <div><p>Campaign work ranged from direct-response postcard concepts to internal brand assets. The goal was always the same: make the message easy to understand without making the design feel generic.</p><img src={assets.social1} alt="DOPE social media design" /></div>
              <img src={assets.mascot} alt="DOPE mascot" />
            </div>
          </Reveal>

          <Reveal><div className={local.productionRow}><img src={assets.sign} alt="DOPE sign mockup" /><img src={assets.yardsigns} alt="DOPE yard signs" /><img src={assets.rollup} alt="DOPE roll-up banner" /></div></Reveal>

          <Reveal><div className={local.brochureRow}><img src={assets.brochure} alt="DOPE brochure mockup" /><img src={assets.flyer} alt="DOPE flyer mockup" /></div></Reveal>

          <Reveal><div className={local.socialRow}><img src={assets.social2} alt="DOPE social media design" /><img src={assets.social3} alt="DOPE social media design" /></div></Reveal>
        </div>
      </article>

      <Reveal className={styles.next}><small>Next Project</small><a href="/work/yensanities"><h2>YENSANITIES</h2><img src={assets.next} alt="" /></a></Reveal>
      <SiteFooter />
    </main>
  );
}
