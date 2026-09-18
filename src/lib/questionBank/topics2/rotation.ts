import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import { angleFromOmega, timeAtIntervalStart } from '../../physics/rotation'

export const rotationQuestions = [
  defineQuestion('PHY2_RT01', {
    sourceRef: 'P107',
    topic: 'rotation',
    difficulty: 3,
    params: { alpha: { min: 1, max: 2, step: 0.1 }, dTheta: { min: 50, max: 90, step: 1 }, dt: { min: 1, max: 2, step: 0.1 } },
    prompt: (p) =>
      `A wheel starts to rotate from rest with constant angular acceleration of ${fmt(p.alpha)} rad/s². It turns through an angle of ${fmt(p.dTheta)} rad in an interval of ${fmt(p.dt)} s. How long has the wheel been in motion at the start of this interval?`,
    compute: (p) => ({ value: timeAtIntervalStart(p.alpha, p.dt, p.dTheta), unit: 's', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\Delta\\theta = \\tfrac12\\alpha[(t_0+\\Delta t)^2-t_0^2] \\Rightarrow t_0 = \\dfrac{\\Delta\\theta/(0.5\\alpha)-\\Delta t^2}{2\\Delta t}' },
      { label: 'Answer', math: `t_0 = ${fmt(answer)}\\text{ s}` },
    ],
  }),

  defineQuestion('PHY2_RT02', {
    sourceRef: 'P108',
    topic: 'rotation',
    difficulty: 2,
    params: { alpha: { min: 0.8, max: 1.8, step: 0.1 }, omega: { min: 35, max: 55, step: 1 } },
    prompt: (p) =>
      `The rotating blade of a blender turns with constant angular acceleration ${fmt(p.alpha)} rad/s². At some moment of time it reaches an angular velocity of ${fmt(p.omega)} rad/s, starting from rest. Through how many revolutions does the blade turn in this time interval? Provide the answer in decimals.`,
    compute: (p) => ({ value: angleFromOmega(p.omega, p.alpha) / (2 * Math.PI), unit: '', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\theta=\\dfrac{\\omega^2}{2\\alpha},\\quad n=\\dfrac{\\theta}{2\\pi}' },
      { label: 'Answer', math: `n = ${fmt(answer)}` },
    ],
  }),

  defineQuestion('PHY2_RT03', {
    sourceRef: 'P109',
    topic: 'rotation',
    difficulty: 3,
    params: { t1: { min: 1.5, max: 3, step: 0.1 }, w1: { min: 3, max: 6, step: 0.1 }, t2: { min: 10, max: 18, step: 0.5 }, t3: { min: 30, max: 45, step: 1 } },
    constraints: (p) => p.t3 > p.t2 && p.t2 > p.t1,
    prompt: (p) =>
      `A solid wheel undergoes a constant angular acceleration starting from rest at t = 0 s. When t = ${fmt(p.t1)} s, the angular velocity of the wheel is ${fmt(p.w1)} rad/s. The acceleration continues until t = ${fmt(p.t2)} s, when the acceleration abruptly changes to 0 rad/s². Through what angle does the wheel rotate in the interval t = 0 s to t = ${fmt(p.t3)} s?`,
    compute: (p) => {
      const alpha = p.w1 / p.t1
      const theta1 = 0.5 * alpha * p.t2 * p.t2
      const wAtT2 = alpha * p.t2
      const theta2 = wAtT2 * (p.t3 - p.t2)
      return { value: theta1 + theta2, unit: 'rad', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '\\alpha=\\omega_1/t_1,\\ \\theta_1=\\tfrac12\\alpha t_2^2,\\ \\theta_2=(\\alpha t_2)(t_3-t_2)' },
      { label: 'Answer', math: `\\theta = ${fmt(answer)}\\text{ rad}` },
    ],
  }),

  defineQuestion('PHY2_RT04', {
    sourceRef: 'P110',
    topic: 'rotation',
    difficulty: 2,
    params: { t1: { min: 2, max: 3.5, step: 0.1 }, w1: { min: 4, max: 8, step: 0.2 }, t2: { min: 12, max: 20, step: 0.5 }, t3: { min: 18, max: 26, step: 0.5 } },
    constraints: (p) => p.t3 > p.t2 && p.t2 > p.t1,
    prompt: (p) =>
      `A solid wheel undergoes a constant angular acceleration starting from rest at t = 0 s. When t = ${fmt(p.t1)} s, the angular velocity of the wheel is ${fmt(p.w1)} rad/s. The acceleration continues until t = ${fmt(p.t2)} s, when the acceleration abruptly changes to 0 rad/s². What is the angular velocity of the wheel at t = ${fmt(p.t3)} s?`,
    compute: (p) => {
      const alpha = p.w1 / p.t1
      return { value: alpha * p.t2, unit: 'rad/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'After t₂ the acceleration is zero, so ω stays constant at its value at t₂.' },
      { label: 'Formula', math: '\\alpha=\\omega_1/t_1,\\quad \\omega(t_3)=\\alpha t_2' },
      { label: 'Answer', math: `\\omega = ${fmt(answer)}\\text{ rad/s}` },
    ],
  }),

  defineQuestion('PHY2_RT05', {
    sourceRef: 'P111',
    topic: 'rotation',
    difficulty: 3,
    params: { R: { min: 0.25, max: 0.5, step: 0.02 }, M: { min: 1.5, max: 3, step: 0.1 }, V: { min: 1.4, max: 2.4, step: 0.1 }, angleDeg: { min: 25, max: 42, step: 1 }, d: { min: 2.5, max: 4.5, step: 0.1 } },
    prompt: (p) =>
      `A spherically symmetric object with radius R = ${fmt(p.R)} m and mass M = ${fmt(p.M)} kg rolls without slipping across a horizontal floor with velocity V = ${fmt(p.V)} m/s. It then rolls up an incline with an angle of inclination θ = ${fmt(p.angleDeg)}° and comes to rest a distance d = ${fmt(p.d)} m up the incline before reversing direction and rolling back down. Find the moment of inertia of this object about an axis through its center of mass. The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => {
      const g = 9.8
      const theta = (p.angleDeg * Math.PI) / 180
      const energyToHeight = p.M * g * p.d * Math.sin(theta) - 0.5 * p.M * p.V * p.V
      const I = (2 * p.R * p.R * energyToHeight) / (p.V * p.V)
      return { value: I, unit: 'kg m^2', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '\\tfrac12MV^2+\\tfrac12I(V/R)^2 = Mgd\\sin\\theta \\Rightarrow I=\\dfrac{2R^2(Mgd\\sin\\theta-\\tfrac12MV^2)}{V^2}' },
      { label: 'Answer', math: `I = ${fmt(answer)}\\text{ kg m}^2` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p111-112.png' } }),
  }),

  defineQuestion('PHY2_RT06', {
    sourceRef: 'P112',
    topic: 'rotation',
    difficulty: 2,
    params: { R: { min: 0.2, max: 0.4, step: 0.02 }, M: { min: 1.5, max: 3, step: 0.1 }, V: { min: 1.2, max: 2.2, step: 0.1 }, angleDeg: { min: 22, max: 38, step: 1 } },
    prompt: (p) =>
      `A spherically symmetric object with radius R = ${fmt(p.R)} m and mass M = ${fmt(p.M)} kg slides without friction across a horizontal floor with velocity V = ${fmt(p.V)} m/s. It then slides up a frictionless incline with an angle of inclination θ = ${fmt(p.angleDeg)}°. How far along the incline does it travel before coming to rest? The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => {
      const g = 9.8
      const theta = (p.angleDeg * Math.PI) / 180
      return { value: (p.V * p.V) / (2 * g * Math.sin(theta)), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'Sliding (not rolling) and frictionless: this is ordinary 1D energy conservation with no rotational term.' },
      { label: 'Formula', math: 'd = \\dfrac{V^2}{2g\\sin\\theta}' },
      { label: 'Answer', math: `d = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY2_RT07', {
    sourceRef: 'P113',
    topic: 'rotation',
    difficulty: 2,
    params: { factor: { min: 3, max: 5, step: 1 } },
    prompt: (p) =>
      `A safety device brings the blade of a power mower from an initial angular speed ω₁ to rest in 1 revolution. At the same constant acceleration, what angle of rotation would it take the blade to come to rest from an initial angular speed ω₂ that is ${fmt(p.factor)} times as great, ω₂ = ${fmt(p.factor)}ω₁? Provide the answer in units of radian (rad).`,
    compute: (p) => ({ value: p.factor * p.factor * 2 * Math.PI, unit: 'rad', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\theta \\propto \\omega^2 \\Rightarrow \\theta_2 = n^2\\cdot(1\\text{ rev}) = n^2\\cdot 2\\pi\\text{ rad}' },
      { label: 'Answer', math: `\\theta_2 = ${fmt(answer)}\\text{ rad}` },
    ],
  }),

  defineQuestion('PHY2_RT08', {
    sourceRef: 'P114',
    topic: 'rotation',
    difficulty: 3,
    params: { leadDeg: { min: 40, max: 65, step: 1 }, marsYearRatio: { min: 1.7, max: 2.1, step: 0.02 } },
    prompt: (p) =>
      `A rocket is to be launched from earth to Mars, launched when earth and Mars are aligned along a straight line from the sun. If Mars is now ${fmt(p.leadDeg)}° ahead of earth in its orbit around the sun, when should you launch the rocket? All planets orbit the sun in the same direction, 1 year on Mars is ${fmt(p.marsYearRatio)} earth-years, and assume circular orbits for both planets. Taking 1 year = 365 days, provide the answer in units of days (days).`,
    compute: (p) => {
      const wEarth = 360 / 365
      const wMars = 360 / (p.marsYearRatio * 365)
      return { value: p.leadDeg / (wEarth - wMars), unit: 'days', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'Earth (faster, inner orbit) closes the angular gap with Mars at the relative angular rate ω_earth - ω_mars; launch happens once that gap reaches zero.' },
      { label: 'Formula', math: 't = \\dfrac{\\text{lead angle}}{\\omega_{earth}-\\omega_{mars}}' },
      { label: 'Answer', math: `t = ${fmt(answer)}\\text{ days}` },
    ],
  }),

  defineQuestion('PHY2_RT09', {
    sourceRef: 'P115',
    topic: 'rotation',
    difficulty: 2,
    params: { gamma: { min: 2.5, max: 3.8, step: 0.1 }, beta: { min: 0.3, max: 0.6, step: 0.02 }, t: { min: 3, max: 5, step: 0.5 } },
    prompt: (p) =>
      `A roller in a printing press turns through an angle θ(t) given by θ(t) = γt² - βt³, where γ = ${fmt(p.gamma)} rad/s² and β = ${fmt(p.beta)} rad/s³. Calculate the angular velocity of the roller at t = ${fmt(p.t)} s.`,
    compute: (p) => ({ value: 2 * p.gamma * p.t - 3 * p.beta * p.t * p.t, unit: 'rad/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\omega(t) = \\dfrac{d\\theta}{dt} = 2\\gamma t - 3\\beta t^2' },
      { label: 'Answer', math: `\\omega = ${fmt(answer)}\\text{ rad/s}` },
    ],
  }),

  defineQuestion('PHY2_RT10', {
    sourceRef: 'P116',
    topic: 'rotation',
    difficulty: 2,
    params: { gamma: { min: 2.4, max: 3.4, step: 0.1 }, beta: { min: 0.3, max: 0.5, step: 0.02 }, t: { min: 2.5, max: 4, step: 0.5 } },
    prompt: (p) =>
      `A roller in a printing press turns through an angle θ(t) given by θ(t) = γt² - βt³, where γ = ${fmt(p.gamma)} rad/s² and β = ${fmt(p.beta)} rad/s³. Calculate the average angular velocity of the roller between t = 0 and t = ${fmt(p.t)} s.`,
    compute: (p) => {
      const theta = p.gamma * p.t * p.t - p.beta * p.t ** 3
      return { value: theta / p.t, unit: 'rad/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '\\bar\\omega = \\dfrac{\\theta(t)-\\theta(0)}{t} = \\gamma t - \\beta t^2' },
      { label: 'Answer', math: `\\bar\\omega = ${fmt(answer)}\\text{ rad/s}` },
    ],
  }),

  defineQuestion('PHY2_RT11', {
    sourceRef: 'P117',
    topic: 'rotation',
    difficulty: 2,
    params: { gamma: { min: 2.3, max: 3.4, step: 0.1 }, beta: { min: 0.4, max: 0.65, step: 0.02 }, t: { min: 6, max: 10, step: 0.5 } },
    prompt: (p) =>
      `A roller in a printing press turns through an angle θ(t) given by θ(t) = γt² - βt³, where γ = ${fmt(p.gamma)} rad/s² and β = ${fmt(p.beta)} rad/s³. Calculate the angular acceleration of the roller at t = ${fmt(p.t)} s.`,
    compute: (p) => ({ value: 2 * p.gamma - 6 * p.beta * p.t, unit: 'rad/s^2', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\alpha(t) = \\dfrac{d^2\\theta}{dt^2} = 2\\gamma - 6\\beta t' },
      { label: 'Answer', math: `\\alpha = ${fmt(answer)}\\text{ rad/s}^2` },
    ],
  }),

  defineQuestion('PHY2_RT12', {
    sourceRef: 'P118',
    topic: 'rotation',
    difficulty: 1,
    params: { gamma: { min: 2.5, max: 4, step: 0.1 }, beta: { min: 0.35, max: 0.55, step: 0.02 } },
    prompt: (p) =>
      `A roller in a printing press turns through an angle θ(t) given by θ(t) = γt² - βt³, where γ = ${fmt(p.gamma)} rad/s² and β = ${fmt(p.beta)} rad/s³. At what value of t does the maximum positive angular velocity occur?`,
    compute: (p) => ({ value: p.gamma / (3 * p.beta), unit: 's', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\alpha(t)=2\\gamma-6\\beta t = 0 \\Rightarrow t = \\dfrac{\\gamma}{3\\beta}' },
      { label: 'Answer', math: `t = ${fmt(answer)}\\text{ s}` },
    ],
  }),
]
