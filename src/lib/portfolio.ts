export interface Project {
  slug: string;
  title: string;
  client: string;
  category: "AI" | "Web" | "Mobile" | "SaaS";
  description: string;
  problem: string;
  solution: string;
  result: string;
  metric: string;
  tags: string[];
  color: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "ai-customer-support",
    title: "AI Customer Support Agent",
    client: "FinBridge",
    category: "AI",
    description:
      "Deployed an LLM-powered support agent that handles 80% of incoming tickets autonomously.",
    problem:
      "FinBridge was spending 40 hours per week on repetitive tier-1 support. Customers waited 8+ hours for responses. The support team was burning out.",
    solution:
      "We built a custom RAG-based AI agent trained on their knowledge base, product docs, and historical ticket resolutions. Integrated with their existing Intercom setup with a clean human-handoff flow.",
    result:
      "80% of tickets resolved without human intervention. Average response time dropped from 8 hours to 90 seconds. Support team now focuses on complex, high-value issues.",
    metric: "80% automation",
    tags: ["AI Agents", "LangChain", "OpenAI", "Next.js", "Supabase"],
    color: "from-accent/30 to-accent-2/20",
  },
  {
    slug: "ecommerce-platform",
    title: "Multi-vendor E-commerce Platform",
    client: "NestMart",
    category: "Web",
    description:
      "A full-featured marketplace with vendor dashboards, real-time inventory, and AI product recommendations.",
    problem:
      "NestMart needed to scale from a single-vendor store to a multi-vendor marketplace. Their existing platform couldn't handle multiple sellers, live inventory, or personalised recommendations.",
    solution:
      "Built a Next.js marketplace with Supabase for multi-tenant data, Stripe Connect for vendor payouts, and a recommendation engine using collaborative filtering.",
    result:
      "GMV grew 3× in 6 months post-launch. 120 vendors onboarded in the first quarter. Conversion rate improved 40% from personalised recommendations.",
    metric: "3× GMV growth",
    tags: ["Next.js", "Supabase", "Stripe Connect", "TypeScript"],
    color: "from-purple-500/30 to-accent/20",
  },
  {
    slug: "saas-analytics",
    title: "SaaS Analytics Dashboard",
    client: "EduFlow",
    category: "SaaS",
    description: "Real-time analytics platform serving 50K+ daily active users.",
    problem:
      "EduFlow's legacy reporting system was running nightly batch jobs. Teachers and admins needed real-time data on student engagement to intervene early.",
    solution:
      "Rebuilt the entire analytics stack with streaming data ingestion, a React dashboard with real-time WebSocket updates, and AI-powered anomaly detection.",
    result:
      "50K+ DAU on launch day. Query times improved from 45 seconds to under 200ms. Early-intervention rate increased 60%, improving student outcomes.",
    metric: "50K+ DAU",
    tags: ["React", "Python", "PostgreSQL", "Redis", "WebSockets"],
    color: "from-success/20 to-accent-2/20",
  },
  {
    slug: "mobile-health-app",
    title: "AI Health & Wellness App",
    client: "WellPath",
    category: "Mobile",
    description: "Personalised wellness coaching app with AI-driven habit tracking.",
    problem:
      "Generic wellness apps have 80% churn in the first month. WellPath needed an app that adapts to each user and keeps them coming back.",
    solution:
      "React Native app with an AI coach that learns from user behaviour, adjusts daily plans, and sends smart nudges at the right moment using predictive engagement.",
    result:
      "Day-30 retention of 42% vs. 18% industry average. 4.8★ App Store rating. Named India's top wellness app of the year by TechCircle.",
    metric: "42% D30 retention",
    tags: ["React Native", "Python", "Claude AI", "Firebase"],
    color: "from-pink-500/20 to-accent/20",
  },
];
