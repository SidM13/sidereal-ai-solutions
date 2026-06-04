import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHeader, Section } from "../components/PageShell";
import { CheckCircle2, Calendar, Mail, Building2, User, Sparkles } from "lucide-react";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — SideReal AI Vision" },
      { name: "description", content: "Request a consultation with SideReal AI Vision. Tell us your business challenge and we'll be in touch." },
      { property: "og:title", content: "Book a Consultation — SideReal AI Vision" },
      { property: "og:description", content: "Tell us your business challenge and we'll be in touch within 1–2 business days." },
    ],
  }),
  component: ConsultationPage,
});

const services = [
  "AI Business Strategy",
  "Project & Operations Consulting",
  "Process Improvement",
  "Workflow Automation",
  "Business Analysis",
  "Digital Transformation",
  "AI Tools Implementation",
  "Performance Optimization",
];

type Errors = Partial<Record<"name" | "email" | "service" | "challenge", string>>;

function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const service = String(f.get("service") ?? "").trim();
    const challenge = String(f.get("challenge") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (!service) next.service = "Pick a service.";
    if (!challenge) next.challenge = "Tell us a bit about your challenge.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <PageHeader eyebrow="Consultation" title={<>Request received</>} />
        <Section>
          <div className="glass-strong mx-auto max-w-2xl rounded-3xl p-10 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-gradient shadow-glow">
              <CheckCircle2 className="h-7 w-7 text-primary-foreground" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-semibold sm:text-3xl">
              Thank you — we'll be in touch
            </h2>
            <p className="mt-3 text-muted-foreground">
              Your consultation request has been received. A member of the SideReal
              AI Vision team will respond within 1–2 business days to schedule a
              session and review your challenge.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-white/10"
            >
              Submit another request
            </button>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Consultation"
        title={<>Book a <span className="text-gradient">consultation</span></>}
        subtitle="Share a bit about your business and where you'd like to go. We'll respond personally."
      />

      <Section>
        <form
          onSubmit={onSubmit}
          noValidate
          className="glass-strong mx-auto max-w-3xl rounded-3xl p-6 sm:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" icon={<User className="h-4 w-4" />} error={errors.name}>
              <input
                name="name"
                maxLength={100}
                placeholder="Your full name"
                className={inputCls}
              />
            </Field>

            <Field label="Email" icon={<Mail className="h-4 w-4" />} error={errors.email}>
              <input
                name="email"
                type="email"
                maxLength={255}
                placeholder="you@company.com"
                className={inputCls}
              />
            </Field>

            <Field label="Company / Organization" icon={<Building2 className="h-4 w-4" />}>
              <input
                name="company"
                maxLength={150}
                placeholder="Optional"
                className={inputCls}
              />
            </Field>

            <Field label="Preferred date / time" icon={<Calendar className="h-4 w-4" />}>
              <input
                name="datetime"
                type="datetime-local"
                className={inputCls}
              />
            </Field>

            <Field label="Service interested in" icon={<Sparkles className="h-4 w-4" />} error={errors.service} className="sm:col-span-2">
              <select name="service" defaultValue="" className={inputCls}>
                <option value="" disabled>Select a service</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>

            <Field label="Business challenge" error={errors.challenge} className="sm:col-span-2">
              <textarea
                name="challenge"
                rows={5}
                maxLength={1500}
                placeholder="What are you trying to solve, improve, or unlock?"
                className={`${inputCls} resize-y`}
              />
            </Field>
          </div>

          <button
            type="submit"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-gradient px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.01] sm:w-auto"
          >
            Submit consultation request
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            By submitting, you agree to be contacted about your inquiry.
          </p>
        </form>
      </Section>
    </>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary/60 focus:bg-white/10";

function Field({
  label,
  icon,
  error,
  className = "",
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
