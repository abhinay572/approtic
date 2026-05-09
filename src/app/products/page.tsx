import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { products } from "@/lib/products";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { TiltCard } from "@/components/ui/TiltCard";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "In-house SaaS products by Approtic — AI support agents, developer boilerplates, and SEO tools you can deploy today.",
  path: "/products",
});

const statusMap = {
  live: { label: "Live", variant: "success" as const },
  beta: { label: "Beta", variant: "accent" as const },
  "coming-soon": { label: "Coming soon", variant: "default" as const },
};

export default function ProductsPage() {
  return (
    <>
      <Section className="pt-32 pb-10">
        <SectionHeader
          eyebrow="Our Products"
          title="Software we built — and use"
          description="We dog-food everything we make. These products are live, serving real customers, and available for your team."
        />
      </Section>

      <Section className="pt-0">
        <Stagger className="grid md:grid-cols-3 gap-6" stagger={0.1}>
          {products.map((p) => {
            const st = statusMap[p.status];
            return (
              <StaggerItem key={p.slug}>
                <TiltCard intensity={5} glare={false} className="h-full rounded-2xl border border-border overflow-hidden flex flex-col hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5">
                  <div className={`h-40 bg-gradient-to-br ${p.color}`} />
                  <div className="flex flex-col gap-4 p-6 bg-surface flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-display font-bold text-xl text-text">{p.name}</h2>
                        <p className="text-muted text-sm">{p.tagline}</p>
                      </div>
                      <Badge variant={st.variant}>{st.label}</Badge>
                    </div>
                    <p className="text-muted text-sm leading-relaxed">{p.description}</p>
                    <ul className="space-y-2">
                      {p.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {p.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-auto pt-2">
                      <Link href={`/products/${p.slug}`} className="flex-1">
                        <Button variant="secondary" size="sm" className="w-full">
                          Learn more <ArrowRight size={14} />
                        </Button>
                      </Link>
                      {p.url && (
                        <a href={p.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <ExternalLink size={14} />
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <CTABanner />
    </>
  );
}
