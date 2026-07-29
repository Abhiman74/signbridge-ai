"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Hand,
  MessageSquare,
  ShieldCheck,
  Volume2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/lib/constants";

const icons: Record<string, LucideIcon> = {
  Cpu,
  Zap,
  Hand,
  MessageSquare,
  Volume2,
  ShieldCheck,
};

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything happens on your device
          </h2>
          <p className="mt-4 text-lg text-foreground/60">
            No middleman servers. No latency from round-tripping video to the
            cloud. Just your browser and open-source models.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = icons[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Card className="h-full transition-colors hover:border-brand-via/40">
                  <CardHeader>
                    <div className="brand-gradient-bg flex h-10 w-10 items-center justify-center rounded-xl text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-3">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-foreground/60">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
