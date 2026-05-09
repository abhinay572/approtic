import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

export const metadata: Metadata = buildMetadata({
  title: "Our Apps",
  description:
    "iOS and Android apps built by Approtic — utilities, productivity tools, AI apps, and more. Browse all our mobile products.",
  path: "/apps",
});

import { apps } from "@/lib/apps";

export default function AppsPage() {
  return (
    <>
      <Section className="pt-32 pb-10">
        <SectionHeader
          eyebrow="Mobile Apps"
          title="Apps we've shipped"
          description="Every app is built, owned, and maintained by Approtic. Download them on the App Store."
        />
      </Section>

      <Section className="pt-0">
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
          {apps.map((app) => (
            <StaggerItem key={app.slug}>
              <div className="rounded-2xl border border-border bg-surface overflow-hidden flex flex-col h-full hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5">
                {/* Color bar */}
                <div className={`h-2 bg-gradient-to-r ${app.color}`} />
                <div className="p-6 flex flex-col gap-4 flex-1">
                  {/* Icon + name */}
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-3xl shrink-0 shadow-lg`}>
                      {app.icon}
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-lg text-text leading-tight">{app.name}</h2>
                      <p className={`text-sm font-medium ${app.accentColor}`}>{app.subtitle}</p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="gap-1 text-xs">
                      <Smartphone size={10} />
                      {app.platform}
                    </Badge>
                    <Badge variant="outline" className="text-xs">{app.price}</Badge>
                    <Badge variant="outline" className="text-xs">{app.category}</Badge>
                  </div>

                  {/* Description */}
                  <p className="text-muted text-sm leading-relaxed flex-1 line-clamp-3">{app.tagline}</p>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto pt-2">
                    <Link href={`/apps/${app.slug}`} className="flex-1">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface-2 text-sm font-medium text-text hover:border-accent/50 transition-colors">
                        Learn more <ArrowRight size={14} />
                      </button>
                    </Link>
                    <a
                      href={app.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                      App Store
                    </a>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
