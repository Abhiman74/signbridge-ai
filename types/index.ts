/**
 * Shared type definitions for SignBridge AI.
 *
 * These types define the contract between the camera/landmark pipeline,
 * the gesture recognition model, and the sentence generation layer.
 * They are intentionally decoupled from any specific model implementation
 * so that models can be swapped (Milestone 2+) without changing the UI.
 */

export type NormalizedPoint = {
  x: number;
  y: number;
  z: number;
  visibility?: number;
};

export type HandLandmarks = NormalizedPoint[];

export type FrameLandmarks = {
  timestampMs: number;
  leftHand: HandLandmarks | null;
  rightHand: HandLandmarks | null;
  pose: NormalizedPoint[] | null;
  face: NormalizedPoint[] | null;
};

/**
 * A single recognized gesture/sign, emitted by a GestureRecognitionModel.
 */
export type RecognizedSign = {
  label: string;
  confidence: number; // 0..1
  timestampMs: number;
};

/**
 * Model status surfaced to the UI. The translator page renders different
 * states based on this — including an explicit "not loaded" state instead
 * of ever fabricating a prediction.
 */
export type ModelStatus =
  | "idle"
  | "loading"
  | "ready"
  | "running"
  | "error"
  | "unavailable";

/**
 * The interface every gesture recognition model must implement.
 * This lets the app swap MediaPipe-only heuristics, an ONNX classifier,
 * or a TensorFlow.js model in and out without touching any component.
 */
export interface GestureRecognitionModel {
  readonly id: string;
  readonly label: string;
  load(): Promise<void>;
  predict(frame: FrameLandmarks): Promise<RecognizedSign | null>;
  dispose(): void;
}

export type TranslatorMetrics = {
  fps: number;
  latencyMs: number;
};

export type CameraPermissionState =
  | "prompt"
  | "granted"
  | "denied"
  | "unsupported";
