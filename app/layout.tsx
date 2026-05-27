import type { Metadata } from "next";
import { Urbanist, Inter, Montserrat } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "108 RAYS — A Global Founders Ecosystem",
  description:
    "A curated ecosystem for ambitious founders. Peer boards, growth sessions, and curated experiences for founders who want 10x growth and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${urbanist.variable} ${inter.variable} ${montserrat.variable} antialiased`}>
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
