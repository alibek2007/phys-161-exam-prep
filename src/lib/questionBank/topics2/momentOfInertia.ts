import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import {
  I_diskOrSolidCylinder,
  I_rightTriangleAboutHeightLeg,
  I_rodCenter,
  I_rodEnd,
  I_solidSphere,
  I_thinSphericalShell,
} from '../../physics/rotation'

const G = 9.8

export const momentOfInertiaQuestions = [
  defineQuestion('PHY2_MI01', {
    sourceRef: 'P94',
    topic: 'momentOfInertia',
    difficulty: 2,
    params: { L: { min: 0.8, max: 1.8, step: 0.05 } },
    prompt: (p) =>
      `A stick of length ${fmt(p.L)} m is held vertically with one end on the floor and is then allowed to fall. Find the speed of the other end when it hits the floor, assuming that the end on the floor does not slip. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: Math.sqrt(3 * G * p.L), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'mg\\tfrac{L}{2} = \\tfrac12 I \\omega^2,\\ I=\\tfrac13mL^2 \\Rightarrow v=\\omega L=\\sqrt{3gL}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY2_MI02', {
    sourceRef: 'P95',
    topic: 'momentOfInertia',
    difficulty: 3,
    params: { rho1: { min: 5800, max: 6500, step: 50 }, rho2: { min: 4000, max: 4600, step: 50 }, R: { min: 6000000, max: 6300000, step: 10000 }, IExp37: { min: 7.5, max: 9.5, step: 0.1 } },
    prompt: (p) =>
      `Assume a simple non-uniform model of a planet's density with an inner spherical region of density ${fmt(p.rho1)} kg/m³ and the outer (spherical shell) region of density ${fmt(p.rho2)} kg/m³. Taking the radius of the planet as ${fmt(p.R)} m and moment of inertia as ${fmt(p.IExp37)}×10³⁷ kg·m², calculate the radius of the inner region.`,
    compute: (p) => {
      const I = p.IExp37 * 1e37
      const coeff = (8 * Math.PI) / 15
      const r5 = (I / coeff - p.rho2 * p.R ** 5) / (p.rho1 - p.rho2)
      return { value: Math.pow(r5, 1 / 5), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'Equivalent to a full sphere of density ρ₂ plus an inner sphere carrying the extra density (ρ₁-ρ₂).' },
      { label: 'Formula', math: 'I = \\dfrac{8\\pi}{15}\\left[\\rho_2 R^5 + (\\rho_1-\\rho_2)r^5\\right]' },
      { label: 'Answer', math: `r = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY2_MI03', {
    sourceRef: 'P96',
    topic: 'momentOfInertia',
    difficulty: 3,
    params: { rho: { min: 700, max: 900, step: 5 }, R: { min: 0.15, max: 0.3, step: 0.01 }, sigma: { min: 12, max: 25, step: 1 } },
    prompt: (p) =>
      `A sphere consists of a solid wooden ball of uniform density ${fmt(p.rho)} kg/m³ and radius ${fmt(p.R)} m, covered with a thin coating of lead foil with area density ${fmt(p.sigma)} kg/m². Calculate the moment of inertia of this sphere about an axis passing through its center.`,
    compute: (p) => {
      const M_ball = p.rho * (4 / 3) * Math.PI * p.R ** 3
      const I_ball = I_solidSphere(M_ball, p.R)
      const M_shell = 4 * Math.PI * p.R * p.R * p.sigma
      const I_shell = I_thinSphericalShell(M_shell, p.R)
      return { value: I_ball + I_shell, unit: 'kg m^2', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'I = \\tfrac25 M_{ball}R^2 + \\tfrac23 M_{shell}R^2' },
      { label: 'Answer', math: `I = ${fmt(answer)}\\text{ kg m}^2` },
    ],
  }),

  defineQuestion('PHY2_MI04', {
    sourceRef: 'P97',
    topic: 'momentOfInertia',
    difficulty: 2,
    params: { Lcm: { min: 50, max: 85, step: 1 }, m: { min: 0.3, max: 0.8, step: 0.05 }, angleDeg: { min: 50, max: 90, step: 5 } },
    prompt: (p) =>
      `A thin uniform rod ${fmt(p.Lcm)} cm long with mass ${fmt(p.m)} kg is bent at its center into a V shape, with a ${fmt(p.angleDeg)}° angle at its vertex. Find the moment of inertia of this V-shaped object about an axis perpendicular to the plane of the V at its vertex.`,
    compute: (p) => {
      const L = p.Lcm / 100
      return { value: I_rodEnd(p.m, L / 2), unit: 'kg m^2', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', text: 'Each half is a rod pivoting about one end (the vertex); the bend angle does not change this, since the axis is perpendicular to the plane containing both halves.' },
      { label: 'Formula', math: 'I = 2\\times\\tfrac13\\left(\\tfrac{m}{2}\\right)\\left(\\tfrac{L}{2}\\right)^2 = \\tfrac13 m\\left(\\tfrac{L}{2}\\right)^2' },
      { label: 'Answer', math: `I = ${fmt(answer)}\\text{ kg m}^2` },
    ],
  }),

  defineQuestion('PHY2_MI05', {
    sourceRef: 'P98',
    topic: 'momentOfInertia',
    difficulty: 3,
    params: { thickness: { min: 0.08, max: 0.15, step: 0.005 }, rpm: { min: 70, max: 100, step: 1 }, keMJ: { min: 6, max: 14, step: 0.5 } },
    prompt: (p) =>
      `A flywheel is made of iron (density 7800 kg/m³) in the shape of a ${fmt(p.thickness * 100)}-cm-thick uniform disk. What would the diameter of such a disk need to be if it is to store ${fmt(p.keMJ)} megajoules of kinetic energy when spinning at ${fmt(p.rpm)} rpm about an axis perpendicular to the disk at its center?`,
    compute: (p) => {
      const rho = 7800
      const omega = (p.rpm * 2 * Math.PI) / 60
      const KE = p.keMJ * 1e6
      const R4 = KE / (0.25 * rho * Math.PI * p.thickness * omega * omega)
      const R = Math.pow(R4, 0.25)
      return { value: 2 * R, unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'KE = \\tfrac14 \\rho \\pi t R^4 \\omega^2\\ \\ (M=\\rho\\pi R^2 t,\\ I=\\tfrac12MR^2)' },
      { label: 'Answer', math: `d = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY2_MI06', {
    sourceRef: 'P99',
    topic: 'momentOfInertia',
    difficulty: 3,
    params: { thickness: { min: 0.07, max: 0.13, step: 0.005 }, rpm: { min: 70, max: 100, step: 1 }, keMJ: { min: 5, max: 12, step: 0.5 } },
    prompt: (p) =>
      `A flywheel is made of iron (density 7800 kg/m³) in the shape of a ${fmt(p.thickness * 100)}-cm-thick uniform disk. If it is to store ${fmt(p.keMJ)} megajoules of kinetic energy when spinning at ${fmt(p.rpm)} rpm about an axis perpendicular to the disk at its center, what would be the centripetal acceleration of a point on its rim when spinning at this rate?`,
    compute: (p) => {
      const rho = 7800
      const omega = (p.rpm * 2 * Math.PI) / 60
      const KE = p.keMJ * 1e6
      const R4 = KE / (0.25 * rho * Math.PI * p.thickness * omega * omega)
      const R = Math.pow(R4, 0.25)
      return { value: omega * omega * R, unit: 'm/s^2', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'R = \\left(\\dfrac{4KE}{\\rho\\pi t\\omega^2}\\right)^{1/4},\\quad a_r = \\omega^2 R' },
      { label: 'Answer', math: `a_r = ${fmt(answer)}\\text{ m/s}^2` },
    ],
  }),

  defineQuestion('PHY2_MI07', {
    sourceRef: 'P100',
    topic: 'momentOfInertia',
    difficulty: 1,
    params: { mSolid: { min: 120, max: 260, step: 5 } },
    prompt: (p) =>
      `While redesigning a rocket engine, in order to reduce weight, a solid spherical part is replaced with a hollow spherical shell of the same size. The parts rotate about an axis through their center. You need to make sure that the new part always has the same rotational kinetic energy as the original part had at any given rate of rotation. If the original part had a mass of ${fmt(p.mSolid)} kg, what must be the mass of the new part?`,
    compute: (p) => ({ value: 0.6 * p.mSolid, unit: 'kg', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\tfrac25 M_1 R^2 = \\tfrac23 M_2 R^2 \\Rightarrow M_2 = 0.6\\,M_1' },
      { label: 'Answer', math: `M_2 = ${fmt(answer)}\\text{ kg}` },
    ],
  }),

  defineQuestion('PHY2_MI08', {
    sourceRef: 'P101',
    topic: 'momentOfInertia',
    difficulty: 2,
    params: { mDisk: { min: 130, max: 210, step: 5 }, R: { min: 3, max: 5, step: 0.2 } },
    prompt: (p) =>
      `A uniform, solid disk with mass ${fmt(p.mDisk)} kg and radius ${fmt(p.R)} m is pivoted about a horizontal axis through its center. A small object of the same mass ${fmt(p.mDisk)} kg is glued to the rim of the disk. If the disk is released from rest with the small object at the end of a horizontal radius, find the angular speed when the small object is directly below the axis. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const I_disk = I_diskOrSolidCylinder(p.mDisk, p.R)
      const I_total = I_disk + p.mDisk * p.R * p.R
      const w = Math.sqrt((2 * p.mDisk * G * p.R) / I_total)
      return { value: w, unit: 'rad/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'mgR = \\tfrac12 I_{tot}\\omega^2,\\quad I_{tot}=\\tfrac12M_{disk}R^2+mR^2' },
      { label: 'Answer', math: `\\omega = ${fmt(answer)}\\text{ rad/s}` },
    ],
  }),

  defineQuestion('PHY2_MI09', {
    sourceRef: 'P102',
    topic: 'momentOfInertia',
    difficulty: 2,
    params: { mDisk: { min: 110, max: 180, step: 5 }, R: { min: 3.5, max: 5.5, step: 0.2 }, mObj: { min: 120, max: 200, step: 5 } },
    prompt: (p) =>
      `A uniform, solid disk with mass ${fmt(p.mDisk)} kg and radius ${fmt(p.R)} m is pivoted about a horizontal axis through its center. A small object of mass ${fmt(p.mObj)} kg is glued to the rim of the disk. The disk is released from rest with the small object at the end of a horizontal radius. Find the magnitude of the angular acceleration of the disk at the instant it is released. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const I_disk = I_diskOrSolidCylinder(p.mDisk, p.R)
      const I_total = I_disk + p.mObj * p.R * p.R
      return { value: (p.mObj * G * p.R) / I_total, unit: 'rad/s^2', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: '\\alpha = \\dfrac{m_{obj}gR}{\\tfrac12M_{disk}R^2+m_{obj}R^2}' },
      { label: 'Answer', math: `\\alpha = ${fmt(answer)}\\text{ rad/s}^2` },
    ],
  }),

  defineQuestion('PHY2_MI10', {
    sourceRef: 'P103',
    topic: 'momentOfInertia',
    difficulty: 2,
    params: { base: { min: 3, max: 5, step: 0.1 }, height: { min: 1.3, max: 2.2, step: 0.1 }, m: { min: 2, max: 5, step: 0.2 } },
    prompt: (p) =>
      `A metal sign for a car dealership is a thin, uniform right triangle with base length of ${fmt(p.base)} m and height of ${fmt(p.height)} m. The sign has a mass of ${fmt(p.m)} kg. What is the moment of inertia of the sign for rotation about the side of length ${fmt(p.height)} m?`,
    compute: (p) => ({ value: I_rightTriangleAboutHeightLeg(p.m, p.base), unit: 'kg m^2', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'I = \\dfrac{m\\,B^2}{6}\\ \\ (B=\\text{base, perpendicular to the axis})' },
      { label: 'Answer', math: `I = ${fmt(answer)}\\text{ kg m}^2` },
    ],
  }),

  defineQuestion('PHY2_MI11', {
    sourceRef: 'P104',
    topic: 'momentOfInertia',
    difficulty: 2,
    params: { base: { min: 3.5, max: 5.5, step: 0.1 }, height: { min: 1.4, max: 2.3, step: 0.1 }, m: { min: 2.5, max: 5.5, step: 0.2 }, rps: { min: 1.6, max: 2.8, step: 0.1 } },
    prompt: (p) =>
      `A metal sign for a car dealership is a thin, uniform right triangle with base length of ${fmt(p.base)} m and height of ${fmt(p.height)} m. The sign has a mass of ${fmt(p.m)} kg. What is the kinetic energy of the sign when it is rotating about an axis along the ${fmt(p.height)} m side at ${fmt(p.rps)} rev/s?`,
    compute: (p) => {
      const I = I_rightTriangleAboutHeightLeg(p.m, p.base)
      const omega = p.rps * 2 * Math.PI
      return { value: 0.5 * I * omega * omega, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'I = \\dfrac{mB^2}{6},\\quad KE = \\tfrac12 I\\omega^2' },
      { label: 'Answer', math: `KE = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_MI12', {
    sourceRef: 'P105',
    topic: 'momentOfInertia',
    difficulty: 2,
    params: { m: { min: 8, max: 15, step: 0.5 }, L: { min: 2, max: 3, step: 0.1 }, rev: { min: 4, max: 8, step: 1 }, t: { min: 2, max: 4, step: 0.5 } },
    prompt: (p) =>
      `A thin, uniform ${fmt(p.m)}-kg bar that is ${fmt(p.L)} m long rotates uniformly about a pivot at one end, making ${fmt(p.rev)} complete revolutions every ${fmt(p.t)} seconds. What is the kinetic energy of this bar?`,
    compute: (p) => {
      const I = I_rodEnd(p.m, p.L)
      const omega = (p.rev * 2 * Math.PI) / p.t
      return { value: 0.5 * I * omega * omega, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'I=\\tfrac13mL^2,\\quad KE=\\tfrac12I\\omega^2' },
      { label: 'Answer', math: `KE = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_MI13', {
    sourceRef: 'P106',
    topic: 'momentOfInertia',
    difficulty: 2,
    params: { m: { min: 8, max: 15, step: 0.5 }, L: { min: 1.8, max: 2.8, step: 0.1 }, rev: { min: 3, max: 7, step: 1 }, t: { min: 2, max: 4, step: 0.5 } },
    prompt: (p) =>
      `A thin, uniform ${fmt(p.m)}-kg bar that is ${fmt(p.L)} m long rotates uniformly about a pivot at its center, making ${fmt(p.rev)} complete revolutions every ${fmt(p.t)} seconds. What is the kinetic energy of this bar?`,
    compute: (p) => {
      const I = I_rodCenter(p.m, p.L)
      const omega = (p.rev * 2 * Math.PI) / p.t
      return { value: 0.5 * I * omega * omega, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'I=\\tfrac{1}{12}mL^2,\\quad KE=\\tfrac12I\\omega^2' },
      { label: 'Answer', math: `KE = ${fmt(answer)}\\text{ J}` },
    ],
  }),
]
