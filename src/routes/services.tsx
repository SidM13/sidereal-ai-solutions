import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "../components/PageShell";
import {
  Brain, Briefcase, Workflow, Bot, LineChart, Cpu, Compass, Gauge, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — SideReal AI Vision" },
      { name: "description", content: "AI business strategy, project & operations consulting, workflow automation, digital transformation, and more." },
      { property: "og:title", content: "Services — SideReal AI Vision" },
      { property: "og:description", content: "A complete AI-powered consulting practice for modern businesses." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { i: Brain, t: "AI Business Strategy", d: "Define where AI creates real value in your business and how to capture it — without distraction." },
  { i: Briefcase, t: "Project & Operations Consulting", d: "Modern project leadership and operating models built for hybrid, AI-augmented teams." },
  { i: Gauge, t: "Process Improvement", d: "Identify and remove the friction quietly costing your organization time, money, and morale." },
  { i: Workflow, t: "Workflow Automation", d: "Replace repetitive work with reliable, auditable automated systems and AI agents." },
  { i: LineChart, t: "Business Analysis", d: "Translate data into decisions with clean dashboards, KPIs, and analyst-grade insight." },
  { i: Compass, t: "Digital Transformation", d: "Modernize people, processes, and platforms — sequenced so change actually sticks." },
  { i: Bot, t: "AI Tools Implementation", d: "Select, integrate, and adopt the right AI tools across teams with proper governance." },
  { i: Cpu, t: "Performance Optimization", d: "Diagnose bottlenecks and rebuild operations around what actually moves the needle." },
];

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={<>A focused, modern <span className="text-gradient">consulting practice</span></>}
        subtitle="From strategy to deployment, our services span the disciplines today's businesses need to thrive in an AI-driven world."
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ i: Icon, t, d }) => (
            <div
              key={t}
              className="group glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
            >
              <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-xl bg-primary-gradient shadow-glow">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold">{t}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{d}</p>
              <Link
                to="/consultation"
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary opacity-80 transition-opacity group-hover:opacity-100"
              >
                Discuss this <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="relative overflow-hidden rounded-3xl bg-primary-gradient p-10 text-center sm:p-14">
          <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
          <h2 className="relative font-display text-3xl font-semibold text-primary-foreground sm:text-4xl">
            Not sure which service fits?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Try our interactive recommendation tool. Tell us your challenge and
            we'll point you to the right starting point.
          </p>
          <Link
            to="/solutions"
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground"
          >
            Explore AI Solutions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
