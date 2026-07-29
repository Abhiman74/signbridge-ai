/// <reference lib="webworker" />

import {
  FilesetResolver,
  HandLandmarker,
} from "@mediapipe/tasks-vision";
import type { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import {
  HAND_LANDMARKER_MODEL_URL,
  MAX_NUM_HANDS,
  MEDIAPIPE_WASM_BASE_PATH,
} from "@/lib/mediapipe/config";
import { fetchModelBuffer } from "@/lib/mediapipe/fetch-model";
import type { WorkerRequest, WorkerResponse } from "@/lib/mediapipe/worker-protocol";
import { createDefaultModel } from "@/lib/ai/model-registry";
import type { FrameLandmarks, GestureRecognitionModel, RecognizedSign } from "@/types";

const ctx = self as unknown as DedicatedWorkerGlobalScope;

let landmarker: HandLandmarker | null = null;
let gestureModel: GestureRecognitionModel | null = null;
let initPromise: Promise<void> | null = null;

function post(message: WorkerResponse, transfer: Transferable[] = []) {
  ctx.postMessage(message, transfer);
}

async function createLandmarker(
  vision: Awaited<ReturnType<typeof FilesetResolver.forVisionTasks>>,
  modelAssetBuffer: Uint8Array,
  delegate: "GPU" | "CPU"
) {
  return HandLandmarker.createFromOptions(vision, {
    baseOptions: { modelAssetBuffer, delegate },
    runningMode: "VIDEO",
    numHands: MAX_NUM_HANDS,
    minHandDetectionConfidence: 0.5,
    minHandPresenceConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });
}

async function initialize(): Promise<void> {
  const vision = await FilesetResolver.forVisionTasks(MEDIAPIPE_WASM_BASE_PATH);
  const modelAssetBuffer = new Uint8Array(
    await fetchModelBuffer(HAND_LANDMARKER_MODEL_URL)
  );

  try {
    landmarker = await createLandmarker(vision, modelAssetBuffer, "GPU");
  } catch {
    // GPU delegate can fail on machines without a usable WebGL context.
    // Fall back to the CPU delegate rather than surfacing an error.
    landmarker = await createLandmarker(vision, modelAssetBuffer, "CPU");
  }

  gestureModel = createDefaultModel();
  await gestureModel.load();
}

async function classifyHands(
  result: HandLandmarkerResult,
  timestampMs: number
): Promise<RecognizedSign[]> {
  if (!gestureModel) return [];

  const signs: RecognizedSign[] = [];
  for (let i = 0; i < result.landmarks.length; i++) {
    const handedness = result.handedness[i]?.[0]?.categoryName;
    const frame: FrameLandmarks = {
      timestampMs,
      leftHand: handedness === "Left" ? result.landmarks[i] : null,
      rightHand: handedness === "Right" ? result.landmarks[i] : null,
      pose: null,
      face: null,
    };

    try {
      const prediction = await gestureModel.predict(frame);
      if (prediction) signs.push(prediction);
    } catch {
      // A single bad frame shouldn't take down the whole pipeline.
    }
  }
  return signs;
}

ctx.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const msg = event.data;

  if (msg.type === "init") {
    if (!initPromise) {
      initPromise = initialize()
        .then(() => post({ type: "ready" }))
        .catch((err) => {
          initPromise = null;
          post({
            type: "error",
            message: err instanceof Error ? err.message : "Failed to load model",
          });
        });
    }
    await initPromise;
    return;
  }

  if (msg.type === "detect") {
    const { bitmap, timestampMs } = msg;

    if (!landmarker) {
      bitmap.close();
      post({ type: "error", message: "Model not ready" });
      return;
    }

    try {
      const start = performance.now();
      const result = landmarker.detectForVideo(bitmap, timestampMs);
      const recognizedSigns = await classifyHands(result, timestampMs);
      const inferenceMs = performance.now() - start;
      post({ type: "result", result, recognizedSigns, timestampMs, inferenceMs });
    } catch (err) {
      post({
        type: "error",
        message: err instanceof Error ? err.message : "Detection failed",
      });
    } finally {
      bitmap.close();
    }
  }
};
