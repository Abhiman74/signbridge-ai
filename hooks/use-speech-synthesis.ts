"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeechState = "idle" | "speaking" | "paused";

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState<string | null>(null);
  const [rate, setRate] = useState(1);
  const [state, setState] = useState<SpeechState>("idle");
  const [supported, setSupported] = useState(true);

  const lastTextRef = useRef("");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      setVoices(list);
      setVoiceURI((current) => current ?? list.find((v) => v.default)?.voiceURI ?? list[0]?.voiceURI ?? null);
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!supported || !text.trim()) return;

      window.speechSynthesis.cancel();
      lastTextRef.current = text;

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = voices.find((v) => v.voiceURI === voiceURI);
      if (voice) utterance.voice = voice;
      utterance.rate = rate;

      utterance.onstart = () => setState("speaking");
      utterance.onend = () => setState("idle");
      utterance.onerror = () => setState("idle");
      utterance.onpause = () => setState("paused");
      utterance.onresume = () => setState("speaking");

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [supported, voices, voiceURI, rate]
  );

  const replay = useCallback(() => {
    if (lastTextRef.current) speak(lastTextRef.current);
  }, [speak]);

  const pause = useCallback(() => {
    if (supported) window.speechSynthesis.pause();
  }, [supported]);

  const resume = useCallback(() => {
    if (supported) window.speechSynthesis.resume();
  }, [supported]);

  const stop = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
    setState("idle");
  }, [supported]);

  return {
    supported,
    voices,
    voiceURI,
    setVoiceURI,
    rate,
    setRate,
    state,
    speak,
    replay,
    pause,
    resume,
    stop,
  };
}
