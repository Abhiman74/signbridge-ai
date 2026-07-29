"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="brand-gradient-bg relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-8 py-16 text-center text-white sm:px-16"
      >
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to be understood?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/85">
          No downloads. No forms. Open the translator and grant camera
          access to get started.
        </p>
        <Button
          size="lg"
          asChild
          className="mt-8 bg-white text-brand-via shadow-xl hover:bg-white/90"
        >
          <Link href="/translator">
            Start Translating
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
