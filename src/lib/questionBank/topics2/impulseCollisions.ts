import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import {
  impulseDropBounce,
  impulseElasticBounce,
  impulseObliqueBounce,
  streamForceBounce,
  streamForceEmbed,
} from '../../physics/momentum'
import { magnitude, toRad, v3 } from '../../physics/vectors'

const G = 9.8

export const impulseCollisionsQuestions = [
  defineQuestion('PHY2_IC01', {
    sourceRef: 'P60',
    topic: 'impulseCollisions',
    difficulty: 3,
    params: { m: { min: 55, max: 90, step: 1 }, cordLen: { min: 15, max: 28, step: 0.5 } },
    prompt: (p) =>
      `A bungee jumper leaps off a bridge whose deck is high above the water. Jumper mass is ${fmt(p.m)} kg, the bungee cord is ${fmt(p.cordLen)} m long. Assuming the jumper free-falls exactly the length of the cord before it begins to stretch and pull him back up, what is the magnitude of the impulse exerted on the bungee jumper while the cord stretches (from taut to momentarily at rest)? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const v1 = Math.sqrt(2 * G * p.cordLen)
      return { value: p.m * v1, unit: 'kg m/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'Free fall for the length of the cord gives the speed when the cord goes taut; the stretch phase brings the jumper to rest.' },
      { label: 'Formula', math: 'v_1=\\sqrt{2g L_{cord}},\\quad J = m v_1' },
      { label: 'Answer', math: `J = ${fmt(answer)}\\text{ kg m/s}` },
    ],
  }),

  defineQuestion('PHY2_IC02', {
    sourceRef: 'P61',
    topic: 'impulseCollisions',
    difficulty: 2,
    params: { massG: { min: 250, max: 400, step: 5 }, v: { min: 4, max: 7, step: 0.1 }, angleDeg: { min: 40, max: 65, step: 1 }, t: { min: 0.003, max: 0.008, step: 0.0005 } },
    prompt: (p) =>
      `A ${fmt(p.massG)} g handball moving at a speed of ${fmt(p.v)} m/s strikes a wall at an angle of ${fmt(p.angleDeg)} degree to the normal of the wall and then bounces off with the same speed at the same angle. It is in contact with the wall for ${fmt(p.t)} s. What is the average force exerted by the ball on the wall?`,
    compute: (p) => ({ value: impulseObliqueBounce(p.massG / 1000, p.v, toRad(p.angleDeg)) / p.t, unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = \\dfrac{2mv\\cos\\theta}{t}' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY2_IC03', {
    sourceRef: 'P62',
    topic: 'impulseCollisions',
    difficulty: 1,
    params: { massG: { min: 250, max: 400, step: 5 }, v: { min: 4, max: 7, step: 0.1 }, t: { min: 0.003, max: 0.008, step: 0.0005 } },
    prompt: (p) =>
      `A ${fmt(p.massG)} g handball moving at a speed of ${fmt(p.v)} m/s strikes a wall head-on, perpendicular to its surface, and bounces straight back with the same speed. It is in contact with the wall for ${fmt(p.t)} s. What is the magnitude of the average force exerted by the ball on the wall?`,
    compute: (p) => ({ value: impulseElasticBounce(p.massG / 1000, p.v) / p.t, unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = \\dfrac{2mv}{t}' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY2_IC04', {
    sourceRef: 'P63',
    topic: 'impulseCollisions',
    difficulty: 2,
    params: { massG: { min: 1, max: 2.5, step: 0.1 }, rate: { min: 100, max: 200, step: 5 }, v: { min: 350, max: 500, step: 5 } },
    prompt: (p) =>
      `When a gangster sprays Superman with ${fmt(p.massG)} g bullets at a rate of ${fmt(p.rate)} bullets/min, these bullets simply bounce off Superman's chest with no change in speed of ${fmt(p.v)} m/s. Find the average force exerted by the stream of bullets on Superman's chest.`,
    compute: (p) => ({ value: streamForceBounce(p.massG / 1000, p.rate / 60, p.v), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = \\left(\\dfrac{\\text{rate}}{60}\\right) m \\cdot 2v' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY2_IC05', {
    sourceRef: 'P64',
    topic: 'impulseCollisions',
    difficulty: 2,
    params: { massG: { min: 1, max: 2.5, step: 0.1 }, rate: { min: 100, max: 200, step: 5 }, v: { min: 400, max: 500, step: 5 } },
    prompt: (p) =>
      `When a gangster sprays Superman with ${fmt(p.massG)} g bullets at a rate of ${fmt(p.rate)} bullets/min, the bullets embed themselves in Superman's chest, arriving at a speed of ${fmt(p.v)} m/s. Find the magnitude of the average force exerted by the stream of bullets on Superman's chest.`,
    compute: (p) => ({ value: streamForceEmbed(p.massG / 1000, p.rate / 60, p.v), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = \\left(\\dfrac{\\text{rate}}{60}\\right) m \\cdot v' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY2_IC06', {
    sourceRef: 'P65',
    topic: 'impulseCollisions',
    difficulty: 2,
    params: { massG: { min: 35, max: 65, step: 1 }, h1: { min: 2, max: 3, step: 0.1 }, h2: { min: 1, max: 2, step: 0.1 } },
    constraints: (p) => p.h2 < p.h1,
    prompt: (p) =>
      `A steel ball with mass ${fmt(p.massG)} g is dropped from a height of ${fmt(p.h1)} m onto a horizontal steel slab. The ball rebounds to a height of ${fmt(p.h2)} m. Calculate the magnitude of the impulse delivered to the ball during impact. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: impulseDropBounce(p.massG / 1000, p.h1, p.h2, G), unit: 'kg m/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'J = m(v_{down}+v_{up}) = m(\\sqrt{2gh_1}+\\sqrt{2gh_2})' },
      { label: 'Answer', math: `J = ${fmt(answer)}\\text{ kg m/s}` },
    ],
  }),

  defineQuestion('PHY2_IC07', {
    sourceRef: 'P66',
    topic: 'impulseCollisions',
    difficulty: 1,
    params: { massG: { min: 40, max: 70, step: 1 }, h: { min: 2, max: 3.2, step: 0.1 } },
    prompt: (p) =>
      `A steel ball with mass ${fmt(p.massG)} g is dropped from a height of ${fmt(p.h)} m onto a horizontal slab of soft clay, and it does not rebound. Calculate the magnitude of the impulse delivered to the ball during the impact. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: (p.massG / 1000) * Math.sqrt(2 * G * p.h), unit: 'kg m/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'J = m\\sqrt{2gh}' },
      { label: 'Answer', math: `J = ${fmt(answer)}\\text{ kg m/s}` },
    ],
  }),

  defineQuestion('PHY2_IC08', {
    sourceRef: 'P67',
    topic: 'impulseCollisions',
    difficulty: 2,
    params: { massG: { min: 45, max: 70, step: 1 }, h1: { min: 2, max: 3, step: 0.1 }, h2: { min: 1.2, max: 2, step: 0.1 }, t: { min: 0.0015, max: 0.003, step: 0.0001 } },
    constraints: (p) => p.h2 < p.h1,
    prompt: (p) =>
      `A steel ball with mass ${fmt(p.massG)} g is dropped from a height of ${fmt(p.h1)} m onto a horizontal steel slab. The ball rebounds to a height of ${fmt(p.h2)} m. If the ball is in contact with the slab for ${fmt(p.t * 1000)} ms, find the magnitude of the average force on the ball during impact. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: impulseDropBounce(p.massG / 1000, p.h1, p.h2, G) / p.t, unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = \\dfrac{m(\\sqrt{2gh_1}+\\sqrt{2gh_2})}{t}' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY2_IC09', {
    sourceRef: 'P68',
    topic: 'impulseCollisions',
    difficulty: 2,
    params: { Fx: { min: -420, max: -340, step: 5 }, Fy: { min: 80, max: 130, step: 5 }, t: { min: 0.003, max: 0.005, step: 0.0002 } },
    prompt: (p) =>
      `Just before it is struck by a racket, a tennis ball has some initial velocity. During the ${fmt(p.t * 1000)} ms that the racket and ball are in contact, the net force on the ball is constant and equal to ${fmt(p.Fx)} N î + ${fmt(p.Fy)} N ĵ. What is the magnitude of the impulse of the net force applied to the ball?`,
    compute: (p) => ({ value: magnitude(v3(p.Fx, p.Fy)) * p.t, unit: 'N s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'J = |\\vec F|\\,t' },
      { label: 'Answer', math: `J = ${fmt(answer)}\\text{ N s}` },
    ],
  }),

  defineQuestion('PHY2_IC10', {
    sourceRef: 'P69',
    topic: 'impulseCollisions',
    difficulty: 3,
    params: { weightN: { min: 0.55, max: 0.8, step: 0.02 }, vix: { min: 16, max: 25, step: 0.5 }, viy: { min: -6, max: -2, step: 0.5 }, Fx: { min: -420, max: -350, step: 5 }, Fy: { min: 85, max: 130, step: 5 }, t: { min: 0.0035, max: 0.0045, step: 0.0001 } },
    prompt: (p) =>
      `Just before it is struck by a racket, a tennis ball weighing ${fmt(p.weightN)} N has a velocity of ${fmt(p.vix)} m/s î ${p.viy < 0 ? '-' : '+'} ${fmt(Math.abs(p.viy))} m/s ĵ. During the ${fmt(p.t * 1000)} ms that the racket and ball are in contact, the net force on the ball is constant and equal to ${fmt(p.Fx)} N î + ${fmt(p.Fy)} N ĵ. What is the magnitude of the final velocity of the ball? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const m = p.weightN / G
      const ax = p.Fx / m
      const ay = p.Fy / m
      const vfx = p.vix + ax * p.t
      const vfy = p.viy + ay * p.t
      return { value: magnitude(v3(vfx, vfy)), unit: 'm/s', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (_p, answer) => [
      { label: 'Formula', math: '\\vec v_f = \\vec v_i + \\dfrac{\\vec F}{m}t,\\quad m=W/g' },
      { label: 'Answer', math: `v_f = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_IC11', {
    sourceRef: 'P70',
    topic: 'impulseCollisions',
    difficulty: 2,
    params: { m: { min: 0.35, max: 0.7, step: 0.02 }, h: { min: 1.6, max: 2.6, step: 0.1 }, retain: { min: 0.65, max: 0.85, step: 0.01 } },
    prompt: (p) =>
      `A rubber ball of mass ${fmt(p.m)} kg is released from rest at height ${fmt(p.h)} m above the floor. After its first bounce, it rises to ${fmt(p.retain * 100)}% of its original height. What impulse does the floor exert on this ball during its first bounce? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: impulseDropBounce(p.m, p.h, p.retain * p.h, G), unit: 'N s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'J = m(\\sqrt{2gh}+\\sqrt{2g\\cdot r h})' },
      { label: 'Answer', math: `J = ${fmt(answer)}\\text{ N s}` },
    ],
  }),

  defineQuestion('PHY2_IC12', {
    sourceRef: 'P71',
    topic: 'impulseCollisions',
    difficulty: 1,
    params: { m: { min: 0.3, max: 0.6, step: 0.02 }, h: { min: 1.8, max: 2.8, step: 0.1 }, retain: { min: 0.75, max: 0.9, step: 0.01 } },
    prompt: (p) =>
      `A rubber ball of mass ${fmt(p.m)} kg is released from rest at a height of ${fmt(p.h)} m above the floor. After its first bounce, it rises to ${fmt(p.retain * 100)}% of its original height. What fraction of its kinetic energy does the ball lose during the bounce?`,
    compute: (p) => ({ value: 1 - p.retain, unit: '', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', text: 'KE just after the bounce is proportional to the rebound height, so the lost fraction is simply 1 minus the height ratio.' },
      { label: 'Formula', math: '\\text{fraction lost} = 1 - h_2/h_1' },
      { label: 'Answer', math: `${fmt(answer)}` },
    ],
  }),
]
