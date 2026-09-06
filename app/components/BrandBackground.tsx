import styles from "./brand-background.module.css";

type Props = {
  variant?: "hero" | "about";
  className?: string;
};

const assets = {
  hero: {
    main: "https://www.figma.com/api/mcp/asset/d10da966-03c9-47fc-95f5-00fe4f21d328.svg",
    top: "https://www.figma.com/api/mcp/asset/9a80bf07-4003-4adb-8cd2-66a473a12b83.svg",
    bottom: "https://www.figma.com/api/mcp/asset/0c8e7eb5-00b9-42b0-b5f0-4a51d74ee4fd.svg",
  },
  about: {
    main: "https://www.figma.com/api/mcp/asset/b3a05cd3-7b6c-4188-be15-2523004b24ba.svg",
    top: "https://www.figma.com/api/mcp/asset/b6fd9717-6ecd-41f7-9e81-c46375678d9e.svg",
    bottom: "https://www.figma.com/api/mcp/asset/52cb59c2-fd89-4727-a27b-14540ebf62a3.svg",
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
