import styles from "./work.module.css";

const resumeUrl = "https://drive.google.com/file/d/1JzH0wXGffM_iplyQ8bkOOlfRHDjreQxp/view?usp=sharing";

const assets = {
  logo: "https://www.figma.com/api/mcp/asset/3fde207f-63d5-424a-8b11-ab37345fa647.svg",
  watermark: "https://www.figma.com/api/mcp/asset/0c9a145c-d183-4ebd-947b-6f8b8e3251ca.svg",
  kove: "https://www.figma.com/api/mcp/asset/a4f118aa-caf3-42cf-91e1-aae3af51fc05.png",
  unimotors: "https://www.figma.com/api/mcp/asset/c0d21f3a-2bd4-4f1b-994f-f494084d10d2.png",
  dope: "https://www.figma.com/api/mcp/asset/5d08bcf7-f229-4889-9d34-08401c51103e.png",
  yensanities: "https://www.figma.com/api/mcp/asset/6e2edb3a-539b-4bd7-9e3c-5f7fd984d6b5.png",
  retrophorics: "https://www.figma.com/api/mcp/asset/987640d0-65bc-44ca-b925-6e8c63fdbd7f.png",
  art: "https://www.figma.com/api/mcp/asset/6cb4bb8e-5d0d-4291-b03f-9c168d84f928.png",
  behance: "https://www.figma.com/api/mcp/asset/a4ed6fb0-0dec-4b96-b37e-bb90bb9e7cd9.png",
  designs99: "https://www.figma.com/api/mcp/asset/8accbdba-23c1-4bcf-b71d-f60fca95bfb8.png",
  designhill: "https://www.figma.com/api/mcp/asset/c5c3be6d-5609-4226-99b3-d7a489781f26.png",
};

const projects = [
  ["KOVE", assets.kove, "/work/kove"],
  ["UNIMOTORS", assets.unimotors, "/work/unimotors"],
  ["DOPE", assets.dope, "/work/dope-marketing"],
  ["YENSANITIES", assets.yensanities, "/work/yensanities"],
  ["RETROPHORICS", assets.retrophorics, "/work/retrophorics"],
  ["ART & EXPLORATION", assets.art, "/work/art-exploration"],
] as const;

const services = ["Branding & Identity", "Marketing Design", "Campaign Design", "Social Media Design", "Print & Editorial", "Art Direction"];

export default function WorkPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.logo} aria-label="John Ferrer home"><img src={assets.logo} alt="John Ferrer logo" /></a>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="/">Home</a>
          <a className={styles.active} href="/work">Work</a>
          <a href="/about">About</a>
          <a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a>
          <a className={styles.contactButton} href="/contact">Contact Me</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <p>Selected Work</p>
        <h1>Design that speaks.<br />Stories that connect.</h1>
      </section>

      <section className={styles.grid} aria-label="Portfolio projects">
        {projects.map(([name, image, href]) => (
          <a href={href} className={styles.card} key={name} aria-label={`Open ${name} project`}>
            <img src={image} alt={`${name} project`} />
            <span>{name}</span>
          </a>
        ))}
      </section>

      <footer className={styles.footer}>
        <img className={styles.footerWatermark} src={assets.watermark} alt="" aria-hidden="true" />
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <a className={styles.wordmark} href="/">
              <img src={assets.logo} alt="" />
              <span><em>John Ferrer</em><strong>Design</strong></span>
            </a>
            <p>Graphic designer focused on creating visual solutions that inspire and deliver results.</p>
            <div className={styles.socials}>
              <a href="https://www.behance.net/weedagreyt" target="_blank" rel="noreferrer"><img src={assets.behance} alt="Behance" /></a>
              <a href="https://99designs.com/profiles/3055278" target="_blank" rel="noreferrer"><img src={assets.designs99} alt="99designs" /></a>
              <a href="https://www.designhill.com/member/weedagreyt" target="_blank" rel="noreferrer"><img src={assets.designhill} alt="Designhill" /></a>
            </div>
            <small>© 2026 John Ferrer Design. All rights reserved.</small>
          </div>

          <div className={styles.footerColumn}>
            <b>Quick Links</b>
            <a href="/">Home</a><a href="/work">Work</a><a href="/about">About</a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a>
          </div>
          <div className={styles.footerColumn}>
            <b>Services</b>
            {services.map((service) => <span key={service}>{service}</span>)}
          </div>
          <div className={styles.footerColumn}>
            <b>Let’s Work Together</b>
            <p>Have a project in mind?<br />Let’s create something amazing.</p>
            <a className={styles.footerContact} href="/contact">Contact Me</a>
            <a href="mailto:weetotwee@gmail.com">weetotwee@gmail.com</a>
            <a href="tel:+16893400216">+1 689 340 0216</a>
            <span>Arlington, VA</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
