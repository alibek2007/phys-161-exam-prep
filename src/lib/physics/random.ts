import type { ParamRange } from '../../types/question'

/** Deterministic seeded RNG (mulberry32). Returns a function producing floats in [0, 1). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Hash a string into a 32-bit int seed. */
export function seedFromString(s: string): number {
  let h = 1779033703 ^ s.length
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return (h ^ (h >>> 16)) >>> 0
}

/**
 * Pick an "educationally clean" number within [min, max] snapped to `step`
 * (default 1). Keeps generated exercises hand-calculable, per spec.
 */
export function pickNice(rng: () => number, range: ParamRange): number {
  const step = range.step ?? 1
  const steps = Math.floor((range.max - range.min) / step)
  const n = Math.floor(rng() * (steps + 1))
  const value = range.min + n * step
  // Avoid floating point artifacts like 2.3000000000000003
  const decimals = decimalsOf(step)
  return Number(value.toFixed(decimals))
}

function decimalsOf(step: number): number {
  const s = step.toString()
  const i = s.indexOf('.')
  return i === -1 ? 0 : s.length - i - 1
}

/** Pick a uniformly random integer in [min, max] inclusive. */
export function pickInt(rng: () => number, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

/** Pick one element at random from an array. */
export function pickOne<T>(rng: () => number, options: readonly T[]): T {
  return options[Math.floor(rng() * options.length)]
}

/** Randomly pick a sign, +1 or -1. */
export function pickSign(rng: () => number): 1 | -1 {
  return rng() < 0.5 ? 1 : -1
}
