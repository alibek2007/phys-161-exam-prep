import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import {
  embedAngularSpeed,
  platformFinalOmega,
  platformKEFactor,
  stringBreakRadius,
  stringBreakSpeed,
} from '../../physics/angularMomentum'
import { I_rodEnd, I_diskOrSolidCylinder, I_hoopOrThinRing, I_plateEdge } from '../../physics/rotation'

const G = 9.8

export const angularMomentumQuestions = [
  defineQuestion('PHY2_AM01', {
    sourceRef: 'P133',
    topic: 'angularMomentum',
    difficulty: 3,
    params: { Mcyl: { min: 14, max: 22, step: 0.5 }, R: { min: 0.12, max: 0.2, step: 0.01 }, mbullet: { min: 0.12, max: 0.22, step: 0.01 }, v: { min: 65, max: 95, step: 1 }, d: { min: 0.02, max: 0.05, step: 0.005 } },
    constraints: (p) => p.d < p.R,
    prompt: (p) =>
      `A solid cylinder of mass ${fmt(p.Mcyl)} kg and radius ${fmt(p.R)} m is mounted on a fixed vertical axis that runs through its center of mass. A bullet of mass ${fmt(p.mbullet)} kg is fired with a velocity of ${fmt(p.v)} m/s into the cylinder at rest, with the line of motion of the bullet perpendicular to the cylinder axis and at a distance d = ${fmt(p.d)} m from the center. What is the angular speed of the system after the bullet strikes and adheres to the surface of the cylinder?`,
    compute: (p) => {
      const Ibody = I_diskOrSolidCylinder(p.Mcyl, p.R)
      return { value: embedAngularSpeed(p.mbullet, p.v, p.d, p.R, Ibody), unit: 'rad/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'Angular momentum about the axis uses the bullet\u2019s perpendicular distance d, but once embedded the bullet sits at the cylinder\u2019s outer surface, radius R, so the final moment of inertia uses R.' },
      { label: 'Formula', math: 'L=m v d,\\quad I_{total}=\\tfrac12M_{cyl}R^2+mR^2,\\quad \\omega=L/I_{total}' },
      { label: 'Answer', math: `\\omega = ${fmt(answer)}\\text{ rad/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p133.png' } }),
  }),

  defineQuestion('PHY2_AM02', {
    sourceRef: 'P134',
    topic: 'angularMomentum',
    difficulty: 3,
    params: { mstudent: { min: 55, max: 72, step: 0.5 }, Mplat: { min: 65, max: 85, step: 0.5 }, R: { min: 2.4, max: 3.4, step: 0.1 }, w0: { min: 4, max: 7, step: 0.1 }, rFinal: { min: 0.8, max: 1.8, step: 0.05 } },
    constraints: (p) => p.rFinal < p.R,
    prompt: (p) =>
      `A student with mass ${fmt(p.mstudent)} kg walks slowly from the rim toward the center of a horizontal circular platform with mass ${fmt(p.Mplat)} kg and radius r = ${fmt(p.R)} m, rotating about a frictionless vertical axle. The angular velocity of the system is ${fmt(p.w0)} rad/s when the student is at the rim. Find the angular velocity of the system when the student is ${fmt(p.rFinal)} m from the center.`,
    compute: (p) => {
      const Iplat = I_diskOrSolidCylinder(p.Mplat, p.R)
      return { value: platformFinalOmega(Iplat, p.mstudent, p.R, p.w0, p.rFinal), unit: 'rad/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'L=(I_{plat}+mr_i^2)\\omega_i = (I_{plat}+mr_f^2)\\omega_f,\\quad I_{plat}=\\tfrac12M_{plat}R^2' },
      { label: 'Answer', math: `\\omega_f = ${fmt(answer)}\\text{ rad/s}` },
    ],
  }),

  defineQuestion('PHY2_AM03', {
    sourceRef: 'P135',
    topic: 'angularMomentum',
    difficulty: 3,
    params: { mstudent: { min: 55, max: 72, step: 0.5 }, Mplat: { min: 65, max: 88, step: 0.5 }, R: { min: 2.6, max: 3.6, step: 0.1 } },
    prompt: (p) =>
      `A student with mass ${fmt(p.mstudent)} kg walks slowly from the rim toward the center of a horizontal circular platform of mass ${fmt(p.Mplat)} kg and radius ${fmt(p.R)} m, rotating about a frictionless vertical axle. By what factor does the total kinetic energy of the system increase by the time the student reaches the center?`,
    compute: (p) => {
      const Iplat = I_diskOrSolidCylinder(p.Mplat, p.R)
      return { value: platformKEFactor(Iplat, p.mstudent, p.R), unit: '', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'Angular momentum is conserved, so KE = L²/(2I); at the center the student contributes zero moment of inertia, so KE_final/KE_initial = I_initial/I_final = I_initial/I_platform.' },
      { label: 'Formula', math: '\\text{factor} = \\dfrac{I_{plat}+mR^2}{I_{plat}},\\quad I_{plat}=\\tfrac12M_{plat}R^2' },
      { label: 'Answer', math: `\\text{factor} = ${fmt(answer)}` },
    ],
  }),

  defineQuestion('PHY2_AM04', {
    sourceRef: 'P136',
    topic: 'angularMomentum',
    difficulty: 3,
    params: { m: { min: 1.4, max: 2.6, step: 0.1 }, h: { min: 0.4, max: 0.9, step: 0.02 }, M: { min: 2.8, max: 4.4, step: 0.1 }, l: { min: 2, max: 3, step: 0.1 } },
    prompt: (p) =>
      `A block of mass m = ${fmt(p.m)} kg slides from rest down a frictionless surface through a height h = ${fmt(p.h)} m. At the bottom it strikes the lower end of a uniform vertical rod of mass M = ${fmt(p.M)} kg and length l = ${fmt(p.l)} m that hangs from a frictionless pivot O at its upper end, and sticks to it. Find the angular velocity of the rod and block immediately after the collision.`,
    compute: (p) => {
      const v = Math.sqrt(2 * G * p.h)
      const Ibar = I_rodEnd(p.M, p.l)
      const Itot = Ibar + p.m * p.l * p.l
      const L = p.m * v * p.l
      return { value: L / Itot, unit: 'rad/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'v=\\sqrt{2gh},\\ L=mvl,\\ I=\\tfrac13Ml^2+ml^2,\\ \\omega=L/I' },
      { label: 'Answer', math: `\\omega = ${fmt(answer)}\\text{ rad/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p136-137.png' } }),
  }),

  defineQuestion('PHY2_AM05', {
    sourceRef: 'P137',
    topic: 'angularMomentum',
    difficulty: 3,
    params: { m: { min: 1.6, max: 2.8, step: 0.1 }, M: { min: 2.6, max: 4, step: 0.1 }, l: { min: 1.8, max: 2.8, step: 0.1 }, w: { min: 0.4, max: 0.8, step: 0.02 } },
    prompt: (p) =>
      `A block of mass m = ${fmt(p.m)} kg has just struck and stuck to the lower end of a uniform vertical rod of mass M = ${fmt(p.M)} kg and length l = ${fmt(p.l)} m that hangs from a frictionless pivot O at its upper end. Immediately after the collision the rod and block rotate about the pivot with angular velocity ω = ${fmt(p.w)} rad/s. Find the angle θ through which the rod swings before momentarily coming to rest. Provide the answer in radians.`,
    compute: (p) => {
      const Ibar = I_rodEnd(p.M, p.l)
      const Itot = Ibar + p.m * p.l * p.l
      const KE = 0.5 * Itot * p.w * p.w
      const denom = G * (p.M * p.l / 2 + p.m * p.l)
      const oneMinusCos = KE / denom
      return { value: Math.acos(1 - oneMinusCos), unit: 'rad', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '\\tfrac12I\\omega^2 = g(1-\\cos\\theta)\\left(\\tfrac{Ml}{2}+ml\\right),\\quad I=\\tfrac13Ml^2+ml^2' },
      { label: 'Answer', math: `\\theta = ${fmt(answer)}\\text{ rad}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p136-137.png' } }),
  }),

  defineQuestion('PHY2_AM06', {
    sourceRef: 'P138',
    topic: 'angularMomentum',
    difficulty: 3,
    params: { mdrop: { min: 3.5, max: 6.5, step: 0.1 }, h: { min: 5, max: 10, step: 0.2 }, M: { min: 4, max: 7, step: 0.1 }, L: { min: 3.4, max: 5, step: 0.1 }, mother: { min: 3.4, max: 6, step: 0.1 } },
    prompt: (p) =>
      `A ${fmt(p.mdrop)}-kg ball is dropped from a height of ${fmt(p.h)} m above one end of a uniform bar that pivots about its center. The bar has a mass of ${fmt(p.M)} kg and is ${fmt(p.L)} m long. At the other end of the bar sits another ball of mass ${fmt(p.mother)} kg. The dropped ball sticks to the bar after the collision. Find the angular velocity of the bar immediately after the collision.`,
    compute: (p) => {
      const v = Math.sqrt(2 * G * p.h)
      const Ibar = (1 / 12) * p.M * p.L * p.L
      const Itot = Ibar + p.mdrop * (p.L / 2) ** 2 + p.mother * (p.L / 2) ** 2
      const L = p.mdrop * v * (p.L / 2)
      return { value: L / Itot, unit: 'rad/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'The resting ball at the far end moves rigidly with the bar at the instant of collision, so it contributes to the total moment of inertia.' },
      { label: 'Formula', math: 'v=\\sqrt{2gh},\\ L_{mom}=m_{drop}v\\tfrac{L}{2},\\ I=\\tfrac1{12}ML^2+(m_{drop}+m_{other})\\left(\\tfrac{L}{2}\\right)^2,\\ \\omega=L_{mom}/I' },
      { label: 'Answer', math: `\\omega = ${fmt(answer)}\\text{ rad/s}` },
    ],
  }),

  defineQuestion('PHY2_AM07', {
    sourceRef: 'P139',
    topic: 'angularMomentum',
    difficulty: 2,
    params: { L: { min: 2.4, max: 3.6, step: 0.1 }, w: { min: 2.8, max: 4.4, step: 0.1 } },
    prompt: (p) =>
      `A uniform bar of length ${fmt(p.L)} m pivots about its center and, immediately after being struck, rotates with angular velocity ω = ${fmt(p.w)} rad/s. A ball resting on the far end of the bar, unattached to it, is launched straight up. How high above its starting point does that ball rise?`,
    compute: (p) => {
      const v = p.w * (p.L / 2)
      return { value: (v * v) / (2 * G), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'The unattached ball leaves the bar with the tangential speed the tip had at the instant of the strike, then rises as a simple projectile.' },
      { label: 'Formula', math: 'v = \\omega\\tfrac{L}{2},\\quad h = v^2/(2g)' },
      { label: 'Answer', math: `h = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY2_AM08', {
    sourceRef: 'P140',
    topic: 'angularMomentum',
    difficulty: 3,
    params: { M: { min: 0.6, max: 1.1, step: 0.02 }, s: { min: 0.2, max: 0.32, step: 0.01 }, mbulletG: { min: 1.5, max: 2.3, step: 0.05 }, v: { min: 320, max: 370, step: 2 } },
    prompt: (p) =>
      `A target in a shooting gallery consists of a vertical square wooden board, ${fmt(p.s)} m on a side and with mass ${fmt(p.M)} kg, that pivots on a horizontal axis along its top edge. The board is struck face-on at its center by a bullet with mass ${fmt(p.mbulletG)} g that is traveling at ${fmt(p.v)} m/s and that remains embedded in the board. What is the angular speed of the board just after the bullet's impact?`,
    compute: (p) => {
      const mb = p.mbulletG / 1000
      const Iboard = I_plateEdge(p.M, p.s)
      const Itot = Iboard + mb * (p.s / 2) ** 2
      const L = mb * p.v * (p.s / 2)
      return { value: L / Itot, unit: 'rad/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'I_{board}=\\tfrac13Ms^2,\\ L=m_bv\\tfrac{s}{2},\\ I_{tot}=I_{board}+m_b\\left(\\tfrac{s}{2}\\right)^2,\\ \\omega=L/I_{tot}' },
      { label: 'Answer', math: `\\omega = ${fmt(answer)}\\text{ rad/s}` },
    ],
  }),

  defineQuestion('PHY2_AM09', {
    sourceRef: 'P141',
    topic: 'angularMomentum',
    difficulty: 2,
    params: { s: { min: 0.18, max: 0.3, step: 0.01 }, mbulletG: { min: 1.6, max: 2.4, step: 0.05 }, v: { min: 320, max: 375, step: 2 } },
    prompt: (p) =>
      `A target in a shooting gallery consists of a vertical square wooden board, ${fmt(p.s)} m on a side, that pivots on a horizontal axis along its top edge. The board is struck face-on at its center by a bullet with mass ${fmt(p.mbulletG)} g that is traveling at ${fmt(p.v)} m/s. What is the magnitude of the angular momentum of the bullet about the pivot axis just before impact?`,
    compute: (p) => {
      const mb = p.mbulletG / 1000
      return { value: mb * p.v * (p.s / 2), unit: 'kg m^2/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'L = m_b v \\cdot \\tfrac{s}{2}' },
      { label: 'Answer', math: `L = ${fmt(answer)}\\text{ kg m}^2\\text{/s}` },
    ],
  }),

  defineQuestion('PHY2_AM10', {
    sourceRef: 'P142',
    topic: 'angularMomentum',
    difficulty: 3,
    params: { M: { min: 0.6, max: 1.05, step: 0.02 }, s: { min: 0.24, max: 0.36, step: 0.01 }, mbulletG: { min: 1.8, max: 2.6, step: 0.05 }, v: { min: 300, max: 360, step: 2 } },
    prompt: (p) =>
      `A target in a shooting gallery consists of a vertical square wooden board, ${fmt(p.s)} m on a side and with mass ${fmt(p.M)} kg, that pivots on a horizontal axis along its top edge. The board is struck face-on at its center by a bullet with mass ${fmt(p.mbulletG)} g that is traveling at ${fmt(p.v)} m/s and that remains embedded in the board. What maximum height above the equilibrium position does the center of the board reach before starting to swing down again?`,
    compute: (p) => {
      const mb = p.mbulletG / 1000
      const Iboard = I_plateEdge(p.M, p.s)
      const Itot = Iboard + mb * (p.s / 2) ** 2
      const L = mb * p.v * (p.s / 2)
      const omega = L / Itot
      const KE = 0.5 * Itot * omega * omega
      return { value: KE / (G * (p.M + mb)), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'By symmetry the board\u2019s center of mass and the embedded bullet rise the same height h = (s/2)(1-cosθ); energy conservation then simplifies to h = KE/[g(M+m_b)].' },
      { label: 'Formula', math: 'h_{max} = \\dfrac{\\tfrac12I_{tot}\\omega^2}{g(M+m_b)}' },
      { label: 'Answer', math: `h_{max} = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY2_AM11', {
    sourceRef: 'P143',
    topic: 'angularMomentum',
    difficulty: 3,
    params: { M: { min: 0.6, max: 1.05, step: 0.02 }, s: { min: 0.16, max: 0.26, step: 0.01 }, mbulletG: { min: 1.8, max: 2.6, step: 0.05 } },
    prompt: (p) =>
      `A target in a shooting gallery consists of a vertical square wooden board, ${fmt(p.s)} m on a side and with mass ${fmt(p.M)} kg, that pivots on a horizontal axis along its top edge. The board is struck face-on at its center by a bullet with mass ${fmt(p.mbulletG)} g that remains embedded in the board. What minimum bullet speed would be required for the board to swing all the way over after impact?`,
    compute: (p) => {
      const mb = p.mbulletG / 1000
      const Iboard = I_plateEdge(p.M, p.s)
      const Itot = Iboard + mb * (p.s / 2) ** 2
      const KEneeded = G * p.s * (p.M + mb)
      const wNeeded = Math.sqrt((2 * KEneeded) / Itot)
      const v = (wNeeded * Itot) / (mb * (p.s / 2))
      return { value: v, unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'Swinging "all the way over" means the center rises by a full side length s, i.e. (1-cosθ)=2; that fixes the minimum KE and hence the minimum ω and v.' },
      { label: 'Formula', math: 'KE_{needed}=gs(M+m_b),\\ \\omega=\\sqrt{2KE_{needed}/I_{tot}},\\ v=\\dfrac{\\omega I_{tot}}{m_b\\,s/2}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_AM12', {
    sourceRef: 'P144',
    topic: 'angularMomentum',
    difficulty: 3,
    params: { mplaneG: { min: 380, max: 520, step: 10 }, v: { min: 1.4, max: 2.4, step: 0.05 }, gap: { min: 0.15, max: 0.28, step: 0.01 }, Lbar: { min: 0.65, max: 0.95, step: 0.02 }, Mbar: { min: 0.9, max: 1.4, step: 0.05 } },
    constraints: (p) => p.gap < p.Lbar,
    prompt: (p) =>
      `A ${fmt(p.mplaneG)}-g toy plane is flying horizontally at ${fmt(p.v)} m/s, when it hits a stationary vertical bar l = ${fmt(p.gap * 100)} cm below the top. The bar is uniform, ${fmt(p.Lbar)} m long, has a mass of ${fmt(p.Mbar)} kg, and is hinged at its base. The toy plane drops to the ground after the collision. What is the angular velocity of the bar just after it is hit by the plane?`,
    compute: (p) => {
      const mplane = p.mplaneG / 1000
      const r = p.Lbar - p.gap
      const Ibar = I_rodEnd(p.Mbar, p.Lbar)
      const L = mplane * p.v * r
      return { value: L / Ibar, unit: 'rad/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'The plane strikes at distance r = L_bar - l from the hinge and falls away rather than sticking, so only the bar\u2019s own moment of inertia is used after the impulsive collision.' },
      { label: 'Formula', math: 'r=L_{bar}-l,\\ L_{mom}=m_{plane}vr,\\ I_{bar}=\\tfrac13M_{bar}L_{bar}^2,\\ \\omega=L_{mom}/I_{bar}' },
      { label: 'Answer', math: `\\omega = ${fmt(answer)}\\text{ rad/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p144-145.png' } }),
  }),

  defineQuestion('PHY2_AM13', {
    sourceRef: 'P145',
    topic: 'angularMomentum',
    difficulty: 2,
    params: { mplaneG: { min: 500, max: 700, step: 10 }, v: { min: 1.8, max: 2.8, step: 0.05 }, gap: { min: 0.14, max: 0.26, step: 0.01 }, Lbar: { min: 0.8, max: 1.1, step: 0.02 } },
    constraints: (p) => p.gap < p.Lbar,
    prompt: (p) =>
      `A ${fmt(p.mplaneG)}-g toy plane is flying horizontally at ${fmt(p.v)} m/s when it hits a stationary vertical bar l = ${fmt(p.gap * 100)} cm below the top. The bar is uniform and ${fmt(p.Lbar)} m long, hinged at its base. What is the magnitude of the angular momentum of the plane about the hinge just before the collision?`,
    compute: (p) => {
      const mplane = p.mplaneG / 1000
      const r = p.Lbar - p.gap
      return { value: mplane * p.v * r, unit: 'kg m^2/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'L = m_{plane}\\,v\\,(L_{bar}-l)' },
      { label: 'Answer', math: `L = ${fmt(answer)}\\text{ kg m}^2\\text{/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p144-145.png' } }),
  }),

  defineQuestion('PHY2_AM14', {
    sourceRef: 'P146',
    topic: 'angularMomentum',
    difficulty: 3,
    params: { mplaneG: { min: 550, max: 750, step: 10 }, v: { min: 1.9, max: 2.7, step: 0.05 }, gap: { min: 0.18, max: 0.3, step: 0.01 }, Lbar: { min: 0.75, max: 1, step: 0.02 }, Mbar: { min: 1.3, max: 1.9, step: 0.05 } },
    constraints: (p) => p.gap < p.Lbar,
    prompt: (p) =>
      `A ${fmt(p.mplaneG)}-g toy plane is flying horizontally at ${fmt(p.v)} m/s, when it hits a stationary vertical bar l = ${fmt(p.gap * 100)} cm below the top. The bar is uniform, ${fmt(p.Lbar)} m long, has a mass of ${fmt(p.Mbar)} kg, and is hinged at its base. The toy plane drops to the ground after the collision. What is the angular velocity of the bar just as it reaches the ground?`,
    compute: (p) => {
      const mplane = p.mplaneG / 1000
      const r = p.Lbar - p.gap
      const Ibar = I_rodEnd(p.Mbar, p.Lbar)
      const L = mplane * p.v * r
      const w0 = L / Ibar
      const wf = Math.sqrt(w0 * w0 + (p.Mbar * G * p.Lbar) / Ibar)
      return { value: wf, unit: 'rad/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'After the impact gives the bar ω₀, it swings down from vertical to horizontal (ground), and its center of mass falls L_bar/2 — energy conservation gives the final ω.' },
      { label: 'Formula', math: '\\omega_0=\\dfrac{m_{plane}v(L_{bar}-l)}{I_{bar}},\\quad \\omega_f=\\sqrt{\\omega_0^2+\\dfrac{M_{bar}gL_{bar}}{I_{bar}}}' },
      { label: 'Answer', math: `\\omega_f = ${fmt(answer)}\\text{ rad/s}` },
    ],
  }),

  defineQuestion('PHY2_AM15', {
    sourceRef: 'P147',
    topic: 'angularMomentum',
    difficulty: 3,
    params: { m: { min: 0.35, max: 0.6, step: 0.02 }, r0: { min: 0.6, max: 0.95, step: 0.02 }, v0: { min: 3, max: 4.5, step: 0.1 }, T: { min: 26, max: 38, step: 1 } },
    prompt: (p) =>
      `A small block with mass ${fmt(p.m)} kg is attached to a string passing through a hole in a frictionless, horizontal surface. The block is originally revolving in a circle with a radius of ${fmt(p.r0)} m about the hole with a tangential speed of ${fmt(p.v0)} m/s. The string is then pulled slowly from below, shortening the radius of the circle in which the block revolves. The breaking strength of the string is ${fmt(p.T)} N. What is the radius of the circle when the string breaks?`,
    compute: (p) => ({ value: stringBreakRadius(p.m, p.v0, p.r0, p.T), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', text: 'The string tension passes through the hole (the axis), so it exerts no torque — angular momentum L = m v r is conserved as the radius shrinks.' },
      { label: 'Formula', math: 'v=\\dfrac{v_0r_0}{r},\\ T=\\dfrac{mv^2}{r} \\Rightarrow r=\\sqrt[3]{\\dfrac{mv_0^2r_0^2}{T}}' },
      { label: 'Answer', math: `r = ${fmt(answer)}\\text{ m}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p147-148.png' } }),
  }),

  defineQuestion('PHY2_AM16', {
    sourceRef: 'P148',
    topic: 'angularMomentum',
    difficulty: 3,
    params: { m: { min: 0.4, max: 0.68, step: 0.02 }, r0: { min: 0.6, max: 0.95, step: 0.02 }, v0: { min: 3.5, max: 5, step: 0.1 }, T: { min: 28, max: 42, step: 1 } },
    prompt: (p) =>
      `A small block with mass ${fmt(p.m)} kg is attached to a string passing through a hole in a frictionless, horizontal surface. The block is originally revolving in a circle of radius ${fmt(p.r0)} m about the hole with a tangential speed of ${fmt(p.v0)} m/s. The string is then pulled slowly from below, shortening the radius of the circle. The breaking strength of the string is ${fmt(p.T)} N. What is the speed of the block when the string breaks?`,
    compute: (p) => ({ value: stringBreakSpeed(p.T, p.v0, p.r0, p.m), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v=\\sqrt[3]{\\dfrac{Tv_0r_0}{m}}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p147-148.png' } }),
  }),

  defineQuestion('PHY2_AM17', {
    sourceRef: 'P149',
    topic: 'angularMomentum',
    difficulty: 2,
    params: { wireLength: { min: 1.4, max: 2.2, step: 0.05 } },
    prompt: (p) =>
      `A stiff uniform wire of length ${fmt(p.wireLength)} m is cut, bent, and the parts soldered together so that it forms a circular wheel having four identical spokes coming out from the center to the rim. None of the wire is wasted, and you can neglect the mass of the solder. What is the radius of this wheel?`,
    compute: (p) => ({ value: p.wireLength / (2 * Math.PI + 4), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', text: 'The rim has circumference 2πR, and the 4 spokes contribute a further 4R of wire — the total must equal the original wire length.' },
      { label: 'Formula', math: '2\\pi R + 4R = L_{wire} \\Rightarrow R=\\dfrac{L_{wire}}{2\\pi+4}' },
      { label: 'Answer', math: `R = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY2_AM18', {
    sourceRef: 'P150',
    topic: 'angularMomentum',
    difficulty: 2,
    params: { Mrim: { min: 2, max: 3.4, step: 0.1 }, R: { min: 0.09, max: 0.16, step: 0.005 }, mspoke: { min: 0.35, max: 0.65, step: 0.02 } },
    prompt: (p) =>
      `A wheel consists of a thin circular rim of mass ${fmt(p.Mrim)} kg and radius ${fmt(p.R)} m, together with four identical uniform spokes, each of mass ${fmt(p.mspoke)} kg, running from the center of the wheel to the rim. What is the moment of inertia of this wheel about an axle through its center, perpendicular to the plane of the wheel?`,
    compute: (p) => {
      const Irim = I_hoopOrThinRing(p.Mrim, p.R)
      const Ispokes = 4 * I_rodEnd(p.mspoke, p.R)
      return { value: Irim + Ispokes, unit: 'kg m^2', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'I = MR^2_{rim} + 4\\left(\\tfrac13m_{spoke}R^2\\right)' },
      { label: 'Answer', math: `I = ${fmt(answer)}\\text{ kg m}^2` },
    ],
  }),
]
