import type { Metadata } from "next";
import "./globals.css";
import "./hero-polish.css";
import "./hero-media.css";

export const metadata: Metadata = {
  title: "John Ferrer — Senior Graphic Designer",
  description:
    "Senior Graphic Designer focused on creating thoughtful brands, campaigns, and visual experiences that connect with people.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
