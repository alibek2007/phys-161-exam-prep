import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import { kineticEnergy } from '../../physics/energy'
import { magnitude, toRad, v3 } from '../../physics/vectors'

const PROTON_TO_ELECTRON = 1836
const G = 9.8

export const kineticEnergyQuestions = [
  defineQuestion('PHY2_KE01', {
    sourceRef: 'P15',
    topic: 'kineticEnergy',
    difficulty: 2,
    params: { massG: { min: 8, max: 20, step: 0.5 }, v: { min: 600, max: 900, step: 5 }, d: { min: 0.25, max: 0.6, step: 0.01 } },
    prompt: (p) =>
      `In a gun, a ${fmt(p.massG)} g bullet is accelerated from rest to a speed of ${fmt(p.v)} m/s. Assuming the bullet passes ${fmt(p.d * 100)} cm distance inside the gun, find the magnitude of the average net force that acted on it.`,
    compute: (p) => ({ value: kineticEnergy(p.massG / 1000, p.v) / p.d, unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F\\,d = \\tfrac12 m v^2 \\Rightarrow F = \\dfrac{mv^2}{2d}' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY2_KE02', {
    sourceRef: 'P16',
    topic: 'kineticEnergy',
    difficulty: 1,
    params: { massG: { min: 10, max: 25, step: 0.5 }, v: { min: 650, max: 900, step: 5 }, d: { min: 0.4, max: 0.75, step: 0.01 } },
    prompt: (p) =>
      `In a gun, a ${fmt(p.massG)} g bullet is accelerated uniformly from rest to a speed of ${fmt(p.v)} m/s. Assuming the bullet travels ${fmt(p.d * 100)} cm inside the gun, find the time the bullet spends inside the gun.`,
    compute: (p) => ({ value: (2 * p.d) / p.v, unit: 's', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'd = \\tfrac12(0+v)t \\Rightarrow t = \\dfrac{2d}{v}' },
      { label: 'Answer', math: `t = ${fmt(answer)}\\text{ s}` },
    ],
  }),

  defineQuestion('PHY2_KE03', {
    sourceRef: 'P17',
    topic: 'kineticEnergy',
    difficulty: 1,
    params: { massG: { min: 8, max: 20, step: 0.5 }, v: { min: 600, max: 900, step: 5 } },
    prompt: (p) => `In a gun, a ${fmt(p.massG)} g bullet is accelerated from rest to a speed of ${fmt(p.v)} m/s. Find the work that is done on the bullet.`,
    compute: (p) => ({ value: kineticEnergy(p.massG / 1000, p.v), unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'W = \\Delta KE = \\tfrac12 m v^2' },
      { label: 'Answer', math: `W = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_KE04', {
    sourceRef: 'P18',
    topic: 'kineticEnergy',
    difficulty: 1,
    params: { massE8: { min: 1, max: 2.5, step: 0.1 }, v: { min: 8000, max: 15000, step: 500 } },
    prompt: (p) =>
      `A meteor crashed into the earth. Measurements estimate that this meteor had a mass of ${fmt(p.massE8)}×10⁸ kg and hit the ground at ${fmt(p.v / 1000)} km/s. How much kinetic energy did this meteor deliver to the ground?`,
    compute: (p) => ({ value: kineticEnergy(p.massE8 * 1e8, p.v), unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'KE = \\tfrac12 m v^2' },
      { label: 'Answer', math: `KE = ${answer.toExponential(4)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_KE05', {
    sourceRef: 'P19',
    topic: 'kineticEnergy',
    difficulty: 2,
    params: { keEExp: { min: 2, max: 6, step: 0.1 } },
    prompt: (p) =>
      `The mass of a proton is 1836 times the mass of an electron. An electron has kinetic energy ${fmt(p.keEExp)}×10⁻¹⁶ J. If a proton has the same speed as the electron, what is its kinetic energy?`,
    compute: (p) => ({ value: p.keEExp * 1e-16 * PROTON_TO_ELECTRON, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'KE \\propto m\\ \\text{at fixed } v \\Rightarrow KE_p = 1836\\,KE_e' },
      { label: 'Answer', math: `KE_p = ${answer.toExponential(4)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_KE06', {
    sourceRef: 'P20',
    topic: 'kineticEnergy',
    difficulty: 2,
    params: { keEExp: { min: 2, max: 6, step: 0.1 } },
    prompt: (p) =>
      `The mass of a proton is 1836 times the mass of an electron. An electron has kinetic energy ${fmt(p.keEExp)}×10⁻¹⁶ J. If a proton has the same momentum as the electron, what is the proton's kinetic energy?`,
    compute: (p) => ({ value: (p.keEExp * 1e-16) / PROTON_TO_ELECTRON, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'KE = \\dfrac{p^2}{2m} \\Rightarrow KE_p = KE_e\\cdot\\dfrac{m_e}{m_p} = \\dfrac{KE_e}{1836}' },
      { label: 'Answer', math: `KE_p = ${answer.toExponential(4)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_KE07', {
    sourceRef: 'P21',
    topic: 'kineticEnergy',
    difficulty: 2,
    params: { vpE6: { min: 0.5, max: 3, step: 0.1 } },
    prompt: (p) =>
      `The mass of a proton is 1836 times the mass of an electron. A proton is traveling at speed ${fmt(p.vpE6)}×10⁶ m/s. At what speed would an electron have the same kinetic energy as the proton?`,
    compute: (p) => ({ value: p.vpE6 * 1e6 * Math.sqrt(PROTON_TO_ELECTRON), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\tfrac12 m_e v_e^2 = \\tfrac12 m_p v_p^2 \\Rightarrow v_e = v_p\\sqrt{1836}' },
      { label: 'Answer', math: `v_e = ${answer.toExponential(4)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_KE08', {
    sourceRef: 'P22',
    topic: 'kineticEnergy',
    difficulty: 2,
    params: { vpE4: { min: 3, max: 9, step: 0.1 } },
    prompt: (p) =>
      `The mass of a proton is 1836 times the mass of an electron. A proton is traveling at a speed of ${fmt(p.vpE4)}×10⁴ m/s. At what speed would an electron have the same momentum as the proton?`,
    compute: (p) => ({ value: p.vpE4 * 1e4 * PROTON_TO_ELECTRON, unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'm_e v_e = m_p v_p \\Rightarrow v_e = 1836\\,v_p' },
      { label: 'Answer', math: `v_e = ${answer.toExponential(4)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_KE09', {
    sourceRef: 'P23',
    topic: 'kineticEnergy',
    difficulty: 2,
    params: { m: { min: 2, max: 6, step: 0.5 }, v1x: { min: 1, max: 3, step: 0.5 }, v1y: { min: 1, max: 3, step: 0.5 }, v2x: { min: 5, max: 9, step: 0.5 }, v2y: { min: 3, max: 6, step: 0.5 } },
    prompt: (p) =>
      `A ${fmt(p.m)} kg object has a velocity of (${fmt(p.v1x)}î + ${fmt(p.v1y)}ĵ) m/s. What is the net work done on the object if its velocity changes to (${fmt(p.v2x)}î + ${fmt(p.v2y)}ĵ) m/s?`,
    compute: (p) => {
      const v1 = magnitude(v3(p.v1x, p.v1y))
      const v2 = magnitude(v3(p.v2x, p.v2y))
      return { value: 0.5 * p.m * (v2 * v2 - v1 * v1), unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (_p, answer) => [
      { label: 'Formula', math: 'W = \\Delta KE = \\tfrac12 m(v_2^2-v_1^2)' },
      { label: 'Answer', math: `W = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_KE10', {
    sourceRef: 'P24',
    topic: 'kineticEnergy',
    difficulty: 2,
    params: { m: { min: 1, max: 4, step: 0.5 }, v1x: { min: 1, max: 3, step: 0.5 }, v1y: { min: 0, max: 2, step: 0.5 }, v2x: { min: 5, max: 9, step: 0.5 }, v2y: { min: 5, max: 9, step: 0.5 } },
    prompt: (p) =>
      `A ${fmt(p.m)} kg object has a velocity of (${fmt(p.v1x)}î + ${fmt(p.v1y)}ĵ) m/s. Its velocity then changes to (${fmt(p.v2x)}î + ${fmt(p.v2y)}ĵ) m/s. What is the magnitude of the change in the object's momentum?`,
    compute: (p) => {
      const dv = magnitude(v3(p.v2x - p.v1x, p.v2y - p.v1y))
      return { value: p.m * dv, unit: 'kg m/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (_p, answer) => [
      { label: 'Formula', math: '|\\Delta \\vec p| = m|\\vec v_2 - \\vec v_1|' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ kg m/s}` },
    ],
  }),

  defineQuestion('PHY2_KE11', {
    sourceRef: 'P25',
    topic: 'kineticEnergy',
    difficulty: 3,
    params: { m: { min: 65, max: 100, step: 1 }, angleDeg: { min: 20, max: 32, step: 1 }, d: { min: 2, max: 3.5, step: 0.1 }, F: { min: 400, max: 600, step: 10 }, v1: { min: 1.8, max: 3, step: 0.1 } },
    prompt: (p) =>
      `A physics professor is pushed up a ramp inclined upward at ${fmt(p.angleDeg)}° above the horizontal as he sits in his desk chair that slides on frictionless rollers. The combined mass of the professor and chair is ${fmt(p.m)} kg. He is pushed ${fmt(p.d)} m along the incline by a group of students who together exert a constant horizontal force of ${fmt(p.F)} N. The professor's speed at the bottom of the ramp is ${fmt(p.v1)} m/s. Find his speed at the top of the ramp. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const theta = toRad(p.angleDeg)
      const W_F = p.F * Math.cos(theta) * p.d
      const W_g = -p.m * G * Math.sin(theta) * p.d
      const v2sq = p.v1 * p.v1 + (2 * (W_F + W_g)) / p.m
      return { value: Math.sqrt(Math.max(v2sq, 0)), unit: 'm/s', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '\\tfrac12 m v_2^2 = \\tfrac12 m v_1^2 + F\\cos\\theta\\,d - mg\\sin\\theta\\,d' },
      { label: 'Answer', math: `v_2 = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),
]
