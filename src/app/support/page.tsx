import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Mail, Clock, ChevronDown } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Support",
  description:
    "Get help with your Approtic project. Reach us via WhatsApp, email, or browse our FAQ.",
  path: "/support",
});

const faqs = [
  {
    q: "What is your typical project turnaround time?",
    a: "Depends on scope. An MVP typically takes 4–6 weeks. A full SaaS can take 3–4 months. We'll give you a realistic estimate after the discovery call.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes. All projects include 30 days of free post-launch support. After that, we offer monthly retainers for ongoing maintenance, updates, and feature development.",
  },
  {
    q: "How do you handle payments?",
    a: "We work on a 30/40/30 milestone model: 30% upfront, 40% at mid-project, 30% at delivery. For retainers, we bill monthly.",
  },
  {
    q: "Can I see the source code?",
    a: "Absolutely. Full source code is delivered to you at project completion. You own everything we build for you.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, we're happy to sign an NDA before any project discussion. Just ask when you reach out.",
  },
  {
    q: "What tech stack do you use?",
    a: "Next.js + TypeScript for frontend, Python or Node.js for backend, Supabase or PostgreSQL for data, Vercel or AWS for hosting. We adapt based on your needs.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function SupportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Section className="pt-32">
        <SectionHeader
          eyebrow="Support"
          title="How can we help?"
          description="We're here whenever you need us. Pick the channel that works best for you."
        />

        {/* Contact channels */}
        <div className="grid sm:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: MessageCircle,
              title: "WhatsApp",
              description: "Fastest response — usually under 5 minutes during business hours.",
              action: "Chat now",
              href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919999999999"}`,
              external: true,
              badge: "Fastest",
            },
            {
              icon: Mail,
              title: "Email",
              description: "For detailed queries or to attach files. We reply within 24 hours.",
              action: "Send email",
              href: "mailto:hello@approtic.in",
              external: true,
              badge: "24h response",
            },
            {
              icon: Clock,
              title: "Schedule a call",
              description: "Book a 30-minute call for complex questions or project discussions.",
              action: "Book a call",
              href: "/contact",
              external: false,
              badge: "Free",
            },
          ].map((ch, i) => (
            <Reveal key={ch.title} delay={i * 0.1}>
              <Card hover className="flex flex-col gap-4 p-7 h-full">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <ch.icon size={22} className="text-accent" />
                  </div>
                  <span className="text-xs font-medium text-success bg-success/10 border border-success/20 px-3 py-1 rounded-full">
                    {ch.badge}
                  </span>
                </div>
                <h2 className="font-display font-semibold text-xl text-text">{ch.title}</h2>
                <p className="text-muted text-sm leading-relaxed flex-1">{ch.description}</p>
                {ch.external ? (
                  <a href={ch.href} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full">{ch.action}</Button>
                  </a>
                ) : (
                  <Link href={ch.href}>
                    <Button variant="outline" size="sm" className="w-full">{ch.action}</Button>
                  </Link>
                )}
              </Card>
            </Reveal>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-text mb-8 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <details className="group rounded-2xl border border-border bg-surface p-6 cursor-pointer open:border-accent/50">
                  <summary className="flex items-center justify-between gap-4 text-text font-medium list-none">
                    {faq.q}
                    <ChevronDown
                      size={18}
                      className="text-muted shrink-0 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-4 text-muted leading-relaxed">{faq.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
