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

const homeScrollReset = `
(() => {
  try {
    const isHomeTop = location.pathname === "/" && (!location.hash || location.hash === "#top");
    if (!isHomeTop) return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const reset = () => {
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      root.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      root.style.scrollBehavior = previousBehavior;
    };

    reset();
    addEventListener("DOMContentLoaded", reset, { once: true });
    addEventListener("load", reset, { once: true });
    addEventListener("pageshow", reset);
  } catch {
    // Never let scroll-reset protection interfere with page rendering.
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
        <Script id="home-scroll-reset" strategy="beforeInteractive">
          {homeScrollReset}
        </Script>
        {children}
      </body>
    </html>
  );
}