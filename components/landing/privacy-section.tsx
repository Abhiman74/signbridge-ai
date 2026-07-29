"use client";

import { motion } from "framer-motion";
import { Ban, Cloud, Database, KeyRound, Server, Video } from "lucide-react";

const points = [
  { icon: Video, text: "Camera frames never leave your device" },
  { icon: Server, text: "No backend server receives or stores video" },
  { icon: Database, text: "No database — nothing is persisted remotely" },
  { icon: KeyRound, text: "No account, login, or personal data required" },
  { icon: Cloud, text: "No cloud inference — models run in your browser" },
  { icon: Ban, text: "No tracking of what you sign" },
];

export function PrivacySection() {
  return (
    <section id="privacy" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="glass grid grid-cols-1 gap-10 rounded-3xl p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Privacy isn&rsquo;t a setting.
              <br />
              It&rsquo;s the architecture.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/60">
              SignBridge AI was designed so that video never has anywhere to
              go. There is no server endpoint that accepts a video frame,
              because there is no server in the inference path at all.
            </p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {points.map((point) => (
              <li
                key={point.text}
                className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface/60 p-4"
              >
                <point.icon
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-via"
                  aria-hidden="true"
                />
                <span className="text-sm text-foreground/70">
                  {point.text}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
