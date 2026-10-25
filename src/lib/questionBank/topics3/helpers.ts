import type { DiagramSpec, SolutionStep, Tolerance } from '../../../types/question'
import { texSig } from '../../format'

export const GRAVITY = 9.8

export function numeric(value: number, unit: string, tolerance = 0.01): { value: number; unit: string; tolerance: Tolerance } {
  return { value, unit, tolerance: { mode: 'relative', value: tolerance } }
}

/** Formula line, optional explanatory note first, then the answer line. */
export function steps(formula: string, answer: string, note?: string): SolutionStep[] {
  const out: SolutionStep[] = []
  if (note) out.push({ label: 'Given', text: note })
  out.push({ label: 'Formula', math: formula })
  out.push({ label: 'Answer', math: answer })
  return out
}

/** "symbol = value unit" as KaTeX; `unitTex` is raw TeX such as "\\text{m/s}^2" (omit for dimensionless). */
export function ans(symbol: string, value: number, unitTex = '', sig = 4): string {
  return `${symbol} = ${texSig(value, sig)}${unitTex ? `\\,${unitTex}` : ''}`
}

export const UNIT = {
  m: '\\text{m}',
  km: '\\text{km}',
  s: '\\text{s}',
  ms: '\\text{m/s}',
  ms2: '\\text{m/s}^2',
  N: '\\text{N}',
  J: '\\text{J}',
  kg: '\\text{kg}',
  Hz: '\\text{Hz}',
  W: '\\text{W}',
  Wm2: '\\text{W/m}^2',
  Pa: '\\text{Pa}',
  dB: '\\text{dB}',
  Nm: '\\text{N/m}',
  kgm3: '\\text{kg/m}^3',
  rads: '\\text{rad/s}',
  inverseS: '\\text{s}^{-1}',
  percent: '\\%',
} as const

export const exerciseImage = (name: string): DiagramSpec => ({ kind: 'exerciseImage', props: { src: `/exercise-images-3/${name}.png` } })

export const G_TEXT = '6.67×10⁻¹¹ N⋅m²/kg²'

export function ordinal(n: number): string {
  const teen = n % 100 >= 11 && n % 100 <= 13
  const suffix = teen ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[n % 10] ?? 'th'
  return `${n}${suffix}`
}
