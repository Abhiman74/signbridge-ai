# workers

- `hand-landmarker.worker.ts` (Milestone 2) — loads the MediaPipe
  HandLandmarker model and runs `detectForVideo()` off the main thread.
  Communicates with `hooks/use-hand-landmarker.ts` via the typed protocol
  in `lib/mediapipe/worker-protocol.ts`, receiving transferred
  `ImageBitmap`s and returning landmark results + inference timing.

Milestone 3 will add a second worker for the (heavier) gesture
classification model, keeping the ~30 FPS camera loop responsive on the
main thread.
