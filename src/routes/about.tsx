import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "../components/PageShell";
import { Target, Heart, Lightbulb, Globe, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SideReal AI Vision" },
      { name: "description", content: "A future-focused consulting practice helping businesses adopt AI, modernize operations, and lead in the intelligent era." },
      { property: "og:title", content: "About SideReal AI Vision" },
      { property: "og:description", content: "Future-focused AI consulting for strategy, operations, and digital transformation." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={<>A consulting practice <span className="text-gradient">built for what's next</span></>}
        subtitle="SideReal AI Vision exists to help ambitious organizations turn AI from a buzzword into a working advantage — across strategy, projects, and operations."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="glass-strong rounded-3xl p-8 sm:p-10">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Our purpose</h2>
            <p className="mt-4 text-muted-foreground">
              We believe the next decade of business will be defined by how
              thoughtfully organizations integrate intelligence — not just
              technology — into the way they work. Our practice combines the
              discipline of project management, the rigor of operations consulting,
              and the leverage of modern AI to help leaders make confident,
              compounding decisions.
            </p>
            <p className="mt-4 text-muted-foreground">
              We're future-focused, but grounded. We care less about hype, and more
              about what actually ships, scales, and serves people.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { i: Target, t: "Outcome-led", d: "Every engagement is anchored to a measurable business result." },
              { i: Heart, t: "Humanized", d: "AI works best when it serves people. We design for both." },
              { i: Lightbulb, t: "Pragmatic", d: "We pick the simplest tool that solves the real problem." },
              { i: Globe, t: "Industry-wide", d: "Experience across services, SaaS, operations, and healthcare." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="glass rounded-2xl p-5">
                <div className="mb-3 inline-grid h-10 w-10 place-items-center rounded-lg bg-primary-gradient shadow-glow">
                  <Icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="font-semibold">{t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="glass-strong rounded-3xl p-8 sm:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Expertise</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            What we bring to the table
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Project Management",
              "Operations Improvement",
              "Business Strategy",
              "AI Adoption Roadmaps",
              "Workflow Automation",
              "Digital Transformation",
              "Process Engineering",
              "Performance Analytics",
              "Change Management",
            ].map((c) => (
              <div key={c} className="glass flex items-center gap-3 rounded-xl px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
                <span className="text-sm">{c}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow"
            >
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
