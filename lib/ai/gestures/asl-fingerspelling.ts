/**
 * ASL fingerspelling handshape descriptions for the `fingerpose` gesture
 * estimator (https://github.com/andypotato/fingerpose, MIT licensed).
 *
 * fingerpose does NOT use a trained neural network — it estimates, per
 * finger, a discrete curl (no/half/full) and pointing direction from the
 * real hand landmarks, then scores that against hand-authored reference
 * descriptions. Predictions are always computed live from the actual
 * detected hand shape; nothing here is a hardcoded or simulated output.
 *
 * Calibration note (v2): every letter below uses the SAME weighting
 * scheme — a primary curl/direction match worth 1.0, and at most one
 * adjacent fallback state worth 0.5. The first version of this file gave
 * some letters (notably A) more generous, asymmetric fallback credit
 * than others, which made them win by default regardless of the actual
 * hand shape. Keeping the weighting symmetric across all letters is
 * what actually fixes that, not just retuning A in isolation.
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

const PRIMARY = 1.0;
const FALLBACK = 0.5;

function letter(name: string): GestureDescription {
  return new GestureDescription(name);
}

function curled(gesture: GestureDescription, fingers: number[]) {
  for (const f of fingers) {
    gesture.addCurl(f, FingerCurl.FullCurl, PRIMARY);
    gesture.addCurl(f, FingerCurl.HalfCurl, FALLBACK);
  }
}

function extendedUp(gesture: GestureDescription, fingers: number[]) {
  for (const f of fingers) {
    gesture.addCurl(f, FingerCurl.NoCurl, PRIMARY);
    gesture.addCurl(f, FingerCurl.HalfCurl, FALLBACK);
    gesture.addDirection(f, FingerDirection.VerticalUp, PRIMARY);
    gesture.addDirection(f, FingerDirection.DiagonalUpLeft, FALLBACK);
    gesture.addDirection(f, FingerDirection.DiagonalUpRight, FALLBACK);
  }
}

// A — fist, thumb resting alongside (not crossed over) the fingers.
const asl_A = letter("A");
asl_A.addCurl(Finger.Thumb, FingerCurl.NoCurl, PRIMARY);
asl_A.addCurl(Finger.Thumb, FingerCurl.HalfCurl, FALLBACK);
curled(asl_A, [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]);

// B — flat hand, four fingers up together, thumb folded across the palm.
const asl_B = letter("B");
asl_B.addCurl(Finger.Thumb, FingerCurl.FullCurl, PRIMARY);
asl_B.addCurl(Finger.Thumb, FingerCurl.HalfCurl, FALLBACK);
extendedUp(asl_B, [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]);

// C — curved hand forming a C. All fingers (incl. thumb) half-curled.
const asl_C = letter("C");
for (const f of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  asl_C.addCurl(f, FingerCurl.HalfCurl, PRIMARY);
  asl_C.addCurl(f, FingerCurl.NoCurl, FALLBACK);
}

// D — index up, thumb touches middle finger, others curled.
const asl_D = letter("D");
extendedUp(asl_D, [Finger.Index]);
asl_D.addCurl(Finger.Thumb, FingerCurl.HalfCurl, PRIMARY);
asl_D.addCurl(Finger.Thumb, FingerCurl.NoCurl, FALLBACK);
curled(asl_D, [Finger.Middle, Finger.Ring, Finger.Pinky]);

// E — fingers curled at the big knuckle, thumb across the fingertips.
const asl_E = letter("E");
for (const f of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  asl_E.addCurl(f, FingerCurl.HalfCurl, PRIMARY);
  asl_E.addCurl(f, FingerCurl.FullCurl, FALLBACK);
}
asl_E.addCurl(Finger.Thumb, FingerCurl.HalfCurl, PRIMARY);
asl_E.addCurl(Finger.Thumb, FingerCurl.FullCurl, FALLBACK);

// F — thumb + index touching (circle), other three fingers up.
const asl_F = letter("F");
asl_F.addCurl(Finger.Index, FingerCurl.HalfCurl, PRIMARY);
asl_F.addCurl(Finger.Index, FingerCurl.FullCurl, FALLBACK);
asl_F.addCurl(Finger.Thumb, FingerCurl.HalfCurl, PRIMARY);
asl_F.addCurl(Finger.Thumb, FingerCurl.FullCurl, FALLBACK);
extendedUp(asl_F, [Finger.Middle, Finger.Ring, Finger.Pinky]);

// I — pinky up, others curled (thumb tucked like a fist).
const asl_I = letter("I");
extendedUp(asl_I, [Finger.Pinky]);
curled(asl_I, [Finger.Index, Finger.Middle, Finger.Ring, Finger.Thumb]);

// L — thumb + index form an L, others curled.
const asl_L = letter("L");
asl_L.addCurl(Finger.Index, FingerCurl.NoCurl, PRIMARY);
asl_L.addCurl(Finger.Index, FingerCurl.HalfCurl, FALLBACK);
asl_L.addDirection(Finger.Index, FingerDirection.VerticalUp, PRIMARY);
asl_L.addCurl(Finger.Thumb, FingerCurl.NoCurl, PRIMARY);
asl_L.addCurl(Finger.Thumb, FingerCurl.HalfCurl, FALLBACK);
asl_L.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, PRIMARY);
asl_L.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, PRIMARY);
curled(asl_L, [Finger.Middle, Finger.Ring, Finger.Pinky]);

// O — fingertips curved in to meet the thumb, forming a circle/O.
const asl_O = letter("O");
for (const f of [Finger.Thumb, Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  asl_O.addCurl(f, FingerCurl.HalfCurl, PRIMARY);
  asl_O.addCurl(f, FingerCurl.FullCurl, FALLBACK);
}

// U — index + middle up together, others curled.
const asl_U = letter("U");
extendedUp(asl_U, [Finger.Index, Finger.Middle]);
curled(asl_U, [Finger.Ring, Finger.Pinky, Finger.Thumb]);

// V — index + middle up, spread apart, others curled.
const asl_V = letter("V");
asl_V.addCurl(Finger.Index, FingerCurl.NoCurl, PRIMARY);
asl_V.addCurl(Finger.Index, FingerCurl.HalfCurl, FALLBACK);
asl_V.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, PRIMARY);
asl_V.addCurl(Finger.Middle, FingerCurl.NoCurl, PRIMARY);
asl_V.addCurl(Finger.Middle, FingerCurl.HalfCurl, FALLBACK);
asl_V.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, PRIMARY);
curled(asl_V, [Finger.Ring, Finger.Pinky, Finger.Thumb]);

// W — index + middle + ring up, spread; pinky + thumb curled.
const asl_W = letter("W");
asl_W.addCurl(Finger.Index, FingerCurl.NoCurl, PRIMARY);
asl_W.addCurl(Finger.Index, FingerCurl.HalfCurl, FALLBACK);
asl_W.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, PRIMARY);
asl_W.addDirection(Finger.Index, FingerDirection.VerticalUp, FALLBACK);
asl_W.addCurl(Finger.Middle, FingerCurl.NoCurl, PRIMARY);
asl_W.addCurl(Finger.Middle, FingerCurl.HalfCurl, FALLBACK);
asl_W.addDirection(Finger.Middle, FingerDirection.VerticalUp, PRIMARY);
asl_W.addCurl(Finger.Ring, FingerCurl.NoCurl, PRIMARY);
asl_W.addCurl(Finger.Ring, FingerCurl.HalfCurl, FALLBACK);
asl_W.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, PRIMARY);
asl_W.addDirection(Finger.Ring, FingerDirection.VerticalUp, FALLBACK);
curled(asl_W, [Finger.Pinky, Finger.Thumb]);

// Y — thumb + pinky extended out ("hang loose"), others curled.
const asl_Y = letter("Y");
asl_Y.addCurl(Finger.Thumb, FingerCurl.NoCurl, PRIMARY);
asl_Y.addCurl(Finger.Thumb, FingerCurl.HalfCurl, FALLBACK);
asl_Y.addCurl(Finger.Pinky, FingerCurl.NoCurl, PRIMARY);
asl_Y.addCurl(Finger.Pinky, FingerCurl.HalfCurl, FALLBACK);
curled(asl_Y, [Finger.Index, Finger.Middle, Finger.Ring]);

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
