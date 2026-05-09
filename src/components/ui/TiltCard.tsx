"use client";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: number;
  glare?: boolean;
}

export function TiltCard({
  className,
  intensity = 8,
  glare = true,
  children,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 300,
    damping: 30,
  });

  const glareX = useTransform(x, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["20%", "80%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className={cn("relative", className)}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
      {glare && !reducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(124,92,255,0.15), transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}
