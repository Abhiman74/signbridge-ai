/**
 * ASL fingerspelling handshape descriptions for the `fingerpose` gesture
 * estimator (https://github.com/andypotato/fingerpose, MIT licensed).
 *
 * fingerpose does NOT use a trained neural network — it estimates, per
 * finger, a discrete curl (no/half/full) and pointing direction from the
 * real hand landmarks, then scores that against hand-authored reference
 * descriptions. That means predictions are always computed live from the
 * actual detected hand shape; nothing here is a hardcoded or simulated
 * output.
 *
 * IMPORTANT — honest scope: curl + direction alone cannot distinguish
 * every ASL letter. Several letters (M, N, T, S, R, K, P, Q, X, G, H)
 * depend on exactly where the thumb sits *between or under* other
 * fingers, which this technique can't reliably capture, and J/Z require
 * motion, not a static pose. This file therefore only defines the subset
 * of the alphabet that is reliably distinguishable by curl/direction:
 *
 *   A, B, C, D, E, F, I, L, O, U, V, W, Y
 *
 * The `GestureRecognitionModel` interface (see lib/ai/asl-fingerspelling-model.ts)
 * is what the rest of the app depends on — swapping this heuristic set
 * out for a trained classifier covering the full alphabet later requires
 * no UI changes.
 */

import { Finger, FingerCurl, FingerDirection, GestureDescription } from "fingerpose";

function letter(name: string): GestureDescription {
  return new GestureDescription(name);
}

const asl_A = letter("A");
asl_A.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
asl_A.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.7);
for (const f of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  asl_A.addCurl(f, FingerCurl.FullCurl, 1.0);
  asl_A.addCurl(f, FingerCurl.HalfCurl, 0.4);
}

const asl_B = letter("B");
asl_B.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
asl_B.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.6);
for (const f of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  asl_B.addCurl(f, FingerCurl.NoCurl, 1.0);
  asl_B.addDirection(f, FingerDirection.VerticalUp, 1.0);
  asl_B.addDirection(f, FingerDirection.DiagonalUpLeft, 0.7);
  asl_B.addDirection(f, FingerDirection.DiagonalUpRight, 0.7);
}

const asl_C = letter("C");
for (const f of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  asl_C.addCurl(f, FingerCurl.HalfCurl, 1.0);
  asl_C.addCurl(f, FingerCurl.NoCurl, 0.4);
}

const asl_D = letter("D");
asl_D.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
asl_D.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
asl_D.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.7);
asl_D.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.7);
asl_D.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
for (const f of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  asl_D.addCurl(f, FingerCurl.FullCurl, 1.0);
}

const asl_E = letter("E");
for (const f of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  asl_E.addCurl(f, FingerCurl.FullCurl, 1.0);
  asl_E.addCurl(f, FingerCurl.HalfCurl, 0.7);
}
asl_E.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);

const asl_F = letter("F");
asl_F.addCurl(Finger.Index, FingerCurl.HalfCurl, 1.0);
asl_F.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
for (const f of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  asl_F.addCurl(f, FingerCurl.NoCurl, 1.0);
  asl_F.addDirection(f, FingerDirection.VerticalUp, 1.0);
}

const asl_I = letter("I");
asl_I.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
asl_I.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);
for (const f of [Finger.Index, Finger.Middle, Finger.Ring]) {
  asl_I.addCurl(f, FingerCurl.FullCurl, 1.0);
}
asl_I.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
asl_I.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.6);

const asl_L = letter("L");
asl_L.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
asl_L.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
asl_L.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
asl_L.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
asl_L.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
for (const f of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  asl_L.addCurl(f, FingerCurl.FullCurl, 1.0);
}

const asl_O = letter("O");
for (const f of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  asl_O.addCurl(f, FingerCurl.HalfCurl, 1.0);
  asl_O.addCurl(f, FingerCurl.FullCurl, 0.5);
}

const asl_U = letter("U");
for (const f of [Finger.Index, Finger.Middle]) {
  asl_U.addCurl(f, FingerCurl.NoCurl, 1.0);
  asl_U.addDirection(f, FingerDirection.VerticalUp, 1.0);
}
for (const f of [Finger.Ring, Finger.Pinky]) {
  asl_U.addCurl(f, FingerCurl.FullCurl, 1.0);
}
asl_U.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.6);
asl_U.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);

const asl_V = letter("V");
asl_V.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
asl_V.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
asl_V.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.7);
asl_V.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
asl_V.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);
asl_V.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.7);
for (const f of [Finger.Ring, Finger.Pinky]) {
  asl_V.addCurl(f, FingerCurl.FullCurl, 1.0);
}
asl_V.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.6);
asl_V.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);

const asl_W = letter("W");
for (const f of [Finger.Index, Finger.Middle, Finger.Ring]) {
  asl_W.addCurl(f, FingerCurl.NoCurl, 1.0);
  asl_W.addDirection(f, FingerDirection.VerticalUp, 1.0);
  asl_W.addDirection(f, FingerDirection.DiagonalUpLeft, 0.6);
  asl_W.addDirection(f, FingerDirection.DiagonalUpRight, 0.6);
}
asl_W.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
asl_W.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.6);
asl_W.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);

const asl_Y = letter("Y");
asl_Y.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
asl_Y.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
for (const f of [Finger.Index, Finger.Middle, Finger.Ring]) {
  asl_Y.addCurl(f, FingerCurl.FullCurl, 1.0);
}

export const ASL_FINGERSPELLING_GESTURES: GestureDescription[] = [
  asl_A,
  asl_B,
  asl_C,
  asl_D,
  asl_E,
  asl_F,
  asl_I,
  asl_L,
  asl_O,
  asl_U,
  asl_V,
  asl_W,
  asl_Y,
];

export const ASL_FINGERSPELLING_SUPPORTED_LETTERS = ["A", "B", "C", "D", "E", "F", "I", "L", "O", "U", "V", "W", "Y"];
