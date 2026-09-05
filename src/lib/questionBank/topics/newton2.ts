import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import { chainLinkForce, normalForcePulledAtAngle, normalForcePushedAtAngle } from '../../physics/newton'
import { magnitude, toRad, v3 } from '../../physics/vectors'

const G = 9.8

export const newton2Questions = [
  defineQuestion('PHY_N2_01', {
    sourceRef: 'P101',
    topic: 'newton2',
    difficulty: 1,
    params: { F: { min: 3, max: 15, step: 0.5 }, angleDeg: { min: 20, max: 60, step: 1 }, m: { min: 3, max: 8, step: 0.5 } },
    prompt: (p) =>
      `A cord exerts a force F = ${fmt(p.F)} N at an angle θ = ${fmt(p.angleDeg)}° above the horizontal to a block of mass ${fmt(p.m)} kg, pulling the block along a horizontal frictionless floor. What is the magnitude of the acceleration of the block?`,
    compute: (p) => ({ value: (p.F * Math.cos(toRad(p.angleDeg))) / p.m, unit: 'm/s²', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'a = \\dfrac{F\\cos\\theta}{m}' },
      { label: 'Answer', math: `a = ${fmt(answer)}\\text{ m/s}^2` },
    ],
  }),

  defineQuestion('PHY_N2_02', {
    sourceRef: 'P102',
    topic: 'newton2',
    difficulty: 1,
    params: { F: { min: 5, max: 20, step: 0.5 }, angleDeg: { min: 15, max: 50, step: 1 }, m: { min: 3, max: 8, step: 0.5 } },
    prompt: (p) =>
      `A cord exerts a force F = ${fmt(p.F)} N at an angle θ = ${fmt(p.angleDeg)}° above the horizontal to a block of mass ${fmt(p.m)} kg, pulling the block along a horizontal frictionless floor. What is the magnitude of the normal force exerted on the mass by the floor?`,
    compute: (p) => ({ value: normalForcePulledAtAngle(p.m, G, p.F, toRad(p.angleDeg)), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'N = mg - F\\sin\\theta' },
      { label: 'Answer', math: `N = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY_N2_03', {
    sourceRef: 'P103',
    topic: 'newton2',
    difficulty: 1,
    params: { F: { min: 5, max: 18, step: 0.5 }, angleDeg: { min: 15, max: 55, step: 1 }, m: { min: 3, max: 8, step: 0.5 } },
    prompt: (p) =>
      `A rod exerts a force F = ${fmt(p.F)} N at an angle θ = ${fmt(p.angleDeg)}° below the horizontal on a block of mass ${fmt(p.m)} kg, pushing the block along a horizontal frictionless floor. What is the magnitude of the normal force exerted on the block by the floor? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: normalForcePushedAtAngle(p.m, G, p.F, toRad(p.angleDeg)), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'N = mg + F\\sin\\theta' },
      { label: 'Answer', math: `N = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY_N2_04', {
    sourceRef: 'P104',
    topic: 'newton2',
    difficulty: 2,
    params: { weightMoon: { min: 150, max: 260, step: 2 }, gMoon: { min: 1.55, max: 1.7, step: 0.005 } },
    prompt: (p) =>
      `The weight of an astronaut plus his space suit on the Moon is ${fmt(p.weightMoon)} N. The acceleration due to gravity on the surface of the Moon is ${fmt(p.gMoon)} m/s². How much does the suited astronaut weigh on Earth? The gravitational acceleration on Earth is g = ${G} m/s².`,
    compute: (p) => ({ value: (p.weightMoon / p.gMoon) * G, unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'm = \\dfrac{W_{moon}}{g_{moon}},\\quad W_{earth} = mg_{earth}' },
      { label: 'Answer', math: `W_{earth} = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY_N2_05', {
    sourceRef: 'P105',
    topic: 'newton2',
    difficulty: 1,
    params: { weightMoon: { min: 150, max: 260, step: 2 }, gMoon: { min: 1.55, max: 1.7, step: 0.005 } },
    prompt: (p) =>
      `The weight of an astronaut plus his space suit on the Moon is ${fmt(p.weightMoon)} N. The acceleration due to gravity on the surface of the Moon is ${fmt(p.gMoon)} m/s². What is the mass of the suited astronaut on the Earth, where the gravitational acceleration is g = ${G} m/s²?`,
    compute: (p) => ({ value: p.weightMoon / p.gMoon, unit: 'kg', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'm = \\dfrac{W_{moon}}{g_{moon}}\\ \\ \\text{(mass is the same everywhere)}' },
      { label: 'Answer', math: `m = ${fmt(answer)}\\text{ kg}` },
    ],
  }),

  defineQuestion('PHY_N2_06', {
    sourceRef: 'P106',
    topic: 'newton2',
    difficulty: 2,
    params: { mass: { min: 1000, max: 1800, step: 10 }, speedKmh: { min: 70, max: 110, step: 1 }, s: { min: 40, max: 90, step: 1 } },
    prompt: (p) =>
      `The driver in a car with a mass of ${fmt(p.mass)} kg applies the brakes when the car is moving at ${fmt(p.speedKmh)} km/h, and the car comes to rest after traveling ${fmt(p.s)} m. What is the magnitude of the net force on the car causing its deceleration?`,
    compute: (p) => {
      const v = (p.speedKmh * 1000) / 3600
      const a = (v * v) / (2 * p.s)
      return { value: p.mass * a, unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'a = \\dfrac{v^2}{2s},\\quad F = ma' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY_N2_07', {
    sourceRef: 'P107',
    topic: 'newton2',
    difficulty: 2,
    params: { mass: { min: 1100, max: 1800, step: 10 }, speedKmh: { min: 60, max: 95, step: 1 }, s: { min: 45, max: 90, step: 1 } },
    prompt: (p) =>
      `The driver of a car of mass ${fmt(p.mass)} kg applies the brakes when the car is moving at ${fmt(p.speedKmh)} km/h, and the car comes to rest after traveling ${fmt(p.s)} m. What is the coefficient of kinetic friction between the tires and the road? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const v = (p.speedKmh * 1000) / 3600
      const a = (v * v) / (2 * p.s)
      return { value: a / G, unit: '', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'a = \\dfrac{v^2}{2s},\\quad \\mu = a/g' },
      { label: 'Answer', math: `\\mu = ${fmt(answer)}` },
    ],
  }),

  defineQuestion('PHY_N2_08', {
    sourceRef: 'P108',
    topic: 'newton2',
    difficulty: 2,
    params: { linkMass: { min: 0.1, max: 0.7, step: 0.05 }, a: { min: 1.5, max: 2.8, step: 0.1 } },
    prompt: (p) =>
      `A force F lifts vertically a chain of five links, each of mass ${fmt(p.linkMass)} kg, numbered 1 (bottom) to 5 (top). The chain is lifted with a constant acceleration of magnitude a = ${fmt(p.a)} m/s². What is the magnitude of the force that link 3 exerts on link 2? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: chainLinkForce(2, p.linkMass, G, p.a), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F_{3\\to2} = 2m_{link}(g+a)\\ \\ \\text{(supports links 1,2)}' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ N}` },
    ],
    diagram: (p) => ({ kind: 'chainLinks', props: { linkMass: p.linkMass, a: p.a, highlightBoundary: 2 } }),
  }),

  defineQuestion('PHY_N2_09', {
    sourceRef: 'P109',
    topic: 'newton2',
    difficulty: 2,
    params: { linkMass: { min: 0.05, max: 0.3, step: 0.01 }, a: { min: 1.5, max: 2.8, step: 0.1 } },
    prompt: (p) =>
      `A force F lifts vertically a chain of five links, each of mass ${fmt(p.linkMass)} kg. The chain is lifted with a constant acceleration of magnitude a = ${fmt(p.a)} m/s². Find the magnitude of the force |F| that must be exerted on the top link to achieve this acceleration. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: chainLinkForce(5, p.linkMass, G, p.a), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = 5\\,m_{link}(g+a)' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: (p) => ({ kind: 'chainLinks', props: { linkMass: p.linkMass, a: p.a, highlightBoundary: 5 } }),
  }),

  defineQuestion('PHY_N2_10', {
    sourceRef: 'P110',
    topic: 'newton2',
    difficulty: 2,
    params: { linkMass: { min: 0.2, max: 0.7, step: 0.05 }, a: { min: 1.5, max: 2.8, step: 0.1 } },
    prompt: (p) =>
      `A force F lifts vertically a chain of five links, each of mass ${fmt(p.linkMass)} kg, numbered 1 (bottom) to 5 (top). The chain is lifted with a constant acceleration of magnitude a = ${fmt(p.a)} m/s². What is the magnitude of the force that link 4 exerts on link 3? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: chainLinkForce(3, p.linkMass, G, p.a), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F_{4\\to3} = 3m_{link}(g+a)\\ \\ \\text{(supports links 1,2,3)}' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ N}` },
    ],
    diagram: (p) => ({ kind: 'chainLinks', props: { linkMass: p.linkMass, a: p.a, highlightBoundary: 3 } }),
  }),

  defineQuestion('PHY_N2_11', {
    sourceRef: 'P111',
    topic: 'newton2',
    difficulty: 2,
    params: { linkMass: { min: 0.1, max: 0.4, step: 0.02 }, a: { min: 1.5, max: 3, step: 0.1 } },
    prompt: (p) =>
      `A force F lifts vertically a chain of five links, each of mass ${fmt(p.linkMass)} kg, numbered 1 (bottom) to 5 (top). The chain is lifted with a constant acceleration of magnitude a = ${fmt(p.a)} m/s². What is the magnitude of the force that link 5 exerts on link 4? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: chainLinkForce(4, p.linkMass, G, p.a), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F_{5\\to4} = 4m_{link}(g+a)\\ \\ \\text{(supports links 1–4)}' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ N}` },
    ],
    diagram: (p) => ({ kind: 'chainLinks', props: { linkMass: p.linkMass, a: p.a, highlightBoundary: 4 } }),
  }),

  defineQuestion('PHY_N2_12', {
    sourceRef: 'P112',
    topic: 'newton2',
    difficulty: 3,
    params: { L: { min: 6, max: 12, step: 0.5 }, m: { min: 8, max: 14, step: 0.2 }, maxT: { min: 100, max: 170, step: 2 } },
    constraints: (p) => p.maxT / p.m > G + 0.3,
    prompt: (p) =>
      `There is a banana at the top of a ${fmt(p.L)} m long rope. A monkey of mass m = ${fmt(p.m)} kg starts to climb up to reach the banana. The rope will snap if the tension exceeds ${fmt(p.maxT)} N. Calculate the least amount of time the monkey could take to reach the banana without breaking the rope. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const aMax = p.maxT / p.m - G
      return { value: Math.sqrt((2 * p.L) / aMax), unit: 's', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'a_{max} = \\dfrac{T_{max}}{m}-g,\\quad t_{min}=\\sqrt{2L/a_{max}}' },
      { label: 'Answer', math: `t_{min} = ${fmt(answer)}\\text{ s}` },
    ],
  }),

  defineQuestion('PHY_N2_13', {
    sourceRef: 'P113',
    topic: 'newton2',
    difficulty: 2,
    params: { L: { min: 7, max: 13, step: 0.5 }, m: { min: 8, max: 13, step: 0.2 }, t: { min: 2, max: 3.5, step: 0.1 } },
    prompt: (p) =>
      `There is a banana at the top of a ${fmt(p.L)} m long rope. A monkey of mass m = ${fmt(p.m)} kg starts from rest at the bottom and climbs to the banana in ${fmt(p.t)} s with constant acceleration. What is the tension in the rope? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const a = (2 * p.L) / (p.t * p.t)
      return { value: p.m * (G + a), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'a = \\dfrac{2L}{t^2},\\quad T = m(g+a)' },
      { label: 'Answer', math: `T = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY_N2_14', {
    sourceRef: 'P114',
    topic: 'newton2',
    difficulty: 1,
    params: { m: { min: 1, max: 4, step: 0.5 }, F: { min: 8, max: 22, step: 1 }, t: { min: 2, max: 5, step: 0.5 } },
    prompt: (p) =>
      `A particle of mass ${fmt(p.m)} kg is acted on by a single force F = ${fmt(p.F)}î N. If the particle starts at rest, how far does it travel in the first ${fmt(p.t)} s?`,
    compute: (p) => {
      const a = p.F / p.m
      return { value: 0.5 * a * p.t * p.t, unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'a = F/m,\\quad s = \\tfrac12 a t^2' },
      { label: 'Answer', math: `s = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_N2_15', {
    sourceRef: 'P115',
    topic: 'newton2',
    difficulty: 2,
    params: { m: { min: 1, max: 4, step: 0.5 }, F: { min: 8, max: 22, step: 1 }, v0: { min: -9, max: -3, step: 0.5 }, t: { min: 3, max: 7, step: 0.5 } },
    prompt: (p) =>
      `A particle of mass ${fmt(p.m)} kg is acted on by a single force F = ${fmt(p.F)}î N. At t = 0 the particle has velocity v₀ = ${fmt(p.v0)}î m/s. What is the magnitude of its displacement during the first ${fmt(p.t)} s?`,
    compute: (p) => {
      const a = p.F / p.m
      return { value: Math.abs(p.v0 * p.t + 0.5 * a * p.t * p.t), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'a = F/m,\\quad s = v_0 t + \\tfrac12 a t^2' },
      { label: 'Answer', math: `|s| = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_N2_16', {
    sourceRef: 'P116',
    topic: 'newton2',
    difficulty: 3,
    params: { F1: { min: 550, max: 750, step: 5 }, boxMass: { min: 5, max: 12, step: 0.2 }, gainN: { min: 60, max: 120, step: 2 } },
    prompt: (p) =>
      `An elevator accelerating upward carries a man standing on a weighing scale indicating F₁ = ${fmt(p.F1)} N. The scale reads F₂ = ${fmt(p.F1 + p.gainN)} N when the man picks up a ${fmt(p.boxMass)} kg box. Find the man's mass.`,
    compute: (p) => {
      const gPlusA = p.gainN / p.boxMass
      return { value: p.F1 / gPlusA, unit: 'kg', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'F_2-F_1 = m_{box}(g+a),\\quad m_{man} = \\dfrac{F_1}{g+a}' },
      { label: 'Answer', math: `m_{man} = ${fmt(answer)}\\text{ kg}` },
    ],
  }),

  defineQuestion('PHY_N2_17', {
    sourceRef: 'P117',
    topic: 'newton2',
    difficulty: 2,
    params: { m: { min: 55, max: 90, step: 0.5 }, scaleReading: { min: 700, max: 1050, step: 5 } },
    constraints: (p) => p.scaleReading / p.m > G,
    prompt: (p) =>
      `A man of mass ${fmt(p.m)} kg stands on a weighing scale in an elevator that is accelerating upward. The scale reads ${fmt(p.scaleReading)} N. Find the magnitude of the acceleration of the elevator. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: p.scaleReading / p.m - G, unit: 'm/s²', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'a = \\dfrac{F}{m} - g' },
      { label: 'Answer', math: `a = ${fmt(answer)}\\text{ m/s}^2` },
    ],
  }),

  defineQuestion('PHY_N2_18', {
    sourceRef: 'P118',
    topic: 'newton2',
    difficulty: 2,
    params: {
      f1x: { min: 3, max: 9, step: 1 }, f1y: { min: 4, max: 9, step: 1 }, f1z: { min: -12, max: -6, step: 1 },
      f2x: { min: -12, max: -6, step: 1 }, f2y: { min: -12, max: -6, step: 1 }, f2z: { min: -6, max: -1, step: 1 },
    },
    prompt: (p) =>
      `A particle moves with constant velocity under the combined action of three forces. Two of the forces acting on this particle are F₁ = ${fmt(p.f1x)}i + ${fmt(p.f1y)}j + ${fmt(p.f1z)}k N and F₂ = ${fmt(p.f2x)}i + ${fmt(p.f2y)}j + ${fmt(p.f2z)}k N. What is the third force's magnitude?`,
    compute: (p) => {
      const sum = v3(p.f1x + p.f2x, p.f1y + p.f2y, p.f1z + p.f2z)
      const f3 = v3(-sum.x, -sum.y, -sum.z)
      return { value: magnitude(f3), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (_p, answer) => [
      { label: 'Formula', math: '\\vec F_1+\\vec F_2+\\vec F_3=0 \\Rightarrow \\vec F_3=-(\\vec F_1+\\vec F_2)' },
      { label: 'Answer', math: `|\\vec F_3| = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY_N2_19', {
    sourceRef: 'P119',
    topic: 'newton2',
    difficulty: 1,
    params: { mA: { min: 45, max: 65, step: 0.5 }, mB: { min: 55, max: 75, step: 0.5 }, F: { min: 40, max: 70, step: 1 } },
    prompt: (p) =>
      `Friction is negligible for ice skating. Find the magnitude of the acceleration of ice dancer A of mass ${fmt(p.mA)} kg pushing his partner B of mass ${fmt(p.mB)} kg with a force of ${fmt(p.F)} N.`,
    compute: (p) => ({ value: p.F / p.mA, unit: 'm/s²', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'a_A = F/m_A\\ \\ \\text{(Newton\'s 3rd law reaction on A)}' },
      { label: 'Answer', math: `a_A = ${fmt(answer)}\\text{ m/s}^2` },
    ],
  }),

  defineQuestion('PHY_N2_20', {
    sourceRef: 'P120',
    topic: 'newton2',
    difficulty: 1,
    params: { mA: { min: 45, max: 65, step: 0.5 }, mB: { min: 55, max: 75, step: 0.5 }, F: { min: 40, max: 70, step: 1 } },
    prompt: (p) =>
      `Friction is negligible for ice skating. Find the magnitude of the acceleration of ice dancer B of mass ${fmt(p.mB)} kg while her partner A of mass ${fmt(p.mA)} kg pushes her with a force of ${fmt(p.F)} N.`,
    compute: (p) => ({ value: p.F / p.mB, unit: 'm/s²', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'a_B = F/m_B' },
      { label: 'Answer', math: `a_B = ${fmt(answer)}\\text{ m/s}^2` },
    ],
  }),
]
