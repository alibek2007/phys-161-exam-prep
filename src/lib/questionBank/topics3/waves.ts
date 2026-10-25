import { defineQuestion } from '../defineQuestion'
import { fmt, sciText } from '../../format'
import * as wave from '../../physics/waves'
import { ans, exerciseImage, numeric, ordinal, steps, UNIT } from './helpers'

const DENOMINATOR_WORDS: Record<number, string> = { 3: 'third', 4: 'fourth', 5: 'fifth' }

/** Water: v = sqrt(B/rho) with B in 10^9 N/m² and rho in 10^3 kg/m³. */
const waterSpeed = (B9: number, rho3: number) => wave.fluidSpeed(B9 * 1e9, rho3 * 1e3)

export const waveQuestions = [
  // ---------- Interference ----------
  defineQuestion('PHY3_IN01', {
    sourceRef: 'P79',
    topic: 'interference',
    difficulty: 2,
    params: { x: { min: 3, max: 6, step: 0.01 }, L: { min: 2.5, max: 4.5, step: 0.01 }, v: { min: 340, max: 350, step: 0.1 } },
    source: { params: { x: 4.99, L: 3.55, v: 348.7 }, answer: 135.47 },
    prompt: (p) =>
      `Two megaphones at distance x = ${fmt(p.x)} m to each other are driven in phase by the same amplifier. A listener is located directly in front of one of the megaphones at point A at distance L = ${fmt(p.L)} m. The speed of sound can be taken as ${fmt(p.v)} m/s. What is the lowest frequency at which constructive interference occurs?`,
    compute: (p) => numeric(p.v / wave.megaphonePathDifference(p.x, p.L), 'Hz'),
    solution: (p, a) =>
      steps('\\Delta=\\sqrt{L^2+x^2}-L,\\quad \\Delta=n\\lambda\\ (n=1)\\ \\Rightarrow f=\\dfrac{v}{\\Delta}', ans('f', a, UNIT.Hz), 'Constructive interference needs the path difference to be a whole number of wavelengths; the lowest frequency has n = 1.'),
  }),

  defineQuestion('PHY3_IN02', {
    sourceRef: 'P80',
    topic: 'interference',
    difficulty: 1,
    params: { x: { min: 3, max: 6.5, step: 0.01 }, L: { min: 2.5, max: 4.5, step: 0.01 } },
    source: { params: { x: 5.66, L: 3.61 }, answer: 3.10325 },
    prompt: (p) =>
      `Two megaphones a distance x = ${fmt(p.x)} m apart are driven in phase by the same amplifier. A listener stands directly in front of one of the megaphones at point A, a distance L = ${fmt(p.L)} m from it. By how much do the path lengths from the two megaphones to the listener differ?`,
    compute: (p) => numeric(wave.megaphonePathDifference(p.x, p.L), 'm'),
    solution: (p, a) => steps('\\Delta=\\sqrt{L^2+x^2}-L', ans('\\Delta', a, UNIT.m)),
    diagram: () => exerciseImage('p80-81'),
  }),

  defineQuestion('PHY3_IN03', {
    sourceRef: 'P81',
    topic: 'interference',
    difficulty: 2,
    params: { x: { min: 3, max: 6, step: 0.01 }, L: { min: 2.5, max: 4.5, step: 0.01 }, v: { min: 340, max: 350, step: 0.1 } },
    source: { params: { x: 4.74, L: 3.41, v: 347.9 }, answer: 286.437 },
    prompt: (p) =>
      `Two megaphones at distance x = ${fmt(p.x)} m to each other are driven in phase by the same amplifier. A listener is located directly in front of one of the megaphones at point A at distance L = ${fmt(p.L)} m. The speed of sound can be taken as ${fmt(p.v)} m/s. What is the second-lowest frequency at which constructive interference occurs?`,
    compute: (p) => numeric((2 * p.v) / wave.megaphonePathDifference(p.x, p.L), 'Hz'),
    solution: (p, a) => steps('\\Delta=n\\lambda\\ (n=2)\\ \\Rightarrow f=\\dfrac{2v}{\\Delta},\\quad \\Delta=\\sqrt{L^2+x^2}-L', ans('f', a, UNIT.Hz)),
    diagram: () => exerciseImage('p80-81'),
  }),

  defineQuestion('PHY3_IN04', {
    sourceRef: 'P82',
    topic: 'interference',
    difficulty: 2,
    params: { x: { min: 3, max: 6, step: 0.1 }, L: { min: 2.5, max: 4.5, step: 0.01 }, v: { min: 340, max: 350, step: 1 } },
    source: { params: { x: 4.8, L: 3.05, v: 342 }, answer: 64.845 },
    prompt: (p) =>
      `Two megaphones at distance x = ${fmt(p.x)} m to each other are driven in phase by the same amplifier. A listener is located directly in front of one of the megaphones at point A at distance L = ${fmt(p.L)} m. The speed of sound can be taken as ${fmt(p.v)} m/s. What is the lowest frequency for which there is a minimum signal due to destructive interference?`,
    compute: (p) => numeric(p.v / (2 * wave.megaphonePathDifference(p.x, p.L)), 'Hz'),
    solution: (p, a) =>
      steps('\\Delta=\\left(n+\\tfrac12\\right)\\lambda\\ (n=0)\\ \\Rightarrow f=\\dfrac{v}{2\\Delta}', ans('f', a, UNIT.Hz), 'Destructive interference needs a path difference of a half-integer number of wavelengths; the lowest frequency has Δ = λ/2.'),
  }),

  defineQuestion('PHY3_IN05', {
    sourceRef: 'P83',
    topic: 'interference',
    difficulty: 2,
    params: { x: { min: 4, max: 7, step: 0.01 }, L: { min: 3, max: 5, step: 0.01 }, v: { min: 340, max: 350, step: 0.1 } },
    source: { params: { x: 6.17, L: 3.95, v: 349.8 }, answer: 155.417 },
    prompt: (p) =>
      `Two megaphones at distance x = ${fmt(p.x)} m to each other are driven in phase by the same amplifier. A listener is located directly in front of one of the megaphones at point A at distance L = ${fmt(p.L)} m. The speed of sound can be taken as ${fmt(p.v)} m/s. What is the second-lowest frequency for which there is a minimum signal?`,
    compute: (p) => numeric((3 * p.v) / (2 * wave.megaphonePathDifference(p.x, p.L)), 'Hz'),
    solution: (p, a) => steps('\\Delta=\\dfrac{3}{2}\\lambda\\ (n=1)\\ \\Rightarrow f=\\dfrac{3v}{2\\Delta}', ans('f', a, UNIT.Hz)),
  }),

  // ---------- Wave speed & power ----------
  defineQuestion('PHY3_WB01', {
    sourceRef: 'P84',
    topic: 'waveBasics',
    difficulty: 2,
    params: { f: { min: 80000, max: 130000, step: 5000 }, rho3: { min: 1.02, max: 1.03, step: 0.005 }, B9: { min: 1.9, max: 2.2, step: 0.05 } },
    source: { params: { f: 105000, rho3: 1.025, B9: 2 }, answer: 0.0133 },
    prompt: (p) =>
      `Calculate the wavelength of a sea animal's echolocation wave, if the frequencies of echolocation wave is ${fmt(p.f)} Hz. Density of the sea water is ${sciText(p.rho3, 3)} kg/m³. Bulk modulus of water Bw = ${sciText(p.B9, 9)} N/m².`,
    compute: (p) => numeric(waterSpeed(p.B9, p.rho3) / p.f, 'm'),
    solution: (p, a) => steps('v=\\sqrt{\\dfrac{B}{\\rho}},\\quad \\lambda=\\dfrac{v}{f}', ans('\\lambda', a, UNIT.m)),
  }),

  defineQuestion('PHY3_WB02', {
    sourceRef: 'P85',
    topic: 'waveBasics',
    difficulty: 1,
    params: { rho3: { min: 1.02, max: 1.03, step: 0.005 }, B9: { min: 1.8, max: 2.2, step: 0.01 } },
    source: { params: { rho3: 1.025, B9: 1.95 }, answer: 1379.29 },
    prompt: (p) =>
      `Calculate the speed of a longitudinal wave in sea water. The density of the sea water is ${sciText(p.rho3, 3)} kg/m³ and the bulk modulus of water is ${sciText(p.B9, 9)} N/m².`,
    compute: (p) => numeric(waterSpeed(p.B9, p.rho3), 'm/s'),
    solution: (p, a) => steps('v=\\sqrt{\\dfrac{B}{\\rho}}', ans('v', a, UNIT.ms)),
  }),

  defineQuestion('PHY3_WB03', {
    sourceRef: 'P86',
    topic: 'waveBasics',
    difficulty: 1,
    params: { d: { min: 50, max: 200, step: 5 }, rho3: { min: 1.02, max: 1.03, step: 0.005 }, B9: { min: 1.9, max: 2.2, step: 0.05 } },
    source: { params: { d: 100, rho3: 1.025, B9: 2 }, answer: 0.143178 },
    prompt: (p) =>
      `An animal emits an echolocation wave. If an obstacle is ${fmt(p.d)} m from the animal, how long does it take for the echolocation wave to make a round trip between the animal and the object? Density of the sea water is ${sciText(p.rho3, 3)} kg/m³. Bulk modulus of water Bw = ${sciText(p.B9, 9)} N/m².`,
    compute: (p) => numeric((2 * p.d) / waterSpeed(p.B9, p.rho3), 's'),
    solution: (p, a) => steps('v=\\sqrt{\\dfrac{B}{\\rho}},\\quad t=\\dfrac{2d}{v}', ans('t', a, UNIT.s)),
  }),

  defineQuestion('PHY3_WB04', {
    sourceRef: 'P88',
    topic: 'waveBasics',
    difficulty: 1,
    params: { d: { min: 400, max: 800, step: 10 }, lambda: { min: 0.6, max: 1, step: 0.005 }, f: { min: 350, max: 500, step: 5 } },
    source: { params: { d: 620, lambda: 0.755, f: 425 }, answer: 1.9322 },
    prompt: (p) => `Calculate the time required to travel the distance ${fmt(p.d)} m by a wave with wavelength ${fmt(p.lambda)} m and frequency ${fmt(p.f)} Hz.`,
    compute: (p) => numeric(p.d / (p.lambda * p.f), 's'),
    solution: (p, a) => steps('v=\\lambda f,\\quad t=\\dfrac{d}{v}', ans('t', a, UNIT.s)),
  }),

  defineQuestion('PHY3_WB05', {
    sourceRef: 'P89',
    topic: 'waveBasics',
    difficulty: 1,
    params: { lambda: { min: 0.7, max: 1.2, step: 0.005 }, f: { min: 400, max: 500, step: 5 }, d: { min: 500, max: 700, step: 1 } },
    source: { params: { lambda: 0.925, f: 450, d: 596 }, answer: 644.324 },
    prompt: (p) =>
      `A wave of wavelength ${fmt(p.lambda)} m and frequency ${fmt(p.f)} Hz travels along a long string. How many complete wavelengths fit into a distance of ${fmt(p.d)} m? Give the answer as a decimal number.`,
    compute: (p) => numeric(p.d / p.lambda, ''),
    solution: (p, a) => steps('N=\\dfrac{d}{\\lambda}', ans('N', a), 'The frequency does not matter: the number of wavelengths in a distance is just the distance divided by the wavelength.'),
  }),

  defineQuestion('PHY3_WB06', {
    sourceRef: 'P109',
    topic: 'waveBasics',
    difficulty: 1,
    params: { f: { min: 50, max: 80, step: 1 }, Amm: { min: 2, max: 5, step: 0.5 }, lambda: { min: 0.4, max: 0.6, step: 0.01 }, d: { min: 6, max: 10, step: 1 } },
    source: { params: { f: 64, Amm: 3, lambda: 0.51, d: 8 }, answer: 0.245 },
    prompt: (p) =>
      `A continuous succession of sinusoidal wave pulses are produced at one end of a very long string and travel along the length of the string. The wave has frequency ${fmt(p.f)} Hz, amplitude ${fmt(p.Amm)} mm, and wavelength ${fmt(p.lambda)} m. How long does it take the wave to travel a distance of ${fmt(p.d)} m along the length of the string?`,
    compute: (p) => numeric(p.d / (p.f * p.lambda), 's'),
    solution: (p, a) => steps('v=\\lambda f,\\quad t=\\dfrac{d}{v}', ans('t', a, UNIT.s)),
  }),

  defineQuestion('PHY3_WB07', {
    sourceRef: 'P110',
    topic: 'waveBasics',
    difficulty: 3,
    params: { L: { min: 6, max: 10, step: 1 }, mg: { min: 6, max: 9, step: 0.05 }, v: { min: 20, max: 30, step: 1 }, lambda: { min: 0.2, max: 0.3, step: 0.01 }, P: { min: 40, max: 60, step: 1 } },
    source: { params: { L: 8, mg: 7.65, v: 26, lambda: 0.22, P: 51 }, answer: 0.086, tolerance: 0.01 },
    prompt: (p) =>
      `A sinusoidal transverse wave travels on a string. The string has length ${fmt(p.L)} m and mass ${fmt(p.mg)} g. The wave speed is ${fmt(p.v)} m/s and the wavelength is ${fmt(p.lambda)} m. If the wave is to have an average power of ${fmt(p.P)} W, what must be the amplitude of the wave?`,
    compute: (p) => {
      const mu = wave.linearDensity(p.mg / 1000, p.L)
      const omega = wave.harmonicWaveAngularFrequency(p.v, p.lambda)
      return numeric(Math.sqrt((2 * p.P) / (mu * omega * omega * p.v)), 'm')
    },
    solution: (p, a) =>
      steps('P=\\tfrac12\\mu\\omega^2A^2v \\Rightarrow A=\\sqrt{\\dfrac{2P}{\\mu\\omega^2v}},\\quad \\mu=\\dfrac{m}{L},\\ \\omega=\\dfrac{2\\pi v}{\\lambda}', ans('A', a, UNIT.m)),
  }),

  defineQuestion('PHY3_WB08', {
    sourceRef: 'P111',
    topic: 'waveBasics',
    difficulty: 3,
    params: { L: { min: 5, max: 8, step: 0.1 }, mg: { min: 5, max: 8, step: 0.1 }, v: { min: 20, max: 28, step: 1 }, lambda: { min: 0.2, max: 0.3, step: 0.005 }, Acm: { min: 6, max: 10, step: 0.1 } },
    source: { params: { L: 6.6, mg: 6.2, v: 23, lambda: 0.255, Acm: 8.2 }, answer: 23.3297 },
    prompt: (p) =>
      `A sinusoidal transverse wave travels on a string of length ${fmt(p.L)} m and mass ${fmt(p.mg)} g. The wave speed is ${fmt(p.v)} m/s, the wavelength is ${fmt(p.lambda)} m and the amplitude is ${fmt(p.Acm)} cm. What is the average power carried by the wave?`,
    compute: (p) => {
      const mu = wave.linearDensity(p.mg / 1000, p.L)
      const omega = wave.harmonicWaveAngularFrequency(p.v, p.lambda)
      return numeric(wave.stringWavePower(mu, omega, p.Acm / 100, p.v), 'W')
    },
    solution: (p, a) => steps('P=\\tfrac12\\mu\\omega^2A^2v,\\quad \\mu=\\dfrac{m}{L},\\ \\omega=\\dfrac{2\\pi v}{\\lambda}', ans('P', a, UNIT.W)),
  }),

  // ---------- Waves on strings ----------
  defineQuestion('PHY3_SW01', {
    sourceRef: 'P87',
    topic: 'stringWaves',
    difficulty: 3,
    params: { T: { min: 100, max: 250, step: 5 }, L: { min: 1.5, max: 3, step: 0.5 }, rho: { min: 1, max: 1.2, step: 0.05 } },
    source: { params: { T: 175, L: 2, rho: 1.1 }, answer: 0.006112 },
    prompt: (p) =>
      `A nylon string is stretched between two rigid columns such that the tension in it is ${fmt(p.T)} N. The string is of length L = ${fmt(p.L)} m and has the cross-sectional area that varies with distance as A(x) = (1+x/L)×10⁻⁶, where A is in meters squared and x is in meters. Determine the time it takes for a transverse pulse in the string to travel from one end to the other. The density of nylon is ${fmt(p.rho)} g/cm³.`,
    compute: (p) => numeric(wave.taperedStringTravelTime(p.T, p.L, p.rho * 1000, 1e-6), 's'),
    solution: (p, a) =>
      steps(
        'v(x)=\\sqrt{\\dfrac{T}{\\rho A(x)}},\\quad t=\\int_0^L\\dfrac{dx}{v}=\\sqrt{\\dfrac{\\rho A_0}{T}}\\,L\\int_0^1\\sqrt{1+u}\\,du=\\sqrt{\\dfrac{\\rho A_0}{T}}\\,L\\,\\tfrac23\\left(2^{3/2}-1\\right)',
        ans('t', a, UNIT.s),
        'The linear density changes along the string, μ(x) = ρA(x), so the wave speed does too; add up dx/v along the string.',
      ),
  }),

  defineQuestion('PHY3_SW02', {
    sourceRef: 'P90',
    topic: 'stringWaves',
    difficulty: 1,
    params: { L: { min: 1.2, max: 2, step: 0.1 }, mg: { min: 3, max: 6, step: 0.1 }, T: { min: 500, max: 800, step: 1 } },
    source: { params: { L: 1.7, mg: 4.3, T: 648 }, answer: 506.148 },
    prompt: (p) =>
      `Calculate the speed of transverse waves on a steel piano wire of length ${fmt(p.L)} m and mass ${fmt(p.mg)} g that is stretched under a tension of ${fmt(p.T)} N?`,
    compute: (p) => numeric(wave.stringSpeed(p.T, p.mg / 1000, p.L), 'm/s'),
    solution: (p, a) => steps('v=\\sqrt{\\dfrac{T}{\\mu}},\\quad \\mu=\\dfrac{m}{L}', ans('v', a, UNIT.ms)),
  }),

  defineQuestion('PHY3_SW03', {
    sourceRef: 'P91',
    topic: 'stringWaves',
    difficulty: 2,
    params: { L: { min: 1.2, max: 2, step: 0.1 }, mg: { min: 4, max: 6, step: 0.05 }, T: { min: 600, max: 800, step: 5 } },
    source: { params: { L: 1.6, mg: 4.85, T: 685 }, answer: 0.00336578 },
    prompt: (p) =>
      `Calculate the time taken by a transverse pulse to travel the length of a steel piano wire of length ${fmt(p.L)} m and mass ${fmt(p.mg)} g that is stretched under a tension of ${fmt(p.T)} N.`,
    compute: (p) => numeric(p.L / wave.stringSpeed(p.T, p.mg / 1000, p.L), 's'),
    solution: (p, a) => steps('v=\\sqrt{\\dfrac{TL}{m}},\\quad t=\\dfrac{L}{v}', ans('t', a, UNIT.s)),
  }),

  defineQuestion('PHY3_SW04', {
    sourceRef: 'P97',
    topic: 'stringWaves',
    difficulty: 2,
    params: { L: { min: 7, max: 10, step: 0.05 }, m: { min: 1.5, max: 2.5, step: 0.1 }, d: { min: 12, max: 18, step: 0.1 }, t: { min: 1.2, max: 1.8, step: 0.05 } },
    source: { params: { L: 8.45, m: 1.8, d: 14.7, t: 1.45 }, answer: 21.89 },
    prompt: (p) =>
      `A transverse wave, traveling along a string of length ${fmt(p.L)} m and mass ${fmt(p.m)} kg, moves by ${fmt(p.d)} m during a time interval of ${fmt(p.t)} s. Calculate the tension in the string.`,
    compute: (p) => numeric((p.m / p.L) * (p.d / p.t) ** 2, 'N'),
    solution: (p, a) => steps('v=\\dfrac{d}{t},\\quad T=\\mu v^2=\\dfrac{m}{L}v^2', ans('T', a, UNIT.N)),
  }),

  defineQuestion('PHY3_SW05', {
    sourceRef: 'P98',
    topic: 'stringWaves',
    difficulty: 3,
    params: { Amm: { min: 1.5, max: 3, step: 0.1 }, lambda: { min: 1.4, max: 2, step: 0.05 }, v: { min: 25, max: 35, step: 0.5 }, x: { min: 1, max: 1.7, step: 0.05 }, t: { min: 0.04, max: 0.08, step: 0.0005 } },
    constraints: (p) => Math.abs(Math.cos((2 * Math.PI * (p.x - p.v * p.t)) / p.lambda)) > 0.2,
    source: { params: { Amm: 2, lambda: 1.65, v: 29, x: 1.4, t: 0.0595 }, answer: 0.0006505 },
    prompt: (p) =>
      `A transverse harmonic wave with an amplitude of ${fmt(p.Amm)} mm and wavelength of ${fmt(p.lambda)} m travels from left to right along a long, horizontal, stretched string with a speed of ${fmt(p.v)} m/s. Take the origin at the left end of the undisturbed string. At time t = 0 s the left end of the string has its maximum upward displacement. Find the magnitude of transverse displacement of a particle ${fmt(p.x)} m to the right of the origin at time t = ${fmt(p.t)} s.`,
    compute: (p) => numeric(Math.abs((p.Amm / 1000) * Math.cos((2 * Math.PI * (p.x - p.v * p.t)) / p.lambda)), 'm'),
    solution: (p, a) =>
      steps('y(x,t)=A\\cos(kx-\\omega t),\\quad k=\\dfrac{2\\pi}{\\lambda},\\ \\omega=kv', ans('|y|', a, UNIT.m), 'At t = 0 the origin is at its maximum upward displacement, so the phase constant is zero for a cosine wave moving to the right.'),
  }),

  defineQuestion('PHY3_SW06', {
    sourceRef: 'P99',
    topic: 'stringWaves',
    difficulty: 2,
    params: { Amm: { min: 1, max: 2, step: 0.05 }, lambda: { min: 1.5, max: 2, step: 0.01 }, v: { min: 25, max: 40, step: 1 } },
    source: { params: { Amm: 1.25, lambda: 1.72, v: 31 }, answer: 16.0301 },
    prompt: (p) =>
      `A transverse harmonic wave with an amplitude of ${fmt(p.Amm)} mm and a wavelength of ${fmt(p.lambda)} m travels from left to right along a long, horizontal, stretched string with a speed of ${fmt(p.v)} m/s. What is the maximum transverse acceleration of a particle of the string?`,
    compute: (p) => numeric((p.Amm / 1000) * wave.harmonicWaveAngularFrequency(p.v, p.lambda) ** 2, 'm/s^2'),
    solution: (p, a) => steps('\\omega=\\dfrac{2\\pi v}{\\lambda},\\quad a_{max}=\\omega^2A', ans('a_{max}', a, UNIT.ms2)),
  }),

  defineQuestion('PHY3_SW07', {
    sourceRef: 'P100',
    topic: 'stringWaves',
    difficulty: 3,
    params: { Amm: { min: 1, max: 2, step: 0.1 }, lambda: { min: 1.5, max: 2.2, step: 0.05 }, v: { min: 30, max: 45, step: 1 }, x: { min: 1, max: 2, step: 0.05 }, t: { min: 0.03, max: 0.06, step: 0.0005 } },
    constraints: (p) => Math.abs(Math.sin((2 * Math.PI * (p.x - p.v * p.t)) / p.lambda)) > 0.2,
    source: { params: { Amm: 1.5, lambda: 1.85, v: 38, x: 1.75, t: 0.0425 }, answer: 0.08568 },
    prompt: (p) =>
      `A transverse harmonic wave with an amplitude of ${fmt(p.Amm)} mm and wavelength of ${fmt(p.lambda)} m travels from left to right along a long, horizontal, stretched string with a speed of ${fmt(p.v)} m/s. Take the origin at the left end of the undisturbed string. At time t = 0 s the left end of the string has its maximum upward displacement. Find the magnitude of the transverse velocity of a particle ${fmt(p.x)} m to the right of the origin at time t = ${fmt(p.t)} s.`,
    compute: (p) => {
      const omega = wave.harmonicWaveAngularFrequency(p.v, p.lambda)
      return numeric(Math.abs((p.Amm / 1000) * omega * Math.sin((2 * Math.PI * (p.x - p.v * p.t)) / p.lambda)), 'm/s')
    },
    solution: (p, a) =>
      steps('y=A\\cos(kx-\\omega t) \\Rightarrow v_y=\\dfrac{\\partial y}{\\partial t}=A\\omega\\sin(kx-\\omega t)', ans('|v_y|', a, UNIT.ms)),
  }),

  defineQuestion('PHY3_SW08', {
    sourceRef: 'P104',
    topic: 'stringWaves',
    difficulty: 3,
    params: { lcm: { min: 50, max: 65, step: 1 }, b: { min: 3, max: 4, step: 0.05 }, T: { min: 0.3, max: 0.6, step: 0.02 } },
    source: { params: { lcm: 58, b: 3.55, T: 0.46 }, answer: 0.05639 },
    prompt: (p) =>
      `Three pieces of string, each of length ${fmt(p.lcm)} cm, are joined together end to end, to make a combined string of length ${fmt(3 * p.lcm)} cm. The first piece of string has mass per unit length ${fmt(p.b)}⋅10⁻⁶ kg/cm, the second piece has mass per unit length ${fmt(4 * p.b)}⋅10⁻⁶ kg/cm, and the third piece has mass per unit length ${fmt(p.b / 4)}⋅10⁻⁶ kg/cm. If the combined string is under tension ${fmt(p.T)} N, how much time does it take a transverse wave to travel the entire length of ${fmt(3 * p.lcm)} cm?`,
    compute: (p) => {
      const l = p.lcm / 100
      const muFirst = p.b * 1e-4
      const total = [1, 4, 0.25].reduce((sum, factor) => sum + l * Math.sqrt((factor * muFirst) / p.T), 0)
      return numeric(total, 's')
    },
    solution: (p, a) =>
      steps('t=\\sum_i\\dfrac{l_i}{v_i}=\\sum_i l_i\\sqrt{\\dfrac{\\mu_i}{T}}', ans('t', a, UNIT.s), 'Convert kg/cm to kg/m (×100), compute each piece\'s wave speed, and add the three travel times.'),
  }),

  defineQuestion('PHY3_SW09', {
    sourceRef: 'P107',
    topic: 'stringWaves',
    difficulty: 3,
    params: { W: { min: 1500, max: 2000, step: 50 }, L: { min: 1, max: 2, step: 0.05 }, w: { min: 1, max: 2.5, step: 0.05 }, den: { min: 3, max: 5, step: 1 } },
    source: { params: { W: 1700, L: 1.25, w: 1.5, den: 3 }, answer: 0.00538 },
    prompt: (p) =>
      `A ${fmt(p.W)}-N irregular beam is hanging horizontally by its ends from the ceiling by two vertical wires (A and B), each ${fmt(p.L)} m long and weighing ${fmt(p.w)} N. The center of gravity of this beam is one-${DENOMINATOR_WORDS[p.den]} of the way along the beam from the end where wire A is attached. If you pluck both strings at the same time at the beam, what is the time delay between the arrival of the two pulses at the ceiling? The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => {
      const tensions = wave.beamWireTensions(p.W, 1 / p.den)
      return numeric(Math.abs(wave.wirePulseTime(p.L, p.w, tensions.B) - wave.wirePulseTime(p.L, p.w, tensions.A)), 's')
    },
    solution: (p, a) =>
      steps(
        'T_A=W\\left(1-\\tfrac1n\\right),\\ T_B=\\dfrac{W}{n},\\quad t=\\dfrac{L}{v}=\\sqrt{\\dfrac{Lw}{gT}},\\quad \\Delta t=|t_B-t_A|',
        ans('\\Delta t', a, UNIT.s),
        'The wire nearer the center of gravity carries the larger share of the weight. Each wire has linear density μ = w/(gL) and tension equal to its share of W.',
      ),
    diagram: () => exerciseImage('p107-108'),
  }),

  defineQuestion('PHY3_SW10', {
    sourceRef: 'P108',
    topic: 'stringWaves',
    difficulty: 3,
    params: { W: { min: 1800, max: 2200, step: 50 }, L: { min: 1.4, max: 2, step: 0.1 }, w: { min: 1.5, max: 2.5, step: 0.05 }, den: { min: 3, max: 5, step: 1 } },
    source: { params: { W: 2000, L: 1.7, w: 1.95, den: 4 }, answer: 33.2956 },
    prompt: (p) =>
      `A ${fmt(p.W)}-N irregular beam is hanging horizontally by its ends from the ceiling by two vertical wires, A and B, each ${fmt(p.L)} m long and weighing ${fmt(p.w)} N. The center of gravity of this beam is one-${DENOMINATOR_WORDS[p.den]} of the way along the beam from the end where wire A is attached. If wire A is plucked, what is the fundamental frequency at which it vibrates? The gravitational acceleration on Earth is g = 9.8 m/s².`,
    compute: (p) => numeric(wave.wireFundamental(p.L, p.w, wave.beamWireTensions(p.W, 1 / p.den).A), 'Hz'),
    solution: (p, a) =>
      steps('T_A=W\\left(1-\\tfrac1n\\right),\\ \\mu=\\dfrac{w}{gL},\\quad f_1=\\dfrac{1}{2L}\\sqrt{\\dfrac{T_A}{\\mu}}', ans('f_1', a, UNIT.Hz)),
    diagram: () => exerciseImage('p107-108'),
  }),

  // ---------- Standing waves ----------
  defineQuestion('PHY3_ST01', {
    sourceRef: 'P92',
    topic: 'standingWaves',
    difficulty: 2,
    params: { L: { min: 2.5, max: 4, step: 0.1 }, m: { min: 0.4, max: 0.8, step: 0.05 }, T: { min: 200, max: 350, step: 5 }, n: { min: 2, max: 4, step: 1 } },
    source: { params: { L: 3.2, m: 0.6, T: 275, n: 2 }, answer: 11.9678 },
    prompt: (p) =>
      `The tension in a thin cable of length ${fmt(p.L)} m and mass ${fmt(p.m)} kg, stretched between two poles, is T = ${fmt(p.T)} N. Due to the wind in the air the cable is vibrating and produces a standing wave at ${fmt(p.n)} times its fundamental frequency. What is the frequency of the hum that is produced?`,
    compute: (p) => numeric((p.n * wave.stringSpeed(p.T, p.m, p.L)) / (2 * p.L), 'Hz'),
    solution: (p, a) => steps('v=\\sqrt{\\dfrac{TL}{m}},\\quad f_n=\\dfrac{nv}{2L}', ans('f', a, UNIT.Hz)),
  }),

  defineQuestion('PHY3_ST02', {
    sourceRef: 'P93',
    topic: 'standingWaves',
    difficulty: 1,
    params: { L: { min: 2.5, max: 4, step: 0.05 }, m: { min: 0.4, max: 0.7, step: 0.01 }, T: { min: 250, max: 350, step: 5 }, n: { min: 2, max: 5, step: 1 } },
    source: { params: { L: 3.25, m: 0.52, T: 310, n: 3 }, answer: 2.16667 },
    prompt: (p) =>
      `A thin cable of length ${fmt(p.L)} m and mass ${fmt(p.m)} kg is stretched between two poles under a tension of ${fmt(p.T)} N. The wind makes it vibrate at ${fmt(p.n)} times its fundamental frequency. What is the wavelength of the standing wave on the cable?`,
    compute: (p) => numeric((2 * p.L) / p.n, 'm'),
    solution: (p, a) => steps('\\lambda_n=\\dfrac{2L}{n}', ans('\\lambda', a, UNIT.m), 'The wavelength of the nth harmonic only depends on the length, not on the tension.'),
  }),

  defineQuestion('PHY3_ST03', {
    sourceRef: 'P94',
    topic: 'standingWaves',
    difficulty: 1,
    params: { Lcm: { min: 45, max: 65, step: 1 }, f: { min: 220, max: 330, step: 1 } },
    source: { params: { Lcm: 52, f: 262 }, answer: 272.48 },
    prompt: (p) =>
      `A string on a certain guitar of the length of ${fmt(p.Lcm)} cm vibrates at a fundamental frequency of ${fmt(p.f)} Hz. Calculate the speed of the transverse waves on the string.`,
    compute: (p) => numeric(wave.speedFromFundamental(p.Lcm / 100, p.f), 'm/s'),
    solution: (p, a) => steps('f_1=\\dfrac{v}{2L} \\Rightarrow v=2Lf_1', ans('v', a, UNIT.ms)),
  }),

  defineQuestion('PHY3_ST04', {
    sourceRef: 'P95',
    topic: 'standingWaves',
    difficulty: 1,
    params: { L1: { min: 50, max: 65, step: 1 }, f: { min: 240, max: 300, step: 1 }, L2: { min: 30, max: 45, step: 1 } },
    source: { params: { L1: 56, f: 270, L2: 34 }, answer: 444.706 },
    prompt: (p) =>
      `A string on a guitar of length ${fmt(p.L1)} cm vibrates at a fundamental frequency of ${fmt(p.f)} Hz. Without changing the tension, the vibrating length is shortened to ${fmt(p.L2)} cm. What fundamental frequency does the string now produce?`,
    compute: (p) => numeric((p.f * p.L1) / p.L2, 'Hz'),
    solution: (p, a) => steps('f_1=\\dfrac{v}{2L}\\propto\\dfrac1L \\Rightarrow f_2=f_1\\dfrac{L_1}{L_2}', ans('f_2', a, UNIT.Hz), 'The tension and linear density are unchanged, so the wave speed v is the same.'),
  }),

  defineQuestion('PHY3_ST05', {
    sourceRef: 'P96',
    topic: 'standingWaves',
    difficulty: 2,
    params: { Lcm: { min: 50, max: 65, step: 1 }, f: { min: 220, max: 280, step: 1 }, mu: { min: 1.2, max: 1.6, step: 0.01 } },
    source: { params: { Lcm: 54, f: 250, mu: 1.37 }, answer: 99.873 },
    prompt: (p) =>
      `A string on a certain guitar of the length of ${fmt(p.Lcm)} cm vibrates at a fundamental frequency of ${fmt(p.f)} Hz. Suppose the linear mass density of the guitar is ${fmt(p.mu)} g/m. Find the tension required to tune the string.`,
    compute: (p) => numeric(wave.tensionFromFundamental(p.mu / 1000, p.Lcm / 100, p.f), 'N'),
    solution: (p, a) => steps('v=2Lf_1,\\quad T=\\mu v^2', ans('T', a, UNIT.N)),
  }),

  defineQuestion('PHY3_ST06', {
    sourceRef: 'P101',
    topic: 'standingWaves',
    difficulty: 3,
    params: { Lcm: { min: 50, max: 65, step: 1 }, mg: { min: 7, max: 10, step: 0.1 }, vs: { min: 340, max: 346, step: 1 }, lambda: { min: 3, max: 4, step: 0.1 } },
    source: { params: { Lcm: 55, mg: 8.5, vs: 344, lambda: 3.4 }, answer: 21.2695 },
    prompt: (p) =>
      `One string of a certain musical instrument is ${fmt(p.Lcm)} cm long and has a mass of ${fmt(p.mg)} g. It is being played in a room where the speed of sound is ${fmt(p.vs)} m/s. To what tension must you adjust the string so that, when vibrating in its second overtone, it produces sound of wavelength ${fmt(p.lambda)} m?`,
    compute: (p) => {
      const L = p.Lcm / 100
      const f = p.vs / p.lambda
      const vString = (2 * L * f) / 3
      return numeric((p.mg / 1000 / L) * vString * vString, 'N')
    },
    solution: (p, a) =>
      steps('f=\\dfrac{v_{sound}}{\\lambda},\\ \\ f_3=\\dfrac{3v}{2L} \\Rightarrow v=\\dfrac{2Lf}{3},\\ \\ T=\\mu v^2', ans('T', a, UNIT.N), 'The second overtone is the third harmonic. The sound it makes has the same frequency as the string vibrates at.'),
  }),

  defineQuestion('PHY3_ST07', {
    sourceRef: 'P102',
    topic: 'standingWaves',
    difficulty: 1,
    params: { Lcm: { min: 55, max: 70, step: 0.5 }, mg: { min: 8, max: 11, step: 0.1 }, vs: { min: 340, max: 348, step: 1 } },
    source: { params: { Lcm: 61.5, mg: 9.5, vs: 345 }, answer: 0.41 },
    prompt: (p) =>
      `One string of a musical instrument is ${fmt(p.Lcm)} cm long and has a mass of ${fmt(p.mg)} g. It is played in a room where the speed of sound is ${fmt(p.vs)} m/s. When the string vibrates in its second overtone, what is the wavelength of the standing wave on the string itself?`,
    compute: (p) => numeric((2 * (p.Lcm / 100)) / 3, 'm'),
    solution: (p, a) => steps('\\lambda_3=\\dfrac{2L}{3}', ans('\\lambda', a, UNIT.m), 'The second overtone is the third harmonic; both the string\'s mass and the speed of sound are irrelevant here.'),
  }),

  defineQuestion('PHY3_ST08', {
    sourceRef: 'P103',
    topic: 'standingWaves',
    difficulty: 2,
    params: { Lcm: { min: 55, max: 65, step: 1 }, mg: { min: 8, max: 11, step: 0.1 }, vs: { min: 340, max: 348, step: 1 }, lcm: { min: 3, max: 4.5, step: 0.1 } },
    source: { params: { Lcm: 60, mg: 9.5, vs: 344, lcm: 3.7 }, answer: 3099.099 },
    prompt: (p) =>
      `One string of a certain musical instrument is ${fmt(p.Lcm)} cm long and has a mass of ${fmt(p.mg)} g. It is being played in a room where the speed of sound is ${fmt(p.vs)} m/s. What frequency sound does this string produce in its fundamental mode of vibration, if when vibrating in its second overtone, it produces sound of wavelength ${fmt(p.lcm)} cm?`,
    compute: (p) => numeric(p.vs / (p.lcm / 100) / 3, 'Hz'),
    solution: (p, a) => steps('f_3=\\dfrac{v_{sound}}{\\lambda},\\quad f_1=\\dfrac{f_3}{3}', ans('f_1', a, UNIT.Hz)),
  }),

  defineQuestion('PHY3_ST09', {
    sourceRef: 'P105',
    topic: 'standingWaves',
    difficulty: 3,
    params: { L: { min: 5, max: 8, step: 1 }, m: { min: 0.6, max: 1, step: 0.025 }, W: { min: 200, max: 260, step: 5 }, theta: { min: 50, max: 70, step: 1 }, n: { min: 2, max: 6, step: 1 } },
    source: { params: { L: 6, m: 0.825, W: 230, theta: 56, n: 5 }, answer: 11.876 },
    prompt: (p) =>
      `A ${fmt(p.L)}-m, ${fmt(p.m)}-kg wire is used to support two uniform ${fmt(p.W)}-N posts of equal length inclined at an angle of θ = ${fmt(p.theta)}˚. Assume that the wire is essentially horizontal and that the speed of sound is 344 m/s. A strong wind is blowing, causing the wire to vibrate in its ${ordinal(p.n)} overtone. What is the frequency of the sound this wire produces?`,
    compute: (p) => {
      const T = wave.postWireTension(p.W, (p.theta * Math.PI) / 180)
      return numeric(((p.n + 1) * wave.stringSpeed(T, p.m, p.L)) / (2 * p.L), 'Hz')
    },
    solution: (p, a) =>
      steps(
        'T\\,(\\ell\\sin\\theta)=W\\,\\tfrac{\\ell}{2}\\cos\\theta \\Rightarrow T=\\dfrac{W}{2\\tan\\theta},\\quad v=\\sqrt{\\dfrac{TL}{m}},\\quad f=\\dfrac{(n+1)v}{2L}',
        ans('f', a, UNIT.Hz),
        'Torque about the pivot of one post: the wire pulls horizontally at the top (arm ℓ sin θ), the weight acts at the middle (arm ½ℓ cos θ). The n-th overtone is the (n+1)-th harmonic. The sound has the same frequency as the wire.',
      ),
    diagram: () => exerciseImage('p105-106'),
  }),

  defineQuestion('PHY3_ST10', {
    sourceRef: 'P106',
    topic: 'standingWaves',
    difficulty: 3,
    params: { L: { min: 8, max: 10, step: 0.5 }, m: { min: 0.6, max: 1, step: 0.025 }, W: { min: 200, max: 260, step: 5 }, theta: { min: 60, max: 70, step: 1 }, n: { min: 5, max: 8, step: 1 } },
    source: { params: { L: 9, m: 0.825, W: 230, theta: 66, n: 7 }, answer: 32.75 },
    prompt: (p) =>
      `A ${fmt(p.L)}-m, ${fmt(p.m)}-kg wire is used to support two uniform ${fmt(p.W)}-N posts of equal length inclined at an angle of θ = ${fmt(p.theta)}˚. Assume that the wire is essentially horizontal and that the speed of sound is 344 m/s. A strong wind is blowing, causing the wire to vibrate in its ${ordinal(p.n)} overtone. What is the wavelength of the sound this wire produces?`,
    compute: (p) => {
      const T = wave.postWireTension(p.W, (p.theta * Math.PI) / 180)
      const f = ((p.n + 1) * wave.stringSpeed(T, p.m, p.L)) / (2 * p.L)
      return numeric(344 / f, 'm')
    },
    solution: (p, a) =>
      steps('T=\\dfrac{W}{2\\tan\\theta},\\ v=\\sqrt{\\dfrac{TL}{m}},\\ f=\\dfrac{(n+1)v}{2L},\\quad \\lambda_{sound}=\\dfrac{344}{f}', ans('\\lambda', a, UNIT.m), 'The wire\'s vibration frequency is also the frequency of the sound; its wavelength follows from the speed of sound.'),
    diagram: () => exerciseImage('p105-106'),
  }),

  defineQuestion('PHY3_ST11', {
    sourceRef: 'P112',
    topic: 'standingWaves',
    difficulty: 3,
    params: { Lcm: { min: 40, max: 55, step: 1 }, dmm: { min: 1.4, max: 1.7, step: 0.01 }, f: { min: 420, max: 460, step: 1 } },
    source: { params: { Lcm: 48, dmm: 1.52, f: 439 }, answer: 628.468 },
    prompt: (p) =>
      `A uniform cylindrical steel wire, ${fmt(p.Lcm)} cm long and ${fmt(p.dmm)} mm in diameter, is fixed at both ends. To what tension must it be adjusted so that, when vibrating in its first overtone, it produces the note of frequency ${fmt(p.f)} Hz? Assume that it stretches an insignificant amount. Density of steel ρ = 7.8×10³ kg/m³.`,
    compute: (p) => {
      const L = p.Lcm / 100
      const mu = 7800 * Math.PI * (p.dmm / 2000) ** 2
      return numeric(mu * (p.f * L) ** 2, 'N')
    },
    solution: (p, a) =>
      steps('f_2=\\dfrac{v}{L} \\Rightarrow v=fL,\\quad \\mu=\\rho\\dfrac{\\pi d^2}{4},\\quad T=\\mu v^2', ans('T', a, UNIT.N), 'The first overtone is the second harmonic.'),
  }),

  defineQuestion('PHY3_ST12', {
    sourceRef: 'P113',
    topic: 'standingWaves',
    difficulty: 2,
    params: { Lcm: { min: 45, max: 55, step: 1 }, dmm: { min: 1.5, max: 1.8, step: 0.01 }, f: { min: 430, max: 470, step: 1 }, rho3: { min: 7.8, max: 8, step: 0.05 } },
    source: { params: { Lcm: 49, dmm: 1.63, f: 451, rho3: 7.95 }, answer: 0.00812883 },
    prompt: (p) =>
      `A uniform cylindrical steel wire is ${fmt(p.Lcm)} cm long and ${fmt(p.dmm)} mm in diameter, and is fixed at both ends so that in its first overtone it sounds the note ${fmt(p.f)} Hz. What is the mass of this wire? The density of steel is ρ = ${sciText(p.rho3, 3)} kg/m³.`,
    compute: (p) => numeric(p.rho3 * 1000 * Math.PI * (p.dmm / 2000) ** 2 * (p.Lcm / 100), 'kg'),
    solution: (p, a) => steps('m=\\rho V=\\rho\\,\\dfrac{\\pi d^2}{4}\\,L', ans('m', a, UNIT.kg), 'The note\'s frequency is not needed: the mass follows from the wire\'s size and density.'),
  }),

  defineQuestion('PHY3_ST13', {
    sourceRef: 'P114',
    topic: 'standingWaves',
    difficulty: 2,
    params: { f: { min: 60, max: 90, step: 1 }, L: { min: 0.5, max: 0.8, step: 0.01 }, mg: { min: 12, max: 18, step: 0.1 } },
    source: { params: { f: 74, L: 0.66, mg: 14.7 }, answer: 212.51 },
    prompt: (p) =>
      `A musician tunes the string of her instrument to a fundamental frequency of ${fmt(p.f)} Hz. The vibrating portion of the string is ${fmt(p.L)} m long and has a mass of ${fmt(p.mg)} g. With what tension must the musician stretch it?`,
    compute: (p) => numeric(wave.tensionFromFundamental(p.mg / 1000 / p.L, p.L, p.f), 'N'),
    solution: (p, a) => steps('v=2Lf_1,\\quad T=\\mu v^2,\\ \\mu=\\dfrac{m}{L}', ans('T', a, UNIT.N)),
  }),
]
