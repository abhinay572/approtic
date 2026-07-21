import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, CheckCircle2, Smartphone, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { apps, getApp } from "@/lib/apps";
import TomatorCalLanding from "@/components/apps/TomatorCalLanding";

export function generateStaticParams() {
  return apps.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};
  return buildMetadata({
    title: `${app.name} — ${app.subtitle}`,
    description: app.tagline,
    path: `/apps/${app.slug}`,
  });
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  if (app.slug === "tomator-cal-ai") return <TomatorCalLanding app={app} />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    applicationCategory: app.category,
    operatingSystem: "iOS",
    offers: {
      "@type": "Offer",
      price: app.price === "Free" ? "0" : app.price.replace("$", ""),
      priceCurrency: "USD",
    },
    url: app.appStoreUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-10`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_60%,hsl(var(--bg)))]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/apps"
            className={`inline-flex items-center gap-2 text-sm text-muted hover:${app.accentColor} transition-colors mb-10`}
          >
            <ArrowLeft size={14} />
            All Apps
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-8">
            {/* Icon */}
            <div
              className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${app.color} flex items-center justify-center text-5xl shrink-0 shadow-2xl`}
            >
              {app.icon}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="outline" className="gap-1 text-xs">
                  <Smartphone size={10} />
                  {app.platform}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {app.category}
                </Badge>
                <Badge variant="outline" className={`text-xs font-semibold ${app.accentColor}`}>
                  {app.price}
                </Badge>
                <Badge variant="outline" className="text-xs gap-1">
                  <Star size={10} className="fill-yellow-400 text-yellow-400" />
                  App Store
                </Badge>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-bold text-text mb-2">
                {app.name}
              </h1>
              <p className={`text-lg font-medium ${app.accentColor} mb-4`}>
                {app.subtitle}
              </p>
              <p className="text-muted leading-relaxed max-w-2xl mb-6">{app.tagline}</p>

              {/* CTA */}
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r ${app.color} text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg`}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download on the App Store
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <Section className="pt-0 pb-10">
        <div className="max-w-3xl mx-auto">
          <p className="text-muted text-lg leading-relaxed">{app.description}</p>
        </div>
      </Section>

      {/* Features */}
      <Section className="pt-0 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-text mb-8 text-center">
            What {app.name} does
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {app.features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-surface p-6 hover:border-accent/30 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${app.color} opacity-80 mb-4`}
                />
                <h3 className="font-semibold text-text mb-2">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Perfect For */}
      <Section className="pt-0 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-border bg-surface p-8">
            <h2 className="font-display text-xl font-bold text-text mb-6">
              Perfect for
            </h2>
            <ul className="space-y-3">
              {app.perfectFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted text-sm">
                  <CheckCircle2
                    size={16}
                    className={`shrink-0 mt-0.5 ${app.accentColor}`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Disclaimer */}
      {app.disclaimer && (
        <Section className="pt-0 pb-10">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-6">
              <p className="text-yellow-600 dark:text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-2">
                Important Notice
              </p>
              <p className="text-muted text-sm leading-relaxed">{app.disclaimer}</p>
            </div>
          </div>
        </Section>
      )}

      {/* Download CTA */}
      <Section className="pt-0 pb-20">
        <div className="max-w-3xl mx-auto">
          <div
            className={`rounded-3xl bg-gradient-to-br ${app.color} p-10 text-center text-white`}
          >
            <p className="text-4xl mb-4">{app.icon}</p>
            <h2 className="font-display text-3xl font-bold mb-2">{app.name}</h2>
            <p className="opacity-80 mb-6">{app.tagline}</p>
            <a
              href={app.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur px-7 py-3 rounded-2xl font-semibold text-sm transition-colors border border-white/20"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on the App Store
            </a>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs opacity-70">
              <Link href={`/apps/${app.slug}/privacy`} className="hover:opacity-100 transition-opacity underline underline-offset-2">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link href={`/apps/${app.slug}/terms`} className="hover:opacity-100 transition-opacity underline underline-offset-2">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* More Apps */}
      <Section className="pt-0 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
          >
            View all our apps
            <ArrowRight size={14} />
          </Link>
        </div>
      </Section>
    </>
  );
}
