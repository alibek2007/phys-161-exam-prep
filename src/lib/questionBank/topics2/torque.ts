import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import { grindstoneDriveForce, stopTimeFromFriction } from '../../physics/torque'
import { I_rodCenter, I_thinSphericalShell } from '../../physics/rotation'

const G = 9.8

export const torqueQuestions = [
  defineQuestion('PHY2_TQ01', {
    sourceRef: 'P119',
    topic: 'torque',
    difficulty: 3,
    params: { m1: { min: 6, max: 10, step: 0.1 }, m2: { min: 1, max: 2.5, step: 0.1 }, M: { min: 7, max: 11, step: 0.1 }, L: { min: 1.2, max: 1.8, step: 0.05 }, angleDeg: { min: 20, max: 45, step: 1 } },
    constraints: (p) => p.m1 > p.m2,
    prompt: (p) =>
      `Two point-like particles with masses m₁ = ${fmt(p.m1)} kg and m₂ = ${fmt(p.m2)} kg are attached at the ends of a uniform rigid rod with mass M = ${fmt(p.M)} kg and length L = ${fmt(p.L)} m, rotating in the vertical plane about a frictionless pivot through its center. What is the magnitude of the angular acceleration of the system when the rod makes an angle of ${fmt(p.angleDeg)}° with the horizontal? The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => {
      const theta = (p.angleDeg * Math.PI) / 180
      const tau = (p.m1 - p.m2) * G * (p.L / 2) * Math.cos(theta)
      const I = I_rodCenter(p.M, p.L) + (p.m1 + p.m2) * (p.L / 2) ** 2
      return { value: tau / I, unit: 'rad/s^2', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '\\tau=(m_1-m_2)g\\tfrac{L}{2}\\cos\\theta,\\ \\ I=\\tfrac1{12}ML^2+(m_1+m_2)\\left(\\tfrac{L}{2}\\right)^2,\\ \\ \\alpha=\\tau/I' },
      { label: 'Answer', math: `\\alpha = ${fmt(answer)}\\text{ rad/s}^2` },
    ],
  }),

  defineQuestion('PHY2_TQ02', {
    sourceRef: 'P120',
    topic: 'torque',
    difficulty: 2,
    params: { m1: { min: 5, max: 9, step: 0.1 }, m2: { min: 0.8, max: 2, step: 0.1 }, M: { min: 6, max: 10, step: 0.1 }, L: { min: 1, max: 1.6, step: 0.05 } },
    prompt: (p) =>
      `Two point-like particles with masses m₁ = ${fmt(p.m1)} kg and m₂ = ${fmt(p.m2)} kg are attached at the ends of a uniform rigid rod with mass M = ${fmt(p.M)} kg and length L = ${fmt(p.L)} m. Find the moment of inertia of this system about an axis through the center of the rod and perpendicular to it.`,
    compute: (p) => ({ value: I_rodCenter(p.M, p.L) + (p.m1 + p.m2) * (p.L / 2) ** 2, unit: 'kg m^2', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'I = \\tfrac1{12}ML^2+(m_1+m_2)\\left(\\tfrac{L}{2}\\right)^2' },
      { label: 'Answer', math: `I = ${fmt(answer)}\\text{ kg m}^2` },
    ],
  }),

  defineQuestion('PHY2_TQ03', {
    sourceRef: 'P121',
    topic: 'torque',
    difficulty: 3,
    params: { m: { min: 50, max: 65, step: 1 }, diameter: { min: 0.45, max: 0.65, step: 0.01 }, N: { min: 140, max: 180, step: 5 }, mu: { min: 0.5, max: 0.65, step: 0.01 }, axleFriction: { min: 4.5, max: 6.5, step: 0.1 }, handle: { min: 0.4, max: 0.55, step: 0.01 }, rpm: { min: 120, max: 160, step: 5 }, t: { min: 5, max: 9, step: 0.5 } },
    prompt: (p) =>
      `A ${fmt(p.m)}-kg grindstone is a solid disk ${fmt(p.diameter)} m in diameter. You press an ax down on the rim with a normal force of ${fmt(p.N)} N. The coefficient of kinetic friction between the blade and the stone is ${fmt(p.mu)}, and there is a constant friction torque of ${fmt(p.axleFriction)} N·m between the axle of the stone and its bearings. How much force must be applied tangentially at the end of a crank handle ${fmt(p.handle)} m long to bring the stone from rest to ${fmt(p.rpm)} rev/min in ${fmt(p.t)} s?`,
    compute: (p) => {
      const R = p.diameter / 2
      const I = 0.5 * p.m * R * R
      const omega = (p.rpm * 2 * Math.PI) / 60
      return { value: grindstoneDriveForce(I, omega, p.t, p.handle, p.mu, p.N, R, p.axleFriction), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = \\dfrac{I\\alpha+\\mu NR+\\tau_{axle}}{\\text{handle}},\\ \\ I=\\tfrac12mR^2,\\ \\alpha=\\omega/t' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY2_TQ04', {
    sourceRef: 'P122',
    topic: 'torque',
    difficulty: 3,
    params: { m: { min: 48, max: 60, step: 1 }, diameter: { min: 0.5, max: 0.7, step: 0.01 }, omega0: { min: 28, max: 42, step: 0.5 }, N: { min: 110, max: 150, step: 5 }, mu: { min: 0.5, max: 0.68, step: 0.01 }, axleFriction: { min: 4.5, max: 6.5, step: 0.1 } },
    prompt: (p) =>
      `A ${fmt(p.m)}-kg grindstone is a solid disk ${fmt(p.diameter)} m in diameter, spinning at ${fmt(p.omega0)} rad/s. You press an ax down on the rim with a normal force of ${fmt(p.N)} N. The coefficient of kinetic friction between the blade and the stone is ${fmt(p.mu)}, and there is a constant friction torque of ${fmt(p.axleFriction)} N·m between the axle of the stone and its bearings. How long does it take the grindstone to come to rest?`,
    compute: (p) => {
      const R = p.diameter / 2
      const I = 0.5 * p.m * R * R
      const frictionTorque = p.mu * p.N * R + p.axleFriction
      return { value: stopTimeFromFriction(I, p.omega0, frictionTorque), unit: 's', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 't = \\dfrac{I\\omega_0}{\\mu NR+\\tau_{axle}},\\ \\ I=\\tfrac12mR^2' },
      { label: 'Answer', math: `t = ${fmt(answer)}\\text{ s}` },
    ],
  }),

  defineQuestion('PHY2_TQ05', {
    sourceRef: 'P123',
    topic: 'torque',
    difficulty: 2,
    params: { m: { min: 45, max: 58, step: 1 }, diameter: { min: 0.45, max: 0.65, step: 0.01 }, axleFriction: { min: 5, max: 7, step: 0.1 }, rpm: { min: 100, max: 150, step: 5 } },
    prompt: (p) =>
      `A ${fmt(p.m)}-kg grindstone is a solid disk ${fmt(p.diameter)} m in diameter. There is a constant friction torque of ${fmt(p.axleFriction)} N⋅m between the axle of the stone and its bearings. How much time does it take the grindstone to come from ${fmt(p.rpm)} rev/min to rest if it is acted on by the axle friction only?`,
    compute: (p) => {
      const R = p.diameter / 2
      const I = 0.5 * p.m * R * R
      const omega0 = (p.rpm * 2 * Math.PI) / 60
      return { value: stopTimeFromFriction(I, omega0, p.axleFriction), unit: 's', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 't = \\dfrac{I\\omega_0}{\\tau_{axle}},\\ \\ I=\\tfrac12mR^2' },
      { label: 'Answer', math: `t = ${fmt(answer)}\\text{ s}` },
    ],
  }),

  defineQuestion('PHY2_TQ06', {
    sourceRef: 'P124',
    topic: 'torque',
    difficulty: 2,
    params: { N: { min: 110, max: 150, step: 5 }, mu: { min: 0.5, max: 0.65, step: 0.01 }, diameter: { min: 0.55, max: 0.75, step: 0.01 }, axleFriction: { min: 5, max: 7, step: 0.1 }, handle: { min: 0.4, max: 0.55, step: 0.01 } },
    prompt: (p) =>
      `A grindstone is a solid disk ${fmt(p.diameter)} m in diameter. You press an ax down on the rim with a normal force of ${fmt(p.N)} N. The coefficient of kinetic friction between the blade and the stone is ${fmt(p.mu)}, and there is a constant friction torque of ${fmt(p.axleFriction)} N⋅m between the axle of the stone and its bearings. After the grindstone attains a steady angular speed, what tangential force at the end of the handle ${fmt(p.handle)} m long is needed to maintain that constant angular speed?`,
    compute: (p) => {
      const R = p.diameter / 2
      return { value: (p.mu * p.N * R + p.axleFriction) / p.handle, unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'At constant angular speed there is no angular acceleration, so the crank force just balances the ax friction and axle friction torques.' },
      { label: 'Formula', math: 'F = \\dfrac{\\mu NR+\\tau_{axle}}{\\text{handle}}' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY2_TQ07', {
    sourceRef: 'P125',
    topic: 'torque',
    difficulty: 3,
    params: { tau: { min: 3.5, max: 6, step: 0.1 }, t1: { min: 1.2, max: 2.2, step: 0.1 }, rpm: { min: 110, max: 160, step: 5 } },
    prompt: (p) =>
      `An experimental bicycle wheel is placed on a test stand so that it is free to turn on its axle. If a constant net torque of ${fmt(p.tau)} N⋅m is applied to the tire for ${fmt(p.t1)} s, the angular speed of the tire increases from 0 to ${fmt(p.rpm)} rev/min. Compute the moment of inertia of the wheel about the rotational axis. Ignore the contribution of friction to accelerating motion of the wheel.`,
    compute: (p) => {
      const omega = (p.rpm * 2 * Math.PI) / 60
      const alpha1 = omega / p.t1
      return { value: p.tau / alpha1, unit: 'kg m^2', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '\\alpha_1=\\omega/t_1,\\quad I=\\tau/\\alpha_1' },
      { label: 'Answer', math: `I = ${fmt(answer)}\\text{ kg m}^2` },
    ],
  }),

  defineQuestion('PHY2_TQ08', {
    sourceRef: 'P126',
    topic: 'torque',
    difficulty: 3,
    params: { tau: { min: 3.5, max: 6, step: 0.1 }, t1: { min: 1.5, max: 3, step: 0.1 }, rpm: { min: 100, max: 150, step: 5 }, t2: { min: 90, max: 140, step: 1 } },
    prompt: (p) =>
      `An experimental bicycle wheel is placed on a test stand so that it is free to turn on its axle. If a constant net torque of ${fmt(p.tau)} N⋅m is applied to the tire for ${fmt(p.t1)} s, the angular speed of the tire increases from 0 to ${fmt(p.rpm)} rev/min. The external torque is then removed, and the wheel is brought to rest by friction in its bearings in ${fmt(p.t2)} s. Compute the magnitude of the friction torque. Ignore the contribution of friction to accelerating motion of the wheel.`,
    compute: (p) => {
      const omega = (p.rpm * 2 * Math.PI) / 60
      const alpha1 = omega / p.t1
      const I = p.tau / alpha1
      return { value: I * omega / p.t2, unit: 'N m', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '\\alpha_1=\\omega/t_1,\\ I=\\tau/\\alpha_1,\\quad \\tau_{friction}=I\\omega/t_2' },
      { label: 'Answer', math: `\\tau_{friction} = ${fmt(answer)}\\text{ N m}` },
    ],
  }),

  defineQuestion('PHY2_TQ09', {
    sourceRef: 'P127',
    topic: 'torque',
    difficulty: 2,
    params: { rpm: { min: 100, max: 150, step: 5 }, t2: { min: 90, max: 130, step: 1 } },
    prompt: (p) =>
      `An experimental bicycle wheel is placed on a test stand so that it is free to turn on its axle. A constant net torque is applied to the tire until the angular speed of the tire increases from 0 to ${fmt(p.rpm)} rev/min. The external torque is then removed, and the wheel is brought to rest by friction in its bearings in ${fmt(p.t2)} s (a constant friction torque, ignoring any contribution of friction during the accelerating phase). Compute the total angle of revolution made by the wheel in this ${fmt(p.t2)}-s time interval. Provide the answer in radians (rad).`,
    compute: (p) => {
      const omega0 = (p.rpm * 2 * Math.PI) / 60
      return { value: 0.5 * omega0 * p.t2, unit: 'rad', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'Uniform deceleration from ω₀ to 0 under constant friction torque: θ = average angular speed × time.' },
      { label: 'Formula', math: '\\theta = \\tfrac12\\omega_0 t_2' },
      { label: 'Answer', math: `\\theta = ${fmt(answer)}\\text{ rad}` },
    ],
  }),

  defineQuestion('PHY2_TQ10', {
    sourceRef: 'P128',
    topic: 'torque',
    difficulty: 1,
    params: { I: { min: 3.5, max: 6, step: 0.1 }, rpm: { min: 100, max: 150, step: 5 }, t: { min: 5, max: 9, step: 0.5 } },
    prompt: (p) =>
      `The flywheel of an engine has a moment of inertia ${fmt(p.I)} kg⋅m² about its rotation axis. What constant torque is required to bring it up to an angular speed of ${fmt(p.rpm)} rev/min in ${fmt(p.t)} s, starting from rest?`,
    compute: (p) => {
      const omega = (p.rpm * 2 * Math.PI) / 60
      return { value: (p.I * omega) / p.t, unit: 'N m', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '\\tau = I\\alpha = I\\omega/t' },
      { label: 'Answer', math: `\\tau = ${fmt(answer)}\\text{ N m}` },
    ],
  }),

  defineQuestion('PHY2_TQ11', {
    sourceRef: 'P129',
    topic: 'torque',
    difficulty: 2,
    params: { I: { min: 2.8, max: 4.5, step: 0.1 }, rpm: { min: 120, max: 165, step: 5 }, t: { min: 6, max: 9, step: 0.5 } },
    prompt: (p) =>
      `The flywheel of an engine has a moment of inertia ${fmt(p.I)} kg·m² about its rotation axis. A constant torque brings it up to an angular speed of ${fmt(p.rpm)} rev/min in ${fmt(p.t)} s, starting from rest. Through how many revolutions does the flywheel turn during this time?`,
    compute: (p) => {
      const omega = (p.rpm * 2 * Math.PI) / 60
      const theta = 0.5 * omega * p.t
      return { value: theta / (2 * Math.PI), unit: '', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '\\theta = \\tfrac12\\omega t,\\quad n=\\theta/2\\pi' },
      { label: 'Answer', math: `n = ${fmt(answer)}` },
    ],
  }),

  defineQuestion('PHY2_TQ12', {
    sourceRef: 'P130',
    topic: 'torque',
    difficulty: 3,
    params: { M: { min: 6, max: 10, step: 0.1 }, diameter: { min: 0.6, max: 0.85, step: 0.01 }, msmall: { min: 1.2, max: 2, step: 0.1 }, rpm1: { min: 80, max: 110, step: 1 }, rpm2: { min: 40, max: 65, step: 1 }, t: { min: 20, max: 35, step: 1 } },
    constraints: (p) => p.rpm1 > p.rpm2,
    prompt: (p) =>
      `A uniform, ${fmt(p.M)}-kg spherical shell ${fmt(p.diameter * 100)} cm in diameter has four small ${fmt(p.msmall)}-kg masses attached to its outer surface and equally spaced around it. This combination is spinning about an axis running through the center of the sphere and two of the small masses. What friction torque is needed to reduce its angular speed from ${fmt(p.rpm1)} rpm to ${fmt(p.rpm2)} rpm in ${fmt(p.t)} s? Assume torque causing acceleration is in the positive direction (so the answer should be negative).`,
    compute: (p) => {
      const R = p.diameter / 2
      const Ishell = (2 / 3) * p.M * R * R
      const Itot = Ishell + 2 * p.msmall * R * R
      const w1 = (p.rpm1 * 2 * Math.PI) / 60
      const w2 = (p.rpm2 * 2 * Math.PI) / 60
      const alpha = (w2 - w1) / p.t
      return { value: Itot * alpha, unit: 'N m', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'Two of the four masses lie on the spin axis itself and contribute nothing to I; only the other two, each a distance R from the axis, add m·R².' },
      { label: 'Formula', math: 'I=\\tfrac23MR^2+2m_{small}R^2,\\quad \\tau=I\\alpha,\\ \\alpha=(\\omega_2-\\omega_1)/t' },
      { label: 'Answer', math: `\\tau = ${fmt(answer)}\\text{ N m}` },
    ],
  }),

  defineQuestion('PHY2_TQ13', {
    sourceRef: 'P131',
    topic: 'torque',
    difficulty: 2,
    params: { M: { min: 5, max: 9, step: 0.1 }, diameter: { min: 0.55, max: 0.8, step: 0.01 }, msmall: { min: 1.2, max: 2, step: 0.1 } },
    prompt: (p) =>
      `A uniform, ${fmt(p.M)}-kg spherical shell ${fmt(p.diameter * 100)} cm in diameter has four small ${fmt(p.msmall)}-kg masses attached to its outer surface and equally spaced around it. This combination spins about an axis running through the center of the sphere and two of the small masses. What is the moment of inertia of the combination about this axis?`,
    compute: (p) => {
      const R = p.diameter / 2
      const Ishell = I_thinSphericalShell(p.M, R)
      return { value: Ishell + 2 * p.msmall * R * R, unit: 'kg m^2', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'I=\\tfrac23MR^2+2m_{small}R^2' },
      { label: 'Answer', math: `I = ${fmt(answer)}\\text{ kg m}^2` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p130-131.png' } }),
  }),

  defineQuestion('PHY2_TQ14', {
    sourceRef: 'P132',
    topic: 'torque',
    difficulty: 3,
    params: { F1: { min: 8, max: 13, step: 0.2 }, F2: { min: 12, max: 18, step: 0.2 }, angleDeg: { min: 35, max: 60, step: 1 }, F3: { min: 6, max: 10, step: 0.2 }, tau: { min: 1.6, max: 2.6, step: 0.05 } },
    prompt: (p) =>
      `Three forces are applied to a wheel as shown in the figure. One force is perpendicular to the rim |F₁| = ${fmt(p.F1)} N, another makes a ${fmt(p.angleDeg)}˚ angle with the radius |F₂| = ${fmt(p.F2)} N, and the third is tangent to the rim |F₃| = ${fmt(p.F3)} N. The magnitude of the net torque on the wheel due to these three forces, for an axis perpendicular to the wheel and passing through its center, is ${fmt(p.tau)} N·m. What is the radius of the wheel?`,
    compute: (p) => {
      const theta = (p.angleDeg * Math.PI) / 180
      const tangentialNet = Math.abs(p.F2 * Math.sin(theta) - p.F3)
      return { value: p.tau / tangentialNet, unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: '"Perpendicular to the rim" means radial (points straight at the axis), so F₁ passes through the axis and contributes zero torque. Only the tangential components of F₂ and F₃ matter.' },
      { label: 'Formula', math: '\\tau = R\\,|F_2\\sin\\theta - F_3| \\Rightarrow R=\\dfrac{\\tau}{|F_2\\sin\\theta-F_3|}' },
      { label: 'Answer', math: `R = ${fmt(answer)}\\text{ m}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p132.png' } }),
  }),
]
