"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AslDebugInfo } from "@/lib/ai/asl-fingerspelling-model";

type Props = {
  debug: AslDebugInfo[];
};

/**
 * Diagnostic panel: shows the raw per-finger curl/direction estimate and
 * every candidate letter's score (not just the accepted best match).
 * Meant to be temporary/optional — this is what makes it possible to
 * calibrate the heuristic classifier against real hands instead of
 * guessing blind.
 */
export function DebugPanel({ debug }: Props) {
  // Open by default while the classifier is still being calibrated — the
  // point of this panel is to see real numbers without hunting for a
  // toggle first.
  const [open, setOpen] = useState(true);

  if (debug.length === 0) return null;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm">Diagnostics</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setOpen((v) => !v)}>
          {open ? (
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          )}
          {open ? "Hide" : "Show"}
        </Button>
      </CardHeader>
      {open && (
        <CardContent className="space-y-4 text-xs">
          {debug.map((hand, handIdx) => (
            <div key={handIdx} className="space-y-2">
              <p className="font-medium text-foreground/70">Hand {handIdx + 1}</p>

              <div>
                <p className="mb-1 text-foreground/50">Per-finger curl / direction</p>
                <div className="grid grid-cols-1 gap-1 font-mono">
                  {hand.poseData.map(([name, curl, direction]) => (
                    <div key={name} className="flex justify-between rounded bg-surface-muted px-2 py-1">
                      <span>{name}</span>
                      <span>{curl}</span>
                      <span>{direction}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-1 text-foreground/50">All candidate scores (0-10)</p>
                <div className="grid grid-cols-2 gap-1 font-mono sm:grid-cols-4">
                  {hand.scores.map((s) => (
                    <div
                      key={s.label}
                      className="flex justify-between rounded bg-surface-muted px-2 py-1"
                    >
                      <span>{s.label}</span>
                      <span>{s.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
