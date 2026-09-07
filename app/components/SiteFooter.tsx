"use client";

import styles from "./site-footer.module.css";
import { resumeUrl } from "../lib/portfolio";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.bottom}>
          <span>© 2026 John Ferrer. All rights reserved.</span>
          <nav aria-label="Footer navigation">
            <a href="/work">Work</a><i>/</i>
            <a href="/about">About</a><i>/</i>
            <a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a><i>/</i>
            <a href="/contact">Contact</a>
          </nav>
          <div className={styles.socials} aria-label="Social profiles">
            <a href="https://www.behance.net/weedagreyt" target="_blank" rel="noreferrer" aria-label="Behance"><img src="/social-behance.png" alt="" /></a>
            <a href="https://99designs.com/profiles/3055278" target="_blank" rel="noreferrer" aria-label="99designs"><img src="/social-99designs.png" alt="" /></a>
            <a href="https://www.designhill.com/member/weedagreyt" target="_blank" rel="noreferrer" aria-label="Designhill"><img src="/social-designhill.png" alt="" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
