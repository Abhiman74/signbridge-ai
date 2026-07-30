import { GestureEstimator } from "fingerpose";
import { ASL_FINGERSPELLING_GESTURES } from "./gestures/asl-fingerspelling";
import type { FrameLandmarks, GestureRecognitionModel, HandLandmarks, RecognizedSign } from "@/types";

/**
 * Minimum fingerpose match score (0-10) required to accept a prediction.
 * Lower = more permissive (more false positives), higher = stricter (more
 * missed detections). Tuned empirically; exposed here so it's easy to
 * adjust without hunting through the codebase.
 */
export const ASL_MIN_MATCH_SCORE = 7.5;

/**
 * Minimum score gap required between the top match and the runner-up
 * before a prediction is accepted. Several letters (A, C, E, O, Y) use
 * curl-only descriptions with no direction constraint, which makes them
 * prone to near-identical scores for ambiguous/half-formed hand shapes.
 * Without this margin, JS Array#reduce breaks exact or near ties by
 * picking whichever gesture appears first in ASL_FINGERSPELLING_GESTURES
 * — which is "A" — regardless of what was actually signed. Requiring a
 * real gap means an ambiguous shape reports "no match" instead of
 * silently defaulting to A.
 */
export const ASL_MIN_SCORE_MARGIN = 0.75;

/**
 * fingerpose's default curl thresholds (NO_CURL_START_LIMIT: 130,
 * HALF_CURL_START_LIMIT: 60, measured in degrees of bend at the
 * knuckle) assume a nearly-perfectly-straight finger to count as
 * "No Curl". Real hands rarely extend a finger that straight, and the
 * library's own README calls out exactly this as a known limitation.
 * Loosened here so a naturally slightly-bent extended finger still
 * reads as "No Curl" instead of "Half Curl" — which matters a lot,
 * since every letter except A requires at least one finger to read as
 * cleanly extended.
 */
const ESTIMATOR_OPTIONS = {
  NO_CURL_START_LIMIT: 105.0,
  HALF_CURL_START_LIMIT: 50.0,
};

export type AslDebugInfo = {
  poseData: Array<[name: string, curl: string, direction: string]>;
  scores: Array<{ label: string; score: number }>;
};

/**
 * Wraps the `fingerpose` heuristic classifier behind the
 * `GestureRecognitionModel` interface so the rest of the app (worker,
 * hooks, UI) never has to know whether a classification came from a
 * hand-authored heuristic or, eventually, a trained model.
 */
export class AslFingerspellingModel implements GestureRecognitionModel {
  readonly id = "asl-fingerspelling-heuristic-v1";
  readonly label = "ASL Fingerspelling (heuristic)";

  #estimator: GestureEstimator | null = null;

  async load(): Promise<void> {
    this.#estimator = new GestureEstimator(ASL_FINGERSPELLING_GESTURES, ESTIMATOR_OPTIONS);
  }

  async predict(frame: FrameLandmarks): Promise<RecognizedSign | null> {
    if (!this.#estimator) {
      throw new Error("AslFingerspellingModel.load() must be called first");
    }

    const hand = frame.rightHand ?? frame.leftHand;
    if (!hand || hand.length < 21) return null;

    const { gestures } = this.#estimator.estimate(hand, ASL_MIN_MATCH_SCORE);
    if (gestures.length === 0) return null;

    const sorted = [...gestures].sort((a, b) => b.score - a.score);
    const best = sorted[0];
    const runnerUp = sorted[1];

    // Reject ambiguous calls instead of arbitrarily picking a winner.
    if (runnerUp && best.score - runnerUp.score < ASL_MIN_SCORE_MARGIN) {
      return null;
    }

    return {
      label: best.name,
      confidence: Math.min(1, Math.max(0, best.score / 10)),
      timestampMs: frame.timestampMs,
    };
  }

  /**
   * Diagnostic-only: returns the raw per-finger curl/direction estimate
   * plus EVERY candidate letter's score (not just the accepted best
   * match, and not filtered by ASL_MIN_MATCH_SCORE). Not part of the
   * GestureRecognitionModel contract — this exists purely so the app can
   * surface real numbers for calibrating the heuristic against actual
   * hands, since it can't be tuned meaningfully without that feedback.
   */
  debugEstimate(hand: HandLandmarks): AslDebugInfo | null {
    if (!this.#estimator || !hand || hand.length < 21) return null;

    const { poseData, gestures } = this.#estimator.estimate(hand, -1000);
    const scores = gestures
      .map((g) => ({ label: g.name, score: Math.round(g.score * 100) / 100 }))
      .sort((a, b) => b.score - a.score);

    return { poseData, scores };
  }

  dispose(): void {
    this.#estimator = null;
  }
}
