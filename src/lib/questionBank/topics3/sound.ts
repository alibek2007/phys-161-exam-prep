import { defineQuestion } from '../defineQuestion'
import { fmt, sciText } from '../../format'
import * as sound from '../../physics/sound'
import { ans, exerciseImage, numeric, steps, UNIT } from './helpers'

/** Tension in wire B (far end) of a bar of weight Wbar with a cube of weight Wc a fraction `frac` of the way from A to B. */
const farWireTension = (Wbar: number, Wc: number, frac: number) => Wbar / 2 + Wc * frac
const wireFundamentalFromMass = (T: number, massG: number, Lcm: number) => {
  const L = Lcm / 100
  return Math.sqrt((T * L) / (massG / 1000)) / (2 * L)
}

export const soundQuestions = [
  // ---------- Doppler effect & shock waves ----------
  defineQuestion('PHY3_DP01', {
    sourceRef: 'P115',
    topic: 'doppler',
    difficulty: 2,
    params: { fa: { min: 500, max: 600, step: 1 }, fd: { min: 430, max: 490, step: 1 }, v: { min: 330, max: 345, step: 1 } },
    source: { params: { fa: 547, fd: 475, v: 333 }, answer: 23.46 },
    prompt: (p) =>
      `As the train passes the crossing, the receiver at the crossing notices how the sound of the train's whistle changes, with frequency decreasing from ${fmt(p.fa)} Hz on approach to ${fmt(p.fd)} Hz on departure. Using ${fmt(p.v)} m/s for the speed of sound in air, calculate the speed of the train.`,
    compute: (p) => numeric((p.v * (p.fa - p.fd)) / (p.fa + p.fd), 'm/s'),
    solution: (p, a) =>
      steps('f_a=\\dfrac{fv}{v-u},\\ f_d=\\dfrac{fv}{v+u} \\Rightarrow u=v\\,\\dfrac{f_a-f_d}{f_a+f_d}', ans('u', a, UNIT.ms)),
  }),

  defineQuestion('PHY3_DP02', {
    sourceRef: 'P116',
    topic: 'doppler',
    difficulty: 3,
    params: { f: { min: 400, max: 500, step: 1 }, beats: { min: 2, max: 5, step: 1 }, v: { min: 335, max: 345, step: 5 } },
    source: { params: { f: 431, beats: 3, v: 340 }, answer: 1.179 },
    prompt: (p) =>
      `A man walks down a long hall carrying a tuning fork vibrating at ${fmt(p.f)} Hz, so that the sound reflects from the closed end of the hall. If the man hears ${fmt(p.beats)} beats per second, how fast is the man walking? Use the velocity of sound of ${fmt(p.v)} m/s.`,
    compute: (p) => numeric((p.beats * p.v) / (2 * p.f + p.beats), 'm/s'),
    solution: (p, a) =>
      steps('f_{echo}=f\\dfrac{v+u}{v-u},\\ \\ f_{echo}-f=n_{beat} \\Rightarrow u=\\dfrac{n_{beat}\\,v}{2f+n_{beat}}', ans('u', a, UNIT.ms), 'The wall acts as a stationary receiver then a source: the reflected sound is Doppler shifted twice (once for the moving source, once for the moving observer). He hears the beat between the fork and the echo.'),
  }),

  defineQuestion('PHY3_DP03', {
    sourceRef: 'P132',
    topic: 'doppler',
    difficulty: 3,
    params: { fk: { min: 1.8, max: 2.5, step: 0.1 }, beat: { min: 5, max: 10, step: 1 }, v: { min: 340, max: 348, step: 2 } },
    source: { params: { fk: 2.1, beat: 8, v: 344 }, answer: 0.654 },
    prompt: (p) =>
      `A bat flies toward a wall, emitting a steady sound of frequency ${fmt(p.fk)} kHz. This bat hears its own sound plus the sound reflected by the wall. How fast should the bat fly in order to hear a beat frequency of ${fmt(p.beat)} Hz? Use speed of sound in air v = ${fmt(p.v)} m/s.`,
    compute: (p) => numeric((p.beat * p.v) / (2 * p.fk * 1000 + p.beat), 'm/s'),
    solution: (p, a) =>
      steps('f_{echo}=f\\dfrac{v+u}{v-u},\\ \\ f_{echo}-f=n_{beat} \\Rightarrow u=\\dfrac{n_{beat}\\,v}{2f+n_{beat}}', ans('u', a, UNIT.ms)),
  }),

  defineQuestion('PHY3_DP04', {
    sourceRef: 'P133',
    topic: 'doppler',
    difficulty: 3,
    params: { u: { min: 0.4, max: 0.9, step: 0.01 }, fk: { min: 1.8, max: 2.5, step: 0.05 }, v: { min: 340, max: 350, step: 0.5 } },
    source: { params: { u: 0.57, fk: 2.15, v: 347.5 }, answer: 7.06483 },
    prompt: (p) =>
      `A bat flies toward a wall at ${fmt(p.u)} m/s, emitting a steady sound of frequency ${fmt(p.fk)} kHz. The bat hears its own sound plus the sound reflected from the wall. What beat frequency does it hear? Use ${fmt(p.v)} m/s for the speed of sound in air.`,
    compute: (p) => numeric(sound.echoBeat(p.fk * 1000, p.v, p.u), 'Hz'),
    solution: (p, a) => steps('f_{echo}=f\\dfrac{v+u}{v-u},\\quad n_{beat}=f_{echo}-f=\\dfrac{2fu}{v-u}', ans('n_{beat}', a, UNIT.Hz)),
  }),

  defineQuestion('PHY3_DP05', {
    sourceRef: 'P134',
    topic: 'doppler',
    difficulty: 2,
    params: { f: { min: 450, max: 550, step: 10 }, fObs: { min: 420, max: 540, step: 1 }, v: { min: 340, max: 348, step: 1 } },
    constraints: (p) => p.f - p.fObs >= 5,
    source: { params: { f: 490, fObs: 470, v: 344 }, answer: 14.041 },
    prompt: (p) =>
      `A car at rest is emitting alarm sound waves of frequency ${fmt(p.f)} Hz. A motorcyclist is traveling directly away from the car. What is the magnitude of the motorcyclist's velocity if he detects a frequency of ${fmt(p.fObs)} Hz. Use speed of sound in air v = ${fmt(p.v)} m/s.`,
    compute: (p) => numeric(p.v * (1 - p.fObs / p.f), 'm/s'),
    solution: (p, a) => steps('f\'=f\\dfrac{v-u}{v} \\Rightarrow u=v\\left(1-\\dfrac{f\'}{f}\\right)', ans('u', a, UNIT.ms)),
  }),

  defineQuestion('PHY3_DP06', {
    sourceRef: 'P135',
    topic: 'doppler',
    difficulty: 2,
    params: { f: { min: 440, max: 520, step: 10 }, fObs: { min: 560, max: 650, step: 1 }, v: { min: 335, max: 345, step: 0.5 } },
    source: { params: { f: 470, fObs: 608, v: 341.5 }, answer: 100.27 },
    prompt: (p) =>
      `A car at rest is emitting alarm sound waves of frequency ${fmt(p.f)} Hz. A motorcyclist is traveling directly toward the car. What is the magnitude of the motorcyclist's velocity if he detects a frequency of ${fmt(p.fObs)} Hz? Use ${fmt(p.v)} m/s for the speed of sound in air.`,
    compute: (p) => numeric(p.v * (p.fObs / p.f - 1), 'm/s'),
    solution: (p, a) => steps('f\'=f\\dfrac{v+u}{v} \\Rightarrow u=v\\left(\\dfrac{f\'}{f}-1\\right)', ans('u', a, UNIT.ms)),
  }),

  defineQuestion('PHY3_DP07', {
    sourceRef: 'P136',
    topic: 'doppler',
    difficulty: 3,
    params: { hkm: { min: 6, max: 10, step: 1 }, t: { min: 0.5, max: 1.5, step: 0.1 }, v: { min: 340, max: 346, step: 1 } },
    constraints: (p) => (p.v * p.t) / (p.hkm * 1000) < 0.2,
    source: { params: { hkm: 8, t: 0.9, v: 344 }, answer: 344.258 },
    prompt: (p) =>
      `On a clear day a person sees a jet plane flying overhead flying at a constant altitude of ${fmt(p.hkm)} km. The person hears the sonic boom at time ${fmt(p.t)} s after the plane passes directly overhead. Assuming that the speed of sound v = ${fmt(p.v)} m/s is the same at all altitudes, calculate the speed of the plane.`,
    compute: (p) => numeric(sound.boomSpeed(p.v, p.t, p.hkm * 1000), 'm/s'),
    solution: (p, a) =>
      steps('\\sin\\alpha=\\dfrac{v}{V},\\ \\tan\\alpha=\\dfrac{h}{Vt} \\Rightarrow V=\\dfrac{v}{\\sqrt{1-(vt/h)^2}}', ans('V', a, UNIT.ms), 'The boom reaches the listener when the edge of the Mach cone (half-angle α, sin α = v/V) passes over them; by then the plane has flown a horizontal distance Vt beyond the point overhead.'),
  }),

  defineQuestion('PHY3_DP08', {
    sourceRef: 'P148',
    topic: 'doppler',
    difficulty: 3,
    params: { fk: { min: 18, max: 25, step: 0.5 }, v: { min: 1480, max: 1500, step: 1 }, u: { min: 3, max: 6, step: 0.1 } },
    source: { params: { fk: 21, v: 1488, u: 4.3 }, answer: 121.72 },
    prompt: (p) =>
      `The sound source of a ship's sonar system operates at a frequency of ${fmt(p.fk)} kHz. The speed of sound in water is ${fmt(p.v)} m/s. Calculate the absolute value of the difference in frequency between the directly radiated waves and the waves reflected from a whale traveling directly toward the ship at ${fmt(p.u)} m/s. The ship is at rest in the water.`,
    compute: (p) => numeric(sound.echoBeat(p.fk * 1000, p.v, p.u), 'Hz'),
    solution: (p, a) =>
      steps('f_1=f\\dfrac{v+u}{v},\\ f_2=f_1\\dfrac{v}{v-u}=f\\dfrac{v+u}{v-u} \\Rightarrow \\Delta f=\\dfrac{2fu}{v-u}', ans('\\Delta f', a, UNIT.Hz), 'The whale first acts as a moving observer, then as a moving source re-emitting the frequency it received.'),
  }),

  defineQuestion('PHY3_DP09', {
    sourceRef: 'P149',
    topic: 'doppler',
    difficulty: 3,
    params: { fk: { min: 20, max: 28, step: 1 }, Acm: { min: 2, max: 4, step: 0.5 }, fs: { min: 5, max: 9, step: 1 }, v: { min: 335, max: 345, step: 0.5 } },
    source: { params: { fk: 24, Acm: 3, fs: 7, v: 340 }, answer: 24093.5 },
    prompt: (p) =>
      `A police siren of frequency ${fmt(p.fk)} kHz is attached to a vibrating platform. The platform and siren oscillate up and down in simple harmonic motion with amplitude ${fmt(p.Acm)} cm and frequency ${fmt(p.fs)} Hz. Find the maximum sound frequency that you would hear at a position directly above the siren. Use ${fmt(p.v)} m/s for the speed of sound in air.`,
    compute: (p) => numeric(sound.sourceShift(p.fk * 1000, p.v, sound.maxSourceSpeed(p.Acm / 100, p.fs)), 'Hz'),
    solution: (p, a) =>
      steps('u_{max}=A\\omega=2\\pi fA,\\quad f_{max}=\\dfrac{f_0\\,v}{v-u_{max}}', ans('f_{max}', a, UNIT.Hz), 'The highest pitch is heard when the siren is moving upward at its maximum speed, toward the listener.'),
  }),

  defineQuestion('PHY3_DP10', {
    sourceRef: 'P150',
    topic: 'doppler',
    difficulty: 3,
    params: { fk: { min: 18, max: 24, step: 0.5 }, Acm: { min: 2, max: 4, step: 0.1 }, fs: { min: 7, max: 10, step: 0.5 }, v: { min: 335, max: 345, step: 0.5 } },
    source: { params: { fk: 20.5, Acm: 3.1, fs: 8.5, v: 338.5 }, answer: 20400.2 },
    prompt: (p) =>
      `A police siren of frequency ${fmt(p.fk)} kHz is attached to a vibrating platform. The platform and siren oscillate up and down in simple harmonic motion with amplitude ${fmt(p.Acm)} cm and frequency ${fmt(p.fs)} Hz. Find the minimum sound frequency that you would hear at a position directly above the siren. Use ${fmt(p.v)} m/s for the speed of sound in air.`,
    compute: (p) => numeric(sound.sourceShift(p.fk * 1000, p.v, -sound.maxSourceSpeed(p.Acm / 100, p.fs)), 'Hz'),
    solution: (p, a) =>
      steps('u_{max}=2\\pi fA,\\quad f_{min}=\\dfrac{f_0\\,v}{v+u_{max}}', ans('f_{min}', a, UNIT.Hz), 'The lowest pitch is heard when the siren is moving downward at its maximum speed, away from the listener.'),
  }),

  // ---------- Sound intensity ----------
  defineQuestion('PHY3_SI01', {
    sourceRef: 'P119',
    topic: 'soundIntensity',
    difficulty: 2,
    params: { v: { min: 335, max: 345, step: 1 }, pa: { min: 0.5, max: 1.2, step: 0.01 }, rho: { min: 1.2, max: 1.3, step: 0.01 } },
    source: { params: { v: 339, pa: 0.82, rho: 1.29 }, answer: 88.858 },
    prompt: (p) =>
      `Calculate the sound intensity level in decibels for a sound wave traveling in air at ${fmt(p.v)} m/s and having a pressure amplitude of ${fmt(p.pa)} Pa. Air density is ${fmt(p.rho)} kg/m³. I0=10⁻¹² W/m²`,
    compute: (p) => numeric(sound.levelFromIntensity(sound.intensityFromPressure(p.pa, p.rho, p.v)), 'dB'),
    solution: (p, a) =>
      steps('I=\\dfrac{p_{max}^2}{2\\rho v},\\quad \\beta=10\\log_{10}\\dfrac{I}{I_0}', ans('\\beta', a, UNIT.dB)),
  }),

  defineQuestion('PHY3_SI02', {
    sourceRef: 'P120',
    topic: 'soundIntensity',
    difficulty: 1,
    params: { v: { min: 330, max: 340, step: 0.5 }, pa: { min: 0.5, max: 1, step: 0.1 }, rho: { min: 1.2, max: 1.3, step: 0.01 } },
    source: { params: { v: 335.5, pa: 0.8, rho: 1.22 }, answer: 0.000781804 },
    prompt: (p) =>
      `Calculate the intensity of a sound wave traveling in air at ${fmt(p.v)} m/s and having a pressure amplitude of ${fmt(p.pa)} Pa. The density of air is ${fmt(p.rho)} kg/m³.`,
    compute: (p) => numeric(sound.intensityFromPressure(p.pa, p.rho, p.v), 'W/m^2'),
    solution: (p, a) => steps('I=\\dfrac{p_{max}^2}{2\\rho v}', ans('I', a, UNIT.Wm2)),
  }),

  defineQuestion('PHY3_SI03', {
    sourceRef: 'P127',
    topic: 'soundIntensity',
    difficulty: 2,
    params: { r1: { min: 2, max: 6, step: 0.5 }, b1: { min: 50, max: 70, step: 1 }, b2: { min: 15, max: 30, step: 1 } },
    source: { params: { r1: 4, b1: 50, b2: 20 }, answer: 126.49 },
    prompt: (p) =>
      `The sound from a trumpet radiates uniformly in all directions. At a distance of ${fmt(p.r1)} m from the trumpet the sound intensity level is ${fmt(p.b1)} dB. At what distance the sound intensity level is ${fmt(p.b2)} dB? I0=10⁻¹² W/m².`,
    compute: (p) => numeric(p.r1 * 10 ** ((p.b1 - p.b2) / 20), 'm'),
    solution: (p, a) =>
      steps('I\\propto\\dfrac1{r^2} \\Rightarrow \\beta_1-\\beta_2=20\\log_{10}\\dfrac{r_2}{r_1} \\Rightarrow r_2=r_1\\,10^{(\\beta_1-\\beta_2)/20}', ans('r_2', a, UNIT.m)),
  }),

  defineQuestion('PHY3_SI04', {
    sourceRef: 'P128',
    topic: 'soundIntensity',
    difficulty: 2,
    params: { r1: { min: 2, max: 5, step: 0.5 }, b1: { min: 65, max: 80, step: 1 }, r2: { min: 40, max: 100, step: 1 } },
    source: { params: { r1: 3.5, b1: 73, r2: 74 }, answer: 46.4967 },
    prompt: (p) =>
      `The sound from a trumpet radiates uniformly in all directions. At a distance of ${fmt(p.r1)} m from the trumpet the sound intensity level is ${fmt(p.b1)} dB. What is the sound intensity level at a distance of ${fmt(p.r2)} m?`,
    compute: (p) => numeric(p.b1 - 20 * Math.log10(p.r2 / p.r1), 'dB'),
    solution: (p, a) => steps('\\beta_2=\\beta_1-20\\log_{10}\\dfrac{r_2}{r_1}', ans('\\beta_2', a, UNIT.dB)),
  }),

  defineQuestion('PHY3_SI05', {
    sourceRef: 'P129',
    topic: 'soundIntensity',
    difficulty: 3,
    params: { r: { min: 3, max: 10, step: 1 }, beta: { min: 60, max: 80, step: 1 }, rho: { min: 1.1, max: 1.3, step: 0.1 }, v: { min: 340, max: 346, step: 1 } },
    source: { params: { r: 7, beta: 70, rho: 1.2, v: 343 }, answer: 0.0907 },
    prompt: (p) =>
      `The sound from a trumpet radiates uniformly in all directions. At a distance of ${fmt(p.r)} m from the trumpet the sound intensity level is ${fmt(p.beta)} dB. What is the pressure amplitude at this distance? The air density at 20˚C is ${fmt(p.rho)} kg/m³ and speed of sound is ${fmt(p.v)} m/s. I0=10⁻¹² W/m².`,
    compute: (p) => numeric(Math.sqrt(2 * p.rho * p.v * sound.intensityFromLevel(p.beta)), 'Pa'),
    solution: (p, a) =>
      steps('I=I_0\\,10^{\\beta/10},\\quad p_{max}=\\sqrt{2\\rho vI}', ans('p_{max}', a, UNIT.Pa)),
  }),

  // ---------- Organ pipes ----------
  defineQuestion('PHY3_OP01', {
    sourceRef: 'P121',
    topic: 'organPipes',
    difficulty: 2,
    params: { f0: { min: 100, max: 250, step: 5 }, n: { min: 3, max: 9, step: 2 } },
    source: { params: { f0: 185, n: 3 }, answer: 185 },
    prompt: (p) => `An organ pipe has two successive harmonics with frequencies ${fmt(p.n * p.f0)} Hz and ${fmt((p.n + 2) * p.f0)} Hz. What is the fundamental frequency?`,
    compute: (p) => numeric(((p.n + 2) * p.f0 - p.n * p.f0) / 2, 'Hz'),
    solution: (p, a) =>
      steps('f_2-f_1=2f_{fund}\\ \\Rightarrow\\ f_{fund}=\\dfrac{f_2-f_1}{2}', ans('f_{fund}', a, UNIT.Hz), 'Check which kind of pipe it is: the frequencies are in the ratio 3:5 (odd harmonics), so this is a pipe closed at one end, where successive harmonics differ by twice the fundamental. (For a pipe open at both ends, successive harmonics differ by the fundamental itself, e.g. 4:5.)'),
  }),

  defineQuestion('PHY3_OP02', {
    sourceRef: 'P122',
    topic: 'organPipes',
    difficulty: 2,
    params: { f0: { min: 40, max: 90, step: 1 }, n: { min: 5, max: 15, step: 2 } },
    source: { params: { f0: 50, n: 11 }, answer: 11 },
    prompt: (p) =>
      `An organ pipe that is open at one end and closed at the other has two successive harmonics with frequencies ${fmt(p.n * p.f0)} Hz and ${fmt((p.n + 2) * p.f0)} Hz. Which harmonic is the ${fmt(p.n * p.f0)} Hz one? Give the harmonic number.`,
    compute: (p) => {
      const f1 = p.n * p.f0
      const f2 = (p.n + 2) * p.f0
      return numeric((2 * f1) / (f2 - f1), '')
    },
    solution: (p, a) =>
      steps('f_{fund}=\\dfrac{f_2-f_1}{2},\\quad n=\\dfrac{f_1}{f_{fund}}', ans('n', a), 'In a closed pipe only odd harmonics exist and successive ones differ by 2f₁.'),
  }),

  defineQuestion('PHY3_OP03', {
    sourceRef: 'P123',
    topic: 'organPipes',
    difficulty: 2,
    params: { f0: { min: 120, max: 250, step: 1 }, n: { min: 3, max: 6, step: 1 } },
    source: { params: { f0: 183, n: 4 }, answer: 183 },
    prompt: (p) => `An organ pipe has two successive harmonics with frequencies ${fmt(p.n * p.f0)} Hz and ${fmt((p.n + 1) * p.f0)} Hz. What is the fundamental frequency?`,
    compute: (p) => numeric((p.n + 1) * p.f0 - p.n * p.f0, 'Hz'),
    solution: (p, a) =>
      steps('f_2-f_1=f_{fund}', ans('f_{fund}', a, UNIT.Hz), 'The frequencies are in the ratio 4:5, so all harmonics are present: this is a pipe open at both ends, where successive harmonics differ by the fundamental.'),
  }),

  defineQuestion('PHY3_OP04', {
    sourceRef: 'P124',
    topic: 'organPipes',
    difficulty: 3,
    params: { f0: { min: 150, max: 250, step: 5 }, n: { min: 3, max: 7, step: 2 }, v: { min: 340, max: 346, step: 1 } },
    source: { params: { f0: 185, n: 3, v: 344 }, answer: 0.465 },
    prompt: (p) =>
      `An organ pipe has two successive harmonics with frequencies ${fmt(p.n * p.f0)} Hz and ${fmt((p.n + 2) * p.f0)} Hz. What is the length of the pipe? Speed of sound in air is ${fmt(p.v)} m/s.`,
    compute: (p) => numeric(p.v / (4 * p.f0), 'm'),
    solution: (p, a) =>
      steps('f_{fund}=\\dfrac{f_2-f_1}{2},\\quad L=\\dfrac{v}{4f_{fund}}', ans('L', a, UNIT.m), 'Odd harmonics only (ratio of two odd numbers) means a pipe closed at one end, where f₁ = v/4L.'),
  }),

  defineQuestion('PHY3_OP05', {
    sourceRef: 'P125',
    topic: 'organPipes',
    difficulty: 2,
    params: { L: { min: 0.4, max: 0.8, step: 0.01 }, v: { min: 338, max: 348, step: 0.5 }, n: { min: 3, max: 9, step: 2 } },
    source: { params: { L: 0.52, v: 347.5, n: 3 }, answer: 347.5 },
    prompt: (p) => {
      const f1 = Number(((p.n * p.v) / (4 * p.L)).toFixed(1))
      const f2 = Number((((p.n + 2) * p.v) / (4 * p.L)).toFixed(1))
      return `An organ pipe that is open at one end and closed at the other is ${fmt(p.L)} m long and has two successive harmonics with frequencies ${fmt(f1)} Hz and ${fmt(f2)} Hz. What is the speed of sound in the air inside the pipe?`
    },
    compute: (p) => {
      const f1 = Number(((p.n * p.v) / (4 * p.L)).toFixed(1))
      const f2 = Number((((p.n + 2) * p.v) / (4 * p.L)).toFixed(1))
      return numeric(2 * p.L * (f2 - f1), 'm/s')
    },
    solution: (p, a) =>
      steps('f_2-f_1=\\dfrac{v}{2L} \\Rightarrow v=2L(f_2-f_1)', ans('v', a, UNIT.ms), 'In a closed pipe successive harmonics (odd n) differ by 2f₁ = v/2L.'),
  }),

  defineQuestion('PHY3_OP06', {
    sourceRef: 'P126',
    topic: 'organPipes',
    difficulty: 3,
    params: { f0: { min: 150, max: 300, step: 1 }, n: { min: 2, max: 5, step: 1 }, v: { min: 340, max: 346, step: 1 } },
    source: { params: { f0: 194, n: 3, v: 344 }, answer: 0.8866 },
    prompt: (p) =>
      `An organ pipe has two successive harmonics with frequencies ${fmt(p.n * p.f0)} Hz and ${fmt((p.n + 1) * p.f0)} Hz. What is the length of the pipe? Speed of sound in air is ${fmt(p.v)} m/s.`,
    compute: (p) => numeric(p.v / (2 * p.f0), 'm'),
    solution: (p, a) =>
      steps('f_{fund}=f_2-f_1,\\quad L=\\dfrac{v}{2f_{fund}}', ans('L', a, UNIT.m), 'The ratio of the two frequencies is n : n+1, so every harmonic is present: a pipe open at both ends, where f₁ = v/2L.'),
  }),

  defineQuestion('PHY3_OP07', {
    sourceRef: 'P130',
    topic: 'organPipes',
    difficulty: 2,
    params: { L: { min: 1, max: 1.6, step: 0.01 }, dcm: { min: 1, max: 3, step: 0.5 }, v: { min: 340, max: 348, step: 1 } },
    source: { params: { L: 1.28, dcm: 1, v: 344 }, answer: 0.521 },
    prompt: (p) =>
      `Two organ pipes, open at one end but closed at the other, are each ${fmt(p.L)} m long. One is now lengthened by ${fmt(p.dcm)} cm. Find the frequency of the beat they produce when playing together in their fundamental mode. Speed of sound in the air is ${fmt(p.v)} m/s.`,
    compute: (p) => numeric(sound.closedPipeFrequency(1, p.v, p.L) - sound.closedPipeFrequency(1, p.v, p.L + p.dcm / 100), 'Hz'),
    solution: (p, a) => steps('f_1=\\dfrac{v}{4L},\\quad f_{beat}=\\dfrac{v}{4L}-\\dfrac{v}{4(L+\\Delta L)}', ans('f_{beat}', a, UNIT.Hz)),
  }),

  defineQuestion('PHY3_OP08', {
    sourceRef: 'P131',
    topic: 'organPipes',
    difficulty: 1,
    params: { L: { min: 1, max: 2, step: 0.01 }, v: { min: 335, max: 345, step: 1 } },
    source: { params: { L: 1.41, v: 339 }, answer: 60.1064 },
    prompt: (p) =>
      `An organ pipe that is open at one end but closed at the other is ${fmt(p.L)} m long. Find the frequency of its fundamental mode. The speed of sound in air is ${fmt(p.v)} m/s.`,
    compute: (p) => numeric(sound.closedPipeFrequency(1, p.v, p.L), 'Hz'),
    solution: (p, a) => steps('f_1=\\dfrac{v}{4L}', ans('f_1', a, UNIT.Hz)),
  }),

  // ---------- Beats & sound in media ----------
  defineQuestion('PHY3_BM01', {
    sourceRef: 'P117',
    topic: 'beatsMedia',
    difficulty: 1,
    params: { v: { min: 330, max: 345, step: 1 } },
    source: { params: { v: 332 }, answer: 16.6 },
    prompt: (p) => `Calculate the wavelength of sound at the lower extreme of the audible range 20 Hz, when the speed of sound in air is ${fmt(p.v)} m/s.`,
    compute: (p) => numeric(p.v / 20, 'm'),
    solution: (p, a) => steps('\\lambda=\\dfrac{v}{f}', ans('\\lambda', a, UNIT.m)),
  }),

  defineQuestion('PHY3_BM02', {
    sourceRef: 'P118',
    topic: 'beatsMedia',
    difficulty: 1,
    params: { v: { min: 330, max: 345, step: 1 } },
    source: { params: { v: 336 }, answer: 0.0168 },
    prompt: (p) => `Calculate the wavelength of sound at the higher extreme of the audible range 20 kHz, when the speed of sound in air is ${fmt(p.v)} m/s.`,
    compute: (p) => numeric(p.v / 20000, 'm'),
    solution: (p, a) => steps('\\lambda=\\dfrac{v}{f}', ans('\\lambda', a, UNIT.m)),
  }),

  defineQuestion('PHY3_BM03', {
    sourceRef: 'P137',
    topic: 'beatsMedia',
    difficulty: 1,
    params: { lam1: { min: 6.5, max: 8, step: 0.1 }, dlam: { min: 0.01, max: 0.05, step: 0.01 }, v: { min: 340, max: 348, step: 1 } },
    source: { params: { lam1: 7.3, dlam: 0.02, v: 344 }, answer: 12.875 },
    prompt: (p) =>
      `Two guitarists attempt to play the same note of wavelength ${fmt(p.lam1)} cm at the same time, but one of the instruments is slightly out of tune and plays a note of wavelength ${fmt(p.lam1 + p.dlam)} cm instead. What is the frequency of the beat these musicians hear when they play together? The speed of sound in air is v = ${fmt(p.v)} m/s.`,
    compute: (p) => numeric(p.v / (p.lam1 / 100) - p.v / ((p.lam1 + p.dlam) / 100), 'Hz'),
    solution: (p, a) => steps('f=\\dfrac{v}{\\lambda},\\quad f_{beat}=\\left|\\dfrac{v}{\\lambda_1}-\\dfrac{v}{\\lambda_2}\\right|', ans('f_{beat}', a, UNIT.Hz)),
  }),

  defineQuestion('PHY3_BM04', {
    sourceRef: 'P138',
    topic: 'beatsMedia',
    difficulty: 2,
    params: { lam1: { min: 6.5, max: 8, step: 0.1 }, beat: { min: 10, max: 16, step: 0.05 }, v: { min: 340, max: 350, step: 0.5 } },
    source: { params: { lam1: 7.1, beat: 13.45, v: 345.5 }, answer: 0.0711968 },
    prompt: (p) =>
      `Two guitarists try to play the same note at the same time. One plays a note of wavelength ${fmt(p.lam1)} cm; the other is slightly out of tune and they hear a beat of ${fmt(p.beat)} Hz, the out-of-tune note being the lower in frequency. What is the wavelength of the out-of-tune note? The speed of sound in air is ${fmt(p.v)} m/s.`,
    compute: (p) => numeric(p.v / (p.v / (p.lam1 / 100) - p.beat), 'm'),
    solution: (p, a) =>
      steps('f_1=\\dfrac{v}{\\lambda_1},\\ \\ f_2=f_1-f_{beat},\\ \\ \\lambda_2=\\dfrac{v}{f_2}', ans('\\lambda_2', a, UNIT.m), 'The out-of-tune note is lower in frequency, so its wavelength is slightly longer.'),
  }),

  defineQuestion('PHY3_BM05', {
    sourceRef: 'P139',
    topic: 'beatsMedia',
    difficulty: 1,
    params: { rho: { min: 900, max: 1300, step: 50 }, f: { min: 200, max: 400, step: 5 }, lambda: { min: 5, max: 10, step: 1 } },
    source: { params: { rho: 1100, f: 275, lambda: 8 }, answer: 5324000000 },
    prompt: (p) =>
      `In a liquid with density ${fmt(p.rho)} kg/m³, longitudinal waves with frequency ${fmt(p.f)} Hz are found to have wavelength ${fmt(p.lambda)} m. Calculate the bulk modulus of the liquid.`,
    compute: (p) => numeric(p.rho * (p.lambda * p.f) ** 2, 'Pa'),
    solution: (p, a) => steps('v=\\lambda f,\\quad B=\\rho v^2', ans('B', a, UNIT.Pa)),
  }),

  defineQuestion('PHY3_BM06', {
    sourceRef: 'P140',
    topic: 'beatsMedia',
    difficulty: 2,
    params: { L: { min: 0.8, max: 1.5, step: 0.1 }, rho: { min: 5000, max: 8000, step: 100 }, t4: { min: 3.5, max: 5, step: 0.1 } },
    source: { params: { L: 1, rho: 6200, t4: 4.3 }, answer: 33531638723.63 },
    prompt: (p) =>
      `A metal bar with a length of ${fmt(p.L)} m has density ${fmt(p.rho)} kg/m³. Longitudinal sound waves take ${sciText(p.t4, -4)} s to travel from one end of the bar to the other. What is Young's modulus for this metal?`,
    compute: (p) => numeric(p.rho * (p.L / (p.t4 * 1e-4)) ** 2, 'Pa'),
    solution: (p, a) => steps('v=\\dfrac{L}{t},\\quad Y=\\rho v^2', ans('Y', a, UNIT.Pa)),
  }),

  defineQuestion('PHY3_BM07', {
    sourceRef: 'P141',
    topic: 'beatsMedia',
    difficulty: 2,
    params: { L: { min: 60, max: 120, step: 1 }, v: { min: 340, max: 348, step: 1 }, Y10: { min: 7, max: 12, step: 0.5 }, rho: { min: 8400, max: 8700, step: 50 } },
    source: { params: { L: 88, v: 344, Y10: 9, rho: 8600 }, answer: 0.229, tolerance: 0.01 },
    prompt: (p) =>
      `A ${fmt(p.L)} m long brass rod is struck at one end. A person at the other end hears two sounds as a result of two longitudinal waves, one traveling in the metal rod and the other traveling in the air. What is the time interval between the two sounds? The speed of sound in air is ${fmt(p.v)} m/s. Young's modulus of the brass is ${sciText(p.Y10, 10)} Pa and density of the brass is ${fmt(p.rho)} kg/m³.`,
    compute: (p) => numeric(p.L / p.v - p.L / Math.sqrt((p.Y10 * 1e10) / p.rho), 's'),
    solution: (p, a) =>
      steps('v_{rod}=\\sqrt{\\dfrac{Y}{\\rho}},\\quad \\Delta t=\\dfrac{L}{v_{air}}-\\dfrac{L}{v_{rod}}', ans('\\Delta t', a, UNIT.s), 'Sound is faster in the metal, so that sound arrives first.'),
  }),

  defineQuestion('PHY3_BM08', {
    sourceRef: 'P142',
    topic: 'beatsMedia',
    difficulty: 3,
    params: { Wbar: { min: 120, max: 180, step: 5 }, Wc: { min: 150, max: 220, step: 5 }, frac: { min: 0.5, max: 0.9, step: 0.05 }, Lcm: { min: 45, max: 65, step: 1 }, mg: { min: 5, max: 8, step: 0.1 } },
    source: { params: { Wbar: 150, Wc: 185, frac: 0.75, Lcm: 56, mg: 6 }, answer: 31.129 },
    prompt: (p) =>
      `A uniform ${fmt(p.Wbar)}-N bar is supported horizontally by two identical wires A and B. A small ${fmt(p.Wc)}-N cube of lead is placed ${fmt(p.frac)} of the way from A to B. The wires are each ${fmt(p.Lcm)} cm long and have a mass of ${fmt(p.mg)} g. If both of them are simultaneously plucked at the center, what is the frequency of the beats that they will produce when vibrating in their fundamental?`,
    compute: (p) => {
      const TB = farWireTension(p.Wbar, p.Wc, p.frac)
      const TA = p.Wbar + p.Wc - TB
      return numeric(Math.abs(wireFundamentalFromMass(TB, p.mg, p.Lcm) - wireFundamentalFromMass(TA, p.mg, p.Lcm)), 'Hz')
    },
    solution: (p, a) =>
      steps('T_B=\\dfrac{W_{bar}}{2}+W_cx,\\ T_A=W_{bar}+W_c-T_B,\\quad f=\\dfrac{1}{2L}\\sqrt{\\dfrac{T}{\\mu}},\\ f_{beat}=|f_B-f_A|', ans('f_{beat}', a, UNIT.Hz), 'Torque balance about wire A gives the tension in B (x is the cube\'s fraction of the way from A to B); the two wires carry the rest between them.'),
    diagram: () => exerciseImage('p142-143'),
  }),

  defineQuestion('PHY3_BM09', {
    sourceRef: 'P143',
    topic: 'beatsMedia',
    difficulty: 3,
    params: { Wbar: { min: 110, max: 150, step: 5 }, Wc: { min: 150, max: 200, step: 5 }, frac: { min: 0.5, max: 0.8, step: 0.05 }, Lcm: { min: 50, max: 60, step: 1 }, mg: { min: 6, max: 9, step: 0.1 } },
    source: { params: { Wbar: 135, Wc: 175, frac: 0.7, Lcm: 57, mg: 7.6 }, answer: 104.713 },
    prompt: (p) =>
      `A uniform ${fmt(p.Wbar)}-N bar is supported horizontally by two identical wires, A and B, attached at its ends. Each wire is ${fmt(p.Lcm)} cm long and has a mass of ${fmt(p.mg)} g. A small ${fmt(p.Wc)}-N cube of lead is placed a fraction ${fmt(p.frac)} of the way from A to B. If wire B is plucked, what is the fundamental frequency at which it vibrates?`,
    compute: (p) => numeric(wireFundamentalFromMass(farWireTension(p.Wbar, p.Wc, p.frac), p.mg, p.Lcm), 'Hz'),
    solution: (p, a) =>
      steps('T_B=\\dfrac{W_{bar}}{2}+W_cx,\\quad f_1=\\dfrac{1}{2L}\\sqrt{\\dfrac{T_B}{\\mu}},\\ \\mu=\\dfrac{m}{L}', ans('f_1', a, UNIT.Hz)),
    diagram: () => exerciseImage('p142-143'),
  }),

  defineQuestion('PHY3_BM10', {
    sourceRef: 'P144',
    topic: 'beatsMedia',
    difficulty: 3,
    params: { mg: { min: 4, max: 8, step: 1 }, T: { min: 700, max: 1000, step: 10 } },
    source: { params: { mg: 6, T: 930 }, answer: 0.579 },
    prompt: (p) =>
      `One type of steel has a density of 7.8×10³ kg/m³ and a breaking stress of 7×10⁸ N/m². A cylindrical guitar string is to be made of ${fmt(p.mg)} g of this steel. What is the length of the longest and thinnest string that can be placed under a tension of ${fmt(p.T)} N without breaking?`,
    compute: (p) => numeric(((p.mg / 1000 / 7800) * 7e8) / p.T, 'm'),
    solution: (p, a) =>
      steps('A_{min}=\\dfrac{T}{\\sigma_{break}},\\quad V=\\dfrac{m}{\\rho}=A_{min}L \\Rightarrow L=\\dfrac{m\\,\\sigma_{break}}{\\rho\\,T}', ans('L', a, UNIT.m), 'The thinnest string that survives the tension is stretched right at its breaking stress; the fixed volume of steel then fixes the length.'),
  }),

  defineQuestion('PHY3_BM11', {
    sourceRef: 'P145',
    topic: 'beatsMedia',
    difficulty: 3,
    params: { mg: { min: 4, max: 8, step: 1 }, T: { min: 700, max: 900, step: 10 } },
    source: { params: { mg: 6, T: 780 }, answer: 0.0005956 },
    prompt: (p) =>
      `One type of steel has a density of 7.8×10³ kg/m³ and a breaking stress of 7×10⁸ N/m². A cylindrical guitar string is to be made of ${fmt(p.mg)} g of this steel. What is the radius of the longest and thinnest string that can be placed under a tension of ${fmt(p.T)} N without breaking?`,
    compute: (p) => numeric(Math.sqrt(p.T / (7e8 * Math.PI)), 'm'),
    solution: (p, a) =>
      steps('A=\\dfrac{T}{\\sigma_{break}}=\\pi r^2 \\Rightarrow r=\\sqrt{\\dfrac{T}{\\pi\\sigma_{break}}}', ans('r', a, UNIT.m), 'The mass of steel only affects the length, not the radius.'),
  }),

  defineQuestion('PHY3_BM12', {
    sourceRef: 'P146',
    topic: 'beatsMedia',
    difficulty: 1,
    params: { fk: { min: 20, max: 25, step: 0.5 }, v: { min: 1450, max: 1500, step: 1 } },
    source: { params: { fk: 22, v: 1471 }, answer: 0.06686 },
    prompt: (p) =>
      `The sound source of a ship's sonar system operates at a frequency of ${fmt(p.fk)} kHz. The speed of sound in water is ${fmt(p.v)} m/s. What is the wavelength of the waves emitted by the source?`,
    compute: (p) => numeric(p.v / (p.fk * 1000), 'm'),
    solution: (p, a) => steps('\\lambda=\\dfrac{v}{f}', ans('\\lambda', a, UNIT.m)),
  }),

  defineQuestion('PHY3_BM13', {
    sourceRef: 'P147',
    topic: 'beatsMedia',
    difficulty: 1,
    params: { fk: { min: 20, max: 26, step: 0.5 }, v: { min: 1480, max: 1500, step: 1 }, d: { min: 500, max: 1000, step: 10 } },
    source: { params: { fk: 24.5, v: 1490, d: 830 }, answer: 1.11409 },
    prompt: (p) =>
      `The sound source of a ship's sonar system operates at a frequency of ${fmt(p.fk)} kHz. The speed of sound in water is ${fmt(p.v)} m/s. How long does it take a pulse to travel from the ship to a target ${fmt(p.d)} m away and back?`,
    compute: (p) => numeric((2 * p.d) / p.v, 's'),
    solution: (p, a) => steps('t=\\dfrac{2d}{v}', ans('t', a, UNIT.s)),
  }),
]
