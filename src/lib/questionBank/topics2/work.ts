import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import { workConstantForce, workFrictionIncline } from '../../physics/work'
import { toRad } from '../../physics/vectors'

const G = 9.8

export const workQuestions = [
  defineQuestion('PHY2_W01', {
    sourceRef: 'P1',
    topic: 'work',
    difficulty: 1,
    params: { m: { min: 40, max: 90, step: 0.5 }, d: { min: 1.5, max: 4, step: 0.1 }, F: { min: 40, max: 100, step: 0.5 } },
    prompt: (p) =>
      `Determine the work necessary to push (not pull) a mass of ${fmt(p.m)} kg horizontally at a distance of ${fmt(p.d)} m by a force of ${fmt(p.F)} N on a horizontal frictionless surface.`,
    compute: (p) => ({ value: workConstantForce(p.F, 0, p.d), unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'W = Fd' },
      { label: 'Answer', math: `W = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_W02', {
    sourceRef: 'P2',
    topic: 'work',
    difficulty: 1,
    params: { m: { min: 15, max: 40, step: 0.5 }, d: { min: 2, max: 5, step: 0.1 }, F: { min: 40, max: 100, step: 0.5 }, angleDeg: { min: 10, max: 30, step: 1 } },
    prompt: (p) =>
      `Determine the work necessary to push a mass of ${fmt(p.m)} kg a distance of ${fmt(p.d)} m along a horizontal frictionless surface by a force of ${fmt(p.F)} N directed at an angle of ${fmt(p.angleDeg)}° below the horizontal.`,
    compute: (p) => ({ value: workConstantForce(p.F, toRad(p.angleDeg), p.d), unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'W = F\\cos\\theta \\, d' },
      { label: 'Answer', math: `W = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_W03', {
    sourceRef: 'P3',
    topic: 'work',
    difficulty: 1,
    params: { m: { min: 0.5, max: 3, step: 0.1 }, h1: { min: 0.1, max: 0.5, step: 0.05 }, h2: { min: 1, max: 2, step: 0.1 } },
    prompt: (p) =>
      `Find the magnitude of work to be done lifting the mass of ${fmt(p.m)} kg from height ${fmt(p.h1)} m up to ${fmt(p.h2)} m. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: p.m * G * (p.h2 - p.h1), unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'W = mg(h_2-h_1)' },
      { label: 'Answer', math: `W = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_W04', {
    sourceRef: 'P4',
    topic: 'work',
    difficulty: 2,
    params: { m: { min: 0.2, max: 0.8, step: 0.05 }, R: { min: 0.5, max: 1.5, step: 0.05 } },
    prompt: (p) =>
      `A small particle of mass ${fmt(p.m * 1000)} g is pulled to the top of a frictionless half-cylinder of radius ${fmt(p.R)} m by a cord that passes over the top of the cylinder, as illustrated in the figure. Find the work done by F in moving the particle at constant speed from the bottom to the top of the half-cylinder. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: p.m * G * p.R, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', text: 'Constant speed ⇒ ΔKE = 0, so W_F = -W_gravity = mgR (the particle rises a height R).' },
      { label: 'Formula', math: 'W_F = mgR' },
      { label: 'Answer', math: `W_F = ${fmt(answer)}\\text{ J}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p4-5.png' } }),
  }),

  defineQuestion('PHY2_W05', {
    sourceRef: 'P5',
    topic: 'work',
    difficulty: 2,
    params: { m: { min: 0.3, max: 1, step: 0.05 }, R: { min: 0.8, max: 2, step: 0.05 } },
    prompt: (p) =>
      `A small particle of mass ${fmt(p.m)} kg is pulled at constant speed to the top of a frictionless half-cylinder of radius ${fmt(p.R)} m by a cord that passes over the top of the cylinder. Find the work done by gravity on the particle as it moves from the bottom to the top. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: -p.m * G * p.R, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'W_{gravity} = -mgR' },
      { label: 'Answer', math: `W_{gravity} = ${fmt(answer)}\\text{ J}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p4-5.png' } }),
  }),

  defineQuestion('PHY2_W06', {
    sourceRef: 'P6',
    topic: 'work',
    difficulty: 2,
    params: { m: { min: 2, max: 8, step: 0.5 }, x0: { min: 1, max: 2.5, step: 0.1 }, xf: { min: 3, max: 6, step: 0.5 } },
    prompt: (p) =>
      `When a ${fmt(p.m)} kg object is hung vertically on a certain light spring described by Hooke's law, the spring stretches ${fmt(p.x0)} cm. If the object is removed, how much work must an external agent do to stretch the same spring ${fmt(p.xf)} cm from its unstretched position? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const k = (p.m * G) / (p.x0 / 100)
      return { value: 0.5 * k * (p.xf / 100) ** 2, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'k = \\dfrac{mg}{x_0},\\quad W = \\tfrac12 k x_f^2' },
      { label: 'Answer', math: `W = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_W07', {
    sourceRef: 'P7',
    topic: 'work',
    difficulty: 2,
    params: { x: { min: 0.6, max: 1.5, step: 0.05 }, W: { min: 2, max: 5, step: 0.1 } },
    prompt: (p) =>
      `A woman steps on a bathroom scale containing a stiff spring. In equilibrium the spring is compressed ${fmt(p.x)} cm under her weight. The total work done on the spring during the compression is ${fmt(p.W)} J. Find the woman's mass. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: (2 * p.W) / (G * (p.x / 100)), unit: 'kg', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'W = \\tfrac12 k x^2,\\ \\ k=\\dfrac{mg}{x} \\Rightarrow m = \\dfrac{2W}{gx}' },
      { label: 'Answer', math: `m = ${fmt(answer)}\\text{ kg}` },
    ],
  }),

  defineQuestion('PHY2_W08', {
    sourceRef: 'P8',
    topic: 'work',
    difficulty: 1,
    params: { m: { min: 55, max: 95, step: 0.5 }, x: { min: 0.8, max: 1.8, step: 0.05 } },
    prompt: (p) =>
      `A woman of mass ${fmt(p.m)} kg steps on a bathroom scale containing a stiff spring. In equilibrium the spring is compressed ${fmt(p.x)} cm under her weight. Find the total work done on the spring during the compression. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: 0.5 * p.m * G * (p.x / 100), unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'W = \\tfrac12 mgx\\ \\ (\\text{since } k=mg/x)' },
      { label: 'Answer', math: `W = ${fmt(answer)}\\text{ J}` },
    ],
  }),

  defineQuestion('PHY2_W09', {
    sourceRef: 'P9',
    topic: 'work',
    difficulty: 2,
    params: { F: { min: 3800, max: 5200, step: 50 }, angleDeg: { min: 25, max: 40, step: 0.5 }, f: { min: 2800, max: 3800, step: 50 }, d: { min: 15, max: 25, step: 0.5 } },
    prompt: (p) =>
      `A farmer pulls a sled with firewood by a tractor a distance of ${fmt(p.d)} m along level ground. The tractor exerts a constant ${fmt(p.F)} N force at an angle of ${fmt(p.angleDeg)}˚ above the horizontal, as shown in the figure. There is a ${fmt(p.f)} N friction force opposing the sled's motion. Find the total work done by all the forces on the sled.`,
    compute: (p) => ({ value: (p.F * Math.cos(toRad(p.angleDeg)) - p.f) * p.d, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'W_{net} = (F\\cos\\theta - f)\\,d' },
      { label: 'Answer', math: `W_{net} = ${fmt(answer)}\\text{ J}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p9-10.png' } }),
  }),

  defineQuestion('PHY2_W10', {
    sourceRef: 'P10',
    topic: 'work',
    difficulty: 1,
    params: { F: { min: 3800, max: 5200, step: 50 }, angleDeg: { min: 25, max: 40, step: 0.5 }, f: { min: 2800, max: 3800, step: 50 }, d: { min: 15, max: 25, step: 0.5 } },
    prompt: (p) =>
      `A farmer pulls a sled with firewood by a tractor a distance of ${fmt(p.d)} m along level ground. The tractor exerts a constant ${fmt(p.F)} N force at an angle of ${fmt(p.angleDeg)}° above the horizontal. There is a ${fmt(p.f)} N friction force opposing the sled's motion. Find the work done by the friction force on the sled.`,
    compute: (p) => ({ value: -p.f * p.d, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'W_{friction} = -f\\,d' },
      { label: 'Answer', math: `W_{friction} = ${fmt(answer)}\\text{ J}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p9-10.png' } }),
  }),

  defineQuestion('PHY2_W11', {
    sourceRef: 'P11',
    topic: 'work',
    difficulty: 2,
    params: { F: { min: 4, max: 12, step: 0.5 }, d: { min: 5, max: 12, step: 0.5 }, angleDeg: { min: 30, max: 60, step: 1 } },
    prompt: (p) =>
      `Two forces of equal magnitude ${fmt(p.F)} N, each at ${fmt(p.angleDeg)}° from the line of motion as shown, move an object on a horizontal surface a distance d = ${fmt(p.d)} m. Determine the work required to push the object this distance.`,
    compute: (p) => ({ value: 2 * p.F * Math.cos(toRad(p.angleDeg)) * p.d, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'W = 2F\\cos\\theta\\,d' },
      { label: 'Answer', math: `W = ${fmt(answer)}\\text{ J}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p11.png' } }),
  }),

  defineQuestion('PHY2_W12', {
    sourceRef: 'P12',
    topic: 'work',
    difficulty: 2,
    params: { m: { min: 12, max: 32, step: 1 }, angleDeg: { min: 22, max: 34, step: 1 }, F: { min: 130, max: 210, step: 5 }, mu: { min: 0.25, max: 0.4, step: 0.01 }, d: { min: 2, max: 4.5, step: 0.1 } },
    prompt: (p) =>
      `A luggage handler pulls a ${fmt(p.m)}-kg suitcase up a ramp inclined at ${fmt(p.angleDeg)}° above the horizontal by a force F of magnitude ${fmt(p.F)} N that acts parallel to the ramp. The coefficient of kinetic friction between the ramp and the suitcase is µₖ = ${fmt(p.mu)}. If the suitcase travels ${fmt(p.d)} m along the ramp, calculate the work done on the suitcase by the force F.`,
    compute: (p) => ({ value: p.F * p.d, unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'W_F = Fd\\ \\ (F\\text{ parallel to displacement})' },
      { label: 'Answer', math: `W_F = ${fmt(answer)}\\text{ J}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p12-14.png' } }),
  }),

  defineQuestion('PHY2_W13', {
    sourceRef: 'P13',
    topic: 'work',
    difficulty: 3,
    params: { m: { min: 12, max: 26, step: 1 }, angleDeg: { min: 22, max: 34, step: 1 }, F: { min: 150, max: 220, step: 5 }, mu: { min: 0.25, max: 0.4, step: 0.01 }, d: { min: 2.5, max: 4.5, step: 0.1 } },
    prompt: (p) =>
      `A luggage handler pulls a ${fmt(p.m)}-kg suitcase up a ramp inclined at ${fmt(p.angleDeg)}° above the horizontal by a force F of magnitude ${fmt(p.F)} N that acts parallel to the ramp. The coefficient of kinetic friction between the ramp and the suitcase is ${fmt(p.mu)}. If the suitcase travels ${fmt(p.d)} m along the ramp, calculate the work done on the suitcase by the friction force. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: workFrictionIncline(p.mu, p.m, G, toRad(p.angleDeg), p.d), unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'W_{friction} = -\\mu m g\\cos\\theta\\,d' },
      { label: 'Answer', math: `W_{friction} = ${fmt(answer)}\\text{ J}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p12-14.png' } }),
  }),

  defineQuestion('PHY2_W14', {
    sourceRef: 'P14',
    topic: 'work',
    difficulty: 2,
    params: { m: { min: 12, max: 26, step: 1 }, angleDeg: { min: 24, max: 36, step: 1 }, F: { min: 140, max: 200, step: 5 }, mu: { min: 0.25, max: 0.4, step: 0.01 }, d: { min: 3, max: 5, step: 0.1 } },
    prompt: (p) =>
      `A luggage handler pulls an ${fmt(p.m)}-kg suitcase up a ramp inclined at ${fmt(p.angleDeg)}° above the horizontal by a force F of magnitude ${fmt(p.F)} N that acts parallel to the ramp. The coefficient of kinetic friction between the ramp and the suitcase is µₖ = ${fmt(p.mu)}. If the suitcase travels ${fmt(p.d)} m along the ramp, calculate the magnitude of the work done on the suitcase by the gravitational force. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: p.m * G * p.d * Math.sin(toRad(p.angleDeg)), unit: 'J', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '|W_{gravity}| = mgd\\sin\\theta' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ J}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images-2/p12-14.png' } }),
  }),
]
