"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import type { WorkerRequest, WorkerResponse } from "@/lib/mediapipe/worker-protocol";
import type { ModelStatus, RecognizedSign } from "@/types";

type UseHandLandmarkerOptions = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  enabled: boolean;
};

type UseHandLandmarkerResult = {
  status: ModelStatus;
  error: string | null;
  result: HandLandmarkerResult | null;
  recognizedSigns: RecognizedSign[];
  fps: number | null;
  latencyMs: number | null;
};

const SUPPORTS_PIPELINE =
  typeof window !== "undefined" &&
  typeof window.Worker !== "undefined" &&
  typeof window.createImageBitmap !== "undefined";

export function useHandLandmarker({
  videoRef,
  enabled,
}: UseHandLandmarkerOptions): UseHandLandmarkerResult {
  const [status, setStatus] = useState<ModelStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HandLandmarkerResult | null>(null);
  const [recognizedSigns, setRecognizedSigns] = useState<RecognizedSign[]>([]);
  const [fps, setFps] = useState<number | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);

  const workerRef = useRef<Worker | null>(null);
  const rafRef = useRef<number | null>(null);
  const busyRef = useRef(false);
  const frameTimesRef = useRef<number[]>([]);

  const postToWorker = useCallback((message: WorkerRequest, transfer: Transferable[] = []) => {
    workerRef.current?.postMessage(message, transfer);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    if (!SUPPORTS_PIPELINE) {
      setStatus("unavailable");
      setError(
        "This browser doesn't support the on-device inference pipeline (Web Workers + createImageBitmap are required)."
      );
      return;
    }

    setStatus("loading");
    setError(null);

    const worker = new Worker(
      new URL("../workers/hand-landmarker.worker.ts", import.meta.url),
      { type: "module" }
    );
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const msg = event.data;

      if (msg.type === "ready") {
        setStatus("ready");
        return;
      }

      if (msg.type === "error") {
        setStatus("error");
        setError(msg.message);
        busyRef.current = false;
        return;
      }

      if (msg.type === "result") {
        busyRef.current = false;
        setStatus("running");
        setResult(msg.result);
        setRecognizedSigns(msg.recognizedSigns);
        setLatencyMs(Math.round(msg.inferenceMs));

        const now = performance.now();
        const times = frameTimesRef.current;
        times.push(now);
        const cutoff = now - 1000;
        while (times.length && times[0] < cutoff) times.shift();
        setFps(times.length);
      }
    };

    worker.postMessage({ type: "init" } satisfies WorkerRequest);

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !SUPPORTS_PIPELINE) return;

    const loop = async () => {
      const video = videoRef.current;

      if (
        video &&
        video.readyState >= 2 &&
        !busyRef.current &&
        (status === "ready" || status === "running")
      ) {
        busyRef.current = true;
        try {
          const bitmap = await createImageBitmap(video);
          postToWorker(
            { type: "detect", bitmap, timestampMs: performance.now() },
            [bitmap]
          );
        } catch {
          busyRef.current = false;
        }
      }

      rafRef.current = requestAnimationFrame(() => {
        loop();
      });
    };

    rafRef.current = requestAnimationFrame(() => {
      loop();
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, status, videoRef, postToWorker]);

  return { status, error, result, recognizedSigns, fps, latencyMs };
}
