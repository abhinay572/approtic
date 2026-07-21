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
    slug: "triprank",
    title: "TripRank – Speed Tracker & Camera Alerts",
    client: "Approtic (In-house)",
    category: "Mobile",
    description:
      "Pro-grade GPS speedometer for iPhone and iPad with real-time speed camera alerts, G-force telemetry, and shareable trip cards.",
    problem:
      "Drivers wanted a professional-grade speedometer with real-time speed camera warnings and trip analytics on iPhone — most existing apps were ad-heavy, ugly, or inaccurate.",
    solution:
      "Built a native iPhone and iPad app with a live GPS speedometer, a worldwide speed camera and traffic signal database via OpenStreetMap, G-force & braking telemetry, Dynamic Island and Live Activities integration, a global leaderboard, and AI-powered car photo styling.",
    result:
      "Live on the App Store for iPhone and iPad. Dynamic Island shows speed and camera countdowns without opening the app. Features a global leaderboard with QR-code friend system and Instagram-ready shareable trip cards.",
    metric: "Live on App Store",
    tags: ["iOS", "Swift", "SwiftUI", "CoreLocation", "OpenStreetMap", "AI"],
    color: "from-blue-600/30 to-cyan-500/20",
    liveUrl: "https://apps.apple.com/us/app/triprank-speed-tracker/id6760617806",
  },
  {
    slug: "resincraft",
    title: "ResinCraft – Resin Calculator",
    client: "Approtic (In-house)",
    category: "Mobile",
    description:
      "Paid iPhone app that calculates the exact amount of epoxy resin and hardener needed for any mold shape and brand — fully offline.",
    problem:
      "Resin artists consistently over- or under-poured expensive epoxy because mix ratios differ per brand and calculating volumes for irregular mold shapes by hand is error-prone.",
    solution:
      "Built a native iPhone app with calculators for 7 mold shapes (rectangle, disc, sphere, half-sphere, cylinder, cone, dome), pre-loaded ratios for 7+ major resin brands, Imperial/Metric toggle, adjustable safety margin, and project preset saving — all offline, no account required.",
    result:
      "Published at $4.99 on the App Store. Serves resin jewelry makers, river-table builders, geode coaster artists, and tumbler crafters globally. Zero ads, zero tracking, zero subscriptions.",
    metric: "$4.99 on App Store",
    tags: ["iOS", "Swift", "SwiftUI", "Offline-first"],
    color: "from-violet-600/30 to-indigo-700/20",
    liveUrl: "https://apps.apple.com/us/app/resincraft-resin-calculator/id6766811423",
  },
  {
    slug: "lock-screen-widgets",
    title: "Lock Screen Widgets & Wallpapers",
    client: "Approtic (In-house)",
    category: "Mobile",
    description:
      "All-in-one iPhone lock screen customisation app with thousands of wallpapers and a full widget suite — clocks, weather, calendar, battery, fitness rings, and more.",
    problem:
      "After iOS 16 unlocked lock screen widgets, iPhone users wanted beautiful personalised lock screens but had to download multiple apps for wallpapers, clocks, weather, and fitness widgets separately.",
    solution:
      "Built a free iPhone app combining a curated wallpaper library with a comprehensive widget suite — clocks, weather, calendar, fitness rings, battery indicator, and more — all customisable from a single place without touching the phone while unlocking.",
    result:
      "Live on the App Store as a free download. One of the most complete lock screen customisation apps available for iPhone, covering wallpapers and widgets in a single install.",
    metric: "Free on App Store",
    tags: ["iOS", "Swift", "SwiftUI", "WidgetKit"],
    color: "from-fuchsia-600/30 to-pink-500/20",
    liveUrl: "https://apps.apple.com/us/app/lock-screen-widgets-wallpaper/id6443518798",
  },
  {
    slug: "clone-it",
    title: "Clone It – Dual App & Browser",
    client: "Approtic (In-house)",
    category: "Mobile",
    description:
      "iPhone app that lets users run two accounts of any app simultaneously, plus a multi-session browser with isolated container tabs.",
    problem:
      "iPhone users managing multiple accounts — social media, email, messaging — had no native way to stay logged into both simultaneously, forcing constant log-in and log-out cycles.",
    solution:
      "Built a free iPhone app with a dual-app cloner and a multi-session browser using isolated container tabs, ensuring cookies and sessions from one account never bleed into another. Work and personal accounts stay completely separate.",
    result:
      "Live on the App Store as a free download. Used by social media managers, freelancers, and anyone running multiple logins on a single iPhone — with no artificial limit on the number of clones.",
    metric: "Free on App Store",
    tags: ["iOS", "Swift", "SwiftUI", "WKWebView"],
    color: "from-teal-600/30 to-emerald-500/20",
    liveUrl: "https://apps.apple.com/us/app/clone-it-dual-app-browser/id6744391293",
  },
];
