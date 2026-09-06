"use client";

import type { FormEvent } from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import Reveal from "../components/Reveal";
import { ArrowIcon } from "../components/UiIcons";
import styles from "./contact.module.css";

const assets = {
  mail: "https://www.figma.com/api/mcp/asset/0fac5e46-a302-4771-870b-4587376af814.svg",
  phone: "https://www.figma.com/api/mcp/asset/a694da1b-bd4b-4be8-ad9e-34ebc766faf1.svg",
  pin: "https://www.figma.com/api/mcp/asset/aaaa66db-2ac2-4ad5-a3ed-6121adc2ec96.svg",
  lock: "https://www.figma.com/api/mcp/asset/7bf6b676-7f07-4db0-bcdf-be1f0c646b91.svg",
};

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
      <div className={styles.darkNav}><SiteNav theme="dark" /></div>

      <section className={styles.contactSection}>
        <Reveal className={styles.info}>
          <p className={styles.eyebrow}>Contact Me</p>
          <h1>Let’s create<br /><span>something amazing.</span></h1>
          <p className={styles.intro}>Have a project in mind or want to collaborate? Fill out the form and I’ll get back to you as soon as possible.</p>
          <div className={styles.infoList}>
            <a href="mailto:weetotwee@gmail.com" className={styles.infoRow}><span><img src={assets.mail} alt="" /></span><div><b>Email</b><p>weetotwee@gmail.com</p></div></a>
            <a href="tel:+16893400216" className={styles.infoRow}><span><img src={assets.phone} alt="" /></span><div><b>Phone</b><p>+1 689 340 0216</p></div></a>
            <div className={styles.infoRow}><span><img src={assets.pin} alt="" /></span><div><b>Location</b><p>Arlington, VA</p></div></div>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <form className={styles.form} onSubmit={submit}>
            <div className={styles.twoCols}>
              <label>Your Name<input name="name" placeholder="Enter your name" required /></label>
              <label>Your Email<input type="email" name="email" placeholder="Enter your email" required /></label>
            </div>
            <label>Subject<input name="subject" placeholder="What’s this about?" required /></label>
            <label>Message<textarea name="message" placeholder="Tell me more about your project..." required /></label>
            <button type="submit">Send Message <ArrowIcon size={17} /></button>
            <p className={styles.secure}><img src={assets.lock} alt="" />Your information is secure and will never be shared.</p>
          </form>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
