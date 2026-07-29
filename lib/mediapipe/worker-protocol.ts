import type { HandLandmarkerResult } from "@mediapipe/tasks-vision";

export type WorkerRequest =
  | { type: "init" }
  | { type: "detect"; bitmap: ImageBitmap; timestampMs: number };

export type WorkerResponse =
  | { type: "ready" }
  | { type: "error"; message: string }
  | {
      type: "result";
      result: HandLandmarkerResult;
      timestampMs: number;
      inferenceMs: number;
    };
