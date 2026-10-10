/**
 * Shared cat ↔ cursor interaction state (mirrors the reference film's hero
 * cat: the model follows the pointer and clicks near it trigger a hiss).
 *
 * Written dependency-free so Page-level code (the cursor glow) can read it
 * without pulling in any three.js. Written by window-level listeners in
 * CatJourney, read by the rig (proximity/click) and the model (motion).
 */
export interface CatGesture {
  /** normalized pointer position, -1..1, window space */
  px: number;
  py: number;
  /** pointer in CSS pixels (latest move / click) */
  screenPx: number;
  screenPy: number;
  /** 1 when a click just happened — consumed by the rig, fired into `hiss` */
  down: number;
  /** 0..1 decaying hiss pulse */
  hiss: number;
  /** 0..1 — whether the pointer is currently near the cat (poke telegraph) */
  hover: number;
}

export const catGesture: CatGesture = {
  px: 0,
  py: 0,
  screenPx: -9999,
  screenPy: -9999,
  down: 0,
  hiss: 0,
  hover: 0,
};