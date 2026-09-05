import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import {
  horizontalLaunchImpactAngle,
  horizontalLaunchImpactSpeed,
  horizontalLaunchSpeed,
  projectileHeightBelowLaunch,
  projectileMaxHeight,
  projectileSpeed,
  projectileTimeToMaxHeight,
  projectileX,
  projectileY,
} from '../../physics/projectile'
import { toDeg, toRad } from '../../physics/vectors'

const G = 9.8

export const projectileQuestions = [
  defineQuestion('PHY_PR01', {
    sourceRef: 'P59',
    topic: 'projectile',
    difficulty: 2,
    params: { v0: { min: 250, max: 330, step: 5 }, angleDeg: { min: 50, max: 70, step: 1 }, t: { min: 35, max: 55, step: 1 } },
    prompt: (p) =>
      `To start an avalanche on a mountain slope, an artillery shell is fired with an initial velocity of ${fmt(p.v0)} m/s at ${fmt(p.angleDeg)}° above the horizontal. It explodes on the mountainside ${fmt(p.t)} s after firing. What is the horizontal coordinate of the shell where it explodes relative to its firing point?`,
    compute: (p) => ({ value: projectileX(p.v0, toRad(p.angleDeg), p.t), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'x = v_0\\cos\\theta \\times t' },
      { label: 'Answer', math: `x = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_PR02', {
    sourceRef: 'P60',
    topic: 'projectile',
    difficulty: 2,
    params: { v0: { min: 250, max: 330, step: 5 }, angleDeg: { min: 50, max: 70, step: 1 }, t: { min: 30, max: 48, step: 1 } },
    prompt: (p) =>
      `To start an avalanche on a mountain slope, an artillery shell is fired with an initial velocity of ${fmt(p.v0)} m/s at ${fmt(p.angleDeg)}° above the horizontal. It explodes on the mountainside ${fmt(p.t)} s after firing. What is the vertical distance of the shell where it explodes relative to its firing point?`,
    compute: (p) => ({ value: projectileY(p.v0, toRad(p.angleDeg), p.t, G), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'y = v_0\\sin\\theta \\times t - \\tfrac12 g t^2' },
      { label: 'Answer', math: `y = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_PR03', {
    sourceRef: 'P61',
    topic: 'projectile',
    difficulty: 2,
    params: { v0: { min: 250, max: 330, step: 5 }, angleDeg: { min: 50, max: 70, step: 1 }, t: { min: 25, max: 40, step: 1 } },
    prompt: (p) =>
      `To start an avalanche on a mountain slope, an artillery shell is fired with an initial velocity of ${fmt(p.v0)} m/s at ${fmt(p.angleDeg)}° above the horizontal. It explodes on the mountainside ${fmt(p.t)} s after firing. What is the speed of the shell at the moment it explodes? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: projectileSpeed(p.v0, toRad(p.angleDeg), p.t, G), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_x = v_0\\cos\\theta,\\ v_y = v_0\\sin\\theta - gt,\\quad v = \\sqrt{v_x^2+v_y^2}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_PR04', {
    sourceRef: 'P62',
    topic: 'projectile',
    difficulty: 2,
    params: { v0: { min: 4, max: 8, step: 0.5 }, angleDeg: { min: 10, max: 25, step: 1 }, t: { min: 4, max: 6, step: 0.5 } },
    prompt: (p) =>
      `A ball is tossed from an upper-story window of a building. The ball is given an initial velocity of ${fmt(p.v0)} m/s at an angle of ${fmt(p.angleDeg)}° below the horizontal. It strikes the ground ${fmt(p.t)} s later. How far horizontally from the base of the building does the ball strike the ground? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: projectileX(p.v0, toRad(-p.angleDeg), p.t), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'x = v_0\\cos\\theta \\times t' },
      { label: 'Answer', math: `x = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_PR05', {
    sourceRef: 'P63',
    topic: 'projectile',
    difficulty: 2,
    params: { v0: { min: 4, max: 8, step: 0.5 }, angleDeg: { min: 15, max: 28, step: 1 }, t: { min: 4, max: 6, step: 0.5 } },
    prompt: (p) =>
      `A ball is tossed from an upper-story window of a building. The ball is given an initial velocity of ${fmt(p.v0)} m/s at an angle of ${fmt(p.angleDeg)}° below the horizontal. It strikes the ground ${fmt(p.t)} s later. Find the height from which the ball was thrown. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: projectileHeightBelowLaunch(p.v0, toRad(-p.angleDeg), p.t, G), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'h = \\tfrac12 g t^2 - v_0\\sin\\theta \\times t\\ \\ (\\theta\\text{ below horizontal, negative})' },
      { label: 'Answer', math: `h = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_PR06', {
    sourceRef: 'P64',
    topic: 'projectile',
    difficulty: 2,
    params: { v0: { min: 4, max: 8, step: 0.5 }, angleDeg: { min: 15, max: 30, step: 1 }, t: { min: 4.5, max: 6.5, step: 0.5 } },
    prompt: (p) =>
      `A ball is tossed from an upper-story window of a building. The ball is given an initial velocity of ${fmt(p.v0)} m/s at an angle of ${fmt(p.angleDeg)}° above the horizontal. It strikes the ground ${fmt(p.t)} s later. Find the height from which the ball was thrown. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: projectileHeightBelowLaunch(p.v0, toRad(p.angleDeg), p.t, G), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'h = \\tfrac12 g t^2 - v_0\\sin\\theta \\times t' },
      { label: 'Answer', math: `h = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_PR07', {
    sourceRef: 'P65',
    topic: 'projectile',
    difficulty: 2,
    params: { v0: { min: 55, max: 95, step: 1 }, angleDeg: { min: 55, max: 80, step: 1 } },
    prompt: (p) =>
      `During a fireworks display, a shell is shot into the air with an initial speed of ${fmt(p.v0)} m/s at an angle of ${fmt(p.angleDeg)}° above the horizontal. The fuse is timed to ignite the shell just as it reaches its highest point above the ground. Calculate the height at which the shell explodes. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: projectileMaxHeight(p.v0, toRad(p.angleDeg), G), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'h_{max} = \\dfrac{(v_0\\sin\\theta)^2}{2g}' },
      { label: 'Answer', math: `h_{max} = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_PR08', {
    sourceRef: 'P66',
    topic: 'projectile',
    difficulty: 2,
    params: { v0: { min: 55, max: 95, step: 1 }, angleDeg: { min: 55, max: 85, step: 1 } },
    prompt: (p) =>
      `During a fireworks display, a shell is shot into the air with an initial speed of ${fmt(p.v0)} m/s at an angle of ${fmt(p.angleDeg)}° above the horizontal. The fuse is timed to ignite the shell just as it reaches its highest point above the ground. How much time passes between the launch of the shell and the explosion? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: projectileTimeToMaxHeight(p.v0, toRad(p.angleDeg), G), unit: 's', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 't = \\dfrac{v_0\\sin\\theta}{g}' },
      { label: 'Answer', math: `t = ${fmt(answer)}\\text{ s}` },
    ],
  }),

  defineQuestion('PHY_PR09', {
    sourceRef: 'P67',
    topic: 'projectile',
    difficulty: 2,
    params: { v0: { min: 55, max: 95, step: 1 }, angleDeg: { min: 55, max: 85, step: 1 }, t: { min: 1, max: 4, step: 0.5 } },
    prompt: (p) =>
      `During a fireworks display, a shell is shot into the air with an initial speed of ${fmt(p.v0)} m/s at an angle of ${fmt(p.angleDeg)}° above the horizontal. The fuse is timed to ignite the shell ${fmt(p.t)} s after launch. Calculate the height at which the shell explodes. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: projectileY(p.v0, toRad(p.angleDeg), p.t, G), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'y = v_0\\sin\\theta \\times t - \\tfrac12 g t^2' },
      { label: 'Answer', math: `y = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_PR10', {
    sourceRef: 'P68',
    topic: 'projectile',
    difficulty: 2,
    params: { x: { min: 1, max: 2.2, step: 0.05 }, h: { min: 0.6, max: 1, step: 0.01 } },
    prompt: (p) =>
      `In a local café, a customer slides an empty mug down the counter for a refill. The mug slides off the counter and strikes the floor x = ${fmt(p.x)} m from the base of the counter. If the height of the counter is y = ${fmt(p.h * 100)} cm, what is the magnitude of the velocity with which the mug left the counter? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: horizontalLaunchSpeed(p.x, p.h, G), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 't = \\sqrt{2h/g},\\quad v_0 = x/t' },
      { label: 'Answer', math: `v_0 = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_PR11', {
    sourceRef: 'P69',
    topic: 'projectile',
    difficulty: 2,
    params: { x: { min: 1, max: 2.2, step: 0.05 }, h: { min: 0.6, max: 1, step: 0.01 } },
    prompt: (p) =>
      `In a local café, a customer slides an empty mug down the counter for a refill. The mug slides off the counter and strikes the floor xᶠ = ${fmt(p.x)} m from the base of the counter. The height of the counter is yᵢ = ${fmt(p.h * 100)} cm. What is the magnitude of the velocity with which the mug strikes the floor? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: horizontalLaunchImpactSpeed(p.x, p.h, G), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 't = \\sqrt{2h/g},\\ v_x = x/t,\\ v_y = gt,\\quad v = \\sqrt{v_x^2+v_y^2}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_PR12', {
    sourceRef: 'P70',
    topic: 'projectile',
    difficulty: 2,
    params: { x: { min: 1, max: 2.4, step: 0.05 }, h: { min: 0.6, max: 1, step: 0.01 } },
    prompt: (p) =>
      `In a local café, a customer slides an empty mug down the counter for a refill. The mug slides off the counter and strikes the floor xᶠ = ${fmt(p.x)} m from the base of the counter. The height of the counter is yᵢ = ${fmt(p.h * 100)} cm. At what angle below the horizontal does the mug strike the floor? Give the answer in degrees. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: toDeg(horizontalLaunchImpactAngle(p.x, p.h, G)), unit: '°', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\theta = \\tan^{-1}(v_y/v_x)' },
      { label: 'Answer', math: `\\theta = ${fmt(answer)}°` },
    ],
  }),
]
