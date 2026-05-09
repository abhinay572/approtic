import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "success" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-surface-2 text-muted border border-border",
    accent: "bg-accent/10 text-accent border border-accent/20",
    success: "bg-success/10 text-success border border-success/20",
    outline: "border border-border text-muted",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
