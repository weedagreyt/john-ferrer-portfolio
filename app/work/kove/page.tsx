import styles from "../case-study.module.css";

const resumeUrl = "https://drive.google.com/file/d/1JzH0wXGffM_iplyQ8bkOOlfRHDjreQxp/view?usp=sharing";

const assets = {
  logo: "https://www.figma.com/api/mcp/asset/3203c1f4-a50d-4099-ac21-438929241f23.svg",
  watermark: "https://www.figma.com/api/mcp/asset/90e7bc9f-710c-4b28-8bca-b2b5bcb4a56c.svg",
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
  behance: "https://www.figma.com/api/mcp/asset/efa5b87a-54c7-46e1-9a54-76aa881441ff.png",
  designs99: "https://www.figma.com/api/mcp/asset/5f6c3f5e-73a6-41fb-9a51-d66e733feed2.png",
  designhill: "https://www.figma.com/api/mcp/asset/6298dbc7-85b5-4b6c-9886-ac4fe33e8947.png",
};

const services = ["Branding & Identity", "Marketing Design", "Campaign Design", "Social Media Design", "Print & Editorial", "Art Direction"];

export default function KovePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}><img src={assets.logo} alt="John Ferrer logo" /></a>
        <nav className={styles.nav}><a href="/">Home</a><a className={styles.active} href="/work">Work</a><a href="/about">About</a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a><a className={styles.contactButton} href="/contact">Contact Me</a></nav>
      </header>

      <article className={styles.case}>
        <div className={styles.introRow}>
          <div className={styles.titleBlock}>
            <h1>KOVE KAFE &amp; KARWASH</h1>
            <p>KOVE KAFE + KARWASH approached me to develop a brand identity for their café and car wash business, connected to the owner’s construction company. The goal was to create a bold, industrial, yet premium identity using a black and gold visual direction.</p>
          </div>
          <div className={styles.brandLogo}><img src={assets.brandLogo} alt="KOVE Kafe & Karwash logo" /></div>
        </div>

        <div className={styles.gallery}>
          <div className={styles.full}><img src={assets.hero} alt="KOVE Kafe and Karwash exterior at night" /></div>
          <div className={styles.splitTextMedia}>
            <div>
              <p className={styles.text}>I explored different creative directions through mood boards before developing the selected concept into the final brand identity.</p>
              <img src={assets.moodPhoto} alt="KOVE brand exploration" />
            </div>
            <img src={assets.moodboards} alt="KOVE mood board options" />
          </div>
          <div className={styles.twoUp}><img src={assets.product} alt="KOVE branded product" /><img src={assets.exterior} alt="KOVE cafe exterior" /></div>
          <p className={styles.copyWide}>I also extended the branding into campaign materials for their EDM event, adapting the visual identity into a more energetic and promotional style while keeping the brand consistent.</p>
          <div className={styles.eventGrid}>
            <div className={styles.eventLeft}><img src={assets.eventPhoto} alt="KOVE EDM event" /></div>
            <div className={styles.eventRight}><img src={assets.poster} alt="KOVE EDM event poster" /></div>
          </div>
          <div className={styles.eventBottom}><img src={assets.countdown} alt="KOVE event countdown artwork" /><img src={assets.photobooth} alt="KOVE photobooth artwork" /><img src={assets.eventDetail} alt="KOVE event detail" /></div>
        </div>
      </article>

      <div className={styles.next}>
        <small>Next Project</small>
        <a href="/work/unimotors"><h2>UNIMOTORS</h2><img src={assets.next} alt="" /></a>
      </div>

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
