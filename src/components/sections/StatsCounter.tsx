"use client";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 22, suffix: "+", label: "Apps on the App Store" },
  { value: 10, suffix: "+", label: "Countries served" },
  { value: 50, suffix: "+", label: "Projects shipped" },
  { value: 95, suffix: "%", label: "Client retention" },
];

export function StatsCounter() {
  return (
    <Section className="bg-gradient-to-r from-accent/5 via-surface to-accent-2/5 border-y border-border">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-2">
            <p className="font-display font-bold text-5xl sm:text-6xl text-text">
              <Counter end={s.value} suffix={s.suffix} />
            </p>
            <p className="text-muted text-sm font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
