"use client";

import type { FormEvent } from "react";
import styles from "./contact.module.css";

const resumeUrl = "https://drive.google.com/file/d/1JzH0wXGffM_iplyQ8bkOOlfRHDjreQxp/view?usp=sharing";

const assets = {
  logo: "https://www.figma.com/api/mcp/asset/9bf4aa38-fda4-43ec-95ff-b50471d7ed6b.svg",
  watermark: "https://www.figma.com/api/mcp/asset/4dde471a-b413-4c78-95e3-cdb852303a90.svg",
  mail: "https://www.figma.com/api/mcp/asset/0fac5e46-a302-4771-870b-4587376af814.svg",
  phone: "https://www.figma.com/api/mcp/asset/a694da1b-bd4b-4be8-ad9e-34ebc766faf1.svg",
  pin: "https://www.figma.com/api/mcp/asset/aaaa66db-2ac2-4ad5-a3ed-6121adc2ec96.svg",
  arrow: "https://www.figma.com/api/mcp/asset/5133c010-9fa1-4086-811b-52d82330f76c.svg",
  lock: "https://www.figma.com/api/mcp/asset/7bf6b676-7f07-4db0-bcdf-be1f0c646b91.svg",
  behance: "https://www.figma.com/api/mcp/asset/8a25566f-43d2-4276-b347-4b76972da729.png",
  designs99: "https://www.figma.com/api/mcp/asset/1e2485cb-2065-4a37-8722-e1ed1c04b9d0.png",
  designhill: "https://www.figma.com/api/mcp/asset/bf6a1f80-c5d9-4e7c-b8dc-5c9f8e543fbc.png",
};

const services = ["Branding & Identity", "Marketing Design", "Campaign Design", "Social Media Design", "Print & Editorial", "Art Direction"];

export default function ContactPage() {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const subject = String(data.get("subject") || "Portfolio inquiry");
    const message = String(data.get("message") || "");
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:weetotwee@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.logo}><img src={assets.logo} alt="John Ferrer logo" /></a>
        <nav className={styles.nav}>
          <a href="/">Home</a><a href="/work">Work</a><a href="/about">About</a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a><a className={styles.contactButton} href="/contact">Contact Me</a>
        </nav>
      </header>

      <section className={styles.contactSection}>
        <div className={styles.info}>
          <p className={styles.eyebrow}>Contact Me</p>
          <h1>Let’s create<br /><span>something amazing.</span></h1>
          <p className={styles.intro}>Have a project in mind or want to collaborate? Fill out the form and I’ll get back to you as soon as possible.</p>
          <div className={styles.infoList}>
            <a href="mailto:weetotwee@gmail.com" className={styles.infoRow}><span><img src={assets.mail} alt="" /></span><div><b>Email</b><p>weetotwee@gmail.com</p></div></a>
            <a href="tel:+16893400216" className={styles.infoRow}><span><img src={assets.phone} alt="" /></span><div><b>Phone</b><p>+1 689 340 0216</p></div></a>
            <div className={styles.infoRow}><span><img src={assets.pin} alt="" /></span><div><b>Location</b><p>Arlington, VA</p></div></div>
          </div>
        </div>

        <form className={styles.form} onSubmit={submit}>
          <div className={styles.twoCols}>
            <label>Your Name<input name="name" placeholder="Enter your name" required /></label>
            <label>Your Email<input type="email" name="email" placeholder="Enter your email" required /></label>
          </div>
          <label>Subject<input name="subject" placeholder="What’s this about?" required /></label>
          <label>Message<textarea name="message" placeholder="Tell me more about your project..." required /></label>
          <button type="submit">Send Message <img src={assets.arrow} alt="" /></button>
          <p className={styles.secure}><img src={assets.lock} alt="" />Your information is secure and will never be shared.</p>
        </form>
      </section>

      <footer className={styles.footer}>
        <img className={styles.footerWatermark} src={assets.watermark} alt="" />
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <a className={styles.wordmark} href="/"><img src={assets.logo} alt="" /><span><em>John Ferrer</em><strong>Design</strong></span></a>
            <p>Graphic designer focused on creating visual solutions that inspire and deliver results.</p>
            <div className={styles.socials}><a href="https://www.behance.net/weedagreyt" target="_blank" rel="noreferrer"><img src={assets.behance} alt="Behance" /></a><a href="https://99designs.com/profiles/3055278" target="_blank" rel="noreferrer"><img src={assets.designs99} alt="99designs" /></a><a href="https://www.designhill.com/member/weedagreyt" target="_blank" rel="noreferrer"><img src={assets.designhill} alt="Designhill" /></a></div>
            <small>© 2026 John Ferrer Design. All rights reserved.</small>
          </div>
          <div className={styles.footerColumn}><b>Quick Links</b><a href="/">Home</a><a href="/work">Work</a><a href="/about">About</a><a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a></div>
          <div className={styles.footerColumn}><b>Services</b>{services.map((service) => <span key={service}>{service}</span>)}</div>
          <div className={styles.footerColumn}><b>Let’s Work Together</b><p>Have a project in mind?<br />Let’s create something amazing.</p><a className={styles.footerContact} href="mailto:weetotwee@gmail.com">Contact Me</a><a href="mailto:weetotwee@gmail.com">weetotwee@gmail.com</a><a href="tel:+16893400216">+1 689 340 0216</a><span>Arlington, VA</span></div>
        </div>
      </footer>
    </main>
  );
}
