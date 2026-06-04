import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHeader, Section } from "../components/PageShell";
import { Mail, Linkedin, Twitter, Github, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SideReal AI Vision" },
      { name: "description", content: "Get in touch with SideReal AI Vision — AI consulting, project management, and digital transformation." },
      { property: "og:title", content: "Contact — SideReal AI Vision" },
      { property: "og:description", content: "Reach out about AI consulting, operations, and digital transformation." },
    ],
  }),
  component: ContactPage,
});

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (!message) next.message = "Add a short message.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitted(true);
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Let's start a <span className="text-gradient">conversation</span></>}
        subtitle="Questions, collaborations, or just exploring what AI could do for your team — we'd love to hear from you."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="glass-strong rounded-3xl p-7">
              <h3 className="font-display text-xl font-semibold">Email</h3>
              <a
                href="mailto:hello@sidereal-ai.vision"
                className="mt-3 inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Mail className="h-4 w-4" /> hello@sidereal-ai.vision
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                We respond to most inquiries within one business day.
              </p>
            </div>

            <div className="glass-strong mt-5 rounded-3xl p-7">
              <h3 className="font-display text-xl font-semibold">Connect</h3>
              <div className="mt-4 flex gap-2">
                {[
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Github, label: "GitHub" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Thank you for considering SideReal AI Vision. We look forward to
                helping you build a clearer, more intelligent future for your
                business.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="glass-strong rounded-3xl p-10 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-gradient shadow-glow">
                  <CheckCircle2 className="h-7 w-7 text-primary-foreground" />
                </div>
                <h2 className="mt-6 font-display text-2xl font-semibold">Message sent</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Thanks for reaching out. We'll get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-5 py-2.5 text-sm font-medium hover:bg-white/10"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="glass-strong rounded-3xl p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" error={errors.name}>
                    <input name="name" maxLength={100} placeholder="Your name" className={inputCls} />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input name="email" type="email" maxLength={255} placeholder="you@company.com" className={inputCls} />
                  </Field>
                  <Field label="Subject" className="sm:col-span-2">
                    <input name="subject" maxLength={150} placeholder="What's this about?" className={inputCls} />
                  </Field>
                  <Field label="Message" error={errors.message} className="sm:col-span-2">
                    <textarea name="message" rows={5} maxLength={1500} placeholder="Tell us a little more…" className={`${inputCls} resize-y`} />
                  </Field>
                </div>
                <button
                  type="submit"
                  className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-primary-gradient px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-glow sm:w-auto"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-primary/60 focus:bg-white/10";

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
