import type { Metadata } from "next";
import { Teko } from "next/font/google";
import "./globals.css";
import "./hero-polish.css";
import "./hero-media.css";
import "./hero-retina-fix.css";
import "./race-aesthetic.css";

const raceDisplay = Teko({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-race-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "John Ferrer — Senior Graphic Designer",
  description:
    "Senior Graphic Designer focused on creating thoughtful brands, campaigns, and visual experiences that connect with people.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={raceDisplay.variable}>{children}</body>
    </html>
  );
}
