import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tight?: boolean;
  noPad?: boolean;
}

export function Section({ className, children, tight, noPad, ...props }: SectionProps) {
  return (
    <section
      className={cn(!noPad && "py-20 md:py-28", className)}
      {...props}
    >
      <Container tight={tight}>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-16", centered && "text-center", className)}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
