import { Search, Lightbulb, Rocket, BarChart3 } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery",
    description:
      "We dive deep into your business, users, and goals. A focused 1-week sprint to align on scope, tech, and success metrics.",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Design & Plan",
    description:
      "Wireframes, architecture diagrams, and a detailed roadmap. You see exactly what we'll build and why before a line of code is written.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Build & Ship",
    description:
      "Two-week sprints with demo calls. You review working software every fortnight, not deck slides.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Grow & Iterate",
    description:
      "Post-launch analytics review, SEO, and performance tuning. We stay on to make your product better every month.",
  },
];

export function HowWeWork() {
  return (
    <Section className="bg-surface/30">
      <SectionHeader
        eyebrow="Process"
        title="How we work"
        description="No surprises, no scope creep. A proven process that ships great products."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connecting line on desktop */}
        <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {steps.map((step, i) => (
          <Reveal key={step.step} delay={i * 0.1}>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-2/20 flex items-center justify-center border border-border">
                  <step.icon size={28} className="text-accent" />
                </div>
                <span className="absolute -top-2 -right-2 text-xs font-bold text-accent bg-bg border border-border rounded-full w-6 h-6 flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg text-text">
                {step.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
