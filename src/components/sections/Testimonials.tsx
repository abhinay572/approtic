import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";

const featured = [
  { icon: "🏎️", name: "TripRank", category: "Navigation", slug: "triprank" },
  { icon: "🔮", name: "ResinCraft", category: "Utilities", slug: "resincraft" },
  { icon: "🎨", name: "Lock Screen Widgets", category: "Productivity", slug: "lock-screen-widgets" },
  { icon: "📱", name: "Clone It", category: "Utilities", slug: "clone-it" },
  { icon: "🧒", name: "Kiddie AI", category: "Education", slug: "kiddie-ai" },
  { icon: "🔒", name: "Tomator VPN", category: "Security", slug: "tomator-vpn" },
  { icon: "💊", name: "Peptide Tracker", category: "Health & Fitness", slug: "peptide-tracker" },
  { icon: "📸", name: "PhotoRevive", category: "Photo & Video", slug: "photorevive" },
];

export function Testimonials() {
  return (
    <Section className="bg-surface/30">
      <SectionHeader
        eyebrow="App Store"
        title="22+ apps live and shipped"
        description="We don't just build for clients — we design, develop, and publish our own iOS apps. Each one ships with a real App Store listing, privacy policy, and support."
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {featured.map((app) => (
          <Link
            key={app.name}
            href={`/apps/${app.slug}`}
            className="flex items-center gap-3 p-4 rounded-2xl border border-border bg-surface hover:border-accent/60 hover:bg-accent/5 transition-all group"
          >
            <span className="text-3xl">{app.icon}</span>
            <div className="min-w-0">
              <p className="font-semibold text-text text-sm leading-tight">{app.name}</p>
              <p className="text-muted text-xs mt-0.5">{app.category}</p>
            </div>
            <ExternalLink
              size={14}
              className="ml-auto text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
            />
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/apps"
          className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
        >
          Browse all 22+ apps on the App Store →
        </Link>
      </div>
    </Section>
  );
}
