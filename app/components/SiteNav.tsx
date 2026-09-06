"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./site-nav.module.css";
import { resumeUrl, siteAssets } from "../lib/portfolio";
import { ArrowIcon } from "./UiIcons";

export default function SiteNav({ theme = "light" }: { theme?: "light" | "dark" }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => pathname.startsWith(href) && href !== "/";

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <div className={styles.inner}>
        <a className={styles.brand} href="/" aria-label="John Ferrer home" onClick={() => setOpen(false)}>
          <img src={siteAssets.logo} alt="John Ferrer logo" />
        </a>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <div className={styles.navLinks}>
            <a className={active("/work") ? styles.active : ""} href="/work">Work</a>
            <a className={active("/about") ? styles.active : ""} href="/about">About</a>
            <a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a>
            <a className={active("/contact") ? styles.active : ""} href="/contact">Contact</a>
          </div>
          <a className={styles.contact} href="/contact"><span>Let’s Talk</span><ArrowIcon size={15} /></a>
        </nav>

        <button
          className={styles.menuButton}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ""}`}>
        <a href="/work" onClick={() => setOpen(false)}>Work</a>
        <a href="/about" onClick={() => setOpen(false)}>About</a>
        <a href={resumeUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Résumé</a>
        <a href="/contact" onClick={() => setOpen(false)}>Contact</a>
        <a className={styles.mobileContact} href="/contact" onClick={() => setOpen(false)}>Let’s Talk</a>
      </div>
    </header>
  );
}
