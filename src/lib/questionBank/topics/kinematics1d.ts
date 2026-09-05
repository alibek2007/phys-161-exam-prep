import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import {
  average,
  displacement,
  pursuitCatchDistance,
  pursuitCatchOfficerSpeed,
  pursuitCatchTime,
  pursuitMaxGap,
  sprinterMaxSpeed,
  timeFromDisplacement,
  velocityFromDisplacement,
} from '../../physics/kinematics'
import { toRad } from '../../physics/vectors'

const G = 9.8

export const kinematics1dQuestions = [
  defineQuestion('PHY_K1D_01', {
    sourceRef: 'P29',
    topic: 'kinematics1d',
    difficulty: 1,
    params: { half: { min: 15, max: 30, step: 1 }, v1: { min: 8, max: 16, step: 1 }, vAvg: { min: 4, max: 7, step: 0.5 } },
    constraints: (p) => 2 / p.vAvg > 1 / p.v1 + 0.02,
    prompt: (p) =>
      `On a ${fmt(p.half * 2)} km bike ride, the first ${fmt(p.half)} km were covered at an average speed of ${fmt(p.v1)} km/h. What must the average speed over the next ${fmt(p.half)} km be to have your average speed for the total ${fmt(p.half * 2)} km be ${fmt(p.vAvg)} km/h? Use "km/h" units in the answer.`,
    compute: (p) => {
      const v2 = 1 / (2 / p.vAvg - 1 / p.v1)
      return { value: v2, unit: 'km/h', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', math: `d = ${fmt(p.half)}\\text{ km each half},\\ v_1=${fmt(p.v1)}\\text{ km/h},\\ v_{avg}=${fmt(p.vAvg)}\\text{ km/h}` },
      { label: 'Formula', math: '\\dfrac{2}{v_{avg}} = \\dfrac{1}{v_1} + \\dfrac{1}{v_2}' },
      { label: 'Answer', math: `v_2 = ${fmt(answer)}\\text{ km/h}` },
    ],
  }),

  defineQuestion('PHY_K1D_02', {
    sourceRef: 'P30',
    topic: 'kinematics1d',
    difficulty: 2,
    params: { t1: { min: 2, max: 4, step: 0.5 }, T: { min: 9, max: 11, step: 0.1 } },
    constraints: (p) => p.T - p.t1 / 2 > 4,
    prompt: (p) =>
      `A world-class sprinter accelerated to his maximum in ${fmt(p.t1)} s. He then maintains this speed for the remainder of a 100-m race, finishing with a total time of ${fmt(p.T)} s. What is the runner's average acceleration during the first ${fmt(p.t1)} s?`,
    compute: (p) => {
      const vmax = sprinterMaxSpeed(p.t1, p.T, 100)
      return { value: vmax / p.t1, unit: 'm/s²', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', math: `t_1 = ${fmt(p.t1)}\\text{ s},\\ T = ${fmt(p.T)}\\text{ s},\\ d=100\\text{ m}` },
      { label: 'Formula', math: 'v_{max} = \\dfrac{d}{T - t_1/2},\\quad a = \\dfrac{v_{max}}{t_1}' },
      { label: 'Answer', math: `a = ${fmt(answer)}\\text{ m/s}^2` },
    ],
  }),

  defineQuestion('PHY_K1D_03', {
    sourceRef: 'P31',
    topic: 'kinematics1d',
    difficulty: 2,
    params: { t1: { min: 2, max: 5, step: 0.5 }, T: { min: 9, max: 11, step: 0.1 } },
    constraints: (p) => p.T - p.t1 / 2 > 4,
    prompt: (p) =>
      `A world-class sprinter accelerated to his maximum in ${fmt(p.t1)} s. He then maintains this speed for the remainder of a 100-m race, finishing with a total time of ${fmt(p.T)} s. What is the runner's average acceleration for the entire race?`,
    compute: (p) => {
      const vmax = sprinterMaxSpeed(p.t1, p.T, 100)
      return { value: vmax / p.T, unit: 'm/s²', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', math: `t_1 = ${fmt(p.t1)}\\text{ s},\\ T = ${fmt(p.T)}\\text{ s}` },
      { label: 'Formula', math: 'v_{max} = \\dfrac{d}{T - t_1/2},\\quad \\bar a = \\dfrac{v_{max}-0}{T}' },
      { label: 'Answer', math: `\\bar a = ${fmt(answer)}\\text{ m/s}^2` },
    ],
  }),

  defineQuestion('PHY_K1D_04', {
    sourceRef: 'P32',
    topic: 'kinematics1d',
    difficulty: 2,
    params: { t1: { min: 2, max: 4, step: 0.1 }, T: { min: 9, max: 11, step: 0.05 } },
    constraints: (p) => p.T - p.t1 / 2 > 4,
    prompt: (p) =>
      `A world-class sprinter accelerates uniformly from rest to his maximum speed in ${fmt(p.t1)} s. He then maintains this speed for the remainder of a 100-m race, finishing with a total time of ${fmt(p.T)} s. What distance does the runner cover during the first ${fmt(p.t1)} s?`,
    compute: (p) => {
      const vmax = sprinterMaxSpeed(p.t1, p.T, 100)
      return { value: (vmax / 2) * p.t1, unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_{max} = \\dfrac{d}{T - t_1/2},\\quad d_1 = \\dfrac{v_{max}}{2}t_1' },
      { label: 'Answer', math: `d_1 = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_K1D_05', {
    sourceRef: 'P33',
    topic: 'kinematics1d',
    difficulty: 3,
    params: { distanceKm: { min: 12, max: 25, step: 1 }, birdSpeed: { min: 25, max: 40, step: 1 }, windMs: { min: 1, max: 4, step: 0.1 } },
    constraints: (p) => p.birdSpeed > p.windMs * 3.6 * 1.3,
    prompt: (p) =>
      `Locations A and B are ${fmt(p.distanceKm)} km apart and a bird is making a round trip A-B-A. When traveling from A to B, the bird flies against the wind, while on the return trip it goes along the wind. The speed of the bird in stationary air is ${fmt(p.birdSpeed)} km/h. Determine the average speed of the bird with respect to the ground in the round trip if the wind had a constant speed of ${fmt(p.windMs)} m/s for the entire time. Provide the answer in units m/s.`,
    compute: (p) => {
      const windKmh = p.windMs * 3.6
      const v1 = p.birdSpeed - windKmh
      const v2 = p.birdSpeed + windKmh
      const avgKmh = (2 * v1 * v2) / (v1 + v2)
      return { value: avgKmh / 3.6, unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', math: `v_{bird} = ${fmt(p.birdSpeed)}\\text{ km/h},\\ v_{wind} = ${fmt(p.windMs)}\\text{ m/s}` },
      { label: 'Formula', math: '\\bar v = \\dfrac{2(v_{bird}-v_{wind})(v_{bird}+v_{wind})}{2\\,v_{bird}}' },
      { label: 'Answer', math: `\\bar v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_K1D_06', {
    sourceRef: 'P34',
    topic: 'kinematics1d',
    difficulty: 2,
    params: { speedKmh: { min: 8, max: 20, step: 1 }, angleDeg: { min: 40, max: 70, step: 1 }, t: { min: 6, max: 16, step: 1 } },
    prompt: (p) =>
      `When the Sun is directly overhead, an eagle flies toward the ground with a constant velocity of ${fmt(p.speedKmh)} km/h at ${fmt(p.angleDeg)}° below the horizontal line. Calculate the distance its shadow traveled on the level ground in ${fmt(p.t)} s.`,
    compute: (p) => {
      const vMs = (p.speedKmh * 1000) / 3600
      return { value: vMs * Math.cos(toRad(p.angleDeg)) * p.t, unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'd = v\\cos\\theta \\times t' },
      { label: 'Answer', math: `d = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_K1D_07', {
    sourceRef: 'P35',
    topic: 'kinematics1d',
    difficulty: 2,
    params: { speedKmh: { min: 8, max: 20, step: 1 }, angleDeg: { min: 40, max: 70, step: 1 }, t: { min: 6, max: 16, step: 1 } },
    prompt: (p) =>
      `An eagle flies toward the ground with a constant velocity of ${fmt(p.speedKmh)} km/h at ${fmt(p.angleDeg)}° below the horizontal line. Calculate the vertical distance the eagle descends in ${fmt(p.t)} s.`,
    compute: (p) => {
      const vMs = (p.speedKmh * 1000) / 3600
      return { value: vMs * Math.sin(toRad(p.angleDeg)) * p.t, unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 'h = v\\sin\\theta \\times t' },
      { label: 'Answer', math: `h = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_K1D_08', {
    sourceRef: 'P36',
    topic: 'kinematics1d',
    difficulty: 2,
    params: { h: { min: 20, max: 60, step: 1 }, v0: { min: 10, max: 25, step: 0.5 } },
    prompt: (p) =>
      `A metal key is dropped down from a bridge. When it passes by a height h = ${fmt(p.h)} m, its speed is ${fmt(p.v0)} m/s. How long after this moment will the key hit the ground? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: timeFromDisplacement(p.v0, G, p.h), unit: 's', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'h = v_0 t + \\tfrac{1}{2}gt^2' },
      { label: 'Answer', math: `t = ${fmt(answer)}\\text{ s}` },
    ],
  }),

  defineQuestion('PHY_K1D_09', {
    sourceRef: 'P37',
    topic: 'kinematics1d',
    difficulty: 3,
    params: { h: { min: 25, max: 60, step: 1 }, v0: { min: 8, max: 20, step: 0.5 } },
    prompt: (p) =>
      `A metal key is thrown straight up from a bridge. On its way up it passes a point at height h = ${fmt(p.h)} m above the ground with a speed of ${fmt(p.v0)} m/s. How long after this moment will the key hit the ground? The gravitational acceleration is g = ${G} m/s².`,
    compute: (p) => ({ value: timeFromDisplacement(p.v0, -G, -p.h), unit: 's', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '-h = v_0 t - \\tfrac{1}{2}gt^2\\ \\text{(taking up as positive)}' },
      { label: 'Answer', math: `t = ${fmt(answer)}\\text{ s}` },
    ],
  }),

  defineQuestion('PHY_K1D_10', {
    sourceRef: 'P38',
    topic: 'kinematics1d',
    difficulty: 2,
    params: { h: { min: 2, max: 8, step: 0.5 }, v0: { min: 0.3, max: 1, step: 0.05 } },
    prompt: (p) =>
      `A lunar lander is making its descent to Moon Base. The engine is cut off when the lander is ${fmt(p.h)} m above the surface and has a downward speed of ${fmt(p.v0)} m/s. With the engine off, the lander is in free fall. What is the speed of the lander just before it touches the surface? The acceleration due to gravity on the moon is 1.6 m/s².`,
    compute: (p) => ({ value: velocityFromDisplacement(p.v0, 1.6, p.h), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v = \\sqrt{v_0^2 + 2g_{moon}h}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_K1D_11', {
    sourceRef: 'P39',
    topic: 'kinematics1d',
    difficulty: 3,
    params: { h: { min: 5, max: 12, step: 0.5 }, v0: { min: 0.2, max: 0.8, step: 0.05 } },
    prompt: (p) =>
      `A lunar lander is making its descent to Moon Base. The engine is cut off when the lander is ${fmt(p.h)} m above the surface and has an upward speed of ${fmt(p.v0)} m/s. With the engine off, the lander is in free fall. How long after the engine cutoff does the lander touch the surface? The acceleration due to gravity on the Moon is 1.62 m/s².`,
    compute: (p) => ({ value: timeFromDisplacement(p.v0, -1.62, -p.h), unit: 's', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '-h = v_0 t - \\tfrac12 g_{moon} t^2' },
      { label: 'Answer', math: `t = ${fmt(answer)}\\text{ s}` },
    ],
  }),

  defineQuestion('PHY_K1D_12', {
    sourceRef: 'P40',
    topic: 'kinematics1d',
    difficulty: 1,
    params: { a: { min: 2, max: 5, step: 0.1 }, x0: { min: 2, max: 8, step: 0.5 }, v0: { min: 10, max: 18, step: 0.5 }, t: { min: 2, max: 5, step: 1 } },
    prompt: (p) =>
      `A motorcyclist heading east through a small city accelerates after he passes the signpost marking the city limits. His acceleration is a constant ${fmt(p.a)} m/s². At time t = 0 he is ${fmt(p.x0)} m east of the signpost, moving east at ${fmt(p.v0)} m/s. Find his position with respect to the signpost at time t = ${fmt(p.t)} s.`,
    compute: (p) => ({ value: p.x0 + displacement(p.v0, p.a, p.t), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'x(t) = x_0 + v_0 t + \\tfrac12 a t^2' },
      { label: 'Answer', math: `x = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_K1D_13', {
    sourceRef: 'P41',
    topic: 'kinematics1d',
    difficulty: 1,
    params: { a: { min: 2, max: 5, step: 0.1 }, v0: { min: 10, max: 18, step: 0.5 }, t: { min: 2, max: 5, step: 1 } },
    prompt: (p) =>
      `A motorcyclist heading east through a small city accelerates after he passes the signpost marking the city limits. His acceleration is a constant ${fmt(p.a)} m/s². At time t = 0 he is moving east at ${fmt(p.v0)} m/s. Find his velocity at time t = ${fmt(p.t)} s.`,
    compute: (p) => ({ value: p.v0 + p.a * p.t, unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v(t) = v_0 + at' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_K1D_14', {
    sourceRef: 'P42',
    topic: 'kinematics1d',
    difficulty: 2,
    params: { aMag: { min: 1, max: 3, step: 0.1 }, t: { min: 3, max: 6, step: 0.1 }, s: { min: 30, max: 70, step: 1 } },
    prompt: (p) =>
      `A particle slows down with an acceleration of ${fmt(p.aMag)} m/s² for ${fmt(p.t)} s moving straight for ${fmt(p.s)} m. Find the speed of the particle at the end of the distance.`,
    compute: (p) => {
      const v0 = (p.s + 0.5 * p.aMag * p.t * p.t) / p.t
      const vEnd = v0 - p.aMag * p.t
      return { value: vEnd, unit: 'm/s', tolerance: { mode: 'relative', value: 0.02 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 's = v_0 t - \\tfrac12 a t^2,\\quad v_{end} = v_0 - at' },
      { label: 'Answer', math: `v_{end} = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_K1D_15', {
    sourceRef: 'P43',
    topic: 'kinematics1d',
    difficulty: 2,
    params: { aMag: { min: 0.8, max: 2.5, step: 0.1 }, t: { min: 4, max: 7, step: 0.1 }, s: { min: 30, max: 70, step: 1 } },
    prompt: (p) =>
      `A particle slows down uniformly with an acceleration of magnitude ${fmt(p.aMag)} m/s² for ${fmt(p.t)} s while moving in a straight line a distance of ${fmt(p.s)} m. Find the speed of the particle at the beginning of this distance.`,
    compute: (p) => {
      const v0 = (p.s + 0.5 * p.aMag * p.t * p.t) / p.t
      return { value: v0, unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Formula', math: 's = v_0 t - \\tfrac12 a t^2 \\Rightarrow v_0 = \\dfrac{s + \\tfrac12 a t^2}{t}' },
      { label: 'Answer', math: `v_0 = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_K1D_16', {
    sourceRef: 'P44',
    topic: 'kinematics1d',
    difficulty: 1,
    params: { d1: { min: 60, max: 100, step: 1 }, v1: { min: 1, max: 2, step: 0.05 }, d2: { min: 180, max: 260, step: 1 }, v2: { min: 4, max: 6, step: 0.05 } },
    prompt: (p) =>
      `A person walks ${fmt(p.d1)} m at a speed of ${fmt(p.v1)} m/s and then runs ${fmt(p.d2)} m at a speed of ${fmt(p.v2)} m/s along a straight track. Compute the average speed.`,
    compute: (p) => {
      const t1 = p.d1 / p.v1
      const t2 = p.d2 / p.v2
      return { value: average(p.d1 + p.d2, t1 + t2), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (_p, answer) => [
      { label: 'Formula', math: '\\bar v = \\dfrac{d_1+d_2}{t_1+t_2},\\quad t_i = d_i/v_i' },
      { label: 'Answer', math: `\\bar v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_K1D_17', {
    sourceRef: 'P45',
    topic: 'kinematics1d',
    difficulty: 2,
    params: { d1: { min: 60, max: 110, step: 1 }, v1: { min: 1, max: 2, step: 0.05 }, d2: { min: 150, max: 230, step: 1 }, v2: { min: 4, max: 6, step: 0.05 } },
    prompt: (p) =>
      `A person walks ${fmt(p.d1)} m at a speed of ${fmt(p.v1)} m/s along a straight track and then immediately runs back along the same track, in the opposite direction, a distance of ${fmt(p.d2)} m at a speed of ${fmt(p.v2)} m/s. Compute the magnitude of the average velocity for the whole trip.`,
    compute: (p) => {
      const t1 = p.d1 / p.v1
      const t2 = p.d2 / p.v2
      return { value: Math.abs(p.d1 - p.d2) / (t1 + t2), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (_p, answer) => [
      { label: 'Formula', math: '|\\bar v| = \\dfrac{|d_1-d_2|}{t_1+t_2}' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_K1D_18', {
    sourceRef: 'P46',
    topic: 'kinematics1d',
    difficulty: 2,
    params: { vm: { min: 14, max: 22, step: 1 }, a: { min: 3, max: 5, step: 0.1 } },
    prompt: (p) =>
      `A motorist traveling with a constant speed of ${fmt(p.vm)} m/s passes a school-crossing corner. Just as the motorist passes, a police officer on a motorcycle at the corner starts off in pursuit with constant acceleration of ${fmt(p.a)} m/s². What is the distance they have traveled from the corner to the point where the officer catches up with the motorist?`,
    compute: (p) => ({ value: pursuitCatchDistance(p.vm, p.a), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v_m t = \\tfrac12 a t^2 \\Rightarrow t = \\dfrac{2v_m}{a},\\quad d = v_m t' },
      { label: 'Answer', math: `d = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_K1D_19', {
    sourceRef: 'P47',
    topic: 'kinematics1d',
    difficulty: 2,
    params: { vm: { min: 14, max: 22, step: 1 }, a: { min: 3, max: 5, step: 0.1 } },
    prompt: (p) =>
      `A motorist traveling with a constant speed of ${fmt(p.vm)} m/s passes a school-crossing corner. Just as the motorist passes, a police officer on a motorcycle standing at the corner starts off in pursuit with constant acceleration of ${fmt(p.a)} m/s². What is the officer's speed at the moment he catches up with the motorist?`,
    compute: (p) => ({ value: pursuitCatchOfficerSpeed(p.vm), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 't = \\dfrac{2v_m}{a},\\quad v_{officer} = at = 2v_m' },
      { label: 'Answer', math: `v_{officer} = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_K1D_20', {
    sourceRef: 'P48',
    topic: 'kinematics1d',
    difficulty: 2,
    params: { vm: { min: 14, max: 22, step: 1 }, a: { min: 3, max: 5, step: 0.1 } },
    prompt: (p) =>
      `A motorist traveling with a constant speed of ${fmt(p.vm)} m/s passes a school-crossing corner. Just as the motorist passes, a police officer on a motorcycle at the corner starts off in pursuit with constant acceleration of ${fmt(p.a)} m/s². How much time elapses before the officer catches with the motorist?`,
    compute: (p) => ({ value: pursuitCatchTime(p.vm, p.a), unit: 's', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 't = \\dfrac{2v_m}{a}' },
      { label: 'Answer', math: `t = ${fmt(answer)}\\text{ s}` },
    ],
  }),

  defineQuestion('PHY_K1D_21', {
    sourceRef: 'P49',
    topic: 'kinematics1d',
    difficulty: 3,
    params: { vm: { min: 14, max: 22, step: 1 }, a: { min: 3, max: 5, step: 0.1 } },
    prompt: (p) =>
      `A motorist traveling with a constant speed of ${fmt(p.vm)} m/s passes a school-crossing corner. Just as the motorist passes, a police officer on a motorcycle at the corner starts off in pursuit with constant acceleration of ${fmt(p.a)} m/s². What is the maximum distance by which the motorist gets ahead of the officer?`,
    compute: (p) => ({ value: pursuitMaxGap(p.vm, p.a), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: '\\text{gap}_{max} = \\dfrac{v_m^2}{2a}\\ \\text{(when speeds are equal)}' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_K1D_22', {
    sourceRef: 'P50',
    topic: 'kinematics1d',
    difficulty: 1,
    params: { s: { min: 150, max: 300, step: 10 }, a: { min: 1, max: 2.5, step: 0.1 } },
    prompt: (p) =>
      `An airport for small planes has a runway ${fmt(p.s)} m long. One kind of airplane that might use this airfield can accelerate at ${fmt(p.a)} m/s². Calculate the speed this airplane can reach before takeoff.`,
    compute: (p) => ({ value: Math.sqrt(2 * p.a * p.s), unit: 'm/s', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 'v = \\sqrt{2as}' },
      { label: 'Answer', math: `v = ${fmt(answer)}\\text{ m/s}` },
    ],
  }),

  defineQuestion('PHY_K1D_23', {
    sourceRef: 'P51',
    topic: 'kinematics1d',
    difficulty: 1,
    params: { v: { min: 20, max: 35, step: 0.5 }, a: { min: 1.5, max: 2.8, step: 0.1 } },
    prompt: (p) =>
      `One kind of airplane must reach a speed before takeoff of at least ${fmt(p.v)} m/s, and can accelerate at ${fmt(p.a)} m/s². What minimum length must the runway have in order for the airplane to be able to reach this speed before takeoff?`,
    compute: (p) => ({ value: (p.v * p.v) / (2 * p.a), unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 's = \\dfrac{v^2}{2a}' },
      { label: 'Answer', math: `s = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_K1D_24', {
    sourceRef: 'P52',
    topic: 'kinematics1d',
    difficulty: 1,
    params: { s: { min: 15, max: 35, step: 1 }, a: { min: 1.5, max: 3, step: 0.1 } },
    prompt: (p) =>
      `How long does it take a car to cross a ${fmt(p.s)} m-wide intersection after the light turns green, if the car accelerates from rest at a constant acceleration of ${fmt(p.a)} m/s²?`,
    compute: (p) => ({ value: Math.sqrt((2 * p.s) / p.a), unit: 's', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 's = \\tfrac12 a t^2 \\Rightarrow t = \\sqrt{2s/a}' },
      { label: 'Answer', math: `t = ${fmt(answer)}\\text{ s}` },
    ],
  }),

  defineQuestion('PHY_K1D_25', {
    sourceRef: 'P53',
    topic: 'kinematics1d',
    difficulty: 2,
    params: { s: { min: 15, max: 30, step: 1 }, v0: { min: 3, max: 8, step: 0.1 }, a: { min: 1.5, max: 3, step: 0.1 } },
    prompt: (p) =>
      `How long does it take a car to cross a ${fmt(p.s)} m-wide intersection if the car enters the intersection already moving at ${fmt(p.v0)} m/s and accelerates at a constant ${fmt(p.a)} m/s²?`,
    compute: (p) => ({ value: timeFromDisplacement(p.v0, p.a, p.s), unit: 's', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Formula', math: 's = v_0 t + \\tfrac12 a t^2' },
      { label: 'Answer', math: `t = ${fmt(answer)}\\text{ s}` },
    ],
  }),
]
