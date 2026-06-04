import { Link } from "@tanstack/react-router";
import { Sparkles, Linkedin, Twitter, Mail, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-gradient shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display text-base font-semibold">
              SideReal <span className="text-gradient">AI Vision</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            AI-powered consulting for project management, operations, and business
            transformation. We help organizations build smarter workflows and adopt
            the future of intelligent work.
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Twitter, label: "Twitter" },
              { icon: Github, label: "GitHub" },
              { icon: Mail, label: "Email" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-foreground">AI Business Strategy</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Project & Operations</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Workflow Automation</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Digital Transformation</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/solutions" className="hover:text-foreground">AI Solutions</Link></li>
            <li><Link to="/consultation" className="hover:text-foreground">Book a Consultation</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 sm:flex-row sm:px-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SideReal AI Vision. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with intention — for the next era of intelligent business.
          </p>
        </div>
      </div>
    </footer>
  );
}
