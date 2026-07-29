# lib/ai

Real gesture classification (Milestone 3).

- `gestures/asl-fingerspelling.ts` — hand-authored ASL handshape
  descriptions for the `fingerpose` estimator, covering the subset of the
  fingerspelling alphabet reliably distinguishable by finger curl +
  direction alone: **A, B, C, D, E, F, I, L, O, U, V, W, Y**.
- `asl-fingerspelling-model.ts` — wraps `fingerpose`'s `GestureEstimator`
  behind the `GestureRecognitionModel` interface from `types/index.ts`.
- `model-registry.ts` — the single place that decides which model
  implementation is active. Swapping in a trained classifier (ONNX/TFJS)
  covering the full alphabet later means adding a class here and changing
  `DEFAULT_MODEL_ID` — nothing in the worker, hooks, or UI needs to change.

## Why a heuristic, not a trained model, for V1

`fingerpose` (MIT licensed, github.com/andypotato/fingerpose) is not a
neural network — it derives a discrete curl/direction per finger from the
real landmark geometry and scores that against reference descriptions.
Predictions are always computed live from the actual detected hand shape;
nothing is hardcoded.

We looked for a redistributable, browser-ready, pretrained ASL
fingerspelling classifier and didn't find one that could be integrated
without a labeled training pipeline (the well-known public ASL datasets
are images, not landmark sequences, and aren't set up for in-browser
inference). Given the choice between shipping nothing and shipping a
real, working, honestly-scoped heuristic, we shipped the heuristic —
consistent with the project's "isolated gesture recognition with real
models over silence" scoping decision.

## Known limitations

- Letters that depend on thumb position *between or under* other fingers
  (M, N, T, S, R, K, P, Q, X, G, H) aren't reliably distinguishable by
  curl/direction alone and are intentionally left out rather than
  guessed badly.
- J and Z require motion, not a static pose, and aren't supported yet.
- Accuracy depends on lighting, camera angle, and hand distance — this is
  a real limitation of any camera-based system, not unique to the
  heuristic.

## What's next

A trained classifier (small MLP or 1D-CNN over normalized landmark
sequences) would cover the full alphabet and generalize better across
hands/lighting. It can be dropped into `model-registry.ts` without
touching the UI.
