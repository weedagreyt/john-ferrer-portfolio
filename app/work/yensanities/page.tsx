import styles from "../case-study.module.css";
import local from "./yensanities.module.css";

const resumeUrl = "https://drive.google.com/file/d/1JzH0wXGffM_iplyQ8bkOOlfRHDjreQxp/view?usp=sharing";

const assets = {
  logo: "https://www.figma.com/api/mcp/asset/72cb8346-8da4-4afc-ae82-a53e62680991.svg",
  watermark: "https://www.figma.com/api/mcp/asset/7d47a273-647c-4346-ae97-9ef35ffdfb6b.svg",
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
  behance: "https://www.figma.com/api/mcp/asset/b5110b6d-9d14-4e87-ae9e-1ff6ab0fcc4d.png",
  designs99: "https://www.figma.com/api/mcp/asset/29836ae9-0221-4929-9936-b190d731287c.png",
  designhill: "https://www.figma.com/api/mcp/asset/ef0422e0-b0e1-4518-afc6-32ddf3046a48.png",
};

const services = ["Branding & Identity", "Marketing Design", "Campaign Design", "Social Media Design", "Print & Editorial", "Art Direction"];

export default function YensanitiesPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}><img src={assets.logo} alt="John Ferrer logo" /></a>
        <nav className={styles.nav}><a href="/">Home</a><a className={styles.active} href="/work">Work</a><a href="/about">About</a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a><a className={styles.contactButton} href="/contact">Contact Me</a></nav>
      </header>

      <article className={styles.case}>
        <div className={local.intro}>
          <div className={styles.titleBlock}>
            <h1>YENSANITIES</h1>
            <p>Yensanities is a bikini retailer focused on a young adult audience, with a tropical and playful brand direction. I developed the brand identity from the ground up, including the logo, color palette, visual elements, and overall design system, creating a consistent look across the brand.</p>
            <img className={local.cover} src={assets.cover} alt="Yensanities Facebook cover" />
          </div>
          <img className={local.brandLogo} src={assets.brandLogo} alt="Yensanities logo" />
        </div>

        <div className={local.gallery}>
          <div className={local.three}><img src={assets.year2022} alt="Yensanities 2022 campaign" /><img src={assets.anniversary} alt="Yensanities anniversary campaign" /><img src={assets.bikini} alt="Yensanities bikini contest campaign" /></div>
          <div className={local.three}><img src={assets.summer} alt="Yensanities summer sale" /><img src={assets.watermelon} alt="Yensanities tropical campaign" /><img src={assets.swimming} alt="Yensanities swimming campaign" /></div>
          <div className={local.featureRow}><img className={local.sizeChart} src={assets.sizeChart} alt="Yensanities size chart" /><div className={local.stack}><img src={assets.song} alt="Yensanities recommended song post" /><img src={assets.sale} alt="Yensanities sale post" /></div></div>
          <div className={local.bottom}><img src={assets.image4} alt="Yensanities lifestyle campaign" /><img src={assets.image5} alt="Yensanities beach social post" /></div>
        </div>
      </article>

      <div className={styles.next}><small>Next Project</small><a href="/work/retrophorics"><h2>RETROPHORICS</h2><img src={assets.next} alt="" /></a></div>

      <footer className={styles.footer}>
        <img className={styles.footerWatermark} src={assets.watermark} alt="" />
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}><a className={styles.wordmark} href="/"><img src={assets.logo} alt="" /><span><em>John Ferrer</em><strong>Design</strong></span></a><p>Graphic designer focused on creating visual solutions that inspire and deliver results.</p><div className={styles.socials}><a href="https://www.behance.net/weedagreyt" target="_blank" rel="noreferrer"><img src={assets.behance} alt="Behance" /></a><a href="https://99designs.com/profiles/3055278" target="_blank" rel="noreferrer"><img src={assets.designs99} alt="99designs" /></a><a href="https://www.designhill.com/member/weedagreyt" target="_blank" rel="noreferrer"><img src={assets.designhill} alt="Designhill" /></a></div><small>© 2026 John Ferrer Design. All rights reserved.</small></div>
          <div className={styles.footerColumn}><b>Quick Links</b><a href="/">Home</a><a href="/work">Work</a><a href="/about">About</a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a></div>
          <div className={styles.footerColumn}><b>Services</b>{services.map((service) => <span key={service}>{service}</span>)}</div>
          <div className={styles.footerColumn}><b>Let’s Work Together</b><p>Have a project in mind?<br />Let’s create something amazing.</p><a className={styles.footerContact} href="/contact">Contact Me</a><a href="mailto:weetotwee@gmail.com">weetotwee@gmail.com</a><a href="tel:+16893400216">+1 689 340 0216</a><span>Arlington, VA</span></div>
        </div>
      </footer>
    </main>
  );
}
