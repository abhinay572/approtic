import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { Reveal } from "@/components/ui/Reveal";

export function CTABanner() {
  return (
    <Section>
      <Reveal>
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-accent/20 via-surface to-accent-2/10 border border-border p-10 sm:p-16 text-center">
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-accent/20 blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              Let's build together
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text mb-6 leading-tight">
              Have an idea?{" "}
              <GradientText>Let&apos;s build it.</GradientText>
            </h2>
            <p className="text-muted text-xl mb-10 max-w-xl mx-auto">
              Tell us what you're working on. First call is free and we'll come back with
              a plan within 48 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button size="xl" variant="gradient" className="group">
                  Start a project
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="xl" variant="secondary">
                  Explore services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
