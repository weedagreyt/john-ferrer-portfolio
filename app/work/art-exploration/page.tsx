import styles from "../case-study.module.css";
import local from "./art.module.css";

const resumeUrl = "https://drive.google.com/file/d/1JzH0wXGffM_iplyQ8bkOOlfRHDjreQxp/view?usp=sharing";

const assets = {
  logo: "https://www.figma.com/api/mcp/asset/6343ef78-f6c4-4b4e-90d0-219585ec4934.svg",
  watermark: "https://www.figma.com/api/mcp/asset/1022008b-4acc-4dd2-9a97-50ca7572aa44.svg",
  pgLogo: "https://www.figma.com/api/mcp/asset/10c3177c-cf3d-4909-8da9-85c5ec5ab883.png",
  donut: "https://www.figma.com/api/mcp/asset/e57047c5-8f6f-41f4-ad9b-802ae25c41f8.png",
  poster1: "https://www.figma.com/api/mcp/asset/086b8519-2b2b-4984-b06d-1b4ed598162f.png",
  rainbow: "https://www.figma.com/api/mcp/asset/967849af-18b1-484c-b048-13d0aa1be737.png",
  unicorn2: "https://www.figma.com/api/mcp/asset/f81f69c7-caaa-4548-912e-deec98252487.png",
  unicorn1: "https://www.figma.com/api/mcp/asset/8684d0a0-9d94-4c3c-99b6-9a17eda6b2ce.png",
  portrait: "https://www.figma.com/api/mcp/asset/fcdd9bfc-c573-4114-9225-b606076e8996.png",
  poster2: "https://www.figma.com/api/mcp/asset/1cb1eda5-a55c-4313-85d2-a98a5c50864a.png",
  poster3: "https://www.figma.com/api/mcp/asset/7887b5c0-80a0-48c8-b29b-b7be5965b8b3.png",
  poster4: "https://www.figma.com/api/mcp/asset/7289e13f-a6de-4c97-9c3b-ba3e781d31c5.png",
  poster5: "https://www.figma.com/api/mcp/asset/e219da30-9376-4971-80c3-13ab9ae18e97.png",
  poster6: "https://www.figma.com/api/mcp/asset/60d50d35-c98f-4da1-b58f-553722868526.png",
  poster7: "https://www.figma.com/api/mcp/asset/56e5c623-cda4-4dcb-8928-7bdc0cdbcdea.png",
  poster8: "https://www.figma.com/api/mcp/asset/a4dfe1e0-3613-4afe-aafb-2a9a10e4115f.png",
  next: "https://www.figma.com/api/mcp/asset/354e5b17-f24b-409e-88ef-a4d923dbff96.svg",
  behance: "https://www.figma.com/api/mcp/asset/88248f7d-bfbf-4893-8148-112a74c7616d.png",
  designs99: "https://www.figma.com/api/mcp/asset/2102f8c0-850e-429b-b7a4-e225726deafe.png",
  designhill: "https://www.figma.com/api/mcp/asset/c6c3f2f8-3abc-426a-ab88-99d3d655dae6.png",
};

const services = ["Branding & Identity", "Marketing Design", "Campaign Design", "Social Media Design", "Print & Editorial", "Art Direction"];

export default function ArtExplorationPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}><img src={assets.logo} alt="John Ferrer logo" /></a>
        <nav className={styles.nav}><a href="/">Home</a><a className={styles.active} href="/work">Work</a><a href="/about">About</a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a><a className={styles.contactButton} href="/contact">Contact Me</a></nav>
      </header>

      <article className={styles.case}>
        <div className={local.intro}>
          <div className={styles.titleBlock}><h1>ART &amp; EXPLORATION</h1><p>A collection of personal work created to explore new ideas, techniques, and creative tools. From illustration and vector art to 3D, animation, and motion, these projects reflect the things I continue to learn and experiment with throughout my career.</p></div>
          <img src={assets.pgLogo} alt="Personal project artwork" />
        </div>

        <div className={local.masonry}>
          <div className={local.leftCol}>
            <img src={assets.donut} alt="3D donut artwork" />
            <img src={assets.unicorn2} alt="3D unicorn artwork" />
            <img src={assets.rainbow} alt="Rainbow illustration" />
            <img src={assets.poster6} alt="Illustrated portrait artwork" />
          </div>
          <div className={local.rightArea}>
            <div className={local.topPair}><img src={assets.portrait} alt="Illustration artwork" /><img src={assets.unicorn1} alt="Unicorn character artwork" /></div>
            <div className={local.midPair}><img src={assets.poster1} alt="Poster illustration" /><img src={assets.poster2} alt="Poster illustration" /></div>
            <div className={local.lower}><img className={local.tall} src={assets.poster3} alt="Illustrated poster" /><div className={local.stack}><img src={assets.poster4} alt="Illustrated artwork" /><img src={assets.poster5} alt="Illustrated artwork" /></div></div>
            <div className={local.bottomPair}><img src={assets.poster7} alt="Illustrated poster" /><img src={assets.poster8} alt="Illustrated poster" /></div>
          </div>
        </div>
      </article>

      <div className={styles.next}><small>Next Project</small><a href="/work/kove"><h2>KOVE</h2><img src={assets.next} alt="" /></a></div>

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
