"use client";

import dynamic from "next/dynamic";
import { Download, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const MobileNav = dynamic(() => import("./mobile-nav").then((m) => m.MobileNav), {
  ssr: false,
  loading: () => (
    <button
      type="button"
      aria-label="Open menu"
      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted lg:hidden"
    >
      <Menu className="size-4" aria-hidden />
    </button>
  ),
});

export type NavItem = { id: string; label: string };
type Props = { name: string; nav: NavItem[]; resumeHref: string; resumeName: string };

export function Header({ name, nav, resumeHref, resumeName }: Props) {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [nav]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        scrolled ? "border-border bg-bg/80 backdrop-blur-md" : "border-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-lg bg-accent font-mono text-sm text-accent-fg"
          >
            US
          </span>
          <span className="sr-only sm:not-sr-only">{name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.id}
              href={`/#${n.id}`}
              aria-current={active === n.id ? "location" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors hover:text-fg",
                active === n.id ? "bg-accent-soft text-accent" : "text-muted",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="secondary" className="hidden sm:inline-flex">
            <a href={resumeHref} download={resumeName}>
              <Download className="size-4" aria-hidden /> Resume
            </a>
          </Button>
          <ThemeToggle />
          <MobileNav nav={nav} resumeHref={resumeHref} resumeName={resumeName} />
        </div>
      </div>
    </header>
  );
}
