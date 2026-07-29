"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { SentenceBuffer, type SentenceBufferState } from "@/lib/inference/sentence-buffer";
import type { RecognizedSign } from "@/types";

const INITIAL_STATE: SentenceBufferState = {
  currentWord: "",
  committedText: "",
  pendingLabel: null,
  pendingProgress: 0,
};

export function useFingerspellingBuffer() {
  const bufferRef = useRef<SentenceBuffer>(new SentenceBuffer());
  const [state, setState] = useState<SentenceBufferState>(INITIAL_STATE);

  const update = useCallback((signs: RecognizedSign[], now: number) => {
    setState(bufferRef.current.update(signs, now));
  }, []);

  const clear = useCallback(() => {
    setState(bufferRef.current.clear());
  }, []);

  const fullText = useMemo(() => {
    return [state.committedText, state.currentWord].filter(Boolean).join(" ").trim();
  }, [state.committedText, state.currentWord]);

  return { ...state, fullText, update, clear };
}
