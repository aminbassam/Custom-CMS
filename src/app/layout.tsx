import type { Metadata } from "next";
import { Source_Sans_3, Space_Grotesk } from "next/font/google";

import "@/app/globals.css";

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans"
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: {
    default: "CMS Website",
    template: "%s | CMS Website"
  },
  description: "Modern Contentful website starter with a secure operational dashboard."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
