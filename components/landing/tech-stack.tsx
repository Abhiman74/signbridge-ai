"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { techStack } from "@/lib/constants";

export function TechStack() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Built on an open, browser-native stack
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/60">
          Every layer of SignBridge AI — from rendering to inference — runs
          in standard web technologies. No proprietary runtime required.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {techStack.map((tech) => (
            <Badge key={tech.name} variant="outline" className="py-1.5">
              {tech.name}
              <span className="ml-2 text-foreground/40">
                {tech.category}
              </span>
            </Badge>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
