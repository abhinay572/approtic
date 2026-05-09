import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Approtic collects, uses, and protects your personal data. We take privacy seriously.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const lastUpdated = "May 8, 2026";

  return (
    <Section className="pt-32" tight>
      <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
        Legal
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-bold text-text mb-3">
        Privacy Policy
      </h1>
      <p className="text-muted text-sm mb-12">Last updated: {lastUpdated}</p>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-text prose-p:text-muted prose-a:text-accent prose-li:text-muted prose-strong:text-text">
        <p>
          This Privacy Policy describes how Approtic Technologies (&quot;Approtic&quot;,
          &quot;we&quot;, &quot;us&quot;) collects, uses, and shares information about
          you when you visit approtic.in or engage our services.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Information you provide:</strong> Name, email, phone, project
            details — when you fill out the contact form, message us on WhatsApp, or
            email us.
          </li>
          <li>
            <strong>Automatically collected:</strong> IP address, browser type, pages
            viewed, referrer — via standard web analytics (Google Analytics 4).
          </li>
          <li>
            <strong>Cookies:</strong> Essential cookies for site functionality and
            analytics cookies to understand site usage.
          </li>
        </ul>

        <h2>How we use information</h2>
        <ul>
          <li>To respond to your inquiries and deliver our services</li>
          <li>To send transactional emails (e.g. confirmations of your contact form)</li>
          <li>To improve our website and content</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2>Sharing</h2>
        <p>
          We do not sell your personal information. We share data only with vendors who
          help us operate our business (e.g. Resend for email, Vercel for hosting,
          Google Analytics for analytics) and only as required to provide their service.
        </p>

        <h2>Your rights</h2>
        <p>
          You may request access, correction, or deletion of your personal data by
          emailing <a href="mailto:hello@approtic.in">hello@approtic.in</a>. We will
          respond within 30 days.
        </p>

        <h2>Data retention</h2>
        <p>
          We retain inquiry data for as long as necessary to respond and follow up,
          typically up to 24 months, after which we delete or anonymise it.
        </p>

        <h2>Security</h2>
        <p>
          We use industry-standard practices (HTTPS, encrypted storage, least-privilege
          access) to protect your data. No method is 100% secure, but we take
          reasonable steps.
        </p>

        <h2>Children</h2>
        <p>
          Our services are not directed to children under 13. We do not knowingly
          collect data from children.
        </p>

        <h2>Changes</h2>
        <p>
          We may update this policy from time to time. We&apos;ll change the &quot;Last
          updated&quot; date at the top whenever we do.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Email{" "}
          <a href="mailto:hello@approtic.in">hello@approtic.in</a>.
        </p>
      </div>
    </Section>
  );
}
