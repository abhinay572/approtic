import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, Smartphone, Shield, Wifi } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "ResinCraft – Epoxy Resin Calculator App",
  description:
    "Calculate exactly how much epoxy resin you need for any mold. Pre-loaded ratios for ArtResin, Pro Marine, MAS & more. 100% offline, no ads.",
  path: "/apps/resincraft",
});

const features = [
  {
    title: "7 Mold Shape Calculators",
    description:
      "Rectangle, disc, sphere, half-sphere, cylinder, cone, and dome — every shape you'll ever pour.",
    icon: "📐",
  },
  {
    title: "Pre-loaded Brand Ratios",
    description:
      "ArtResin, Pro Marine, Stone Coat, EnviroTex, MAS, Ecopoxy, TotalBoat — or add a custom ratio.",
    icon: "🏷️",
  },
  {
    title: "Imperial & Metric",
    description:
      "Switch between fl oz / mL and inches / cm instantly. No manual conversions needed.",
    icon: "📏",
  },
  {
    title: "Save & Reuse Projects",
    description:
      "Save mold presets with notes and reload them anytime. Build your personal project library.",
    icon: "💾",
  },
  {
    title: "Adjustable Safety Margin",
    description:
      "Set 0–20% overage for waste and spillage. Never run short mid-pour again.",
    icon: "⚙️",
  },
  {
    title: "100% Offline",
    description:
      "No account, no tracking, no ads. Your data stays on your device. Works in your studio.",
    icon: "🔒",
  },
];

const perfectFor = [
  "Resin jewelry makers — pendants, cabochons, beads",
  "Tumbler crafters",
  "River-table builders",
  "Geode coaster artists",
  "Anyone tired of pouring too much or too little",
];

const appStoreUrl =
  "https://apps.apple.com/us/app/resincraft-resin-calculator/id6766811423";

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ResinCraft: Resin Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "iOS",
  offers: {
    "@type": "Offer",
    price: "4.99",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Approtic Solutions Private Limited",
    url: "https://approtic.in",
  },
  description:
    "Calculate exactly how much epoxy resin you need for any mold. Pre-loaded ratios for ArtResin, Pro Marine, MAS, EnviroTex and more.",
};

export default function ResinCraftPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(to right, var(--border) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Badge variant="accent" className="gap-1.5">
                  <Smartphone size={12} />
                  iPhone App — $4.99
                </Badge>
                <Badge variant="outline" className="gap-1.5">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  Utilities
                </Badge>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-text leading-[1.05] tracking-tight">
                ResinCraft
                <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Resin Calculator
                </span>
              </h1>

              <p className="text-muted text-xl leading-relaxed max-w-lg">
                The fastest way to calculate exactly how much epoxy resin you need for
                any mold. Pick a shape, enter dimensions, get exact amounts — for any
                brand, any unit.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a href={appStoreUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="gradient" className="group gap-2">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Download on App Store
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              </div>

              <div className="flex flex-wrap gap-6 pt-2 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <Wifi size={14} className="text-violet-400" />
                  100% Offline
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-violet-400" />
                  No tracking, no ads
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone size={14} className="text-violet-400" />
                  iOS 17+
                </div>
              </div>
            </div>

            {/* Right: App icon / visual */}
            <div className="flex items-center justify-center">
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-indigo-500/20 rounded-[3rem] blur-3xl scale-110" />
                {/* App icon card */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[3rem] bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex items-center justify-center shadow-2xl shadow-violet-900/50 border border-violet-500/20">
                  <span className="text-[7rem]" aria-label="ResinCraft app icon">🔮</span>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-surface border border-border rounded-2xl px-4 py-3 shadow-xl">
                  <p className="text-xs text-muted">One-time purchase</p>
                  <p className="font-display font-bold text-xl text-text">$4.99</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <Section className="pt-0">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-3">Features</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text">Everything a resin maker needs</h2>
        </div>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="rounded-2xl border border-border bg-surface p-6 h-full flex flex-col gap-4 hover:border-violet-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-violet-900/10">
                <div className="text-4xl">{f.icon}</div>
                <h3 className="font-display font-semibold text-lg text-text">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed flex-1">{f.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Perfect For */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-3">Perfect For</p>
              <h2 className="font-display text-4xl font-bold text-text mb-6">
                Built for every kind of resin artist
              </h2>
              <ul className="space-y-4">
                {perfectFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted">
                    <CheckCircle2 size={18} className="text-violet-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-border bg-surface p-8 space-y-6">
              <h3 className="font-display font-bold text-2xl text-text">Supported Brands</h3>
              <div className="grid grid-cols-2 gap-3">
                {["ArtResin", "Pro Marine", "Stone Coat", "EnviroTex", "MAS Epoxy", "Ecopoxy", "TotalBoat", "Custom ratio"].map((brand) => (
                  <div
                    key={brand}
                    className="rounded-xl border border-border bg-bg px-4 py-3 text-sm text-muted font-medium flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
                    {brand}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted border-t border-border pt-4">
                Brand names are used for reference only. Always verify ratios against your manufacturer's instructions.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden border border-violet-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-indigo-700/20" />
            <div className="relative px-8 py-16 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-3">Get the App</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-text mb-4">
                Stop guessing. Start crafting.
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto mb-8">
                One-time purchase. No subscriptions, no accounts, no ads. Just accurate resin math, always in your pocket.
              </p>
              <a href={appStoreUrl} target="_blank" rel="noopener noreferrer">
                <Button size="xl" variant="gradient" className="group gap-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download on App Store — $4.99
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <div className="mt-6 flex justify-center gap-8 text-sm text-muted">
                <Link href="/apps/resincraft/privacy" className="hover:text-violet-400 transition-colors underline underline-offset-4">
                  Privacy Policy
                </Link>
                <Link href="/apps/resincraft/terms" className="hover:text-violet-400 transition-colors underline underline-offset-4">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
