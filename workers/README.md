# workers

- `hand-landmarker.worker.ts` — loads the MediaPipe HandLandmarker model
  and runs `detectForVideo()` off the main thread (Milestone 2). As of
  Milestone 3, it also loads the active `GestureRecognitionModel` (see
  `lib/ai/model-registry.ts`) and classifies each detected hand's
  landmarks immediately after detection — classification is cheap pure
  math (no extra model download), so it shares the same worker rather
  than adding a second round-trip.

Communicates with `hooks/use-hand-landmarker.ts` via the typed protocol
in `lib/mediapipe/worker-protocol.ts`, receiving transferred
`ImageBitmap`s and returning landmark + recognized-sign results plus
inference timing.
