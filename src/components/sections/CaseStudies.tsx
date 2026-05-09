import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { TiltCard } from "@/components/ui/TiltCard";

const cases = [
  {
    slug: "ai-customer-support",
    title: "AI Customer Support Agent",
    client: "FinTech Startup",
    description:
      "Deployed an LLM-powered support agent that handles 80% of incoming tickets autonomously, reducing support costs by 60%.",
    tags: ["AI Agents", "LangChain", "Next.js"],
    metric: "80% automation rate",
    color: "from-accent/20 to-accent-2/10",
  },
  {
    slug: "ecommerce-platform",
    title: "Multi-vendor E-commerce Platform",
    client: "D2C Brand",
    description:
      "Built a full-featured marketplace with vendor dashboards, real-time inventory, and AI-driven product recommendations.",
    tags: ["Next.js", "Supabase", "Stripe"],
    metric: "3× GMV growth",
    color: "from-purple-500/20 to-accent/10",
  },
  {
    slug: "saas-analytics",
    title: "SaaS Analytics Dashboard",
    client: "EdTech Company",
    description:
      "Replaced a legacy reporting tool with a real-time analytics platform serving 50K+ daily active users.",
    tags: ["React", "Python", "PostgreSQL"],
    metric: "50K+ DAU",
    color: "from-accent-2/20 to-success/10",
  },
];

export function CaseStudies() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Work"
        title="Case studies"
        description="A few projects we're proud of. Real clients, real results."
      />
      <Stagger className="grid md:grid-cols-3 gap-6" stagger={0.1}>
        {cases.map((c) => (
          <StaggerItem key={c.slug}>
            <Link href={`/portfolio/${c.slug}`} className="group block h-full">
              <TiltCard intensity={5} glare={false} className="h-full rounded-2xl border border-border overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 flex flex-col bg-surface">
                {/* Cover gradient */}
                <div className={`h-44 bg-gradient-to-br ${c.color} flex items-end p-5`}>
                  <span className="font-display font-bold text-xl text-text/90">{c.metric}</span>
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1 bg-surface">
                  <p className="text-xs text-muted font-medium">{c.client}</p>
                  <h3 className="font-display font-semibold text-lg text-text">
                    {c.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed flex-1">
                    {c.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {c.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-accent text-sm font-medium pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read case study <ArrowRight size={14} />
                  </div>
                </div>
              </TiltCard>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
      <div className="text-center mt-10">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
        >
          View all projects <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  );
}
