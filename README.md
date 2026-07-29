# SignBridge AI

Real-time, browser-based sign language interpreter. No signup, no backend,
no database, no cloud inference — everything runs in the browser.

> Open the website. Allow camera access. Start signing.

## Status: Milestone 3

- **Milestone 1** — landing page, translator shell with real camera
  access, About page. ✅
- **Milestone 2** — live, on-device hand-landmark tracking via a Web
  Worker pipeline, real performance metrics. ✅
- **Milestone 3 (this release)** — ASL fingerspelling recognition.
  Detected hand shapes are classified into letters (A, B, C, D, E, F, I,
  L, O, U, V, W, Y) using the `fingerpose` heuristic estimator over real
  MediaPipe landmarks, debounced into committed letters and words, with
  dictionary-based word suggestions and full Web Speech API playback
  (play/pause/replay, voice selection, speed control).

This is an honest V1 of gesture recognition, not the full spec's
continuous ASL-to-fluent-English pipeline: it covers a subset of the
fingerspelling alphabet using a hand-authored heuristic classifier
(not a trained neural network), and produces spelled text rather than
grammar-corrected sentences. See `lib/ai/README.md` for exactly what's
supported, why, and what a fuller model would need.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000, go to `/translator`, allow camera access, and
fingerspell one of: A, B, C, D, E, F, I, L, O, U, V, W, Y. Hold the shape
steady for it to commit.

## Build

```bash
npm run build
npm run start
```

## Deployment

Standard Next.js app, no server-only dependencies. Push to GitHub and
import into Vercel — no environment variables, database, or additional
services required. The MediaPipe Wasm runtime is a bundled static asset;
the hand-tracking model is fetched from Google's model CDN on first use
and cached in the browser afterwards.

## Project structure

```
app/                    Routes (landing, /translator, /about)
components/ui/          Small shadcn-style primitives (Button, Card, Badge, ...)
components/layout/      Navbar, footer, theme provider/toggle
components/landing/     Landing page sections
components/translator/  Camera feed, hand overlay, status/sentence panels
hooks/                  use-camera, use-hand-landmarker, use-fingerspelling-buffer, use-speech-synthesis
lib/                    utils, site constants
lib/ai/                 ASL fingerspelling classifier + swappable model registry
lib/mediapipe/          MediaPipe config, cached model fetch, worker protocol
lib/inference/          Letter/word debouncing, dictionary word suggestions
types/                  Shared TypeScript contracts (incl. GestureRecognitionModel)
workers/                hand-landmarker.worker.ts: landmarks + gesture classification off the main thread
public/mediapipe/wasm/  Self-hosted MediaPipe Wasm runtime (static asset)
```

## Roadmap

1. **Milestone 1** — architecture, landing page, translator shell with
   real camera access, About page. ✅
2. **Milestone 2** — MediaPipe hand-landmark tracking via a Web Worker
   pipeline, real performance metrics. ✅
3. **Milestone 3** — ASL fingerspelling classification, letter/word
   debouncing, word suggestions, full speech synthesis controls. ✅
4. **Milestone 4** — PWA/offline support, model caching, accessibility
   pass.
5. **Milestone 5** — final polish, documentation, performance audit.
