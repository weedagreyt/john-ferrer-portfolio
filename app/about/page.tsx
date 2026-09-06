import styles from "./about.module.css";

const resumeUrl = "https://drive.google.com/file/d/1JzH0wXGffM_iplyQ8bkOOlfRHDjreQxp/view?usp=sharing";

const assets = {
  portrait: "https://www.figma.com/api/mcp/asset/91c4b357-dde5-4390-b7fd-1847cb4d3ceb.png",
  quoteLogo: "https://www.figma.com/api/mcp/asset/1019fb12-df56-4bec-bc8b-c7999866735f.svg",
  headerLogo: "https://www.figma.com/api/mcp/asset/4394c108-459f-422c-a1d7-152d22b81038.svg",
  footerWatermark: "https://www.figma.com/api/mcp/asset/d2ac26f6-7975-4e65-bd5a-de661aa4d6db.svg",
  footerLogo: "https://www.figma.com/api/mcp/asset/4093c256-733a-4edd-82e0-6e696a8f4bdf.svg",
  vector1: "https://www.figma.com/api/mcp/asset/b3a05cd3-7b6c-4188-be15-2523004b24ba.svg",
  vector2: "https://www.figma.com/api/mcp/asset/b6fd9717-6ecd-41f7-9e81-c46375678d9e.svg",
  vector3: "https://www.figma.com/api/mcp/asset/52cb59c2-fd89-4727-a27b-14540ebf62a3.svg",
  behance: "https://www.figma.com/api/mcp/asset/dd0273c0-a553-4f44-ac8a-ce74c5d59bc0.png",
  designs99: "https://www.figma.com/api/mcp/asset/b51e07ab-c7c3-4cd7-be7f-fda8e33309e2.png",
  designhill: "https://www.figma.com/api/mcp/asset/7163a6f6-f024-4574-a6f1-c53763ebfe75.png",
};

const services = ["Branding & Identity", "Marketing Design", "Campaign Design", "Social Media Design", "Print & Editorial", "Art Direction"];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}><img src={assets.headerLogo} alt="John Ferrer logo" /></a>
        <nav className={styles.nav}>
          <a href="/">Home</a><a href="/work">Work</a><a className={styles.active} href="/about">About</a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a><a className={styles.contactButton} href="/contact">Contact Me</a>
        </nav>
      </header>

      <section className={styles.about}>
        <div className={styles.brandLines} aria-hidden="true">
          <img className={styles.line1} src={assets.vector1} alt="" /><img className={styles.line2} src={assets.vector2} alt="" /><img className={styles.line3} src={assets.vector3} alt="" />
        </div>
        <div className={styles.content}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>About Me</p>
            <h1>More than just pixels.</h1>
            <p className={styles.intro}>I’m a graphic designer with a passion for storytelling through design. I believe great design is not just about looking good — it’s about solving problems and making a real impact.</p>
            <ul>
              <li>Detail-oriented</li>
              <li>Deadline-driven</li>
              <li>Always Learning</li>
            </ul>
            <a className={styles.learnButton} href={resumeUrl} target="_blank" rel="noreferrer">Learn More About Me →</a>
          </div>

          <div className={styles.visual}>
            <img className={styles.portrait} src={assets.portrait} alt="John Ferrer" />
            <div className={styles.quoteCard}>
              <span>“</span>
              <p>Good design isn’t just how it looks. It’s how it works.</p>
              <img src={assets.quoteLogo} alt="" />
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <img className={styles.footerWatermark} src={assets.footerWatermark} alt="" />
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <a className={styles.wordmark} href="/"><img src={assets.footerLogo} alt="" /><span><em>John Ferrer</em><strong>Design</strong></span></a>
            <p>Graphic designer focused on creating visual solutions that inspire and deliver results.</p>
            <div className={styles.socials}><a href="https://www.behance.net/weedagreyt" target="_blank" rel="noreferrer"><img src={assets.behance} alt="Behance" /></a><a href="https://99designs.com/profiles/3055278" target="_blank" rel="noreferrer"><img src={assets.designs99} alt="99designs" /></a><a href="https://www.designhill.com/member/weedagreyt" target="_blank" rel="noreferrer"><img src={assets.designhill} alt="Designhill" /></a></div>
            <small>© 2026 John Ferrer Design. All rights reserved.</small>
          </div>
          <div className={styles.footerColumn}><b>Quick Links</b><a href="/">Home</a><a href="/work">Work</a><a href="/about">About</a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a></div>
          <div className={styles.footerColumn}><b>Services</b>{services.map((service) => <span key={service}>{service}</span>)}</div>
          <div className={styles.footerColumn}><b>Let’s Work Together</b><p>Have a project in mind?<br />Let’s create something amazing.</p><a className={styles.footerContact} href="/contact">Contact Me</a><a href="mailto:weetotwee@gmail.com">weetotwee@gmail.com</a><a href="tel:+16893400216">+1 689 340 0216</a><span>Arlington, VA</span></div>
        </div>
      </footer>
    </main>
  );
}
