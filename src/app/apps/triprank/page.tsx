import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, Smartphone, Shield, Zap, Trophy, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "TripRank – GPS Speed Tracker & Speed Camera App",
  description:
    "Pro-grade GPS speedometer with real-time speed camera alerts, G-force tracking, global leaderboard, and shareable trip cards. Free on iPhone & iPad.",
  path: "/apps/triprank",
});

const features = [
  {
    icon: "🏎️",
    title: "Live GPS Speedometer",
    description:
      "Real-time speed with max and average readouts. Trip distance, duration, altitude, and live route mapping always visible.",
  },
  {
    icon: "📸",
    title: "Speed Camera Alerts",
    description:
      "Fixed, mobile, red-light & average-speed cameras worldwide via OpenStreetMap. 500m countdown, speed-limit badge, haptic feedback.",
  },
  {
    icon: "🚦",
    title: "Traffic Signal Detection",
    description:
      "Detect traffic lights, stop signs, and crossings ahead. Colour-coded pins and real-time distance warnings.",
  },
  {
    icon: "⚡",
    title: "G-Force & Telemetry",
    description:
      "Acceleration, braking, and cornering measured in real time. Full driving behaviour analysis stored per trip.",
  },
  {
    icon: "🏝️",
    title: "Dynamic Island & Live Activity",
    description:
      "Speed, camera alerts, and countdowns on your Lock Screen and Dynamic Island — no need to open the app.",
  },
  {
    icon: "🏆",
    title: "Global Leaderboard",
    description:
      "Compete worldwide on top speed, total distance, and trip count. Add friends via QR code or profile link.",
  },
  {
    icon: "📊",
    title: "Shareable Trip Cards",
    description:
      "Every drive becomes an Instagram-ready data card with route map, stats, and personal branding. Share in one tap.",
  },
  {
    icon: "🤖",
    title: "AI Car Mod",
    description:
      "Transform any car photo with AI. Choose Off-Road, Racing, Lowrider, Luxury, Cyberpunk, or Classic styles.",
  },
];

const proFeatures = [
  "Unlimited trip tracking (free: 3 trips)",
  "Speed camera & radar alerts with real-time map",
  "Traffic signal detection (lights, stops, crossings)",
  "Dynamic Island & Lock Screen Live Activity",
  "Dedicated radar tab with map & list views",
  "Push notifications for cameras & signals",
  "Advanced G-force and telemetry data",
  "Global leaderboard access",
  "AI car modifications with 6 styles",
  "Shareable premium stat cards",
];

const appStoreUrl =
  "https://apps.apple.com/us/app/triprank-speed-tracker/id6760617806";

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "TripRank :Speed Tracker",
  applicationCategory: "NavigationApplication",
  operatingSystem: "iOS",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: "1" },
  author: {
    "@type": "Organization",
    name: "Approtic Solutions Private Limited",
    url: "https://approtic.in",
  },
  description:
    "Pro-grade GPS speedometer with real-time speed camera alerts, G-force tracking, global leaderboard, and shareable trip cards.",
};

export default function TripRankPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
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
            {/* Copy */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="accent" className="gap-1.5">
                  <Smartphone size={12} />
                  Free · In-App Purchases
                </Badge>
                <Badge variant="outline" className="gap-1.5">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  5.0 Rating
                </Badge>
                <Badge variant="outline" className="gap-1.5">
                  <MapPin size={12} />
                  Navigation
                </Badge>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-text leading-[1.05] tracking-tight">
                TripRank
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-400 bg-clip-text text-transparent">
                  Speed Tracker
                </span>
              </h1>

              <p className="text-muted text-xl leading-relaxed max-w-lg">
                Pro-grade GPS speedometer with real-time speed camera alerts, G-force
                telemetry, global leaderboard, and shareable trip cards. Turn every
                drive into professional-grade data.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a href={appStoreUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="gradient" className="group gap-2">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Download Free on App Store
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              </div>

              <div className="flex flex-wrap gap-6 pt-2 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-cyan-400" />
                  No ads
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-cyan-400" />
                  Dynamic Island
                </div>
                <div className="flex items-center gap-2">
                  <Trophy size={14} className="text-cyan-400" />
                  Global Leaderboard
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone size={14} className="text-cyan-400" />
                  iPhone &amp; iPad
                </div>
              </div>
            </div>

            {/* App icon visual */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-600/20 rounded-[3rem] blur-3xl scale-110" />
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[3rem] bg-gradient-to-br from-blue-600 via-cyan-500 to-sky-700 flex items-center justify-center shadow-2xl shadow-blue-900/50 border border-cyan-500/20">
                  <span className="text-[7rem]" aria-label="TripRank app icon">🏎️</span>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-surface border border-border rounded-2xl px-4 py-3 shadow-xl">
                  <p className="text-xs text-muted">Free to download</p>
                  <p className="font-display font-bold text-xl text-text">Pro available</p>
                </div>
                {/* Rating badge */}
                <div className="absolute -top-4 -left-4 bg-surface border border-border rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <div>
                    <p className="font-display font-bold text-lg text-text leading-none">5.0</p>
                    <p className="text-xs text-muted">App Store</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <Section className="pt-0">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-3">Features</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-text">
            Every drive, professionally tracked
          </h2>
        </div>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.07}>
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="rounded-2xl border border-border bg-surface p-5 h-full flex flex-col gap-3 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-900/10">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="font-display font-semibold text-base text-text">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed flex-1">{f.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Pro plan */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-3">TripRank Pro</p>
              <h2 className="font-display text-4xl font-bold text-text mb-4">
                Unlock the full driving experience
              </h2>
              <p className="text-muted mb-8">
                Free users get 3 trips. Go Pro for unlimited tracking, camera alerts,
                leaderboard, AI car mods, and premium stat cards. Invite 5 friends to
                get 7 days of Pro free.
              </p>
              <a href={appStoreUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="gradient" size="lg" className="group gap-2">
                  Get TripRank Free
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-2xl text-text">Pro includes</h3>
                <Badge variant="accent">Pro</Badge>
              </div>
              <ul className="space-y-3">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted border-t border-border mt-6 pt-4">
                Invite 5 friends with your referral code → 7 days Pro free. No credit card required.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Safety notice */}
      <Section>
        <Reveal>
          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 flex gap-4">
            <span className="text-2xl shrink-0">⚠️</span>
            <div>
              <p className="font-semibold text-text mb-1">Safety first</p>
              <p className="text-sm text-muted leading-relaxed">
                TripRank is designed for passenger use or post-trip review. Never interact with
                the app while driving. Always obey speed limits and traffic laws. GPS accuracy
                may vary — do not rely on TripRank as your sole speed measurement device.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden border border-cyan-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-sky-700/20" />
            <div className="relative px-8 py-16 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-3">Get the App</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-text mb-4">
                Your drives deserve better data.
              </h2>
              <p className="text-muted text-lg max-w-xl mx-auto mb-8">
                Free to download. No ads. Start tracking in seconds — cameras, telemetry,
                leaderboard, and AI mods all in one app.
              </p>
              <a href={appStoreUrl} target="_blank" rel="noopener noreferrer">
                <Button size="xl" variant="gradient" className="group gap-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download Free on App Store
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <div className="mt-6 flex justify-center gap-8 text-sm text-muted">
                <Link href="/apps/triprank/privacy" className="hover:text-cyan-400 transition-colors underline underline-offset-4">
                  Privacy Policy
                </Link>
                <Link href="/apps/triprank/terms" className="hover:text-cyan-400 transition-colors underline underline-offset-4">
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
