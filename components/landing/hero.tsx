"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
      <div
        aria-hidden="true"
        className="grid-fade-mask pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-subtle)_1px,transparent_1px)] bg-[size:56px_56px]"
      />
      <div
        aria-hidden="true"
        className="animate-float pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--brand-via)_35%,transparent),transparent)] blur-3xl"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="gap-1.5">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            100% on-device · no signup required
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          Sign language, translated{" "}
          <span className="brand-gradient-text">in real time</span> —
          right in your browser
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-foreground/60"
        >
          {siteConfig.tagline} No accounts. No installs. No cloud servers
          watching your camera. SignBridge AI runs entirely on your device.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button size="lg" asChild>
            <Link href="/translator">
              Start Translating
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              View on GitHub
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="glass mt-16 w-full max-w-3xl rounded-2xl p-2 shadow-2xl"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-surface-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-foreground/40">
                <div className="animate-pulse-ring h-16 w-16 rounded-full brand-gradient-bg" />
                <p className="text-sm">Live camera preview appears here</p>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 rounded-xl bg-black/40 px-4 py-3 text-left text-white backdrop-blur-md">
              <div>
                <p className="text-xs uppercase tracking-wide text-white/60">
                  Generated sentence
                </p>
                <p className="text-sm font-medium">
                  &ldquo;I&rsquo;m going to the market tomorrow.&rdquo;
                </p>
              </div>
              <Badge variant="brand">94% confidence</Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
