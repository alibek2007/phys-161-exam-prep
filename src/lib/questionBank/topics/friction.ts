import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import { atwoodWithFrictionAccel, accelPulledAtAngleWithFriction } from '../../physics/newton'
import { accelForceAtAngleWithHangingMass, minForceBlockAgainstBlock, staticKineticFrictionDiff } from '../../physics/friction'
import { toRad } from '../../physics/vectors'

const G = 9.8

export const frictionQuestions = [
  defineQuestion('PHY_FR01', {
    sourceRef: 'P94',
    topic: 'friction',
    difficulty: 3,
    params: { m1: { min: 2.5, max: 5, step: 0.05 }, m2: { min: 2, max: 4, step: 0.05 }, a: { min: 1, max: 2.2, step: 0.01 } },
    prompt: (p) =>
      `A block with mass m₁ = ${fmt(p.m1)} kg is on a horizontal surface, connected by a massless string to a hook where mass m₂ can be increased smoothly. The pulley has negligible mass and no friction. When m₂ = ${fmt(p.m2)} kg it begins to accelerate downwards at a rate of ${fmt(p.a)} m/s². Calculate the difference between static and kinetic coefficients of friction, μs − μk, between m₁ and the surface. Take gravitational acceleration g = ${G} m/s².`,
    compute: (p) => ({ value: staticKineticFrictionDiff(p.a, p.m1, p.m2, G), unit: '', tolerance: { mode: 'relative', value: 0.02 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\mu_s - \\mu_k = \\dfrac{a(m_1+m_2)}{m_1 g}' },
      { label: 'Answer', math: `${fmt(answer)}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p94-95.png' } }),
  }),

  defineQuestion('PHY_FR02', {
    sourceRef: 'P95',
    topic: 'friction',
    difficulty: 2,
    params: { m1: { min: 3, max: 6, step: 0.1 }, m2: { min: 2, max: 4, step: 0.1 }, mu: { min: 0.2, max: 0.4, step: 0.01 } },
    prompt: (p) =>
      `A block with mass m₁ = ${fmt(p.m1)} kg is on a horizontal surface, connected by a massless string over a massless frictionless pulley to a hanging mass m₂ = ${fmt(p.m2)} kg. The coefficient of kinetic friction between m₁ and the surface is ${fmt(p.mu)}. Calculate the magnitude of the acceleration of the blocks. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: atwoodWithFrictionAccel(p.m1, p.m2, p.mu, G), unit: 'm/s²', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'a = \\dfrac{m_2 g - \\mu m_1 g}{m_1+m_2}' },
      { label: 'Answer', math: `a = ${fmt(answer)}\\text{ m/s}^2` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p94-95.png' } }),
  }),

  defineQuestion('PHY_FR03', {
    sourceRef: 'P96',
    topic: 'friction',
    difficulty: 3,
    params: {
      m1: { min: 20, max: 30, step: 0.5 }, m2: { min: 3, max: 6, step: 0.2 },
      F: { min: 250, max: 340, step: 5 }, angleDeg: { min: 20, max: 40, step: 1 }, mu: { min: 0.1, max: 0.25, step: 0.01 },
    },
    prompt: (p) =>
      `A block with mass m₁ = ${fmt(p.m1)} kg is on a horizontal surface, connected to a hanging mass m₂ = ${fmt(p.m2)} kg by a massless string over a massless, frictionless pulley. A force of ${fmt(p.F)} N acts on m₁ at an angle of ${fmt(p.angleDeg)}º above horizontal. The coefficient of kinetic friction between m₁ and the surface is ${fmt(p.mu)}. Determine the upward acceleration of m₂. Take gravitational acceleration g = ${G} m/s².`,
    compute: (p) => ({
      value: accelForceAtAngleWithHangingMass(p.F, toRad(p.angleDeg), p.m1, p.m2, p.mu, G),
      unit: 'm/s²',
      tolerance: { mode: 'relative', value: 0.02 },
    }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'N=m_1g-F\\sin\\theta,\\quad a=\\dfrac{F\\cos\\theta-\\mu N-m_2 g}{m_1+m_2}' },
      { label: 'Answer', math: `a = ${fmt(answer)}\\text{ m/s}^2` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p96.png' } }),
  }),

  defineQuestion('PHY_FR04', {
    sourceRef: 'P97',
    topic: 'friction',
    difficulty: 2,
    params: { F: { min: 15, max: 30, step: 1 }, m: { min: 3, max: 6, step: 0.1 }, mu: { min: 0.1, max: 0.22, step: 0.01 }, t: { min: 1.5, max: 3.5, step: 0.5 } },
    prompt: (p) =>
      `A force of magnitude ${fmt(p.F)} N is applied in the horizontal direction to a block of mass ${fmt(p.m)} kg placed on a horizontal surface. Taking the coefficient of kinetic friction between the block and the surface equal to ${fmt(p.mu)}, calculate the speed of the block ${fmt(p.t)} seconds after it started moving. Take gravitational acceleration g = ${G} m/s².`,
    compute: (p) => {
      const a = accelPulledAtAngleWithFriction(p.m, G, p.F, 0, p.mu)
      return { value: Math.max(a, 0) * p.t, unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'a = \\dfrac{F-\\mu m g}{m},\\quad v = at' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_FR05', {
    sourceRef: 'P98',
    topic: 'friction',
    difficulty: 2,
    params: { F: { min: 35, max: 55, step: 1 }, angleDeg: { min: 15, max: 35, step: 1 }, m: { min: 3.5, max: 6, step: 0.1 }, mu: { min: 0.05, max: 0.18, step: 0.01 }, t: { min: 1.5, max: 3.5, step: 0.5 } },
    prompt: (p) =>
      `A force of magnitude ${fmt(p.F)} N is applied at an angle of ${fmt(p.angleDeg)}° above the horizontal to a block of mass ${fmt(p.m)} kg resting on a horizontal surface. Taking the coefficient of kinetic friction between the block and the surface equal to ${fmt(p.mu)}, calculate the speed of the block ${fmt(p.t)} s after it starts moving. Take the gravitational acceleration g = ${G} m/s².`,
    compute: (p) => {
      const a = accelPulledAtAngleWithFriction(p.m, G, p.F, toRad(p.angleDeg), p.mu)
      return { value: Math.max(a, 0) * p.t, unit: 'm/s', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'N=mg-F\\sin\\theta,\\ a=\\dfrac{F\\cos\\theta-\\mu N}{m},\\quad v=at' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_FR06', {
    sourceRef: 'P99',
    topic: 'friction',
    difficulty: 3,
    params: { m1: { min: 15, max: 25, step: 0.5 }, m2: { min: 45, max: 70, step: 1 }, mu: { min: 0.25, max: 0.45, step: 0.01 } },
    prompt: (p) =>
      `Two blocks with masses m₁ = ${fmt(p.m1)} kg and m₂ = ${fmt(p.m2)} kg are free to move. The surface beneath m₂ is frictionless and the coefficient of static friction between the blocks is ${fmt(p.mu)}. Find the minimal force F required to hold m₁ against m₂ (pressing m₁ horizontally against m₂'s vertical face).`,
    compute: (p) => ({ value: minForceBlockAgainstBlock(p.m1, p.m2, p.mu, G), unit: 'N', tolerance: { mode: 'relative', value: 0.02 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = \\dfrac{m_1 g (m_1+m_2)}{\\mu\\, m_2}' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p99-100.png' } }),
  }),

  defineQuestion('PHY_FR07', {
    sourceRef: 'P100',
    topic: 'friction',
    difficulty: 2,
    params: { m1: { min: 15, max: 25, step: 0.5 }, m2: { min: 45, max: 65, step: 1 }, F: { min: 600, max: 900, step: 10 } },
    prompt: (p) =>
      `Two blocks with masses m₁ = ${fmt(p.m1)} kg and m₂ = ${fmt(p.m2)} kg. A horizontal force F = ${fmt(p.F)} N presses m₁ against the vertical face of m₂, and the coefficient of static friction between the blocks is large enough that m₁ does not slip down. The surface beneath m₂ is frictionless. Find the magnitude of the acceleration of the two blocks.`,
    compute: (p) => ({ value: p.F / (p.m1 + p.m2), unit: 'm/s²', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'a = \\dfrac{F}{m_1+m_2}' },
      { label: 'Answer', math: `a = ${fmt(answer)}\\text{ m/s}^2` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p99-100.png' } }),
  }),
]
