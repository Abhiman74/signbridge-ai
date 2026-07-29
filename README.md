# SignBridge AI

Real-time, browser-based sign language interpreter. No signup, no backend,
no database, no cloud inference — everything runs in the browser.

> Open the website. Allow camera access. Start signing.

## Status: Milestone 2

- **Milestone 1** — landing page, translator shell with real camera
  access, About page. Deployable to Vercel.
- **Milestone 2 (this release)** — live, on-device hand-landmark tracking.
  MediaPipe's HandLandmarker runs inside a Web Worker (off the main
  thread), fed live video frames via transferable `ImageBitmap`s. Detected
  landmarks are drawn over the camera feed in real time, and Inference
  FPS / latency in the metrics bar are now real, measured numbers rather
  than placeholders.

Gesture classification, sentence generation, and speech output are **not
yet implemented** — the Translator page explicitly shows "Waiting for
model" for the detected sign and confidence, rather than a fabricated
prediction. See `lib/ai/README.md` and `lib/mediapipe/README.md` for the
architecture and what's planned next.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Deployment

This is a standard Next.js app with no server-only dependencies. Push to a
GitHub repo and import it into Vercel — no environment variables, database,
or additional services are required. The MediaPipe Wasm runtime is bundled
as a static asset (`public/mediapipe/wasm`); the hand-tracking model is
fetched from Google's model CDN on first use and cached in the browser
afterwards.

## Project structure

```
app/                    Routes (landing, /translator, /about)
components/ui/          Small shadcn-style primitives (Button, Card, Badge, ...)
components/layout/      Navbar, footer, theme provider/toggle
components/landing/     Landing page sections
components/translator/  Camera feed, hand-landmark overlay, status/metrics panels
hooks/                  use-camera, use-hand-landmarker
lib/                    utils, site constants
lib/ai/                 (Milestone 3) gesture classification + model registry
lib/mediapipe/          MediaPipe config, cached model fetch, worker protocol
lib/inference/          (Milestone 3) sentence generation
types/                  Shared TypeScript contracts (incl. GestureRecognitionModel)
workers/                hand-landmarker.worker.ts (Milestone 2); classifier worker (Milestone 3)
public/mediapipe/wasm/  Self-hosted MediaPipe Wasm runtime (static asset)
```

## Roadmap

1. **Milestone 1** — architecture, landing page, translator shell with
   real camera access, About page. ✅
2. **Milestone 2** — MediaPipe hand-landmark tracking via a Web Worker
   pipeline, real performance metrics. ✅
3. **Milestone 3** — gesture recognition model, sentence generation,
   speech synthesis, performance tuning.
4. **Milestone 4** — PWA/offline support, model caching, accessibility
   pass.
5. **Milestone 5** — final polish, documentation, performance audit.
