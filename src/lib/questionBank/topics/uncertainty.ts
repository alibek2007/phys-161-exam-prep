import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import {
  overshootFromRelativeError,
  relativeError,
  uncertaintyCircleArea,
  uncertaintyDiskVolume,
  uncertaintyRectArea,
  uncertaintyRectPerimeter,
} from '../../physics/uncertainty'

export const uncertaintyQuestions = [
  defineQuestion('PHY_UN01', {
    sourceRef: 'P9',
    topic: 'uncertainty',
    difficulty: 1,
    params: { distanceKm: { min: 500, max: 1200, step: 10 }, overshootM: { min: 2, max: 10, step: 0.5 } },
    prompt: (p) =>
      `If a train travels ${fmt(p.distanceKm)} km and then overshoots the end of the track by ${fmt(p.overshootM)} m, what is the relative error in the total distance covered?`,
    compute: (p) => ({
      value: relativeError(p.overshootM, p.distanceKm * 1000),
      unit: '',
      tolerance: { mode: 'relative', value: 0.02 },
    }),
    solution: (p, answer) => [
      { label: 'Given', math: `d = ${fmt(p.distanceKm)}\\text{ km},\\ \\delta d = ${fmt(p.overshootM)}\\text{ m}` },
      { label: 'Formula', math: '\\text{relative error} = \\dfrac{\\delta d}{d}' },
      { label: 'Answer', math: `${answer.toExponential(4)}` },
    ],
  }),

  defineQuestion('PHY_UN02', {
    sourceRef: 'P10',
    topic: 'uncertainty',
    difficulty: 1,
    params: { distanceKm: { min: 500, max: 1200, step: 10 }, relErrExp: { min: 2, max: 8, step: 0.2 } },
    prompt: (p) =>
      `A train travels ${fmt(p.distanceKm)} km and then overshoots the end of the track. If the relative error in the total distance covered must not exceed ${fmt(p.relErrExp)}×10⁻⁶, what is the largest overshoot that is acceptable? Give the answer in meters.`,
    compute: (p) => ({
      value: overshootFromRelativeError(p.distanceKm * 1000, p.relErrExp * 1e-6),
      unit: 'm',
      tolerance: { mode: 'relative', value: 0.02 },
    }),
    solution: (p, answer) => [
      { label: 'Given', math: `d = ${fmt(p.distanceKm)}\\text{ km},\\ \\text{rel. error} \\le ${fmt(p.relErrExp)}\\times 10^{-6}` },
      { label: 'Formula', math: '\\delta d = d \\times \\text{relative error}' },
      { label: 'Answer', math: `\\delta d = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_UN03', {
    sourceRef: 'P11',
    topic: 'uncertainty',
    difficulty: 1,
    params: {
      length: { min: 4, max: 10, step: 0.05 },
      width: { min: 1, max: 3, step: 0.05 },
      dLength: { min: 0.005, max: 0.02, step: 0.005 },
      dWidth: { min: 0.005, max: 0.02, step: 0.005 },
    },
    prompt: (p) =>
      `A rectangular piece of aluminum is ${fmt(p.length)} ± ${fmt(p.dLength)} cm long and ${fmt(p.width)} ± ${fmt(p.dWidth)} cm wide. If the area is written in A ± δA format, find the maximum possible uncertainty in the area δA.`,
    compute: (p) => ({
      value: uncertaintyRectArea(p.length, p.width, p.dLength, p.dWidth),
      unit: 'cm²',
      tolerance: { mode: 'relative', value: 0.02 },
    }),
    solution: (p, answer) => [
      { label: 'Given', math: `L = ${fmt(p.length)} \\pm ${fmt(p.dLength)}\\text{ cm},\\ W = ${fmt(p.width)} \\pm ${fmt(p.dWidth)}\\text{ cm}` },
      { label: 'Formula', math: '\\delta A = L\\,\\delta W + W\\,\\delta L' },
      { label: 'Answer', math: `\\delta A = ${fmt(answer)}\\text{ cm}^2` },
    ],
  }),

  defineQuestion('PHY_UN04', {
    sourceRef: 'P12',
    topic: 'uncertainty',
    difficulty: 1,
    params: {
      length: { min: 4, max: 10, step: 0.05 },
      width: { min: 1, max: 3, step: 0.05 },
      dLength: { min: 0.01, max: 0.03, step: 0.005 },
      dWidth: { min: 0.005, max: 0.02, step: 0.005 },
    },
    prompt: (p) =>
      `A rectangular piece of aluminum is ${fmt(p.length)} ± ${fmt(p.dLength)} cm long and ${fmt(p.width)} ± ${fmt(p.dWidth)} cm wide. If the perimeter is written in P ± δP format, find the maximum possible uncertainty in the perimeter δP.`,
    compute: (p) => ({
      value: uncertaintyRectPerimeter(p.dLength, p.dWidth),
      unit: 'cm',
      tolerance: { mode: 'relative', value: 0.02 },
    }),
    solution: (_p, answer) => [
      { label: 'Formula', math: '\\delta P = 2(\\delta L + \\delta W)' },
      { label: 'Answer', math: `\\delta P = ${fmt(answer)}\\text{ cm}` },
    ],
  }),

  defineQuestion('PHY_UN05', {
    sourceRef: 'P13',
    topic: 'uncertainty',
    difficulty: 2,
    params: {
      diameter: { min: 6, max: 12, step: 0.1 },
      dDiameter: { min: 0.01, max: 0.05, step: 0.01 },
      thickness: { min: 0.05, max: 0.15, step: 0.005 },
      dThickness: { min: 0.001, max: 0.005, step: 0.001 },
    },
    prompt: (p) =>
      `A chocolate cookie is a circular disk with a diameter of ${fmt(p.diameter)} ± ${fmt(p.dDiameter)} cm and a thickness of ${fmt(p.thickness)} ± ${fmt(p.dThickness)} cm. If the volume is written in V ± δV format, find the maximum possible uncertainty in the volume δV.`,
    compute: (p) => ({
      value: uncertaintyDiskVolume(p.diameter, p.dDiameter, p.thickness, p.dThickness),
      unit: 'cm³',
      tolerance: { mode: 'relative', value: 0.02 },
    }),
    solution: (_p, answer) => [
      { label: 'Formula', math: 'V = \\pi \\left(\\frac{d}{2}\\right)^2 t \\Rightarrow \\delta V = \\frac{\\pi d t}{2}\\delta d + \\frac{\\pi d^2}{4}\\delta t' },
      { label: 'Answer', math: `\\delta V = ${fmt(answer)}\\text{ cm}^3` },
    ],
  }),

  defineQuestion('PHY_UN06', {
    sourceRef: 'P14',
    topic: 'uncertainty',
    difficulty: 2,
    params: {
      diameter: { min: 6, max: 12, step: 0.1 },
      dDiameter: { min: 0.01, max: 0.05, step: 0.01 },
    },
    prompt: (p) =>
      `A chocolate cookie is a circular disk with a diameter of ${fmt(p.diameter)} ± ${fmt(p.dDiameter)} cm. If the area of its top circular face is written in A ± δA format, find the maximum possible uncertainty in that area δA.`,
    compute: (p) => ({
      value: uncertaintyCircleArea(p.diameter, p.dDiameter),
      unit: 'cm²',
      tolerance: { mode: 'relative', value: 0.02 },
    }),
    solution: (_p, answer) => [
      { label: 'Formula', math: 'A = \\pi \\left(\\frac{d}{2}\\right)^2 \\Rightarrow \\delta A = \\frac{\\pi d}{2}\\delta d' },
      { label: 'Answer', math: `\\delta A = ${fmt(answer)}\\text{ cm}^2` },
    ],
  }),
]
