"use client";

import { useMemo } from "react";
import { Pause, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSpeechSynthesis } from "@/hooks/use-speech-synthesis";
import { suggestWords } from "@/lib/inference/word-suggestions";

type Props = {
  currentWord: string;
  committedText: string;
  fullText: string;
  onClear: () => void;
};

export function SentencePanel({ currentWord, committedText, fullText, onClear }: Props) {
  const {
    supported,
    voices,
    voiceURI,
    setVoiceURI,
    rate,
    setRate,
    state: speechState,
    speak,
    replay,
    pause,
    resume,
  } = useSpeechSynthesis();

  const suggestions = useMemo(() => suggestWords(currentWord), [currentWord]);

  const hasText = fullText.length > 0;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Spelled text</CardTitle>
        <Badge variant="outline" className="text-foreground/50">
          Fingerspelling buffer
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="min-h-[3lh] text-lg leading-relaxed">
          {hasText ? (
            <>
              <span className="text-foreground">{committedText}</span>
              {committedText && currentWord && " "}
              <span className="text-foreground/50">{currentWord}</span>
            </>
          ) : (
            <span className="text-foreground/30">
              Fingerspell a letter (A, B, C, D, E, F, I, L, O, U, V, W, Y) and
              hold it steady — recognized letters appear here.
            </span>
          )}
        </p>

        {suggestions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {suggestions.map((word) => (
              <Badge key={word} variant="outline" className="text-foreground/60">
                {word}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={!supported || !hasText}
            onClick={() =>
              speechState === "speaking" ? pause() : speechState === "paused" ? resume() : speak(fullText)
            }
          >
            {speechState === "speaking" ? (
              <Pause className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Volume2 className="h-4 w-4" aria-hidden="true" />
            )}
            {speechState === "speaking" ? "Pause" : speechState === "paused" ? "Resume" : "Play"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={!supported || !hasText}
            onClick={replay}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Replay
          </Button>
          <Button variant="secondary" size="sm" onClick={onClear} disabled={!hasText}>
            Clear
          </Button>
        </div>

        {supported && voices.length > 0 && (
          <div className="mt-4 flex flex-col gap-2 border-t border-border-subtle pt-4 text-sm">
            <label className="flex items-center justify-between gap-3">
              <span className="text-foreground/60">Voice</span>
              <select
                value={voiceURI ?? ""}
                onChange={(e) => setVoiceURI(e.target.value)}
                className="focus-ring max-w-[60%] truncate rounded-lg border border-border-subtle bg-surface px-2 py-1 text-sm"
              >
                {voices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center justify-between gap-3">
              <span className="text-foreground/60">Speed</span>
              <input
                type="range"
                min={0.5}
                max={1.75}
                step={0.05}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-[60%] accent-brand-via"
                aria-label="Speech speed"
              />
            </label>
          </div>
        )}
        {!supported && (
          <p className="mt-4 text-xs text-foreground/40">
            Speech synthesis isn&rsquo;t supported in this browser.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
