/**
 * Central configuration for the MediaPipe Tasks Vision integration.
 *
 * The Wasm runtime is self-hosted (copied from
 * node_modules/@mediapipe/tasks-vision/wasm into public/mediapipe/wasm) so
 * the app never depends on an external CDN at runtime. The trained model
 * weights are not redistributable the same way (they're not published to
 * npm), so they're fetched from Google's official model CDN on first use
 * and cached locally afterwards via the Cache Storage API — meaning every
 * subsequent load, including offline, is served from the browser cache
 * rather than the network.
 */

export const MEDIAPIPE_WASM_BASE_PATH = "/mediapipe/wasm";

export const HAND_LANDMARKER_MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

export const MODEL_CACHE_NAME = "signbridge-model-cache-v1";

export const MAX_NUM_HANDS = 2;
