"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useCamera } from "@/hooks/use-camera";
import { useHandLandmarker } from "@/hooks/use-hand-landmarker";
import { useFingerspellingBuffer } from "@/hooks/use-fingerspelling-buffer";
import { CameraFeed } from "@/components/translator/camera-feed";
import { HandOverlay } from "@/components/translator/hand-overlay";
import { StatusPanel } from "@/components/translator/status-panel";
import { SentencePanel } from "@/components/translator/sentence-panel";
import { MetricsBar } from "@/components/translator/metrics-bar";

export default function TranslatorPage() {
  const {
    videoRef,
    permission,
    isStreaming,
    error,
    resolution,
    frameRate,
    start,
    stop,
  } = useCamera();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  const {
    status: trackingStatus,
    error: trackingError,
    result: handResult,
    recognizedSigns,
    fps: inferenceFps,
    latencyMs,
  } = useHandLandmarker({ videoRef, enabled: isStreaming && !paused });

  const {
    currentWord,
    committedText,
    fullText,
    pendingLabel,
    pendingProgress,
    update: updateBuffer,
    clear: clearBuffer,
  } = useFingerspellingBuffer();

  useEffect(() => {
    if (!isStreaming || paused) return;
    updateBuffer(recognizedSigns, performance.now());
    // recognizedSigns is a fresh array reference every processed frame,
    // which is exactly the cadence we want to drive the buffer at.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recognizedSigns, isStreaming, paused]);

  const handedness = useMemo(() => {
    if (!handResult) return [];
    return handResult.handedness
      .map((h) => h[0]?.categoryName)
      .filter((label): label is string => Boolean(label));
  }, [handResult]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Live Translator
          </h1>
          <p className="mt-1 text-sm text-foreground/60">
            Everything below runs locally in this browser tab.
          </p>
        </div>
        {isStreaming && (
          <button
            type="button"
            onClick={stop}
            className="focus-ring self-start rounded-full border border-border-subtle px-4 py-2 text-sm font-medium text-foreground/70 hover:bg-surface-muted sm:self-auto"
          >
            Stop camera
          </button>
        )}
      </div>

      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-4">
          <CameraFeed
            videoRef={videoRef}
            containerRef={containerRef}
            permission={permission}
            isStreaming={isStreaming}
            error={error}
            onRequestAccess={start}
            paused={paused}
            onTogglePause={() => setPaused((p) => !p)}
            overlay={
              <HandOverlay
                result={handResult}
                width={resolution?.width ?? 1280}
                height={resolution?.height ?? 720}
              />
            }
          />
          <MetricsBar
            resolution={resolution}
            frameRate={frameRate}
            isStreaming={isStreaming}
            inferenceFps={isStreaming ? inferenceFps : null}
            latencyMs={isStreaming ? latencyMs : null}
          />
        </div>

        <div className="flex flex-col gap-4">
          <StatusPanel
            trackingStatus={trackingStatus}
            trackingError={trackingError}
            handedness={handedness}
            recognizedSigns={recognizedSigns}
            pendingLabel={pendingLabel}
            pendingProgress={pendingProgress}
          />
          <SentencePanel
            currentWord={currentWord}
            committedText={committedText}
            fullText={fullText}
            onClear={clearBuffer}
          />
        </div>
      </div>
    </div>
  );
}
