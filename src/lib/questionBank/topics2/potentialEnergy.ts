import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'

export const potentialEnergyQuestions = [
  defineQuestion('PHY2_PE01', {
    sourceRef: 'P30',
    topic: 'potentialEnergy',
    difficulty: 2,
    params: { alpha: { min: 1.5, max: 4, step: 0.1 }, x: { min: -0.4, max: -0.1, step: 0.02 } },
    prompt: (p) =>
      `A force parallel to the x-axis acts on a particle moving along the x-axis. This force produces potential energy given by U(x) = α x⁴, where α = ${fmt(p.alpha)} J/m⁴. What is the force magnitude when the particle is at x = ${fmt(p.x)} m?`,
    compute: (p) => ({ value: Math.abs(4 * p.alpha * p.x ** 3), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = -\\dfrac{dU}{dx} = -4\\alpha x^3' },
      { label: 'Answer', math: `|F| = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY2_PE02', {
    sourceRef: 'P31',
    topic: 'potentialEnergy',
    difficulty: 2,
    params: { alpha: { min: 1.5, max: 4, step: 0.1 }, xi: { min: 1, max: 2, step: 0.1 }, xf: { min: 0.1, max: 0.6, step: 0.05 } },
    prompt: (p) =>
      `A force parallel to the x-axis acts on a particle moving along the x-axis. This force produces potential energy given by U(x) = α x⁴, where α = ${fmt(p.alpha)} J/m⁴. How much work does this force do on the particle as it moves from x = ${fmt(p.xi)} m to x = ${fmt(p.xf)} m?`,
    compute: (p) => ({ value: p.alpha * p.xi ** 4 - p.alpha * p.xf ** 4, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'W = U(x_i) - U(x_f) = \\alpha x_i^4 - \\alpha x_f^4' },
      { label: 'Answer', math: `W = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_PE03', {
    sourceRef: 'P32',
    topic: 'potentialEnergy',
    difficulty: 2,
    params: { a: { min: 1, max: 3, step: 0.5 }, b: { min: 3, max: 7, step: 0.5 }, m: { min: 2, max: 8, step: 0.5 }, xi: { min: 0.5, max: 2, step: 0.5 }, xf: { min: 6, max: 10, step: 0.5 } },
    prompt: (p) =>
      `A single conservative force acts on a ${fmt(p.m)}-kg particle. The equation F = (${fmt(p.a)}x + ${fmt(p.b)}) N describes the force, where x is in meters. As the particle moves along the x axis from x = ${fmt(p.xi)} m to x = ${fmt(p.xf)} m, calculate the change in the potential energy of the system.`,
    compute: (p) => {
      const W = (0.5 * p.a * p.xf ** 2 + p.b * p.xf) - (0.5 * p.a * p.xi ** 2 + p.b * p.xi)
      return { value: -W, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (_p, answer) => [
      { label: 'Formula', math: '\\Delta U = -\\int_{x_i}^{x_f} F\\,dx' },
      { label: 'Answer', math: `\\Delta U = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_PE04', {
    sourceRef: 'P33',
    topic: 'potentialEnergy',
    difficulty: 2,
    params: { a: { min: 1, max: 3, step: 0.5 }, b: { min: 2, max: 6, step: 0.5 }, m: { min: 2, max: 8, step: 0.5 }, xi: { min: 1, max: 3, step: 0.5 }, xf: { min: 7, max: 11, step: 0.5 } },
    prompt: (p) =>
      `A single conservative force acts on a ${fmt(p.m)} kg particle. The equation F = (${fmt(p.a)}x + ${fmt(p.b)}) N describes the force, where x is in meters. As the particle moves along the x axis from x = ${fmt(p.xi)} m to x = ${fmt(p.xf)} m, calculate the work done by this force on the particle.`,
    compute: (p) => {
      const W = (0.5 * p.a * p.xf ** 2 + p.b * p.xf) - (0.5 * p.a * p.xi ** 2 + p.b * p.xi)
      return { value: W, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (_p, answer) => [
      { label: 'Formula', math: 'W = \\int_{x_i}^{x_f} F\\,dx = \\left[\\tfrac{a}{2}x^2+bx\\right]_{x_i}^{x_f}' },
      { label: 'Answer', math: `W = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_PE05', {
    sourceRef: 'P34',
    topic: 'potentialEnergy',
    difficulty: 3,
    params: { a: { min: 0.8, max: 1.8, step: 0.1 }, b: { min: 2, max: 6, step: 0.5 }, x: { min: 5, max: 10, step: 0.5 } },
    prompt: (p) =>
      `A force F, measured in Newtons, varies along the x-axis, with the distance measured in meters, according to the following law: F(x) = ${fmt(p.a)}x² + ${fmt(p.b)}x. Find the potential energy U(x) associated with this force at x = ${fmt(p.x)} m. Assume that U(0) = 0.`,
    compute: (p) => ({ value: -((p.a / 3) * p.x ** 3 + (p.b / 2) * p.x ** 2), unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'U(x) = -\\int_0^x F(x)\\,dx = -\\left(\\dfrac{a}{3}x^3+\\dfrac{b}{2}x^2\\right)' },
      { label: 'Answer', math: `U(${fmt(p.x)}) = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_PE06', {
    sourceRef: 'P35',
    topic: 'potentialEnergy',
    difficulty: 1,
    params: { a: { min: 0.8, max: 2, step: 0.1 }, b: { min: 2, max: 5, step: 0.5 }, x: { min: 4, max: 9, step: 0.5 } },
    prompt: (p) =>
      `A force F, measured in newtons, varies along the x-axis, with the distance measured in meters, according to the following law: F(x) = ${fmt(p.a)}x² + ${fmt(p.b)}x. Find the magnitude of this force at x = ${fmt(p.x)} m.`,
    compute: (p) => ({ value: p.a * p.x ** 2 + p.b * p.x, unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F(x) = ax^2+bx' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
  }),
]
