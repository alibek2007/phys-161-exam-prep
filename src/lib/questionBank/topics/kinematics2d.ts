import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import { crossingResultantSpeed, crossingTime, downstreamDrift, straightAcrossSpeed } from '../../physics/relativeVelocity'

export const kinematics2dQuestions = [
  defineQuestion('PHY_K2D_01', {
    sourceRef: 'P54',
    topic: 'kinematics2d',
    difficulty: 2,
    params: { river: { min: 1, max: 3, step: 0.1 }, boat: { min: 3, max: 5, step: 0.1 } },
    prompt: (p) =>
      `A river flows due south with a speed of ${fmt(p.river)} m/s. A man steers a motorboat across the river; his velocity relative to the water is ${fmt(p.boat)} m/s due east. What is the magnitude of the velocity of man relative to the earth?`,
    compute: (p) => ({ value: crossingResultantSpeed(p.boat, p.river), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_{earth} = \\sqrt{v_{boat}^2 + v_{river}^2}' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_K2D_02', {
    sourceRef: 'P55',
    topic: 'kinematics2d',
    difficulty: 2,
    params: { river: { min: 1, max: 3, step: 0.1 }, boatRelWater: { min: 3.5, max: 5.5, step: 0.1 } },
    constraints: (p) => p.boatRelWater > p.river * 1.3,
    prompt: (p) =>
      `A river flows due south with a speed of ${fmt(p.river)} m/s. A man steers a motorboat across the river; the speed of the boat relative to the water is ${fmt(p.boatRelWater)} m/s, and he steers so that he travels due east relative to the earth. What is the magnitude of his velocity relative to the earth?`,
    compute: (p) => ({ value: straightAcrossSpeed(p.boatRelWater, p.river), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_{earth} = \\sqrt{v_{boat/water}^2 - v_{river}^2}' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_K2D_03', {
    sourceRef: 'P56',
    topic: 'kinematics2d',
    difficulty: 2,
    params: { river: { min: 1, max: 3, step: 0.1 }, boat: { min: 3, max: 5, step: 0.1 }, width: { min: 600, max: 1100, step: 10 } },
    prompt: (p) =>
      `A river flows due south with a speed of ${fmt(p.river)} m/s. A man steers a motorboat across the river; his velocity relative to the water is ${fmt(p.boat)} m/s due east. The river is ${fmt(p.width)} m wide. How much time is required to cross the river?`,
    compute: (p) => ({ value: crossingTime(p.width, p.boat), unit: 's', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 't = \\dfrac{\\text{width}}{v_{east}}' },
      { label: 'Answer', math: `t = ${fmt(answer)}\\text{ s}` },
    ],
  }),

  defineQuestion('PHY_K2D_04', {
    sourceRef: 'P57',
    topic: 'kinematics2d',
    difficulty: 2,
    params: { river: { min: 1.5, max: 3, step: 0.1 }, boatRelWater: { min: 3.5, max: 5.5, step: 0.1 }, width: { min: 700, max: 1200, step: 10 } },
    constraints: (p) => p.boatRelWater > p.river * 1.3,
    prompt: (p) =>
      `A river flows due south with a speed of ${fmt(p.river)} m/s and is ${fmt(p.width)} m wide. A man steers a motorboat so that his velocity relative to the earth is due east; the speed of the boat relative to the water is ${fmt(p.boatRelWater)} m/s. How much time is required to cross the river?`,
    compute: (p) => {
      const eastComponent = straightAcrossSpeed(p.boatRelWater, p.river)
      return { value: crossingTime(p.width, eastComponent), unit: 's', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_{east} = \\sqrt{v_{boat/water}^2 - v_{river}^2},\\quad t = \\dfrac{\\text{width}}{v_{east}}' },
      { label: 'Answer', math: `t = ${fmt(answer)}\\text{ s}` },
    ],
  }),

  defineQuestion('PHY_K2D_05', {
    sourceRef: 'P58',
    topic: 'kinematics2d',
    difficulty: 2,
    params: { river: { min: 1.5, max: 3, step: 0.1 }, boat: { min: 3, max: 5, step: 0.1 }, width: { min: 600, max: 1000, step: 10 } },
    prompt: (p) =>
      `A river flows due south with a speed of ${fmt(p.river)} m/s. A man steers a motorboat across the river; his velocity relative to the water is ${fmt(p.boat)} m/s due east. The river is ${fmt(p.width)} m wide. How far downstream from his starting point does he land?`,
    compute: (p) => {
      const t = crossingTime(p.width, p.boat)
      return { value: downstreamDrift(p.river, t), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 't = \\dfrac{\\text{width}}{v_{east}},\\quad \\text{drift} = v_{river}\\, t' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ m}` },
    ],
  }),
]
