"use client";

import { motion } from "framer-motion";
import { howItWorks } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-foreground/60">
            From camera to fluent sentence, in five on-device steps.
          </p>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-border-subtle sm:block"
          />
          <ol className="flex flex-col gap-10">
            {howItWorks.map((item, i) => (
              <motion.li
                key={item.step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative flex gap-6"
              >
                <div className="brand-gradient-bg z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-semibold text-white shadow-lg shadow-brand-via/20">
                  {item.step}
                </div>
                <div className="pt-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-1.5 max-w-xl text-foreground/60">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
