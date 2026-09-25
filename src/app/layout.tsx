import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RedScreen Studios — Premium Property Experiences",
  description:
    "We help million-dollar properties close faster. Immersive digital experiences that let serious buyers experience premium properties from anywhere in the world.",
  openGraph: {
    title: "RedScreen Studios — Premium Property Experiences",
    description:
      "We help million-dollar properties close faster. Immersive digital experiences for luxury real estate.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "RedScreen Studios — Premium Property Experiences",
    description:
      "We help million-dollar properties close faster. Immersive digital experiences for luxury real estate.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Responsive preload: WebP — 20KB vs 836KB PNG, viewport-specific */}
        {/* Mobile: crowd + figure both preloaded so both arrive before JS */}
        <link
          rel="preload"
          as="image"
          href="/images/hero/hero-mobile-crowd.webp"
          media="(max-width: 768px)"
          fetchPriority="high"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero/hero-mobile-figure.webp"
          media="(max-width: 768px)"
          fetchPriority="high"
          type="image/webp"
        />
        {/* Desktop: crowd + figure */}
        <link
          rel="preload"
          as="image"
          href="/images/hero/hero-desktop-crowd.webp"
          media="(min-width: 769px)"
          fetchPriority="high"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero/hero-desktop-figure.webp"
          media="(min-width: 769px)"
          fetchPriority="high"
          type="image/webp"
        />
      </head>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
