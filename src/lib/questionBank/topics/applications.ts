import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import {
  accelFromHangingAngle,
  apparentWeight,
  apparentWeightHillTop,
  apparentWeightValleyBottom,
  areaFromTerminalVelocity,
  clotheslineTension,
  cordAngleFriction,
  cordAngleMaxWeight,
  cordAngleMinMu,
  dragBlockFromUnder,
  dragBlockTogether,
  inclinePulleyMassForAccel,
  inclinePulleyTensionFromM1,
  maxSpeedHillTop,
  movablePulleyForce,
  movablePulleyForceWithAccel,
  normalForceCylinderBottom,
  normalForceCylinderTop,
  minSpeedCylinderTop,
  terminalVelocity,
  twoRopeMaxWeight,
  twoRopeTensionAtAngle,
  windowBrushForce,
  windowBrushNormal,
} from '../../physics/newton'
import { toRad } from '../../physics/vectors'

const G = 9.8

export const applicationsQuestions = [
  defineQuestion('PHY_AP01', {
    sourceRef: 'P121',
    topic: 'applications',
    difficulty: 3,
    params: { maxT: { min: 3000, max: 5000, step: 100 }, angle1: { min: 50, max: 70, step: 1 }, angle2: { min: 30, max: 45, step: 1 } },
    prompt: (p) =>
      `Two ropes are connected to a steel cable that supports a hanging weight; the ropes make angles of ${fmt(p.angle1)}° and ${fmt(p.angle2)}° with the ceiling. If the maximum tension either rope can sustain without breaking is ${fmt(p.maxT)} N, determine the maximum value of the hanging weight that those ropes can safely support. Ignore the weight of the ropes and the steel cable.`,
    compute: (p) => ({
      value: twoRopeMaxWeight(p.maxT, toRad(p.angle1), toRad(p.angle2)),
      unit: 'N',
      tolerance: { mode: 'relative', value: 0.02 },
    }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'T_1\\cos\\theta_1=T_2\\cos\\theta_2,\\quad W=T_1\\sin\\theta_1+T_2\\sin\\theta_2' },
      { label: 'Answer', math: `W_{max} = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: (p) => ({ kind: 'twoRopeHanging', props: { angle1: p.angle1, angle2: p.angle2 } }),
  }),

  defineQuestion('PHY_AP02', {
    sourceRef: 'P122',
    topic: 'applications',
    difficulty: 2,
    params: { W: { min: 3000, max: 4500, step: 50 }, angle1: { min: 50, max: 70, step: 1 }, angle2: { min: 30, max: 45, step: 1 } },
    prompt: (p) =>
      `Two ropes are connected to a steel cable that supports a hanging weight of ${fmt(p.W)} N. The ropes make angles of ${fmt(p.angle1)}° and ${fmt(p.angle2)}° with the ceiling. Determine the tension in the rope that makes the ${fmt(p.angle2)}° angle with the ceiling. Ignore the weight of the ropes and the steel cable.`,
    compute: (p) => ({
      value: twoRopeTensionAtAngle(p.W, toRad(p.angle2), toRad(p.angle1)),
      unit: 'N',
      tolerance: { mode: 'relative', value: 0.02 },
    }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'T_2 = \\dfrac{W}{\\cos\\theta_2\\tan\\theta_1+\\sin\\theta_2}' },
      { label: 'Answer', math: `T_2 = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: (p) => ({ kind: 'twoRopeHanging', props: { angle1: p.angle1, angle2: p.angle2 } }),
  }),

  defineQuestion('PHY_AP03', {
    sourceRef: 'P123',
    topic: 'applications',
    difficulty: 1,
    params: { W: { min: 300, max: 550, step: 10 } },
    prompt: (p) =>
      `A worker lifts a weight of ${fmt(p.W)} N by pulling down on a rope with a force F, using a movable pulley. Find the magnitude of the force F if the weight is lifted at a constant speed. Assume that the rope, pulleys, and chains all have negligible weight.`,
    compute: (p) => ({ value: movablePulleyForce(p.W), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = W/2\\ \\ \\text{(2 supporting rope segments)}' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p123-124.png' } }),
  }),

  defineQuestion('PHY_AP04', {
    sourceRef: 'P124',
    topic: 'applications',
    difficulty: 2,
    params: { W: { min: 300, max: 500, step: 10 }, a: { min: 1, max: 3, step: 0.1 } },
    prompt: (p) =>
      `A worker lifts a weight of ${fmt(p.W)} N using a movable-pulley arrangement, by pulling down on a rope with a force F. Find the magnitude of the force F if the weight is lifted with a constant upward acceleration of ${fmt(p.a)} m/s². Assume that the rope, pulleys, and chains all have negligible weight. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: movablePulleyForceWithAccel(p.W, p.a, G), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = \\dfrac{W(g+a)}{2g}' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p123-124.png' } }),
  }),

  defineQuestion('PHY_AP05', {
    sourceRef: 'P125',
    topic: 'applications',
    difficulty: 2,
    params: { massG: { min: 400, max: 900, step: 20 }, angleDeg: { min: 10, max: 22, step: 1 } },
    prompt: (p) =>
      `A clothesline has a mass of ${fmt(p.massG)} g, and each end makes an angle of ${fmt(p.angleDeg)}° with the horizontal. What is the tension at each end of the clothesline? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({
      value: clotheslineTension((p.massG / 1000) * G, toRad(p.angleDeg)),
      unit: 'N',
      tolerance: { mode: 'relative', value: 0.01 },
    }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'T = \\dfrac{mg}{2\\sin\\theta}' },
      { label: 'Answer', math: `T = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p125-126.png' } }),
  }),

  defineQuestion('PHY_AP06', {
    sourceRef: 'P126',
    topic: 'applications',
    difficulty: 2,
    params: { massG: { min: 500, max: 1000, step: 20 }, angleFromVerticalDeg: { min: 65, max: 78, step: 1 } },
    prompt: (p) =>
      `A clothesline has a mass of ${fmt(p.massG)} g, and each end makes an angle of ${fmt(p.angleFromVerticalDeg)}° with the vertical. What is the tension at each end of the clothesline? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const angleFromHorizontal = 90 - p.angleFromVerticalDeg
      return {
        value: clotheslineTension((p.massG / 1000) * G, toRad(angleFromHorizontal)),
        unit: 'N',
        tolerance: { mode: 'relative', value: 0.01 },
      }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'T = \\dfrac{mg}{2\\sin(90°-\\theta_{vert})}' },
      { label: 'Answer', math: `T = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: (p) => ({ kind: 'clothesline', props: { angleDeg: 90 - p.angleFromVerticalDeg } }),
  }),

  defineQuestion('PHY_AP07', {
    sourceRef: 'P127',
    topic: 'applications',
    difficulty: 3,
    params: { m1: { min: 150, max: 320, step: 5 }, alphaDeg: { min: 25, max: 45, step: 1 }, mu: { min: 0.05, max: 0.15, step: 0.01 } },
    prompt: (p) =>
      `A block with mass m₁ = ${fmt(p.m1)} kg is placed on an inclined plane with slope angle α = ${fmt(p.alphaDeg)}° and is connected to a second hanging block with mass m₂ by a cord passing over a small, frictionless pulley. The coefficient of kinetic friction is ${fmt(p.mu)}. Find the mass m₂ for which block m₁ moves up the plane at constant speed once it is set in motion.`,
    compute: (p) => ({
      value: inclinePulleyMassForAccel(p.m1, toRad(p.alphaDeg), p.mu, G, 0, 1),
      unit: 'kg',
      tolerance: { mode: 'relative', value: 0.01 },
    }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'm_2 g = m_1 g\\sin\\alpha + \\mu m_1 g\\cos\\alpha' },
      { label: 'Answer', math: `m_2 = ${fmt(answer)}\\text{ kg}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p127-130.png' } }),
  }),

  defineQuestion('PHY_AP08', {
    sourceRef: 'P128',
    topic: 'applications',
    difficulty: 3,
    params: { m1: { min: 100, max: 250, step: 5 }, alphaDeg: { min: 22, max: 40, step: 1 }, mu: { min: 0.04, max: 0.12, step: 0.005 } },
    constraints: (p) => Math.tan(toRad(p.alphaDeg)) > p.mu * 1.3,
    prompt: (p) =>
      `A block with mass m₁ = ${fmt(p.m1)} kg is placed on an inclined plane with slope angle α = ${fmt(p.alphaDeg)}° and is connected to a second hanging block with mass m₂ by a cord passing over a small, frictionless pulley. The coefficient of kinetic friction is ${fmt(p.mu)}. Find the mass m₂ for which block m₁ moves down the plane at constant speed once it is set in motion.`,
    compute: (p) => ({
      value: inclinePulleyMassForAccel(p.m1, toRad(p.alphaDeg), p.mu, G, 0, -1),
      unit: 'kg',
      tolerance: { mode: 'relative', value: 0.01 },
    }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'm_1 g\\sin\\alpha = m_2 g + \\mu m_1 g\\cos\\alpha' },
      { label: 'Answer', math: `m_2 = ${fmt(answer)}\\text{ kg}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p127-130.png' } }),
  }),

  defineQuestion('PHY_AP09', {
    sourceRef: 'P129',
    topic: 'applications',
    difficulty: 3,
    params: { m1: { min: 130, max: 260, step: 5 }, alphaDeg: { min: 26, max: 40, step: 1 }, mu: { min: 0.08, max: 0.16, step: 0.01 }, a: { min: 0.8, max: 1.8, step: 0.1 } },
    prompt: (p) =>
      `A block with mass m₁ = ${fmt(p.m1)} kg is placed on an inclined plane with slope angle α = ${fmt(p.alphaDeg)}° and is connected to a second hanging block by a cord passing over a small, frictionless pulley. The coefficient of kinetic friction between m₁ and the incline is ${fmt(p.mu)}. Find the mass m₂ for which m₁ moves up the plane with a constant acceleration of ${fmt(p.a)} m/s². The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({
      value: inclinePulleyMassForAccel(p.m1, toRad(p.alphaDeg), p.mu, G, p.a, 1),
      unit: 'kg',
      tolerance: { mode: 'relative', value: 0.02 },
    }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'm_2(g-a) = m_1 a + m_1 g\\sin\\alpha + \\mu m_1 g\\cos\\alpha' },
      { label: 'Answer', math: `m_2 = ${fmt(answer)}\\text{ kg}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p127-130.png' } }),
  }),

  defineQuestion('PHY_AP10', {
    sourceRef: 'P130',
    topic: 'applications',
    difficulty: 2,
    params: { m1: { min: 160, max: 280, step: 5 }, alphaDeg: { min: 30, max: 46, step: 1 }, mu: { min: 0.04, max: 0.12, step: 0.01 } },
    prompt: (p) =>
      `A block with mass m₁ = ${fmt(p.m1)} kg is placed on an inclined plane with slope angle α = ${fmt(p.alphaDeg)}° and is connected to a second hanging block by a cord passing over a small, frictionless pulley. The coefficient of kinetic friction between m₁ and the incline is ${fmt(p.mu)}. Find the tension in the cord for which m₁ moves up the plane at constant speed once it is set in motion. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({
      value: inclinePulleyTensionFromM1(p.m1, toRad(p.alphaDeg), p.mu, G, 0, 1),
      unit: 'N',
      tolerance: { mode: 'relative', value: 0.01 },
    }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'T = m_1 g\\sin\\alpha + \\mu m_1 g\\cos\\alpha' },
      { label: 'Answer', math: `T = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p127-130.png' } }),
  }),

  defineQuestion('PHY_AP11', {
    sourceRef: 'P131',
    topic: 'applications',
    difficulty: 3,
    params: { WA: { min: 55, max: 85, step: 1 }, mu: { min: 0.2, max: 0.35, step: 0.01 }, angleDeg: { min: 40, max: 60, step: 1 }, w: { min: 8, max: 20, step: 1 } },
    prompt: (p) =>
      `Block A weighs ${fmt(p.WA)} N. The coefficient of static friction between the block and the surface on which it rests is ${fmt(p.mu)}. The angle of the cord with the horizontal is α = ${fmt(p.angleDeg)}°. The weight w is ${fmt(p.w)} N and the system is in equilibrium. Find the friction force exerted on block A.`,
    compute: (p) => ({ value: cordAngleFriction(p.w, toRad(p.angleDeg)), unit: 'N', tolerance: { mode: 'relative', value: 0.015 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'f = \\dfrac{w}{\\tan\\alpha}' },
      { label: 'Answer', math: `f = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p131-133.png' } }),
  }),

  defineQuestion('PHY_AP12', {
    sourceRef: 'P132',
    topic: 'applications',
    difficulty: 3,
    params: { WA: { min: 55, max: 85, step: 1 }, mu: { min: 0.15, max: 0.3, step: 0.01 }, angleDeg: { min: 35, max: 55, step: 1 } },
    prompt: (p) =>
      `Block A weighs ${fmt(p.WA)} N. The coefficient of static friction between the block and the surface on which it rests is ${fmt(p.mu)}. The angle of the cord with the horizontal is α = ${fmt(p.angleDeg)}°. Find the maximum weight w for which the system will remain in equilibrium.`,
    compute: (p) => ({ value: cordAngleMaxWeight(p.mu, p.WA, toRad(p.angleDeg)), unit: 'N', tolerance: { mode: 'relative', value: 0.015 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'w_{max} = \\mu W_A \\tan\\alpha' },
      { label: 'Answer', math: `w_{max} = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p131-133.png' } }),
  }),

  defineQuestion('PHY_AP13', {
    sourceRef: 'P133',
    topic: 'applications',
    difficulty: 3,
    params: { WA: { min: 45, max: 75, step: 1 }, angleDeg: { min: 45, max: 65, step: 1 }, w: { min: 10, max: 22, step: 1 } },
    prompt: (p) =>
      `Block A weighs ${fmt(p.WA)} N and rests on a horizontal surface. The angle of the cord with the horizontal is α = ${fmt(p.angleDeg)}°. The weight w is ${fmt(p.w)} N and the system is in equilibrium. What is the minimum coefficient of static friction between block A and the surface on which it rests?`,
    compute: (p) => ({ value: cordAngleMinMu(p.w, p.WA, toRad(p.angleDeg)), unit: '', tolerance: { mode: 'relative', value: 0.015 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\mu_{min} = \\dfrac{w}{W_A\\tan\\alpha}' },
      { label: 'Answer', math: `\\mu_{min} = ${fmt(answer)}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p131-133.png' } }),
  }),

  defineQuestion('PHY_AP14', {
    sourceRef: 'P134',
    topic: 'applications',
    difficulty: 2,
    params: { WA: { min: 0.8, max: 1.8, step: 0.05 }, WB: { min: 2.5, max: 4, step: 0.05 }, mu: { min: 0.1, max: 0.25, step: 0.01 } },
    prompt: (p) =>
      `Block A weighs ${fmt(p.WA)} N and B weighs ${fmt(p.WB)} N. The coefficient of kinetic friction between block B and the surfaces is ${fmt(p.mu)}, and the coefficient of static friction between block A and block B is ${fmt(p.mu)}. Find the magnitude of the horizontal force F necessary to drag block B to the left at constant speed if A rests on B and moves with it.`,
    compute: (p) => ({ value: dragBlockTogether(p.WA, p.WB, p.mu), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (_p, answer) => [
      { label: 'Formula', math: 'F = \\mu(W_A+W_B)' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p134-136.png' } }),
  }),

  defineQuestion('PHY_AP15', {
    sourceRef: 'P135',
    topic: 'applications',
    difficulty: 3,
    params: { WA: { min: 0.7, max: 1.6, step: 0.05 }, WB: { min: 2.5, max: 4, step: 0.05 }, mu: { min: 0.15, max: 0.3, step: 0.01 } },
    prompt: (p) =>
      `Block A weighs ${fmt(p.WA)} N and B weighs ${fmt(p.WB)} N. The coefficient of kinetic friction between all surfaces is ${fmt(p.mu)}. Find the magnitude of the horizontal force F necessary to drag block B to the left at constant speed if A is held at rest.`,
    compute: (p) => ({ value: dragBlockFromUnder(p.WA, p.WB, p.mu), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (_p, answer) => [
      { label: 'Formula', math: 'F = \\mu(W_B+2W_A)' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p135.png' } }),
  }),

  defineQuestion('PHY_AP16', {
    sourceRef: 'P136',
    topic: 'applications',
    difficulty: 2,
    params: { WA: { min: 0.8, max: 1.6, step: 0.05 }, WB: { min: 2.5, max: 4, step: 0.05 }, mu: { min: 0.1, max: 0.25, step: 0.01 } },
    prompt: (p) =>
      `Block A weighs ${fmt(p.WA)} N and block B weighs ${fmt(p.WB)} N. The coefficient of kinetic friction between block B and the floor is ${fmt(p.mu)}. The cord connecting block A to the wall has been cut, so block A rests freely on top of B and moves together with it. Find the magnitude of the horizontal force F necessary to drag block B to the left at constant speed.`,
    compute: (p) => ({ value: dragBlockTogether(p.WA, p.WB, p.mu), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (_p, answer) => [
      { label: 'Formula', math: 'F = \\mu(W_A+W_B)' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p134-136.png' } }),
  }),

  defineQuestion('PHY_AP17', {
    sourceRef: 'P137',
    topic: 'applications',
    difficulty: 3,
    params: { W: { min: 7, max: 18, step: 0.5 }, angleDeg: { min: 48, max: 65, step: 0.5 }, mu: { min: 0.1, max: 0.22, step: 0.01 } },
    prompt: (p) =>
      `A window washer pushes his scrub brush up a vertical window at constant speed by applying a force F at an angle α = ${fmt(p.angleDeg)}°. The brush weighs ${fmt(p.W)} N and the coefficient of kinetic friction is μk = ${fmt(p.mu)}. Calculate the magnitude of the force F.`,
    compute: (p) => ({ value: windowBrushForce(p.W, p.mu, toRad(p.angleDeg), G), unit: 'N', tolerance: { mode: 'relative', value: 0.02 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = \\dfrac{W}{\\sin\\alpha - \\mu_k\\cos\\alpha}' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p137-138.png' } }),
  }),

  defineQuestion('PHY_AP18', {
    sourceRef: 'P138',
    topic: 'applications',
    difficulty: 3,
    params: { W: { min: 6, max: 14, step: 0.5 }, angleDeg: { min: 48, max: 62, step: 0.5 }, mu: { min: 0.08, max: 0.2, step: 0.01 } },
    prompt: (p) =>
      `A window washer pushes his scrub brush up a vertical window at constant speed by applying a force F at an angle α = ${fmt(p.angleDeg)}°. The brush weighs ${fmt(p.W)} N and the coefficient of kinetic friction is μk = ${fmt(p.mu)}. Calculate the normal force exerted by the window on the brush.`,
    compute: (p) => {
      const F = windowBrushForce(p.W, p.mu, toRad(p.angleDeg), G)
      return { value: windowBrushNormal(F, toRad(p.angleDeg)), unit: 'N', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = \\dfrac{W}{\\sin\\alpha-\\mu_k\\cos\\alpha},\\quad N=F\\cos\\alpha' },
      { label: 'Answer', math: `N = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p137-138.png' } }),
  }),

  defineQuestion('PHY_AP19', {
    sourceRef: 'P139',
    topic: 'applications',
    difficulty: 3,
    params: { W: { min: 7, max: 15, step: 0.5 }, angleDeg: { min: 48, max: 60, step: 0.5 }, mu: { min: 0.1, max: 0.22, step: 0.01 }, a: { min: 0.5, max: 1.5, step: 0.1 } },
    prompt: (p) =>
      `A window washer pushes his scrub brush up a vertical window with a constant upward acceleration of ${fmt(p.a)} m/s² by applying a force F at an angle α = ${fmt(p.angleDeg)}° above the horizontal. The brush weighs ${fmt(p.W)} N and the coefficient of kinetic friction is μk = ${fmt(p.mu)}. Calculate the magnitude of the force F. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({
      value: windowBrushForce(p.W, p.mu, toRad(p.angleDeg), G, p.a),
      unit: 'N',
      tolerance: { mode: 'relative', value: 0.02 },
    }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = \\dfrac{W(1+a/g)}{\\sin\\alpha-\\mu_k\\cos\\alpha}' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: (p) => ({ kind: 'windowBrush', props: { angleDeg: p.angleDeg } }),
  }),

  defineQuestion('PHY_AP20', {
    sourceRef: 'P140',
    topic: 'applications',
    difficulty: 2,
    params: { mass: { min: 50, max: 80, step: 1 }, c1: { min: 1.5, max: 2.5, step: 0.1 }, c2: { min: 0.1, max: 0.22, step: 0.01 }, t: { min: 3, max: 6, step: 0.5 } },
    prompt: (p) =>
      `You are standing on a bathroom scale in an elevator. Your mass is ${fmt(p.mass)} kg. The elevator starts from rest and travels upward with a speed that varies with time according to v(t) = (${fmt(p.c1)} m/s²)t + (${fmt(p.c2)} m/s³)t². When t = ${fmt(p.t)} s, what is the reading of the bathroom scale? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => {
      const a = p.c1 + 2 * p.c2 * p.t
      return { value: apparentWeight(p.mass, a, G), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'a(t) = \\dfrac{dv}{dt} = c_1 + 2c_2 t,\\quad F = m(g+a)' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
  }),

  defineQuestion('PHY_AP21', {
    sourceRef: 'P141',
    topic: 'applications',
    difficulty: 2,
    params: { angleWithCeilingDeg: { min: 60, max: 75, step: 1 } },
    prompt: (p) =>
      `A hammer hangs by a light rope from the ceiling of a bus. The bus travels in a straight line on a horizontal street. You observe that the hammer hangs at rest with respect to the bus when the angle between the rope and the ceiling of the bus is ${fmt(p.angleWithCeilingDeg)}°. What is the acceleration of the bus? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({
      value: accelFromHangingAngle(toRad(90 - p.angleWithCeilingDeg), G),
      unit: 'm/s²',
      tolerance: { mode: 'relative', value: 0.01 },
    }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\theta_{vert} = 90°-\\theta_{ceiling},\\quad a = g\\tan\\theta_{vert}' },
      { label: 'Answer', math: `a = ${fmt(answer)}\\text{ m/s}^2` },
    ],
  }),

  defineQuestion('PHY_AP22', {
    sourceRef: 'P142',
    topic: 'applications',
    difficulty: 1,
    params: { angleFromVerticalDeg: { min: 20, max: 35, step: 0.5 } },
    prompt: (p) =>
      `A hammer hangs by a light rope from the ceiling of a bus. The bus travels in a straight line on a horizontal street. You observe that the hammer hangs at rest with respect to the bus when the angle between the rope and the vertical direction is ${fmt(p.angleFromVerticalDeg)}°. What is the acceleration of the bus? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: accelFromHangingAngle(toRad(p.angleFromVerticalDeg), G), unit: 'm/s²', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'a = g\\tan\\theta' },
      { label: 'Answer', math: `a = ${fmt(answer)}\\text{ m/s}^2` },
    ],
  }),

  defineQuestion('PHY_AP23', {
    sourceRef: 'P143',
    topic: 'applications',
    difficulty: 2,
    params: { mass: { min: 1.5, max: 3, step: 0.1 }, v: { min: 9, max: 14, step: 0.2 }, r: { min: 3, max: 5, step: 0.2 } },
    prompt: (p) =>
      `A small remote-control car with mass ${fmt(p.mass)} kg moves at a constant speed of v = ${fmt(p.v)} m/s in a vertical circle inside a hollow metal cylinder that has a radius of ${fmt(p.r)} m. What is the magnitude of the normal force exerted on the car by the walls of the cylinder at the bottom (point A)? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: normalForceCylinderBottom(p.mass, p.v, p.r, G), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'N = m\\left(\\dfrac{v^2}{r}+g\\right)' },
      { label: 'Answer', math: `N = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p143.png' } }),
  }),

  defineQuestion('PHY_AP24', {
    sourceRef: 'P144',
    topic: 'applications',
    difficulty: 2,
    params: { mass: { min: 1.5, max: 3, step: 0.1 }, v: { min: 10, max: 15, step: 0.2 }, r: { min: 3, max: 5, step: 0.2 } },
    constraints: (p) => (p.v * p.v) / p.r > G * 1.2,
    prompt: (p) =>
      `A small remote-control car with mass ${fmt(p.mass)} kg moves at a constant speed of v = ${fmt(p.v)} m/s in a vertical circle inside a hollow metal cylinder that has a radius of ${fmt(p.r)} m. What is the magnitude of the normal force exerted on the car by the walls of the cylinder at the top (point B)? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: normalForceCylinderTop(p.mass, p.v, p.r, G), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'N = m\\left(\\dfrac{v^2}{r}-g\\right)' },
      { label: 'Answer', math: `N = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p144-145.png' } }),
  }),

  defineQuestion('PHY_AP25', {
    sourceRef: 'P145',
    topic: 'applications',
    difficulty: 2,
    params: { mass: { min: 1.5, max: 2.5, step: 0.1 }, r: { min: 3.5, max: 5, step: 0.1 } },
    prompt: (p) =>
      `A small remote-control car with mass ${fmt(p.mass)} kg moves in a vertical circle inside a hollow metal cylinder that has a radius of ${fmt(p.r)} m. What is the minimum speed the car must have at the top (point B) in order to maintain contact with the wall of the cylinder? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: minSpeedCylinderTop(p.r, G), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_{min} = \\sqrt{gr}' },
      { label: 'Answer', math: `v_{min} = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: () => ({ kind: 'exerciseImage', props: { src: '/exercise-images/p144-145.png' } }),
  }),

  defineQuestion('PHY_AP26', {
    sourceRef: 'P146',
    topic: 'applications',
    difficulty: 2,
    params: { mass: { min: 60, max: 90, step: 1 }, rho: { min: 1.1, max: 1.3, step: 0.01 }, area: { min: 0.5, max: 0.9, step: 0.02 } },
    prompt: (p) =>
      `Find the terminal velocity of a ${fmt(p.mass)}-kg skydiver falling in a spread-eagle position. Assume the density of air is ρ = ${fmt(p.rho)} kg/m³, the skydiver has a cross-sectional area of A = ${fmt(p.area)} m² and a drag coefficient of C = 1. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: terminalVelocity(p.mass, G, p.rho, p.area, 1), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_t = \\sqrt{\\dfrac{2mg}{\\rho A C}}' },
      { label: 'Answer', math: `v_t = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_AP27', {
    sourceRef: 'P147',
    topic: 'applications',
    difficulty: 2,
    params: { mass: { min: 65, max: 90, step: 1 }, C: { min: 0.6, max: 1, step: 0.05 }, vt: { min: 40, max: 55, step: 0.5 }, rho: { min: 1.1, max: 1.25, step: 0.01 } },
    prompt: (p) =>
      `A ${fmt(p.mass)}-kg skydiver falling in a spread-eagle position has a drag coefficient of C = ${fmt(p.C)} and reaches a terminal velocity of ${fmt(p.vt)} m/s. The density of air is ρ = ${fmt(p.rho)} kg/m³. What is the skydiver's cross-sectional area? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: areaFromTerminalVelocity(p.mass, G, p.rho, p.C, p.vt), unit: 'm²', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'A = \\dfrac{2mg}{\\rho C v_t^2}' },
      { label: 'Answer', math: `A = ${fmt(answer)}\\text{ m}^2` },
    ],
  }),

  defineQuestion('PHY_AP28', {
    sourceRef: 'P148',
    topic: 'applications',
    difficulty: 2,
    params: { personMass: { min: 60, max: 85, step: 1 }, cartMass: { min: 20, max: 40, step: 1 }, v: { min: 9, max: 13, step: 0.5 }, r: { min: 32, max: 48, step: 1 } },
    prompt: (p) =>
      `A ${fmt(p.personMass)}-kg person rides in a ${fmt(p.cartMass)}-kg cart moving at ${fmt(p.v)} m/s at the top of a hill that is in the shape of an arc of a circle with a radius of ${fmt(p.r)} m. What is the apparent weight of the person as the cart passes over the top of the hill? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: apparentWeightHillTop(p.personMass, p.v, p.r, G), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = m\\left(g-\\dfrac{v^2}{r}\\right)' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: (p) => ({ kind: 'hillValley', props: { r: p.r, shape: 'hill' } }),
  }),

  defineQuestion('PHY_AP29', {
    sourceRef: 'P149',
    topic: 'applications',
    difficulty: 2,
    params: { personMass: { min: 60, max: 85, step: 1 }, cartMass: { min: 15, max: 35, step: 1 }, v: { min: 9, max: 14, step: 0.5 }, r: { min: 36, max: 50, step: 1 } },
    prompt: (p) =>
      `A ${fmt(p.personMass)}-kg person rides in a ${fmt(p.cartMass)}-kg cart moving at ${fmt(p.v)} m/s at the top of a hill that is in the shape of an arc of a circle with a radius of ${fmt(p.r)} m. Determine the maximum speed that the cart may travel at the top of the hill without losing contact with the surface. The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: maxSpeedHillTop(p.r, G), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_{max} = \\sqrt{rg}' },
      { label: 'Answer', math: `v_{max} = ${fmt(answer)}\\text{ m/s}` },
    ],
    diagram: (p) => ({ kind: 'hillValley', props: { r: p.r, shape: 'hill' } }),
  }),

  defineQuestion('PHY_AP30', {
    sourceRef: 'P150',
    topic: 'applications',
    difficulty: 2,
    params: { personMass: { min: 65, max: 90, step: 1 }, cartMass: { min: 25, max: 45, step: 1 }, v: { min: 9, max: 14, step: 0.5 }, r: { min: 35, max: 50, step: 1 } },
    prompt: (p) =>
      `A ${fmt(p.personMass)}-kg person rides in a ${fmt(p.cartMass)}-kg cart moving at ${fmt(p.v)} m/s at the bottom of a valley that is in the shape of an arc of a circle with a radius of ${fmt(p.r)} m. What is the apparent weight of the person as the cart passes through the lowest point of the valley? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: apparentWeightValleyBottom(p.personMass, p.v, p.r, G), unit: 'N', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'F = m\\left(g+\\dfrac{v^2}{r}\\right)' },
      { label: 'Answer', math: `F = ${fmt(answer)}\\text{ N}` },
    ],
    diagram: (p) => ({ kind: 'hillValley', props: { r: p.r, shape: 'valley' } }),
  }),
]
