import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModelPendingBadge } from "@/components/translator/model-pending-badge";

export function StatusPanel() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Detected sign</CardTitle>
        <ModelPendingBadge />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold text-foreground/30">—</p>
        <div className="mt-4 flex items-center justify-between text-sm text-foreground/50">
          <span>Confidence</span>
          <span>—</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
          <div className="h-full w-0 rounded-full brand-gradient-bg" />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-foreground/40">
          Gesture recognition ships in Milestone 2. This panel will populate
          with real, on-device predictions — never simulated values.
        </p>
      </CardContent>
    </Card>
  );
}
