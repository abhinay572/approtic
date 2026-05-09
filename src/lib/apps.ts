export interface AppData {
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  price: string;
  category: string;
  platform: string;
  appStoreUrl: string;
  appStoreId: string;
  color: string; // tailwind gradient classes
  accentColor: string; // tailwind text color
  icon: string; // emoji fallback
  features: { title: string; description: string }[];
  perfectFor: string[];
  disclaimer?: string;
  contact: string;
  privacyNotion?: string;
  termsNotion?: string;
}

export const apps: AppData[] = [
  {
    slug: "resincraft",
    name: "ResinCraft",
    subtitle: "Resin Calculator",
    tagline: "Accurate epoxy resin calculations made simple.",
    description:
      "The fastest way to calculate exactly how much epoxy resin you need for any mold. Pre-loaded ratios for ArtResin, Pro Marine, MAS, EnviroTex and more. Pick a mold shape, enter the dimensions, and get the exact amount of resin and hardener you need — in any unit, for any brand.",
    price: "$4.99",
    category: "Utilities",
    platform: "iPhone",
    appStoreUrl:
      "https://apps.apple.com/us/app/resincraft-resin-calculator/id6766811423",
    appStoreId: "6766811423",
    color: "from-violet-600 via-purple-600 to-indigo-700",
    accentColor: "text-violet-400",
    icon: "🔮",
    features: [
      {
        title: "7 Mold Shape Calculators",
        description:
          "Rectangle, disc, sphere, half-sphere, cylinder, cone, and dome — cover every project you'll ever pour.",
      },
      {
        title: "Pre-loaded Brand Ratios",
        description:
          "ArtResin, Pro Marine, Stone Coat, EnviroTex, MAS, Ecopoxy, TotalBoat — or enter a custom ratio.",
      },
      {
        title: "Imperial & Metric",
        description:
          "Switch between fl oz / mL and inches / cm with a single tap. No manual conversions.",
      },
      {
        title: "Save & Reuse Projects",
        description:
          "Save your mold presets with notes and reload them anytime. Build your personal project library.",
      },
      {
        title: "Adjustable Safety Margin",
        description:
          "Set 0–20% overage to account for waste and spillage. Never run short mid-pour again.",
      },
      {
        title: "100% Offline",
        description:
          "No account, no tracking, no ads. Your data stays on your device. Works anywhere, even in your studio.",
      },
    ],
    perfectFor: [
      "Resin jewelry makers — pendants, cabochons, beads",
      "Tumbler crafters",
      "River-table builders",
      "Geode coaster artists",
      "Anyone tired of pouring too much or too little",
    ],
    disclaimer:
      "ResinCraft uses standard geometric formulas and brand-published mix ratios. Always cross-reference your manufacturer's instructions before pouring, and use proper PPE (gloves, ventilation) when working with epoxy.",
    contact: "abhinay@approtic.in",
  },
];

export function getApp(slug: string): AppData | undefined {
  return apps.find((a) => a.slug === slug);
}
