# SignBridge AI

Real-time, browser-based sign language interpreter. No signup, no backend,
no database, no cloud inference — everything runs in the browser.

> Open the website. Allow camera access. Start signing.

## Status: Milestone 1

This milestone ships the deployable application shell:

- Landing page (hero, features, how it works, privacy, tech stack, FAQ)
- Live Translator page with real camera access and permission handling
- About page
- Dark/light theme, responsive layout, accessible navigation

Gesture recognition, sentence generation, and speech output are **not yet
implemented** — the Translator page explicitly shows "Waiting for model"
states rather than fabricated predictions. See `lib/ai/README.md` for the
plan.

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
or additional services are required.

## Project structure

```
app/                 Routes (landing, /translator, /about)
components/ui/       Small shadcn-style primitives (Button, Card, Badge, ...)
components/layout/   Navbar, footer, theme provider/toggle
components/landing/  Landing page sections
components/translator/ Camera feed + placeholder detection panels
hooks/                use-camera (getUserMedia wrapper)
lib/                  utils, site constants
lib/ai/               (Milestone 2+) model registry
lib/mediapipe/        (Milestone 2+) MediaPipe integration
lib/inference/        (Milestone 2/3) worker bridge + sentence generation
types/                Shared TypeScript contracts (incl. GestureRecognitionModel)
workers/              (Milestone 2+) Web Worker scripts
public/models/        (Milestone 2+) cached model weights
```

## Roadmap

1. **Milestone 1 (this release)** — architecture, landing page, translator
   shell with real camera access, About page. Deployable to Vercel.
2. **Milestone 2** — MediaPipe landmark tracking, Web Worker pipeline.
3. **Milestone 3** — gesture recognition model, sentence generation, speech
   synthesis, performance tuning.
4. **Milestone 4** — PWA/offline support, model caching, accessibility pass.
5. **Milestone 5** — final polish, documentation, performance audit.
