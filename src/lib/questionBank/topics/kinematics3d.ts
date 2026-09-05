import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import { accelFromVelocities, accelMagnitudeFromVelocities, positionConstAccel, rocketState } from '../../physics/kinematics3d'
import { magnitude, toDeg, v3 } from '../../physics/vectors'

export const kinematics3dQuestions = [
  defineQuestion('PHY_K3D_01', {
    sourceRef: 'P71',
    topic: 'kinematics3d',
    difficulty: 3,
    params: {
      alpha: { min: 1.8, max: 2.8, step: 0.1 }, beta: { min: 6, max: 10, step: 0.5 }, gamma: { min: 1, max: 2, step: 0.1 },
      v0x: { min: 1, max: 3, step: 0.1 }, v0y: { min: 3, max: 8, step: 0.5 }, t: { min: 5, max: 9, step: 1 },
    },
    prompt: (p) =>
      `A rocket moves in the xy-plane. The rocket's acceleration has components aₓ(t) = αt² and a_y(t) = β - γt, where α = ${fmt(p.alpha)} m/s⁴, β = ${fmt(p.beta)} m/s², and γ = ${fmt(p.gamma)} m/s³. At t = 0 the rocket is at the origin and has velocity v₀ = v₀ₓi + v₀yj, with v₀ₓ = ${fmt(p.v0x)} m/s and v₀y = ${fmt(p.v0y)} m/s. Calculate the position of the rocket along the vertical axis at t = ${fmt(p.t)} s.`,
    compute: (p) => ({ value: rocketState(p.alpha, p.beta, p.gamma, p.v0x, p.v0y, p.t).y, unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'y(t) = v_{0y}t + \\tfrac12\\beta t^2 - \\tfrac16\\gamma t^3' },
      { label: 'Answer', math: `y = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_K3D_02', {
    sourceRef: 'P72',
    topic: 'kinematics3d',
    difficulty: 3,
    params: {
      alpha: { min: 1.5, max: 2.5, step: 0.1 }, beta: { min: 6, max: 10, step: 0.5 }, gamma: { min: 1, max: 2, step: 0.1 },
      v0x: { min: 1, max: 3, step: 0.1 }, v0y: { min: 4, max: 9, step: 0.5 }, t: { min: 3, max: 6, step: 1 },
    },
    prompt: (p) =>
      `A rocket moves in the xy-plane. The rocket's acceleration has components aₓ(t) = αt² and a_y(t) = β - γt, where α = ${fmt(p.alpha)} m/s⁴, β = ${fmt(p.beta)} m/s², and γ = ${fmt(p.gamma)} m/s³. At t = 0 the rocket is at the origin and has velocity v₀ = v₀ₓi + v₀yj, with v₀ₓ = ${fmt(p.v0x)} m/s and v₀y = ${fmt(p.v0y)} m/s. Calculate the position of the rocket along the horizontal axis at t = ${fmt(p.t)} s.`,
    compute: (p) => ({ value: rocketState(p.alpha, p.beta, p.gamma, p.v0x, p.v0y, p.t).x, unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'x(t) = v_{0x}t + \\tfrac{1}{12}\\alpha t^4' },
      { label: 'Answer', math: `x = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_K3D_03', {
    sourceRef: 'P73',
    topic: 'kinematics3d',
    difficulty: 3,
    params: {
      alpha: { min: 1.8, max: 2.6, step: 0.1 }, beta: { min: 7, max: 10, step: 0.5 }, gamma: { min: 0.8, max: 1.6, step: 0.1 },
      v0x: { min: 1, max: 2.5, step: 0.1 }, v0y: { min: 5, max: 9, step: 0.5 }, t: { min: 3, max: 5, step: 0.5 },
    },
    prompt: (p) =>
      `A rocket moves in the xy-plane. The rocket's acceleration has components aₓ(t) = αt² and a_y(t) = β - γt, where α = ${fmt(p.alpha)} m/s⁴, β = ${fmt(p.beta)} m/s², and γ = ${fmt(p.gamma)} m/s³. At t = 0 the rocket is at the origin and has velocity v₀ = v₀ₓi + v₀yj, with v₀ₓ = ${fmt(p.v0x)} m/s and v₀y = ${fmt(p.v0y)} m/s. Calculate the magnitude of the velocity at t = ${fmt(p.t)} s.`,
    compute: (p) => {
      const { vx, vy } = rocketState(p.alpha, p.beta, p.gamma, p.v0x, p.v0y, p.t)
      return { value: Math.hypot(vx, vy), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_x = v_{0x}+\\tfrac13\\alpha t^3,\\ v_y = v_{0y}+\\beta t - \\tfrac12\\gamma t^2' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_K3D_04', {
    sourceRef: 'P74',
    topic: 'kinematics3d',
    difficulty: 2,
    params: {
      vix: { min: -6, max: -2, step: 1 }, viy: { min: 2, max: 6, step: 1 },
      vfx: { min: -4, max: 0, step: 1 }, vfy: { min: 5, max: 10, step: 1 }, T: { min: 20, max: 32, step: 1 },
    },
    prompt: (p) =>
      `A fish swimming in a horizontal plane has velocity v = ${fmt(p.vix)}i + ${fmt(p.viy)}j m/s at a point in the ocean. After the fish swims with constant acceleration for ${fmt(p.T)} s, its velocity is v = ${fmt(p.vfx)}i + ${fmt(p.vfy)}j m/s. What is the magnitude of the acceleration?`,
    compute: (p) => ({
      value: accelMagnitudeFromVelocities(v3(p.vix, p.viy), v3(p.vfx, p.vfy), p.T),
      unit: 'm/s²',
      tolerance: { mode: 'relative', value: 0.01 },
    }),
    solution: (_p, answer) => [
      { label: 'Formula', math: '\\vec a = \\dfrac{\\vec v_f - \\vec v_i}{T},\\quad |\\vec a|' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ m/s}^2` },
    ],
  }),

  defineQuestion('PHY_K3D_05', {
    sourceRef: 'P75',
    topic: 'kinematics3d',
    difficulty: 2,
    params: {
      vix: { min: -6, max: -3, step: 1 }, viy: { min: 0, max: 3, step: 1 },
      vfx: { min: 2, max: 6, step: 1 }, vfy: { min: 6, max: 12, step: 1 }, T: { min: 20, max: 32, step: 1 },
    },
    constraints: (p) => Math.abs(p.vfx - p.vix) > 1 && Math.abs(p.vfy - p.viy) > 1,
    prompt: (p) =>
      `A fish swimming in a horizontal plane has velocity vᵢ = ${fmt(p.vix)}i + ${fmt(p.viy)}j m/s at a point in the ocean. After the fish swims with constant acceleration for ${fmt(p.T)} s, its velocity is v = ${fmt(p.vfx)}i + ${fmt(p.vfy)}j m/s. What is the angle of the acceleration vector, measured counterclockwise from the +x axis? Give the answer in degrees.`,
    compute: (p) => {
      const a = accelFromVelocities(v3(p.vix, p.viy), v3(p.vfx, p.vfy), p.T)
      return { value: toDeg(Math.atan2(a.y, a.x)), unit: '°', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (_p, answer) => [
      { label: 'Formula', math: '\\theta = \\operatorname{atan2}(a_y, a_x)' },
      { label: 'Answer', math: `\\theta = ${fmt(answer)}°` },
    ],
  }),

  defineQuestion('PHY_K3D_06', {
    sourceRef: 'P76',
    topic: 'kinematics3d',
    difficulty: 3,
    params: {
      rix: { min: -8, max: -4, step: 1 }, riy: { min: 2, max: 6, step: 1 },
      vix: { min: 1, max: 4, step: 1 }, viy: { min: 4, max: 8, step: 1 },
      vfx: { min: -4, max: -1, step: 1 }, vfy: { min: 1, max: 4, step: 1 }, T: { min: 10, max: 16, step: 1 }, t: { min: 25, max: 40, step: 1 },
    },
    prompt: (p) =>
      `A fish swimming in a horizontal plane has velocity vᵢ = ${fmt(p.vix)}i + ${fmt(p.viy)}j m/s at a point in the ocean where the position relative to a certain rock is r = ${fmt(p.rix)}i + ${fmt(p.riy)}j m. After the fish swims with constant acceleration for ${fmt(p.T)} s, its velocity is v = ${fmt(p.vfx)}i + ${fmt(p.vfy)}j m/s. If the fish maintains constant acceleration, what is its horizontal position at t = ${fmt(p.t)} s?`,
    compute: (p) => {
      const a = accelFromVelocities(v3(p.vix, p.viy), v3(p.vfx, p.vfy), p.T)
      const r = positionConstAccel(v3(p.rix, p.riy), v3(p.vix, p.viy), a, p.t)
      return { value: r.x, unit: 'm', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (_p, answer) => [
      { label: 'Formula', math: '\\vec a = \\dfrac{\\vec v_f-\\vec v_i}{T},\\quad x(t) = r_{ix} + v_{ix}t + \\tfrac12 a_x t^2' },
      { label: 'Answer', math: `x = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_K3D_07', {
    sourceRef: 'P77',
    topic: 'kinematics3d',
    difficulty: 3,
    params: {
      rix: { min: 2, max: 6, step: 1 }, riy: { min: 2, max: 6, step: 1 },
      vix: { min: 1, max: 4, step: 1 }, viy: { min: 0, max: 3, step: 1 },
      vfx: { min: 5, max: 9, step: 1 }, vfy: { min: 5, max: 9, step: 1 }, T: { min: 10, max: 16, step: 1 }, t: { min: 22, max: 34, step: 1 },
    },
    prompt: (p) =>
      `A fish swimming in a horizontal plane has velocity vᵢ = ${fmt(p.vix)}i + ${fmt(p.viy)}j m/s at a point in the ocean where the position relative to a certain rock is r = ${fmt(p.rix)}i + ${fmt(p.riy)}j m. After the fish swims with constant acceleration for ${fmt(p.T)} s, its velocity is v = ${fmt(p.vfx)}i + ${fmt(p.vfy)}j m/s. If the fish maintains constant acceleration, what is its vertical position at t = ${fmt(p.t)} s?`,
    compute: (p) => {
      const a = accelFromVelocities(v3(p.vix, p.viy), v3(p.vfx, p.vfy), p.T)
      const r = positionConstAccel(v3(p.rix, p.riy), v3(p.vix, p.viy), a, p.t)
      return { value: r.y, unit: 'm', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (_p, answer) => [
      { label: 'Formula', math: '\\vec a = \\dfrac{\\vec v_f-\\vec v_i}{T},\\quad y(t) = r_{iy} + v_{iy}t + \\tfrac12 a_y t^2' },
      { label: 'Answer', math: `y = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_K3D_08', {
    sourceRef: 'P78',
    topic: 'kinematics3d',
    difficulty: 2,
    params: { v0x: { min: -5, max: -2, step: 1 }, v0y: { min: -7, max: -3, step: 1 }, ax: { min: 3, max: 7, step: 0.2 }, t: { min: 4, max: 8, step: 1 } },
    prompt: (p) =>
      `A particle starts from the origin at t = 0 with an initial velocity having an x component of ${fmt(p.v0x)} m/s and a y component of ${fmt(p.v0y)} m/s. The particle moves in the xy plane with an x component of acceleration only, given by aₓ = ${fmt(p.ax)} m/s². Determine the distance from the origin at t = ${fmt(p.t)} s.`,
    compute: (p) => {
      const x = p.v0x * p.t + 0.5 * p.ax * p.t * p.t
      const y = p.v0y * p.t
      return { value: Math.hypot(x, y), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'x(t)=v_{0x}t+\\tfrac12 a_x t^2,\\ \\ y(t)=v_{0y}t,\\quad d=\\sqrt{x^2+y^2}' },
      { label: 'Answer', math: `d = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_K3D_09', {
    sourceRef: 'P79',
    topic: 'kinematics3d',
    difficulty: 2,
    params: { v0: { min: 220, max: 290, step: 5 }, ax: { min: -3, max: -1, step: 0.2 }, az: { min: 8, max: 15, step: 0.5 }, t: { min: 2, max: 4, step: 0.5 } },
    prompt: (p) =>
      `A spaceship is traveling at a constant velocity of v = ${fmt(p.v0)}i m/s when its engines fire up, giving it constant acceleration a = ${fmt(p.ax)}i + ${fmt(p.az)}k m/s². What is the magnitude of the spaceship's velocity ${fmt(p.t)} s after the engines fired?`,
    compute: (p) => {
      const vx = p.v0 + p.ax * p.t
      const vz = p.az * p.t
      return { value: Math.hypot(vx, vz), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_x=v_0+a_xt,\\ v_z=a_zt,\\quad v=\\sqrt{v_x^2+v_z^2}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_K3D_10', {
    sourceRef: 'P80',
    topic: 'kinematics3d',
    difficulty: 2,
    params: { v0: { min: 220, max: 290, step: 5 }, ax: { min: -3, max: -1, step: 0.2 }, az: { min: 6, max: 12, step: 0.5 }, t: { min: 2, max: 4, step: 0.5 } },
    prompt: (p) =>
      `A spaceship is traveling at a constant velocity of v = ${fmt(p.v0)}î m/s when its engines fire up, giving it constant acceleration a = ${fmt(p.ax)}î + ${fmt(p.az)}k̂ m/s². What is the magnitude of the spaceship's displacement ${fmt(p.t)} s after the engines fired?`,
    compute: (p) => {
      const dx = p.v0 * p.t + 0.5 * p.ax * p.t * p.t
      const dz = 0.5 * p.az * p.t * p.t
      return { value: magnitude(v3(dx, 0, dz)), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '\\Delta x = v_0 t + \\tfrac12 a_x t^2,\\ \\Delta z = \\tfrac12 a_z t^2' },
      { label: 'Answer', math: `|\\Delta \\vec r| = ${fmt(answer)}\\text{ m}` },
    ],
  }),
]
