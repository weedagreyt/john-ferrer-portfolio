"use client";

import { useRef, useState, type FormEvent } from "react";
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
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const busy = useRef(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = Object.fromEntries(["name", "email", "subject", "message"].map(key => [key, String(data.get(key) || "").trim()]));
    const nextErrors: Record<string, string> = {};
    for (const key of ["name", "email", "subject", "message"]) {
      if (!values[key]) nextErrors[key] = `Please enter your ${key}.`;
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Please enter a valid email address.";
    setErrors(nextErrors);
    setNotice("");
    if (Object.keys(nextErrors).length) {
      setStatus("idle");
      form.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    if (data.get("_honey")) return;
    busy.current = true;
    setStatus("sending");
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("https://formsubmit.co/ajax/weetotwee@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, _subject: `Portfolio inquiry: ${values.subject}`, _template: "table", _honey: "" }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === "true")) throw new Error("Submission failed");
      if (/activat|confirm.*email/i.test(String(result.message || ""))) {
        setStatus("error");
        setNotice("The contact form is awaiting activation. Please email weetotwee@gmail.com directly for now.");
        return;
      }
      setStatus("success");
      setNotice("Thank you! Your message has been submitted. I’ll get back to you soon.");
      form.reset();
    } catch {
      setStatus("error");
      setNotice("We couldn’t confirm your submission. Your message is still here—please try again, or email weetotwee@gmail.com directly.");
    } finally {
      window.clearTimeout(timer);
      busy.current = false;
    }
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
          <form className={styles.form} onSubmit={submit} noValidate aria-busy={status === "sending"}>
            <div className={styles.honeypot} aria-hidden="true">
              <label>Leave this empty<input name="_honey" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <fieldset className={styles.fields} disabled={status === "sending"}>
              <div className={styles.twoCols}>
                <label htmlFor="contact-name">Your Name<input id="contact-name" name="name" autoComplete="name" maxLength={100} placeholder="Enter your name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <span id="name-error" className={styles.fieldError}>{errors.name}</span>}</label>
                <label htmlFor="contact-email">Your Email<input id="contact-email" type="email" name="email" autoComplete="email" maxLength={254} placeholder="Enter your email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email && <span id="email-error" className={styles.fieldError}>{errors.email}</span>}</label>
              </div>
              <label htmlFor="contact-subject">Subject<input id="contact-subject" name="subject" maxLength={160} placeholder="What’s this about?" required aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} />{errors.subject && <span id="subject-error" className={styles.fieldError}>{errors.subject}</span>}</label>
              <label htmlFor="contact-message">Message<textarea id="contact-message" name="message" maxLength={5000} placeholder="Tell me more about your project..." required aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message && <span id="message-error" className={styles.fieldError}>{errors.message}</span>}</label>
              <button type="submit">{status === "sending" ? "Sending…" : "Send Message"} <ArrowIcon size={17} /></button>
            </fieldset>
            <div aria-live="polite" aria-atomic="true">{notice && <p className={status === "success" ? styles.success : styles.error} role={status === "error" ? "alert" : "status"}>{notice}</p>}</div>
            <p className={styles.secure}>Your message is processed by FormSubmit and sent to my inbox.</p>
            <a className={styles.directEmail} href="mailto:weetotwee@gmail.com">Prefer email? weetotwee@gmail.com</a>
          </form>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
