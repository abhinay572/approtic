import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "TripRank – Terms & Conditions",
  description:
    "Terms and Conditions for TripRank: Speed Tracker iOS app by Approtic Solutions Private Limited.",
  path: "/apps/triprank/terms",
});

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "These Terms and Conditions (\"Terms\") govern your access to and use of the TripRank - Speed Tracker mobile application (\"App\") provided by Approtic Solution Private Limited (\"Approtic\", \"we\", \"our\", or \"us\"), a company registered in India. By downloading, installing, accessing, or using TripRank, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.",
  },
  {
    title: "2. Eligibility",
    content:
      "You must be at least 13 years of age to use TripRank. If you are under 18, you represent that you have your parent or guardian's consent. By using TripRank, you represent and warrant that you meet these eligibility requirements.",
  },
  {
    title: "3. Account Registration",
    content:
      "To access certain features you may need to create an account. You agree to provide accurate information and keep it updated. You are responsible for all activities under your account. Notify us immediately of any unauthorised use at support@approtic.in.",
  },
  {
    title: "4. Description of Service",
    content:
      "TripRank is a driving telemetry application that uses GPS and device sensors to track and record driving data including speed, distance, duration, G-force, acceleration, braking, cornering, lane changes, and related metrics. The App also provides shareable trip stat cards, a global leaderboard, trip history, and AI-powered vehicle image modifications.\n\nImportant: Speed, distance, and location data is derived from your device's GPS and sensors. GPS accuracy is affected by satellite visibility, atmospheric conditions, and device hardware. TripRank does NOT guarantee accuracy of any speed or location data. NEVER rely on TripRank as your sole speed measurement device.",
  },
  {
    title: "5. Subscriptions and Payments",
    subsections: [
      { heading: "5.1 Free and Premium Features", text: "TripRank offers free features and premium features available through TripRank Pro. Free users get 3 trips. Premium features require an active subscription." },
      { heading: "5.2 Subscription Plans", text: "TripRank Pro is available as weekly, monthly, or annual subscription. Pricing is displayed in the App and may vary by region." },
      { heading: "5.3 Billing and Renewal", text: "Subscriptions are billed through your Apple ID. Payment is charged at confirmation of purchase. Subscriptions auto-renew unless turned off at least 24 hours before the end of the current billing period." },
      { heading: "5.4 Free Trials", text: "We may offer free trial periods. If you do not cancel before the trial ends, your subscription automatically converts to a paid plan. Unused trial time is forfeited upon subscribing." },
      { heading: "5.5 Cancellation and Refunds", text: "Cancel anytime through Apple ID Account Settings. Cancellation takes effect at the end of the current period. Refund requests must be directed to Apple." },
    ],
  },
  {
    title: "6. User Conduct",
    content:
      "You agree NOT to: use TripRank while operating a vehicle; encourage or engage in illegal speeding or reckless driving; create fake accounts or manipulate leaderboard rankings; reverse-engineer the App; upload harmful or illegal content; use the App for unauthorised commercial purposes. We may suspend or terminate accounts that violate these rules.",
  },
  {
    title: "7. Safety Disclaimer",
    content:
      "TRIPRANK IS NOT A SAFETY DEVICE. THE APP IS FOR INFORMATIONAL AND ENTERTAINMENT PURPOSES ONLY.\n\nYou acknowledge that: TripRank should never substitute your vehicle's built-in instruments; you are solely responsible for obeying all traffic laws at all times; you must never interact with your phone while driving; Approtic is not responsible for accidents, injuries, fines, or any other damages arising from your use of TripRank; the leaderboard does not encourage unsafe driving.",
  },
  {
    title: "8. Intellectual Property",
    content:
      "TripRank and all its content, design, code, logos, and trademarks are owned by Approtic Solution Private Limited and protected by applicable intellectual property laws. You are granted a limited, non-exclusive, non-transferable, revocable licence for personal, non-commercial use.",
  },
  {
    title: "9. User-Generated Content",
    content:
      "By uploading content (vehicle photos, profile pictures, usernames), you grant Approtic a non-exclusive, royalty-free, worldwide licence to use and display such content solely to provide the App services. You retain ownership and represent that you have the rights to any content you upload.",
  },
  {
    title: "10. AI Car Mod Feature",
    content:
      "AI-generated modifications are for entertainment only and may not accurately represent real-world modifications. Approtic does not guarantee the quality or appropriateness of AI-generated content. You agree not to use AI-generated images for fraudulent or deceptive purposes.",
  },
  {
    title: "11. Third-Party Services",
    content:
      "TripRank may integrate with or link to third-party services such as social media platforms and map providers. Your use of third-party services is subject to their respective terms and privacy policies. Approtic is not responsible for third-party content or practices.",
  },
  {
    title: "12. Disclaimer of Warranties",
    content:
      'TRIPRANK IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, OR NON-INFRINGEMENT. APPROTIC DOES NOT WARRANT THE ACCURACY OF ANY SPEED, DISTANCE, LOCATION, G-FORCE, OR OTHER DATA PROVIDED BY THE APP.',
  },
  {
    title: "13. Limitation of Liability",
    content:
      "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, APPROTIC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. APPROTIC'S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR TRIPRANK PRO IN THE TWELVE (12) MONTHS PRECEDING THE EVENT, OR USD $50, WHICHEVER IS GREATER.",
  },
  {
    title: "14. Indemnification",
    content:
      "You agree to indemnify and hold harmless Approtic and its officers, directors, employees, and affiliates from any claims, liabilities, damages, and expenses arising from your use of TripRank, violation of these Terms, violation of applicable law, your driving conduct, or content you upload.",
  },
  {
    title: "15. Termination",
    content:
      "We may suspend or terminate your access at any time with or without cause. Upon termination, your right to use the App ceases immediately. You may delete your account through App settings or by contacting support@approtic.in.",
  },
  {
    title: "16. Governing Law and Dispute Resolution",
    content:
      "These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, Telangana, India.",
  },
  {
    title: "17. Changes to These Terms",
    content:
      "We may modify these Terms at any time. Material changes will be communicated via an in-app notice. Continued use after changes constitutes acceptance of the revised Terms.",
  },
  {
    title: "18. Apple-Specific Terms",
    content:
      "These Terms are between you and Approtic Solution Private Limited only, not with Apple Inc. Apple has no obligation to furnish maintenance or support for TripRank. Apple is not responsible for any claims relating to TripRank. Apple and its subsidiaries are third-party beneficiaries of these Terms.",
  },
];

export default function TripRankTermsPage() {
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
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text mb-4">Terms &amp; Conditions</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted">
            <span>Effective Date: March 15, 2026</span>
            <span>·</span>
            <span>Last Updated: March 15, 2026</span>
          </div>
        </div>

        <p className="text-muted text-sm leading-relaxed mb-10">
          By downloading, installing, accessing, or using TripRank, you agree to be bound by these Terms and our{" "}
          <Link href="/apps/triprank/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link>.
          If you do not agree, you must not use the App.
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
                "content" in s && s.content ? s.content.split("\n\n").map((p, i) => (
                  <p key={i} className="mb-3">{p}</p>
                )) : null
              )}
            </div>
          ))}

          <div className="border-t border-border pt-8">
            <h2 className="font-display font-bold text-xl text-text mb-4">19. Contact Us</h2>
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-2">
              <p className="font-semibold text-text">Approtic Solution Private Limited</p>
              <p>Email: <a href="mailto:support@approtic.in" className="text-cyan-400 hover:underline">support@approtic.in</a></p>
              <p>Address: Hyderabad, Telangana, India</p>
              <p>Website: <Link href="/" className="text-cyan-400 hover:underline">https://approtic.in</Link></p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row gap-4 text-sm text-muted">
          <Link href="/apps/triprank" className="hover:text-cyan-400 transition-colors">← Back to TripRank</Link>
          <Link href="/apps/triprank/privacy" className="hover:text-cyan-400 transition-colors sm:ml-auto">Privacy Policy →</Link>
        </div>
      </div>
    </Section>
  );
}
