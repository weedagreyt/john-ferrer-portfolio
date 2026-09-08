import styles from "./brand-background.module.css";

type Props = {
  variant?: "hero" | "about";
  className?: string;
};

const assets = {
  hero: {
    main: "/brand/hero-main.svg",
    top: "/brand/hero-top.svg",
    bottom: "/brand/hero-bottom.svg",
  },
  about: {
    main: "/brand/about-main.svg",
    top: "/brand/about-top.svg",
    bottom: "/brand/about-bottom.svg",
  },
};

export default function BrandBackground({ variant = "hero", className = "" }: Props) {
  const set = assets[variant];
  return (
    <div className={`${styles.background} ${styles[variant]} ${className}`} aria-hidden="true">
      <img className={`${styles.line} ${styles.main}`} src={set.main} alt="" />
      <img className={`${styles.line} ${styles.top}`} src={set.top} alt="" />
      <img className={`${styles.line} ${styles.bottom}`} src={set.bottom} alt="" />
    </div>
  );
}
