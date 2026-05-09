export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  tags: string[];
  status: "live" | "beta" | "coming-soon";
  url?: string;
  color: string;
}

export const products: Product[] = [
  {
    slug: "approbot",
    name: "ApproBot",
    tagline: "AI customer support on autopilot",
    description:
      "A plug-and-play AI support agent for SaaS companies. Train it on your docs, deploy it to your site, and watch support tickets plummet. GPT-4o powered with human-handoff built in.",
    features: [
      "Train on your own documentation",
      "Multi-channel: web, WhatsApp, email",
      "Human handoff with full context",
      "Analytics & resolution tracking",
      "GDPR-compliant data handling",
    ],
    tags: ["AI", "SaaS", "Support"],
    status: "live",
    url: "https://approbot.approtic.in",
    color: "from-accent/30 to-accent-2/10",
  },
  {
    slug: "launchpad",
    name: "LaunchPad",
    tagline: "Ship your next SaaS in days",
    description:
      "A production-ready Next.js + Supabase boilerplate with auth, billing, emails, and admin dashboard baked in. Stop rebuilding the same infrastructure and focus on your product.",
    features: [
      "Next.js 15 + TypeScript + Tailwind",
      "Supabase auth & database",
      "Stripe billing & webhooks",
      "Resend transactional email",
      "Admin dashboard included",
    ],
    tags: ["Dev Tool", "Next.js", "Boilerplate"],
    status: "live",
    url: "https://launchpad.approtic.in",
    color: "from-purple-500/30 to-accent/10",
  },
  {
    slug: "seolens",
    name: "SEOLens",
    tagline: "SEO audits powered by AI",
    description:
      "Automated weekly SEO audits that surface your biggest opportunities in plain English. No SEO jargon, just clear actions ranked by impact.",
    features: [
      "Automated weekly crawl",
      "AI-generated action items",
      "Core Web Vitals tracking",
      "Competitor gap analysis",
      "Slack / email digest",
    ],
    tags: ["SEO", "AI", "Analytics"],
    status: "beta",
    color: "from-success/20 to-accent-2/10",
  },
];
