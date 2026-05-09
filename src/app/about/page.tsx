import type { Metadata } from "next";
import { Heart, Zap, Users, Globe } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { GradientText } from "@/components/ui/GradientText";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Approtic is an AI-first product studio founded in Hyderabad. Learn about our story, values, and the team behind the software.",
  path: "/about",
});

const values = [
  {
    icon: Zap,
    title: "Speed without shortcuts",
    description:
      "We move fast using AI-assisted development, but never compromise on code quality, security, or UX. Fast and good aren't mutually exclusive.",
  },
  {
    icon: Heart,
    title: "Genuine ownership",
    description:
      "We care about your product as if it were ours. That means pushing back when something is wrong, not just building what you asked.",
  },
  {
    icon: Users,
    title: "Radical transparency",
    description:
      "Weekly demos, open roadmaps, honest timelines. No smoke, no mirrors — just clear communication at every step.",
  },
  {
    icon: Globe,
    title: "Global ambition, local roots",
    description:
      "Built in Hyderabad, serving clients from New York to Singapore. We bring Indian engineering excellence to a global standard.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-32">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-6">
            Our story
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-text leading-tight mb-8">
            Built by founders,{" "}
            <GradientText>for founders</GradientText>
          </h1>
          <div className="space-y-6 text-muted text-lg leading-relaxed">
            <p>
              Approtic started with a simple frustration: most software agencies either
              move too slow, cost too much, or don't understand product. We decided to
              build the studio we always wished existed.
            </p>
            <p>
              Founded in Hyderabad by Abhinay, Approtic combines deep technical
              expertise with product thinking and AI-first tooling. Every engagement is
              run by people who have shipped production software — not account managers
              handing work to juniors.
            </p>
            <p>
              Today we work with startups across India, the US, and Southeast Asia —
              helping them build faster, smarter, and with less waste.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-surface/30">
        <SectionHeader
          eyebrow="Values"
          title="What we believe in"
          centered={false}
        />
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <Card hover className="flex gap-5 p-7">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                  <v.icon size={22} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-text mb-2">
                    {v.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{v.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Founder */}
      <Section>
        <SectionHeader eyebrow="Team" title="Who you'll work with" centered={false} />
        <Reveal>
          <Card className="flex flex-col sm:flex-row gap-8 items-start p-8">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center text-white text-3xl font-bold font-display shrink-0">
              A
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="font-display font-bold text-2xl text-text">Abhinay</h3>
                <p className="text-accent text-sm font-medium">Founder & Lead Engineer</p>
              </div>
              <p className="text-muted leading-relaxed">
                Full-stack engineer and product builder with a passion for AI. Has shipped
                software for startups across fintech, edtech, and e-commerce. Believes
                the best software is invisible — it just works.
              </p>
              <p className="text-muted text-sm">
                📍 Hyderabad, India &nbsp;·&nbsp; abhinayabhi326@gmail.com
              </p>
            </div>
          </Card>
        </Reveal>
      </Section>

      <CTABanner />
    </>
  );
}
