import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import { toRad } from '../../physics/vectors'

const G = 9.8

export const powerQuestions = [
  defineQuestion('PHY2_PW01', {
    sourceRef: 'P26',
    topic: 'power',
    difficulty: 3,
    params: { m: { min: 1200, max: 2200, step: 50 }, v: { min: 2, max: 4, step: 0.05 }, angleDeg: { min: 15, max: 28, step: 1 }, mu: { min: 0.5, max: 0.75, step: 0.01 } },
    prompt: (p) =>
      `An electric engine pulls a ${fmt(p.m)}-kg block of concrete with a constant speed of ${fmt(p.v)} m/s up an incline with an angle of inclination θ = ${fmt(p.angleDeg)}°. The coefficient of kinetic friction between the block and the incline is ${fmt(p.mu)}. How much power must be supplied by the engine? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const theta = toRad(p.angleDeg)
      const F = p.m * G * Math.sin(theta) + p.mu * p.m * G * Math.cos(theta)
      return { value: F * p.v, unit: 'W', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'P = (mg\\sin\\theta + \\mu mg\\cos\\theta)\\,v' },
      { label: 'Answer', math: `P = ${fmt(answer)}\\text{ W}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p26.png' } }),
  }),

  defineQuestion('PHY2_PW02', {
    sourceRef: 'P27',
    topic: 'power',
    difficulty: 1,
    params: { h: { min: 30, max: 90, step: 1 }, rateE5: { min: 3, max: 7, step: 0.1 } },
    prompt: (p) =>
      `Calculate how much electrical power could be produced by a waterfall which is ${fmt(p.h)} m high, if all the potential energy of the water were converted into electric energy. The average rate of water fall is ${fmt(p.rateE5)}×10⁵ kg/s. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: p.rateE5 * 1e5 * G * p.h, unit: 'W', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'P = \\dfrac{dm}{dt}\\,g h' },
      { label: 'Answer', math: `P = ${answer.toExponential(4)}\\text{ W}` },
    ],
  }),

  defineQuestion('PHY2_PW03', {
    sourceRef: 'P28',
    topic: 'power',
    difficulty: 1,
    params: { h: { min: 40, max: 100, step: 1 }, powerMW: { min: 20, max: 60, step: 1 } },
    prompt: (p) =>
      `A waterfall ${fmt(p.h)} m high produces ${fmt(p.powerMW)} MW of electrical power, assuming all the potential energy of the water is converted into electric energy. What is the average rate of water fall (mass per unit time)? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: (p.powerMW * 1e6) / (G * p.h), unit: 'kg/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\dfrac{dm}{dt} = \\dfrac{P}{gh}' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ kg/s}` },
    ],
  }),

  defineQuestion('PHY2_PW04', {
    sourceRef: 'P29',
    topic: 'power',
    difficulty: 2,
    params: { volumeL: { min: 5000, max: 10000, step: 100 }, h: { min: 1.2, max: 2.2, step: 0.05 } },
    prompt: (p) =>
      `Each day the human heart takes in and discharges about ${fmt(p.volumeL)} liters of blood. Assume that the work done by the heart is equal to the work required to lift this amount of blood a height equal to ${fmt(p.h)} m. The density of blood is 1.05 × 10³ kg/m³. What is the heart's power output in watts? The gravitational acceleration is g = ${G} m/s². 1 liter = 0.001 m³.`,
    compute: (p) => {
      const volumeM3 = p.volumeL * 0.001
      const rho = 1.05e3
      const W = rho * volumeM3 * G * p.h
      const seconds = 86400
      return { value: W / seconds, unit: 'W', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'P = \\dfrac{\\rho V g h}{t_{day}}' },
      { label: 'Answer', math: `P = ${fmt(answer)}\\text{ W}` },
    ],
  }),
]
