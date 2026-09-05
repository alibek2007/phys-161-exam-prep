import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import {
  angleBetween,
  crossMagFromAngle,
  diffMagnitude,
  dotFromAngle,
  magnitude,
  scalarProjection,
  sumMagnitude,
  toRad,
  v3,
  cross,
} from '../../physics/vectors'

export const vectorsQuestions = [
  defineQuestion('PHY_V01', {
    sourceRef: 'P15',
    topic: 'vectors',
    difficulty: 1,
    params: { A: { min: 4, max: 14, step: 1 }, B: { min: 4, max: 14, step: 1 }, angleDeg: { min: 20, max: 160, step: 5 } },
    prompt: (p) =>
      `Vector A is ${fmt(p.A)} m long and vector B is ${fmt(p.B)} m long, separated by an angle of ${fmt(p.angleDeg)}° as shown. Find the magnitude of the vector sum A + B.`,
    compute: (p) => ({ value: sumMagnitude(p.A, p.B, toRad(p.angleDeg)), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', math: `A = ${fmt(p.A)}\\text{ m},\\ B = ${fmt(p.B)}\\text{ m},\\ \\theta = ${fmt(p.angleDeg)}°` },
      { label: 'Formula', math: '|\\vec A + \\vec B| = \\sqrt{A^2 + B^2 + 2AB\\cos\\theta}' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ m}` },
    ],
    diagram: (p) => ({ kind: 'vectorPair', props: { magA: p.A, magB: p.B, angleDeg: p.angleDeg, mode: 'sum' } }),
  }),

  defineQuestion('PHY_V02', {
    sourceRef: 'P16',
    topic: 'vectors',
    difficulty: 1,
    params: { A: { min: 4, max: 14, step: 1 }, B: { min: 4, max: 14, step: 1 }, angleDeg: { min: 20, max: 160, step: 5 } },
    prompt: (p) =>
      `Vector A is ${fmt(p.A)} m long and vector B is ${fmt(p.B)} m long, separated by an angle of ${fmt(p.angleDeg)}° as shown. Find the magnitude of the vector difference A - B.`,
    compute: (p) => ({ value: diffMagnitude(p.A, p.B, toRad(p.angleDeg)), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', math: `A = ${fmt(p.A)}\\text{ m},\\ B = ${fmt(p.B)}\\text{ m},\\ \\theta = ${fmt(p.angleDeg)}°` },
      { label: 'Formula', math: '|\\vec A - \\vec B| = \\sqrt{A^2 + B^2 - 2AB\\cos\\theta}' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ m}` },
    ],
    diagram: (p) => ({ kind: 'vectorPair', props: { magA: p.A, magB: p.B, angleDeg: p.angleDeg, mode: 'diff' } }),
  }),

  defineQuestion('PHY_V03', {
    sourceRef: 'P17',
    topic: 'vectors',
    difficulty: 1,
    params: { B: { min: 4, max: 12, step: 1 }, angleDeg: { min: 10, max: 80, step: 5 } },
    prompt: (p) =>
      `Vector B is ${fmt(p.B)} m long and makes an angle of ${fmt(p.angleDeg)}° with the +x-axis, as shown. Find the x-component of the vector B = xi + yj.`,
    compute: (p) => ({ value: p.B * Math.cos(toRad(p.angleDeg)), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', math: `B = ${fmt(p.B)}\\text{ m},\\ \\theta = ${fmt(p.angleDeg)}°` },
      { label: 'Formula', math: 'B_x = B\\cos\\theta' },
      { label: 'Answer', math: `B_x = ${fmt(answer)}\\text{ m}` },
    ],
    diagram: (p) => ({ kind: 'vectorPair', props: { magA: p.B, magB: 0, angleDeg: p.angleDeg, mode: 'components' } }),
  }),

  defineQuestion('PHY_V04', {
    sourceRef: 'P18',
    topic: 'vectors',
    difficulty: 1,
    params: { x: { min: 1, max: 6, step: 1 }, y: { min: 1, max: 6, step: 1 }, z: { min: 1, max: 6, step: 1 } },
    prompt: (p) => `Given vector B = ${fmt(p.x)}i + ${fmt(p.y)}j + ${fmt(p.z)}k, find its magnitude.`,
    compute: (p) => ({ value: magnitude(v3(p.x, p.y, p.z)), unit: '', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '|\\vec B| = \\sqrt{B_x^2 + B_y^2 + B_z^2}' },
      { label: 'Answer', math: `${fmt(answer)}` },
    ],
  }),

  defineQuestion('PHY_V05', {
    sourceRef: 'P19',
    topic: 'vectors',
    difficulty: 2,
    params: {
      dx: { min: 3, max: 10, step: 1 }, dy: { min: 3, max: 10, step: 1 }, dz: { min: -10, max: -3, step: 1 },
      ex: { min: 2, max: 8, step: 1 }, ey: { min: -6, max: -2, step: 1 }, ez: { min: 3, max: 9, step: 1 },
    },
    prompt: (p) =>
      `Given the two displacements D = (${fmt(p.dx)}i + ${fmt(p.dy)}j + ${fmt(p.dz)}k) m and E = (${fmt(p.ex)}i + ${fmt(p.ey)}j + ${fmt(p.ez)}k) m, find the magnitude of the displacement 2D - E.`,
    compute: (p) => {
      const D = v3(p.dx, p.dy, p.dz)
      const E = v3(p.ex, p.ey, p.ez)
      const result = v3(2 * D.x - E.x, 2 * D.y - E.y, 2 * D.z - E.z)
      return { value: magnitude(result), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (_p, answer) => [
      { label: 'Formula', math: '2\\vec D - \\vec E,\\quad |\\cdot| = \\sqrt{x^2+y^2+z^2}' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_V06', {
    sourceRef: 'P20',
    topic: 'vectors',
    difficulty: 2,
    params: {
      dx: { min: 3, max: 8, step: 1 }, dy: { min: 3, max: 9, step: 1 }, dz: { min: -9, max: -3, step: 1 },
      ex: { min: 3, max: 8, step: 1 }, ey: { min: 2, max: 6, step: 1 }, ez: { min: -8, max: -3, step: 1 },
    },
    prompt: (p) =>
      `Given the two displacements D = (${fmt(p.dx)}i + ${fmt(p.dy)}j + ${fmt(p.dz)}k) m and E = (${fmt(p.ex)}i + ${fmt(p.ey)}j + ${fmt(p.ez)}k) m, find the magnitude of the component of D along the direction of E.`,
    compute: (p) => {
      const D = v3(p.dx, p.dy, p.dz)
      const E = v3(p.ex, p.ey, p.ez)
      return { value: Math.abs(scalarProjection(D, E)), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (_p, answer) => [
      { label: 'Formula', math: '\\text{comp}_{\\vec E}\\vec D = \\dfrac{\\vec D \\cdot \\vec E}{|\\vec E|}' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_V07', {
    sourceRef: 'P21',
    topic: 'vectors',
    difficulty: 1,
    params: { A: { min: 4, max: 14, step: 1 }, B: { min: 4, max: 14, step: 1 }, angleDeg: { min: 20, max: 160, step: 5 } },
    prompt: (p) =>
      `Find the scalar product A · B of the two vectors shown, separated by an angle of ${fmt(p.angleDeg)}°. The magnitudes of the vectors are A = ${fmt(p.A)} and B = ${fmt(p.B)}.`,
    compute: (p) => ({ value: dotFromAngle(p.A, p.B, toRad(p.angleDeg)), unit: '', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\vec A \\cdot \\vec B = AB\\cos\\theta' },
      { label: 'Substitution', math: `${fmt(p.A)} \\times ${fmt(p.B)} \\times \\cos(${fmt(p.angleDeg)}°)` },
      { label: 'Answer', math: `${fmt(answer)}` },
    ],
    diagram: (p) => ({ kind: 'vectorPair', props: { magA: p.A, magB: p.B, angleDeg: p.angleDeg, mode: 'dot' } }),
  }),

  defineQuestion('PHY_V08', {
    sourceRef: 'P22',
    topic: 'vectors',
    difficulty: 1,
    params: { A: { min: 4, max: 14, step: 0.5 }, B: { min: 4, max: 14, step: 0.5 }, angleDeg: { min: 20, max: 160, step: 5 } },
    prompt: (p) =>
      `Find the magnitude of the vector product A × B of the two vectors shown, separated by an angle of ${fmt(p.angleDeg)}°. The magnitudes of the vectors are A = ${fmt(p.A)} and B = ${fmt(p.B)}.`,
    compute: (p) => ({ value: crossMagFromAngle(p.A, p.B, toRad(p.angleDeg)), unit: '', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '|\\vec A \\times \\vec B| = AB\\sin\\theta' },
      { label: 'Answer', math: `${fmt(answer)}` },
    ],
    diagram: (p) => ({ kind: 'vectorPair', props: { magA: p.A, magB: p.B, angleDeg: p.angleDeg, mode: 'cross' } }),
  }),

  defineQuestion('PHY_V09', {
    sourceRef: 'P23',
    topic: 'vectors',
    difficulty: 2,
    params: {
      ax: { min: 2, max: 7, step: 1 }, ay: { min: 2, max: 7, step: 1 }, az: { min: 1, max: 6, step: 1 },
      bx: { min: -6, max: -1, step: 1 }, by: { min: 1, max: 5, step: 1 }, bz: { min: -6, max: -1, step: 1 },
    },
    prompt: (p) =>
      `Find the angle (in radians) between the two vectors A = (${fmt(p.ax)}i + ${fmt(p.ay)}j + ${fmt(p.az)}k) and B = (${fmt(p.bx)}i + ${fmt(p.by)}j + ${fmt(p.bz)}k).`,
    compute: (p) => ({
      value: angleBetween(v3(p.ax, p.ay, p.az), v3(p.bx, p.by, p.bz)),
      unit: 'rad',
      tolerance: { mode: 'relative', value: 0.01 },
    }),
    solution: (_p, answer) => [
      { label: 'Formula', math: '\\theta = \\cos^{-1}\\left(\\dfrac{\\vec A \\cdot \\vec B}{|\\vec A||\\vec B|}\\right)' },
      { label: 'Answer', math: `\\theta = ${fmt(answer)}\\text{ rad}` },
    ],
  }),

  defineQuestion('PHY_V10', {
    sourceRef: 'P24',
    topic: 'vectors',
    difficulty: 2,
    params: {
      ax: { min: 2, max: 7, step: 1 }, ay: { min: 1, max: 5, step: 1 }, az: { min: 1, max: 6, step: 1 },
      bx: { min: -6, max: -2, step: 1 }, by: { min: 2, max: 6, step: 1 }, bz: { min: -6, max: -1, step: 1 },
    },
    prompt: (p) =>
      `Given the two vectors A = (${fmt(p.ax)}i + ${fmt(p.ay)}j + ${fmt(p.az)}k) and B = (${fmt(p.bx)}i + ${fmt(p.by)}j + ${fmt(p.bz)}k), find the magnitude of their vector product A × B.`,
    compute: (p) => ({
      value: magnitude(cross(v3(p.ax, p.ay, p.az), v3(p.bx, p.by, p.bz))),
      unit: '',
      tolerance: { mode: 'relative', value: 0.01 },
    }),
    solution: (_p, answer) => [
      { label: 'Formula', math: '\\vec A \\times \\vec B,\\quad |\\vec A \\times \\vec B| = \\sqrt{x^2+y^2+z^2}' },
      { label: 'Answer', math: `${fmt(answer)}` },
    ],
  }),

  defineQuestion('PHY_V11', {
    sourceRef: 'P25',
    topic: 'vectors',
    difficulty: 1,
    params: { A: { min: 2, max: 6, step: 0.5 }, B: { min: 8, max: 20, step: 1 }, angleDeg: { min: 20, max: 80, step: 1 } },
    prompt: (p) =>
      `Vector A has a magnitude of ${fmt(p.A)} units and is in the direction of the +x-axis. Vector B has magnitude of ${fmt(p.B)} units and lies in the xy-plane, making an angle of ${fmt(p.angleDeg)}° with the +x-axis. Find the magnitude of the vector product A × B.`,
    compute: (p) => ({ value: crossMagFromAngle(p.A, p.B, toRad(p.angleDeg)), unit: '', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '|\\vec A \\times \\vec B| = AB\\sin\\theta' },
      { label: 'Substitution', math: `${fmt(p.A)} \\times ${fmt(p.B)} \\times \\sin(${fmt(p.angleDeg)}°)` },
      { label: 'Answer', math: `${fmt(answer)}` },
    ],
    diagram: (p) => ({ kind: 'vectorPair', props: { magA: p.A, magB: p.B, angleDeg: p.angleDeg, mode: 'cross' } }),
  }),

  defineQuestion('PHY_V12', {
    sourceRef: 'P26',
    topic: 'vectors',
    difficulty: 1,
    params: { A: { min: 3, max: 10, step: 0.5 }, B: { min: 10, max: 25, step: 0.5 }, angleDeg: { min: 20, max: 80, step: 1 } },
    prompt: (p) =>
      `Vector A has a magnitude of ${fmt(p.A)} units and is in the direction of the +x-axis. Vector B has magnitude of ${fmt(p.B)} units and lies in the xy-plane, making an angle of ${fmt(p.angleDeg)}° with the +x-axis. Find the magnitude of the scalar product A · B.`,
    compute: (p) => ({ value: Math.abs(dotFromAngle(p.A, p.B, toRad(p.angleDeg))), unit: '', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\vec A \\cdot \\vec B = AB\\cos\\theta' },
      { label: 'Answer', math: `${fmt(answer)}` },
    ],
    diagram: (p) => ({ kind: 'vectorPair', props: { magA: p.A, magB: p.B, angleDeg: p.angleDeg, mode: 'dot' } }),
  }),

  defineQuestion('PHY_V13', {
    sourceRef: 'P27',
    topic: 'vectors',
    difficulty: 3,
    params: {
      A: { min: 4, max: 10, step: 1 }, B: { min: 12, max: 22, step: 1 },
      cx: { min: 4, max: 12, step: 1 }, cy: { min: 4, max: 12, step: 1 },
    },
    prompt: (p) =>
      `Two vectors A and B have magnitude A = ${fmt(p.A)} and B = ${fmt(p.B)}. Their vector product is A × B = ${fmt(p.cx)}i + ${fmt(p.cy)}j. What is the angle (in radians) between A and B?`,
    compute: (p) => {
      const crossMag = magnitude(v3(p.cx, p.cy, 0))
      const s = crossMag / (p.A * p.B)
      return { value: Math.asin(Math.min(s, 1)), unit: 'rad', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '\\theta = \\sin^{-1}\\left(\\dfrac{|\\vec A \\times \\vec B|}{AB}\\right)' },
      { label: 'Substitution', math: `|\\vec A \\times \\vec B| = \\sqrt{${fmt(p.cx)}^2 + ${fmt(p.cy)}^2}` },
      { label: 'Answer', math: `\\theta = ${fmt(answer)}\\text{ rad}` },
    ],
  }),

  defineQuestion('PHY_V14', {
    sourceRef: 'P28',
    topic: 'vectors',
    difficulty: 3,
    params: {
      A: { min: 4, max: 10, step: 0.5 }, B: { min: 12, max: 22, step: 0.5 },
      cx: { min: 4, max: 12, step: 1 }, cy: { min: 4, max: 16, step: 1 },
    },
    prompt: (p) =>
      `Two vectors A and B have magnitudes A = ${fmt(p.A)} and B = ${fmt(p.B)}. Their vector product is A × B = ${fmt(p.cx)}i + ${fmt(p.cy)}j. What is the magnitude of their scalar product A · B?`,
    compute: (p) => {
      const crossMag = magnitude(v3(p.cx, p.cy, 0))
      const sinTheta = Math.min(crossMag / (p.A * p.B), 1)
      const cosTheta = Math.sqrt(1 - sinTheta * sinTheta)
      return { value: p.A * p.B * cosTheta, unit: '', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '\\sin\\theta = \\dfrac{|\\vec A \\times \\vec B|}{AB},\\quad |\\vec A \\cdot \\vec B| = AB\\cos\\theta' },
      { label: 'Answer', math: `${fmt(answer)}` },
    ],
  }),
]
