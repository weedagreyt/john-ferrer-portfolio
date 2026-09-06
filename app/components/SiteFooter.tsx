import styles from "./site-footer.module.css";
import { resumeUrl, services, siteAssets } from "../lib/portfolio";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.watermark} aria-hidden="true"><img src={siteAssets.footerLogo} alt="" /></div>
      <div className={styles.inner}>
        <div className={styles.ctaRow}>
          <div>
            <p className={styles.kicker}>Available for creative opportunities</p>
            <h2>Have something worth building?</h2>
          </div>
          <a className={styles.cta} href="/contact">Let’s work together <span>↗</span></a>
        </div>

        <div className={styles.divider} />

        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <a className={styles.wordmark} href="/" aria-label="John Ferrer Design home">
              <img src={siteAssets.footerLogo} alt="" />
              <span><em>John Ferrer</em><strong>Design</strong></span>
            </a>
            <p>Graphic designer focused on thoughtful brand systems, campaigns and visual experiences that connect.</p>
            <div className={styles.socials} aria-label="Social profiles">
              <a href="https://www.behance.net/weedagreyt" target="_blank" rel="noreferrer">Be</a>
              <a href="https://99designs.com/profiles/3055278" target="_blank" rel="noreferrer">99</a>
              <a href="https://www.designhill.com/member/weedagreyt" target="_blank" rel="noreferrer">Dh</a>
            </div>
          </div>

          <div className={styles.linkCol}>
            <p className={styles.label}>Navigate</p>
            <a href="/">Home</a>
            <a href="/work">Work</a>
            <a href="/about">About</a>
            <a href={resumeUrl} target="_blank" rel="noreferrer">Résumé ↗</a>
          </div>

          <div className={styles.servicesCol}>
            <p className={styles.label}>Capabilities</p>
            {services.map((service) => <span key={service}>{service}</span>)}
          </div>

          <div className={styles.contactCol}>
            <p className={styles.label}>Contact</p>
            <a href="mailto:weetotwee@gmail.com">weetotwee@gmail.com</a>
            <a href="tel:+16893400216">+1 689 340 0216</a>
            <span>Arlington, Virginia</span>
            <p className={styles.note}>Open to in-house, agency, freelance and collaborative creative work.</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2026 John Ferrer Design</span>
          <span>Designed with intent. Built to keep evolving.</span>
        </div>
      </div>
    </footer>
  );
}
