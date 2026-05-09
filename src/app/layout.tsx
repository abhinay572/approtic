import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Analytics } from "@/components/Analytics";
import { localBusinessSchema } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://approtic.in"),
  title: {
    default: "Approtic — We build software that thinks.",
    template: "%s | Approtic",
  },
  description:
    "Approtic is an AI-first product studio building AI agents, custom software, SaaS products, and growth marketing solutions for global clients.",
  keywords: [
    "AI agents",
    "custom software development",
    "SaaS development",
    "AI automation",
    "software studio India",
    "product studio",
    "digital marketing",
  ],
  authors: [{ name: "Approtic", url: "https://approtic.in" }],
  creator: "Approtic",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://approtic.in",
    siteName: "Approtic",
    title: "Approtic — We build software that thinks.",
    description:
      "AI-first product studio: AI agents, custom software, SaaS, and growth marketing.",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Approtic" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Approtic — We build software that thinks.",
    description:
      "AI-first product studio: AI agents, custom software, SaaS, and growth marketing.",
    images: ["/og/default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
