import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "./useInView";

/** Gentle fade/slide-in on scroll. Content stays visible without JS (see .reveal-ready in styles.css). */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-reveal=""
      className={cn(inView && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
