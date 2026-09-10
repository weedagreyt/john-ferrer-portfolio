"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  captureApplicationSource,
  getApplicationSource,
  trackPortfolioEvent,
} from "../lib/portfolio-analytics";

const CASE_STUDIES: Record<string, string> = {
  "/work/kove": "kove",
  "/work/unimotors": "unimotors",
  "/work/dope-marketing": "dope-marketing",
  "/work/yensanities": "yensanities",
  "/work/retrophorics": "retrophorics",
  "/work/art-exploration": "art-exploration",
};

const ENGAGEMENT_MILESTONES = [30, 60, 120, 300] as const;

export default function EmployerEngagementAnalytics() {
  const pathname = usePathname();
  const activeSeconds = useRef(0);
  const timeMilestonesSent = useRef(new Set<number>());
  const scrollMilestonesSent = useRef(new Set<number>());
  const applicationVisitSent = useRef(false);
  const currentPath = useRef(pathname);

  useEffect(() => {
    currentPath.current = pathname;
    captureApplicationSource();

    if (!applicationVisitSent.current && getApplicationSource() !== "direct") {
      trackPortfolioEvent("Application Visit", "page", pathname);
      applicationVisitSent.current = true;
    }

    trackPortfolioEvent("Portfolio Page Viewed", "page", pathname);

    const project = CASE_STUDIES[pathname];
    if (project) {
      trackPortfolioEvent("Case Study Viewed", "project", project);
    }

    scrollMilestonesSent.current.clear();

    const checkScroll = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (documentHeight <= 0) return;

      const progress = window.scrollY / documentHeight;
      for (const milestone of [0.5, 0.9]) {
        if (progress >= milestone && !scrollMilestonesSent.current.has(milestone)) {
          scrollMilestonesSent.current.add(milestone);
          trackPortfolioEvent(
            milestone === 0.5 ? "Scroll 50%" : "Scroll 90%",
            "page",
            pathname,
          );
        }
      }
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, [pathname]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible" || !document.hasFocus()) return;

      activeSeconds.current += 1;

      for (const milestone of ENGAGEMENT_MILESTONES) {
        if (
          activeSeconds.current >= milestone &&
          !timeMilestonesSent.current.has(milestone)
        ) {
          timeMilestonesSent.current.add(milestone);
          const label =
            milestone === 30
              ? "Engaged 30s"
              : milestone === 60
                ? "Engaged 60s"
                : milestone === 120
                  ? "Engaged 2min"
                  : "Engaged 5min";

          trackPortfolioEvent(label, "page", currentPath.current);
        }
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const clickable = target.closest("a,button");
      if (!clickable) return;

      const label = (clickable.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80);
      const page = currentPath.current;

      if (clickable instanceof HTMLAnchorElement) {
        const href = clickable.getAttribute("href") || "";

        if (href.startsWith("mailto:")) {
          trackPortfolioEvent("Email Clicked", "page", page);
          return;
        }

        if (
          /(?:resume|curriculum|\bcv\b)/i.test(`${label} ${href}`) ||
          /\.pdf(?:$|[?#])/i.test(href)
        ) {
          trackPortfolioEvent("Resume Opened", "page", page);
          return;
        }

        if (href === "/contact" || href.startsWith("/contact?") || /contact/i.test(label)) {
          trackPortfolioEvent("Contact Intent", "page", page);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
