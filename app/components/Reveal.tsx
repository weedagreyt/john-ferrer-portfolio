"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./reveal.module.css";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    // Content stays readable before hydration; only animate sections below the fold.
    if (node.getBoundingClientRect().top < window.innerHeight) return;
    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -24px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
