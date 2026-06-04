import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Workflow,
  LineChart,
  Cpu,
  Compass,
  Zap,
  Quote,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SideReal AI Vision — Consulting for the Intelligent Era" },
      { name: "description", content: "AI-powered consulting for strategy, operations, project management, and digital transformation. Build smarter workflows with SideReal AI Vision." },
      { property: "og:title", content: "SideReal AI Vision" },
      { property: "og:description", content: "Consulting for the intelligent era — strategy, operations, AI adoption." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 grid-bg" aria-hidden />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-accent/30 blur-3xl animate-pulse-glow" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-24 text-center sm:px-8 sm:pt-32 sm:pb-32">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground animate-fade-up">
            <Sparkles className="h-3 w-3 text-primary" />
            AI Consulting · Strategy · Operations
          </span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl animate-fade-up">
            Consulting for the
            <br />
            <span className="text-gradient">intelligent era</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg animate-fade-up">
            SideReal AI Vision helps organizations transform projects, operations,
            and strategy using applied AI. We turn complexity into clarity — and
            workflows into competitive advantage.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-fade-up">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              Explore Services <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-white/10"
            >
              Book a Consultation
            </Link>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { v: "12+", l: "Industries served" },
              { v: "40%", l: "Avg. workflow gain" },
              { v: "AI-first", l: "Methodology" },
              { v: "End-to-end", l: "Delivery" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-4">
                <div className="text-2xl font-semibold text-gradient">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">What we do</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            Where strategy meets intelligent execution
          </h2>
          <p className="mt-3 text-muted-foreground">
            A focused practice across the disciplines modern businesses need most.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { i: Brain, t: "AI Business Strategy", d: "Roadmaps that translate AI capability into measurable business outcomes." },
            { i: Workflow, t: "Workflow Automation", d: "Replace repetitive work with reliable, auditable automated systems." },
            { i: LineChart, t: "Performance Optimization", d: "Diagnose bottlenecks and rebuild operations around what actually moves the needle." },
            { i: Cpu, t: "AI Tools Implementation", d: "Select, integrate, and adopt the right AI tools across teams without disruption." },
            { i: Compass, t: "Project & Operations", d: "Modern project management built for hybrid, distributed, AI-augmented teams." },
            { i: Zap, t: "Digital Transformation", d: "From legacy to leverage — modernize processes, data, and decision-making." },
          ].map(({ i: Icon, t, d }) => (
            <div
              key={t}
              className="group glass relative overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
            >
              <div className="mb-5 inline-grid h-11 w-11 place-items-center rounded-xl bg-primary-gradient shadow-glow">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            See all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="glass-strong rounded-3xl p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">How we work</p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                A grounded process for ambitious outcomes
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every engagement follows a clear arc — from diagnosis to design to
                durable delivery. No theatrics. Just disciplined consulting,
                amplified by AI.
              </p>
            </div>
            <ol className="space-y-4">
              {[
                { n: "01", t: "Discover", d: "We map your operations, data, and goals to find the highest-leverage moves." },
                { n: "02", t: "Design", d: "We architect the workflows, tools, and governance needed to get there." },
                { n: "03", t: "Deploy", d: "We implement, train teams, and hand over systems your people can actually own." },
              ].map((step) => (
                <li key={step.n} className="glass flex gap-4 rounded-2xl p-5">
                  <div className="text-xl font-display font-semibold text-gradient">{step.n}</div>
                  <div>
                    <div className="font-semibold">{step.t}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Sample client feedback</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Example outcomes from engagements
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Illustrative testimonials representing the kind of value our consulting
            and AI adoption work consistently delivers.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              q: "The workflow audit alone paid for the engagement. Within a quarter we'd cut reporting time by more than half.",
              n: "Operations Director",
              r: "Sample feedback · Logistics",
            },
            {
              q: "They didn't just hand us tools. They built the playbook for how our team should actually work alongside AI.",
              n: "Program Manager",
              r: "Sample feedback · Healthcare",
            },
            {
              q: "Clear thinking, sharp delivery, and a genuine understanding of where AI fits — and where it doesn't.",
              n: "Founder & CEO",
              r: "Sample feedback · SaaS",
            },
          ].map((t) => (
            <figure key={t.n} className="glass rounded-2xl p-6">
              <Quote className="h-6 w-6 text-primary" />
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-5">
                <div className="text-sm font-semibold">{t.n}</div>
                <div className="text-xs text-muted-foreground">{t.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary-gradient p-10 text-center sm:p-14">
          <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
          <h2 className="relative font-display text-3xl font-semibold text-primary-foreground sm:text-4xl">
            Ready to make your operations intelligent?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Book a consultation and we'll map the highest-impact AI moves for your business — no jargon, no fluff.
          </p>
          <Link
            to="/consultation"
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-transform hover:scale-[1.03]"
          >
            Book a Consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
