import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import {
  bankingAngle,
  centripetalAccel,
  conicalPendulumSpeed,
  minSpeedTopOfLoop,
  period,
  skidFrictionCoefficient,
  skidTangentialAccel,
  totalAccel,
} from '../../physics/circular'
import { toRad } from '../../physics/vectors'

const G = 9.8

export const circularMotionQuestions = [
  defineQuestion('PHY_CM01', {
    sourceRef: 'P81',
    topic: 'circular',
    difficulty: 2,
    params: { r: { min: 400, max: 650, step: 10 }, speedKmh: { min: 18, max: 35, step: 1 }, aTan: { min: 0.2, max: 0.5, step: 0.02 } },
    prompt: (p) =>
      `A car passes over a rise in the roadway such that the top of the rise is shaped like a circle of radius ${fmt(p.r)} m. At the moment the car is at the top of the rise, its velocity is ${fmt(p.speedKmh)} km/h and constant acceleration parallel to the roadway is ${fmt(p.aTan)} m/s². What is the magnitude of the total acceleration vector for the car at this instant?`,
    compute: (p) => {
      const v = (p.speedKmh * 1000) / 3600
      const radial = centripetalAccel(v, p.r)
      return { value: totalAccel(radial, p.aTan), unit: 'm/s²', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'a_r = v^2/r,\\quad a = \\sqrt{a_r^2+a_t^2}' },
      { label: 'Answer', math: `a = ${fmt(answer)}\\text{ m/s}^2` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p81.png' } }),
  }),

  defineQuestion('PHY_CM02', {
    sourceRef: 'P82',
    topic: 'circular',
    difficulty: 1,
    params: { r: { min: 400, max: 650, step: 10 }, speedKmh: { min: 25, max: 45, step: 1 } },
    prompt: (p) =>
      `A car passes over a rise in the roadway such that the top of the rise is shaped like a circle of radius ${fmt(p.r)} m. The car moves at a constant speed of ${fmt(p.speedKmh)} km/h. What is the magnitude of the total acceleration of the car at the moment it is at the top of the rise?`,
    compute: (p) => {
      const v = (p.speedKmh * 1000) / 3600
      return { value: centripetalAccel(v, p.r), unit: 'm/s²', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'a = v^2/r\\ \\ (\\text{constant speed} \\Rightarrow a_t = 0)' },
      { label: 'Answer', math: `a = ${fmt(answer)}\\text{ m/s}^2` },
    ],
    diagram: (p) => ({ kind: 'circularHill', props: { radius: p.r } }),
  }),

  defineQuestion('PHY_CM03', {
    sourceRef: 'P83',
    topic: 'circular',
    difficulty: 3,
    params: { mass: { min: 1000, max: 1800, step: 10 }, r: { min: 45, max: 75, step: 1 }, T: { min: 40, max: 60, step: 1 } },
    prompt: (p) =>
      `A car of mass ${fmt(p.mass)} kg starts from rest on a horizontal circular track of radius ${fmt(p.r)} m. Its speed is increased uniformly and in ${fmt(p.T)} seconds it makes a full circle. What was the net force acting on the car at the moment when it completed the first semicircle?`,
    compute: (p) => {
      const aTan = (4 * Math.PI * p.r) / (p.T * p.T)
      const t1 = p.T / Math.SQRT2
      const v = aTan * t1
      const radial = (v * v) / p.r
      const total = Math.hypot(aTan, radial)
      return { value: p.mass * total, unit: 'N', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (p, answer) => [
      { label: 'Given', math: `m=${fmt(p.mass)}\\text{ kg},\\ r=${fmt(p.r)}\\text{ m},\\ T=${fmt(p.T)}\\text{ s}` },
      { label: 'Formula', math: '2\\pi r = \\tfrac12 a_t T^2,\\quad \\pi r = \\tfrac12 a_t t_1^2 \\Rightarrow t_1=T/\\sqrt2,\\quad F=m\\sqrt{a_t^2+(v^2/r)^2}' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY_CM04', {
    sourceRef: 'P84',
    topic: 'circular',
    difficulty: 2,
    params: { r: { min: 0.5, max: 1.2, step: 0.01 } },
    prompt: (p) =>
      `A bucket of water whirls around a vertical circle of radius ${fmt(p.r * 100)} cm. What is the minimum speed that the bucket must have at the top of its circular motion if the water is not to spill out of the upside-down bucket? Take the gravitational acceleration g = ${G} m/s².`,
    compute: (p) => ({ value: minSpeedTopOfLoop(p.r, G), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_{min} = \\sqrt{gr}' },
      { label: 'Answer', math: `v_{min} = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: (p) => ({ kind: 'verticalCircle', props: { radius: p.r } }),
  }),

  defineQuestion('PHY_CM05', {
    sourceRef: 'P85',
    topic: 'circular',
    difficulty: 2,
    params: { r: { min: 0.5, max: 1.1, step: 0.01 } },
    prompt: (p) =>
      `A bucket of water is whirled around a vertical circle of radius ${fmt(p.r * 100)} cm. What is the maximum period of revolution the bucket can have if the water is not to spill out of the upside-down bucket at the top of the circle? Take the gravitational acceleration g = ${G} m/s².`,
    compute: (p) => {
      const vmin = minSpeedTopOfLoop(p.r, G)
      return { value: period(p.r, vmin), unit: 's', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_{min}=\\sqrt{gr},\\quad T_{max} = \\dfrac{2\\pi r}{v_{min}} = 2\\pi\\sqrt{r/g}' },
      { label: 'Answer', math: `T_{max} = ${fmt(answer)}\\text{ s}` },
    ],
    diagram: (p) => ({ kind: 'verticalCircle', props: { radius: p.r } }),
  }),

  defineQuestion('PHY_CM06', {
    sourceRef: 'P86',
    topic: 'circular',
    difficulty: 2,
    params: { mass: { min: 0.2, max: 0.6, step: 0.01 }, r: { min: 0.8, max: 1.6, step: 0.05 }, maxT: { min: 50, max: 90, step: 1 } },
    prompt: (p) =>
      `A ball of ${fmt(p.mass)} kg is attached at the end of a cord and revolves in a circle of radius ${fmt(p.r)} m on a frictionless horizontal surface. The cord will break if the tension in it exceeds ${fmt(p.maxT)} N. What is the maximum speed the ball can have without breaking the cord?`,
    compute: (p) => ({ value: Math.sqrt((p.maxT * p.r) / p.mass), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'T = \\dfrac{mv^2}{r} \\Rightarrow v = \\sqrt{Tr/m}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_CM07', {
    sourceRef: 'P87',
    topic: 'circular',
    difficulty: 2,
    params: { mass: { min: 0.2, max: 0.5, step: 0.01 }, r: { min: 1, max: 2, step: 0.05 }, maxT: { min: 50, max: 90, step: 1 } },
    prompt: (p) =>
      `A ball of ${fmt(p.mass)} kg is attached at the end of a cord and revolves in a vertical circle of radius ${fmt(p.r)} m. The cord will break if the tension in it exceeds ${fmt(p.maxT)} N. What is the maximum speed the ball can have at the lowest point of the circle without breaking the cord? Take the gravitational acceleration g = ${G} m/s².`,
    compute: (p) => ({ value: Math.sqrt(p.r * (p.maxT / p.mass - G)), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'T = m\\left(g+\\dfrac{v^2}{r}\\right) \\Rightarrow v = \\sqrt{r(T/m-g)}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: (p) => ({ kind: 'verticalCircle', props: { radius: p.r } }),
  }),

  defineQuestion('PHY_CM08', {
    sourceRef: 'P88',
    topic: 'circular',
    difficulty: 3,
    params: { aTan: { min: 0.8, max: 1.6, step: 0.1 } },
    prompt: (p) =>
      `A bicycle accelerates uniformly along a circular path on a flat horizontal surface. The bicycle is initially at rest and the tangential acceleration is ${fmt(p.aTan)} m/s². The bicycle makes one half of the circle before it skids off the circular path. Calculate the coefficient of static friction between the bicycle and the surface, taking gravitational acceleration g = ${G} m/s².`,
    compute: (p) => ({ value: skidFrictionCoefficient(p.aTan, 0.5, G), unit: '', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v^2 = 2\\pi a_t r,\\ \\ \\mu = \\dfrac{\\sqrt{a_t^2+(v^2/r)^2}}{g} = \\dfrac{a_t\\sqrt{1+(4\\pi \\cdot 0.5)^2}}{g}' },
      { label: 'Answer', math: `\\mu = ${fmt(answer)}` },
    ],
  }),

  defineQuestion('PHY_CM09', {
    sourceRef: 'P89',
    topic: 'circular',
    difficulty: 3,
    params: { mu: { min: 0.5, max: 0.9, step: 0.02 } },
    prompt: (p) =>
      `A bicycle initially at rest accelerates uniformly along a circular path on a flat horizontal surface. The bicycle makes one third of the circle before it skids off the circular path. If the coefficient of static friction between the bicycle and the surface equals ${fmt(p.mu)}, find the tangential acceleration, taking gravitational acceleration g = ${G} m/s².`,
    compute: (p) => ({ value: skidTangentialAccel(p.mu, 1 / 3, G), unit: 'm/s²', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'a_t = \\dfrac{\\mu g}{\\sqrt{1+(4\\pi/3)^2}}' },
      { label: 'Answer', math: `a_t = ${fmt(answer)}\\text{ m/s}^2` },
    ],
  }),

  defineQuestion('PHY_CM10', {
    sourceRef: 'P90',
    topic: 'circular',
    difficulty: 2,
    params: { m: { min: 0.5, max: 1.5, step: 0.05 }, r: { min: 0.1, max: 0.3, step: 0.01 }, M: { min: 1, max: 2.5, step: 0.1 } },
    prompt: (p) =>
      `A block of mass m = ${fmt(p.m)} kg is moving with constant speed in a circle with radius r = ${fmt(p.r)} m on a frictionless table. The block is attached to a ${fmt(p.M)} kg mass, M, by a cord through a hole in the table. Find the speed with which m must move for M to stay at rest. Take gravitational acceleration g = ${G} m/s².`,
    compute: (p) => ({ value: Math.sqrt((p.M * G * p.r) / p.m), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'Mg = \\dfrac{mv^2}{r} \\Rightarrow v = \\sqrt{Mgr/m}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p90.png' } }),
  }),

  defineQuestion('PHY_CM11', {
    sourceRef: 'P91',
    topic: 'circular',
    difficulty: 2,
    params: { m: { min: 0.8, max: 1.8, step: 0.05 }, v: { min: 1.5, max: 3, step: 0.1 }, r: { min: 0.1, max: 0.3, step: 0.01 } },
    prompt: (p) =>
      `A block of mass m = ${fmt(p.m)} kg is moving with constant speed v = ${fmt(p.v)} m/s in a circle of radius r = ${fmt(p.r)} m on a frictionless table. The block is attached to a hanging mass M by a cord passing through a hole in the table. Find the mass M that stays at rest. Take the gravitational acceleration g = ${G} m/s².`,
    compute: (p) => ({ value: (p.m * p.v * p.v) / (G * p.r), unit: 'kg', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'M = \\dfrac{mv^2}{gr}' },
      { label: 'Answer', math: `M = ${fmt(answer)}\\text{ kg}` },
    ],
  }),

  defineQuestion('PHY_CM12', {
    sourceRef: 'P92',
    topic: 'circular',
    difficulty: 2,
    params: { L: { min: 0.5, max: 1.2, step: 0.01 }, angleDeg: { min: 10, max: 25, step: 1 } },
    prompt: (p) =>
      `A ball suspended from a pivot on a string of length L = ${fmt(p.L * 100)} cm revolves in a horizontal plane with constant speed v. The string maintains an angle of θ = ${fmt(p.angleDeg)}º with respect to the vertical. Find v, taking gravitational acceleration g = ${G} m/s².`,
    compute: (p) => ({ value: conicalPendulumSpeed(p.L, toRad(p.angleDeg), G), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v = \\sqrt{gL\\sin\\theta\\tan\\theta}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p92.png' } }),
  }),

  defineQuestion('PHY_CM13', {
    sourceRef: 'P93',
    topic: 'circular',
    difficulty: 2,
    params: { mass: { min: 900, max: 1500, step: 50 }, r: { min: 60, max: 100, step: 5 }, v: { min: 15, max: 26, step: 1 } },
    prompt: (p) =>
      `A car of mass m = ${fmt(p.mass)} kg travels around a circular, banked road of radius R = ${fmt(p.r)} m. The road is inclined at an angle θ above the horizontal. The car travels at a constant speed of v = ${fmt(p.v)} m/s. Assume friction between the tires and the road is negligible. Determine the required banking angle θ (in radians) so that the car can travel around the curve without relying on friction.`,
    compute: (p) => ({ value: bankingAngle(p.v, p.r, G), unit: 'rad', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\tan\\theta = \\dfrac{v^2}{Rg}' },
      { label: 'Answer', math: `\\theta = ${fmt(answer)}\\text{ rad}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p93.png' } }),
  }),
]
