import { cn } from "@/lib/utils";

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "violet" | "cyan" | "mixed";
}

export function GradientText({ className, variant = "mixed", ...props }: GradientTextProps) {
  const gradients = {
    violet: "from-accent to-purple-400",
    cyan: "from-accent-2 to-teal-400",
    mixed: "from-accent via-purple-400 to-accent-2",
  };
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradients[variant],
        className
      )}
      {...props}
    />
  );
}
