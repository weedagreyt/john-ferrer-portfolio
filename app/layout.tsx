import type { Metadata } from "next";
import { Teko } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./hero-polish.css";
import "./hero-media.css";
import "./hero-retina-fix.css";
import "./race-aesthetic.css";
import "./hero-cleanup.css";

const raceDisplay = Teko({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-race-display",
  display: "swap",
});

const homeEntryGuard = `
(() => {
  try {
    const isHomeTop = () => location.pathname === "/" && (!location.hash || location.hash === "#top");
    if (!isHomeTop()) return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const root = document.documentElement;
    root.classList.add("home-entry-lock");

    const style = document.createElement("style");
    style.id = "home-entry-lock-style";
    style.textContent =
      "html.home-entry-lock{overflow:hidden!important;overscroll-behavior:none!important;scroll-behavior:auto!important;}" +
      "html.home-entry-lock body{position:fixed!important;inset:0!important;width:100%!important;height:100%!important;overflow:hidden!important;overscroll-behavior:none!important;}";
    document.head.appendChild(style);

    const reset = () => {
      if (!isHomeTop()) return;
      window.scrollTo(0, 0);
      root.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    let released = false;
    let sawIntro = false;
    let observer;

    const release = () => {
      if (released) return;
      released = true;
      reset();
      root.classList.remove("home-entry-lock");
      requestAnimationFrame(() => {
        reset();
        requestAnimationFrame(reset);
      });
      setTimeout(reset, 80);
      setTimeout(reset, 240);
      if (observer) observer.disconnect();
    };

    const inspect = () => {
      const intro = document.querySelector('[aria-label="Portfolio intro animation. Click or scroll to skip."]');
      if (intro) {
        sawIntro = true;
        reset();
        return;
      }
      if (sawIntro) release();
    };

    const start = () => {
      reset();
      if (!document.body) {
        requestAnimationFrame(start);
        return;
      }

      observer = new MutationObserver(inspect);
      observer.observe(document.body, { childList: true, subtree: true });
      inspect();

      // Safety valve: never leave the document permanently locked if the intro fails.
      setTimeout(release, 9000);
    };

    addEventListener("pageshow", () => {
      if (!isHomeTop()) return;
      reset();
      requestAnimationFrame(reset);
      setTimeout(reset, 100);
    });

    addEventListener("load", reset, { once: true });
    start();
  } catch {
    document.documentElement.classList.remove("home-entry-lock");
  }
})();
`;

export const metadata: Metadata = {
  title: "John Ferrer — Senior Graphic Designer",
  description:
    "Senior Graphic Designer focused on creating thoughtful brands, campaigns, and visual experiences that connect with people.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={raceDisplay.variable}>
        <Script id="home-entry-guard" strategy="beforeInteractive">
          {homeEntryGuard}
        </Script>
        {children}
      </body>
    </html>
  );
}
