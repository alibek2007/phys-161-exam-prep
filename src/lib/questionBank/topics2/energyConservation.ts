import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import {
  atwoodHeavierMass,
  bounceEnergyLoss,
  loopBottomSpeedFromMinHeight,
  maxHeightUpRoughIncline,
  minLoopHeight,
  muFromFrictionStop,
  speedAlongFrictionSlide,
  speedFromFreeFall,
  stopDistanceUpRoughIncline,
} from '../../physics/energy'
import { speedFromSpring } from '../../physics/work'
import { toRad } from '../../physics/vectors'

const G = 9.8

export const energyConservationQuestions = [
  defineQuestion('PHY2_EC01', {
    sourceRef: 'P36',
    topic: 'energyConservation',
    difficulty: 3,
    params: { v: { min: 2.5, max: 4, step: 0.1 }, h: { min: 1, max: 2, step: 0.1 }, M: { min: 10, max: 18, step: 0.5 } },
    prompt: (p) =>
      `Two blocks with different mass are attached to either end of a light rope that passes over a light, frictionless pulley suspended from the ceiling. The masses are released from rest, and the more massive one starts to descend. After this block has descended ${fmt(p.h)} m, its speed is ${fmt(p.v)} m/s. If the total mass of the two blocks is ${fmt(p.M)} kg, what is the mass of the more massive block? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: atwoodHeavierMass(p.v, p.h, p.M, G), unit: 'kg', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\tfrac12 M v^2 = (2m_1-M)gh \\Rightarrow m_1 = \\dfrac{1}{2}\\left(\\dfrac{Mv^2}{2gh}+M\\right)' },
      { label: 'Answer', math: `m_1 = ${fmt(answer)}\\text{ kg}` },
    ],
  }),

  defineQuestion('PHY2_EC02', {
    sourceRef: 'P37',
    topic: 'energyConservation',
    difficulty: 3,
    params: { v: { min: 2.5, max: 4, step: 0.1 }, h: { min: 1, max: 2, step: 0.1 }, M: { min: 10, max: 18, step: 0.5 } },
    prompt: (p) =>
      `Two blocks with different mass are attached to either end of a light rope that passes over a light, frictionless pulley suspended from the ceiling. The masses are released from rest, and the more massive one starts to descend. After this block has descended ${fmt(p.h)} m, its speed is ${fmt(p.v)} m/s. If the total mass of the two blocks is ${fmt(p.M)} kg, what is the mass of the less massive block? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: p.M - atwoodHeavierMass(p.v, p.h, p.M, G), unit: 'kg', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'm_2 = M - m_1' },
      { label: 'Answer', math: `m_2 = ${fmt(answer)}\\text{ kg}` },
    ],
  }),

  defineQuestion('PHY2_EC03', {
    sourceRef: 'P38',
    topic: 'energyConservation',
    difficulty: 3,
    params: { mBucket: { min: 45, max: 75, step: 1 } },
    prompt: (p) =>
      `At a construction site, a ${fmt(p.mBucket)}-kg bucket of concrete hangs from a light strong cable that passes over a light friction-free pulley and is connected to a box on a horizontal roof, on top of which sits a bag of gravel. The system stays at rest. Find the magnitude of the friction force that the roof exerts on the box.`,
    compute: (p) => ({ value: p.mBucket * G, unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', text: 'Checking against the maximum available static friction confirms the system stays at rest, so friction exactly balances the cable tension.' },
      { label: 'Formula', math: 'f = T = m_{bucket}\\,g' },
      { label: 'Answer', math: `f = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p38-39.png' } }),
  }),

  defineQuestion('PHY2_EC04', {
    sourceRef: 'P39',
    topic: 'energyConservation',
    difficulty: 3,
    params: { mBucket: { min: 45, max: 75, step: 1 }, mBox: { min: 65, max: 95, step: 1 }, muK: { min: 0.4, max: 0.5, step: 0.01 }, h: { min: 1.5, max: 2.8, step: 0.1 } },
    prompt: (p) =>
      `At a construction site, a ${fmt(p.mBucket)}-kg bucket of concrete hangs from a light strong cable that passes over a light friction-free pulley and is connected to an ${fmt(p.mBox)}-kg box on a horizontal roof (coefficient of kinetic friction ${fmt(p.muK)} between the box and the roof). Find the speed of the bucket after it has descended ${fmt(p.h)} m from rest.`,
    compute: (p) => {
      const a = (p.mBucket * G - p.muK * p.mBox * G) / (p.mBucket + p.mBox)
      return { value: Math.sqrt(2 * Math.max(a, 0) * p.h), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'a = \\dfrac{m_{bucket}g-\\mu m_{box}g}{m_{bucket}+m_{box}},\\quad v = \\sqrt{2ah}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p38-39.png' } }),
  }),

  defineQuestion('PHY2_EC05', {
    sourceRef: 'P40',
    topic: 'energyConservation',
    difficulty: 2,
    params: { m: { min: 0.5, max: 2, step: 0.1 }, k: { min: 350, max: 550, step: 10 }, x: { min: 0.08, max: 0.18, step: 0.01 }, angleDeg: { min: 30, max: 45, step: 1 } },
    prompt: (p) =>
      `A ${fmt(p.m)} kg block is pushed against a spring with negligible mass and force constant k = ${fmt(p.k)} N/m, compressing it ${fmt(p.x)} m. When the block is released, it moves along a frictionless incline with slope ${fmt(p.angleDeg)}˚. How far does the block travel up the incline before starting to slide back down? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: (p.k * p.x * p.x) / (2 * p.m * G * Math.sin(toRad(p.angleDeg))), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\tfrac12 k x^2 = mgd\\sin\\theta \\Rightarrow d = \\dfrac{kx^2}{2mg\\sin\\theta}' },
      { label: 'Answer', math: `d = ${fmt(answer)}\\text{ m}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p40-41.png' } }),
  }),

  defineQuestion('PHY2_EC06', {
    sourceRef: 'P41',
    topic: 'energyConservation',
    difficulty: 2,
    params: { m: { min: 1, max: 3, step: 0.1 }, k: { min: 350, max: 500, step: 10 }, x: { min: 0.06, max: 0.15, step: 0.01 }, angleDeg: { min: 25, max: 40, step: 1 } },
    prompt: (p) =>
      `A ${fmt(p.m)} kg block is pushed against a spring with negligible mass and force constant k = ${fmt(p.k)} N/m, compressing it ${fmt(p.x)} m. When the block is released, it moves along a frictionless incline with slope ${fmt(p.angleDeg)}°. What is the speed of the block at the instant it loses contact with the spring? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: speedFromSpring(p.k, p.x, p.m), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', text: 'The block leaves the spring right when it returns to its natural length, so all spring energy has gone into kinetic energy at that instant.' },
      { label: 'Formula', math: 'v = x\\sqrt{k/m}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p40-41.png' } }),
  }),

  defineQuestion('PHY2_EC07', {
    sourceRef: 'P42',
    topic: 'energyConservation',
    difficulty: 1,
    params: { m: { min: 1, max: 5, step: 0.5 }, k: { min: 350, max: 500, step: 10 }, x: { min: 0.15, max: 0.3, step: 0.01 } },
    prompt: (p) =>
      `A ${fmt(p.m)} kg block is pushed against a spring with negligible mass and force constant k = ${fmt(p.k)} N/m, compressing it ${fmt(p.x)} m (1 in the figure). When the block is released, it moves along a frictionless surface (2 in the figure). What is the speed of the block as it slides along the horizontal surface, having left the spring?`,
    compute: (p) => ({ value: speedFromSpring(p.k, p.x, p.m), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\tfrac12 kx^2 = \\tfrac12 mv^2 \\Rightarrow v = x\\sqrt{k/m}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p42-50-51.png' } }),
  }),

  defineQuestion('PHY2_EC08', {
    sourceRef: 'P43',
    topic: 'energyConservation',
    difficulty: 1,
    params: { h: { min: 10, max: 28, step: 0.5 } },
    prompt: (p) =>
      `On the way up the hill, a car shows the sign of "fuel starvation". To reach the top of the hill of ${fmt(p.h)} m high, calculate how fast the car must be moving. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: speedFromFreeFall(p.h, G), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\tfrac12 mv^2 = mgh \\Rightarrow v = \\sqrt{2gh}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_EC09', {
    sourceRef: 'P44',
    topic: 'energyConservation',
    difficulty: 2,
    params: { m: { min: 25, max: 50, step: 1 }, E: { min: 300, max: 500, step: 10 }, D: { min: 4, max: 6, step: 0.2 }, d2: { min: 1, max: 3, step: 0.2 } },
    constraints: (p) => p.d2 < p.D,
    prompt: (p) =>
      `On a horizontal surface, a crate with mass ${fmt(p.m)} kg is placed against a spring that stores ${fmt(p.E)} J of energy. The spring is released, and the crate slides ${fmt(p.D)} m before coming to rest due to friction. What is the speed of the crate when it is ${fmt(p.d2)} m from its initial position?`,
    compute: (p) => ({ value: speedAlongFrictionSlide(p.E, p.D, p.d2, p.m), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v = \\sqrt{\\dfrac{2E}{m}\\left(1-\\dfrac{d}{D}\\right)}\\ \\ (\\text{friction removes energy uniformly with distance})' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_EC10', {
    sourceRef: 'P45',
    topic: 'energyConservation',
    difficulty: 2,
    params: { m: { min: 30, max: 55, step: 1 }, E: { min: 350, max: 550, step: 10 }, D: { min: 4.5, max: 6.5, step: 0.2 }, d2: { min: 1, max: 3, step: 0.2 } },
    constraints: (p) => p.d2 < p.D,
    prompt: (p) =>
      `On a horizontal surface, a crate with mass ${fmt(p.m)} kg is placed against a spring that stores ${fmt(p.E)} J of energy. The spring is released, and the crate slides ${fmt(p.D)} m before coming to rest. What is the speed of the crate when it is ${fmt(p.d2)} m from its initial position?`,
    compute: (p) => ({ value: speedAlongFrictionSlide(p.E, p.D, p.d2, p.m), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v = \\sqrt{\\dfrac{2E}{m}\\left(1-\\dfrac{d}{D}\\right)}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_EC11', {
    sourceRef: 'P46',
    topic: 'energyConservation',
    difficulty: 2,
    params: { h: { min: 0.4, max: 1, step: 0.02 }, L: { min: 0.8, max: 1.6, step: 0.05 }, mu: { min: 0.1, max: 0.25, step: 0.01 } },
    prompt: (p) =>
      `A block is dropped from a height h = ${fmt(p.h * 100)} cm on the left elevated end of a small track with frictionless curved sections and a flat central part of L = ${fmt(p.L)} m length, where the coefficient of kinetic friction is ${fmt(p.mu)}. What is the highest point the block can reach on the right elevated end of the track?`,
    compute: (p) => ({ value: Math.max(p.h - p.mu * p.L, 0), unit: 'm', tolerance: { mode: 'relative', value: 0.02 } }),
    solution: (p, answer) => [
      { label: 'Given', text: 'Only the flat section has friction; the curved sections are frictionless, so mass and g cancel out entirely.' },
      { label: 'Formula', math: "h' = h - \\mu L" },
      { label: 'Answer', math: `h' = ${fmt(answer)}\\text{ m}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p46.png' } }),
  }),

  defineQuestion('PHY2_EC12', {
    sourceRef: 'P47',
    topic: 'energyConservation',
    difficulty: 1,
    params: { m: { min: 12, max: 30, step: 1 }, vA: { min: 8, max: 16, step: 0.5 }, h: { min: 25, max: 55, step: 1 } },
    prompt: (p) =>
      `A ${fmt(p.m)} kg stone slides down a snow-covered hill, leaving point A with a speed of ${fmt(p.vA)} m/s as shown in the figure. There is no friction on the hill between points A and B. The height of the hill is ${fmt(p.h)} m. What is the speed of the stone when it reaches point B? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: Math.sqrt(p.vA * p.vA + 2 * G * p.h), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_B = \\sqrt{v_A^2+2gh}' },
      { label: 'Answer', math: `v_B = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p47.png' } }),
  }),

  defineQuestion('PHY2_EC13', {
    sourceRef: 'P48',
    topic: 'energyConservation',
    difficulty: 1,
    params: { m: { min: 1.5, max: 4, step: 0.1 }, h: { min: 12, max: 25, step: 0.5 } },
    prompt: (p) =>
      `A ${fmt(p.m)} kg watermelon is dropped from rest from the roof of a ${fmt(p.h)} m tall building and feels no appreciable air resistance. Just before it strikes the ground, what is the watermelon's kinetic energy? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: p.m * G * p.h, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'KE = mgh' },
      { label: 'Answer', math: `KE = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_EC14', {
    sourceRef: 'P49',
    topic: 'energyConservation',
    difficulty: 1,
    params: { m: { min: 2, max: 5, step: 0.1 }, h: { min: 15, max: 28, step: 0.5 } },
    prompt: (p) =>
      `A ${fmt(p.m)} kg watermelon is dropped from rest from the roof of a ${fmt(p.h)} m tall building and feels no appreciable air resistance. Just before it strikes the ground, what is the watermelon's speed? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: speedFromFreeFall(p.h, G), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v = \\sqrt{2gh}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_EC15', {
    sourceRef: 'P50',
    topic: 'energyConservation',
    difficulty: 2,
    params: { m: { min: 0.5, max: 2, step: 0.1 }, x: { min: 0.15, max: 0.28, step: 0.01 }, k: { min: 120, max: 200, step: 5 }, d: { min: 1.2, max: 2.2, step: 0.1 } },
    prompt: (p) =>
      `A block with mass ${fmt(p.m)} kg is forced against a horizontal spring of negligible mass, compressing the spring a distance of ${fmt(p.x)} m. When released, the block moves on a horizontal tabletop for ${fmt(p.d)} m before coming to rest. The spring constant k is ${fmt(p.k)} N/m. What is the coefficient of kinetic friction µₖ between the block and the table? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: muFromFrictionStop(0.5 * p.k * p.x * p.x, p.d, p.m, G), unit: '', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\tfrac12 kx^2 = \\mu mgd \\Rightarrow \\mu = \\dfrac{kx^2}{2mgd}' },
      { label: 'Answer', math: `\\mu = ${fmt(answer)}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p42-50-51.png' } }),
  }),

  defineQuestion('PHY2_EC16', {
    sourceRef: 'P51',
    topic: 'energyConservation',
    difficulty: 2,
    params: { m: { min: 1, max: 2.5, step: 0.1 }, x: { min: 0.15, max: 0.26, step: 0.01 }, k: { min: 110, max: 180, step: 5 }, mu: { min: 0.15, max: 0.3, step: 0.01 } },
    prompt: (p) =>
      `A block with mass ${fmt(p.m)} kg is forced against a horizontal spring of negligible mass, compressing the spring a distance of ${fmt(p.x)} m. The spring constant k is ${fmt(p.k)} N/m. When released, the block moves on a horizontal tabletop whose coefficient of kinetic friction with the block is ${fmt(p.mu)}. How far does the block travel before coming to rest? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: (p.k * p.x * p.x) / (2 * p.mu * p.m * G), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\tfrac12 kx^2 = \\mu mgd \\Rightarrow d = \\dfrac{kx^2}{2\\mu mg}' },
      { label: 'Answer', math: `d = ${fmt(answer)}\\text{ m}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p42-50-51.png' } }),
  }),

  defineQuestion('PHY2_EC17', {
    sourceRef: 'P52',
    topic: 'energyConservation',
    difficulty: 1,
    params: { massG: { min: 500, max: 900, step: 10 }, h: { min: 1.8, max: 2.8, step: 0.05 }, retain: { min: 0.6, max: 0.8, step: 0.01 } },
    prompt: (p) =>
      `A ${fmt(p.massG)}-gram rubber ball is dropped from an initial height of ${fmt(p.h)} m, and on each bounce it returns to ${fmt(p.retain * 100)}% of its previous height. Find the amount (the absolute value) of the mechanical energy that the ball loses during its first bounce. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: bounceEnergyLoss(p.massG / 1000, G, p.h, p.retain * p.h), unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\Delta E = mg(h-r h)' },
      { label: 'Answer', math: `\\Delta E = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_EC18', {
    sourceRef: 'P53',
    topic: 'energyConservation',
    difficulty: 2,
    params: { massG: { min: 550, max: 950, step: 10 }, h: { min: 2, max: 3, step: 0.05 }, retain: { min: 0.55, max: 0.7, step: 0.01 } },
    prompt: (p) =>
      `A ${fmt(p.massG)}-gram rubber ball is dropped from an initial height of ${fmt(p.h)} m, and on each bounce it returns to ${fmt(p.retain * 100)}% of its previous height. Find the amount (the absolute value) of the mechanical energy that the ball loses during its second bounce. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const h1 = p.retain * p.h
      const h2 = p.retain * h1
      return { value: bounceEnergyLoss(p.massG / 1000, G, h1, h2), unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '\\Delta E = mg(rh - r^2h)' },
      { label: 'Answer', math: `\\Delta E = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_EC19', {
    sourceRef: 'P54',
    topic: 'energyConservation',
    difficulty: 2,
    params: { R: { min: 10, max: 20, step: 0.5 } },
    prompt: (p) =>
      `A car in an amusement park ride rolls without friction around the track. It starts from rest at point A at a height h above the bottom of the loop. The radius of the loop is ${fmt(p.R)} m. What is the minimum value of h such that the car moves around the loop without falling off at the top (point B)?`,
    compute: (p) => ({ value: minLoopHeight(p.R), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'h_{min} = 2.5R\\ \\ (\\text{top speed } v_{top}=\\sqrt{gR})' },
      { label: 'Answer', math: `h_{min} = ${fmt(answer)}\\text{ m}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p54-55.png' } }),
  }),

  defineQuestion('PHY2_EC20', {
    sourceRef: 'P55',
    topic: 'energyConservation',
    difficulty: 2,
    params: { R: { min: 12, max: 22, step: 0.5 } },
    prompt: (p) =>
      `A car in an amusement park ride rolls without friction around a vertical loop of radius ${fmt(p.R)} m. It starts from rest at the minimum height that allows it to maintain contact with the track at the top of the loop. What is the speed of the car at the bottom of the loop? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: loopBottomSpeedFromMinHeight(p.R, G), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_{bottom} = \\sqrt{5gR}' },
      { label: 'Answer', math: `v_{bottom} = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p54-55.png' } }),
  }),

  defineQuestion('PHY2_EC21', {
    sourceRef: 'P56',
    topic: 'energyConservation',
    difficulty: 3,
    params: { m: { min: 20, max: 35, step: 0.5 }, v: { min: 10, max: 18, step: 0.5 }, angleDeg: { min: 32, max: 48, step: 1 }, muS: { min: 0.6, max: 0.85, step: 0.01 }, muK: { min: 0.12, max: 0.28, step: 0.01 } },
    prompt: (p) =>
      `A ${fmt(p.m)}-kg rock approaches the foot of a hill with a speed of ${fmt(p.v)} m/s. The hill slopes upward at a constant angle of ${fmt(p.angleDeg)}° above the horizontal. The coefficients of static and kinetic friction between the hill and the rock are ${fmt(p.muS)} and ${fmt(p.muK)}, respectively. Find the maximum height above the foot of the hill reached by the rock. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: maxHeightUpRoughIncline(p.v, toRad(p.angleDeg), p.muK, G), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'h_{max} = \\dfrac{0.5v^2}{g(1+\\mu_k\\cot\\theta)}' },
      { label: 'Answer', math: `h_{max} = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY2_EC22', {
    sourceRef: 'P57',
    topic: 'energyConservation',
    difficulty: 3,
    params: { m: { min: 22, max: 38, step: 0.5 }, v: { min: 8, max: 15, step: 0.5 }, angleDeg: { min: 28, max: 42, step: 1 }, muK: { min: 0.12, max: 0.26, step: 0.01 } },
    prompt: (p) =>
      `A ${fmt(p.m)}-kg rock approaches the foot of a hill with a speed of ${fmt(p.v)} m/s. The hill slopes upward at a constant angle of ${fmt(p.angleDeg)}° above the horizontal. The coefficient of kinetic friction between the hill and the rock is ${fmt(p.muK)}. Find the distance the rock travels along the incline before coming to a stop. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: stopDistanceUpRoughIncline(p.v, toRad(p.angleDeg), p.muK, G), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'd = \\dfrac{0.5v^2}{g(\\sin\\theta+\\mu_k\\cos\\theta)}' },
      { label: 'Answer', math: `d = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY2_EC23', {
    sourceRef: 'P58',
    topic: 'energyConservation',
    difficulty: 3,
    params: { h1: { min: 55, max: 90, step: 1 }, h2: { min: 40, max: 70, step: 1 }, d: { min: 25, max: 45, step: 1 } },
    constraints: (p) => p.h1 > p.h2 + 5,
    prompt: (p) =>
      `A block slides over a smooth, icy hill. The top of the hill is horizontal and h₁ = ${fmt(p.h1)} m higher than its base. What minimum speed must the block have at the base of the hill so that it will not fall into the pit on the far side of the hill that is h₂ = ${fmt(p.h2)} m above the base? The distance between the top and the far side pit is d = ${fmt(p.d)} m. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const t = Math.sqrt((2 * (p.h1 - p.h2)) / G)
      const v1min = p.d / t
      return { value: Math.sqrt(v1min * v1min + 2 * G * p.h1), unit: 'm/s', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'At the top, the block becomes a projectile; it must clear the horizontal gap d while falling only (h₁-h₂).' },
      { label: 'Formula', math: 't=\\sqrt{2(h_1-h_2)/g},\\ v_1=d/t,\\quad v_0=\\sqrt{v_1^2+2gh_1}' },
      { label: 'Answer', math: `v_0 = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p58-59.png' } }),
  }),

  defineQuestion('PHY2_EC24', {
    sourceRef: 'P59',
    topic: 'energyConservation',
    difficulty: 2,
    params: { m: { min: 2, max: 5, step: 0.2 }, h: { min: 15, max: 32, step: 1 }, vBase: { min: 35, max: 55, step: 0.5 } },
    prompt: (p) =>
      `A ${fmt(p.m)}-kg block slides over a smooth, icy hill. The top of the hill is horizontal and ${fmt(p.h)} m higher than its base. The block has a speed of ${fmt(p.vBase)} m/s at the base of the hill. What is its speed at the top of the hill? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: Math.sqrt(p.vBase * p.vBase - 2 * G * p.h), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_{top} = \\sqrt{v_{base}^2 - 2gh}' },
      { label: 'Answer', math: `v_{top} = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),
]
