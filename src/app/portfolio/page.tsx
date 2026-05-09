"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/portfolio";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

type Category = "All" | "AI" | "Web" | "Mobile" | "SaaS";
const categories: Category[] = ["All", "AI", "Web", "Mobile", "SaaS"];

export default function PortfolioPage() {
  const [active, setActive] = useState<Category>("All");
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <Section className="pt-32">
        <SectionHeader
          eyebrow="Portfolio"
          title="Work we're proud of"
          description="A selection of client projects — real problems, real solutions, real results."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border ${
                active === cat
                  ? "bg-accent text-white border-accent"
                  : "border-border text-muted hover:text-text hover:border-accent/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <Link href={`/portfolio/${p.slug}`} className="group block h-full">
                <div className="h-full rounded-2xl border border-border overflow-hidden hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 flex flex-col">
                  <div className={`h-52 bg-gradient-to-br ${p.color} flex items-end p-6`}>
                    <span className="font-display font-bold text-2xl text-text/90">
                      {p.metric}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1 bg-surface">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-medium text-muted">{p.client}</p>
                      <Badge variant="accent">{p.category}</Badge>
                    </div>
                    <h2 className="font-display font-semibold text-xl text-text">
                      {p.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed flex-1">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                      Read case study <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
