import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { apps, getApp, type AppData } from "@/lib/apps";

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
    title: `${app.name} – Terms & Conditions`,
    description: `Terms and Conditions for ${app.name} (${app.subtitle}) iOS app by Approtic Solutions Private Limited.`,
    path: `/apps/${app.slug}/terms`,
  });
}

function buildTermsSections(app: AppData) {
  const isPaid = app.price !== "Free";
  const isKids = app.dataTypes.includes("kids");

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `These Terms and Conditions ("Terms") govern your access to and use of the ${app.name} mobile application ("App") provided by Approtic Solutions Private Limited ("Approtic", "we", "our", or "us"), a company registered in India. By downloading, installing, accessing, or using ${app.name}, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree, you must not use the App.`,
    },
    {
      title: "2. Eligibility",
      content: isKids
        ? `${app.name} is designed for children aged 4–12. A parent or guardian must download and set up the App on behalf of the child. By setting up the App, the parent or guardian represents that they have the authority to agree to these Terms. We do not permit children to create accounts or make purchases independently.`
        : `You must be at least 13 years of age to use ${app.name}. If you are under 18, you represent that you have your parent or guardian's consent to use the App. By using ${app.name}, you represent and warrant that you meet these eligibility requirements.`,
    },
    {
      title: "3. Licence",
      content: `Subject to your compliance with these Terms, Approtic grants you a limited, non-exclusive, non-transferable, revocable licence to download and use ${app.name} for your personal, non-commercial purposes on Apple-branded devices that you own or control, as permitted by Apple's App Store Terms of Service.\n\nYou may not:\n• Copy, modify, distribute, or create derivative works of the App\n• Reverse-engineer, decompile, or disassemble the App\n• Rent, lease, or lend the App to any third party\n• Use the App for any unlawful purpose\n• Remove or alter any proprietary notices in the App`,
    },
    {
      title: "4. Description of Service",
      content: `${app.name} provides ${app.tagline.toLowerCase().replace(/\.$/, "")}. Features are described in the App and on our website. We reserve the right to modify, suspend, or discontinue any feature at any time with or without notice.`,
    },
    ...(app.hasSubscription || isPaid
      ? [
          {
            title: "5. Purchases and Payments",
            subsections: [
              {
                heading: "5.1 Pricing",
                text: app.hasSubscription
                  ? `${app.name} offers free features and premium features available through ${app.name} Pro. Pricing for premium plans is displayed in the App and may vary by region and currency.`
                  : `${app.name} is available as a one-time purchase of ${app.price}. Pricing is displayed in the App Store and may vary by region.`,
              },
              {
                heading: "5.2 Billing",
                text: "All purchases are processed through your Apple ID via the App Store. Payment is charged at confirmation of purchase. Approtic does not directly handle payment card information.",
              },
              ...(app.hasSubscription
                ? [
                    {
                      heading: "5.3 Auto-Renewal",
                      text: "Subscriptions automatically renew at the end of each billing period unless cancelled at least 24 hours before the renewal date through your Apple ID Account Settings.",
                    },
                    {
                      heading: "5.4 Free Trials",
                      text: "We may offer free trial periods. If you do not cancel before the trial ends, your subscription automatically converts to a paid plan. Unused trial time is forfeited upon upgrading.",
                    },
                    {
                      heading: "5.5 Cancellation and Refunds",
                      text: "Cancel any subscription anytime through Apple ID Account Settings. Cancellation takes effect at the end of the current billing period. All refund requests must be directed to Apple via their standard refund process.",
                    },
                  ]
                : [
                    {
                      heading: "5.3 Refunds",
                      text: "All sales are final. Refund requests must be directed to Apple via their standard refund process. Approtic does not process refunds directly.",
                    },
                  ]),
            ],
          },
        ]
      : []),
    {
      title: app.hasSubscription || isPaid ? "6. User Conduct" : "5. User Conduct",
      content: `You agree NOT to:\n• Use the App in any way that violates applicable local, national, or international law\n• Use the App to transmit harmful, offensive, or illegal content\n• Attempt to gain unauthorised access to any part of the App or its servers\n• Reverse-engineer, decompile, or modify the App\n• Use the App in a manner that could damage, disable, or impair our infrastructure\n• Create fake reviews or otherwise misrepresent your experience with the App\n\nWe may suspend or terminate your access without notice for any violation of these rules.`,
    },
    {
      title: app.hasSubscription || isPaid ? "7. Intellectual Property" : "6. Intellectual Property",
      content: `${app.name} and all its content, design, code, logos, and trademarks are owned by Approtic Solutions Private Limited and protected by applicable intellectual property laws in India and internationally. Nothing in these Terms grants you ownership of any intellectual property rights in the App. All rights not expressly granted are reserved.`,
    },
    {
      title: app.hasSubscription || isPaid ? "8. Disclaimer of Warranties" : "7. Disclaimer of Warranties",
      content: `${app.name.toUpperCase()} IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, TITLE, AND NON-INFRINGEMENT.\n\nAPPROTIC DOES NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.${
        app.disclaimer
          ? `\n\n${app.disclaimer}`
          : ""
      }`,
    },
    {
      title: app.hasSubscription || isPaid ? "9. Limitation of Liability" : "8. Limitation of Liability",
      content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, APPROTIC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF ${app.name.toUpperCase()}, INCLUDING LOSS OF DATA, LOSS OF PROFITS, OR LOSS OF GOODWILL.\n\nAPPROTIC'S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR ${app.name.toUpperCase()} IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR USD $50, WHICHEVER IS GREATER.`,
    },
    {
      title: app.hasSubscription || isPaid ? "10. Indemnification" : "9. Indemnification",
      content: `You agree to indemnify, defend, and hold harmless Approtic Solutions Private Limited and its officers, directors, employees, and affiliates from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with your use of ${app.name}, your violation of these Terms, or your violation of any applicable law.`,
    },
    {
      title: app.hasSubscription || isPaid ? "11. Termination" : "10. Termination",
      content: `We may suspend or terminate your access to ${app.name} at any time, with or without cause, with or without notice. Upon termination, your licence to use the App ceases immediately. Provisions of these Terms that by their nature should survive termination will survive.`,
    },
    {
      title: app.hasSubscription || isPaid ? "12. Governing Law" : "11. Governing Law",
      content: `These Terms are governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these Terms or your use of ${app.name} shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, Telangana, India.`,
    },
    {
      title: app.hasSubscription || isPaid ? "13. Changes to These Terms" : "12. Changes to These Terms",
      content: `We may update these Terms at any time. Material changes will be communicated via an in-app notice or on our website. Continued use of the App after changes are posted constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.`,
    },
    {
      title: app.hasSubscription || isPaid ? "14. Apple-Specific Terms" : "13. Apple-Specific Terms",
      content: `These Terms are between you and Approtic Solutions Private Limited only, not with Apple Inc. ("Apple"). Apple has no obligation to furnish maintenance or support services for ${app.name}. Apple is not responsible for any product liability claims or third-party intellectual property infringement claims relating to ${app.name}. Apple and its subsidiaries are third-party beneficiaries of these Terms and, upon your acceptance, Apple will have the right to enforce these Terms against you.`,
    },
  ];

  return sections;
}

export default async function AppTermsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const sections = buildTermsSections(app);

  return (
    <Section className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/apps/${app.slug}`}
          className={`inline-flex items-center gap-2 text-sm text-muted hover:${app.accentColor} transition-colors mb-10`}
        >
          <ArrowLeft size={14} />
          Back to {app.name}
        </Link>

        <div className="mb-10">
          <p className={`text-sm font-semibold uppercase tracking-widest ${app.accentColor} mb-3`}>
            {app.name}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text mb-4">
            Terms &amp; Conditions
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted">
            <span>Effective Date: January 1, 2025</span>
            <span>·</span>
            <span>Last Updated: May 1, 2026</span>
          </div>
        </div>

        <p className="text-muted text-sm leading-relaxed mb-10">
          By downloading, installing, accessing, or using {app.name}, you agree to be bound by these Terms and our{" "}
          <Link href={`/apps/${app.slug}/privacy`} className={`${app.accentColor} hover:underline`}>
            Privacy Policy
          </Link>
          . If you do not agree, you must not use the App.
        </p>

        <div className="space-y-0 text-muted text-sm leading-relaxed">
          {sections.map((s) => (
            <div key={s.title} className="border-t border-border py-8">
              <h2 className="font-display font-bold text-xl text-text mb-4">{s.title}</h2>
              {"subsections" in s && s.subsections ? (
                <div className="space-y-4">
                  {s.subsections.map((sub) => (
                    <div key={sub.heading}>
                      <h3 className="font-semibold text-text mb-2">{sub.heading}</h3>
                      <p>{sub.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                "content" in s &&
                s.content
                  .split("\n\n")
                  .map((p, i) => (
                    <p key={i} className="mb-3 whitespace-pre-line">
                      {p}
                    </p>
                  ))
              )}
            </div>
          ))}

          {/* Contact */}
          <div className="border-t border-border pt-8">
            <h2 className="font-display font-bold text-xl text-text mb-4">
              {sections.length + 1}. Contact Us
            </h2>
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-2">
              <p className="font-semibold text-text">Approtic Solutions Private Limited</p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${app.contact}`}
                  className={`${app.accentColor} hover:underline`}
                >
                  {app.contact}
                </a>
              </p>
              <p>Address: Hyderabad, Telangana, India</p>
              <p>
                Website:{" "}
                <Link href="/" className={`${app.accentColor} hover:underline`}>
                  https://approtic.in
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row gap-4 text-sm text-muted">
          <Link
            href={`/apps/${app.slug}`}
            className={`hover:${app.accentColor} transition-colors`}
          >
            ← Back to {app.name}
          </Link>
          <Link
            href={`/apps/${app.slug}/privacy`}
            className={`hover:${app.accentColor} transition-colors sm:ml-auto`}
          >
            Privacy Policy →
          </Link>
        </div>
      </div>
    </Section>
  );
}
