"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

const testimonials = [
  {
    quote:
      "Approtic delivered an AI support agent that transformed our operations. Response time dropped from 8 hours to under 2 minutes. Absolutely incredible team.",
    name: "Priya Sharma",
    title: "CEO, FinBridge",
    avatar: "PS",
  },
  {
    quote:
      "The attention to detail on our e-commerce platform was exceptional. They didn't just build what we asked — they challenged our assumptions and made it better.",
    name: "Arjun Mehta",
    title: "CTO, NestMart",
    avatar: "AM",
  },
  {
    quote:
      "From discovery to launch in 8 weeks. Clean code, great design, and they actually explained every decision. This is how software should be built.",
    name: "Sarah O'Brien",
    title: "Founder, EduFlow",
    avatar: "SO",
  },
];

export function Testimonials() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  const t = testimonials[idx];

  return (
    <Section className="bg-surface/30">
      <SectionHeader
        eyebrow="Testimonials"
        title="What clients say"
        description="Don't take our word for it."
      />

      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="relative p-8 sm:p-10">
              <Quote size={40} className="text-accent/20 absolute top-6 left-6" />
              <blockquote className="text-text text-lg sm:text-xl leading-relaxed mb-8 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-text">{t.name}</p>
                  <p className="text-muted text-sm">{t.title}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-text hover:border-accent transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === idx ? "bg-accent w-6" : "bg-border w-2 hover:bg-muted"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-text hover:border-accent transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </Section>
  );
}
