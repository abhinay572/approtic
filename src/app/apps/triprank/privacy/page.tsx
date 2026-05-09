import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "TripRank – Privacy Policy",
  description:
    "Privacy Policy for TripRank: Speed Tracker iOS app by Approtic Solutions Private Limited.",
  path: "/apps/triprank/privacy",
});

const sections = [
  {
    title: "1. Introduction",
    content: `Approtic Solution Private Limited ("Approtic", "we", "our", or "us") operates the TripRank - Speed Tracker mobile application (the "App"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App. By downloading, installing, or using TripRank, you agree to the collection and use of information in accordance with this policy.`,
  },
  {
    title: "2. Information We Collect",
    subsections: [
      {
        heading: "2.1 Information You Provide Directly",
        text: `Account Information: Username, display name, email address, and profile picture that you voluntarily provide during account registration.\n\nUser Content: Photos of vehicles you upload for the AI Car Mod feature, feedback, support requests, and any other content you submit through the App.\n\nPurchase Information: When you subscribe to TripRank Pro, payment processing is handled by Apple through the App Store. We do not directly collect or store your credit card numbers or financial information. We receive a transaction receipt from Apple confirming your subscription status.`,
      },
      {
        heading: "2.2 Information Collected Automatically",
        text: `Location Data: TripRank requires access to your precise GPS location to calculate speed, distance, route mapping, and trip statistics. Location data is collected while the App is in use and, with your permission, in the background to enable automatic trip tracking. You may disable background location access at any time through your device settings.\n\nSensor Data: We collect data from your device sensors including accelerometer, gyroscope, and magnetometer to calculate G-force, acceleration, braking intensity, cornering data, and lane change detection.\n\nDevice Information: Device identifier, model, OS version, app version, language, and timezone.\n\nUsage Data: Features used, screens visited, session duration, trip frequency, and in-app actions.`,
      },
      {
        heading: "2.3 Information from Third Parties",
        text: "We may receive anonymized and aggregated analytics data from third-party analytics providers to help us understand usage patterns and improve the App.",
      },
    ],
  },
  {
    title: "3. How We Use Your Information",
    content: `We use collected information for: core App functionality (speed tracking, trip recording, route mapping, G-force analysis); trip statistics and shareable cards; leaderboard rankings; AI Car Mod image processing (images not retained after processing unless saved by you); App improvement and personalization; communications and legal compliance.`,
  },
  {
    title: "4. How We Share Your Information",
    content: `We do not sell your personal information to third parties.\n\nPublic Leaderboard: If you participate, your username, country, and performance stats are visible to all TripRank users. You may opt out in profile settings.\n\nShared Stat Cards: Trip card images are generated on your device. We do not control sharing after export.\n\nService Providers: We may share data with cloud hosting, analytics, and crash reporting providers who are contractually bound to protect it.\n\nLegal Requirements: We may disclose information when required by law.\n\nBusiness Transfers: Your information may be transferred in the event of a merger or acquisition.`,
  },
  {
    title: "5. Data Storage and Security",
    content: `Trip data is stored locally on your device and synced to our secure cloud servers (encrypted GPS coordinates, TLS/SSL in transit). We retain personal information while your account is active. Deleted accounts are anonymised within 30 days except where legally required to retain.`,
  },
  {
    title: "6. Your Rights and Choices",
    content: `Access & Portability: Request a copy of your data. Trip data can be exported from within the App.\n\nCorrection: Update account information through App settings.\n\nDeletion: Request account deletion at support@approtic.in or through App settings. Leaderboard entries and public profile will be removed.\n\nLocation: Revoke location access anytime through device settings (note: this disables core tracking functionality).\n\nNotifications: Disable push notifications through device settings.\n\nOpt-out of Analytics: Available in App settings.`,
  },
  {
    title: "7. Children's Privacy",
    content: `TripRank is not intended for children under 13. We do not knowingly collect data from children. If you believe a child has provided personal information, contact us at support@approtic.in.`,
  },
  {
    title: "8. International Data Transfers",
    content: `Approtic Solution Private Limited is based in Hyderabad, India. Your data may be transferred to and processed in India or other countries where our service providers operate. By using TripRank, you consent to such transfers. We ensure appropriate safeguards are in place.`,
  },
  {
    title: "9. European Users (GDPR)",
    content: `If you are in the EEA, UK, or Switzerland, we process your data on the basis of consent, contract performance, legitimate interests, or legal obligations. You have additional rights to object, restrict processing, and lodge a complaint with your local data protection authority. GDPR inquiries: privacy@approtic.in.`,
  },
  {
    title: "10. California Users (CCPA)",
    content: `California residents have the right to know what personal information we collect, request deletion, and opt out of the sale of personal information. We do not sell your personal information. Contact: support@approtic.in.`,
  },
  {
    title: "11. Third-Party Services",
    content: `TripRank may link to third-party services (e.g., social media for sharing). This Privacy Policy does not apply to those services. We encourage you to review their privacy policies.`,
  },
  {
    title: "12. Changes to This Privacy Policy",
    content: `We may update this policy from time to time. We will notify you of material changes via an in-app notice and by updating the "Last Updated" date. Continued use constitutes acceptance.`,
  },
];

export default function TripRankPrivacyPage() {
  return (
    <Section className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/apps/triprank"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-cyan-400 transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Back to TripRank
        </Link>

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-3">TripRank</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text mb-4">Privacy Policy</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted">
            <span>Effective Date: March 15, 2026</span>
            <span>·</span>
            <span>Last Updated: March 15, 2026</span>
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 mb-10">
          <p className="font-semibold text-text mb-1">Data summary</p>
          <p className="text-sm text-muted">
            TripRank collects GPS, sensor, device, and usage data to power its features. Trip data is stored on your device and our encrypted servers. We do not sell your data. You can delete your account and data at any time.
          </p>
        </div>

        <div className="space-y-0 text-muted leading-relaxed text-sm">
          {sections.map((s) => (
            <div key={s.title} className="border-t border-border py-8">
              <h2 className="font-display font-bold text-xl text-text mb-4">{s.title}</h2>
              {"subsections" in s && s.subsections ? (
                <div className="space-y-5">
                  {s.subsections.map((sub) => (
                    <div key={sub.heading}>
                      <h3 className="font-semibold text-text mb-2">{sub.heading}</h3>
                      {sub.text.split("\n\n").map((p, i) => (
                        <p key={i} className="mb-3">{p}</p>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                "content" in s && s.content ? s.content.split("\n\n").map((p, i) => (
                  <p key={i} className="mb-3">{p}</p>
                )) : null
              )}
            </div>
          ))}

          <div className="border-t border-border pt-8">
            <h2 className="font-display font-bold text-xl text-text mb-4">13. Contact Us</h2>
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-2">
              <p className="font-semibold text-text">Approtic Solution Private Limited</p>
              <p>Email: <a href="mailto:support@approtic.in" className="text-cyan-400 hover:underline">support@approtic.in</a></p>
              <p>Privacy: <a href="mailto:privacy@approtic.in" className="text-cyan-400 hover:underline">privacy@approtic.in</a></p>
              <p>Address: Hyderabad, Telangana, India</p>
              <p>Website: <Link href="/" className="text-cyan-400 hover:underline">https://approtic.in</Link></p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row gap-4 text-sm text-muted">
          <Link href="/apps/triprank" className="hover:text-cyan-400 transition-colors">← Back to TripRank</Link>
          <Link href="/apps/triprank/terms" className="hover:text-cyan-400 transition-colors sm:ml-auto">Terms & Conditions →</Link>
        </div>
      </div>
    </Section>
  );
}
