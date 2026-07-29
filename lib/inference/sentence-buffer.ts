import type { RecognizedSign } from "@/types";

export type SentenceBufferOptions = {
  /** How long a letter must be the top prediction before it's committed. */
  stabilityMs?: number;
  /** Minimum gap before the *same* letter can be committed twice in a row
   *  (lets a signer fingerspell double letters like "LL" in "HELLO" by
   *  briefly breaking the hand shape in between). */
  minRepeatGapMs?: number;
  /** How long with no confident hand in frame before the current word is
   *  finalized (a space is inserted). */
  wordPauseMs?: number;
};

export type SentenceBufferState = {
  /** Letters committed to the word currently being spelled. */
  currentWord: string;
  /** Fully finalized text (previous words + spaces). */
  committedText: string;
  /** The label currently being held stable, if any (pre-commit). */
  pendingLabel: string | null;
  /** 0..1 progress toward committing pendingLabel. */
  pendingProgress: number;
};

/**
 * Turns a noisy, per-frame stream of RecognizedSign predictions into
 * discrete committed letters and word boundaries. This is plain,
 * deterministic logic — no model, nothing simulated — designed to smooth
 * out the frame-to-frame flicker inherent in any live classifier.
 */
export class SentenceBuffer {
  private readonly stabilityMs: number;
  private readonly minRepeatGapMs: number;
  private readonly wordPauseMs: number;

  private currentWord = "";
  private committedWords: string[] = [];

  private stableLabel: string | null = null;
  private stableSince = 0;

  private lastCommittedLabel: string | null = null;
  private lastCommittedAt = 0;

  private lastHandSeenAt = 0;
  private hasSeenAnyHand = false;
  private lastNow = 0;

  constructor(options: SentenceBufferOptions = {}) {
    this.stabilityMs = options.stabilityMs ?? 350;
    this.minRepeatGapMs = options.minRepeatGapMs ?? 600;
    this.wordPauseMs = options.wordPauseMs ?? 1400;
  }

  /** Feed the latest per-frame prediction(s). `now` should be a monotonic
   *  millisecond timestamp (e.g. performance.now()). */
  update(signs: RecognizedSign[], now: number): SentenceBufferState {
    this.lastNow = now;
    const top = signs.length > 0
      ? signs.reduce((a, b) => (b.confidence > a.confidence ? b : a))
      : null;

    if (top) {
      this.hasSeenAnyHand = true;
      this.lastHandSeenAt = now;

      if (this.stableLabel === top.label) {
        // still holding the same shape
        const heldFor = now - this.stableSince;
        const canRepeat =
          top.label !== this.lastCommittedLabel ||
          now - this.lastCommittedAt >= this.minRepeatGapMs;

        if (heldFor >= this.stabilityMs && canRepeat) {
          this.currentWord += top.label;
          this.lastCommittedLabel = top.label;
          this.lastCommittedAt = now;
          // require the shape to break before committing again
          this.stableLabel = null;
        }
      } else {
        this.stableLabel = top.label;
        this.stableSince = now;
      }
    } else {
      this.stableLabel = null;
    }

    // word boundary: no confident hand for a while while mid-word
    if (
      this.hasSeenAnyHand &&
      this.currentWord.length > 0 &&
      now - this.lastHandSeenAt >= this.wordPauseMs
    ) {
      this.committedWords.push(this.currentWord);
      this.currentWord = "";
      this.lastCommittedLabel = null;
    }

    return this.getState();
  }

  clear(): SentenceBufferState {
    this.currentWord = "";
    this.committedWords = [];
    this.stableLabel = null;
    this.lastCommittedLabel = null;
    this.hasSeenAnyHand = false;
    return this.getState();
  }

  private getState(): SentenceBufferState {
    const pendingProgress = this.stableLabel
      ? Math.min(1, (this.lastNow - this.stableSince) / this.stabilityMs)
      : 0;

    return {
      currentWord: this.currentWord,
      committedText: this.committedWords.join(" "),
      pendingLabel: this.stableLabel,
      pendingProgress,
    };
  }
}
