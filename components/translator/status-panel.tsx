import { AlertCircle, Loader2, ScanEye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ModelStatus, RecognizedSign } from "@/types";

type Props = {
  trackingStatus: ModelStatus;
  trackingError: string | null;
  handedness: string[];
  recognizedSigns: RecognizedSign[];
  pendingLabel: string | null;
  pendingProgress: number;
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

export function StatusPanel({
  trackingStatus,
  trackingError,
  handedness,
  recognizedSigns,
  pendingLabel,
  pendingProgress,
}: Props) {
  const best = recognizedSigns.length
    ? recognizedSigns.reduce((a, b) => (b.confidence > a.confidence ? b : a))
    : null;

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
          <span className="text-sm text-foreground/60">Detected letter</span>
          <Badge variant={best ? "brand" : "outline"}>
            {best ? "ASL fingerspelling" : "No match"}
          </Badge>
        </div>
        <p className="mt-1 text-4xl font-bold tracking-tight">
          {best?.label ?? pendingLabel ?? "—"}
        </p>

        <div className="mt-3 flex items-center justify-between text-sm text-foreground/50">
          <span>Confidence</span>
          <span>{best ? `${Math.round(best.confidence * 100)}%` : "—"}</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
          <div
            className="h-full rounded-full brand-gradient-bg transition-all"
            style={{
              width: `${Math.round((best ? best.confidence : pendingProgress) * 100)}%`,
            }}
          />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-foreground/40">
          Heuristic classifier (fingerpose) over live landmarks — supports
          A, B, C, D, E, F, I, L, O, U, V, W, Y. Hold a shape steady to
          commit a letter; not a trained neural network yet.
        </p>
      </CardContent>
    </Card>
  );
}
