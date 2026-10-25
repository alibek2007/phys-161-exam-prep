import { defineQuestion } from '../defineQuestion'
import { fmt, sciText } from '../../format'
import * as osc from '../../physics/oscillations'
import { ans, exerciseImage, GRAVITY, numeric, steps, UNIT } from './helpers'

const G = GRAVITY

export const oscillationQuestions = [
  // ---------- Pendulums ----------
  defineQuestion('PHY3_PD01', {
    sourceRef: 'P37',
    topic: 'pendulum',
    difficulty: 1,
    params: { Lcm: { min: 30, max: 80, step: 1 }, swings: { min: 20, max: 40, step: 1 }, t: { min: 40, max: 70, step: 1 } },
    constraints: (p) => {
      const g = osc.pendulumG(p.Lcm / 100, p.t / p.swings)
      return g > 3 && g < 15
    },
    source: { params: { Lcm: 54, swings: 30, t: 54 }, answer: 6.5797 },
    prompt: (p) =>
      `A ${fmt(p.Lcm)} cm simple pendulum makes ${fmt(p.swings)} complete swings in ${fmt(p.t)} seconds on an unknown planet. What is the gravitational acceleration of the planet?`,
    compute: (p) => numeric(osc.pendulumG(p.Lcm / 100, p.t / p.swings), 'm/s^2'),
    solution: (p, a) => steps('T=\\dfrac{t}{N},\\quad g=\\dfrac{4\\pi^2L}{T^2}', ans('g', a, UNIT.ms2)),
  }),

  defineQuestion('PHY3_PD02', {
    sourceRef: 'P38',
    topic: 'pendulum',
    difficulty: 1,
    params: { swings: { min: 20, max: 35, step: 1 }, t: { min: 40, max: 70, step: 0.5 }, g: { min: 8, max: 12, step: 0.1 } },
    source: { params: { swings: 28, t: 58.5, g: 11.3 }, answer: 1.24944 },
    prompt: (p) =>
      `A simple pendulum makes ${fmt(p.swings)} complete swings in ${fmt(p.t)} seconds at a place where the gravitational acceleration is ${fmt(p.g)} m/s². What is the length of the pendulum?`,
    compute: (p) => numeric(osc.pendulumLength(p.g, p.t / p.swings), 'm'),
    solution: (p, a) => steps('T=\\dfrac{t}{N},\\quad L=\\dfrac{gT^2}{4\\pi^2}', ans('L', a, UNIT.m)),
  }),

  defineQuestion('PHY3_PD03', {
    sourceRef: 'P56',
    topic: 'pendulum',
    difficulty: 1,
    params: { Lcm: { min: 30, max: 80, step: 1 }, g: { min: 8, max: 12, step: 0.01 } },
    source: { params: { Lcm: 53, g: 9.47 }, answer: 0.673 },
    prompt: (p) => `Find the frequency of a simple pendulum ${fmt(p.Lcm)} cm long at a location where g = ${fmt(p.g)} m/s².`,
    compute: (p) => numeric(osc.pendulumFrequency(p.Lcm / 100, p.g), 'Hz'),
    solution: (p, a) => steps('f=\\dfrac1{2\\pi}\\sqrt{\\dfrac{g}{L}}', ans('f', a, UNIT.Hz)),
  }),

  defineQuestion('PHY3_PD04', {
    sourceRef: 'P61',
    topic: 'pendulum',
    difficulty: 3,
    params: { m: { min: 0.5, max: 2, step: 0.05 }, Lcm: { min: 100, max: 200, step: 1 }, t: { min: 1.2, max: 2, step: 0.05 }, angle: { min: 8, max: 20, step: 0.5 }, Rkm: { min: 5000, max: 9000, step: 100 } },
    constraints: (p) => {
      const g = osc.pendulumG(p.Lcm / 100, 2 * p.t)
      return g > 3 && g < 15
    },
    source: { params: { m: 1.05, Lcm: 145, t: 1.55, angle: 12.5, Rkm: 8600 }, answer: 6.605e24 },
    prompt: (p) =>
      `On an unknown planet, a simple pendulum having a bob with mass ${fmt(p.m)} kg and a length of ${fmt(p.Lcm)} cm takes ${fmt(p.t)} s, when released from rest, to swing through an angle of ${fmt(p.angle)}°, where it again has zero speed. The radius of the planet is measured to be ${fmt(p.Rkm)} km. What is the mass of the planet? Gravitational constant is G=6.67×10⁻¹¹ m³/(kg⋅s²).`,
    compute: (p) => {
      const g = osc.pendulumG(p.Lcm / 100, 2 * p.t)
      return numeric((g * (p.Rkm * 1000) ** 2) / 6.67e-11, 'kg')
    },
    solution: (p, a) =>
      steps('T = 2t,\\ \\ g=\\dfrac{4\\pi^2L}{T^2},\\ \\ M=\\dfrac{gR^2}{G}', ans('M', a, UNIT.kg), 'From release at rest on one side (zero speed) to zero speed on the other side is half a period, so T = 2t. The bob\'s mass and the angle do not matter.'),
  }),

  defineQuestion('PHY3_PD05', {
    sourceRef: 'P62',
    topic: 'pendulum',
    difficulty: 2,
    params: { a: { min: 2, max: 8, step: 0.1 }, m: { min: 1, max: 3, step: 0.1 }, L: { min: 0.8, max: 1.6, step: 0.1 } },
    source: { params: { a: 4.6, m: 1.8, L: 1.2 }, answer: 1.8138 },
    prompt: (p) =>
      `A rocket is accelerating upward at ${fmt(p.a)} m/s² from the launchpad on the earth. Inside a small ${fmt(p.m)} kg ball hangs from the ceiling by a light ${fmt(p.L)} m wire. If the ball is displaced from the vertical and released, find the period of the resulting swings of this pendulum. The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => numeric(osc.pendulumPeriod(p.L, G + p.a), 's'),
    solution: (p, a) =>
      steps('g_{eff}=g+a,\\quad T=2\\pi\\sqrt{\\dfrac{L}{g+a}}', ans('T', a, UNIT.s), 'In the accelerating rocket the effective gravity is g + a.'),
  }),

  // ---------- Simple harmonic motion ----------
  defineQuestion('PHY3_SH01', {
    sourceRef: 'P39',
    topic: 'shm',
    difficulty: 1,
    params: { F: { min: 4, max: 10, step: 0.5 }, x: { min: 0.03, max: 0.08, step: 0.01 }, m: { min: 0.4, max: 1, step: 0.1 }, x0: { min: 0.005, max: 0.02, step: 0.005 } },
    source: { params: { F: 6, x: 0.05, m: 0.6, x0: 0.01 }, answer: 0.444 },
    prompt: (p) =>
      `A spring is mounted horizontally, with its left end fixed. A spring balance attached to the free end and pulled toward the right indicates that the stretching force is proportional to the displacement, and a force of ${fmt(p.F)} N causes a displacement of ${fmt(p.x)} m. We replace the spring balance with a ${fmt(p.m)} kg block, pull it ${fmt(p.x0)} m to the right along a frictionless surface, and release it from rest. Find the period of the resulting oscillation.`,
    compute: (p) => numeric(osc.springPeriod(p.m, p.F / p.x), 's'),
    solution: (p, a) =>
      steps('k=\\dfrac{F}{x},\\quad T=2\\pi\\sqrt{\\dfrac{m}{k}}', ans('T', a, UNIT.s), 'The period does not depend on the starting displacement.'),
    diagram: () => exerciseImage('p39-40'),
  }),

  defineQuestion('PHY3_SH02', {
    sourceRef: 'P40',
    topic: 'shm',
    difficulty: 1,
    params: { m: { min: 0.2, max: 0.6, step: 0.1 }, x: { min: 0.01, max: 0.04, step: 0.01 }, k: { min: 100, max: 200, step: 1 } },
    source: { params: { m: 0.3, x: 0.02, k: 152 }, answer: 0.4502 },
    prompt: (p) =>
      `A spring is mounted horizontally, with its left end fixed. A block of mass m = ${fmt(p.m)} kg is attached to the free end, pulled toward the right and released from rest at x = ${fmt(p.x)} m. Force constant of the spring is k = ${fmt(p.k)} N/m. Find the maximum velocity attained by the oscillating block.`,
    compute: (p) => numeric(p.x * Math.sqrt(p.k / p.m), 'm/s'),
    solution: (p, a) => steps('v_{max}=A\\omega=A\\sqrt{\\dfrac{k}{m}}', ans('v_{max}', a, UNIT.ms)),
    diagram: () => exerciseImage('p39-40'),
  }),

  defineQuestion('PHY3_SH03', {
    sourceRef: 'P44',
    topic: 'shm',
    difficulty: 1,
    params: { A: { min: 5, max: 10, step: 0.1 }, w: { min: 0.8, max: 2, step: 0.001 }, phi: { min: 0.1, max: 1, step: 0.001 } },
    source: { params: { A: 8.2, w: 1.127, phi: 0.288 }, answer: 5.575 },
    prompt: (p) =>
      `A body oscillates in a simple harmonic motion with its position described by the following formula: x=A cos(ωt+φ), where A=${fmt(p.A)}, ω=${fmt(p.w)}, and φ=${fmt(p.phi)}. Assume all quantities are given in SI units. Calculate the period of oscillations.`,
    compute: (p) => numeric((2 * Math.PI) / p.w, 's'),
    solution: (p, a) => steps('T=\\dfrac{2\\pi}{\\omega}', ans('T', a, UNIT.s)),
  }),

  defineQuestion('PHY3_SH04', {
    sourceRef: 'P45',
    topic: 'shm',
    difficulty: 2,
    params: { A: { min: 5, max: 10, step: 0.1 }, w: { min: 1, max: 2, step: 0.001 }, phi: { min: 0.1, max: 1, step: 0.001 }, mg: { min: 500, max: 1000, step: 10 } },
    source: { params: { A: 8.1, w: 1.379, phi: 0.337, mg: 790 }, answer: 49.28 },
    prompt: (p) =>
      `A body oscillates in a simple harmonic motion with its position described by the following formula: x=A cos(ωt+φ), where A=${fmt(p.A)}, ω=${fmt(p.w)}, and φ=${fmt(p.phi)}. Assume all quantities are given in SI units. Assuming the oscillations are governed by Hooke's law and the body's mass is ${fmt(p.mg)} g, calculate the total energy of the oscillator.`,
    compute: (p) => numeric(0.5 * (p.mg / 1000) * p.w * p.w * p.A * p.A, 'J'),
    solution: (p, a) => steps('E=\\tfrac12kA^2=\\tfrac12m\\omega^2A^2', ans('E', a, UNIT.J), 'For Hooke\'s law, k = mω².'),
  }),

  defineQuestion('PHY3_SH05', {
    sourceRef: 'P52',
    topic: 'shm',
    difficulty: 2,
    params: { Amm: { min: 0.3, max: 0.8, step: 0.01 }, v: { min: 1, max: 2, step: 0.001 } },
    source: { params: { Amm: 0.57, v: 1.538 }, answer: 429.439 },
    prompt: (p) =>
      `The tip of one half of a tuning fork vibrates approximately as if it were in a simple harmonic motion with amplitude of ${fmt(p.Amm)} mm. If the tip passes its equilibrium position with a speed of ${fmt(p.v)} m/s, what is the frequency of vibration?`,
    compute: (p) => numeric(p.v / (2 * Math.PI * (p.Amm / 1000)), 'Hz'),
    solution: (p, a) => steps('v_{max}=A\\omega=2\\pi fA \\Rightarrow f=\\dfrac{v_{max}}{2\\pi A}', ans('f', a, UNIT.Hz)),
  }),

  defineQuestion('PHY3_SH06', {
    sourceRef: 'P53',
    topic: 'shm',
    difficulty: 2,
    params: { Amm: { min: 0.4, max: 0.9, step: 0.01 }, v: { min: 1, max: 2, step: 0.01 } },
    source: { params: { Amm: 0.71, v: 1.45 }, answer: 2961.27 },
    prompt: (p) =>
      `The tip of one half of a tuning fork vibrates approximately in simple harmonic motion with an amplitude of ${fmt(p.Amm)} mm. The tip passes its equilibrium position with a speed of ${fmt(p.v)} m/s. What is the magnitude of its maximum acceleration?`,
    compute: (p) => numeric((p.v * p.v) / (p.Amm / 1000), 'm/s^2'),
    solution: (p, a) => steps('a_{max}=\\omega^2A=\\dfrac{v_{max}^2}{A}', ans('a_{max}', a, UNIT.ms2)),
  }),

  defineQuestion('PHY3_SH07', {
    sourceRef: 'P54',
    topic: 'shm',
    difficulty: 3,
    params: { k: { min: 100, max: 200, step: 5 }, M1: { min: 0.5, max: 1.5, step: 0.1 }, M2: { min: 6, max: 9, step: 0.1 }, mu: { min: 0.5, max: 0.95, step: 0.05 } },
    source: { params: { k: 140, M1: 0.7, M2: 7.9, mu: 0.9 }, answer: 0.5418 },
    prompt: (p) =>
      `A spring with spring constant k=${fmt(p.k)} N/m is connected to a pair of blocks with masses M1=${fmt(p.M1)} kg and M2=${fmt(p.M2)} kg on a horizontal, frictionless surface, as shown in the Figure. The coefficient of static friction between the two blocks is ${fmt(p.mu)}. What is the maximum possible amplitude of the simple harmonic motion if no slippage is to occur between the blocks? The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => numeric((p.mu * G * (p.M1 + p.M2)) / p.k, 'm'),
    solution: (p, a) =>
      steps('\\mu g=\\omega^2A_{max},\\ \\ \\omega^2=\\dfrac{k}{M_1+M_2} \\Rightarrow A_{max}=\\dfrac{\\mu g(M_1+M_2)}{k}', ans('A_{max}', a, UNIT.m), 'The small block is carried by static friction, which can supply at most μM₁g, i.e. a maximum acceleration of μg.'),
    diagram: () => exerciseImage('p54'),
  }),

  defineQuestion('PHY3_SH08', {
    sourceRef: 'P55',
    topic: 'shm',
    difficulty: 2,
    params: { Acm: { min: 8, max: 15, step: 0.1 } },
    source: { params: { Acm: 11.4 }, answer: 1.4756 },
    prompt: (p) =>
      `Vibrational platform oscillates up and down at a controlled variable frequency with amplitude ${fmt(p.Acm)} cm. Suppose a small rock of unknown mass is placed on the platform. At what frequency will the rock just begin to leave the surface so that it starts to clatter? The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => numeric(Math.sqrt(G / (p.Acm / 100)) / (2 * Math.PI), 'Hz'),
    solution: (p, a) =>
      steps('\\omega^2A=g \\Rightarrow f=\\dfrac1{2\\pi}\\sqrt{\\dfrac{g}{A}}', ans('f', a, UNIT.Hz), 'The rock leaves the platform when the platform\'s downward acceleration at the top of the motion reaches g.'),
  }),

  defineQuestion('PHY3_SH09', {
    sourceRef: 'P57',
    topic: 'shm',
    difficulty: 2,
    params: { A: { min: 0.08, max: 0.15, step: 0.01 }, x: { min: 0.02, max: 0.06, step: 0.01 }, v: { min: 0.3, max: 0.5, step: 0.05 } },
    constraints: (p) => p.x < p.A - 0.02,
    source: { params: { A: 0.1, x: 0.03, v: 0.4 }, answer: 1.498 },
    prompt: (p) =>
      `A body is sliding back and forth in a simple harmonic motion with an amplitude of ${fmt(p.A)} m on a horizontal surface. At a point ${fmt(p.x)} m away from equilibrium, the speed of the body is ${fmt(p.v)} m/s. What is the period?`,
    compute: (p) => numeric((2 * Math.PI) / osc.omegaFromSample(p.A, p.x, p.v), 's'),
    solution: (p, a) =>
      steps('v^2=\\omega^2(A^2-x^2) \\Rightarrow \\omega=\\dfrac{v}{\\sqrt{A^2-x^2}},\\quad T=\\dfrac{2\\pi}{\\omega}', ans('T', a, UNIT.s)),
  }),

  defineQuestion('PHY3_SH10', {
    sourceRef: 'P58',
    topic: 'shm',
    difficulty: 2,
    params: { A: { min: 0.08, max: 0.2, step: 0.01 }, x: { min: 0.02, max: 0.06, step: 0.01 }, v: { min: 0.2, max: 0.4, step: 0.01 } },
    constraints: (p) => p.x < p.A - 0.02,
    source: { params: { A: 0.12, x: 0.04, v: 0.29 }, answer: 0.307591 },
    prompt: (p) =>
      `A body slides back and forth in simple harmonic motion with an amplitude of ${fmt(p.A)} m on a horizontal surface. At a point ${fmt(p.x)} m away from equilibrium, the speed of the body is ${fmt(p.v)} m/s. What is the maximum speed of the body?`,
    compute: (p) => numeric(osc.omegaFromSample(p.A, p.x, p.v) * p.A, 'm/s'),
    solution: (p, a) => steps('\\omega=\\dfrac{v}{\\sqrt{A^2-x^2}},\\quad v_{max}=\\omega A', ans('v_{max}', a, UNIT.ms)),
  }),

  defineQuestion('PHY3_SH11', {
    sourceRef: 'P59',
    topic: 'shm',
    difficulty: 3,
    params: { A: { min: 0.15, max: 0.3, step: 0.01 }, x: { min: 0.01, max: 0.05, step: 0.01 }, v: { min: 0.3, max: 0.5, step: 0.05 }, v2: { min: 0.08, max: 0.2, step: 0.01 } },
    constraints: (p) => p.v2 < 0.9 * osc.omegaFromSample(p.A, p.x, p.v) * p.A,
    source: { params: { A: 0.2, x: 0.02, v: 0.4, v2: 0.12 }, answer: 0.191 },
    prompt: (p) =>
      `A body is sliding back and forth in a simple harmonic motion with an amplitude of ${fmt(p.A)} m on a horizontal surface. At a point ${fmt(p.x)} m away from equilibrium, the speed of the body is ${fmt(p.v)} m/s. What is the displacement when the speed is ${fmt(p.v2)} m/s?`,
    compute: (p) => {
      const w = osc.omegaFromSample(p.A, p.x, p.v)
      return numeric(Math.sqrt(p.A * p.A - (p.v2 / w) ** 2), 'm')
    },
    solution: (p, a) =>
      steps('\\omega=\\dfrac{v_1}{\\sqrt{A^2-x_1^2}},\\quad x_2=\\sqrt{A^2-\\left(\\dfrac{v_2}{\\omega}\\right)^2}', ans('x_2', a, UNIT.m)),
  }),

  defineQuestion('PHY3_SH12', {
    sourceRef: 'P60',
    topic: 'shm',
    difficulty: 3,
    params: { A: { min: 0.08, max: 0.15, step: 0.01 }, x: { min: 0.03, max: 0.07, step: 0.01 }, v: { min: 0.2, max: 0.4, step: 0.05 } },
    constraints: (p) => p.x < p.A - 0.02,
    source: { params: { A: 0.1, x: 0.06, v: 0.3 }, answer: 0.1435 },
    prompt: (p) =>
      `A plate is sliding back and forth in a simple harmonic motion with an amplitude of ${fmt(p.A)} m on a horizontal surface. At a point ${fmt(p.x)} m away from equilibrium, the speed of the plate is ${fmt(p.v)} m/s. In the center of the plate is a carrot slice. If the carrot slice is just on the verge of slipping at the endpoint of the path, what is the coefficient of static friction between the carrot slice and the plate? The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => {
      const w = osc.omegaFromSample(p.A, p.x, p.v)
      return numeric((w * w * p.A) / G, '')
    },
    solution: (p, a) =>
      steps('\\omega=\\dfrac{v}{\\sqrt{A^2-x^2}},\\quad \\mu g=\\omega^2A \\Rightarrow \\mu=\\dfrac{\\omega^2A}{g}', ans('\\mu', a), 'At the endpoint the acceleration is largest (ω²A), and friction alone must supply it.'),
  }),

  // ---------- Springs & oscillating masses ----------
  defineQuestion('PHY3_SP01', {
    sourceRef: 'P43',
    topic: 'springMass',
    difficulty: 3,
    params: { mp: { min: 200, max: 320, step: 10 }, xcm: { min: 3, max: 8, step: 0.5 }, T: { min: 0.8, max: 1.5, step: 0.1 } },
    constraints: (p) => {
      const k = (p.mp * G) / (p.xcm / 100)
      return (k * p.T * p.T) / (4 * Math.PI * Math.PI) - p.mp > 400
    },
    source: { params: { mp: 260, xcm: 5, T: 1 }, answer: 1030.83 },
    prompt: (p) =>
      `Four passengers with combined mass ${fmt(p.mp)} kg compress the springs of a car by ${fmt(p.xcm)} cm when they enter it. If the loaded car has a period of vibration of ${fmt(p.T)} s, what is the mass of the car? Ignore damping. The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => {
      const k = (p.mp * G) / (p.xcm / 100)
      return numeric((k * p.T * p.T) / (4 * Math.PI * Math.PI) - p.mp, 'kg')
    },
    solution: (p, a) =>
      steps('k=\\dfrac{m_pg}{x},\\quad M_{total}=\\dfrac{kT^2}{4\\pi^2},\\quad M_{car}=M_{total}-m_p', ans('M_{car}', a, UNIT.kg), 'The springs are compressed by the passengers\' weight, which gives k. The vibrating mass is the car plus the passengers.'),
  }),

  defineQuestion('PHY3_SP02', {
    sourceRef: 'P46',
    topic: 'springMass',
    difficulty: 2,
    params: { xcm: { min: 4, max: 10, step: 0.1 }, m1g: { min: 120, max: 250, step: 1 }, m2g: { min: 300, max: 600, step: 1 } },
    source: { params: { xcm: 6.9, m1g: 171, m2g: 476 }, answer: 0.8796 },
    prompt: (p) =>
      `A light vertically mounted helical spring is stretched by ${fmt(p.xcm)} cm by a mass of ${fmt(p.m1g)} g hang at spring's end. This mass is then replaced with a new ${fmt(p.m2g)} g bob that is set into simple harmonic motion. Calculate its period. The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => numeric(osc.springPeriod(p.m2g / 1000, (p.m1g / 1000 * G) / (p.xcm / 100)), 's'),
    solution: (p, a) => steps('k=\\dfrac{m_1g}{x},\\quad T=2\\pi\\sqrt{\\dfrac{m_2}{k}}', ans('T', a, UNIT.s)),
  }),

  defineQuestion('PHY3_SP03', {
    sourceRef: 'P47',
    topic: 'springMass',
    difficulty: 1,
    params: { xcm: { min: 3, max: 8, step: 0.1 }, mg: { min: 100, max: 300, step: 1 } },
    source: { params: { xcm: 4.9, mg: 165 }, answer: 33 },
    prompt: (p) =>
      `A light vertically mounted helical spring is stretched by ${fmt(p.xcm)} cm when a mass of ${fmt(p.mg)} g hangs at the spring's end. What is the force constant of the spring? The gravitational acceleration on Earth is g = 9.8 m/s².`,
    compute: (p) => numeric(((p.mg / 1000) * G) / (p.xcm / 100), 'N/m'),
    solution: (p, a) => steps('kx=mg \\Rightarrow k=\\dfrac{mg}{x}', ans('k', a, UNIT.Nm)),
  }),

  defineQuestion('PHY3_SP04', {
    sourceRef: 'P48',
    topic: 'springMass',
    difficulty: 2,
    params: { m: { min: 60, max: 100, step: 0.5 }, T: { min: 4, max: 8, step: 0.1 } },
    source: { params: { m: 77, T: 5.5 }, answer: 7.5091662226928 },
    prompt: (p) =>
      `Circus performer of mass ${fmt(p.m)} kg oscillates up and down at the end of a long elastic rope at a rate of once every ${fmt(p.T)} s. The elastic rope obeys Hooke's Law. By how much is the rope extended beyond its unloaded length when the performer hangs at rest? The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => numeric((G * p.T * p.T) / (4 * Math.PI * Math.PI), 'm'),
    solution: (p, a) =>
      steps('k=\\dfrac{4\\pi^2m}{T^2},\\quad x=\\dfrac{mg}{k}=\\dfrac{gT^2}{4\\pi^2}', ans('x', a, UNIT.m)),
  }),

  defineQuestion('PHY3_SP05', {
    sourceRef: 'P49',
    topic: 'springMass',
    difficulty: 1,
    params: { m: { min: 60, max: 100, step: 0.5 }, T: { min: 5, max: 9, step: 0.05 } },
    source: { params: { m: 88.5, T: 6.85 }, answer: 74.4598 },
    prompt: (p) =>
      `A circus performer of mass ${fmt(p.m)} kg oscillates up and down at the end of a long elastic rope at a rate of once every ${fmt(p.T)} s. The elastic rope obeys Hooke's law. What is the force constant of the rope? The gravitational acceleration on Earth is g = 9.8 m/s².`,
    compute: (p) => numeric(osc.springConstantFromPeriod(p.m, p.T), 'N/m'),
    solution: (p, a) => steps('T=2\\pi\\sqrt{\\dfrac{m}{k}} \\Rightarrow k=\\dfrac{4\\pi^2m}{T^2}', ans('k', a, UNIT.Nm)),
  }),

  defineQuestion('PHY3_SP06', {
    sourceRef: 'P50',
    topic: 'springMass',
    difficulty: 2,
    params: { mp: { min: 50, max: 90, step: 1 }, mc: { min: 1200, max: 1800, step: 10 }, xcm: { min: 5, max: 10, step: 0.5 } },
    source: { params: { mp: 62, mc: 1600, xcm: 7 }, answer: 0.3637 },
    prompt: (p) =>
      `When a person with a mass of ${fmt(p.mp)} kg steps into a car of mass ${fmt(p.mc)} kg, the car sinks by ${fmt(p.xcm)} cm. Assuming no damping, what is the frequency of vibration of the car and passenger on the car springs? The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => numeric(osc.springFrequency(p.mc + p.mp, (p.mp * G) / (p.xcm / 100)), 'Hz'),
    solution: (p, a) =>
      steps('k=\\dfrac{m_pg}{x},\\quad f=\\dfrac1{2\\pi}\\sqrt{\\dfrac{k}{m_c+m_p}}', ans('f', a, UNIT.Hz), 'The person\'s weight compresses the springs (giving k); the loaded car and person then vibrate together.'),
  }),

  defineQuestion('PHY3_SP07', {
    sourceRef: 'P51',
    topic: 'springMass',
    difficulty: 3,
    params: { mc: { min: 1500, max: 1900, step: 10 }, xcm: { min: 4, max: 8, step: 0.1 }, f: { min: 0.3, max: 0.6, step: 0.01 } },
    constraints: (p) => {
      const w2 = (2 * Math.PI * p.f) ** 2
      const m = (w2 * p.mc) / (G / (p.xcm / 100) - w2)
      return G / (p.xcm / 100) > w2 && m > 20 && m < 150
    },
    source: { params: { mc: 1770, xcm: 5.4, f: 0.41 }, answer: 67.1811 },
    prompt: (p) =>
      `When a person steps into a car of mass ${fmt(p.mc)} kg, the car sinks by ${fmt(p.xcm)} cm on its springs. Assuming no damping, the car and passenger then vibrate at ${fmt(p.f)} Hz. What is the mass of the person? The gravitational acceleration on Earth is g = 9.8 m/s².`,
    compute: (p) => {
      const w2 = (2 * Math.PI * p.f) ** 2
      return numeric((w2 * p.mc) / (G / (p.xcm / 100) - w2), 'kg')
    },
    solution: (p, a) =>
      steps('k=\\dfrac{mg}{x},\\ \\ \\omega^2=\\dfrac{k}{M+m} \\Rightarrow m=\\dfrac{\\omega^2M}{g/x-\\omega^2}', ans('m', a, UNIT.kg), 'The unknown mass both sets the spring constant (through the sag) and adds to the vibrating mass.'),
  }),

  defineQuestion('PHY3_SP08', {
    sourceRef: 'P63',
    topic: 'springMass',
    difficulty: 3,
    params: { m: { min: 8, max: 16, step: 1 }, v: { min: 1, max: 3, step: 0.1 }, k: { min: 60, max: 100, step: 1 } },
    source: { params: { m: 12, v: 1.6, k: 88 }, answer: 0.41779 },
    prompt: (p) =>
      `A ${fmt(p.m)}-kg mass is traveling to the right with a speed of ${fmt(p.v)} m/s on a smooth horizontal surface when it collides with and sticks to a second ${fmt(p.m)}-kg mass that is initially at rest but is attached to a light spring with force constant ${fmt(p.k)} N/m. Find the amplitude of the subsequent oscillations.`,
    compute: (p) => numeric((p.v / 2) * Math.sqrt((2 * p.m) / p.k), 'm'),
    solution: (p, a) =>
      steps('v\'=\\dfrac{v}{2},\\quad \\tfrac12(2m)v\'^2=\\tfrac12kA^2 \\Rightarrow A=v\'\\sqrt{\\dfrac{2m}{k}}', ans('A', a, UNIT.m), 'Perfectly inelastic collision: momentum gives the speed of the combined mass, which is all kinetic energy at the equilibrium position.'),
  }),

  defineQuestion('PHY3_SP09', {
    sourceRef: 'P64',
    topic: 'springMass',
    difficulty: 2,
    params: { m: { min: 8, max: 16, step: 1 }, v: { min: 1, max: 3, step: 0.1 }, k: { min: 60, max: 100, step: 1 } },
    source: { params: { m: 13, v: 2.1, k: 93 }, answer: 14.3325 },
    prompt: (p) =>
      `A ${fmt(p.m)}-kg mass travels to the right at ${fmt(p.v)} m/s on a smooth horizontal surface when it collides with and sticks to a second ${fmt(p.m)}-kg mass that is initially at rest but attached to a light spring of force constant ${fmt(p.k)} N/m. Find the total energy of the subsequent oscillations.`,
    compute: (p) => numeric(0.5 * (2 * p.m) * (p.v / 2) ** 2, 'J'),
    solution: (p, a) => steps('v\'=\\dfrac{v}{2},\\quad E=\\tfrac12(2m)v\'^2', ans('E', a, UNIT.J)),
  }),

  defineQuestion('PHY3_SP10', {
    sourceRef: 'P65',
    topic: 'springMass',
    difficulty: 2,
    params: { m: { min: 8, max: 20, step: 1 }, v: { min: 1.5, max: 3.5, step: 0.1 }, k: { min: 60, max: 110, step: 1 } },
    source: { params: { m: 16, v: 2.7, k: 87 }, answer: 3.8106 },
    prompt: (p) =>
      `A ${fmt(p.m)}-kg mass is traveling to the right with a speed of ${fmt(p.v)} m/s on a smooth horizontal surface when it collides with and sticks to a second ${fmt(p.m)}-kg mass that is initially at rest but is attached to a light spring with force constant ${fmt(p.k)} N/m. Find the period of the subsequent oscillations.`,
    compute: (p) => numeric(osc.springPeriod(2 * p.m, p.k), 's'),
    solution: (p, a) => steps('T=2\\pi\\sqrt{\\dfrac{2m}{k}}', ans('T', a, UNIT.s), 'After sticking, the oscillating mass is 2m.'),
  }),

  defineQuestion('PHY3_SP11', {
    sourceRef: 'P66',
    topic: 'springMass',
    difficulty: 2,
    params: { m: { min: 6, max: 16, step: 1 }, v: { min: 1, max: 3, step: 0.1 }, k: { min: 60, max: 110, step: 1 } },
    source: { params: { m: 10, v: 1.6, k: 85 }, answer: 0.3281 },
    prompt: (p) =>
      `A ${fmt(p.m)}-kg mass is traveling to the right with a speed of ${fmt(p.v)} m/s on a smooth horizontal surface when it collides with and sticks to a second ${fmt(p.m)}-kg mass that is initially at rest but is attached to a light spring with force constant ${fmt(p.k)} N/m. Find frequency of the subsequent oscillations.`,
    compute: (p) => numeric(osc.springFrequency(2 * p.m, p.k), 'Hz'),
    solution: (p, a) => steps('f=\\dfrac1{2\\pi}\\sqrt{\\dfrac{k}{2m}}', ans('f', a, UNIT.Hz)),
  }),

  defineQuestion('PHY3_SP12', {
    sourceRef: 'P67',
    topic: 'springMass',
    difficulty: 2,
    params: { mb: { min: 1.5, max: 3, step: 0.1 }, mw: { min: 8, max: 12, step: 0.1 }, k: { min: 100, max: 140, step: 5 }, Acm: { min: 2, max: 5, step: 0.5 }, rate: { min: 1.5, max: 2.5, step: 0.1 } },
    source: { params: { mb: 2, mw: 9.5, k: 120, Acm: 3.5, rate: 1.8 }, answer: 1.4902 },
    prompt: (p) =>
      `A ${fmt(p.mb)}-kg bucket containing ${fmt(p.mw)} kg of water is hanging from a vertical ideal spring of force constant ${fmt(p.k)} N/m and oscillating up and down with an amplitude of ${fmt(p.Acm)} cm. Suddenly the bucket springs a leak in the bottom such that water drops out at a steady rate of ${fmt(p.rate)} g/s. When the bucket is half full, find the period of oscillation.`,
    compute: (p) => numeric(osc.springPeriod(p.mb + p.mw / 2, p.k), 's'),
    solution: (p, a) =>
      steps('m=m_b+\\dfrac{m_w}{2},\\quad T=2\\pi\\sqrt{\\dfrac{m}{k}}', ans('T', a, UNIT.s), 'Half full means half of the original water is left. The leak rate does not matter for the period at that instant.'),
  }),

  defineQuestion('PHY3_SP13', {
    sourceRef: 'P68',
    topic: 'springMass',
    difficulty: 1,
    params: { mb: { min: 2, max: 3, step: 0.1 }, mw: { min: 9, max: 12, step: 0.1 }, k: { min: 110, max: 140, step: 5 }, rate: { min: 2, max: 3, step: 0.05 } },
    source: { params: { mb: 2.3, mw: 10.4, k: 125, rate: 2.25 }, answer: 2311.11 },
    prompt: (p) =>
      `A ${fmt(p.mb)}-kg bucket containing ${fmt(p.mw)} kg of water hangs from a vertical ideal spring of force constant ${fmt(p.k)} N/m and oscillates up and down. The bucket springs a leak in the bottom and water drops out at a steady rate of ${fmt(p.rate)} g/s. How long does it take until the bucket is half full?`,
    compute: (p) => numeric(p.mw / 2 / (p.rate / 1000), 's'),
    solution: (p, a) => steps('t=\\dfrac{m_w/2}{\\text{rate}}', ans('t', a, UNIT.s)),
  }),

  defineQuestion('PHY3_SP14', {
    sourceRef: 'P69',
    topic: 'springMass',
    difficulty: 3,
    params: { mb: { min: 2, max: 3, step: 0.1 }, mw: { min: 9, max: 12, step: 0.1 }, k: { min: 110, max: 140, step: 1 }, Acm: { min: 2, max: 5, step: 0.5 }, rate: { min: 2, max: 3, step: 0.1 } },
    source: { params: { mb: 2.2, mw: 10.8, k: 128, Acm: 2.5, rate: 2.2 }, answer: 0.0002216 },
    prompt: (p) =>
      `A ${fmt(p.mb)}-kg bucket containing ${fmt(p.mw)} kg of water is hanging from a vertical ideal spring of force constant ${fmt(p.k)} N/m and oscillating up and down with an amplitude of ${fmt(p.Acm)} cm. Suddenly the bucket springs a leak in the bottom such that water drops out at a steady rate of ${fmt(p.rate)} g/s. When the bucket is half full, find the magnitude of rate at which the period is changing with respect to time.`,
    compute: (p) => {
      const m = p.mb + p.mw / 2
      return numeric((Math.PI * (p.rate / 1000)) / Math.sqrt(m * p.k), '')
    },
    solution: (p, a) =>
      steps('T=2\\pi\\sqrt{\\dfrac{m}{k}} \\Rightarrow \\left|\\dfrac{dT}{dt}\\right|=\\dfrac{\\pi}{\\sqrt{mk}}\\left|\\dfrac{dm}{dt}\\right|', ans('\\left|\\dfrac{dT}{dt}\\right|', a), 'Differentiate the period with respect to time; m is the mass of bucket plus the remaining water (half the original), dm/dt is the leak rate in kg/s.'),
  }),

  defineQuestion('PHY3_SP15', {
    sourceRef: 'P70',
    topic: 'springMass',
    difficulty: 2,
    params: { L: { min: 1.5, max: 2.2, step: 0.1 }, m: { min: 50, max: 80, step: 1 }, xmm: { min: 1.8, max: 3, step: 0.1 } },
    source: { params: { L: 1.8, m: 64, xmm: 2.2 }, answer: 10.622 },
    prompt: (p) =>
      `A hanging wire is ${fmt(p.L)} m long. When a ${fmt(p.m)}-kg steel ball is suspended from the wire, the wire stretches by ${fmt(p.xmm)} mm. If the ball is pulled down a small additional distance and released, at what frequency will it vibrate? The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => numeric(osc.springFrequency(p.m, (p.m * G) / (p.xmm / 1000)), 'Hz'),
    solution: (p, a) =>
      steps('k=\\dfrac{mg}{x},\\quad f=\\dfrac1{2\\pi}\\sqrt{\\dfrac{k}{m}}=\\dfrac1{2\\pi}\\sqrt{\\dfrac{g}{x}}', ans('f', a, UNIT.Hz), 'The wire acts as a spring; the mass cancels out of the frequency.'),
  }),

  defineQuestion('PHY3_SP16', {
    sourceRef: 'P71',
    topic: 'springMass',
    difficulty: 2,
    params: { xmm: { min: 2, max: 3, step: 0.05 }, m1: { min: 40, max: 60, step: 1 }, m2: { min: 15, max: 35, step: 1 } },
    source: { params: { xmm: 2.45, m1: 52, m2: 24 }, answer: 14.8165 },
    prompt: (p) =>
      `A hanging wire stretches by ${fmt(p.xmm)} mm when a ${fmt(p.m1)}-kg steel ball is suspended from it. The ball is removed and a ${fmt(p.m2)}-kg ball is hung from the same wire instead. If this ball is pulled down a small additional distance and released, at what frequency will it vibrate? The gravitational acceleration on Earth is g = 9.8 m/s².`,
    compute: (p) => numeric(osc.springFrequency(p.m2, (p.m1 * G) / (p.xmm / 1000)), 'Hz'),
    solution: (p, a) => steps('k=\\dfrac{m_1g}{x},\\quad f=\\dfrac1{2\\pi}\\sqrt{\\dfrac{k}{m_2}}', ans('f', a, UNIT.Hz)),
  }),

  // ---------- Damped & driven oscillations ----------
  defineQuestion('PHY3_DD01', {
    sourceRef: 'P41',
    topic: 'dampedDriven',
    difficulty: 2,
    params: { T: { min: 0.6, max: 1, step: 0.001 }, ratio: { min: 0.93, max: 0.98, step: 0.001 }, pct: { min: 30, max: 60, step: 1 } },
    source: { params: { T: 0.753, ratio: 0.961, pct: 46 }, answer: 7.349 },
    prompt: (p) =>
      `A mass M is suspended from a spring and oscillates with a period of ${fmt(p.T)} s. Each complete oscillation results in an amplitude reduction of a factor of ${fmt(p.ratio)} due to a small velocity dependent frictional effect. Calculate the time it takes for the total energy of the oscillator to decrease to ${fmt(p.pct)}% of its initial value.`,
    compute: (p) => numeric(osc.cyclesForEnergyFraction(p.ratio, p.pct / 100) * p.T, 's'),
    solution: (p, a) =>
      steps('E\\propto A^2 \\Rightarrow r^{2n}=f \\Rightarrow n=\\dfrac{\\ln f}{2\\ln r},\\quad t=nT', ans('t', a, UNIT.s), 'Energy is proportional to the amplitude squared, so after n cycles it is r^(2n) of its initial value.'),
  }),

  defineQuestion('PHY3_DD02', {
    sourceRef: 'P42',
    topic: 'dampedDriven',
    difficulty: 2,
    params: { T: { min: 0.5, max: 1, step: 0.1 }, ratio: { min: 0.9, max: 0.97, step: 0.01 }, fraction: { min: 0.3, max: 0.6, step: 0.01 } },
    source: { params: { T: 0.7, ratio: 0.94, fraction: 0.39 }, answer: 7.60891 },
    prompt: (p) =>
      `A mass is suspended from a spring and oscillates with a period of ${fmt(p.T)} s. Each complete oscillation reduces the amplitude by a factor of ${fmt(p.ratio)} because of a small velocity-dependent frictional effect. How many complete oscillations does it take for the total energy of the oscillator to decrease to ${fmt(p.fraction)} of its initial value?`,
    compute: (p) => numeric(osc.cyclesForEnergyFraction(p.ratio, p.fraction), ''),
    solution: (p, a) => steps('r^{2n}=f \\Rightarrow n=\\dfrac{\\ln f}{2\\ln r}', ans('n', a)),
  }),

  defineQuestion('PHY3_DD03', {
    sourceRef: 'P72',
    topic: 'dampedDriven',
    difficulty: 2,
    params: { L: { min: 0.5, max: 1.5, step: 0.1 }, a0: { min: 8, max: 15, step: 0.1 }, t: { min: 600, max: 1200, step: 10 }, a1: { min: 2, max: 5, step: 0.1 } },
    source: { params: { L: 1, a0: 13, t: 970, a1: 3.4 }, answer: 0.00138 },
    prompt: (p) =>
      `A pendulum with a length of ${fmt(p.L)} m released from an initial angle of ${fmt(p.a0)}˚. After ${fmt(p.t)} s, its amplitude has been reduced by friction to ${fmt(p.a1)}˚. What is the value of the damping constant γ, where the amplitude decays as A = A₀e^(−γt)?`,
    compute: (p) => numeric(Math.log(p.a0 / p.a1) / p.t, 's^-1'),
    solution: (p, a) => steps('A=A_0e^{-\\gamma t} \\Rightarrow \\gamma=\\dfrac{1}{t}\\ln\\dfrac{A_0}{A}', ans('\\gamma', a, UNIT.inverseS)),
  }),

  defineQuestion('PHY3_DD04', {
    sourceRef: 'P73',
    topic: 'dampedDriven',
    difficulty: 2,
    params: { m: { min: 8, max: 14, step: 0.1 }, k4: { min: 1.5, max: 3, step: 0.05 }, b: { min: 2, max: 5, step: 0.1 } },
    source: { params: { m: 10.6, k4: 2.05, b: 3 }, answer: 6.998 },
    prompt: (p) =>
      `A ${fmt(p.m)}-kg object oscillates at the end of a vertical spring that has a spring constant of ${sciText(p.k4, 4)} N/m. The effect of air resistance is represented by the damping coefficient b = ${fmt(p.b)} N⋅s/m. Calculate the frequency of the damped oscillation.`,
    compute: (p) => numeric(osc.dampedAngularFrequency(p.m, p.k4 * 1e4, p.b) / (2 * Math.PI), 'Hz'),
    solution: (p, a) => steps('\\omega\'=\\sqrt{\\dfrac{k}{m}-\\left(\\dfrac{b}{2m}\\right)^2},\\quad f=\\dfrac{\\omega\'}{2\\pi}', ans('f', a, UNIT.Hz)),
  }),

  defineQuestion('PHY3_DD05', {
    sourceRef: 'P74',
    topic: 'dampedDriven',
    difficulty: 1,
    params: { m: { min: 8, max: 12, step: 0.1 }, k4: { min: 2, max: 4, step: 0.05 }, b: { min: 2, max: 5, step: 0.1 } },
    source: { params: { m: 9.7, k4: 3.05, b: 3.7 }, answer: 5.24324 },
    prompt: (p) =>
      `A ${fmt(p.m)}-kg object oscillates at the end of a vertical spring that has a spring constant of ${sciText(p.k4, 4)} N/m. The effect of air resistance is represented by the damping coefficient b = ${fmt(p.b)} N·s/m. After what time does the amplitude of the oscillation fall to 1/e of its initial value?`,
    compute: (p) => numeric((2 * p.m) / p.b, 's'),
    solution: (p, a) => steps('A=A_0e^{-bt/2m} \\Rightarrow \\dfrac{bt}{2m}=1 \\Rightarrow t=\\dfrac{2m}{b}', ans('t', a, UNIT.s)),
  }),

  defineQuestion('PHY3_DD06', {
    sourceRef: 'P75',
    topic: 'dampedDriven',
    difficulty: 3,
    params: { W: { min: 30, max: 60, step: 1 }, k: { min: 150, max: 250, step: 5 }, f: { min: 7, max: 12, step: 0.5 }, Acm: { min: 1, max: 3, step: 0.1 } },
    source: { params: { W: 42, k: 200, f: 9, Acm: 1.8 }, answer: 243.08 },
    prompt: (p) =>
      `A block weighing ${fmt(p.W)} N is suspended from a spring that has a force constant of ${fmt(p.k)} N/m. The system is undamped (b = 0) and is subjected to a harmonic driving force of frequency ${fmt(p.f)} Hz, resulting in a forced-motion amplitude of ${fmt(p.Acm)} cm. Determine the maximum value of the driving force. The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => numeric(osc.drivingForceAmplitude(p.W / G, p.k, p.f, p.Acm / 100), 'N'),
    solution: (p, a) =>
      steps('A=\\dfrac{F_0/m}{|\\omega_0^2-\\omega^2|} \\Rightarrow F_0=m\\,|\\omega_0^2-\\omega^2|\\,A,\\quad \\omega_0^2=\\dfrac{k}{m},\\ \\omega=2\\pi f', ans('F_0', a, UNIT.N), 'The mass follows from the weight: m = W/g.'),
  }),

  defineQuestion('PHY3_DD07', {
    sourceRef: 'P76',
    topic: 'dampedDriven',
    difficulty: 2,
    params: { W: { min: 35, max: 60, step: 1 }, k: { min: 200, max: 260, step: 5 }, f: { min: 8, max: 12, step: 0.5 }, Acm: { min: 1, max: 3, step: 0.05 } },
    source: { params: { W: 47, k: 225, f: 9.5, Acm: 1.75 }, answer: 1.09012 },
    prompt: (p) =>
      `A block weighing ${fmt(p.W)} N is suspended from a spring that has a force constant of ${fmt(p.k)} N/m. The system is undamped and is subjected to a harmonic driving force of frequency ${fmt(p.f)} Hz, resulting in oscillations of amplitude ${fmt(p.Acm)} cm. What is the natural frequency of this spring-block system? The gravitational acceleration on Earth is g = 9.8 m/s².`,
    compute: (p) => numeric(osc.springFrequency(p.W / G, p.k), 'Hz'),
    solution: (p, a) =>
      steps('f_0=\\dfrac1{2\\pi}\\sqrt{\\dfrac{k}{m}},\\quad m=\\dfrac{W}{g}', ans('f_0', a, UNIT.Hz), 'The natural frequency depends only on the spring and the mass, not on the drive.'),
  }),

  defineQuestion('PHY3_DD08', {
    sourceRef: 'P77',
    topic: 'dampedDriven',
    difficulty: 3,
    params: { m: { min: 0.1, max: 0.3, step: 0.01 }, k: { min: 4, max: 8, step: 0.1 }, F0: { min: 1, max: 3, step: 0.1 }, A: { min: 0.15, max: 0.4, step: 0.01 } },
    source: { params: { m: 0.15, k: 5.8, F0: 1.7, A: 0.25 }, answer: 1.459 },
    prompt: (p) =>
      `Damping is negligible for a ${fmt(p.m)}-kg object hanging from a light, ${fmt(p.k)}-N/m spring. A sinusoidal force with an amplitude of ${fmt(p.F0)} N drives the system. At what frequency will the force make the object vibrate with an amplitude of ${fmt(p.A)} m? Assume (ω² − ω₀²) > 0`,
    compute: (p) => numeric(Math.sqrt(p.k / p.m + p.F0 / (p.m * p.A)) / (2 * Math.PI), 'Hz'),
    solution: (p, a) =>
      steps('A=\\dfrac{F_0/m}{\\omega^2-\\omega_0^2} \\Rightarrow \\omega^2=\\dfrac{k}{m}+\\dfrac{F_0}{mA},\\quad f=\\dfrac{\\omega}{2\\pi}', ans('f', a, UNIT.Hz)),
  }),

  defineQuestion('PHY3_DD09', {
    sourceRef: 'P78',
    topic: 'dampedDriven',
    difficulty: 3,
    params: { m: { min: 9, max: 14, step: 0.1 }, k4: { min: 2.5, max: 4, step: 0.1 }, b: { min: 2, max: 5, step: 0.1 } },
    source: { params: { m: 11.8, k4: 3.2, b: 3.6 }, answer: 1.8237 },
    prompt: (p) =>
      `A ${fmt(p.m)}-kg object oscillates at the end of a vertical spring that has a spring constant of ${sciText(p.k4, 4)} N/m. The effect of air resistance is represented by the damping coefficient b = ${fmt(p.b)} N ⋅ s/m. By what percentage does the amplitude of the oscillation decrease in each cycle?`,
    compute: (p) => numeric(osc.amplitudeLossPerCycle(p.m, p.k4 * 1e4, p.b) * 100, '%'),
    solution: (p, a) =>
      steps('\\dfrac{A_{n+1}}{A_n}=e^{-\\gamma T\'},\\ \\ \\gamma=\\dfrac{b}{2m},\\ T\'=\\dfrac{2\\pi}{\\omega\'} \\Rightarrow \\text{decrease}=1-e^{-\\gamma T\'}', ans('\\text{decrease}', a, UNIT.percent)),
  }),
]
