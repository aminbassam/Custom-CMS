import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "CMS Website",
    template: "%s | CMS Website"
  },
  description: "Modern Contentful website starter with a secure operational dashboard."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
