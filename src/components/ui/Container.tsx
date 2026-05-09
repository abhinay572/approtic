import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  tight?: boolean;
}

export function Container({ className, tight, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        tight ? "max-w-4xl" : "max-w-7xl",
        className
      )}
      {...props}
    />
  );
}
