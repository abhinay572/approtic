"use client";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
}

export function Marquee({ children, className, speed = 40, reverse }: MarqueeProps) {
  return (
    <div
      className={cn("flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]", className)}
      aria-hidden
    >
      <div
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-4 animate-marquee",
          reverse && "animate-marquee-reverse"
        )}
        style={{ "--duration": `${speed}s` } as React.CSSProperties}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
