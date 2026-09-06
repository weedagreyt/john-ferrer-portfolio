import styles from "../case-study.module.css";
import local from "./dope.module.css";

const resumeUrl = "https://drive.google.com/file/d/1JzH0wXGffM_iplyQ8bkOOlfRHDjreQxp/view?usp=sharing";

const assets = {
  logo: "https://www.figma.com/api/mcp/asset/eacfdb61-fb23-4118-96c1-5dae29b77f00.svg",
  watermark: "https://www.figma.com/api/mcp/asset/892ca5c0-efa1-4b1a-bd40-75ea9b8eb4e6.svg",
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
  behance: "https://www.figma.com/api/mcp/asset/25b651f6-a718-46ac-871f-74d1b412bd69.png",
  designs99: "https://www.figma.com/api/mcp/asset/8ca62480-a0b7-4a03-bd7a-304a2d0fec75.png",
  designhill: "https://www.figma.com/api/mcp/asset/27b83565-326a-459f-82fe-23be0521f5ef.png",
};

const services = ["Branding & Identity", "Marketing Design", "Campaign Design", "Social Media Design", "Print & Editorial", "Art Direction"];

export default function DopeMarketingPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}><img src={assets.logo} alt="John Ferrer logo" /></a>
        <nav className={styles.nav}><a href="/">Home</a><a className={styles.active} href="/work">Work</a><a href="/about">About</a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a><a className={styles.contactButton} href="/contact">Contact Me</a></nav>
      </header>

      <article className={styles.case}>
        <div className={local.intro}>
          <div className={styles.titleBlock}><h1>DOPE MARKETING</h1><p>DOPE Marketing is a Minnesota-based direct print and mail marketing company serving local businesses. I worked remotely with the team for five years, starting as one of their early graphic designers and later being promoted to Senior Designer. I worked on client projects, internal design work, meetings, and multiple projects at once, while also helping solve design and project-related challenges as the company grew.</p></div>
          <img src={assets.printProducts} alt="DOPE Marketing print products" />
        </div>

        <div className={local.grid}>
          <img className={local.postcards} src={assets.postcards} alt="DOPE postcard designs" />
          <img className={local.targeted} src={assets.targeted} alt="DOPE targeted postcards campaign" />
          <img className={local.mascot} src={assets.mascot} alt="DOPE mascot" />
          <img src={assets.sign} alt="DOPE sign mockup" />
          <img src={assets.yardsigns} alt="DOPE yard signs" />
          <img src={assets.rollup} alt="DOPE roll-up banner" />
          <img className={local.brochure} src={assets.brochure} alt="DOPE brochure mockup" />
          <img src={assets.social1} alt="DOPE social media design" />
          <img src={assets.flyer} alt="DOPE flyer mockup" />
          <img src={assets.social2} alt="DOPE social media design" />
          <img src={assets.social3} alt="DOPE social media design" />
        </div>
      </article>

      <div className={styles.next}><small>Next Project</small><a href="/work/yensanities"><h2>YENSANITIES</h2><img src={assets.next} alt="" /></a></div>

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
