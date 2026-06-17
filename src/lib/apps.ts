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
  // Privacy / Terms metadata
  dataTypes: Array<"none" | "location" | "camera" | "vpn" | "kids" | "health" | "cloud" | "photo">;
  hasSubscription: boolean;
  hasUserAccounts: boolean;
  locationUse?: string;
  cameraUse?: string;
  usesAI?: boolean;
}

export const apps: AppData[] = [
  {
    slug: "tomator-cal-ai",
    name: "Tomator Cal AI",
    subtitle: "AI Calorie Tracker",
    tagline: "Snap your meal. Know your calories & macros.",
    description:
      "Tomator Cal AI is the fastest way to track what you eat. Snap a photo of your meal and AI instantly identifies each food and estimates calories, protein, carbs and fat — with a 0–100 health score on every meal. Prefer to type or scan a barcode? Describe your meal in words or scan any packaged product. Track your day with calorie and macro rings, log water, follow your weight trend, keep a daily streak, and sync everything to Apple Health.",
    price: "Free",
    category: "Health & Fitness",
    platform: "iPhone",
    appStoreUrl: "https://apps.apple.com/app/id6780629589",
    appStoreId: "6780629589",
    color: "from-red-600 via-rose-500 to-orange-500",
    accentColor: "text-red-400",
    icon: "🍅",
    features: [
      { title: "AI Photo Scan", description: "Point your camera at any meal and AI identifies each food and estimates calories and macros in seconds." },
      { title: "Calories & Macros Instantly", description: "Accurate calorie, protein, carb and fat estimates with sensible serving sizes for every item." },
      { title: "Health Score on Every Meal", description: "A 0–100 score shows how healthy a meal really is, with fiber, sugar and sodium highlights." },
      { title: "Barcode Scanner", description: "Scan any packaged product for instant nutrition facts, powered by the Open Food Facts database." },
      { title: "Describe & Log", description: "Too busy to snap a photo? Just type what you ate and AI does the math for you." },
      { title: "Progress & Apple Health", description: "Track your weight trend and weekly calories, keep a daily streak, and sync to Apple Health." },
    ],
    perfectFor: [
      "Anyone counting calories or macros for weight loss",
      "People who find manual food logging too slow",
      "Gym-goers tracking protein and daily macros",
      "Anyone who wants a quick health score on what they eat",
    ],
    disclaimer:
      "Tomator Cal AI provides general wellness and nutrition estimates for informational purposes only and is not medical advice. AI calorie and macro estimates may be inaccurate. Consult a qualified professional before making dietary, fitness, or health decisions.",
    contact: "support@approtic.in",
    dataTypes: ["camera", "photo", "health", "cloud"],
    hasSubscription: true,
    hasUserAccounts: false,
    cameraUse:
      "used to photograph your meals for AI nutrition analysis and to scan product barcodes. Meal photos are sent securely to our AI processing provider only to identify foods and estimate nutrition; they are not stored on our servers after processing and are never used to identify you.",
    usesAI: true,
  },
  {
    slug: "routeflow",
    name: "RouteFlow",
    subtitle: "Route Planner",
    tagline: "Plan, optimize and drive multi-stop routes in seconds.",
    description:
      "RouteFlow is the fastest way for delivery drivers, couriers and field teams to plan and run multi-stop routes. Add all your stops, let RouteFlow find the optimal order, and drive with built-in turn-by-turn navigation, live speed-camera alerts and proof of delivery.",
    price: "Subscription",
    category: "Navigation",
    platform: "iPhone",
    appStoreUrl: "https://apps.apple.com/app/id6774729420",
    appStoreId: "6774729420",
    color: "from-cyan-500 via-sky-600 to-blue-700",
    accentColor: "text-cyan-400",
    icon: "\u{1F69A}",
    features: [
      { title: "Smart Route Optimization", description: "Visit every stop in the shortest, most fuel-efficient order — saving hours every week." },
      { title: "Built-in Turn-by-Turn Navigation", description: "A real in-app map with voice guidance. Prefer Apple Maps, Google Maps or Waze? Hand off any stop with one tap." },
      { title: "Live Speed-Camera Alerts", description: "See fixed and average-speed cameras on the map and drive aware." },
      { title: "Proof of Delivery", description: "Capture a photo and signature at every door, then share it with the customer." },
      { title: "Live Location Sharing", description: "Share a private link so customers can follow your arrival in real time." },
      { title: "ETA, Distance & Fuel Up Front", description: "Know your arrival time and estimated fuel cost before you leave." },
    ],
    perfectFor: [
      "Delivery drivers and couriers",
      "Field service and sales teams",
      "Last-mile and logistics operators",
      "Anyone running multi-stop routes every day",
    ],
    contact: "abhinay@approtic.in",
    dataTypes: ["location", "camera", "photo", "cloud"],
    hasSubscription: true,
    hasUserAccounts: false,
    locationUse:
      "used to set your start point, optimize the order of your stops, guide you turn-by-turn, and show your current speed. Your location is processed on your device and is only sent to our server when you choose to share a live trip link so the people you pick can follow your arrival; that link auto-expires about 30 minutes after you stop sharing.",
    cameraUse:
      "used only when you capture proof-of-delivery photos and a signature at a stop. These are stored on your device and are shared only when you choose to send them to a customer. RouteFlow does not process your photos with AI.",
    usesAI: false,
    disclaimer:
      "RouteFlow is a planning and navigation aid, not a substitute for safe driving or your own judgement. Obey all traffic laws and posted speed limits, and do not interact with the App while your vehicle is in motion. Routes, ETAs, traffic conditions, and speed-camera information are estimates and may be inaccurate or out of date. You are solely responsible for your driving, your route choices, and your compliance with the law.",
  },
  // ── EXISTING ──────────────────────────────────────────────────────────────
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
    appStoreUrl: "https://apps.apple.com/us/app/resincraft-resin-calculator/id6766811423",
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
    dataTypes: ["none"],
    hasSubscription: false,
    hasUserAccounts: false,
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
    appStoreUrl: "https://apps.apple.com/us/app/triprank-speed-tracker/id6760617806",
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
    dataTypes: ["location", "cloud"],
    hasSubscription: true,
    hasUserAccounts: true,
  },

  // ── VIIONR APPS ───────────────────────────────────────────────────────────
  {
    slug: "tomator-vpn",
    name: "Tomator VPN",
    subtitle: "Fast & Secure VPN",
    tagline: "Private internet access in one tap.",
    description:
      "Tomator VPN gives you a fast, encrypted connection with a single tap. Mask your IP, secure public Wi-Fi, and browse freely on any network. Lightweight, battery-friendly, and completely free.",
    price: "Free",
    category: "Utilities",
    platform: "iPhone & iPad",
    appStoreUrl: "https://apps.apple.com/us/app/tomator-vpn/id1572986681",
    appStoreId: "1572986681",
    color: "from-slate-600 via-zinc-700 to-gray-800",
    accentColor: "text-slate-400",
    icon: "🔒",
    features: [
      {
        title: "One-Tap Connection",
        description: "Connect or disconnect instantly. No complicated setup or configuration required.",
      },
      {
        title: "IP Masking",
        description: "Hide your real IP address and browse with a private identity on any network.",
      },
      {
        title: "Encrypted Tunnel",
        description: "Military-grade encryption protects your traffic from snoopers on public Wi-Fi.",
      },
      {
        title: "Multiple Server Locations",
        description: "Choose from servers in multiple regions for the best speed and access.",
      },
      {
        title: "Battery Friendly",
        description: "Optimised for minimal battery drain so your VPN stays on all day.",
      },
      {
        title: "No Logs Policy",
        description: "We do not store, monitor, or share your browsing activity.",
      },
    ],
    perfectFor: [
      "Anyone using public Wi-Fi at cafes, airports, or hotels",
      "Privacy-conscious users who want to hide their IP",
      "Users who want a lightweight VPN without subscription fees",
      "Travellers needing secure connections abroad",
    ],
    contact: "support@approtic.in",
    dataTypes: ["vpn"],
    hasSubscription: false,
    hasUserAccounts: false,
  },
  {
    slug: "clone-it",
    name: "Clone It",
    subtitle: "Dual App & Browser",
    tagline: "Run two accounts of any app, side by side.",
    description:
      "Clone It lets you duplicate any installed app so you can run two accounts simultaneously. Includes a built-in multi-session browser with isolated container tabs — perfect for keeping work and personal accounts completely separate.",
    price: "Free",
    category: "Utilities",
    platform: "iPhone",
    appStoreUrl: "https://apps.apple.com/us/app/clone-it-dual-app-browser/id6744391293",
    appStoreId: "6744391293",
    color: "from-teal-600 via-emerald-500 to-green-600",
    accentColor: "text-emerald-400",
    icon: "📱",
    features: [
      {
        title: "Dual App Cloner",
        description: "Create a clone of any installed app and log in with a different account.",
      },
      {
        title: "Multi-Session Browser",
        description: "Browse in multiple isolated containers — different cookies and sessions per tab.",
      },
      {
        title: "Work / Personal Separation",
        description: "Keep professional and private accounts completely separate without logging in and out.",
      },
      {
        title: "No Device Limit",
        description: "Clone as many apps as you need. No artificial limits on the number of clones.",
      },
      {
        title: "Lightweight & Fast",
        description: "Minimal footprint — clones launch quickly and don't slow down your device.",
      },
      {
        title: "Privacy Containers",
        description: "Each browser session is isolated, so cookies from one container never leak to another.",
      },
    ],
    perfectFor: [
      "People managing multiple social media accounts",
      "Freelancers keeping work and personal apps separate",
      "Anyone who needs two logins for the same app",
      "Users who want isolated browsing sessions",
    ],
    contact: "support@approtic.in",
    dataTypes: ["none"],
    hasSubscription: false,
    hasUserAccounts: false,
  },
  {
    slug: "lock-screen-widgets",
    name: "Lock Screen Widgets",
    subtitle: "Wallpapers & Widgets",
    tagline: "Make your lock screen truly yours.",
    description:
      "Thousands of stunning wallpapers and a full suite of iOS lock screen widgets — clocks, weather, calendar, fitness rings, battery, and more. Customise every pixel of your lock screen without touching your phone while unlocking.",
    price: "Free",
    category: "Productivity",
    platform: "iPhone",
    appStoreUrl: "https://apps.apple.com/us/app/lock-screen-widgets-wallpaper/id6443518798",
    appStoreId: "6443518798",
    color: "from-fuchsia-600 via-pink-500 to-rose-500",
    accentColor: "text-fuchsia-400",
    icon: "🎨",
    features: [
      {
        title: "Thousands of Wallpapers",
        description: "Curated 4K wallpapers updated regularly — nature, abstract, minimal, neon, and more.",
      },
      {
        title: "Lock Screen Widgets",
        description: "Add clock, date, weather, battery, steps, and calendar widgets directly to your lock screen.",
      },
      {
        title: "Custom Fonts & Colours",
        description: "Choose from dozens of clock fonts and colour themes to match your wallpaper perfectly.",
      },
      {
        title: "Always-On Display",
        description: "AOD-friendly designs optimised for iPhone 14 Pro and later models.",
      },
      {
        title: "Live Weather Widget",
        description: "Real-time temperature and conditions displayed on your lock screen at a glance.",
      },
      {
        title: "One-Tap Apply",
        description: "Preview and apply any wallpaper + widget combination to your lock screen instantly.",
      },
    ],
    perfectFor: [
      "iPhone users who love personalising their home screen",
      "Productivity fans who want quick info on the lock screen",
      "Aesthetics-focused users who change wallpapers frequently",
      "Anyone who wants a beautiful, information-rich lock screen",
    ],
    contact: "support@approtic.in",
    dataTypes: ["none"],
    hasSubscription: true,
    hasUserAccounts: false,
  },
  {
    slug: "kiddie-ai",
    name: "Kiddie AI",
    subtitle: "Safe AI for Kids",
    tagline: "A safe, smart AI companion for children aged 4–12.",
    description:
      "Kiddie AI is a child-safe artificial intelligence assistant designed for children aged 4 to 12. It features age-appropriate chat, voice interaction, creative art generation, and educational Q&A — all behind a parent-controlled environment with robust safety filters.",
    price: "Free",
    category: "Education",
    platform: "iPhone & iPad",
    appStoreUrl: "https://apps.apple.com/us/app/kiddie-ai-safe-ai-for-kids/id6762079290",
    appStoreId: "6762079290",
    color: "from-yellow-500 via-amber-400 to-orange-500",
    accentColor: "text-amber-400",
    icon: "🧒",
    features: [
      {
        title: "Child-Safe AI Chat",
        description: "All responses are filtered for age-appropriate content. No harmful, scary, or adult content ever.",
      },
      {
        title: "Voice Interaction",
        description: "Kids can speak their questions and hear answers read back — perfect for early readers.",
      },
      {
        title: "Creative Art Generator",
        description: "Children can describe a scene and watch an AI illustration come to life in seconds.",
      },
      {
        title: "Educational Q&A",
        description: "Homework help, science questions, and creative storytelling — all explained at the right level.",
      },
      {
        title: "Parent Controls",
        description: "Set daily usage limits, review conversation history, and enable or disable features from the parent dashboard.",
      },
      {
        title: "No Ads, No Tracking",
        description: "No advertising, no third-party tracking, and no personal data harvested from children.",
      },
    ],
    perfectFor: [
      "Parents looking for a safe AI app for their child",
      "Kids aged 4–12 curious about the world",
      "Parents who want homework help without unsafe searches",
      "Families who want screen time that is educational and creative",
    ],
    disclaimer:
      "Kiddie AI is designed for children aged 4–12. Parents should set up the app and review parent controls before handing it to a child. AI-generated content may occasionally be imperfect — parental oversight is always recommended.",
    contact: "support@approtic.in",
    dataTypes: ["kids", "cloud"],
    hasSubscription: true,
    hasUserAccounts: false,
  },
  {
    slug: "g-keyboard",
    name: "G Keyboard",
    subtitle: "AI Keyboard",
    tagline: "Type smarter with AI grammar, autocorrect, and translation.",
    description:
      "G Keyboard supercharges your iOS keyboard with AI-powered grammar correction, smart autocomplete, and real-time translation into 50+ languages. Write better emails, messages, and social posts without leaving any app.",
    price: "Free",
    category: "Productivity",
    platform: "iPhone",
    appStoreUrl: "https://apps.apple.com/us/app/g-keyboard-ai-keyboard/id6754501008",
    appStoreId: "6754501008",
    color: "from-emerald-600 via-green-500 to-teal-600",
    accentColor: "text-emerald-400",
    icon: "⌨️",
    features: [
      {
        title: "AI Grammar Correction",
        description: "Fix grammar, punctuation, and style errors in real time as you type.",
      },
      {
        title: "Smart Autocomplete",
        description: "AI-powered next-word prediction that learns your writing style over time.",
      },
      {
        title: "50+ Language Translation",
        description: "Translate any text inline — type in English, send in Spanish, French, Hindi, or 50+ other languages.",
      },
      {
        title: "Tone Rewriter",
        description: "Rewrite your text as formal, casual, confident, or friendly with one tap.",
      },
      {
        title: "Works in Any App",
        description: "Replaces your default keyboard — works in Messages, WhatsApp, Mail, Instagram, and every other app.",
      },
      {
        title: "Privacy First",
        description: "Typed text is processed to improve suggestions but never stored or sold to third parties.",
      },
    ],
    perfectFor: [
      "Non-native English speakers who want polished writing",
      "Professionals who need to communicate across languages",
      "Anyone who types a lot and wants a smarter keyboard",
      "Students and writers who want instant grammar feedback",
    ],
    contact: "support@approtic.in",
    dataTypes: ["cloud"],
    hasSubscription: true,
    hasUserAccounts: false,
  },
  {
    slug: "color-picker",
    name: "Color Picker",
    subtitle: "AI Color Identifier",
    tagline: "Identify any colour with your camera and build beautiful palettes.",
    description:
      "Point your camera at anything in the real world and Color Picker instantly identifies the colour, gives you its hex, RGB, HSL, and CMYK values, and lets you save it to a palette. AI-powered palette generation creates harmonious colour schemes from a single photo.",
    price: "Free",
    category: "Productivity",
    platform: "iPhone",
    appStoreUrl: "https://apps.apple.com/us/app/color-picker-ai-color-id/id6755650062",
    appStoreId: "6755650062",
    color: "from-orange-500 via-amber-400 to-yellow-500",
    accentColor: "text-orange-400",
    icon: "🎨",
    features: [
      {
        title: "Camera Colour Detection",
        description: "Point and tap to instantly identify any colour in the real world with high accuracy.",
      },
      {
        title: "Full Colour Codes",
        description: "Get hex, RGB, HSL, HSB, CMYK, and Pantone-approximate values for every colour.",
      },
      {
        title: "AI Palette Builder",
        description: "Upload any photo and AI extracts the dominant colour palette automatically.",
      },
      {
        title: "Harmony Generator",
        description: "Generate complementary, analogous, triadic, and split-complementary colour schemes from any base colour.",
      },
      {
        title: "Save & Organise",
        description: "Save colours and palettes to your personal library and export them to design tools.",
      },
      {
        title: "Colour Name Database",
        description: "Every colour is matched to the closest named colour across 15,000+ colour names.",
      },
    ],
    perfectFor: [
      "Designers who spot inspiring colours in the real world",
      "Interior decorators matching paint and fabric colours",
      "Artists building reference colour palettes",
      "Developers who need exact hex codes from reference images",
      "Anyone obsessed with colour",
    ],
    contact: "support@approtic.in",
    dataTypes: ["camera"],
    hasSubscription: false,
    hasUserAccounts: false,
  },
  {
    slug: "webmate",
    name: "WebMate",
    subtitle: "Multi-AI Chat Manager",
    tagline: "Chat with ChatGPT, Gemini, and Claude in one place.",
    description:
      "WebMate brings together the world's leading AI assistants — ChatGPT, Google Gemini, and Claude — into a single beautifully designed app. Switch between AI models mid-conversation, compare responses, and manage all your AI chats without juggling multiple apps.",
    price: "Free",
    category: "Entertainment",
    platform: "iPhone & iPad",
    appStoreUrl: "https://apps.apple.com/us/app/webmate-multi-ai-chat/id6746369379",
    appStoreId: "6746369379",
    color: "from-purple-600 via-violet-500 to-indigo-600",
    accentColor: "text-violet-400",
    icon: "🤖",
    features: [
      {
        title: "All AI Models in One App",
        description: "Access ChatGPT (OpenAI), Gemini (Google), and Claude (Anthropic) from a single interface.",
      },
      {
        title: "Side-by-Side Comparison",
        description: "Ask the same question to multiple AIs and compare answers instantly.",
      },
      {
        title: "Conversation History",
        description: "All your chats are saved and searchable — never lose an important AI conversation.",
      },
      {
        title: "Custom Prompts Library",
        description: "Save your favourite prompts and re-use them across any AI model with one tap.",
      },
      {
        title: "Smart Model Routing",
        description: "Automatically suggests the best AI model for your task — coding, writing, analysis, or creativity.",
      },
      {
        title: "Privacy Mode",
        description: "Incognito chats that are never saved to history or synced to the cloud.",
      },
    ],
    perfectFor: [
      "AI power users who want the best tool for every task",
      "Researchers comparing AI model outputs",
      "Writers and creatives who use AI as a thinking partner",
      "Developers looking for coding help across different models",
    ],
    contact: "support@approtic.in",
    dataTypes: ["cloud"],
    hasSubscription: true,
    hasUserAccounts: false,
  },
  {
    slug: "photorevive",
    name: "PhotoRevive",
    subtitle: "AI Photo Restoration",
    tagline: "Bring old and faded photos back to life with AI.",
    description:
      "PhotoRevive uses cutting-edge AI to restore, enhance, and colourize old photographs. Remove scratches, repair damage, sharpen faded details, and add natural colour to black-and-white photos — in seconds, right on your device.",
    price: "Free",
    category: "Photo & Video",
    platform: "iPhone",
    appStoreUrl: "https://apps.apple.com/us/app/photorevive-ai-photo-restore/id6760752493",
    appStoreId: "6760752493",
    color: "from-rose-600 via-pink-500 to-orange-500",
    accentColor: "text-rose-400",
    icon: "🖼️",
    features: [
      {
        title: "AI Photo Restoration",
        description: "Automatically repair scratches, tears, stains, and damage in old photographs.",
      },
      {
        title: "Smart Colourization",
        description: "Add realistic, natural colour to black-and-white photos with AI that understands context.",
      },
      {
        title: "Face Enhancement",
        description: "Sharpen and restore faces in old photos — recover details even from low-resolution scans.",
      },
      {
        title: "Before & After View",
        description: "Swipe to compare the original and restored versions side by side.",
      },
      {
        title: "High-Resolution Export",
        description: "Export restored photos at full resolution, ready to print or frame.",
      },
      {
        title: "Batch Processing",
        description: "Restore multiple photos at once — perfect for digitising an entire family album.",
      },
    ],
    perfectFor: [
      "Families wanting to preserve and share old photos",
      "Photo enthusiasts restoring vintage prints",
      "Genealogy researchers recovering historical images",
      "Anyone with a box of faded memories to revive",
    ],
    contact: "support@approtic.in",
    dataTypes: ["photo"],
    hasSubscription: true,
    hasUserAccounts: false,
  },
  {
    slug: "fshot",
    name: "Fshot",
    subtitle: "AI Headshot Generator",
    tagline: "Professional headshots from a selfie — no photographer needed.",
    description:
      "Fshot transforms your selfies into studio-quality professional headshots using AI. Choose from corporate, creative, or LinkedIn styles. Get polished, professional photos in minutes — no appointment, no studio, no expensive photographer.",
    price: "Free",
    category: "Lifestyle",
    platform: "iPhone",
    appStoreUrl: "https://apps.apple.com/us/app/fshot-ai-headshot-generator/id6756127504",
    appStoreId: "6756127504",
    color: "from-fuchsia-600 via-purple-500 to-violet-600",
    accentColor: "text-fuchsia-400",
    icon: "📸",
    features: [
      {
        title: "Studio-Quality Headshots",
        description: "AI generates professional-grade headshots with natural lighting and polished backgrounds.",
      },
      {
        title: "Multiple Styles",
        description: "Corporate, creative, LinkedIn, business casual — choose the look that fits your brand.",
      },
      {
        title: "Background Replacement",
        description: "Place yourself in front of clean, professional backgrounds with a single tap.",
      },
      {
        title: "Clothing & Style Matching",
        description: "AI preserves your uploaded outfit while enhancing overall presentation.",
      },
      {
        title: "Fast Generation",
        description: "Get 20+ headshot variations in under 5 minutes — no waiting, no queues.",
      },
      {
        title: "High-Res Download",
        description: "Download all headshots at full resolution, print-ready and LinkedIn-optimised.",
      },
    ],
    perfectFor: [
      "Professionals who need a great LinkedIn photo",
      "Job seekers who want to make a strong first impression",
      "Freelancers building a personal brand",
      "Teams that want consistent headshot styles",
    ],
    contact: "support@approtic.in",
    dataTypes: ["photo", "cloud"],
    hasSubscription: true,
    hasUserAccounts: false,
  },
  {
    slug: "peptide-tracker",
    name: "Peptide Tracker",
    subtitle: "Dose & Reconstitution Calculator",
    tagline: "Precise peptide reconstitution and dosing made effortless.",
    description:
      "Peptide Tracker is the essential companion for anyone working with research peptides. Calculate exact reconstitution volumes, track vials, log doses, and set reminders — all with a clean, straightforward interface designed for accuracy.",
    price: "$4.99",
    category: "Medical",
    platform: "iPhone",
    appStoreUrl: "https://apps.apple.com/us/app/peptide-tracker-dose-calc/id6763797587",
    appStoreId: "6763797587",
    color: "from-cyan-600 via-teal-500 to-emerald-600",
    accentColor: "text-cyan-400",
    icon: "💉",
    features: [
      {
        title: "Reconstitution Calculator",
        description: "Enter peptide amount and desired concentration — get the exact bacteriostatic water volume instantly.",
      },
      {
        title: "Dose Calculator",
        description: "Calculate the precise syringe volume for any dose in mcg or mg without manual maths.",
      },
      {
        title: "Vial Tracker",
        description: "Log multiple vials, track remaining doses, and know exactly when each vial runs out.",
      },
      {
        title: "Dose Logging",
        description: "Record every dose with timestamp, amount, and notes. Build a complete history.",
      },
      {
        title: "Reminder Alerts",
        description: "Set recurring reminders for your dosing schedule — never miss a dose.",
      },
      {
        title: "100% Offline",
        description: "No account, no cloud, no data sharing. Everything stays on your device.",
      },
    ],
    perfectFor: [
      "Research professionals working with peptides",
      "Individuals tracking their own wellness protocols",
      "Anyone who needs precise reconstitution calculations",
      "Users who want a clean log of their dosing history",
    ],
    disclaimer:
      "Peptide Tracker is a calculation and logging tool for informational purposes only. It is not medical advice. Always consult a licensed medical professional before beginning any peptide protocol. The app does not prescribe, recommend, or endorse any substance.",
    contact: "support@approtic.in",
    dataTypes: ["health"],
    hasSubscription: false,
    hasUserAccounts: false,
  },

  // ── DIGITALSTALK APPS ─────────────────────────────────────────────────────
  {
    slug: "tor-browser-vpn",
    name: "Tor Browser VPN",
    subtitle: "Private Browser & VPN",
    tagline: "Anonymous browsing with WireGuard VPN and 90+ servers worldwide.",
    description:
      "Tor Browser VPN combines a private onion-style browser with a high-speed WireGuard VPN across 90+ servers in 55+ countries. Browse anonymously, bypass geo-restrictions, and protect your traffic on any network.",
    price: "Free",
    category: "Utilities",
    platform: "iPhone & iPad",
    appStoreUrl: "https://apps.apple.com/us/app/tor-browser-vpn/id1519420252",
    appStoreId: "1519420252",
    color: "from-slate-700 via-zinc-600 to-neutral-700",
    accentColor: "text-slate-400",
    icon: "🌐",
    features: [
      {
        title: "WireGuard VPN",
        description: "Fast, modern WireGuard protocol for the best combination of speed and security.",
      },
      {
        title: "90+ Servers, 55+ Countries",
        description: "A global network of servers so you can always find a fast, nearby connection.",
      },
      {
        title: "Private Browser",
        description: "Built-in browser that deletes cookies and history automatically after every session.",
      },
      {
        title: "Anonymous Browsing",
        description: "Your real IP is hidden from every website, tracker, and network observer.",
      },
      {
        title: "Geo-Restriction Bypass",
        description: "Access content and services from any region by connecting through a local server.",
      },
      {
        title: "No Logs",
        description: "We do not store your browsing activity, connection timestamps, or IP addresses.",
      },
    ],
    perfectFor: [
      "Privacy-conscious internet users",
      "Travellers needing to bypass geo-restrictions",
      "Users on public or untrusted Wi-Fi",
      "Journalists, researchers, and activists who need anonymity",
    ],
    contact: "support@approtic.in",
    dataTypes: ["vpn"],
    hasSubscription: true,
    hasUserAccounts: false,
  },
  {
    slug: "dualcamera",
    name: "DualCamera",
    subtitle: "Dual Video Recorder",
    tagline: "Record portrait and landscape simultaneously with both cameras.",
    description:
      "DualCamera lets you record with your iPhone's front and rear cameras at the same time. Capture your reaction and the scene simultaneously — perfect for vlogs, events, tutorials, and live moments.",
    price: "Free",
    category: "Photo & Video",
    platform: "iPhone",
    appStoreUrl: "https://apps.apple.com/us/app/dualcamera-dual-video-recorder/id6761681816",
    appStoreId: "6761681816",
    color: "from-red-600 via-rose-500 to-pink-600",
    accentColor: "text-rose-400",
    icon: "📹",
    features: [
      {
        title: "Front + Rear Simultaneous Recording",
        description: "Capture both cameras at the same time — your face and the scene, in one take.",
      },
      {
        title: "Picture-in-Picture Layout",
        description: "Overlay the secondary camera view as a resizable picture-in-picture window.",
      },
      {
        title: "Full HD Recording",
        description: "Both video streams recorded at full HD quality, saved as a single composed video.",
      },
      {
        title: "Flexible Layout Options",
        description: "Switch between side-by-side, top-bottom split, and PiP layouts.",
      },
      {
        title: "Reaction Mode",
        description: "Perfect for recording your reaction to videos, events, or surprises — real-time.",
      },
      {
        title: "Direct Share",
        description: "Share your dual-camera video directly to Instagram Reels, TikTok, or YouTube.",
      },
    ],
    perfectFor: [
      "Vloggers who want to capture both sides of every moment",
      "Content creators making reaction videos",
      "Tutors who need to show their face and their work simultaneously",
      "Event goers who want to capture the crowd and their own experience",
    ],
    contact: "support@approtic.in",
    dataTypes: ["camera"],
    hasSubscription: false,
    hasUserAccounts: false,
  },
  {
    slug: "ai-assistant-openclaw",
    name: "Ai Assistant",
    subtitle: "OpenClaw AI Assistant",
    tagline: "Your intelligent AI assistant, powered by OpenClaw.",
    description:
      "Ai Assistant is a powerful AI productivity tool powered by OpenClaw. Get instant answers, write better content, debug code, brainstorm ideas, and automate repetitive tasks — all within a clean, intuitive interface.",
    price: "$5.99",
    category: "Productivity",
    platform: "iPhone & iPad",
    appStoreUrl: "https://apps.apple.com/us/app/ai-assistant-openclaw/id6759173372",
    appStoreId: "6759173372",
    color: "from-indigo-600 via-blue-500 to-violet-600",
    accentColor: "text-indigo-400",
    icon: "🦾",
    features: [
      {
        title: "Instant AI Answers",
        description: "Ask anything — get clear, accurate, and detailed responses in seconds.",
      },
      {
        title: "Content Writing",
        description: "Draft emails, essays, social posts, product descriptions, and more with AI assistance.",
      },
      {
        title: "Code Generation & Debug",
        description: "Write, review, and debug code across dozens of programming languages.",
      },
      {
        title: "Idea Brainstorming",
        description: "Use AI as a creative thinking partner for business ideas, campaigns, or problem-solving.",
      },
      {
        title: "Task Automation",
        description: "Define repeatable tasks and let AI handle them consistently every time.",
      },
      {
        title: "Conversation History",
        description: "Your entire chat history is saved and searchable — pick up any conversation anytime.",
      },
    ],
    perfectFor: [
      "Professionals who want to work faster with AI",
      "Writers and marketers looking for a creative co-pilot",
      "Developers who need coding assistance on the go",
      "Students who want explanations, summaries, and study help",
    ],
    contact: "support@approtic.in",
    dataTypes: ["cloud"],
    hasSubscription: false,
    hasUserAccounts: false,
  },
  {
    slug: "whatsapp-qr",
    name: "What's App QR",
    subtitle: "QR Scanner & Creator",
    tagline: "Scan and create QR codes instantly.",
    description:
      "What's App QR is a fast, powerful QR code scanner and creator. Scan any QR code with your camera in real time, or create custom QR codes for URLs, contacts, Wi-Fi, text, and more — all in a clean, ad-free interface.",
    price: "$4.99",
    category: "Productivity",
    platform: "iPhone",
    appStoreUrl: "https://apps.apple.com/us/app/whatsapp-qr-scanner-creator/id1564038172",
    appStoreId: "1564038172",
    color: "from-green-600 via-emerald-500 to-teal-600",
    accentColor: "text-green-400",
    icon: "📷",
    features: [
      {
        title: "Instant QR Scanner",
        description: "Point your camera at any QR code — it's read and acted on in under a second.",
      },
      {
        title: "QR Code Creator",
        description: "Generate QR codes for URLs, text, email, phone, Wi-Fi, contacts, and more.",
      },
      {
        title: "Scan History",
        description: "Every scanned code is saved to your history so you can revisit it anytime.",
      },
      {
        title: "Custom Styling",
        description: "Customise your QR code with colours, logos, and styles to match your brand.",
      },
      {
        title: "Batch Generation",
        description: "Create multiple QR codes in bulk and export them all at once.",
      },
      {
        title: "No Ads, One-Time Purchase",
        description: "Pay once, use forever. No subscriptions, no ads, no pop-ups.",
      },
    ],
    perfectFor: [
      "Business owners who need branded QR codes",
      "Anyone who scans QR codes regularly",
      "Marketers creating print and digital campaigns",
      "Developers and designers who need QR utilities",
    ],
    contact: "support@approtic.in",
    dataTypes: ["camera"],
    hasSubscription: false,
    hasUserAccounts: false,
  },
  {
    slug: "oneiro",
    name: "Oneiro",
    subtitle: "Dream Journal & AI Interpreter",
    tagline: "Record, explore, and understand your dreams with AI.",
    description:
      "Oneiro is a beautiful dream journal that uses AI to interpret the symbolism and themes in your dreams. Log dreams the moment you wake up, explore patterns over time, and discover what your subconscious is trying to tell you.",
    price: "Free",
    category: "Health & Fitness",
    platform: "iPhone",
    appStoreUrl: "https://apps.apple.com/us/app/oneiro-dream-journal-ai/id6763781038",
    appStoreId: "6763781038",
    color: "from-indigo-700 via-blue-600 to-purple-700",
    accentColor: "text-indigo-400",
    icon: "🌙",
    features: [
      {
        title: "Dream Journal",
        description: "Log your dreams immediately on waking — voice or text, with mood, tags, and imagery.",
      },
      {
        title: "AI Dream Interpretation",
        description: "AI analyses your dream narrative and provides symbolic and psychological interpretations.",
      },
      {
        title: "Pattern Recognition",
        description: "Discover recurring themes, characters, and emotions across all your dreams over time.",
      },
      {
        title: "Dream Calendar",
        description: "Visual timeline of your dreams so you can see how your dream life evolves month by month.",
      },
      {
        title: "Mood & Sleep Tracking",
        description: "Log your sleep duration and morning mood alongside each dream for deeper insights.",
      },
      {
        title: "Private & Encrypted",
        description: "Your dreams are personal. All data is encrypted and stays private — we never read your journal.",
      },
    ],
    perfectFor: [
      "Anyone curious about the meaning of their dreams",
      "People practising lucid dreaming",
      "Therapists and their clients using dream journaling as a tool",
      "Spiritual seekers exploring the subconscious",
      "Anyone who simply wants to remember their dreams",
    ],
    contact: "support@approtic.in",
    dataTypes: ["cloud", "health"],
    hasSubscription: true,
    hasUserAccounts: false,
  },
  {
    slug: "deployclaw",
    name: "DeployClaw",
    subtitle: "AI Productivity Assistant",
    tagline: "20+ AI-powered skills to supercharge your productivity.",
    description:
      "DeployClaw is a powerful AI productivity assistant with over 20 built-in skills — from writing and research to coding and summarisation. Powered by OpenClaw, it gives you professional-grade AI tools in a single app.",
    price: "Free",
    category: "Productivity",
    platform: "iPhone & iPad",
    appStoreUrl: "https://apps.apple.com/us/app/deployclaw-ai-assistant/id6759829325",
    appStoreId: "6759829325",
    color: "from-blue-600 via-sky-500 to-cyan-600",
    accentColor: "text-sky-400",
    icon: "🚀",
    features: [
      {
        title: "20+ AI Skills",
        description: "Writer, researcher, coder, summariser, translator, email drafter — one app, every skill.",
      },
      {
        title: "Smart Task Routing",
        description: "DeployClaw automatically picks the best AI model and approach for your specific task.",
      },
      {
        title: "Writing Assistant",
        description: "Draft, refine, and rewrite content for any medium — blog, email, social, or report.",
      },
      {
        title: "Research Mode",
        description: "Get comprehensive, sourced answers to complex questions in a structured format.",
      },
      {
        title: "Code Helper",
        description: "Generate, explain, and debug code in any major programming language.",
      },
      {
        title: "OpenClaw Powered",
        description: "Built on the OpenClaw AI infrastructure for reliable, high-quality outputs.",
      },
    ],
    perfectFor: [
      "Professionals who want a versatile AI assistant",
      "Students and researchers who need reliable summaries",
      "Developers who want a coding assistant in their pocket",
      "Anyone who wants to accomplish more in less time",
    ],
    contact: "support@approtic.in",
    dataTypes: ["cloud"],
    hasSubscription: true,
    hasUserAccounts: false,
  },
  {
    slug: "rock-ai",
    name: "RockAI",
    subtitle: "Rock & Mineral Identifier",
    tagline: "Identify any rock, mineral, or gemstone from a photo.",
    description:
      "RockAI uses artificial intelligence to instantly identify rocks, minerals, and gemstones from a photo taken with your camera or uploaded from your gallery. Get detailed information about every specimen — including formation, properties, and value.",
    price: "Free",
    category: "Education",
    platform: "iPhone & iPad",
    appStoreUrl: "https://apps.apple.com/us/app/rockai-rock-mineral-id/id6761178224",
    appStoreId: "6761178224",
    color: "from-stone-600 via-amber-700 to-orange-700",
    accentColor: "text-amber-400",
    icon: "🪨",
    features: [
      {
        title: "Instant AI Identification",
        description: "Take a photo of any rock or mineral and get an accurate identification in seconds.",
      },
      {
        title: "10,000+ Specimen Database",
        description: "Rocks, minerals, gemstones, fossils, and crystals — one of the most comprehensive databases available.",
      },
      {
        title: "Detailed Information",
        description: "Formation process, chemical composition, hardness (Mohs scale), colour, and where it's found.",
      },
      {
        title: "Market Value Estimate",
        description: "Get an estimated collector or market value for gemstones and valuable minerals.",
      },
      {
        title: "Collection Manager",
        description: "Log and organise your personal rock and mineral collection with photos and notes.",
      },
      {
        title: "Offline Mode",
        description: "Common specimens can be identified offline — no signal needed in the field.",
      },
    ],
    perfectFor: [
      "Rock and mineral collectors of all levels",
      "Geology students and field researchers",
      "Hikers and outdoor enthusiasts who find interesting specimens",
      "Teachers using hands-on earth science activities",
      "Gemstone buyers and hobbyist jewellers",
    ],
    contact: "support@approtic.in",
    dataTypes: ["photo", "cloud"],
    hasSubscription: true,
    hasUserAccounts: false,
  },
  {
    slug: "warranty-vault",
    name: "Warranty Vault",
    subtitle: "Warranty Tracker",
    tagline: "Never lose track of a warranty again.",
    description:
      "Warranty Vault is the smart way to manage all your product warranties in one place. Scan receipts with AI, log purchase dates and warranty periods, and get reminders before warranties expire — so you never miss a valid claim.",
    price: "$4.99",
    category: "Utilities",
    platform: "iPhone",
    appStoreUrl: "https://apps.apple.com/us/app/warranty-vault-tracker/id6763746321",
    appStoreId: "6763746321",
    color: "from-amber-600 via-yellow-500 to-orange-500",
    accentColor: "text-amber-400",
    icon: "🗂️",
    features: [
      {
        title: "AI Receipt Scanner",
        description: "Photograph your receipt and AI automatically extracts the product name, price, and purchase date.",
      },
      {
        title: "Warranty Calendar",
        description: "See all your warranties on a timeline — know exactly what expires when at a glance.",
      },
      {
        title: "Expiry Reminders",
        description: "Get notified 30 days before a warranty expires so you have time to act.",
      },
      {
        title: "Document Storage",
        description: "Attach photos of receipts, manuals, and proof-of-purchase to each item.",
      },
      {
        title: "Category Organisation",
        description: "Organise warranties by category — electronics, appliances, furniture, vehicles, and more.",
      },
      {
        title: "One-Time Purchase",
        description: "Pay once and use forever. No subscriptions, no ads.",
      },
    ],
    perfectFor: [
      "Homeowners with multiple appliances and electronics",
      "Anyone who has ever lost a receipt and missed a warranty claim",
      "Renters keeping track of personal electronics",
      "Anyone who wants peace of mind on their purchases",
    ],
    contact: "support@approtic.in",
    dataTypes: ["photo"],
    hasSubscription: false,
    hasUserAccounts: false,
  },
  {
    slug: "meetburn",
    name: "MeetBurn",
    subtitle: "Meeting Cost Timer",
    tagline: "See the real cost of every meeting in real time.",
    description:
      "MeetBurn shows you the live financial cost of any meeting as it happens. Enter attendees and their salaries, start the timer, and watch the burn rate tick up in real time — a powerful nudge to keep meetings short and on-point.",
    price: "$5.99",
    category: "Productivity",
    platform: "iPhone & iPad",
    appStoreUrl: "https://apps.apple.com/us/app/meetburn-meeting-cost-timer/id6759387074",
    appStoreId: "6759387074",
    color: "from-red-600 via-orange-500 to-amber-500",
    accentColor: "text-orange-400",
    icon: "⏱️",
    features: [
      {
        title: "Real-Time Cost Counter",
        description: "See the meeting cost tick up live as every second passes — impossible to ignore.",
      },
      {
        title: "Multi-Attendee Calculator",
        description: "Add attendees with their salaries or hourly rates to get an accurate total burn.",
      },
      {
        title: "Meeting History",
        description: "Every meeting is saved with its total cost, duration, and attendee breakdown.",
      },
      {
        title: "Cost per Agenda Item",
        description: "Track time and cost per agenda point to see where meetings get expensive.",
      },
      {
        title: "Team Templates",
        description: "Save recurring meeting configurations — same team, same meeting, instant setup.",
      },
      {
        title: "One-Time Purchase",
        description: "Pay once, use forever. No subscriptions.",
      },
    ],
    perfectFor: [
      "Managers who want to run leaner, faster meetings",
      "Executives who value their team's time",
      "Consultants billing by the hour",
      "Teams trying to reduce unnecessary meetings",
      "Anyone who has sat through a meeting that didn't need to happen",
    ],
    contact: "support@approtic.in",
    dataTypes: ["none"],
    hasSubscription: false,
    hasUserAccounts: false,
  },
  {
    slug: "fair-split",
    name: "Fair Split",
    subtitle: "Fair Rent Splitter",
    tagline: "Split rent fairly based on room size, features, and quality.",
    description:
      "Fair Split calculates a truly fair rent split for shared housing based on objective room quality scoring — size, natural light, storage, bathroom access, and more. No more arguments. Just a transparent, fair number everyone can agree on.",
    price: "$5.99",
    category: "Utilities",
    platform: "iPhone & iPad",
    appStoreUrl: "https://apps.apple.com/us/app/fair-split-rent-splitter/id6759346694",
    appStoreId: "6759346694",
    color: "from-lime-600 via-green-500 to-emerald-600",
    accentColor: "text-lime-400",
    icon: "🏠",
    features: [
      {
        title: "Room Quality Scoring",
        description: "Score each room on size, light, storage, bathroom access, noise, and views to find a fair split.",
      },
      {
        title: "Custom Weighting",
        description: "Adjust how much each factor matters — your household, your rules.",
      },
      {
        title: "Instant Calculation",
        description: "Enter the total rent and get each person's fair share in seconds.",
      },
      {
        title: "Shareable Results",
        description: "Export and share the calculation with all housemates so everyone can see how it was worked out.",
      },
      {
        title: "Multiple Properties",
        description: "Manage splits for multiple properties — useful for landlords and property managers.",
      },
      {
        title: "One-Time Purchase",
        description: "Pay once, use forever. No subscriptions.",
      },
    ],
    perfectFor: [
      "Housemates who want to split rent without arguments",
      "Students in shared houses looking for a fair system",
      "Landlords who want to offer transparent pricing to tenants",
      "Anyone moving into a shared property and negotiating rent",
    ],
    contact: "support@approtic.in",
    dataTypes: ["none"],
    hasSubscription: false,
    hasUserAccounts: false,
  },
];

export function getApp(slug: string): AppData | undefined {
  return apps.find((a) => a.slug === slug);
}
