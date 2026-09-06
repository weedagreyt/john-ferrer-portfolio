import styles from "../case-study.module.css";

const resumeUrl = "https://drive.google.com/file/d/1JzH0wXGffM_iplyQ8bkOOlfRHDjreQxp/view?usp=sharing";

const assets = {
  logo: "https://www.figma.com/api/mcp/asset/175f9abd-a3f7-4207-993b-f4a5e81fd2b6.svg",
  watermark: "https://www.figma.com/api/mcp/asset/50fe6981-985c-4557-af38-3806ef692e0c.svg",
  hero: "https://www.figma.com/api/mcp/asset/4e5ca8b8-94ae-45f1-8951-8aed9ce1d339.png",
  direction1: "https://www.figma.com/api/mcp/asset/8ee6baa5-888f-4975-af52-bcf915865b75.png",
  direction2: "https://www.figma.com/api/mcp/asset/a77b6778-89ec-4f22-9c35-e4d20130a44f.png",
  direction3: "https://www.figma.com/api/mcp/asset/18a41cd5-75b3-43fd-b01a-926432635a6d.png",
  card: "https://www.figma.com/api/mcp/asset/3c815ae3-d0b9-4865-a05a-35d9850fa79a.png",
  hang: "https://www.figma.com/api/mcp/asset/f3063a87-e540-402c-bafe-4cb165f5393a.png",
  vehicle: "https://www.figma.com/api/mcp/asset/86d9efe9-f5fd-41c3-8281-cc0f703553e4.png",
  next: "https://www.figma.com/api/mcp/asset/c3bde017-f2fb-48a7-a370-65e8ef742145.svg",
  behance: "https://www.figma.com/api/mcp/asset/05619c26-fd6e-429d-ad48-0faeb531dcfc.png",
  designs99: "https://www.figma.com/api/mcp/asset/bcdfd317-d41d-4e40-b4c6-2045a123ce13.png",
  designhill: "https://www.figma.com/api/mcp/asset/9faecfa4-8035-4f9e-9069-1c2541f32e93.png",
};

const services = ["Branding & Identity", "Marketing Design", "Campaign Design", "Social Media Design", "Print & Editorial", "Art Direction"];

export default function UnimotorsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}><img src={assets.logo} alt="John Ferrer logo" /></a>
        <nav className={styles.nav}><a href="/">Home</a><a className={styles.active} href="/work">Work</a><a href="/about">About</a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a><a className={styles.contactButton} href="/contact">Contact Me</a></nav>
      </header>

      <article className={styles.case}>
        <div className={styles.introRow}>
          <div className={styles.titleBlock}><h1>UNIMOTORS</h1><p>UNIMOTORS is a buy, sell, and trade automotive business that needed a clear and distinctive brand identity. With no defined visual direction, I developed three different brand character directions to help establish the brand’s personality and overall look.</p></div>
          <div />
        </div>
        <div className={styles.gallery}>
          <div className={styles.full}><img src={assets.hero} alt="UNIMOTORS garage identity" /></div>
          <div className={styles.full}><img src={assets.direction1} alt="UNIMOTORS brand direction one" /></div>
          <div className={styles.full}><img src={assets.direction2} alt="UNIMOTORS brand direction two" /></div>
          <div className={styles.full}><img src={assets.direction3} alt="UNIMOTORS brand direction three" /></div>
          <p className={styles.copyWide}>After the client selected their preferred direction, I explored three logo concepts that aligned with the chosen character, allowing us to refine the identity into a cohesive and recognizable brand.</p>
          <div className={styles.twoUp}><img src={assets.hang} alt="UNIMOTORS mirror hang" /><img src={assets.card} alt="UNIMOTORS business card" /></div>
          <div className={styles.full}><img src={assets.vehicle} alt="UNIMOTORS vehicle branding" /></div>
        </div>
      </article>

      <div className={styles.next}><small>Next Project</small><a href="/work/dope-marketing"><h2>DOPE MARKETING</h2><img src={assets.next} alt="" /></a></div>

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
