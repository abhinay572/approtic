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
  {
    slug: "triprank",
    name: "TripRank",
    subtitle: "Speed Tracker",
    tagline: "#1 Speed Tracker & Speed Camera Detector.",
    description:
      "Pro-grade GPS speedometer with real-time speed camera, traffic light & stop sign alerts. Auto-log trips with G-force, braking & cornering stats. Share beautiful trip cards. No ads. On-device data.",
    price: "Free",
    category: "Navigation",
    platform: "iPhone & iPad",
    appStoreUrl:
      "https://apps.apple.com/us/app/triprank-speed-tracker/id6760617806",
    appStoreId: "6760617806",
    color: "from-blue-600 via-cyan-500 to-sky-700",
    accentColor: "text-cyan-400",
    icon: "🏎️",
    features: [
      {
        title: "Live GPS Speedometer",
        description:
          "Real-time speed with max and average, trip distance, duration, altitude, and live route mapping.",
      },
      {
        title: "Speed Camera Alerts",
        description:
          "Fixed, mobile, red-light and average-speed cameras worldwide via OpenStreetMap. 500m countdowns, haptic feedback.",
      },
      {
        title: "Traffic Signal Detection",
        description:
          "Detect traffic lights, stop signs, and pedestrian crossings ahead with colour-coded pins and distance warnings.",
      },
      {
        title: "G-Force & Telemetry",
        description:
          "Acceleration, braking, and cornering intensity measured in real time. Full driving behaviour analysis per trip.",
      },
      {
        title: "Dynamic Island & Live Activity",
        description:
          "Speed, alerts, and camera countdowns on your Lock Screen and Dynamic Island — without opening the app.",
      },
      {
        title: "Global Leaderboard",
        description:
          "Compete worldwide on top speed, total distance, and trip count. Add friends via QR code or profile link.",
      },
      {
        title: "Shareable Trip Cards",
        description:
          "Every trip becomes an Instagram-ready stat card with route map, key data, and personal branding.",
      },
      {
        title: "AI Car Mod",
        description:
          "Transform any car photo with AI — Off-Road, Racing, Lowrider, Luxury, Cyberpunk, Classic styles.",
      },
    ],
    perfectFor: [
      "Car enthusiasts who want professional-grade trip data",
      "Daily commuters tracking routes and driving habits",
      "Weekend drivers and road-trip fans",
      "Anyone who wants camera and signal alerts while driving",
      "Drivers who love to share their stats with their community",
    ],
    disclaimer:
      "TripRank is for informational purposes only. Never interact with the app while driving. Always obey speed limits and traffic laws. GPS accuracy may vary.",
    contact: "support@approtic.in",
  },
];

export function getApp(slug: string): AppData | undefined {
  return apps.find((a) => a.slug === slug);
}
