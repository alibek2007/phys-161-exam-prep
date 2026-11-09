import type { DiagramSpec } from '../../../types/question'

export { numeric, steps, ans } from '../topics3/helpers'

export const UNIT = {
  m: '\\text{m}',
  m2: '\\text{m}^2',
  m3: '\\text{m}^3',
  cm3: '\\text{cm}^3',
  s: '\\text{s}',
  ms: '\\text{m/s}',
  kg: '\\text{kg}',
  g: '\\text{g}',
  gs: '\\text{g/s}',
  K: '\\text{K}',
  C: '^\\circ\\text{C}',
  N: '\\text{N}',
  J: '\\text{J}',
  W: '\\text{W}',
  Hz: '\\text{Hz}',
  Pa: '\\text{Pa}',
  mol: '\\text{mol}',
  kcal: '\\text{kcal}',
  JK: '\\text{J/K}',
  Jmol: '\\text{J/mol}',
  JmolK: '\\text{J/(mol K)}',
  JkgK: '\\text{J/(kg K)}',
  WmK: '\\text{W/(m K)}',
  kgm3: '\\text{kg/m}^3',
  gmol: '\\text{g/mol}',
  kgmol: '\\text{kg/mol}',
  percent: '\\%',
} as const

export const exerciseImage = (name: string): DiagramSpec => ({ kind: 'exerciseImage', props: { src: `/exercise-images-4/${name}.png` } })

export const R_TEXT = 'R = 8.31 J/(mol K)'
export const ATM_TEXT = '1 atm = 101325 Pa'
