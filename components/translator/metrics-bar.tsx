type Props = {
  resolution: { width: number; height: number } | null;
  frameRate: number | null;
  isStreaming: boolean;
};

export function MetricsBar({ resolution, frameRate, isStreaming }: Props) {
  const metrics = [
    {
      label: "Camera resolution",
      value: isStreaming && resolution ? `${resolution.width}×${resolution.height}` : "—",
    },
    {
      label: "Camera FPS",
      value: isStreaming && frameRate ? `${frameRate}` : "—",
    },
    { label: "Inference FPS", value: "—", pending: true },
    { label: "Latency", value: "—", pending: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-xl border border-border-subtle bg-surface/60 px-4 py-3"
        >
          <p className="text-xs text-foreground/50">{metric.label}</p>
          <p
            className={`mt-1 text-lg font-semibold ${
              metric.pending ? "text-foreground/25" : ""
            }`}
          >
            {metric.value}
            {metric.label === "Latency" && metric.value !== "—" ? " ms" : ""}
          </p>
        </div>
      ))}
    </div>
  );
}
