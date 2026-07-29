import type { GestureRecognitionModel } from "@/types";
import { AslFingerspellingModel } from "./asl-fingerspelling-model";

/**
 * Central place that decides which GestureRecognitionModel implementation
 * is active. Swapping in a trained classifier later (ONNX/TFJS) means
 * adding a class here and changing DEFAULT_MODEL_ID — nothing in the
 * worker, hooks, or UI needs to change since they only depend on the
 * shared interface.
 */
export const modelRegistry: Record<string, () => GestureRecognitionModel> = {
  "asl-fingerspelling-heuristic-v1": () => new AslFingerspellingModel(),
};

export const DEFAULT_MODEL_ID = "asl-fingerspelling-heuristic-v1";

export function createDefaultModel(): GestureRecognitionModel {
  return modelRegistry[DEFAULT_MODEL_ID]();
}
