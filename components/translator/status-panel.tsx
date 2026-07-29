import { AlertCircle, Loader2, ScanEye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModelPendingBadge } from "@/components/translator/model-pending-badge";
import type { ModelStatus } from "@/types";

type Props = {
  trackingStatus: ModelStatus;
  trackingError: string | null;
  handedness: string[];
};

function TrackingBadge({ status }: { status: ModelStatus }) {
  if (status === "loading") {
    return (
      <Badge variant="outline" className="gap-1.5 text-foreground/50">
        <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
        Loading model
      </Badge>
    );
  }
  if (status === "error" || status === "unavailable") {
    return (
      <Badge variant="outline" className="gap-1.5 text-red-500">
        <AlertCircle className="h-3 w-3" aria-hidden="true" />
        Unavailable
      </Badge>
    );
  }
  if (status === "ready" || status === "running") {
    return (
      <Badge variant="brand" className="gap-1.5">
        <ScanEye className="h-3 w-3" aria-hidden="true" />
        Live
      </Badge>
    );
  }
  return <Badge variant="outline">Idle</Badge>;
}

export function StatusPanel({ trackingStatus, trackingError, handedness }: Props) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Hand tracking</CardTitle>
        <TrackingBadge status={trackingStatus} />
      </CardHeader>
      <CardContent>
        {trackingStatus === "error" || trackingStatus === "unavailable" ? (
          <p className="text-sm text-red-500">
            {trackingError ?? "Hand tracking is unavailable in this browser."}
          </p>
        ) : (
          <p className="text-2xl font-semibold">
            {handedness.length > 0
              ? handedness.join(" + ")
              : trackingStatus === "loading"
                ? "Loading MediaPipe model…"
                : "No hands in frame"}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-border-subtle pt-4">
          <span className="text-sm text-foreground/60">Detected sign</span>
          <ModelPendingBadge />
        </div>
        <p className="mt-1 text-lg font-semibold text-foreground/30">—</p>

        <div className="mt-3 flex items-center justify-between text-sm text-foreground/50">
          <span>Confidence</span>
          <span>—</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
          <div className="h-full w-0 rounded-full brand-gradient-bg" />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-foreground/40">
          21-point hand landmarks are now tracked live, on-device (Milestone
          2). Classifying those landmarks into signs ships in Milestone 3 —
          this panel will never show a simulated prediction before then.
        </p>
      </CardContent>
    </Card>
  );
}
