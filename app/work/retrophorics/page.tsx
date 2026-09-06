import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import CaseStudyStory from "../../components/CaseStudyStory";
import styles from "../case-study.module.css";
import local from "./retrophorics.module.css";

const assets = {
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
};

const characterTiles = [assets.sexy, assets.flirty, assets.business, assets.rockabilly, assets.hippy, assets.posh];

function VideoPlaceholder({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className={local.videoStill}>
      <img src={src} alt={alt} />
      <span className={local.play} aria-hidden="true">▶</span>
      <div className={local.videoLabel}><b>{label}</b><small>Video will replace this preview</small></div>
    </div>
  );
}

export default function RetrophoricsPage() {
  return (
    <main className={styles.page}>
      <SiteNav theme="dark" />

      <article className={styles.case}>
        <Reveal className={local.intro}>
          <div className={styles.titleBlock}>
            <h1>RETROPHORICS</h1>
            <p>Retrophorics is a fashion brand focused on retro-style tops for women ages 25–35. I built the brand identity, visual direction and marketing language around nostalgia, but kept the execution energetic enough to feel like a contemporary fashion brand.</p>
            <img className={local.brandLogo} src={assets.brandLogo} alt="Retrophorics logo" />
          </div>
          <VideoPlaceholder src={assets.hero} alt="Retrophorics brand presentation" label="Brand Film" />
        </Reveal>

        <CaseStudyStory
          challenge="Create a distinctive fashion identity that feels genuinely retro without looking like a copy of one specific era or becoming visually dated."
          role="Brand identity, art direction, marketing design, campaign design and social content."
          thinking="Mix recognizable retro cues with a more modern editorial rhythm. Bold type, collage, color and character-based styling gave the system range while keeping a consistent attitude."
          execution="Developed the logo, visual references, character directions, campaign artwork, social posts and motion concepts that could support both brand storytelling and product marketing."
          outcome="A flexible fashion identity with a distinctive retro voice that can stretch across static campaigns, social content and motion."
        />

        <div className={local.gallery}>
          <Reveal><div className={local.three}><img src={assets.kfc} alt="Retrophorics KFC-inspired style board" /><img src={assets.hershey} alt="Retrophorics Hershey-inspired style board" /><img src={assets.johnnie} alt="Retrophorics Johnnie Walker-inspired style board" /></div></Reveal>
          <Reveal><div className={local.characters}>{characterTiles.map((src, i) => <img src={src} alt={`Retrophorics brand character ${i + 1}`} key={src} />)}</div></Reveal>
          <Reveal><VideoPlaceholder src={assets.motion} alt="Retrophorics motion design preview" label="Motion Exploration" /></Reveal>
          <Reveal><div className={local.socialGrid}><img src={assets.denim} alt="Retrophorics denim social post" /><img src={assets.coco} alt="Retrophorics Coco Chanel social post" /><img src={assets.priority} alt="Retrophorics make yourself a priority social post" /><img src={assets.express} alt="Retrophorics dress to express social post" /></div></Reveal>
        </div>
      </article>

      <Reveal className={styles.next}><small>Next Project</small><a href="/work/art-exploration"><h2>ART &amp; EXPLORATION</h2><img src={assets.next} alt="" /></a></Reveal>
      <SiteFooter />
    </main>
  );
}
