"use client";

import { RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModelPendingBadge } from "@/components/translator/model-pending-badge";

export function SentencePanel() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Generated sentence</CardTitle>
        <ModelPendingBadge />
      </CardHeader>
      <CardContent>
        <p className="min-h-[3lh] text-lg leading-relaxed text-foreground/30">
          Sentences will appear here once the sign recognition and sentence
          generation pipeline is connected.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Button variant="secondary" size="sm" disabled>
            <Volume2 className="h-4 w-4" aria-hidden="true" />
            Play
          </Button>
          <Button variant="secondary" size="sm" disabled>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
