"use client";

import type { MouseEvent } from "react";
import styles from "./site-footer.module.css";
import { resumeUrl } from "../lib/portfolio";

export default function SiteFooter() {
  const replayIntro = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    try {
      const introKeys: string[] = [];
      for (let index = 0; index < window.sessionStorage.length; index += 1) {
        const key = window.sessionStorage.key(index);
        if (key?.startsWith("jf:intro:")) introKeys.push(key);
      }
      introKeys.forEach((key) => window.sessionStorage.removeItem(key));
    } catch {
      // The homepage still works if storage is unavailable.
    }

    window.location.assign("/");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.bottom}>
          <span>© 2026 John Ferrer. All rights reserved.</span>
          <nav aria-label="Footer navigation">
            <a href="/">Home</a><i>/</i>
            <a href="/work">Work</a><i>/</i>
            <a href="/about">About</a><i>/</i>
            <a href={resumeUrl} target="_blank" rel="noreferrer">Résumé</a><i>/</i>
            <a href="/contact">Contact</a><i>/</i>
            <a href="/" onClick={replayIntro} aria-label="Replay intro" title="Replay intro"><span aria-hidden="true">↻</span></a>
          </nav>
          <div className={styles.socials} aria-label="Social profiles">
            <a href="https://www.behance.net/weedagreyt" target="_blank" rel="noreferrer" aria-label="Behance"><img src="/social-behance.png" alt="Behance profile" /></a>
            <a href="https://99designs.com/profiles/3055278" target="_blank" rel="noreferrer" aria-label="99designs"><img src="/social-99designs.png" alt="99designs profile" /></a>
            <a href="https://www.designhill.com/member/weedagreyt" target="_blank" rel="noreferrer" aria-label="Designhill"><img src="/social-designhill.png" alt="Designhill profile" /></a>
            <a href="https://www.linkedin.com/in/johnferrer-designs" target="_blank" rel="noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%" }} fill="#fff" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
