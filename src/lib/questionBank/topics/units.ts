import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import {
  acresToHectares,
  cubicInchesToLiters,
  daysToFillSphere,
  litersToCubicInches,
  sphereDensityFromMassRadius,
  sphereRadiusFromMassDensity,
  totalBreathVolumeM3,
} from '../../physics/units'

export const unitsQuestions = [
  defineQuestion('PHY_U01', {
    sourceRef: 'P1',
    topic: 'units',
    difficulty: 1,
    params: { mass: { min: 4, max: 10, step: 0.5 }, density: { min: 10, max: 25, step: 0.1 } },
    prompt: (p) =>
      `The critical mass of some fissionable material is about ${fmt(p.mass)} kg. This element has a density of ${fmt(p.density)} g/cm³. What would be the radius of a sphere of this material that has a critical mass? Give the answer in meters.`,
    compute: (p) => {
      const radiusCm = sphereRadiusFromMassDensity(p.mass * 1000, p.density)
      return { value: radiusCm / 100, unit: 'm', tolerance: { mode: 'relative', value: 0.01 } }
    },
    solution: (p, answer) => [
      { label: 'Given', math: `m = ${fmt(p.mass)}\\text{ kg},\\ \\rho = ${fmt(p.density)}\\text{ g/cm}^3` },
      { label: 'Formula', math: 'V = \\frac{m}{\\rho},\\quad V = \\frac{4}{3}\\pi r^3 \\Rightarrow r = \\sqrt[3]{\\dfrac{3m}{4\\pi\\rho}}' },
      { label: 'Substitution', text: `Convert mass to grams (${fmt(p.mass * 1000)} g), solve for r in cm, then convert to meters.` },
      { label: 'Answer', math: `r = ${fmt(answer)}\\text{ m}` },
    ],
  }),

  defineQuestion('PHY_U02', {
    sourceRef: 'P2',
    topic: 'units',
    difficulty: 1,
    params: { mass: { min: 4, max: 10, step: 0.5 }, radiusCm: { min: 5, max: 9, step: 0.1 } },
    prompt: (p) =>
      `The critical mass of some fissionable material is about ${fmt(p.mass)} kg, and at critical mass it forms a sphere of radius ${fmt(p.radiusCm)} cm. What is the density of this element? Give the answer in g/cm³.`,
    compute: (p) => ({
      value: sphereDensityFromMassRadius(p.mass * 1000, p.radiusCm),
      unit: 'g/cm³',
      tolerance: { mode: 'relative', value: 0.01 },
    }),
    solution: (p, answer) => [
      { label: 'Given', math: `m = ${fmt(p.mass)}\\text{ kg} = ${fmt(p.mass * 1000)}\\text{ g},\\ r = ${fmt(p.radiusCm)}\\text{ cm}` },
      { label: 'Formula', math: '\\rho = \\dfrac{m}{V},\\quad V = \\frac{4}{3}\\pi r^3' },
      { label: 'Answer', math: `\\rho = ${fmt(answer)}\\text{ g/cm}^3` },
    ],
  }),

  defineQuestion('PHY_U03', {
    sourceRef: 'P3',
    topic: 'units',
    difficulty: 1,
    params: { liters: { min: 0.1, max: 1, step: 0.05 } },
    prompt: (p) =>
      `According to the label on a bottle of salad dressing, the volume of the contents is ${fmt(p.liters)} L. Using the conversions 1 L = 1000 cm³ and 1 in = 2.54 cm, express this volume in cubic inches.`,
    compute: (p) => ({ value: litersToCubicInches(p.liters), unit: 'in³', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', math: `V = ${fmt(p.liters)}\\text{ L}` },
      { label: 'Formula', math: 'V_{\\text{in}^3} = V_{\\text{L}} \\times \\dfrac{1000\\text{ cm}^3}{1\\text{ L}} \\times \\dfrac{1}{(2.54\\text{ cm/in})^3}' },
      { label: 'Answer', math: `V = ${fmt(answer)}\\text{ in}^3` },
    ],
  }),

  defineQuestion('PHY_U04', {
    sourceRef: 'P4',
    topic: 'units',
    difficulty: 1,
    params: { feet: { min: 1, max: 6, step: 1 } },
    prompt: (p) =>
      `How many nanoseconds (ns) does it take light to travel ${fmt(p.feet)} ft in a vacuum? The speed of light is v = 3×10⁸ m/s, 1 ft = 0.3048 m.`,
    compute: (p) => ({ value: ((p.feet * 0.3048) / 3e8) * 1e9, unit: 'ns', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', math: `d = ${fmt(p.feet)}\\text{ ft},\\ v = 3\\times 10^8\\text{ m/s}` },
      { label: 'Formula', math: 't = \\dfrac{d}{v}' },
      { label: 'Substitution', math: `d = ${fmt(p.feet * 0.3048)}\\text{ m}` },
      { label: 'Answer', math: `t = ${fmt(answer)}\\text{ ns}` },
    ],
  }),

  defineQuestion('PHY_U05', {
    sourceRef: 'P5',
    topic: 'units',
    difficulty: 1,
    params: { cubicInches: { min: 150, max: 400, step: 5 } },
    prompt: (p) =>
      `A powerful engine has a displacement of ${fmt(p.cubicInches)} cubic inches. Express this displacement in liters (L) by using conversions 1 L = 1000 cm³ and 1 in = 2.54 cm.`,
    compute: (p) => ({ value: cubicInchesToLiters(p.cubicInches), unit: 'L', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', math: `V = ${fmt(p.cubicInches)}\\text{ in}^3` },
      { label: 'Formula', math: 'V_L = V_{\\text{in}^3} \\times (2.54)^3 \\div 1000' },
      { label: 'Answer', math: `V = ${fmt(answer)}\\text{ L}` },
    ],
  }),

  defineQuestion('PHY_U06', {
    sourceRef: 'P6',
    topic: 'units',
    difficulty: 2,
    params: { acres: { min: 5, max: 20, step: 1 } },
    prompt: (p) =>
      `A square field measuring 100 m by 100 m has an area of 1 hectare. An acre has an area of 43600 ft². If a country lot has an area of ${fmt(p.acres)} acres, what is the area in hectares? Use 1 ft = 0.3048 m.`,
    compute: (p) => ({ value: acresToHectares(p.acres), unit: 'hectares', tolerance: { mode: 'relative', value: 0.01 } }),
    solution: (p, answer) => [
      { label: 'Given', math: `${fmt(p.acres)}\\text{ acres},\\ 1\\text{ acre} = 43600\\text{ ft}^2` },
      { label: 'Formula', math: '\\text{hectares} = \\text{acres} \\times 43600 \\times (0.3048)^2 \\div 10000' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ hectares}` },
    ],
  }),

  defineQuestion('PHY_U07', {
    sourceRef: 'P7',
    topic: 'units',
    difficulty: 2,
    params: {
      astronauts: { min: 2, max: 6, step: 1 },
      cm3PerBreath: { min: 400, max: 600, step: 10 },
      breathsPerMin: { min: 8, max: 14, step: 1 },
      days: { min: 30, max: 90, step: 1 },
    },
    prompt: (p) =>
      `${fmt(p.astronauts)} astronauts are in a spherical space station. If, as is typical, each of them breathes about ${fmt(p.cm3PerBreath)} cm³ of air with each breath, what volume of air (in cubic meters) do these astronauts breathe in ${fmt(p.days)} days? Assume ${fmt(p.breathsPerMin)} breaths per minute.`,
    compute: (p) => ({
      value: totalBreathVolumeM3(p.astronauts, p.cm3PerBreath, p.breathsPerMin, p.days),
      unit: 'm³',
      tolerance: { mode: 'relative', value: 0.01 },
    }),
    solution: (p, answer) => [
      { label: 'Given', text: `${fmt(p.astronauts)} astronauts, ${fmt(p.cm3PerBreath)} cm³/breath, ${fmt(p.breathsPerMin)} breaths/min, ${fmt(p.days)} days` },
      { label: 'Formula', math: 'V = n \\times \\text{breaths/min} \\times \\text{minutes} \\times V_{\\text{breath}}' },
      { label: 'Answer', math: `V = ${fmt(answer)}\\text{ m}^3` },
    ],
  }),

  defineQuestion('PHY_U08', {
    sourceRef: 'P8',
    topic: 'units',
    difficulty: 2,
    params: {
      astronauts: { min: 2, max: 6, step: 1 },
      radius: { min: 4, max: 8, step: 0.5 },
      cm3PerBreath: { min: 400, max: 600, step: 10 },
      breathsPerMin: { min: 6, max: 12, step: 1 },
    },
    prompt: (p) =>
      `${fmt(p.astronauts)} astronauts are in a spherical space station whose internal radius is ${fmt(p.radius)} m. Each of them breathes about ${fmt(p.cm3PerBreath)} cm³ of air with each breath, at ${fmt(p.breathsPerMin)} breaths per minute. After how many days will the astronauts have breathed a total volume of air equal to the internal volume of the station?`,
    compute: (p) => ({
      value: daysToFillSphere(p.radius, p.astronauts, p.cm3PerBreath, p.breathsPerMin),
      unit: 'days',
      tolerance: { mode: 'relative', value: 0.01 },
    }),
    solution: (p, answer) => [
      { label: 'Given', text: `r = ${fmt(p.radius)} m, ${fmt(p.astronauts)} astronauts, ${fmt(p.cm3PerBreath)} cm³/breath, ${fmt(p.breathsPerMin)} breaths/min` },
      { label: 'Formula', math: 'V_{\\text{station}} = \\frac{4}{3}\\pi r^3,\\quad \\text{days} = \\dfrac{V_{\\text{station}}}{\\text{rate}}' },
      { label: 'Answer', math: `${fmt(answer)}\\text{ days}` },
    ],
  }),
]
