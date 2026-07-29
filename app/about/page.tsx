import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { techStack } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why SignBridge AI exists, how it's architected, and where the project is headed.",
};

const principles = [
  {
    title: "Accessibility first",
    body: "Sign language is a primary language for millions of Deaf and hard-of-hearing people. SignBridge AI exists to remove friction — no account, no install, no cost — between someone signing and someone who needs a translation.",
  },
  {
    title: "On-device by default",
    body: "Every architectural decision starts from the constraint that camera video should never need to leave the browser. That ruled out a conventional backend from day one.",
  },
  {
    title: "Honest about what works",
    body: "The interface never fabricates a prediction. If a model isn't loaded yet, the UI says so explicitly instead of showing a plausible-looking fake result.",
  },
  {
    title: "Swappable models",
    body: "Gesture recognition is defined behind a single TypeScript interface (GestureRecognitionModel). Better models can be dropped in later without touching a single UI component.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-16">
        <div>
          <Badge variant="outline">About the project</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Built to make sign language understood, instantly.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-foreground/60">
            SignBridge AI is a browser-based sign language interpreter. It
            has no login, no backend, and no cloud inference — the entire
            pipeline, from camera frame to spoken sentence, is designed to
            run on the device in front of you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {principles.map((p) => (
            <Card key={p.title}>
              <CardHeader>
                <CardTitle>{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-foreground/60">
                  {p.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Current build status
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/60">
            This is an actively developed project. The camera pipeline,
            landing experience, and page shell are complete and deployable
            today. The gesture recognition model, sentence generation layer,
            speech synthesis controls, and offline support are being built
            in subsequent milestones — each one shipped only once it
            actually works end to end.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Technology
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {techStack.map((t) => (
              <Badge key={t.name} variant="outline">
                {t.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
