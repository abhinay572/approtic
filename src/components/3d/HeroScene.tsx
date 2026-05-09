"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

interface HeroSceneProps {
  scene?: string;
}

function AnimatedFallback() {
  const reduce = useReducedMotion();
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Outer halo */}
      <motion.div
        aria-hidden
        className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-br from-accent/40 via-accent-2/20 to-transparent blur-3xl"
        animate={reduce ? {} : { scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Inner orb */}
      <motion.div
        aria-hidden
        className="relative w-56 h-56 rounded-full bg-gradient-to-br from-accent to-accent-2 shadow-[0_0_120px_rgba(124,92,255,0.6)]"
        animate={reduce ? {} : { y: [0, -16, 0], rotate: [0, 360] }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
        }}
      >
        {/* Highlight */}
        <div className="absolute top-6 left-8 w-16 h-16 rounded-full bg-white/30 blur-md" />
        {/* Core */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-bg/40 to-transparent backdrop-blur-sm" />
      </motion.div>
      {/* Orbiting particles */}
      {!reduce &&
        [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            aria-hidden
            className="absolute w-3 h-3 rounded-full bg-accent-2 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
            animate={{
              x: [Math.cos((i * 2 * Math.PI) / 3) * 180, Math.cos((i * 2 * Math.PI) / 3 + 2 * Math.PI) * 180],
              y: [Math.sin((i * 2 * Math.PI) / 3) * 180, Math.sin((i * 2 * Math.PI) / 3 + 2 * Math.PI) * 180],
            }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        ))}
    </div>
  );
}

export function HeroScene({ scene }: HeroSceneProps) {
  const [loaded, setLoaded] = useState(false);
  const reduce = useReducedMotion();

  // No scene URL OR user prefers reduced motion → animated CSS fallback
  if (!scene || reduce) {
    return <AnimatedFallback />;
  }

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0">
          <AnimatedFallback />
        </div>
      )}
      <Spline
        scene={scene}
        onLoad={() => setLoaded(true)}
        className="!w-full !h-full"
      />
    </div>
  );
}
