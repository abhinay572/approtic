import type { Metadata } from "next";
import { Bot, Code2, Package, TrendingUp, Palette, Megaphone, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "From AI agents and custom software to SaaS products and digital marketing — Approtic offers the full spectrum of modern product-building services.",
  path: "/services",
});

const services = [
  {
    id: "ai-agents",
    icon: Bot,
    title: "AI Agents & Automation",
    tagline: "Replace repetitive work with intelligent automation",
    description:
      "We design and deploy custom AI agents using LangChain, OpenAI, and Anthropic Claude. From customer support bots to internal workflow automation, our agents work 24/7 so your team doesn't have to.",
    deliverables: [
      "Custom LLM-powered chatbots",
      "Workflow automation pipelines",
      "RAG knowledge-base systems",
      "AI email/inbox management",
      "Automated lead qualification",
      "Data extraction & summarisation",
    ],
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    id: "development",
    icon: Code2,
    title: "Custom Software Development",
    tagline: "From idea to production in weeks, not months",
    description:
      "Full-stack web and mobile applications built with Next.js, React Native, Python, and Supabase. We handle everything from architecture to deployment — and stay on to maintain it.",
    deliverables: [
      "Web applications (Next.js / React)",
      "Mobile apps (React Native)",
      "REST & GraphQL APIs",
      "Database design & migrations",
      "Cloud infrastructure (AWS / Vercel)",
      "CI/CD & DevOps setup",
    ],
    color: "text-accent-2",
    bg: "bg-accent-2/10",
  },
  {
    id: "saas",
    icon: Package,
    title: "SaaS Product Development",
    tagline: "Launch your SaaS with a team that has done it before",
    description:
      "From idea validation and MVP to full multi-tenant SaaS. We've built and launched our own products so we know exactly what it takes to ship fast and monetise effectively.",
    deliverables: [
      "MVP in 4–6 weeks",
      "Multi-tenant architecture",
      "Stripe billing & subscriptions",
      "User onboarding flows",
      "Admin dashboards",
      "Analytics & funnel tracking",
    ],
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Digital Marketing & SEO",
    tagline: "Grow your audience, not just your traffic",
    description:
      "Data-driven growth: SEO audits, content strategy, paid acquisition, and conversion rate optimisation. We work backward from your revenue targets and build the funnel to hit them.",
    deliverables: [
      "Technical SEO audit & fixes",
      "Content strategy & blog",
      "Google & Meta paid ads",
      "Conversion rate optimisation",
      "Email marketing automation",
      "Monthly reporting & iteration",
    ],
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    id: "branding",
    icon: Palette,
    title: "Branding & Design",
    tagline: "First impressions that last",
    description:
      "Brand identity, UI/UX design, and visual systems that make your product look like the market leader — even before you are one.",
    deliverables: [
      "Logo & brand identity",
      "UI/UX design (Figma)",
      "Design system & components",
      "Landing page design",
      "Pitch deck design",
      "Motion design",
    ],
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    id: "growth",
    icon: Megaphone,
    title: "Product Growth & Analytics",
    tagline: "Ship fast, measure everything, iterate relentlessly",
    description:
      "We instrument your product with the right analytics stack, run growth experiments, and help you understand what your users actually do — not just what they say they do.",
    deliverables: [
      "Analytics setup (GA4, Mixpanel)",
      "A/B testing framework",
      "Funnel analysis",
      "User interview synthesis",
      "Feature prioritisation",
      "OKR & metrics coaching",
    ],
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.description,
      provider: { "@type": "Organization", name: "Approtic" },
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <Section className="pt-32 pb-10">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="accent" className="mb-6">What we offer</Badge>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-text leading-tight mb-6">
            Services built for the AI era
          </h1>
          <p className="text-muted text-xl leading-relaxed mb-8">
            We're not a generalist agency. Every service we offer is designed around the
            modern AI-first stack — so you get results faster than traditional studios.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="gradient">
              Start a project <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </Section>

      {/* Services */}
      <Section>
        <div className="space-y-12">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={0.05}>
              <Card
                id={s.id}
                className="grid md:grid-cols-2 gap-8 p-8 sm:p-10 scroll-mt-20"
                gradient
              >
                <div className="flex flex-col gap-5">
                  <div className={`w-14 h-14 rounded-2xl ${s.bg} flex items-center justify-center`}>
                    <s.icon size={28} className={s.color} />
                  </div>
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${s.color}`}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="font-display text-2xl font-bold text-text mb-2">
                      {s.title}
                    </h2>
                    <p className="text-accent-2 text-sm font-medium mb-4">{s.tagline}</p>
                    <p className="text-muted leading-relaxed">{s.description}</p>
                  </div>
                  <Link href="/contact" className="mt-auto">
                    <Button variant="outline" size="sm">
                      Start this service <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>

                {/* Deliverables */}
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
                    What you get
                  </p>
                  {s.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-success shrink-0" />
                      <span className="text-text text-sm">{d}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
