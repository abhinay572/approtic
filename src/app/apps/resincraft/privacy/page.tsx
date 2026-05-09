import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "ResinCraft – Privacy Policy",
  description:
    "Privacy Policy for ResinCraft: Resin Calculator iOS app by Approtic Solutions Private Limited.",
  path: "/apps/resincraft/privacy",
});

export default function ResinCraftPrivacyPage() {
  return (
    <Section className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/apps/resincraft"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-violet-400 transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Back to ResinCraft
        </Link>

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-3">ResinCraft</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-text mb-4">Privacy Policy</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted">
            <span>Effective Date: May 6, 2026</span>
            <span>·</span>
            <span>Last Updated: May 6, 2026</span>
          </div>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-muted leading-relaxed">

          <p className="text-base">
            Approtic Solutions Private Limited (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates the{" "}
            <strong className="text-text">ResinCraft</strong> mobile application (the &ldquo;App&rdquo;). This
            Privacy Policy explains how the App handles information when you use it.
          </p>

          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
            <p className="font-semibold text-text mb-2">The short version</p>
            <p>
              ResinCraft does not collect, transmit, or store any personal data. Everything stays on
              your device. No account required. No tracking. No ads.
            </p>
          </div>

          {[
            {
              title: "1. Information We Collect",
              content: (
                <>
                  <p>
                    ResinCraft does not collect, transmit, or store any personal data on external
                    servers. The App is offline-first and works entirely on your device.
                  </p>
                  <h3 className="font-semibold text-text mt-4 mb-2">Information You Provide</h3>
                  <p>
                    ResinCraft does not require account creation. We do not collect your name, email
                    address, payment details, or any other personal identifiers.
                  </p>
                  <h3 className="font-semibold text-text mt-4 mb-2">Locally Stored Data</h3>
                  <p>
                    Saved projects, unit preferences, default brand selection, safety-margin settings,
                    and onboarding state are stored locally on your device using Apple&rsquo;s
                    UserDefaults. This data never leaves your device and is removed when you uninstall
                    the App.
                  </p>
                </>
              ),
            },
            {
              title: "2. Information We Do Not Collect",
              content: (
                <p>
                  We do not collect analytics, crash reports, advertising identifiers, location data,
                  contacts, photos, or any other personal or device information.
                </p>
              ),
            },
            {
              title: "3. How Your Data Is Used",
              content: (
                <p>
                  All calculations and saved projects exist solely for your personal use within the
                  App. Because data stays on-device, it is not shared with us, with Apple, or with any
                  third parties.
                </p>
              ),
            },
            {
              title: "4. Third-Party Services",
              content: (
                <p>
                  ResinCraft does not integrate with third-party analytics, advertising networks, or
                  tracking SDKs. The App may use Apple&rsquo;s StoreKit framework to request App Store
                  ratings; this interaction is handled entirely by Apple under Apple&rsquo;s Privacy
                  Policy.
                </p>
              ),
            },
            {
              title: "5. Children's Privacy",
              content: (
                <p>
                  ResinCraft is intended for general audiences and is suitable for users aged 4+. We
                  do not knowingly collect any data from anyone, including children.
                </p>
              ),
            },
            {
              title: "6. Data Security",
              content: (
                <p>
                  Because no data leaves your device, the security of your information depends on the
                  security of your iPhone or iPad. We recommend keeping your device updated and using
                  a passcode and Face ID / Touch ID.
                </p>
              ),
            },
            {
              title: "7. Your Rights",
              content: (
                <p>
                  Since we do not collect personal data, there is no personal data for us to delete or
                  share on request. You can clear all locally stored data at any time by uninstalling
                  the App.
                </p>
              ),
            },
            {
              title: "8. Changes to This Policy",
              content: (
                <p>
                  We may update this Privacy Policy from time to time. The &ldquo;Last Updated&rdquo; date at
                  the top of this page reflects the most recent revision. Material changes will be
                  communicated through an in-app notice.
                </p>
              ),
            },
          ].map((section) => (
            <div key={section.title} className="border-t border-border pt-8">
              <h2 className="font-display font-bold text-xl text-text mb-4">{section.title}</h2>
              <div className="space-y-3">{section.content}</div>
            </div>
          ))}

          <div className="border-t border-border pt-8">
            <h2 className="font-display font-bold text-xl text-text mb-4">9. Contact Us</h2>
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-2">
              <p className="font-semibold text-text">Approtic Solutions Private Limited</p>
              <p>
                Email:{" "}
                <a href="mailto:abhinay@approtic.in" className="text-violet-400 hover:underline">
                  abhinay@approtic.in
                </a>
              </p>
              <p>
                Website:{" "}
                <Link href="/" className="text-violet-400 hover:underline">
                  https://approtic.in
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row gap-4 text-sm text-muted">
          <Link href="/apps/resincraft" className="hover:text-violet-400 transition-colors">
            ← Back to ResinCraft
          </Link>
          <Link href="/apps/resincraft/terms" className="hover:text-violet-400 transition-colors sm:ml-auto">
            Terms & Conditions →
          </Link>
        </div>
      </div>
    </Section>
  );
}
