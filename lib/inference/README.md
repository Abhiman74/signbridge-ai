# lib/inference

- `sentence-buffer.ts` — turns the noisy, per-frame stream of
  `RecognizedSign` predictions into discrete committed letters and word
  boundaries. A letter must be the stable top prediction for ~350ms
  before it's committed (debouncing flicker); the hand shape must break
  before the same letter can repeat (so "HELLO" doesn't collapse into
  "HELO"); no confident hand for ~1.4s finalizes the current word with a
  space. Pure, framework-agnostic logic — no model involved.
- `word-suggestions.ts` — static dictionary prefix-match for lightweight
  autocomplete while spelling. Explicitly not an AI/ML feature; labeled
  as plain dictionary lookup in the UI.

## What's next

"I GO MARKET TOMORROW" → "I'm going to the market tomorrow" style
grammar correction requires word-level (not just letter-level) sign
vocabulary and a real language model — that depends on Milestone-3+
expansion of the gesture set beyond fingerspelling, and is tracked as
future work rather than faked here.
