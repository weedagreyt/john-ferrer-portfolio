import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import Reveal from "../components/Reveal";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact — John Ferrer",
  description: "Get in touch with John Ferrer about branding, campaign design, and creative projects.",
};

const assets = {
  mail: "/contact/mail.svg",
  phone: "/contact/phone.svg",
  pin: "/contact/pin.svg",
  lock: "/contact/lock.svg",
};

export default function ContactPage() {
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
          <ContactForm />
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
