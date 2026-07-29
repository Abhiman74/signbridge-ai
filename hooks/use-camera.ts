"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CameraPermissionState } from "@/types";

type UseCameraResult = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  permission: CameraPermissionState;
  isStreaming: boolean;
  error: string | null;
  resolution: { width: number; height: number } | null;
  frameRate: number | null;
  start: () => Promise<void>;
  stop: () => void;
};

export function useCamera(): UseCameraResult {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [permission, setPermission] = useState<CameraPermissionState>(
    "prompt"
  );
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resolution, setResolution] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [frameRate, setFrameRate] = useState<number | null>(null);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setResolution(null);
    setFrameRate(null);
  }, []);

  const start = useCallback(async () => {
    setError(null);

    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setPermission("unsupported");
      setError(
        "This browser does not support camera access (getUserMedia is unavailable)."
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;
      setPermission("granted");

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {
          /* autoplay can reject until user gesture; ignored intentionally */
        });
      }

      const [track] = stream.getVideoTracks();
      const settings = track?.getSettings();
      if (settings?.width && settings?.height) {
        setResolution({ width: settings.width, height: settings.height });
      }
      if (settings?.frameRate) {
        setFrameRate(Math.round(settings.frameRate));
      }

      setIsStreaming(true);
    } catch (err) {
      const domError = err as DOMException;
      if (
        domError.name === "NotAllowedError" ||
        domError.name === "PermissionDeniedError"
      ) {
        setPermission("denied");
        setError(
          "Camera access was denied. Enable camera permissions for this site in your browser settings and try again."
        );
      } else if (domError.name === "NotFoundError") {
        setError("No camera device was found on this system.");
      } else {
        setError(
          domError.message || "Unable to access the camera. Please try again."
        );
      }
      setIsStreaming(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return {
    videoRef,
    permission,
    isStreaming,
    error,
    resolution,
    frameRate,
    start,
    stop,
  };
}
