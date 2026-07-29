"use client";

import Link from "next/link";
import { useState } from "react";
import { Github, HandMetal, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { navLinks, siteConfig } from "@/lib/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        aria-label="Primary"
        className="glass mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6"
      >
        <Link
          href="/"
          className="focus-ring flex items-center gap-2 rounded-lg font-semibold tracking-tight"
        >
          <span className="brand-gradient-bg flex h-8 w-8 items-center justify-center rounded-lg text-white">
            <HandMetal className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring rounded-lg px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild>
            <Link href="/translator">Start Translating</Link>
          </Button>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {open && (
        <div className="glass mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="focus-ring rounded-lg px-4 py-3 text-sm font-medium text-foreground/70 hover:bg-surface-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center gap-2 px-2">
            <ThemeToggle />
            <Button asChild className="flex-1">
              <Link href="/translator">Start Translating</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
