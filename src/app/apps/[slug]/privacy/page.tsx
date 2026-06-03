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
    title: `${app.name} – Privacy Policy`,
    description: `Privacy Policy for ${app.name} (${app.subtitle}) iOS app by Approtic Solutions Private Limited.`,
    path: `/apps/${app.slug}/privacy`,
  });
}

function buildPrivacySections(app: AppData) {
  const collectsLocation = app.dataTypes.includes("location");
  const collectsCamera = app.dataTypes.includes("camera") || app.dataTypes.includes("photo");
  const isVpn = app.dataTypes.includes("vpn");
  const isKids = app.dataTypes.includes("kids");
  const isHealth = app.dataTypes.includes("health");
  const hasCloud = app.dataTypes.includes("cloud");
  const isOffline = app.dataTypes.includes("none");

  const sections = [
    {
      title: "1. About This Policy",
      content: `This Privacy Policy describes how Approtic Solutions Private Limited ("Approtic", "we", "our", or "us") handles information in connection with the ${app.name} mobile application ("App"). We are committed to protecting your privacy and being transparent about our data practices. By using the App you agree to the practices described in this Policy.`,
    },
    {
      title: "2. Information We Collect",
      content: isOffline
        ? `${app.name} is designed to work entirely on your device. We do not collect, transmit, or store any personal information. All data you enter into the App remains on your device and is never sent to our servers or any third party.`
        : [
            `${app.name} may collect the following information to provide and improve the App:`,
            ...(collectsLocation
              ? ["• Location / GPS data: " + (app.locationUse ?? "used to calculate speed, route, and proximity to points of interest. Location data is processed on-device and is only uploaded when you choose to share a trip or appear on a leaderboard.")]
              : []),
            ...(collectsCamera
              ? ["• Photos and camera access: " + (app.cameraUse ?? "used to process images you choose to submit. Photos are processed locally on your device or sent securely to our AI service to generate results. We do not store your photos beyond the time needed to generate a response.")]
              : []),
            ...(isVpn
              ? ["• Network traffic: routed through our VPN servers in encrypted form. We do not log your browsing activity, connection timestamps, IP addresses, or DNS queries."]
              : []),
            ...(isKids
              ? ["• Child usage data: we collect only the minimum data necessary to operate the App safely. We do not collect any personally identifiable information from children. Parent email addresses may be collected if parents create an account, solely for account management."]
              : []),
            ...(isHealth
              ? ["• Health and wellness data: any health-related information you enter (such as doses, dreams, or wellness logs) is stored locally on your device. It is not transmitted to our servers unless you explicitly enable cloud backup."]
              : []),
            ...(hasCloud && !isVpn
              ? ["• Usage data: anonymised app usage statistics (feature interactions, crash reports) to improve the App. This data cannot be used to identify you individually."]
              : []),
            ...(app.hasUserAccounts
              ? ["• Account information: if you create an account, we collect your chosen username or display name. We do not require your real name or address."]
              : []),
          ].join("\n\n"),
    },
    {
      title: "3. How We Use Your Information",
      content: [
        `We use information collected only for the following purposes:`,
        `• To provide and operate the core features of ${app.name}`,
        hasCloud ? "• To sync your data across your devices (if cloud features are enabled)" : null,
        collectsLocation ? (app.locationUse ? "• To plan, optimize, and navigate your routes and trips" : "• To display your trip data and (if you choose) contribute to leaderboards") : null,
        isVpn ? "• To route your internet traffic through our encrypted VPN servers" : null,
        isKids ? "• To provide age-appropriate AI responses with content filtering" : null,
        `• To diagnose and fix bugs and crashes`,
        `• To respond to your support requests`,
        `• To comply with legal obligations`,
      ]
        .filter(Boolean)
        .join("\n"),
    },
    {
      title: "4. Data Sharing",
      content: `We do not sell, rent, or trade your personal information to third parties for their marketing purposes.\n\nWe may share data with:\n• Service providers who help us operate the App (e.g. cloud hosting, AI processing), bound by strict confidentiality obligations\n• Law enforcement or government authorities when required by law\n• Successors in the event of a business merger or acquisition, with the same privacy obligations\n\nWe will never share your data with advertisers.`,
    },
    ...(isVpn
      ? [
          {
            title: "5. No-Logs VPN Policy",
            content: `We operate a strict no-logs policy. We do not monitor, record, or store:\n• Your browsing activity or DNS queries\n• Your original IP address\n• Connection timestamps or session duration\n• Bandwidth consumption per session\n\nThis policy has been designed so that even if compelled by a court order, we would have no data to provide.`,
          },
        ]
      : []),
    ...(isKids
      ? [
          {
            title: "5. Children's Privacy (COPPA & GDPR-K)",
            content: `${app.name} is designed for children aged 4–12. We comply with the Children's Online Privacy Protection Act (COPPA) and applicable child privacy laws.\n\n• We do not knowingly collect personally identifiable information from children without verifiable parental consent\n• Parents may review, request deletion of, or restrict data by contacting us at ${app.contact}\n• We do not serve behavioural advertising to children\n• All AI content is filtered through age-appropriate safety layers\n\nIf you believe we have inadvertently collected personal information from a child, please contact us immediately.`,
          },
        ]
      : []),
    {
      title: isVpn || isKids ? "6. Data Retention" : "5. Data Retention",
      content: isOffline
        ? `Because ${app.name} stores all data locally on your device, you control data retention entirely. Uninstalling the App removes all associated data.`
        : `We retain your data only for as long as necessary to provide the App's services or as required by law.\n\n• On-device data: controlled entirely by you — deleted when you uninstall the App\n${hasCloud ? "• Cloud data: retained until you delete your account or request deletion\n" : ""}• Anonymised analytics: retained for up to 24 months in aggregated form\n\nYou may request deletion of your data at any time by contacting ${app.contact}.`,
    },
    {
      title: isVpn || isKids ? "7. Security" : "6. Security",
      content: `We implement industry-standard security measures to protect your information, including:\n• Encryption in transit (TLS 1.3)\n${isVpn ? "• WireGuard protocol for all VPN traffic\n" : ""}• On-device data protection using iOS Data Protection APIs\n• Regular security reviews of our codebase and infrastructure\n\nNo method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.`,
    },
    {
      title: isVpn || isKids ? "8. Your Rights" : "7. Your Rights",
      content: `Depending on your location, you may have the following rights regarding your personal data:\n\n• Access: request a copy of the data we hold about you\n• Correction: request correction of inaccurate data\n• Deletion: request deletion of your data\n• Portability: receive your data in a machine-readable format\n• Objection: object to certain processing activities\n\nTo exercise any of these rights, contact us at ${app.contact}. We will respond within 30 days.`,
    },
    {
      title: isVpn || isKids ? "9. Third-Party Services" : "8. Third-Party Services",
      content: `${app.name} may use the following categories of third-party services:\n\n• Apple (App Store, StoreKit, CloudKit): governed by Apple's Privacy Policy\n${hasCloud ? "• Cloud infrastructure providers: bound by data processing agreements and GDPR standard contractual clauses\n" : ""}${(collectsCamera || collectsLocation) && app.usesAI !== false ? "• AI processing services: process image or location data solely to generate App features; data is not retained for training\n" : ""}• Crash analytics (e.g. Sentry or Firebase Crashlytics): anonymised error reports only\n\nWe do not embed advertising SDKs.`,
    },
    {
      title: isVpn || isKids ? "10. International Transfers" : "9. International Transfers",
      content: `Approtic Solutions Private Limited is based in India. If you use the App from the European Economic Area or United Kingdom, your data may be transferred to and processed in India or other countries. We ensure appropriate safeguards are in place, including standard contractual clauses approved by the European Commission.`,
    },
    {
      title: isVpn || isKids ? "11. Changes to This Policy" : "10. Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. Material changes will be communicated via an in-app notice or on our website. We encourage you to review this Policy periodically. Continued use of the App after changes constitutes acceptance of the updated Policy.`,
    },
  ];

  return sections;
}

export default async function AppPrivacyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const sections = buildPrivacySections(app);

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
            Privacy Policy
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted">
            <span>Effective Date: January 1, 2025</span>
            <span>·</span>
            <span>Last Updated: May 1, 2026</span>
          </div>
        </div>

        <div className="space-y-0 text-muted text-sm leading-relaxed">
          {sections.map((s) => (
            <div key={s.title} className="border-t border-border py-8">
              <h2 className="font-display font-bold text-xl text-text mb-4">{s.title}</h2>
              {s.content.split("\n\n").map((p, i) => (
                <p key={i} className="mb-3 whitespace-pre-line">
                  {p}
                </p>
              ))}
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
            href={`/apps/${app.slug}/terms`}
            className={`hover:${app.accentColor} transition-colors sm:ml-auto`}
          >
            Terms & Conditions →
          </Link>
        </div>
      </div>
    </Section>
  );
}
