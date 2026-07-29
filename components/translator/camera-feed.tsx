"use client";

import { useState, type RefObject } from "react";
import { Maximize2, Minimize2, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PermissionGate } from "@/components/translator/permission-gate";
import type { CameraPermissionState } from "@/types";

type Props = {
  videoRef: RefObject<HTMLVideoElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  permission: CameraPermissionState;
  isStreaming: boolean;
  error: string | null;
  onRequestAccess: () => void;
  paused: boolean;
  onTogglePause: () => void;
};

export function CameraFeed({
  videoRef,
  containerRef,
  permission,
  isStreaming,
  error,
  onRequestAccess,
  paused,
  onTogglePause,
}: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex aspect-video w-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-black"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        style={{ display: isStreaming ? "block" : "none", transform: "scaleX(-1)" }}
        playsInline
        muted
        aria-label="Live camera preview"
      />

      {!isStreaming && (
        <PermissionGate
          permission={permission}
          error={error}
          onRequestAccess={onRequestAccess}
        />
      )}

      {isStreaming && (
        <>
          {paused && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white">
              <p className="text-sm font-medium">Detection paused</p>
            </div>
          )}
          <div className="absolute right-3 top-3 flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={onTogglePause}
              aria-label={paused ? "Resume detection" : "Pause detection"}
              className="bg-black/50 text-white hover:bg-black/70 border-white/10"
            >
              {paused ? (
                <Play className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className="bg-black/50 text-white hover:bg-black/70 border-white/10"
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </div>
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            Live · local only
          </div>
        </>
      )}
    </div>
  );
}
