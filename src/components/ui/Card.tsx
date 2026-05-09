import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  gradient?: boolean;
}

export function Card({ className, hover, gradient, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6",
        hover &&
          "transition-all duration-300 hover:border-accent/50 hover:bg-surface-2 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5",
        gradient &&
          "bg-gradient-to-br from-surface to-surface-2",
        className
      )}
      {...props}
    />
  );
}
