import Link from "next/link";
import { Github, HandMetal } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="brand-gradient-bg flex h-7 w-7 items-center justify-center rounded-lg text-white">
              <HandMetal className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            {siteConfig.name}
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-foreground/60">
            {siteConfig.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm sm:flex sm:gap-16">
          <div className="flex flex-col gap-3">
            <span className="font-medium text-foreground/80">Product</span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring text-foreground/60 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-medium text-foreground/80">Project</span>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-1.5 text-foreground/60 hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border-subtle px-6 py-6 text-center text-xs text-foreground/50">
        Built for accessibility. Runs entirely in your browser — no data ever
        leaves your device.
      </div>
    </footer>
  );
}
