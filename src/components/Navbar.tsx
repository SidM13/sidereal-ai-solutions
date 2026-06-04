import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/solutions", label: "AI Solutions" },
  { to: "/consultation", label: "Book" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-border/60">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-gradient shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display text-base font-semibold tracking-tight">
              SideReal <span className="text-gradient">AI Vision</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                  activeProps={{ className: "rounded-lg px-3 py-2 text-sm text-foreground bg-white/5" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link
              to="/consultation"
              className="inline-flex items-center rounded-full bg-primary-gradient px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              Book a Consultation
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-lg border border-border lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="border-t border-border/60 lg:hidden">
            <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    activeProps={{ className: "block rounded-lg px-3 py-2.5 text-sm text-foreground bg-white/5" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  to="/consultation"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-primary-gradient px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-glow"
                >
                  Book a Consultation
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
