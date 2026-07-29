import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ModelPendingBadge({ label = "Waiting for model" }: { label?: string }) {
  return (
    <Badge variant="outline" className="gap-1.5 text-foreground/50">
      <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
      {label}
    </Badge>
  );
}
