import type { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import type { RecognizedSign } from "@/types";
import type { AslDebugInfo } from "@/lib/ai/asl-fingerspelling-model";

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
      debug: AslDebugInfo[];
      timestampMs: number;
      inferenceMs: number;
    };
