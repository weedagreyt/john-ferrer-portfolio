const assets = {
  logo: "https://www.figma.com/api/mcp/asset/494b2561-abaa-48b0-9fe6-a5bccee62dff.svg",
  portrait: "https://www.figma.com/api/mcp/asset/f265559d-e1a5-4ee2-93c5-d006ae0d1c23.png",
  kove: "https://www.figma.com/api/mcp/asset/c94f7e40-700d-49a2-a6ed-27f2eb08eb00.png",
  unimotors: "https://www.figma.com/api/mcp/asset/02c62170-f185-424b-814f-a81af8065d67.png",
  dope: "https://www.figma.com/api/mcp/asset/3b56a94b-7da8-41e4-afd1-c2a14c83a069.png",
};

const experience = [
  ["Print Production / Designer", "Bothends Computer Solutions", "Nov 2015 – Jul 2019"],
  ["Founder", "SciHigh Clothing", "Feb 2016"],
  ["Creative Director", "West Shadows Production", "Aug 2016 – Sep 2019"],
  ["Graphic Design Department Head", "Project Pentagon", "Feb 2019 – Nov 2019"],
  ["Freelance Graphic Designer", "Project Base Work", "Nov 2019 – Dec 2020"],
  ["Senior Graphic Designer", "Dope Marketing", "Jan 2021 – Nov 2025"],
];

const projects = [
  { name: "KOVE", meta: "Brand Identity · Art Direction · Campaign", image: assets.kove },
  { name: "UNIMOTORS", meta: "Brand Identity · Marketing Design", image: assets.unimotors },
  { name: "DOPE", meta: "Marketing · Print · Campaign Design", image: assets.dope },
];

export default function HomePage() {
  return (
    <main>
      <header className="site-header shell">
        <a href="#top" className="brand" aria-label="John Ferrer home">
          <img src={assets.logo} alt="John Ferrer logo" />
        </a>
        <nav>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="https://drive.google.com/file/d/1JzH0wXGffM_iplyQ8bkOOlfRHDjreQxp/view?usp=sharing" target="_blank">Résumé</a>
          <a className="button small" href="mailto:weetotwee@gmail.com">Contact Me</a>
        </nav>
      </header>

      <section id="top" className="hero shell">
        <div className="hero-copy reveal">
          <p className="eyebrow">Hi, I’m John Ferrer</p>
          <h1>
            Creative Thinker<span>.</span><br />
            Problem Solver<span>.</span><br />
            Visual Storyteller<span>.</span>
          </h1>
          <p className="hero-sub">
            Senior Graphic Designer focused on creating thoughtful brands, campaigns, and visual experiences that connect with people.
          </p>
          <div className="hero-actions">
            <a className="button" href="mailto:weetotwee@gmail.com">Let’s Talk →</a>
            <a className="text-link" href="#work">See selected work ↓</a>
          </div>
        </div>
        <div className="portrait-wrap reveal delay-1">
          <div className="portrait-card">
            <img src={assets.portrait} alt="John Ferrer" />
          </div>
          <div className="portrait-caption">
            <span>Branding</span><span>Campaigns</span><span>Art Direction</span>
          </div>
        </div>
      </section>

      <section id="work" className="section dark">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h2>Design that speaks.<br />Stories that connect.</h2>
            </div>
            <a className="button outline" href="#work-grid">View All Projects →</a>
          </div>
          <div id="work-grid" className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <img src={project.image} alt={`${project.name} project`} />
                <div className="project-overlay">
                  <p>{project.meta}</p>
                  <h3>{project.name}</h3>
                  <span>View Case Study →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section capabilities shell">
        <div className="section-head light-head">
          <div>
            <p className="eyebrow">Capabilities</p>
            <h2>Built around ideas,<br />not just software.</h2>
          </div>
          <p className="section-intro">Brand identity, campaign design, marketing systems, print and digital production, social content, and art direction.</p>
        </div>
        <div className="capability-grid">
          {["Branding & Identity", "Marketing Design", "Campaign Design", "Social Media Design", "Print & Editorial", "Art Direction"].map((item, i) => (
            <div className="capability" key={item}><span>0{i + 1}</span><strong>{item}</strong></div>
          ))}
        </div>
      </section>

      <section id="experience" className="section dark experience-section">
        <div className="shell">
          <div className="section-head">
            <div>
              <p className="eyebrow">Experience</p>
              <h2>My Journey</h2>
            </div>
            <a className="button outline" href="https://drive.google.com/file/d/1JzH0wXGffM_iplyQ8bkOOlfRHDjreQxp/view?usp=sharing" target="_blank">Download Résumé →</a>
          </div>
          <div className="timeline">
            {experience.map(([role, company, dates], index) => (
              <article className="timeline-item" key={role}>
                <span className="timeline-index">0{index + 1}</span>
                <h3>{role}</h3>
                <p>{company}</p>
                <small>{dates}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell testimonials">
        <div className="section-head light-head">
          <div><p className="eyebrow">Kind Words</p><h2>What they say.</h2></div>
        </div>
        <div className="quote-grid">
          <blockquote>
            <span className="quote-mark">“</span>
            <p>John is a talented designer who brings ideas to life with creativity and precision. He understands the brief quickly and delivers beyond expectations.</p>
            <footer>Grace Hare <small>DOPE Design Manager</small></footer>
          </blockquote>
          <blockquote>
            <span className="quote-mark">“</span>
            <p>Professional, reliable, and easy to work with. The designs were modern, clean, and exactly what our brand needed.</p>
            <footer>April Justo <small>KOVE Owner</small></footer>
          </blockquote>
        </div>
      </section>

      <footer className="footer dark">
        <div className="shell footer-grid">
          <div>
            <img className="footer-logo" src={assets.logo} alt="John Ferrer logo" />
            <p>Graphic designer focused on creating thoughtful visual solutions that connect and deliver.</p>
          </div>
          <div><p className="footer-label">Quick Links</p><a href="#top">Home</a><a href="#work">Work</a><a href="#experience">Experience</a></div>
          <div><p className="footer-label">Services</p><span>Branding & Identity</span><span>Marketing Design</span><span>Campaign Design</span><span>Art Direction</span></div>
          <div><p className="footer-label">Let’s Work Together</p><p>Have a project or opportunity in mind?</p><a className="button" href="mailto:weetotwee@gmail.com">Contact Me</a><a href="mailto:weetotwee@gmail.com">weetotwee@gmail.com</a><a href="tel:+16893400216">+1 689 340 0216</a><span>Arlington, VA</span></div>
        </div>
        <div className="shell copyright">© 2026 John Ferrer Design. All rights reserved.</div>
      </footer>
    </main>
  );
}
