# lib/ai

This module will hold the model registry and orchestration layer for gesture
recognition (Milestone 2+).

Planned contents:
- `model-registry.ts` — maps model ids to `GestureRecognitionModel`
  implementations (see `types/index.ts`) so the Translator page can switch
  models without any UI changes.
- Concrete model adapters (ONNX Runtime Web, TensorFlow.js, or MediaPipe
  gesture recognizer) that each implement the shared interface.

Nothing in this directory fabricates predictions. Until a real model is
wired in, the Translator UI explicitly shows "Waiting for model" rather than
sample output.
