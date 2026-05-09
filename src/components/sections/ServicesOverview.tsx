import Link from "next/link";
import { Bot, Code2, Package, TrendingUp, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { TiltCard } from "@/components/ui/TiltCard";

const services = [
  {
    icon: Bot,
    title: "AI Agents & Automation",
    description:
      "Custom LLM-powered agents that automate workflows, handle customer queries, and make your business operate at superhuman speed.",
    href: "/services#ai-agents",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Code2,
    title: "Custom Development",
    description:
      "Full-stack web and mobile applications built with the latest tech. From MVP to enterprise-grade systems, we ship fast.",
    href: "/services#development",
    color: "text-accent-2",
    bg: "bg-accent-2/10",
  },
  {
    icon: Package,
    title: "Our SaaS Products",
    description:
      "Battle-tested in-house SaaS tools available for your team. Proven solutions you can deploy on day one.",
    href: "/products",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing & SEO",
    description:
      "Data-driven growth strategies, content marketing, SEO, and paid acquisition to get your product in front of the right people.",
    href: "/services#marketing",
    color: "text-success",
    bg: "bg-success/10",
  },
];

export function ServicesOverview() {
  return (
    <Section>
      <SectionHeader
        eyebrow="What we do"
        title="Everything your product needs to succeed"
        description="From AI to marketing, we cover the full product lifecycle so you never have to switch vendors."
      />
      <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
        {services.map((s) => (
          <StaggerItem key={s.title}>
            <Link href={s.href} className="group block h-full">
              <TiltCard intensity={6} className="h-full">
                <Card hover className="h-full flex flex-col gap-4">
                  <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center`}>
                    <s.icon size={24} className={s.color} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-text">
                    {s.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed flex-1">
                    {s.description}
                  </p>
                  <div className="flex items-center gap-1 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight size={14} />
                  </div>
                </Card>
              </TiltCard>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
