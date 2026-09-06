"use client";

import IntroSequence from "./components/IntroSequence";
import SiteNav from "./components/SiteNav";
import SiteFooter from "./components/SiteFooter";
import { projectSummaries, services, siteAssets } from "./lib/portfolio";

const assets={portrait:"https://www.figma.com/api/mcp/asset/444382a5-690d-483b-a881-9ec4956476c0.png",kove:"https://www.figma.com/api/mcp/asset/a4f118aa-caf3-42cf-91e1-aae3af51fc05.png",unimotors:"https://www.figma.com/api/mcp/asset/c0d21f3a-2bd4-4f1b-994f-f494084d10d2.png",dope:"https://www.figma.com/api/mcp/asset/5d08bcf7-f229-4889-9d34-08401c51103e.png"};
const projects=[{...projectSummaries.kove,image:assets.kove,href:"/work/kove"},{...projectSummaries.unimotors,image:assets.unimotors,href:"/work/unimotors"},{...projectSummaries.dope,image:assets.dope,href:"/work/dope-marketing"}] as const;
function Arrow(){return <svg className="race-arrow" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M12 6l4 4-4 4"/></svg>}

export default function HomePage(){return <main className="race-home">
<IntroSequence/>
<section id="top" className="hero">
 <div className="hero-art" aria-hidden="true"/><SiteNav theme="light"/>
 <img className="hero-mark" src={siteAssets.logo} alt="" aria-hidden="true"/>
 <div className="hero-shell shell">
  <div className="hero-copy"><p className="hero-eyebrow">Hi, I’m John Ferrer</p><h1><span>Creative<br/>Thinker<span className="dot">.</span></span><span className="hero-red">Problem<br/>Solver<span className="dot">.</span></span><span>Visual<br/>Storyteller<span className="dot">.</span></span></h1><p className="hero-sub">I turn ideas into impactful visual experiences that connect, inspire, and leave a lasting impression.</p><a className="race-button" href="/contact">Let’s Talk <Arrow/></a><div className="hero-location"><i/>ARLINGTON, VA<br/>USA</div></div>
  <div className="hero-portrait"><div className="portrait-aura"/><img src={assets.portrait} alt="John Ferrer"/></div>
  <div className="hero-side-note">IDEAS<br/>INTERFACES<br/>IMPACT<i/></div><div className="hero-scroll">SCROLL<i/></div>
 </div>
</section>
<section id="work" className="work-section"><div className="shell"><div className="race-heading"><div><p>02</p><h2>Selected<br/><span>Work</span></h2></div><a href="/work">View all projects <Arrow/></a></div><div className="project-grid">{projects.map((p,i)=><a className="project-card" key={p.name} href={p.href}><b>0{i+1}</b><img src={p.image} alt={`${p.name} project`}/><div><h3>{p.name}</h3><p>{p.type}</p><Arrow/></div></a>)}</div></div></section>
<section className="approach-section"><div className="shell"><p className="section-no">03</p><div className="approach-grid"><div className="approach-photo"><img src={assets.portrait} alt="John Ferrer"/><blockquote>“Good design<br/>should feel inevitable.”<small>— John Ferrer</small></blockquote></div><div className="approach-copy"><p>My Approach</p><h2>Human-centered.<br/><span>Outcome-driven.</span></h2><p className="approach-intro">I combine strategy, visual craft, and practical problem-solving to create work that not only looks good, but makes a real difference.</p><div className="approach-steps">{services.slice(0,4).map((s,i)=><div key={s}><b>0{i+1}</b><strong>{s}</strong></div>)}</div></div></div></div></section>
<section className="build-section"><div className="build-art"/><div className="shell build-inner"><p className="section-no">04</p><h2>Build what’s <span>next.</span></h2><p>Have a project in mind? Let’s create something great together.</p><a className="race-button" href="/contact">Let’s Talk <Arrow/></a><div className="build-note">IDEAS<br/>TO A BRIGHTER<br/>TOMORROW<i/></div></div></section>
<SiteFooter/>
</main>}
