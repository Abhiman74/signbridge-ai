"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do I need to create an account?",
    a: "No. SignBridge AI has no signup, login, or session of any kind. Open the site and start using the translator immediately.",
  },
  {
    q: "Where does my camera video go?",
    a: "Nowhere. Video frames are processed locally in your browser using WebAssembly-based models. Nothing is uploaded to a server.",
  },
  {
    q: "Does this work offline?",
    a: "Once models are cached (Milestone 4 of the roadmap), the app is designed to work as an installable, offline-capable Progressive Web App.",
  },
  {
    q: "What sign language(s) are supported?",
    a: "The recognition pipeline is architected to be model-agnostic. As real, browser-compatible open-source models become available, they can be swapped in without UI changes — see the Documentation page for the current model status.",
  },
  {
    q: "Can I deploy this myself?",
    a: "Yes. The entire project is a static/serverless-friendly Next.js app that deploys to Vercel with git push — no databases, containers, or extra infrastructure required.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
