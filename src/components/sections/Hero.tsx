"use client";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { Badge } from "@/components/ui/Badge";

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

// Set your Spline scene URL here once you have one
const SPLINE_SCENE = process.env.NEXT_PUBLIC_SPLINE_HERO ?? "";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background glow drifts down + fades as the user scrolls past hero
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  // 3D scene parallax — gentle counter-drift
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  // Copy fades out faster than scene
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Background glow with scroll parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: glowY, opacity: glowOpacity }}
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-2/5 rounded-full blur-[80px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(to right, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-4rem)] py-20">
          {/* Left: copy */}
          <motion.div
            className="flex flex-col gap-6 max-w-xl"
            style={{ opacity: copyOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="accent" className="mb-2 inline-flex gap-1.5">
                <Zap size={12} />
                AI-first product studio
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-text leading-[1.05] tracking-tight"
            >
              We build software{" "}
              <GradientText className="block">that thinks.</GradientText>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted text-xl leading-relaxed"
            >
              Approtic crafts AI agents, custom software, SaaS products, and growth
              marketing strategies for startups and enterprises worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919666659359"}?text=${encodeURIComponent("Hi Approtic! I'd like to book a discovery call.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="gradient" className="group">
                  Book a call
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <Link href="/portfolio">
                <Button size="lg" variant="secondary">
                  See our work
                </Button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6 pt-4 text-sm text-muted"
            >
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-text font-display">50+</span>
                <span>Projects shipped</span>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-text font-display">10+</span>
                <span>Countries served</span>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-text font-display">95%</span>
                <span>Client retention</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: 3D scene — visible on all sizes, sized down on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: sceneY }}
            className="relative h-[300px] sm:h-[480px] lg:h-[560px] -mt-8 lg:mt-0"
          >
            <HeroScene scene={SPLINE_SCENE} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
