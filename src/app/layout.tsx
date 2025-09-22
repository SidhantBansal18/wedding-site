import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Akansha & Shubham",
  description: "Wedding celebrations in Delhi NCR • Sagan, Haldi & Wedding",
  icons: {
    icon: "/icon.svg",            // favicon (see step 2)
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Shubham & Akansha — 23–25 Nov 2025",
    description: "Join us for the celebrations in Delhi NCR.",
    url: "https://<your-domain-or-pages-url>", // optional
    siteName: "Shubham & Akansha",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubham & Akansha — 23–25 Nov 2025",
    description: "Join us for the celebrations in Delhi NCR.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
