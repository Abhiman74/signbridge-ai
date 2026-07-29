# lib/mediapipe

Real MediaPipe Tasks Vision integration (Milestone 2).

- `config.ts` — self-hosted Wasm base path, the official Google model CDN
  URL for `hand_landmarker.task`, and shared tuning constants.
- `fetch-model.ts` — cache-first model fetch via the Cache Storage API, so
  the model is only ever downloaded once per browser, including for
  offline use afterwards.
- `worker-protocol.ts` — the typed message contract between the main
  thread and `workers/hand-landmarker.worker.ts`.

## Why the Wasm runtime is self-hosted but the model isn't

`@mediapipe/tasks-vision` ships its Wasm runtime inside the npm package
(`node_modules/@mediapipe/tasks-vision/wasm`), so those files are copied
into `public/mediapipe/wasm` at development time and served same-origin —
no external CDN dependency for the runtime itself.

The trained model weights (`hand_landmarker.task`, ~8 MB) are not
published to npm; they're fetched from Google's official model CDN the
first time a visitor opens the Translator page, then cached locally via
`fetchModelBuffer()`. Every later load — including fully offline — is
served from that cache instead of the network.

## Why detection runs in a Web Worker

`HandLandmarker.detectForVideo()` is synchronous and blocks whichever
thread calls it. Google's own web guide for Hand Landmarker recommends
moving it off the main thread for exactly this reason. `hooks/use-hand-landmarker.ts`
grabs an `ImageBitmap` from the live video frame on a `requestAnimationFrame`
loop and transfers it (zero-copy) to `workers/hand-landmarker.worker.ts`,
which runs inference and posts the landmarks back. A `busy` flag prevents
queuing more than one in-flight frame, so a slow device naturally drops
frames instead of falling behind.

## What's next (Milestone 3)

Hand landmarks are real and live, but they are not yet classified into
signs — the Translator UI intentionally still shows "Waiting for model"
for the detected sign and confidence. Milestone 3 adds a classifier over
the landmark sequence (in `lib/ai/`), plus face/pose tracking via
`HolisticLandmarker` if isolated hand shapes prove insufficient for the
target sign set.
