import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import {
  elasticFinalSpeedM1,
  elasticFinalSpeedM2,
  explosionHeavyLanding,
  inelasticEnergyLoss,
  inelasticFinalSpeed,
  momentumComponentSpeed,
  springLaunchSpeed,
  throwRecoilSpeed,
} from '../../physics/momentum'
import { magnitude, toRad, v3 } from '../../physics/vectors'

const G = 9.8

export const momentumQuestions = [
  defineQuestion('PHY2_MO01', {
    sourceRef: 'P72',
    topic: 'momentum',
    difficulty: 3,
    params: { massG: { min: 10, max: 20, step: 0.5 }, M: { min: 5, max: 9, step: 0.2 }, h: { min: 0.03, max: 0.09, step: 0.005 } },
    prompt: (p) =>
      `The figure shows a ballistic pendulum. Initially, the pendulum is at rest. The bullet strikes the block horizontally and remains stuck in it. The impact of the bullet puts the block in motion, causing it to swing upward to a height h. If the bullet has a mass of ${fmt(p.massG)} g, and the block of mass ${fmt(p.M)} kg swings up to a height of ${fmt(p.h * 100)} cm, what was the speed of the bullet before impact? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const m = p.massG / 1000
      const V = Math.sqrt(2 * G * p.h)
      return { value: ((m + p.M) / m) * V, unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'V=\\sqrt{2gh},\\quad v = \\dfrac{m+M}{m}V' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p72-73.png' } }),
  }),

  defineQuestion('PHY2_MO02', {
    sourceRef: 'P73',
    topic: 'momentum',
    difficulty: 2,
    params: { massG: { min: 8, max: 16, step: 0.5 }, M: { min: 5, max: 8, step: 0.2 }, v: { min: 420, max: 560, step: 5 } },
    prompt: (p) =>
      `A ballistic pendulum is initially at rest. A bullet of mass ${fmt(p.massG)} g strikes a block of mass ${fmt(p.M)} kg horizontally at ${fmt(p.v)} m/s and remains stuck in it, putting the block in motion. To what height does the block swing? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const m = p.massG / 1000
      const V = inelasticFinalSpeed(m, p.v, p.M)
      return { value: (V * V) / (2 * G), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'V = \\dfrac{mv}{m+M},\\quad h = \\dfrac{V^2}{2g}' },
      { label: 'Answer', math: `h = ${fmt(answer)}\\text{ m}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p72-73.png' } }),
  }),

  defineQuestion('PHY2_MO03', {
    sourceRef: 'P74',
    topic: 'momentum',
    difficulty: 1,
    params: { m1: { min: 75, max: 95, step: 1 }, v1: { min: 2.5, max: 4.5, step: 0.1 }, m2: { min: 78, max: 95, step: 1 } },
    prompt: (p) =>
      `A linebacker with mass ${fmt(p.m1)} kg and initial speed ${fmt(p.v1)} m/s makes a perfectly inelastic collision with a ${fmt(p.m2)} kg quarterback that is initially at rest. Find the speed of the players just after their collision.`,
    compute: (p) => ({ value: inelasticFinalSpeed(p.m1, p.v1, p.m2), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_f = \\dfrac{m_1 v_1}{m_1+m_2}' },
      { label: 'Answer', math: `v_f = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_MO04', {
    sourceRef: 'P75',
    topic: 'momentum',
    difficulty: 2,
    params: { m1: { min: 80, max: 100, step: 1 }, v1: { min: 3, max: 5, step: 0.1 }, m2: { min: 75, max: 92, step: 1 } },
    prompt: (p) =>
      `A linebacker with mass ${fmt(p.m1)} kg and initial speed ${fmt(p.v1)} m/s makes a perfectly inelastic collision with a ${fmt(p.m2)} kg quarterback that is initially at rest. How much kinetic energy is lost in the collision?`,
    compute: (p) => ({ value: inelasticEnergyLoss(p.m1, p.v1, p.m2), unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\Delta KE = \\tfrac12 m_1 v_1^2 - \\tfrac12(m_1+m_2)v_f^2' },
      { label: 'Answer', math: `\\Delta KE = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_MO05', {
    sourceRef: 'P76',
    topic: 'momentum',
    difficulty: 2,
    params: { m1: { min: 5, max: 10, step: 0.5 }, m2: { min: 2, max: 5, step: 0.5 }, v1: { min: 3, max: 7, step: 0.5 } },
    prompt: (p) =>
      `Two masses M₁ = ${fmt(p.m1)} kg and M₂ = ${fmt(p.m2)} kg collide elastically. The initial velocity of the first mass M₁ is ${fmt(p.v1)} m/s, whereas the second mass M₂ is starting its motion only after the collision. Find the speed of the second mass after the collision.`,
    compute: (p) => ({ value: elasticFinalSpeedM2(p.m1, p.v1, p.m2), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: "v_2' = \\dfrac{2M_1}{M_1+M_2}v_1" },
      { label: 'Answer', math: `v_2' = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_MO06', {
    sourceRef: 'P77',
    topic: 'momentum',
    difficulty: 2,
    params: { m1: { min: 6, max: 12, step: 0.5 }, m2: { min: 2, max: 5, step: 0.5 }, v1: { min: 2, max: 5, step: 0.2 } },
    prompt: (p) =>
      `Two masses M₁ = ${fmt(p.m1)} kg and M₂ = ${fmt(p.m2)} kg collide elastically. The initial velocity of the first mass M₁ is ${fmt(p.v1)} m/s, whereas the second mass M₂ is at rest before the collision. Find the speed of the first mass after the collision.`,
    compute: (p) => ({ value: Math.abs(elasticFinalSpeedM1(p.m1, p.v1, p.m2)), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: "v_1' = \\dfrac{M_1-M_2}{M_1+M_2}v_1" },
      { label: 'Answer', math: `v_1' = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_MO07', {
    sourceRef: 'P78',
    topic: 'momentum',
    difficulty: 3,
    params: { m1: { min: 1.6, max: 2.6, step: 0.1 }, m2: { min: 2.4, max: 3.4, step: 0.1 }, k: { min: 700, max: 950, step: 10 }, d: { min: 0.14, max: 0.24, step: 0.01 } },
    prompt: (p) =>
      `On a frictionless horizontal surface two blocks of masses ${fmt(p.m1)} kg and ${fmt(p.m2)} kg are connected by a spring of stiffness k = ${fmt(p.k)} N/m and negligible mass. Initially, the blocks are pushed together to compress the spring by distance d = ${fmt(p.d * 100)} cm from its equilibrium length, and the configuration is fixed by a cord that holds the blocks. When the cord is cut, the blocks move in opposite directions. Calculate the speed of the first block.`,
    compute: (p) => ({ value: springLaunchSpeed(p.k, p.d, p.m1, p.m2), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_1 = d\\sqrt{\\dfrac{k\\,m_2}{m_1(m_1+m_2)}}' },
      { label: 'Answer', math: `v_1 = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p78-79.png' } }),
  }),

  defineQuestion('PHY2_MO08', {
    sourceRef: 'P79',
    topic: 'momentum',
    difficulty: 3,
    params: { m1: { min: 1.8, max: 2.8, step: 0.1 }, m2: { min: 2.6, max: 3.6, step: 0.1 }, k: { min: 750, max: 980, step: 10 }, d: { min: 0.16, max: 0.26, step: 0.01 } },
    prompt: (p) =>
      `On a frictionless horizontal surface two blocks of masses ${fmt(p.m1)} kg and ${fmt(p.m2)} kg are connected by a spring of stiffness k = ${fmt(p.k)} N/m and negligible mass. Initially, the blocks are pushed together to compress the spring by a distance d = ${fmt(p.d * 100)} cm from its equilibrium length, and the configuration is fixed by a cord. When the cord is cut, the blocks move in opposite directions. Calculate the speed of the second block.`,
    compute: (p) => ({ value: springLaunchSpeed(p.k, p.d, p.m2, p.m1), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_2 = d\\sqrt{\\dfrac{k\\,m_1}{m_2(m_1+m_2)}}' },
      { label: 'Answer', math: `v_2 = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p78-79.png' } }),
  }),

  defineQuestion('PHY2_MO09', {
    sourceRef: 'P80',
    topic: 'momentum',
    difficulty: 3,
    params: {
      m1G: { min: 400, max: 650, step: 10 }, v1x: { min: -3.2, max: -2, step: 0.1 }, v1y: { min: 0.6, max: 1.6, step: 0.1 },
      m2G: { min: 700, max: 1000, step: 10 }, v2x: { min: 4.5, max: 6.5, step: 0.1 }, v2y: { min: 1.5, max: 3, step: 0.1 }, v2z: { min: 2, max: 3.5, step: 0.1 },
    },
    prompt: (p) =>
      `An object of mass ${fmt(p.m1G)} gram has an initial velocity of ${fmt(p.v1x)} m/s î + ${fmt(p.v1y)} m/s ĵ. It collides with and sticks to another object of mass ${fmt(p.m2G)} gram moving with an initial velocity of ${fmt(p.v2x)} m/s î + ${fmt(p.v2y)} m/s ĵ + ${fmt(p.v2z)} m/s k̂. Find the magnitude of the speed of the composite object.`,
    compute: (p) => {
      const mA = p.m1G / 1000
      const mB = p.m2G / 1000
      const px = mA * p.v1x + mB * p.v2x
      const py = mA * p.v1y + mB * p.v2y
      const pz = mB * p.v2z
      const M = mA + mB
      return { value: magnitude(v3(px / M, py / M, pz / M)), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (_p, answer) => [
      { label: 'Formula', math: '\\vec v_f = \\dfrac{m_1\\vec v_1 + m_2\\vec v_2}{m_1+m_2}' },
      { label: 'Answer', math: `v_f = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_MO10', {
    sourceRef: 'P81',
    topic: 'momentum',
    difficulty: 2,
    params: { m: { min: 0.7, max: 1.4, step: 0.05 }, mu: { min: 0.1, max: 0.2, step: 0.01 }, massArrowG: { min: 200, max: 320, step: 10 }, v: { min: 22, max: 36, step: 1 } },
    prompt: (p) =>
      `A block of mass ${fmt(p.m)} kg stays at rest on a horizontal surface with coefficient of kinetic friction ${fmt(p.mu)}. When an arrow of mass ${fmt(p.massArrowG)} g strikes the block with the speed ${fmt(p.v)} m/s it gets stuck in the block. Find the distance to which the block with the arrow will slide after the strike till they come to rest. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const mArrow = p.massArrowG / 1000
      const V = inelasticFinalSpeed(mArrow, p.v, p.m)
      return { value: (V * V) / (2 * p.mu * G), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'V=\\dfrac{m_{arrow}v}{m_{arrow}+m},\\quad d=\\dfrac{V^2}{2\\mu g}' },
      { label: 'Answer', math: `d = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY2_MO11', {
    sourceRef: 'P82',
    topic: 'momentum',
    difficulty: 2,
    params: { m: { min: 0.9, max: 1.7, step: 0.05 }, mu: { min: 0.15, max: 0.3, step: 0.01 }, massArrowG: { min: 180, max: 280, step: 10 }, v: { min: 20, max: 32, step: 1 } },
    prompt: (p) =>
      `A block of mass ${fmt(p.m)} kg stays at rest on a horizontal surface whose coefficient of kinetic friction is ${fmt(p.mu)}. An arrow of mass ${fmt(p.massArrowG)} g strikes the block with a speed of ${fmt(p.v)} m/s and gets stuck in the block. How much kinetic energy is lost during the collision? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: inelasticEnergyLoss(p.massArrowG / 1000, p.v, p.m), unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\Delta KE = \\tfrac12 m_{arrow} v^2 - \\tfrac12(m_{arrow}+m)V^2' },
      { label: 'Answer', math: `\\Delta KE = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_MO12', {
    sourceRef: 'P83',
    topic: 'momentum',
    difficulty: 3,
    params: { massArrowG: { min: 200, max: 320, step: 10 }, mBrick: { min: 0.6, max: 1.1, step: 0.05 }, v: { min: 38, max: 55, step: 1 }, dCm: { min: 1800, max: 3500, step: 50 } },
    prompt: (p) =>
      `When an arrow of mass ${fmt(p.massArrowG)} g strikes a brick of mass ${fmt(p.mBrick)} kg, staying at rest on a horizontal surface, the arrow gets stuck in the brick and they begin to move straight until they stop because of friction between the brick and the surface. If the initial speed of the arrow before the strike was ${fmt(p.v)} m/s and the distance the block with the arrow moved after the strike was ${fmt(p.dCm)} cm, what was the coefficient of kinetic friction between the brick and the surface? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const mArrow = p.massArrowG / 1000
      const V = inelasticFinalSpeed(mArrow, p.v, p.mBrick)
      const d = p.dCm / 100
      return { value: (V * V) / (2 * G * d), unit: '', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'V=\\dfrac{m_{arrow}v}{m_{arrow}+m_{brick}},\\quad \\mu=\\dfrac{V^2}{2gd}' },
      { label: 'Answer', math: `\\mu = ${fmt(answer)}` },
    ],
  }),

  defineQuestion('PHY2_MO13', {
    sourceRef: 'P84',
    topic: 'momentum',
    difficulty: 3,
    params: { vBefore: { min: 2, max: 4, step: 0.2 }, packMass: { min: 22, max: 36, step: 1 }, vPack: { min: 3, max: 5.5, step: 0.2 }, mAstro: { min: 90, max: 118, step: 1 } },
    prompt: (p) =>
      `An astronaut runs out of fuel in her power pack while drifting at ${fmt(p.vBefore)} m/s away from the International Space Station. She removes her ${fmt(p.packMass)} kg power pack and throws it away at ${fmt(p.vPack)} m/s relative to the Station and in the direction away from the Station. The mass of the astronaut plus space suit, minus the power pack, is ${fmt(p.mAstro)} kg. Calculate the new velocity of the astronaut relative to the Space Station. Take the direction towards the Space Station as positive.`,
    compute: (p) => {
      const totalBefore = p.mAstro + p.packMass
      const vAway = throwRecoilSpeed(totalBefore, p.vBefore, p.packMass, p.vPack)
      return { value: -vAway, unit: 'm/s', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '(m_{ast}+m_{pack})v_i = m_{pack}v_{pack} + m_{ast}v_{ast}' },
      { label: 'Answer', math: `v_{ast} = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_MO14', {
    sourceRef: 'P85',
    topic: 'momentum',
    difficulty: 3,
    params: { mTotal: { min: 95, max: 120, step: 1 }, vBefore: { min: 2.8, max: 4.2, step: 0.1 }, packMass: { min: 20, max: 32, step: 1 }, vPack: { min: 4, max: 5.5, step: 0.1 } },
    constraints: (p) => p.mTotal > p.packMass + 40,
    prompt: (p) =>
      `An astronaut of total mass ${fmt(p.mTotal)} kg, including her power pack, runs out of fuel while drifting at ${fmt(p.vBefore)} m/s away from the International Space Station. She removes her ${fmt(p.packMass)} kg power pack and throws it directly away from the Station at ${fmt(p.vPack)} m/s relative to the Station. What is her speed immediately after the throw?`,
    compute: (p) => ({ value: throwRecoilSpeed(p.mTotal, p.vBefore, p.packMass, p.vPack), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'M v_i = m_{pack}v_{pack} + (M-m_{pack})v_f' },
      { label: 'Answer', math: `v_f = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_MO15', {
    sourceRef: 'P86',
    topic: 'momentum',
    difficulty: 2,
    params: { mBoulder: { min: 2000, max: 2900, step: 25 }, landing: { min: 280, max: 420, step: 5 } },
    prompt: (p) =>
      `In a volcanic eruption, a ${fmt(p.mBoulder)}-kg boulder is thrown vertically upward into the air. At its highest point, it suddenly explodes due to trapped gas into two fragments, one being 3 times the mass of the other. The lighter fragment starts out with only horizontal velocity and lands ${fmt(p.landing)} m directly north of the point of the explosion. How far from the explosion will the other fragment land? Neglect any other air resistance.`,
    compute: (p) => ({ value: explosionHeavyLanding(p.landing, 3), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', text: 'Both fragments fall the same height from the same point, so time-of-fall is equal; momentum conservation (initially zero, horizontal) ties their horizontal speeds by the inverse mass ratio.' },
      { label: 'Formula', math: 'd_{heavy} = d_{light}/3' },
      { label: 'Answer', math: `d_{heavy} = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY2_MO16', {
    sourceRef: 'P87',
    topic: 'momentum',
    difficulty: 1,
    params: { mBoulder: { min: 2200, max: 3000, step: 25 }, vLight: { min: 35, max: 55, step: 0.5 } },
    prompt: (p) =>
      `In a volcanic eruption, a ${fmt(p.mBoulder)}-kg boulder is thrown vertically upward into the air. At its highest point it suddenly explodes into two fragments, one being 3 times the mass of the other. The lighter fragment starts out with only a horizontal velocity of ${fmt(p.vLight)} m/s. What is the horizontal speed of the heavier fragment immediately after the explosion?`,
    compute: (p) => ({ value: p.vLight / 3, unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'm_{light}v_{light} = m_{heavy}v_{heavy} = 3m_{light}v_{heavy} \\Rightarrow v_{heavy}=v_{light}/3' },
      { label: 'Answer', math: `v_{heavy} = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_MO17', {
    sourceRef: 'P88',
    topic: 'momentum',
    difficulty: 3,
    params: { fraction: { min: 4, max: 8, step: 1 } },
    prompt: (p) =>
      `${fmt(p.fraction)} coupled railroad cars roll along and couple with the next car, which is initially at rest. The resulting collection then couples with another car initially at rest, and so on. This process continues until the speed of the final collection of railroad cars is 1/6 the speed of the initial ${fmt(p.fraction)} railroad cars. All the cars are identical. Ignoring friction, how many cars are in the final collection?`,
    compute: (p) => ({ value: 6 * p.fraction, unit: '', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', text: 'Momentum conservation through successive perfectly-inelastic couplings gives v_N = (initial cars)·v₁/N — a clean telescoping result.' },
      { label: 'Formula', math: 'v_N = \\dfrac{n_0 v_1}{N} = \\dfrac{v_1}{6} \\Rightarrow N = 6n_0' },
      { label: 'Answer', math: `N = ${fmt(answer)}\\text{ cars}` },
    ],
  }),

  defineQuestion('PHY2_MO18', {
    sourceRef: 'P89',
    topic: 'momentum',
    difficulty: 3,
    params: { m1: { min: 1100, max: 1500, step: 25 }, m2: { min: 1600, max: 2100, step: 25 }, pTotal: { min: 65000, max: 90000, step: 500 }, angleDeg: { min: 20, max: 40, step: 1 } },
    prompt: (p) =>
      `A ${fmt(p.m1)}-kg blue convertible is traveling south, and a ${fmt(p.m2)}-kg red SUV is traveling west. If the total momentum of the system consisting of the two cars is ${fmt(p.pTotal)} kg·m/s directed at ${fmt(p.angleDeg)}° west of south, what is the speed of the SUV?`,
    compute: (p) => ({ value: momentumComponentSpeed(p.pTotal, toRad(90 - p.angleDeg), p.m2), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', text: 'The south (convertible) and west (SUV) momentum components are perpendicular, so each is the total momentum projected onto that axis.' },
      { label: 'Formula', math: 'p_{west} = p_{total}\\sin\\theta,\\quad v_{SUV} = p_{west}/m_{SUV}' },
      { label: 'Answer', math: `v_{SUV} = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_MO19', {
    sourceRef: 'P90',
    topic: 'momentum',
    difficulty: 3,
    params: { m1: { min: 1100, max: 1500, step: 25 }, m2: { min: 1700, max: 2300, step: 25 }, pTotal: { min: 55000, max: 80000, step: 500 }, angleDeg: { min: 45, max: 70, step: 1 } },
    prompt: (p) =>
      `A ${fmt(p.m1)}-kg blue convertible is traveling south, and a ${fmt(p.m2)}-kg red SUV is traveling west. If the total momentum of the system consisting of the two cars is ${fmt(p.pTotal)} kg·m/s directed at ${fmt(p.angleDeg)}° west of south, what is the speed of the convertible?`,
    compute: (p) => ({ value: momentumComponentSpeed(p.pTotal, toRad(p.angleDeg), p.m1), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'p_{south} = p_{total}\\cos\\theta,\\quad v_{conv} = p_{south}/m_{conv}' },
      { label: 'Answer', math: `v_{conv} = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_MO20', {
    sourceRef: 'P91',
    topic: 'momentum',
    difficulty: 3,
    params: { m1: { min: 1150, max: 1500, step: 25 }, m2: { min: 1900, max: 2400, step: 25 }, pTotal: { min: 65000, max: 90000, step: 500 }, angleDeg: { min: 45, max: 70, step: 1 } },
    prompt: (p) =>
      `A ${fmt(p.m1)}-kg blue convertible is traveling south, and a ${fmt(p.m2)}-kg red SUV is traveling west. If the total momentum of the system consisting of the two cars is ${fmt(p.pTotal)} kg·m/s directed at ${fmt(p.angleDeg)}° west of south, what is the speed of the blue convertible?`,
    compute: (p) => ({ value: momentumComponentSpeed(p.pTotal, toRad(p.angleDeg), p.m1), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'p_{south} = p_{total}\\cos\\theta,\\quad v_{conv} = p_{south}/m_{conv}' },
      { label: 'Answer', math: `v_{conv} = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),
]
