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
      "html.home-entry-lock body{position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:0!important;width:100%!important;height:100%!important;overflow:hidden!important;overscroll-behavior:none!important;}";
    document.head.appendChild(style);

    const reset = () => {
      if (!isHomeTop()) return;
      window.scrollTo(0, 0);
      root.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    let released = false;
    let sawIntro = false;
    let introGoneAt = 0;
    let lastGestureAt = 0;
    let activeTouches = 0;
    let observer;
    let releaseTimer;
    let pinTimer;

    const locked = () => root.classList.contains("home-entry-lock") && !released;

    const markGesture = () => {
      lastGestureAt = performance.now();
    };

    const preventWhileLocked = (event) => {
      if (!locked()) return;
      markGesture();
      if (event.cancelable) event.preventDefault();
      reset();
    };

    const onTouchStart = (event) => {
      if (!locked()) return;
      activeTouches = event.touches ? event.touches.length : 1;
      markGesture();
      reset();
    };

    const onTouchEnd = (event) => {
      activeTouches = event.touches ? event.touches.length : 0;
      markGesture();
      scheduleRelease();
    };

    const cleanupInputGuards = () => {
      removeEventListener("touchstart", onTouchStart, true);
      removeEventListener("touchmove", preventWhileLocked, true);
      removeEventListener("touchend", onTouchEnd, true);
      removeEventListener("touchcancel", onTouchEnd, true);
      removeEventListener("wheel", preventWhileLocked, true);
    };

    const release = () => {
      if (released) return;
      released = true;
      reset();
      root.classList.remove("home-entry-lock");
      cleanupInputGuards();
      if (observer) observer.disconnect();
      if (pinTimer) clearInterval(pinTimer);
      if (releaseTimer) clearTimeout(releaseTimer);

      requestAnimationFrame(() => {
        reset();
        requestAnimationFrame(reset);
      });
      setTimeout(reset, 90);
      setTimeout(reset, 220);
    };

    const canRelease = () => {
      if (released || !sawIntro || !introGoneAt) return false;
      if (activeTouches > 0) return false;
      const quietFor = performance.now() - lastGestureAt;
      const goneFor = performance.now() - introGoneAt;
      return quietFor >= 500 && goneFor >= 350;
    };

    function scheduleRelease() {
      if (released || !sawIntro || !introGoneAt) return;
      if (releaseTimer) clearTimeout(releaseTimer);
      releaseTimer = setTimeout(() => {
        reset();
        if (canRelease()) {
          release();
        } else {
          scheduleRelease();
        }
      }, 120);
    }

    const inspect = () => {
      const intro = document.querySelector('[aria-label="Portfolio intro animation. Click or scroll to skip."]');
      if (intro) {
        sawIntro = true;
        introGoneAt = 0;
        reset();
        return;
      }

      if (sawIntro && !introGoneAt) {
        introGoneAt = performance.now();
        scheduleRelease();
      }
    };

    const start = () => {
      reset();
      if (!document.body) {
        requestAnimationFrame(start);
        return;
      }

      addEventListener("touchstart", onTouchStart, { capture: true, passive: true });
      addEventListener("touchmove", preventWhileLocked, { capture: true, passive: false });
      addEventListener("touchend", onTouchEnd, { capture: true, passive: true });
      addEventListener("touchcancel", onTouchEnd, { capture: true, passive: true });
      addEventListener("wheel", preventWhileLocked, { capture: true, passive: false });

      observer = new MutationObserver(inspect);
      observer.observe(document.body, { childList: true, subtree: true });
      inspect();

      pinTimer = setInterval(() => {
        if (locked()) reset();
      }, 100);

      // Reduced-motion or failed intro mount: release safely rather than trapping the page.
      setTimeout(() => {
        if (!sawIntro && !released) release();
      }, 1600);

      // Absolute safety valve.
      setTimeout(release, 10000);
    };

    addEventListener("pageshow", () => {
      if (!isHomeTop()) return;
      reset();
      requestAnimationFrame(reset);
      setTimeout(reset, 120);
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
