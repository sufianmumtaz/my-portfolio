import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sufian Mumtaz — Senior Full Stack Engineer",
  description:
    "Senior Full Stack Engineer building AI-powered products, multi-tenant SaaS platforms and enterprise workflow applications with React, Next.js, Node.js, Python and the cloud.",
  openGraph: {
    title: "Sufian Mumtaz — Senior Full Stack Engineer",
    description: "AI-powered products, multi-tenant SaaS and enterprise platforms.",
    images: ["/profile.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#070b16",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>{children}</body>
    </html>
  );
}
