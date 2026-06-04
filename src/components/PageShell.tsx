import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-10 text-center sm:px-8 sm:pt-28">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] sm:text-6xl animate-fade-up">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg animate-fade-up">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}
