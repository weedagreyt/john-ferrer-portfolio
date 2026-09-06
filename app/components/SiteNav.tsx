"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./site-nav.module.css";
import { resumeUrl, siteAssets } from "../lib/portfolio";

type Props = {
  theme?: "light" | "dark";
};

export default function SiteNav({ theme = "light" }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <div className={styles.inner}>
        <a className={styles.brand} href="/" aria-label="John Ferrer Design home" onClick={() => setOpen(false)}>
          <img src={siteAssets.logo} alt="John Ferrer logo" />
        </a>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <div className={styles.navLinks}>
            <a className={isActive("/") ? styles.active : ""} href="/">Home</a>
            <a className={isActive("/work") ? styles.active : ""} href="/work">Work</a>
            <a className={isActive("/about") ? styles.active : ""} href="/about">About</a>
            <a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a>
          </div>
          <a className={styles.contact} href="/contact">Contact Me</a>
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
        <a className={isActive("/") ? styles.active : ""} href="/" onClick={() => setOpen(false)}>Home</a>
        <a className={isActive("/work") ? styles.active : ""} href="/work" onClick={() => setOpen(false)}>Work</a>
        <a className={isActive("/about") ? styles.active : ""} href="/about" onClick={() => setOpen(false)}>About</a>
        <a href={resumeUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Résumé</a>
        <a className={styles.mobileContact} href="/contact" onClick={() => setOpen(false)}>Contact Me</a>
      </div>
    </header>
  );
}
