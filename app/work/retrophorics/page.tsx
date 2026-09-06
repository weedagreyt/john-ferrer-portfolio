import styles from "../case-study.module.css";
import local from "./retrophorics.module.css";

const resumeUrl = "https://drive.google.com/file/d/1JzH0wXGffM_iplyQ8bkOOlfRHDjreQxp/view?usp=sharing";

const assets = {
  logo: "https://www.figma.com/api/mcp/asset/e6f17525-d6f7-4bce-a20b-99b57a6f19e0.svg",
  watermark: "https://www.figma.com/api/mcp/asset/dedca485-a822-44de-a7d3-6cbe32910513.svg",
  hero: "https://www.figma.com/api/mcp/asset/8cc442b5-09f9-44b7-9fae-d238e36f2235.png",
  brandLogo: "https://www.figma.com/api/mcp/asset/33791493-6c2e-4c5f-b937-babf95001946.png",
  kfc: "https://www.figma.com/api/mcp/asset/b237ee62-a79b-4c81-9537-fdfd8835be66.png",
  hershey: "https://www.figma.com/api/mcp/asset/4e0ec8a5-d782-4dd5-be3a-4618939833d8.png",
  johnnie: "https://www.figma.com/api/mcp/asset/cad2f177-8527-4c41-af6a-dd675e202fc6.png",
  sexy: "https://www.figma.com/api/mcp/asset/283eeef4-84ab-48e0-acee-530efd46eb05.png",
  flirty: "https://www.figma.com/api/mcp/asset/655f8c4a-7eba-4119-886a-69963112979f.png",
  business: "https://www.figma.com/api/mcp/asset/0e34562f-249f-42f4-891d-526a534b911f.png",
  rockabilly: "https://www.figma.com/api/mcp/asset/2976f7b8-122c-40f4-a445-b59550db13b8.png",
  hippy: "https://www.figma.com/api/mcp/asset/5c3909df-527b-4301-8022-00d5e4efa58c.png",
  posh: "https://www.figma.com/api/mcp/asset/b8104fd3-52e0-4217-8fa3-acfd1cc745fa.png",
  motion: "https://www.figma.com/api/mcp/asset/85eeb068-f3a7-4778-bf09-28f17f49fd34.png",
  priority: "https://www.figma.com/api/mcp/asset/3b3eee47-7ef0-4ea0-b40d-87e418ccf645.png",
  coco: "https://www.figma.com/api/mcp/asset/6613d150-dbb0-4df4-b1ca-e6d93192f31d.png",
  denim: "https://www.figma.com/api/mcp/asset/2866d887-b523-4fa2-b562-dfe91adf06c7.png",
  express: "https://www.figma.com/api/mcp/asset/97b20cc9-aa3a-4f19-98e5-63579a872c90.png",
  next: "https://www.figma.com/api/mcp/asset/c7db8172-413d-4e5a-8a9a-695da195534d.svg",
  behance: "https://www.figma.com/api/mcp/asset/009ea467-ad7b-48d4-9183-a6198ca4f818.png",
  designs99: "https://www.figma.com/api/mcp/asset/4ea3b79b-4521-4f07-b005-85aeed2adf2f.png",
  designhill: "https://www.figma.com/api/mcp/asset/feb2ace7-2c63-4f96-8bac-710ec74b4be9.png",
};

const services = ["Branding & Identity", "Marketing Design", "Campaign Design", "Social Media Design", "Print & Editorial", "Art Direction"];
const characterTiles = [assets.sexy, assets.flirty, assets.business, assets.rockabilly, assets.hippy, assets.posh];

function PlayImage({ src, alt }: { src: string; alt: string }) {
  return <div className={local.videoStill}><img src={src} alt={alt} /><span aria-hidden="true">▶</span></div>;
}

export default function RetrophoricsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}><img src={assets.logo} alt="John Ferrer logo" /></a>
        <nav className={styles.nav}><a href="/">Home</a><a className={styles.active} href="/work">Work</a><a href="/about">About</a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a><a className={styles.contactButton} href="/contact">Contact Me</a></nav>
      </header>

      <article className={styles.case}>
        <div className={local.intro}>
          <div className={styles.titleBlock}>
            <h1>RETROPHORICS</h1>
            <p>Retrophorics is a fashion brand focused on retro-style tops for women ages 25–35. I developed the brand identity from the ground up, including the logo, visual direction, marketing materials, and social media content, creating a consistent look across the brand and its marketing.</p>
            <img className={local.brandLogo} src={assets.brandLogo} alt="Retrophorics logo" />
          </div>
          <PlayImage src={assets.hero} alt="Retrophorics brand presentation" />
        </div>

        <div className={local.gallery}>
          <div className={local.three}><img src={assets.kfc} alt="Retrophorics KFC-inspired style board" /><img src={assets.hershey} alt="Retrophorics Hershey-inspired style board" /><img src={assets.johnnie} alt="Retrophorics Johnnie Walker-inspired style board" /></div>
          <div className={local.characters}>{characterTiles.map((src, i) => <img src={src} alt={`Retrophorics brand character ${i + 1}`} key={src} />)}</div>
          <PlayImage src={assets.motion} alt="Retrophorics motion design preview" />
          <div className={local.socialGrid}><img src={assets.denim} alt="Retrophorics denim social post" /><img src={assets.coco} alt="Retrophorics Coco Chanel social post" /><img src={assets.priority} alt="Retrophorics make yourself a priority social post" /><img src={assets.express} alt="Retrophorics dress to express social post" /></div>
        </div>
      </article>

      <div className={styles.next}><small>Next Project</small><a href="/work/art-exploration"><h2>ART &amp; EXPLORATION</h2><img src={assets.next} alt="" /></a></div>

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
