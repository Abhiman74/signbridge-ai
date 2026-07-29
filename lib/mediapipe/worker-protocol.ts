import type { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import type { RecognizedSign } from "@/types";

export type WorkerRequest =
  | { type: "init" }
  | { type: "detect"; bitmap: ImageBitmap; timestampMs: number };

export type WorkerResponse =
  | { type: "ready" }
  | { type: "error"; message: string }
  | {
      type: "result";
      result: HandLandmarkerResult;
      recognizedSigns: RecognizedSign[];
      timestampMs: number;
      inferenceMs: number;
    };
