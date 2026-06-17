import Link from "next/link";
import {
  Camera,
  Zap,
  HeartPulse,
  Barcode,
  PencilLine,
  Activity,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { AppData } from "@/lib/apps";

/* Brand palette for this one app (glossy red) */
const RED = "#E2160A";
const RED_BRIGHT = "#FF5A3C";
const RED_DEEP = "#9E0C03";

/* Apple "Download on the App Store" badge — black pill, inline Apple logo SVG */
function AppStoreBadge({
  href,
  className = "",
}: {
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download on the App Store"
      className={`group inline-flex items-center gap-3 rounded-2xl bg-black px-5 py-3 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/10 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] ${className}`}
    >
      <svg viewBox="0 0 384 512" className="h-7 w-7 shrink-0" aria-hidden="true">
        <path
          fill="#fff"
          d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
        />
      </svg>
      <span className="flex flex-col text-left leading-none">
        <span className="text-[11px] font-normal opacity-90">
          Download on the
        </span>
        <span className="text-[19px] font-semibold tracking-tight">
          App Store
        </span>
      </span>
    </a>
  );
}

/* A reusable iOS-style phone frame around a screenshot */
function PhoneShot({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border border-white/10 bg-black p-2 shadow-[0_30px_80px_rgba(0,0,0,0.55)] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="block w-full rounded-[1.6rem]"
      />
    </div>
  );
}

/* Map the 6 features to brand icons (order matches lib/apps.ts) */
const featureIcons = [Camera, Zap, HeartPulse, Barcode, PencilLine, Activity];

/* Screenshot showcase data (real screens) */
const SHOTS: { src: string; title: string; caption: string }[] = [
  {
    src: "/tomator-cal-ai/scan.png",
    title: "Snap your meal",
    caption: "Point your camera and let AI do the rest",
  },
  {
    src: "/tomator-cal-ai/result.png",
    title: "Instant macros & health score",
    caption: "Calories, protein, carbs and fat in seconds",
  },
  {
    src: "/tomator-cal-ai/home.png",
    title: "Your day at a glance",
    caption: "Calorie & macro rings, water and streaks",
  },
  {
    src: "/tomator-cal-ai/progress.png",
    title: "Track your weight trend",
    caption: "Watch a real trend line build over time",
  },
  {
    src: "/tomator-cal-ai/barcode.png",
    title: "Scan any barcode",
    caption: "Exact nutrition from packaged products",
  },
  {
    src: "/tomator-cal-ai/describe.png",
    title: "Or just describe it",
    caption: "Too busy to snap? Type what you ate",
  },
];

const STEPS = [
  {
    title: "Snap a photo",
    body: "Take a picture of your plate — even mixed, home-cooked meals. Prefer to type or scan a barcode? That works too.",
  },
  {
    title: "AI analyzes calories & macros",
    body: "Tomo identifies each food and estimates calories, protein, carbs and fat — with a 0–100 health score on every meal.",
  },
  {
    title: "Log it & track your day",
    body: "Save it and your dashboard updates instantly: calories left, macro rings, water and your daily streak.",
  },
];

export default function TomatorCalLanding({ app }: { app: AppData }) {
  const heroGradient = `radial-gradient(120% 120% at 15% 0%, ${RED_BRIGHT} 0%, rgba(255,90,60,0) 55%), radial-gradient(130% 130% at 90% 15%, #ff7a52 0%, rgba(255,122,82,0) 50%), linear-gradient(160deg, ${RED} 0%, #c01007 45%, ${RED_DEEP} 100%)`;
  const ctaGradient = `radial-gradient(120% 140% at 20% 0%, ${RED_BRIGHT} 0%, rgba(255,90,60,0) 55%), linear-gradient(160deg, ${RED}, ${RED_DEEP})`;

  return (
    <>
      {/* ============================= HERO ============================= */}
      <section className="relative overflow-hidden text-white">
        <div
          className="absolute inset-0"
          style={{ background: heroGradient }}
          aria-hidden
        />
        {/* soft radial sheen */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 70% 10%, rgba(255,255,255,0.18), transparent 60%)",
          }}
          aria-hidden
        />
        {/* fade into the site's dark background at the bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,15,0), var(--color-bg))",
          }}
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-28 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <Link
            href="/apps"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            All Apps
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* Left: copy */}
            <div className="text-center lg:text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/tomator-cal-ai/icon.png"
                alt={`${app.name} app icon`}
                width={88}
                height={88}
                className="mx-auto mb-6 h-[88px] w-[88px] rounded-[22%] border-[3px] border-white/25 shadow-[0_18px_48px_rgba(0,0,0,0.4)] lg:mx-0"
              />

              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur">
                <Sparkles size={12} />
                AI Calorie Tracker
              </p>

              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(120,6,2,0.35)] sm:text-5xl lg:text-6xl">
                Snap your meal.
                <br />
                Know your calories &amp; macros.
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/90 lg:mx-0">
                Meet Tomo, your AI nutrition buddy. Point your camera at any
                plate and get calories, protein, carbs, fat and a health score
                in seconds — no weighing, no guessing.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                <AppStoreBadge href={app.appStoreUrl} />
              </div>

              <p className="mt-5 flex items-center justify-center gap-2 text-sm text-white/80 lg:justify-start">
                <ShieldCheck size={16} className="shrink-0" />
                No account needed. Your data stays on your iPhone.
              </p>
            </div>

            {/* Right: hero phone */}
            <div className="relative flex justify-center lg:justify-end">
              <div
                className="absolute -inset-6 rounded-full opacity-50 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,180,150,0.45), transparent 70%)",
                }}
                aria-hidden
              />
              <PhoneShot
                src="/tomator-cal-ai/scan.png"
                alt="Scanning a meal with Tomator Cal AI"
                priority
                className="relative w-[260px] rotate-[-3deg] transition-transform duration-300 hover:rotate-0 sm:w-[300px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================== FEATURES =========================== */}
      <section className="bg-bg py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-red-400">
              Why Tomo
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-5xl">
              Everything you need to eat smarter
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              Powerful AI under the hood, wrapped in an app that feels
              effortless. Log a full day in the time it takes to snap a photo.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {app.features.map((f, i) => {
              const Icon = featureIcons[i] ?? Zap;
              return (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-border bg-surface p-7 transition-all duration-200 hover:-translate-y-1.5 hover:border-red-500/40 hover:shadow-[0_18px_50px_rgba(226,22,10,0.12)]"
                >
                  <div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_8px_20px_rgba(226,22,10,0.28)]"
                    style={{
                      background: `linear-gradient(135deg, ${RED_BRIGHT}, ${RED_DEEP})`,
                    }}
                  >
                    <Icon size={26} className="text-white" strokeWidth={2} />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-text">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================= HOW IT WORKS ========================= */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-red-400">
              How it works
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-5xl">
              Three taps from plate to insight
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              No tedious database digging. Tomo does the heavy lifting so logging
              feels like a habit, not a chore.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className="relative rounded-2xl border border-border bg-bg p-8 text-center"
              >
                <div
                  className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white shadow-[0_8px_18px_rgba(226,22,10,0.3)]"
                  style={{
                    background: `linear-gradient(135deg, ${RED_BRIGHT}, ${RED_DEEP})`,
                  }}
                >
                  {i + 1}
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-text">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== SCREENSHOT SHOWCASE ===================== */}
      <section className="relative overflow-hidden bg-bg py-20 md:py-28">
        {/* subtle elevated dark band so the dark app screens pop */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 0%, rgba(226,22,10,0.10), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-red-400">
              A closer look
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-5xl">
              Designed to feel delightful
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
              A warm, glossy interface that makes nutrition tracking something
              you actually want to open.
            </p>
          </div>
        </div>

        {/* Horizontal scroll on mobile, responsive grid on larger screens */}
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
            {SHOTS.map((shot) => (
              <div
                key={shot.src}
                className="group w-[240px] shrink-0 snap-center text-center sm:w-auto"
              >
                <PhoneShot
                  src={shot.src}
                  alt={shot.title}
                  className="transition-transform duration-300 group-hover:-translate-y-2"
                />
                <div className="mt-4">
                  <p className="font-semibold text-text">{shot.title}</p>
                  <p className="mt-1 text-sm text-muted">{shot.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-sm text-muted sm:hidden">
            ← swipe to explore all six screens →
          </p>
        </div>
      </section>

      {/* ====================== HEALTH SCORE BAND ====================== */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-red-400">
                Health score
              </p>
              <h2 className="font-display text-3xl font-bold leading-tight text-text sm:text-4xl">
                A 0–100 score on every meal
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Beyond calories and macros, Tomo grades how balanced a meal
                really is — factoring in fiber, sugar and sodium. A simple,
                color-coded score helps you see at a glance whether a meal works
                for your goals, so better choices become second nature.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  "Color-coded 0–100 score on every logged meal",
                  "Fiber, sugar and sodium highlights, not just calories",
                  "Estimates calories, protein, carbs and fat per item",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-muted"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: RED }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-1 flex justify-center lg:order-2">
              <PhoneShot
                src="/tomator-cal-ai/result.png"
                alt="Instant calories, macros and health score breakdown"
                className="w-[280px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ====================== DISCLAIMER (honest) ==================== */}
      {app.disclaimer && (
        <section className="bg-bg pb-4 pt-2">
          <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-yellow-500/25 bg-yellow-500/5 p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-yellow-400">
                Important Notice
              </p>
              <p className="text-sm leading-relaxed text-muted">
                {app.disclaimer}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ============================ FINAL CTA ======================== */}
      <section className="relative overflow-hidden py-4">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-[2rem] px-6 py-16 text-center text-white sm:px-12 sm:py-20"
            style={{ background: ctaGradient }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(60% 50% at 50% 0%, rgba(255,255,255,0.18), transparent 60%)",
              }}
              aria-hidden
            />
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/tomator-cal-ai/icon.png"
                alt={`${app.name} app icon`}
                width={84}
                height={84}
                className="mx-auto mb-6 h-[84px] w-[84px] rounded-[22%] border-[3px] border-white/25 shadow-[0_16px_40px_rgba(0,0,0,0.3)]"
              />
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Reach your goal with Tomo
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-white/90">
                Download Tomator Cal AI and turn every meal into clear, useful
                numbers — right from your camera.
              </p>
              <div className="mt-8 flex justify-center">
                <AppStoreBadge href={app.appStoreUrl} />
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
                <Link
                  href={`/apps/${app.slug}/privacy`}
                  className="underline underline-offset-2 transition-opacity hover:text-white"
                >
                  Privacy Policy
                </Link>
                <span aria-hidden>·</span>
                <Link
                  href={`/apps/${app.slug}/terms`}
                  className="underline underline-offset-2 transition-opacity hover:text-white"
                >
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* spacer above the global footer */}
      <div className="h-20" />
    </>
  );
}
