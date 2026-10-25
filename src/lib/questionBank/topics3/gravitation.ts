import { defineQuestion } from '../defineQuestion'
import { fmt, sciText } from '../../format'
import * as grav from '../../physics/gravitation'
import { ans, exerciseImage, G_TEXT, GRAVITY, numeric, steps, UNIT } from './helpers'

const G = grav.G_COMMON
const G2 = grav.G_PRECISE
const R_EARTH = 6.371e6
const EARTH_TEXT = '6.371×10⁶ m'

export const gravitationQuestions = [
  // ---------- Gravitational field & weight ----------
  defineQuestion('PHY3_GF01', {
    sourceRef: 'P1',
    topic: 'gravityField',
    difficulty: 2,
    params: { gT: { min: 4, max: 9, step: 0.1 } },
    source: { params: { gT: 6.2 }, answer: 1638.858 },
    prompt: (p) =>
      `At what altitude above the Earth's surface would the gravitational acceleration be ${fmt(p.gT)} m/s²? The radius of Earth is ${EARTH_TEXT}. The gravitational acceleration on Earth is g = 9.8 m/s².`,
    compute: (p) => numeric(grav.altitudeForG(R_EARTH, GRAVITY, p.gT) / 1000, 'km'),
    solution: (p, a) => steps('g\' = g\\left(\\dfrac{R}{R+h}\\right)^2 \\Rightarrow h = R\\left(\\sqrt{g/g\'}-1\\right)', ans('h', a, UNIT.km)),
  }),

  defineQuestion('PHY3_GF02', {
    sourceRef: 'P2',
    topic: 'gravityField',
    difficulty: 2,
    params: { fraction: { min: 0.3, max: 0.9, step: 0.05 }, R6: { min: 5.8, max: 6.8, step: 0.01 } },
    source: { params: { fraction: 0.6, R6: 6.33 }, answer: 1.84199e6 },
    prompt: (p) =>
      `At what altitude above the Earth's surface would the gravitational acceleration be ${fmt(p.fraction)} of its value at the surface? The radius of the Earth is ${sciText(p.R6, 6)} m.`,
    compute: (p) => numeric(grav.altitudeForGFraction(p.R6 * 1e6, p.fraction), 'm'),
    solution: (p, a) => steps('\\dfrac{g\'}{g}=\\left(\\dfrac{R}{R+h}\\right)^2 \\Rightarrow h = R\\left(\\dfrac{1}{\\sqrt{g\'/g}}-1\\right)', ans('h', a, UNIT.m)),
  }),

  defineQuestion('PHY3_GF03', {
    sourceRef: 'P3',
    topic: 'gravityField',
    difficulty: 1,
    params: { h: { min: 300, max: 1500, step: 10 } },
    source: { params: { h: 720 }, answer: 7.911 },
    prompt: (p) =>
      `What is the value of gravitational acceleration g ${fmt(p.h)} km above Earth's surface? The radius of Earth is ${EARTH_TEXT}. The gravitational acceleration on Earth is g = 9.8 m/s².`,
    compute: (p) => numeric(grav.gAtAltitude(GRAVITY, R_EARTH, p.h * 1000), 'm/s^2'),
    solution: (p, a) => steps('g\' = g\\left(\\dfrac{R}{R+h}\\right)^2', ans('g\'', a, UNIT.ms2)),
  }),

  defineQuestion('PHY3_GF04', {
    sourceRef: 'P4',
    topic: 'gravityField',
    difficulty: 2,
    params: { D: { min: 30, max: 60, step: 1 }, pct: { min: 50, max: 90, step: 5 } },
    source: { params: { D: 45, pct: 75 }, answer: 0.572 },
    prompt: (p) =>
      `In a Star Wars movie the rebel space station is built as circular ring of ${fmt(p.D)} m in diameter. At what angular speed should it be rotated so the occupants feel that they have the ${fmt(p.pct)}% of the weight they feel on Earth? The gravitational acceleration on Earth is g = 9.8 m/s².`,
    compute: (p) => numeric(grav.ringAngularSpeed(p.pct / 100, GRAVITY, p.D / 2), 'rad/s'),
    solution: (p, a) =>
      steps('\\omega^2 R = f\\,g \\Rightarrow \\omega = \\sqrt{\\dfrac{f g}{R}},\\ R=\\tfrac{D}{2}', ans('\\omega', a, UNIT.rads), 'The apparent weight is the normal force from the rim, which supplies the centripetal acceleration ω²R.'),
  }),

  defineQuestion('PHY3_GF05', {
    sourceRef: 'P5',
    topic: 'gravityField',
    difficulty: 2,
    params: { D: { min: 30, max: 60, step: 1 }, pct: { min: 50, max: 95, step: 5 } },
    source: { params: { D: 39, pct: 85 }, answer: 12.745 },
    prompt: (p) =>
      `In a Star Wars movie the rebel space station is built as a circular ring of ${fmt(p.D)} m in diameter. At what linear speed should its rim move so that the occupants feel ${fmt(p.pct)}% of the weight they feel on Earth? The gravitational acceleration on Earth is g = 9.8 m/s².`,
    compute: (p) => numeric(grav.ringRimSpeed(p.pct / 100, GRAVITY, p.D / 2), 'm/s'),
    solution: (p, a) => steps('\\dfrac{v^2}{R} = f\\,g \\Rightarrow v = \\sqrt{f g R}', ans('v', a, UNIT.ms)),
  }),

  defineQuestion('PHY3_GF06', {
    sourceRef: 'P7',
    topic: 'gravityField',
    difficulty: 1,
    params: { massRatio: { min: 1.2, max: 2.2, step: 0.01 }, radiusRatio: { min: 0.7, max: 1.2, step: 0.01 } },
    source: { params: { massRatio: 1.78, radiusRatio: 0.93 }, answer: 2.05804 },
    prompt: (p) =>
      `Planet Y has a mass ${fmt(p.massRatio)} times that of planet X, and its radius is ${fmt(p.radiusRatio)} times the radius of planet X. By what factor is the gravitational acceleration at the surface of planet Y larger than that at the surface of planet X?`,
    compute: (p) => numeric(grav.surfaceGravityRatio(p.massRatio, p.radiusRatio), ''),
    solution: (p, a) => steps('g = \\dfrac{GM}{R^2} \\Rightarrow \\dfrac{g_Y}{g_X} = \\dfrac{M_Y/M_X}{(R_Y/R_X)^2}', ans('\\dfrac{g_Y}{g_X}', a)),
  }),

  defineQuestion('PHY3_GF07', {
    sourceRef: 'P19',
    topic: 'gravityField',
    difficulty: 1,
    params: { m: { min: 40, max: 90, step: 0.1 } },
    source: { params: { m: 50.3 }, answer: 82.157 },
    prompt: (p) =>
      `Calculate the weight of a ${fmt(p.m)}-kg person on the Moon where the gravitational acceleration is one-sixth that of the Earth. The gravitational acceleration on Earth is g = 9.8 m/s².`,
    compute: (p) => numeric((p.m * GRAVITY) / 6, 'N'),
    solution: (p, a) => steps('W_{Moon} = m\\,\\dfrac{g}{6}', ans('W', a, UNIT.N)),
  }),

  defineQuestion('PHY3_GF08', {
    sourceRef: 'P20',
    topic: 'gravityField',
    difficulty: 1,
    params: { W: { min: 80, max: 160, step: 1 } },
    source: { params: { W: 115 }, answer: 70.4082 },
    prompt: (p) =>
      `A person weighs ${fmt(p.W)} N on the Moon, where the gravitational acceleration is one-sixth that of the Earth. What is the mass of this person? The gravitational acceleration on Earth is g = 9.8 m/s².`,
    compute: (p) => numeric((6 * p.W) / GRAVITY, 'kg'),
    solution: (p, a) => steps('m = \\dfrac{W}{g_{Moon}} = \\dfrac{6W}{g}', ans('m', a, UNIT.kg), 'Mass is the same everywhere; only the weight changes.'),
  }),

  defineQuestion('PHY3_GF09', {
    sourceRef: 'P21',
    topic: 'gravityField',
    difficulty: 1,
    params: { m: { min: 8, max: 30, step: 1 } },
    source: { params: { m: 16 }, answer: 156.5 },
    prompt: (p) =>
      `Calculate the force of gravity of a ${fmt(p.m)} kg block resting on the earth. Mass of Earth is ME = 5.97×10²⁴ kg. The radius of the Earth is RE = 6.38×10⁶ m. Gravitational constant is ${G_TEXT}.`,
    compute: (p) => numeric(grav.newtonForce(G, 5.97e24, p.m, 6.38e6), 'N'),
    solution: (p, a) => steps('F = \\dfrac{G M_E m}{R_E^2}', ans('F', a, UNIT.N)),
  }),

  defineQuestion('PHY3_GF10', {
    sourceRef: 'P25',
    topic: 'gravityField',
    difficulty: 2,
    params: { D: { min: 100, max: 300, step: 5 }, rho: { min: 2000, max: 3500, step: 50 } },
    source: { params: { D: 155, rho: 2650 }, answer: 0.0573802 },
    prompt: (p) =>
      `What is the gravitational acceleration at the surface of a ${fmt(p.D)}-km-diameter asteroid with a density of ${fmt(p.rho)} kg/m³? Gravitational constant is G = ${G_TEXT}.`,
    compute: (p) => numeric(grav.sphereSurfaceG(G, p.rho, (p.D * 1000) / 2), 'm/s^2'),
    solution: (p, a) => steps('g = \\dfrac{GM}{R^2} = \\dfrac{4}{3}\\pi G\\rho R', ans('g', a, UNIT.ms2)),
  }),

  // ---------- Gravitational force from mass distributions ----------
  defineQuestion('PHY3_GN01', {
    sourceRef: 'P8',
    topic: 'gravitationalForce',
    difficulty: 3,
    params: { M: { min: 1, max: 5, step: 0.5 }, m: { min: 1, max: 3, step: 0.5 }, r: { min: 2.5, max: 5, step: 0.1 } },
    source: { params: { M: 3, m: 1, r: 3.9 }, answer: 3.1761e-11 },
    prompt: (p) =>
      `Figure shows five equal masses M = ${fmt(p.M)} kg equally spaced on the arc of a semicircle of radius ${fmt(p.r)} m. A mass m = ${fmt(p.m)} kg is placed at the center of curvature of the arc. What is the magnitude of the force on mass m due to the other five masses? Gravitational constant G=${G_TEXT}.`,
    compute: (p) => numeric(grav.semicircleForce(G, p.M, p.m, p.r), 'N'),
    solution: (p, a) =>
      steps('F = \\dfrac{GMm}{r^2}\\left(1+\\sqrt2\\right)', ans('F', a, UNIT.N), 'The masses sit at 0°, 45°, 90°, 135° and 180°. The horizontal components cancel in pairs; the vertical components are sin 45° + 1 + sin 45° = 1 + √2 (in units of GMm/r²).'),
    diagram: () => exerciseImage('p8'),
  }),

  defineQuestion('PHY3_GN02', {
    sourceRef: 'P9',
    topic: 'gravitationalForce',
    difficulty: 3,
    params: { R: { min: 10, max: 15, step: 0.1 }, M: { min: 20, max: 30, step: 0.1 }, m: { min: 1.5, max: 3.5, step: 0.1 }, d: { min: 0.6, max: 1, step: 0.05 } },
    source: { params: { R: 12.4, M: 24.8, m: 2.4, d: 0.75 }, answer: 6.305e-9 },
    prompt: (p) =>
      `Spherical hollow is made in a lead sphere of radius R = ${fmt(p.R)} cm such that its surface touches the outside surface of a lead sphere and passes through its center as shown in the figure below. The mass of the sphere before hollowing was M = ${fmt(p.M)} kg. Find the magnitude of the gravitational force between the hollowed-out lead sphere and a small sphere of mass m = ${fmt(p.m)} kg, located at distance d = ${fmt(p.d)} m from the center of the lead sphere. Gravitational constant is ${G_TEXT}.`,
    compute: (p) => numeric(grav.hollowSphereForce(G, p.M, p.R / 100, p.m, p.d), 'N'),
    solution: (p, a) =>
      steps(
        'F = Gm\\left[\\dfrac{M}{d^2} - \\dfrac{M/8}{(d+R/2)^2}\\right]',
        ans('F', a, UNIT.N),
        'Superposition: the full sphere minus the removed sphere. The hollow has radius R/2, so its mass is M/8, and its center is R/2 further from m than the center of the big sphere.',
      ),
    diagram: () => exerciseImage('p9'),
  }),

  defineQuestion('PHY3_GN03', {
    sourceRef: 'P10',
    topic: 'gravitationalForce',
    difficulty: 2,
    params: { M1: { min: 8, max: 15, step: 0.1 }, M2: { min: 30, max: 50, step: 1 }, x2: { min: 30, max: 60, step: 0.1 }, M3: { min: 10, max: 25, step: 0.1 } },
    source: { params: { M1: 11.2, M2: 42, x2: 48.1, M3: 19.8 }, answer: 16.38 },
    prompt: (p) =>
      `Two spherical masses are located on the x-axis, the first at the origin with M1=${fmt(p.M1)} kg, and the second M2=${fmt(p.M2)} kg at position x=${fmt(p.x2)} m. The third sphere with M3=${fmt(p.M3)} kg is placed on x-axis such that M3 experiences no net gravitational force due to M1 and M2. Calculate the position of M3.`,
    compute: (p) => numeric(grav.nullPoint(p.M1, p.M2, p.x2), 'm'),
    solution: (p, a) =>
      steps('\\dfrac{M_1}{x^2}=\\dfrac{M_2}{(x_2-x)^2} \\Rightarrow x = \\dfrac{x_2\\sqrt{M_1}}{\\sqrt{M_1}+\\sqrt{M_2}}', ans('x', a, UNIT.m), 'The two pulls on M₃ must be equal and opposite, so M₃ lies between the masses; its own mass cancels.'),
  }),

  defineQuestion('PHY3_GN04', {
    sourceRef: 'P28',
    topic: 'gravitationalForce',
    difficulty: 2,
    params: { M30: { min: 1, max: 3, step: 0.5 }, r7: { min: 5, max: 9, step: 1 } },
    source: { params: { M30: 1, r7: 8 }, answer: 2.6055e27 },
    prompt: (p) =>
      `Two identical stars with mass ${sciText(p.M30, 30)} kg orbit around their center of mass. Each orbit is circular and has a radius of ${sciText(p.r7, 7)} km, so that the two stars are always on opposite sides of the circle. Find the gravitational force of one star on the other. Gravitational constant is ${G_TEXT}.`,
    compute: (p) => numeric(grav.binaryForce(G, p.M30 * 1e30, p.r7 * 1e10), 'N'),
    solution: (p, a) => steps('F = \\dfrac{GM^2}{(2r)^2}', ans('F', a, UNIT.N), 'The stars are on opposite sides of the circle, so their separation is 2r.'),
    diagram: () => exerciseImage('p28-31'),
  }),

  // ---------- Orbits ----------
  defineQuestion('PHY3_OB01', {
    sourceRef: 'P11',
    topic: 'orbits',
    difficulty: 2,
    params: { hours: { min: 1.5, max: 4, step: 0.05 } },
    source: { params: { hours: 2.65 }, answer: 1552.56 },
    prompt: (p) =>
      `The period of the circular orbit of a satellite very close to the surface of a spherical planet is ${fmt(p.hours)} hours. Find the density of the planet assuming it is uniform. Gravitational constant is ${G_TEXT}.`,
    compute: (p) => numeric(grav.surfaceOrbitDensity(G, p.hours * 3600), 'kg/m^3'),
    solution: (p, a) =>
      steps('T^2 = \\dfrac{4\\pi^2R^3}{GM},\\ M=\\tfrac43\\pi R^3\\rho \\Rightarrow \\rho = \\dfrac{3\\pi}{GT^2}', ans('\\rho', a, UNIT.kgm3), 'For an orbit at the surface the radius cancels, so only the period is needed.'),
  }),

  defineQuestion('PHY3_OB02', {
    sourceRef: 'P12',
    topic: 'orbits',
    difficulty: 2,
    params: { rho: { min: 3000, max: 6000, step: 100 } },
    source: { params: { rho: 4400 }, answer: 5666.91 },
    prompt: (p) =>
      `A satellite orbits very close to the surface of a spherical planet of uniform density ${fmt(p.rho)} kg/m³. Find the period of its circular orbit. Gravitational constant is G = ${G_TEXT}.`,
    compute: (p) => numeric(grav.surfaceOrbitPeriod(G, p.rho), 's'),
    solution: (p, a) => steps('T = \\sqrt{\\dfrac{3\\pi}{G\\rho}}', ans('T', a, UNIT.s)),
  }),

  defineQuestion('PHY3_OB03', {
    sourceRef: 'P17',
    topic: 'orbits',
    difficulty: 3,
    params: { M24: { min: 3, max: 8, step: 0.01 }, a: { min: 5000, max: 9000, step: 10 } },
    source: { params: { M24: 5.27, a: 6930 }, answer: 7121.99 },
    prompt: (p) =>
      `Three identical stars of mass ${sciText(p.M24, 24)} kg are located at the vertices of an equilateral triangle with side ${fmt(p.a)} km. At what speed must they move if they all revolve under the influence of one another's gravitational force in a circular orbit circumscribing the triangle while still preserving the equilateral triangle? Gravitational constant is ${G_TEXT}.`,
    compute: (p) => numeric(grav.triangleOrbitSpeed(G, p.M24 * 1e24, p.a * 1000), 'm/s'),
    solution: (p, a) =>
      steps('r=\\dfrac{a}{\\sqrt3},\\ \\ F_{net}=\\sqrt3\\dfrac{GM^2}{a^2}=\\dfrac{Mv^2}{r} \\Rightarrow v=\\sqrt{\\dfrac{GM}{a}}', ans('v', a, UNIT.ms), 'Each star feels two equal pulls 60° apart; their resultant points at the center of the triangle.'),
    diagram: () => exerciseImage('p17'),
  }),

  defineQuestion('PHY3_OB04', {
    sourceRef: 'P22',
    topic: 'orbits',
    difficulty: 2,
    params: { days: { min: 20, max: 40, step: 0.1 }, M24: { min: 2, max: 6, step: 0.1 } },
    source: { params: { days: 28.4, M24: 4 }, answer: 343951138.39 },
    prompt: (p) =>
      `Assume that the satellite orbits a planet in a circular orbit. From the observed orbital period of ${fmt(p.days)} days, calculate the distance of the satellite from the center of the planet. Assume that the satellite's motion is determined solely by the gravitational force exerted on it by the planet, and the mass of the planet is m = ${sciText(p.M24, 24)} kg. Gravitational constant is ${G_TEXT}.`,
    compute: (p) => numeric(grav.orbitRadius(G, p.M24 * 1e24, p.days * 86400), 'm'),
    solution: (p, a) =>
      steps('\\dfrac{GMm}{r^2}=m\\dfrac{4\\pi^2 r}{T^2} \\Rightarrow r=\\left(\\dfrac{GMT^2}{4\\pi^2}\\right)^{1/3}', ans('r', a, UNIT.m)),
  }),

  defineQuestion('PHY3_OB05', {
    sourceRef: 'P23',
    topic: 'orbits',
    difficulty: 2,
    params: { M24: { min: 2, max: 5, step: 0.1 }, r8: { min: 3, max: 5, step: 0.1 } },
    source: { params: { M24: 3, r8: 3.7 }, answer: 3.16125e6 },
    prompt: (p) =>
      `A satellite orbits a planet of mass ${sciText(p.M24, 24)} kg in a circular orbit of radius ${sciText(p.r8, 8)} m. Calculate the orbital period of the satellite. Gravitational constant is G = ${G_TEXT}.`,
    compute: (p) => numeric(grav.orbitPeriod(G, p.M24 * 1e24, p.r8 * 1e8), 's'),
    solution: (p, a) => steps('T = 2\\pi\\sqrt{\\dfrac{r^3}{GM}}', ans('T', a, UNIT.s)),
  }),

  defineQuestion('PHY3_OB06', {
    sourceRef: 'P26',
    topic: 'orbits',
    difficulty: 3,
    params: { v4: { min: 1.5, max: 3.5, step: 0.1 }, r11: { min: 2, max: 3.5, step: 0.1 }, r10: { min: 3, max: 8, step: 0.1 } },
    source: { params: { v4: 2.4, r11: 2.7, r10: 5.1 }, answer: 69252.98 },
    prompt: (p) =>
      `Comets travel around the sun in elliptical orbits with large eccentricities. If a comet has speed ${sciText(p.v4, 4)} m/s when at a distance of ${sciText(p.r11, 11)} m from the center of the sun, what is its speed when at a distance of ${sciText(p.r10, 10)} m? Gravitational constant is ${G_TEXT}. Mass of the sun is 1.989×10³⁰ kg.`,
    compute: (p) => numeric(grav.cometSpeedAt(G, 1.989e30, p.v4 * 1e4, p.r11 * 1e11, p.r10 * 1e10), 'm/s'),
    solution: (p, a) =>
      steps('\\tfrac12v_1^2-\\dfrac{GM}{r_1}=\\tfrac12v_2^2-\\dfrac{GM}{r_2} \\Rightarrow v_2=\\sqrt{v_1^2+2GM\\left(\\dfrac1{r_2}-\\dfrac1{r_1}\\right)}', ans('v_2', a, UNIT.ms), 'Mechanical energy of the comet is conserved.'),
  }),

  defineQuestion('PHY3_OB07', {
    sourceRef: 'P27',
    topic: 'orbits',
    difficulty: 3,
    params: { v1: { min: 1.5, max: 3, step: 0.1 }, r11: { min: 1.8, max: 3, step: 0.05 }, v2: { min: 4, max: 8, step: 0.1 } },
    source: { params: { v1: 2.2, r11: 2.35, v2: 6.1 }, answer: 6.07714e10 },
    prompt: (p) =>
      `A comet travels around the Sun in a highly eccentric elliptical orbit. It has a speed of ${sciText(p.v1, 4)} m/s when it is at a distance of ${sciText(p.r11, 11)} m from the center of the Sun. At what distance from the center of the Sun is its speed ${sciText(p.v2, 4)} m/s? Gravitational constant is G = ${G_TEXT}. The mass of the Sun is 1.989×10³⁰ kg.`,
    compute: (p) => numeric(grav.cometDistanceAt(G, 1.989e30, p.v1 * 1e4, p.r11 * 1e11, p.v2 * 1e4), 'm'),
    solution: (p, a) =>
      steps('\\dfrac1{r_2}=\\dfrac1{r_1}+\\dfrac{v_2^2-v_1^2}{2GM}', ans('r_2', a, UNIT.m), 'Mechanical energy of the comet is conserved.'),
  }),

  defineQuestion('PHY3_OB08', {
    sourceRef: 'P29',
    topic: 'orbits',
    difficulty: 2,
    params: { M30: { min: 1, max: 3, step: 0.5 }, r7: { min: 4, max: 8, step: 0.5 } },
    source: { params: { M30: 1, r7: 5 }, answer: 18261.98 },
    prompt: (p) =>
      `Two identical stars with mass ${sciText(p.M30, 30)} kg orbit around their center of mass. Each orbit is circular and has a radius of ${sciText(p.r7, 7)} km, so that the two stars are always on opposite sides of the circle. Find the orbital speed of each star. Gravitational constant is ${G_TEXT}.`,
    compute: (p) => numeric(grav.binarySpeed(G, p.M30 * 1e30, p.r7 * 1e10), 'm/s'),
    solution: (p, a) => steps('\\dfrac{Mv^2}{r}=\\dfrac{GM^2}{(2r)^2} \\Rightarrow v=\\sqrt{\\dfrac{GM}{4r}}', ans('v', a, UNIT.ms)),
    diagram: () => exerciseImage('p28-31'),
  }),

  defineQuestion('PHY3_OB09', {
    sourceRef: 'P30',
    topic: 'orbits',
    difficulty: 2,
    params: { M30: { min: 1, max: 3, step: 0.5 }, r7: { min: 5, max: 9, step: 1 } },
    source: { params: { M30: 2, r7: 8 }, answer: 24618802.81 },
    prompt: (p) =>
      `Two identical stars with mass ${sciText(p.M30, 30)} kg orbit around their center of mass. Each orbit is circular and has a radius of ${sciText(p.r7, 7)} km, so that the two stars are always on opposite sides of the circle. Find the period of the orbit. Gravitational constant is ${G_TEXT}.`,
    compute: (p) => numeric(grav.binaryPeriod(G, p.M30 * 1e30, p.r7 * 1e10), 's'),
    solution: (p, a) => steps('v=\\sqrt{\\dfrac{GM}{4r}},\\quad T=\\dfrac{2\\pi r}{v}', ans('T', a, UNIT.s)),
    diagram: () => exerciseImage('p28-31'),
  }),

  defineQuestion('PHY3_OB10', {
    sourceRef: 'P36',
    topic: 'orbits',
    difficulty: 3,
    params: { rev: { min: 14, max: 16.5, step: 0.01 } },
    source: { params: { rev: 15.45 }, answer: 438451.032 },
    prompt: (p) =>
      `The space station makes ${fmt(p.rev)} revolutions per day in its orbit around the earth. Assuming a circular orbit, how high is this satellite above the surface of the earth? The radius of Earth is ${EARTH_TEXT}. Mass of Earth is 5.972×10²⁴ kg. The gravitational constant is 6.6743×10⁻¹¹ N⋅m²/kg².`,
    compute: (p) => numeric(grav.orbitRadius(G2, 5.972e24, 86400 / p.rev) - R_EARTH, 'm', 0.02),
    solution: (p, a) =>
      steps('T=\\dfrac{86400\\text{ s}}{\\text{rev/day}},\\ \\ r=\\left(\\dfrac{GMT^2}{4\\pi^2}\\right)^{1/3},\\ \\ h=r-R_E', ans('h', a, UNIT.m)),
  }),

  // ---------- Gravitational energy & escape ----------
  defineQuestion('PHY3_EE01', {
    sourceRef: 'P6',
    topic: 'escapeEnergy',
    difficulty: 1,
    params: { vX: { min: 1000, max: 2500, step: 1 }, massRatio: { min: 1.1, max: 2, step: 0.01 }, radiusRatio: { min: 0.5, max: 0.9, step: 0.001 } },
    source: { params: { vX: 1481, massRatio: 1.41, radiusRatio: 0.718 }, answer: 2075.4 },
    prompt: (p) =>
      `Escape velocity of a bullet fired from the surface of planet X is ${fmt(p.vX)} m/s. Find the escape velocity from the surface of another planet Y, if the mass of planet Y is ${fmt(p.massRatio)} times that of X, and its radius is ${fmt(p.radiusRatio)} times the radius of planet X.`,
    compute: (p) => numeric(grav.escapeSpeedScaled(p.vX, p.massRatio, p.radiusRatio), 'm/s'),
    solution: (p, a) => steps('v_{esc}=\\sqrt{\\dfrac{2GM}{R}} \\Rightarrow v_Y = v_X\\sqrt{\\dfrac{M_Y/M_X}{R_Y/R_X}}', ans('v_Y', a, UNIT.ms)),
  }),

  defineQuestion('PHY3_EE02', {
    sourceRef: 'P13',
    topic: 'escapeEnergy',
    difficulty: 2,
    params: { m: { min: 5000, max: 10000, step: 500 }, h: { min: 200, max: 600, step: 10 } },
    source: { params: { m: 8000, h: 380 }, answer: 28172370630.036 },
    prompt: (p) =>
      `How much energy is required to lift the ${fmt(p.m)} kg space vehicle from Earth's surface to the height of the ${fmt(p.h)} km above the surface? Neglect the rotation of the Earth. The radius of Earth is ${EARTH_TEXT}. The mass of the Earth is 5.972×10²⁴ kg. Gravitational constant is 6.6743×10⁻¹¹ N⋅m²/kg².`,
    compute: (p) => numeric(grav.liftEnergy(G2, 5.972e24, p.m, R_EARTH, p.h * 1000), 'J'),
    solution: (p, a) => steps('\\Delta U = GMm\\left(\\dfrac1{R}-\\dfrac1{R+h}\\right)', ans('E', a, UNIT.J)),
  }),

  defineQuestion('PHY3_EE03', {
    sourceRef: 'P14',
    topic: 'escapeEnergy',
    difficulty: 2,
    params: { h: { min: 200, max: 600, step: 10 } },
    source: { params: { h: 400 }, answer: 2717.93 },
    prompt: (p) =>
      `With what speed must an object be launched from the Earth's surface so that it just reaches an altitude of ${fmt(p.h)} km? Neglect air resistance and the rotation of the Earth. The radius of the Earth is ${EARTH_TEXT} and its mass is 5.972×10²⁴ kg. Gravitational constant is G = ${G_TEXT}.`,
    compute: (p) => numeric(grav.launchSpeedToAltitude(G, 5.972e24, R_EARTH, p.h * 1000), 'm/s'),
    solution: (p, a) => steps('\\tfrac12v^2 = GM\\left(\\dfrac1R-\\dfrac1{R+h}\\right)', ans('v', a, UNIT.ms), 'The object stops momentarily at the top, so all its kinetic energy has become gravitational potential energy.'),
  }),

  defineQuestion('PHY3_EE04', {
    sourceRef: 'P15',
    topic: 'escapeEnergy',
    difficulty: 2,
    params: { m: { min: 1, max: 5, step: 1 }, vFar: { min: 8000, max: 16000, step: 100 } },
    source: { params: { m: 3, vFar: 13800 }, answer: 17760.73 },
    prompt: (p) =>
      `Calculate the initial speed of the object of mass ${fmt(p.m)} kg launched from the Earth's surface and reaching the speed of ${fmt(p.vFar)} m/s at a very far distance from the Earth. Neglect atmospheric friction and the rotation of the Earth. The Earth's radius and mass are 6371 km and 5.97×10²⁴ kg, respectively. Gravitational constant is ${G_TEXT}.`,
    compute: (p) => numeric(grav.launchSpeedFromFarSpeed(G, 5.97e24, R_EARTH, p.vFar), 'm/s'),
    solution: (p, a) => steps('\\tfrac12v_0^2-\\dfrac{GM}{R}=\\tfrac12v_\\infty^2 \\Rightarrow v_0=\\sqrt{v_\\infty^2+\\dfrac{2GM}{R}}', ans('v_0', a, UNIT.ms), 'The object\'s mass cancels out of the energy balance.'),
  }),

  defineQuestion('PHY3_EE05', {
    sourceRef: 'P16',
    topic: 'escapeEnergy',
    difficulty: 3,
    params: { v0: { min: 6000, max: 10000, step: 100 } },
    constraints: (p) => p.v0 * p.v0 < 0.95 * ((2 * G * 5.97e24) / R_EARTH),
    source: { params: { v0: 8500 }, answer: 8.72556e6 },
    prompt: (p) =>
      `An object is projected straight up from the surface of the Earth with an initial speed of ${fmt(p.v0)} m/s. Neglecting air resistance and the rotation of the Earth, find the maximum height above the surface that it reaches. The radius of the Earth is ${EARTH_TEXT} and its mass is 5.97×10²⁴ kg. Gravitational constant is G = ${G_TEXT}.`,
    compute: (p) => numeric(grav.maxHeightFromLaunch(G, 5.97e24, R_EARTH, p.v0), 'm'),
    solution: (p, a) =>
      steps('\\tfrac12v_0^2-\\dfrac{GM}{R}=-\\dfrac{GM}{R+h} \\Rightarrow h=\\dfrac{1}{\\frac1R-\\frac{v_0^2}{2GM}}-R', ans('h', a, UNIT.m)),
  }),

  defineQuestion('PHY3_EE06', {
    sourceRef: 'P18',
    topic: 'escapeEnergy',
    difficulty: 2,
    params: { v4: { min: 1.5, max: 2.4, step: 0.1 } },
    source: { params: { v4: 1.9 }, answer: 15366.47 },
    prompt: (p) =>
      `Initial speed of an object projected away from the surface of Earth is ${fmt(p.v4)}×10⁴ m/s. Find the object's speed when it is very far from the Earth. Neglect atmospheric friction and the rotation of the Earth. The Earth's radius and mass are 6371 km and 5.97×10²⁴ kg, respectively. Gravitational constant is ${G_TEXT}.`,
    compute: (p) => numeric(grav.farSpeed(G, 5.97e24, R_EARTH, p.v4 * 1e4), 'm/s'),
    solution: (p, a) => steps('v_\\infty=\\sqrt{v_0^2-\\dfrac{2GM}{R}}', ans('v_\\infty', a, UNIT.ms)),
  }),

  defineQuestion('PHY3_EE07', {
    sourceRef: 'P24',
    topic: 'escapeEnergy',
    difficulty: 2,
    params: { D: { min: 100, max: 400, step: 10 }, rho: { min: 2000, max: 3500, step: 100 } },
    source: { params: { D: 260, rho: 2700 }, answer: 159.68 },
    prompt: (p) =>
      `What is the escape speed from a ${fmt(p.D)}-km-diameter asteroid with a density of ${fmt(p.rho)} kg/m³? Gravitational constant is ${G_TEXT}.`,
    compute: (p) => numeric(grav.sphereEscapeSpeed(G, p.rho, (p.D * 1000) / 2), 'm/s'),
    solution: (p, a) => steps('v_{esc}=\\sqrt{\\dfrac{2GM}{R}},\\ M=\\tfrac43\\pi R^3\\rho', ans('v_{esc}', a, UNIT.ms)),
  }),

  defineQuestion('PHY3_EE08', {
    sourceRef: 'P31',
    topic: 'escapeEnergy',
    difficulty: 3,
    params: { M30: { min: 1, max: 3, step: 0.5 }, r7: { min: 4, max: 8, step: 1 } },
    source: { params: { M30: 2, r7: 5 }, answer: 1.334e39 },
    prompt: (p) =>
      `Two identical stars with mass ${sciText(p.M30, 30)} kg orbit around their center of mass. Each orbit is circular and has a radius of ${sciText(p.r7, 7)} km, so that the two stars are always on opposite sides of the circle. How much energy would be required to separate the two stars to infinity? Gravitational constant is ${G_TEXT}.`,
    compute: (p) => numeric(grav.binarySeparationEnergy(G, p.M30 * 1e30, p.r7 * 1e10), 'J'),
    solution: (p, a) =>
      steps('E=K+U = M v^2-\\dfrac{GM^2}{2r} = -\\dfrac{GM^2}{4r}\\ \\Rightarrow\\ E_{needed}=\\dfrac{GM^2}{4r}', ans('E', a, UNIT.J), 'The total energy of the bound pair is negative; the energy needed to separate them to rest at infinity equals its magnitude.'),
    diagram: () => exerciseImage('p28-31'),
  }),

  defineQuestion('PHY3_EE09', {
    sourceRef: 'P32',
    topic: 'escapeEnergy',
    difficulty: 3,
    params: { m1: { min: 15, max: 30, step: 1 }, m2: { min: 80, max: 120, step: 1 }, d0: { min: 30, max: 50, step: 1 }, d: { min: 15, max: 28, step: 0.5 } },
    constraints: (p) => p.d < p.d0 - 5,
    source: { params: { m1: 24, m2: 107, d0: 40, d: 25 }, answer: 1.32285e-5 },
    prompt: (p) =>
      `In deep space, two uniform spheres, one of mass ${fmt(p.m1)} kg and the other with mass ${fmt(p.m2)} kg, are released from rest with their centers ${fmt(p.d0)} m apart. They accelerate toward each other because of their mutual gravitational attraction. Find the speed of the sphere with mass ${fmt(p.m1)} kg, when their centers are ${fmt(p.d)} m apart. Gravitational constant is ${G_TEXT}.`,
    compute: (p) => numeric(grav.fallSpeedOfFirst(G, p.m1, p.m2, p.d0, p.d), 'm/s'),
    solution: (p, a) =>
      steps('m_1v_1=m_2v_2,\\quad \\tfrac12m_1v_1^2+\\tfrac12m_2v_2^2=Gm_1m_2\\left(\\dfrac1d-\\dfrac1{d_0}\\right) \\Rightarrow v_1=m_2\\sqrt{\\dfrac{2G(1/d-1/d_0)}{m_1+m_2}}', ans('v_1', a, UNIT.ms), 'Momentum is conserved (they start at rest) and so is mechanical energy.'),
  }),

  defineQuestion('PHY3_EE10', {
    sourceRef: 'P33',
    topic: 'escapeEnergy',
    difficulty: 3,
    params: { m1: { min: 20, max: 35, step: 1 }, m2: { min: 90, max: 130, step: 1 }, d0: { min: 35, max: 50, step: 1 }, d: { min: 20, max: 30, step: 0.5 } },
    constraints: (p) => p.d < p.d0 - 5,
    source: { params: { m1: 29, m2: 112, d0: 43, d: 26.5 }, answer: 1.65034e-5 },
    prompt: (p) =>
      `In deep space, two uniform spheres, one of mass ${fmt(p.m1)} kg and the other of mass ${fmt(p.m2)} kg, are released from rest with their centers ${fmt(p.d0)} m apart. They accelerate toward each other because of their mutual gravitational attraction. Find the speed at which they approach each other when their centers are ${fmt(p.d)} m apart. Gravitational constant is G = 6.67×10⁻¹¹ N m²/kg².`,
    compute: (p) => numeric(grav.fallRelativeSpeed(G, p.m1, p.m2, p.d0, p.d), 'm/s'),
    solution: (p, a) =>
      steps('v_{rel}=v_1+v_2=\\sqrt{2G(m_1+m_2)\\left(\\dfrac1d-\\dfrac1{d_0}\\right)}', ans('v_{rel}', a, UNIT.ms), 'Momentum and energy conservation together give the closing speed directly.'),
  }),

  defineQuestion('PHY3_EE11', {
    sourceRef: 'P34',
    topic: 'escapeEnergy',
    difficulty: 3,
    params: { m1: { min: 18, max: 35, step: 1 }, m2: { min: 90, max: 130, step: 1 }, d0: { min: 30, max: 45, step: 1 }, d: { min: 15, max: 25, step: 0.5 } },
    constraints: (p) => p.d < p.d0 - 5,
    source: { params: { m1: 25, m2: 110, d0: 38, d: 20 }, answer: 2.065e-5 },
    prompt: (p) =>
      `In deep space, two uniform spheres, one of mass ${fmt(p.m1)} kg and the other with mass ${fmt(p.m2)} kg, are released from rest with their centers ${fmt(p.d0)} m apart. They accelerate toward each other because of their mutual gravitational attraction. Find the magnitude of the relative velocity with which one sphere is approaching the other, when their centers are ${fmt(p.d)} m apart. Gravitational constant is ${G_TEXT}.`,
    compute: (p) => numeric(grav.fallRelativeSpeed(G, p.m1, p.m2, p.d0, p.d), 'm/s'),
    solution: (p, a) =>
      steps('v_{rel}=\\sqrt{2G(m_1+m_2)\\left(\\dfrac1d-\\dfrac1{d_0}\\right)}', ans('v_{rel}', a, UNIT.ms)),
  }),

  defineQuestion('PHY3_EE12', {
    sourceRef: 'P35',
    topic: 'escapeEnergy',
    difficulty: 3,
    params: { m1: { min: 15, max: 25, step: 1 }, m2: { min: 90, max: 120, step: 1 }, r: { min: 0.1, max: 0.2, step: 0.01 }, d0: { min: 35, max: 50, step: 1 } },
    source: { params: { m1: 20, m2: 105, r: 0.15, d0: 45 }, answer: 37.698 },
    prompt: (p) =>
      `In deep space, two uniform spheres, one of mass ${fmt(p.m1)} kg and the other with mass ${fmt(p.m2)} kg, of equal radii r = ${fmt(p.r)} m, are released from rest with their centers ${fmt(p.d0)} m apart. They accelerate toward each other because of their mutual gravitational attraction. How far from the initial position of the center of the ${fmt(p.m1)} kg sphere do the surfaces of the two spheres collide?`,
    compute: (p) => numeric(grav.contactPointFromFirst(p.m1, p.m2, p.d0, p.r), 'm'),
    solution: (p, a) =>
      steps('x_1=\\dfrac{m_2(d_0-2r)}{m_1+m_2},\\quad \\text{contact point}=x_1+r', ans('x', a, UNIT.m), 'No external force, so the center of mass stays fixed. The spheres touch when their centers are 2r apart; the contact point is one radius beyond the first center.'),
  }),
]
