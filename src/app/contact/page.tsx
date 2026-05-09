import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Section } from "@/components/ui/Section";
import { GradientText } from "@/components/ui/GradientText";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Tell us about your project. We respond within 24 hours with a clear plan and timeline.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section className="pt-32">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
          Contact
        </p>
        <h1 className="font-display text-5xl font-bold text-text mb-4">
          Let&apos;s build <GradientText>something great</GradientText>
        </h1>
        <p className="text-muted text-xl">
          Tell us about your project. We&apos;ll get back within 24 hours with a plan.
        </p>
      </div>
      <ContactForm />
    </Section>
  );
}
