import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Section } from "../components/PageShell";
import {
  Workflow, Clock, FileBarChart, KanbanSquare, Bot, LayoutDashboard,
  ArrowRight, CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "AI Solutions — SideReal AI Vision" },
      { name: "description", content: "Choose your business challenge and get a tailored AI solution recommendation." },
      { property: "og:title", content: "AI Solutions — SideReal AI Vision" },
      { property: "og:description", content: "Interactive solution finder for operations, automation, reporting, and AI workflows." },
    ],
  }),
  component: SolutionsPage,
});

type Option = {
  id: string;
  icon: typeof Workflow;
  label: string;
  description: string;
  rec: {
    service: string;
    summary: string;
    bullets: string[];
  };
};

const options: Option[] = [
  {
    id: "ops",
    icon: Workflow,
    label: "Improve operations",
    description: "Make the day-to-day faster, cleaner, and more accountable.",
    rec: {
      service: "Process Improvement + Operations Consulting",
      summary: "We map your current operations, identify the highest-leverage bottlenecks, and redesign the workflows around clear ownership and AI-assisted decisioning.",
      bullets: ["Operations diagnostic", "Workflow redesign", "KPI & ownership model", "Team enablement"],
    },
  },
  {
    id: "manual",
    icon: Clock,
    label: "Reduce manual work",
    description: "Cut out the repetitive tasks eating your team's week.",
    rec: {
      service: "Workflow Automation + AI Tools Implementation",
      summary: "We identify automation candidates by ROI, then implement reliable, auditable systems — combining AI agents, integrations, and clean handoffs.",
      bullets: ["Automation audit", "Tool selection", "Build & integrate", "Adoption playbook"],
    },
  },
  {
    id: "reporting",
    icon: FileBarChart,
    label: "Automate reporting",
    description: "Stop building the same report every week — let intelligence do it.",
    rec: {
      service: "Business Analysis + AI-Driven Reporting",
      summary: "We build self-updating dashboards and AI-generated narratives so leaders get clear, on-demand insight instead of stale weekly decks.",
      bullets: ["Data audit", "Dashboard build", "AI narrative layer", "Stakeholder training"],
    },
  },
  {
    id: "projects",
    icon: KanbanSquare,
    label: "Improve project tracking",
    description: "Bring visibility, rhythm, and accountability to delivery.",
    rec: {
      service: "Project & Operations Consulting",
      summary: "We install a modern project operating system — clear cadences, lightweight tooling, and AI-assisted status reporting that scales with the team.",
      bullets: ["PMO design", "Tool rationalization", "Status automation", "Leadership ritual design"],
    },
  },
  {
    id: "workflows",
    icon: Bot,
    label: "Build AI workflows",
    description: "Wire AI directly into how your business actually runs.",
    rec: {
      service: "AI Business Strategy + Workflow Automation",
      summary: "We design and deploy AI workflows that fit your data, your team, and your governance — not generic templates.",
      bullets: ["AI opportunity map", "Workflow architecture", "Build & evaluate", "Governance & guardrails"],
    },
  },
  {
    id: "dash",
    icon: LayoutDashboard,
    label: "Create business dashboards",
    description: "A single source of truth your leaders actually use.",
    rec: {
      service: "Business Analysis + Performance Optimization",
      summary: "We design and deliver decision-grade dashboards aligned to your true KPIs — and the operating rhythm that makes them useful.",
      bullets: ["KPI alignment", "Data modeling", "Dashboard delivery", "Review-cadence design"],
    },
  },
];

function SolutionsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = options.find((o) => o.id === selected) ?? null;

  return (
    <>
      <PageHeader
        eyebrow="AI Solutions"
        title={<>Tell us your challenge. <br /><span className="text-gradient">Get a tailored direction.</span></>}
        subtitle="Pick the business problem you're trying to solve. We'll recommend a starting point grounded in real consulting practice."
      />

      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {options.map(({ id, icon: Icon, label, description }) => {
            const isActive = selected === id;
            return (
              <button
                key={id}
                onClick={() => setSelected(id)}
                className={`group glass rounded-2xl p-6 text-left transition-all hover:-translate-y-1 hover:shadow-glow ${
                  isActive ? "border-primary/60 shadow-glow" : "hover:border-primary/40"
                }`}
              >
                <div className="mb-5 inline-grid h-11 w-11 place-items-center rounded-xl bg-primary-gradient shadow-glow">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="font-semibold">{label}</div>
                <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
                {isActive && (
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Selected
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          {current ? (
            <div className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-10 animate-fade-up">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Recommended for you</p>
              <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
                {current.rec.service}
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">{current.rec.summary}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {current.rec.bullets.map((b) => (
                  <li key={b} className="glass flex items-center gap-3 rounded-xl px-4 py-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/consultation"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow"
                >
                  Book a consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-6 py-3 text-sm font-medium text-foreground hover:bg-white/10"
                >
                  See all services
                </Link>
              </div>
            </div>
          ) : (
            <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">
              Choose a challenge above to see a recommended solution.
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
