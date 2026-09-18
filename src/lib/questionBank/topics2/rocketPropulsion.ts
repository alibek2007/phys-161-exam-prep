import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import { rocketFinalSpeed, rocketPayloadFraction } from '../../physics/rocket'

export const rocketPropulsionQuestions = [
  defineQuestion('PHY2_RP01', {
    sourceRef: 'P92',
    topic: 'rocketPropulsion',
    difficulty: 2,
    params: { payloadPct: { min: 4, max: 10, step: 0.5 }, ve: { min: 3, max: 5, step: 0.1 } },
    prompt: (p) =>
      `A rocket has a payload of ${fmt(p.payloadPct)} percent of its total mass, the rest being fuel. If this rocket starts from rest and moves with no external forces acting on it, what is its final velocity if the exhaust velocity of the gas is ${fmt(p.ve)} km/s?`,
    compute: (p) => ({ value: rocketFinalSpeed(p.ve, p.payloadPct / 100), unit: 'km/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_f = v_{exhaust}\\,\\ln(1/f),\\ \\ f=\\text{payload fraction}' },
      { label: 'Answer', math: `v_f = ${fmt(answer)}\\text{ km/s}` },
    ],
  }),

  defineQuestion('PHY2_RP02', {
    sourceRef: 'P93',
    topic: 'rocketPropulsion',
    difficulty: 2,
    params: { ve: { min: 3, max: 4.5, step: 0.1 }, vf: { min: 9, max: 13, step: 0.2 } },
    prompt: (p) =>
      `A rocket starts from rest and moves with no external forces acting on it. The exhaust velocity of the gas is ${fmt(p.ve)} km/s. What fraction of the rocket's total mass can be payload if its final velocity is to be ${fmt(p.vf)} km/s?`,
    compute: (p) => ({ value: rocketPayloadFraction(p.ve, p.vf), unit: '', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'f = e^{-v_f/v_{exhaust}}' },
      { label: 'Answer', math: `f = ${fmt(answer)}` },
    ],
  }),
]
