import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Terms governing your use of approtic.in and engagement of Approtic services.",
  path: "/terms",
});

export default function TermsPage() {
  const lastUpdated = "May 8, 2026";

  return (
    <Section className="pt-32" tight>
      <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
        Legal
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-bold text-text mb-3">
        Terms of Service
      </h1>
      <p className="text-muted text-sm mb-12">Last updated: {lastUpdated}</p>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-text prose-p:text-muted prose-a:text-accent prose-li:text-muted prose-strong:text-text">
        <p>
          These Terms of Service govern your use of approtic.in and any services
          provided by Approtic Technologies. By using our website or engaging us, you
          agree to these terms.
        </p>

        <h2>Services</h2>
        <p>
          Approtic provides software development, AI agent design, SaaS products, and
          digital marketing services. Specific deliverables, timelines, and pricing
          are governed by the individual statement of work or service agreement signed
          for each engagement.
        </p>

        <h2>Use of website</h2>
        <ul>
          <li>You agree not to use approtic.in for any unlawful purpose</li>
          <li>
            You will not attempt to compromise security, scrape at scale without
            permission, or interfere with site operations
          </li>
          <li>
            All content (text, designs, code on this site) is owned by Approtic unless
            otherwise noted
          </li>
        </ul>

        <h2>Intellectual property</h2>
        <p>
          For client engagements, ownership of deliverables transfers to the client
          upon final payment, as detailed in the relevant statement of work. Approtic
          retains ownership of pre-existing tools, frameworks, and proprietary
          methods.
        </p>

        <h2>Payment & engagement</h2>
        <p>
          Standard projects are billed on a 30/40/30 milestone basis: 30% on signing,
          40% at mid-project, 30% on delivery. Retainer engagements are billed
          monthly. Specific terms are set in your service agreement.
        </p>

        <h2>Warranties & limitations</h2>
        <p>
          We warrant that services will be performed in a professional manner. The
          website is provided &quot;as is&quot; without warranties of any kind. To the
          maximum extent permitted by law, Approtic is not liable for indirect,
          incidental, or consequential damages.
        </p>

        <h2>Termination</h2>
        <p>
          Either party may terminate an engagement with 14 days&apos; written notice.
          Fees for work completed up to termination remain payable.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of India. Any disputes will be resolved
          in the courts of Hyderabad, Telangana.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms occasionally. Continued use of the website
          constitutes acceptance of the updated terms.
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
