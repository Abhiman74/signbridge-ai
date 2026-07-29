"use client";

import { useEffect, useRef } from "react";
import { DrawingUtils, HandLandmarker } from "@mediapipe/tasks-vision";
import type { HandLandmarkerResult } from "@mediapipe/tasks-vision";

type Props = {
  result: HandLandmarkerResult | null;
  width: number;
  height: number;
};

export function HandOverlay({ result, width, height }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (result && result.landmarks.length > 0) {
      const drawingUtils = new DrawingUtils(ctx);

      result.landmarks.forEach((landmarks, i) => {
        const handedness = result.handedness[i]?.[0]?.categoryName;
        const color = handedness === "Left" ? "#22d3ee" : "#a78bfa";

        drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, {
          color,
          lineWidth: 3,
        });
        drawingUtils.drawLandmarks(landmarks, {
          color: "#ffffff",
          fillColor: color,
          lineWidth: 1,
          radius: 3,
        });
      });
    }

    ctx.restore();
  }, [result]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ transform: "scaleX(-1)" }}
    />
  );
}
