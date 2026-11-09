import { defineQuestion } from '../defineQuestion'
import { fmt, sciText } from '../../format'
import * as heat from '../../physics/thermal'
import { ans, exerciseImage, numeric, steps, UNIT } from './helpers'

const { toKelvin } = heat

const ICE_FUSION_TEXT = 'Latent heat of fusion for water is 334 kJ/kg.'

export const heatQuestions = [
  // ---------- Thermal expansion ----------
  defineQuestion('PHY4_TE01', {
    sourceRef: 'P4',
    topic: 'thermalExpansion',
    difficulty: 1,
    params: { L: { min: 100, max: 200, step: 1 }, Tc: { min: -30, max: -20, step: 1 }, Th: { min: 30, max: 40, step: 1 }, a6: { min: 10, max: 12, step: 0.1 } },
    source: { params: { L: 143, Tc: -26, Th: 35, a6: 10.5 }, answer: 0.0915915 },
    prompt: (p) =>
      `Assume that a bridge is built from steel as a single, continuous structure, ${fmt(p.L)} m long. Taking the coefficient of thermal expansion of steel equal to ${sciText(p.a6, -6)} 1/K, calculate by how much the length of the bridge changes between the coldest winter day (${fmt(p.Tc)}°C) and the hottest summer day (+${fmt(p.Th)}°C)?`,
    compute: (p) => numeric(p.a6 * 1e-6 * p.L * (p.Th - p.Tc), 'm'),
    solution: (p, a) => steps('\\Delta L=\\alpha L\\,\\Delta T', ans('\\Delta L', a, UNIT.m)),
  }),

  defineQuestion('PHY4_TE02', {
    sourceRef: 'P5',
    topic: 'thermalExpansion',
    difficulty: 1,
    params: { L: { min: 120, max: 200, step: 1 }, dLcm: { min: 8, max: 14, step: 0.1 }, a6: { min: 11, max: 12.5, step: 0.1 } },
    source: { params: { L: 156, dLcm: 11.1, a6: 11.7 }, answer: 60.8153 },
    prompt: (p) =>
      `A bridge is built from steel as a single, continuous structure ${fmt(p.L)} m long. Its length is observed to increase by ${fmt(p.dLcm)} cm. Taking the coefficient of thermal expansion of steel equal to ${sciText(p.a6, -6)} 1/K, calculate the temperature change that produced this.`,
    compute: (p) => numeric(p.dLcm / 100 / (p.a6 * 1e-6 * p.L), 'K'),
    solution: (p, a) => steps('\\Delta T=\\dfrac{\\Delta L}{\\alpha L}', ans('\\Delta T', a, UNIT.K)),
  }),

  defineQuestion('PHY4_TE03', {
    sourceRef: 'P6',
    topic: 'thermalExpansion',
    difficulty: 3,
    params: { L: { min: 10, max: 25, step: 0.1 }, dT: { min: 20, max: 40, step: 0.5 }, a4: { min: 2, max: 4, step: 0.1 } },
    source: { params: { L: 18.3, dT: 30.5, a4: 3.4 }, answer: 1.32114 },
    prompt: (p) =>
      `Figure shows how a bar with a crack at its center buckles upward as a result of a temperature rise of ${fmt(p.dT)}°C. If the fixed distance L = ${fmt(p.L)} m and the coefficient of linear expansion is ${sciText(p.a4, -4)} 1/K, find the distance x to which the center rises.`,
    compute: (p) => numeric(heat.buckleHeight(p.L, p.a4 * 1e-4, p.dT), 'm'),
    solution: (p, a) =>
      steps('\\left(\\dfrac{L}{2}(1+\\alpha\\Delta T)\\right)^2=\\left(\\dfrac{L}{2}\\right)^2+x^2 \\Rightarrow x=\\dfrac{L}{2}\\sqrt{(1+\\alpha\\Delta T)^2-1}', ans('x', a, UNIT.m), 'Each half of the bar grows to length (L/2)(1+αΔT) but its ends stay a horizontal distance L/2 from the center line, so the halves form two sides of a right triangle with the rise x.'),
    diagram: () => exerciseImage('p6'),
  }),

  defineQuestion('PHY4_TE04', {
    sourceRef: 'P7',
    topic: 'thermalExpansion',
    difficulty: 3,
    params: { L: { min: 800, max: 1200, step: 1 }, T1: { min: 10, max: 20, step: 1 }, T2: { min: 30, max: 40, step: 1 }, a6: { min: 11, max: 12.5, step: 0.1 } },
    source: { params: { L: 1028, T1: 16, T2: 34, a6: 11.9 }, answer: 10.638682550015 },
    prompt: (p) =>
      `A railroad rail made of steel is ${fmt(p.L)} m long and it is fastened securely at both ends when the temperature is ${fmt(p.T1)}°C. As the temperature increases, the rail begins to buckle upwards, taking the shape of an isosceles triangle. How high is this buckle when the temperature is ${fmt(p.T2)}°C? Assume that the coefficient of linear expansion for steel is ${sciText(p.a6, -6)} 1/K.`,
    compute: (p) => numeric(heat.buckleHeight(p.L, p.a6 * 1e-6, p.T2 - p.T1), 'm'),
    solution: (p, a) =>
      steps('h=\\dfrac{L}{2}\\sqrt{(1+\\alpha\\Delta T)^2-1}', ans('h', a, UNIT.m), 'The ends are fixed, so the rail (now longer by αLΔT) takes the shape of an isosceles triangle with base L and two slanted sides of length (L/2)(1+αΔT).'),
  }),

  defineQuestion('PHY4_TE05', {
    sourceRef: 'P8',
    topic: 'thermalExpansion',
    difficulty: 1,
    params: { L: { min: 600, max: 1000, step: 10 }, T1: { min: 15, max: 20, step: 1 }, T2: { min: 30, max: 35, step: 1 }, a6: { min: 11, max: 12, step: 0.1 } },
    source: { params: { L: 870, T1: 17, T2: 33, a6: 11.4 }, answer: 0.158688 },
    prompt: (p) =>
      `A railroad rail made of steel is ${fmt(p.L)} m long and is fastened securely at both ends when the temperature is ${fmt(p.T1)}°C. By how much would the rail expand if it were free to do so when the temperature rises to ${fmt(p.T2)}°C? Assume that the coefficient of linear expansion for steel is ${sciText(p.a6, -6)} 1/K.`,
    compute: (p) => numeric(p.a6 * 1e-6 * p.L * (p.T2 - p.T1), 'm'),
    solution: (p, a) => steps('\\Delta L=\\alpha L\\,\\Delta T', ans('\\Delta L', a, UNIT.m)),
  }),

  defineQuestion('PHY4_TE06', {
    sourceRef: 'P20',
    topic: 'thermalExpansion',
    difficulty: 2,
    params: { d: { min: 1, max: 2, step: 0.1 }, T1: { min: 15, max: 25, step: 1 }, T2: { min: 150, max: 200, step: 1 }, a5: { min: 1.1, max: 1.3, step: 0.01 } },
    source: { params: { d: 1.5, T1: 21, T2: 176, a5: 1.2 }, answer: 0.000177371965 },
    prompt: (p) =>
      `A machinist bores a hole of diameter ${fmt(p.d)} cm in a steel plate at a temperature of ${fmt(p.T1)}°C. What is the cross-sectional area of the hole when the temperature of the plate is increased to ${fmt(p.T2)}°C? Linear coefficient of expansion for steel is ${fmt(p.a5)}·10⁻⁵ 1/°C.`,
    compute: (p) => numeric(Math.PI * (p.d / 200) ** 2 * (1 + p.a5 * 1e-5 * (p.T2 - p.T1)) ** 2, 'm^2'),
    solution: (p, a) =>
      steps('A=\\pi\\left(\\dfrac{d}{2}\\right)^2\\left(1+\\alpha\\Delta T\\right)^2', ans('A', a, UNIT.m2), 'A hole expands exactly as a disk of the same material would, so its diameter grows by the factor (1 + αΔT).'),
  }),

  defineQuestion('PHY4_TE07', {
    sourceRef: 'P21',
    topic: 'thermalExpansion',
    difficulty: 1,
    params: { d: { min: 1, max: 2, step: 0.1 }, T1: { min: 15, max: 20, step: 1 }, T2: { min: 150, max: 180, step: 1 }, a5: { min: 1.1, max: 1.3, step: 0.01 } },
    source: { params: { d: 1.4, T1: 16, T2: 170, a5: 1.19 }, answer: 0.0140257 },
    prompt: (p) =>
      `A machinist bores a hole of diameter ${fmt(p.d)} cm in a steel plate at a temperature of ${fmt(p.T1)}°C. What is the diameter of the hole when the temperature of the plate is increased to ${fmt(p.T2)}°C? Linear coefficient of expansion for steel is ${fmt(p.a5)}×10⁻⁵ 1/°C.`,
    compute: (p) => numeric((p.d / 100) * (1 + p.a5 * 1e-5 * (p.T2 - p.T1)), 'm'),
    solution: (p, a) => steps('d\'=d(1+\\alpha\\Delta T)', ans('d\'', a, UNIT.m)),
  }),

  defineQuestion('PHY4_TE08', {
    sourceRef: 'P22',
    topic: 'thermalExpansion',
    difficulty: 2,
    params: { a: { min: 30, max: 50, step: 1 }, T1: { min: 40, max: 45, step: 0.5 }, T2: { min: 50, max: 60, step: 0.5 }, a6: { min: 17, max: 21, step: 1 } },
    source: { params: { a: 44, T1: 44.5, T2: 56.5, a6: 19 }, answer: 0.0005296896 },
    prompt: (p) =>
      `A cube made of brass, with an edge length of ${fmt(p.a)} cm, is heated from ${fmt(p.T1)}°C to ${fmt(p.T2)}°C. Calculate the increase of the cube's surface area. Assume that the coefficient of linear expansion for brass is ${fmt(p.a6)} × 10⁻⁶ 1/K.`,
    compute: (p) => numeric(2 * p.a6 * 1e-6 * (p.T2 - p.T1) * 6 * (p.a / 100) ** 2, 'm^2'),
    solution: (p, a) =>
      steps('\\Delta A=2\\alpha\\,\\Delta T\\,A,\\quad A=6a^2', ans('\\Delta A', a, UNIT.m2), 'The area expansion coefficient is twice the linear one.'),
  }),

  defineQuestion('PHY4_TE09', {
    sourceRef: 'P23',
    topic: 'thermalExpansion',
    difficulty: 2,
    params: { a: { min: 30, max: 50, step: 1 }, T1: { min: 40, max: 45, step: 0.5 }, T2: { min: 50, max: 60, step: 0.5 }, a6: { min: 17, max: 21, step: 1 } },
    source: { params: { a: 36, T1: 44.5, T2: 55.5, a6: 19 }, answer: 2.92533e-5 },
    prompt: (p) =>
      `A cube made of brass, with an edge length of ${fmt(p.a)} cm, is heated from ${fmt(p.T1)}° to ${fmt(p.T2)}°. Calculate the increase of the cube's volume. Assume that the coefficient of linear expansion for brass is ${fmt(p.a6)}×10⁻⁶ 1/K.`,
    compute: (p) => numeric(3 * p.a6 * 1e-6 * (p.T2 - p.T1) * (p.a / 100) ** 3, 'm^3'),
    solution: (p, a) =>
      steps('\\Delta V=3\\alpha\\,\\Delta T\\,V,\\quad V=a^3', ans('\\Delta V', a, UNIT.m3), 'The volume expansion coefficient is three times the linear one.'),
  }),

  defineQuestion('PHY4_TE10', {
    sourceRef: 'P29',
    topic: 'thermalExpansion',
    difficulty: 3,
    params: { L: { min: 30, max: 50, step: 1 }, dA: { min: 0.05, max: 0.08, step: 0.005 }, dB: { min: 0.02, max: 0.035, step: 0.005 }, d3: { min: 0.03, max: 0.06, step: 0.005 } },
    constraints: (p) => p.dB < p.d3 && p.d3 < p.dA,
    source: { params: { L: 38, dA: 0.065, dB: 0.025, d3: 0.05 }, answer: 0.2375 },
    prompt: (p) =>
      `A metal rod A that is ${fmt(p.L)} cm long expands by ${fmt(p.dA)} cm when its temperature is raised from 0°C to 100°C. A rod B of a different metal and of the same length expands by ${fmt(p.dB)} cm for the same rise in temperature. A third rod, also ${fmt(p.L)} cm long, is made up of pieces of each of the above metals placed end to end and expands ${fmt(p.d3)} cm between 0°C and 100°C. Find LA the length of the portion of metal A in the third rod.`,
    compute: (p) => numeric(((p.d3 - p.dB) / (p.dA - p.dB)) * (p.L / 100), 'm'),
    solution: (p, a) =>
      steps('\\dfrac{L_A}{L}\\Delta_A+\\dfrac{L-L_A}{L}\\Delta_B=\\Delta_3 \\Rightarrow L_A=L\\,\\dfrac{\\Delta_3-\\Delta_B}{\\Delta_A-\\Delta_B}', ans('L_A', a, UNIT.m), 'Each metal expands in proportion to its length: rod A by Δ_A per full length L, rod B by Δ_B per full length L.'),
    diagram: () => exerciseImage('p29'),
  }),

  defineQuestion('PHY4_TE11', {
    sourceRef: 'P30',
    topic: 'thermalExpansion',
    difficulty: 3,
    params: { m: { min: 80, max: 120, step: 1 }, f: { min: 400, max: 500, step: 1 }, dT: { min: 20, max: 40, step: 1 }, a5: { min: 1.5, max: 1.9, step: 0.1 } },
    source: { params: { m: 100, f: 429, dT: 29, a5: 1.7 }, answer: 0.1057485 },
    prompt: (p) =>
      `A ${fmt(p.m)} kg weight is hanging from the ceiling by a thin copper wire. In its fundamental mode, this wire vibrates at the frequency ${fmt(p.f)} Hz. You then increase the temperature of the wire by ${fmt(p.dT)}° C. Find the magnitude of the change of fundamental frequency. Coefficient of linear expansion of copper is ${fmt(p.a5)}×10⁻⁵ 1/°C.`,
    compute: (p) => numeric(0.5 * p.f * p.a5 * 1e-5 * p.dT, 'Hz'),
    solution: (p, a) =>
      steps('f=\\dfrac{1}{2L}\\sqrt{\\dfrac{T}{m/L}}\\propto L^{-1/2} \\Rightarrow |\\Delta f|\\approx\\tfrac12 f\\,\\alpha\\Delta T', ans('|\\Delta f|', a, UNIT.Hz), 'The hanging weight fixes the tension and the wire\'s mass is unchanged, so only the length changes: f ∝ L^(−1/2).'),
  }),

  // ---------- Heat & specific heat ----------
  defineQuestion('PHY4_HE01', {
    sourceRef: 'P1',
    topic: 'heatEnergy',
    difficulty: 1,
    params: { P: { min: 80, max: 120, step: 1 } },
    source: { params: { P: 97 }, answer: 2002.1022455805 },
    prompt: (p) =>
      `Assuming that the human body is 100 percent efficient in converting consumed food energy into work and heat at the rate of ${fmt(p.P)} W, calculate how many kilocalories of food energy a human needs per 24 hours. 1 kcal = 4.186 kJ.`,
    compute: (p) => numeric((p.P * 86400) / 4186, 'kcal'),
    solution: (p, a) => steps('E=Pt=P\\cdot 86400\\text{ s},\\quad \\text{kcal}=\\dfrac{E}{4186\\text{ J}}', ans('E', a, UNIT.kcal)),
  }),

  defineQuestion('PHY4_HE02', {
    sourceRef: 'P2',
    topic: 'heatEnergy',
    difficulty: 1,
    params: { kcal: { min: 1500, max: 2500, step: 10 } },
    source: { params: { kcal: 1840 }, answer: 89.1463 },
    prompt: (p) =>
      `Assuming that the human body is 100 percent efficient in converting consumed food energy into work and heat, a person consumes ${fmt(p.kcal)} kilocalories of food energy per 24 hours. At what average rate, in watts, does the body release this energy? 1 kcal = 4.186 kJ.`,
    compute: (p) => numeric((p.kcal * 4186) / 86400, 'W'),
    solution: (p, a) => steps('P=\\dfrac{E}{t}=\\dfrac{E}{86400\\text{ s}}', ans('P', a, UNIT.W)),
  }),

  defineQuestion('PHY4_HE03', {
    sourceRef: 'P17',
    topic: 'heatEnergy',
    difficulty: 2,
    params: { W: { min: 20, max: 35, step: 0.1 }, Q4: { min: 1.2, max: 1.8, step: 0.1 }, dT: { min: 12, max: 22, step: 1 } },
    source: { params: { W: 26.4, Q4: 1.5, dT: 17 }, answer: 327.54010695187 },
    prompt: (p) =>
      `You are given a sample of metal and asked to determine its specific heat. You weigh the sample and find that its weight is ${fmt(p.W)} N. You carefully add ${sciText(p.Q4, 4)} J of heat energy to the sample and find that its temperature rises by ${fmt(p.dT)}°C. What is the sample's specific heat? The gravitational acceleration is g = 9.8 m/s². Answer in J/ (kg K).`,
    compute: (p) => numeric((p.Q4 * 1e4) / ((p.W / 9.8) * p.dT), 'J/(kg K)'),
    solution: (p, a) => steps('m=\\dfrac{W}{g},\\quad c=\\dfrac{Q}{m\\,\\Delta T}', ans('c', a, UNIT.JkgK)),
  }),

  defineQuestion('PHY4_HE04', {
    sourceRef: 'P18',
    topic: 'heatEnergy',
    difficulty: 2,
    params: { W: { min: 22, max: 32, step: 0.1 }, c: { min: 450, max: 600, step: 5 }, Q4: { min: 1.2, max: 1.6, step: 0.05 } },
    source: { params: { W: 26.7, c: 535, Q4: 1.45 }, answer: 9.94785 },
    prompt: (p) =>
      `You are given a sample of metal whose weight is ${fmt(p.W)} N and whose specific heat is ${fmt(p.c)} J/(kg K). You carefully add ${sciText(p.Q4, 4)} J of heat energy to the sample. By how much does its temperature rise? The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => numeric((p.Q4 * 1e4) / ((p.W / 9.8) * p.c), 'K'),
    solution: (p, a) => steps('m=\\dfrac{W}{g},\\quad \\Delta T=\\dfrac{Q}{mc}', ans('\\Delta T', a, UNIT.K)),
  }),

  defineQuestion('PHY4_HE05', {
    sourceRef: 'P24',
    topic: 'heatEnergy',
    difficulty: 1,
    params: { mk: { min: 1, max: 2, step: 0.1 }, mw: { min: 1, max: 2, step: 0.1 }, T1: { min: 15, max: 25, step: 1 }, T2: { min: 70, max: 85, step: 1 } },
    source: { params: { mk: 1.5, mw: 1.6, T1: 21, T2: 77 }, answer: 451505.6 },
    prompt: (p) =>
      `An aluminum tea kettle with mass ${fmt(p.mk)} kg and containing ${fmt(p.mw)} kg of water is placed on a stove. If no heat is lost to the surroundings, how much heat must be added to raise the temperature from ${fmt(p.T1)}°C to ${fmt(p.T2)}°C? Specific heat of aluminum is 910 J/(kg K), Specific heat of water is 4186 J/ (kg K).`,
    compute: (p) => numeric((p.mk * 910 + p.mw * 4186) * (p.T2 - p.T1), 'J'),
    solution: (p, a) => steps('Q=(m_kc_{Al}+m_wc_w)\\Delta T', ans('Q', a, UNIT.J)),
  }),

  defineQuestion('PHY4_HE06', {
    sourceRef: 'P25',
    topic: 'heatEnergy',
    difficulty: 2,
    params: { mk: { min: 1.2, max: 2, step: 0.1 }, mw: { min: 1, max: 2, step: 0.05 }, T0: { min: 15, max: 22, step: 1 }, Qk: { min: 200, max: 300, step: 5 } },
    source: { params: { mk: 1.7, mw: 1.55, T0: 17, Qk: 230 }, answer: 45.6237 },
    prompt: (p) =>
      `An aluminum tea kettle with mass ${fmt(p.mk)} kg containing ${fmt(p.mw)} kg of water is placed on a stove at ${fmt(p.T0)}°C. If no heat is lost to the surroundings and ${fmt(p.Qk)} kJ of heat is added, what is the final temperature? Specific heat of aluminum is 910 J/(kg K). Specific heat of water is 4186 J/(kg K).`,
    compute: (p) => numeric(p.T0 + (p.Qk * 1000) / (p.mk * 910 + p.mw * 4186), '°C'),
    solution: (p, a) => steps('T_f=T_0+\\dfrac{Q}{m_kc_{Al}+m_wc_w}', ans('T_f', a, UNIT.C)),
  }),

  defineQuestion('PHY4_HE07', {
    sourceRef: 'P26',
    topic: 'heatEnergy',
    difficulty: 1,
    params: { P: { min: 150, max: 250, step: 5 }, m: { min: 1, max: 2, step: 0.1 }, T1: { min: 15, max: 25, step: 1 }, T2: { min: 70, max: 90, step: 1 } },
    source: { params: { P: 180, m: 1.7, T1: 20, T2: 80 }, answer: 2372.0666666667 },
    prompt: (p) =>
      `A student makes a cup of coffee by first placing a ${fmt(p.P)}-W electric immersion heater in ${fmt(p.m)} kg of water. How much time is required to raise the temperature from ${fmt(p.T1)}°C to ${fmt(p.T2)}°C? Assume that all of the heater's power goes into heating the water. Specific heat of water is 4186 J/ (kg K).`,
    compute: (p) => numeric((p.m * 4186 * (p.T2 - p.T1)) / p.P, 's'),
    solution: (p, a) => steps('Pt=mc\\Delta T \\Rightarrow t=\\dfrac{mc\\Delta T}{P}', ans('t', a, UNIT.s)),
  }),

  defineQuestion('PHY4_HE08', {
    sourceRef: 'P27',
    topic: 'heatEnergy',
    difficulty: 1,
    params: { m: { min: 1, max: 2, step: 0.1 }, T1: { min: 12, max: 20, step: 1 }, T2: { min: 70, max: 85, step: 1 }, t: { min: 1500, max: 2000, step: 10 } },
    source: { params: { m: 1.4, T1: 16, T2: 77, t: 1790 }, answer: 199.712 },
    prompt: (p) =>
      `A student makes a cup of coffee by placing an electric immersion heater in ${fmt(p.m)} kg of water. The temperature must be raised from ${fmt(p.T1)}° to ${fmt(p.T2)}° in ${fmt(p.t)} s. Assuming that all of the heater's power goes into heating the water, what power must the heater have? Specific heat of water is 4186 J/(kg K).`,
    compute: (p) => numeric((p.m * 4186 * (p.T2 - p.T1)) / p.t, 'W'),
    solution: (p, a) => steps('P=\\dfrac{mc\\Delta T}{t}', ans('P', a, UNIT.W)),
  }),

  defineQuestion('PHY4_HE09', {
    sourceRef: 'P34',
    topic: 'heatEnergy',
    difficulty: 1,
    params: { P: { min: 100, max: 130, step: 1 }, L: { min: 2.4, max: 2.45, step: 0.005 } },
    source: { params: { P: 117, L: 2.43 }, answer: 0.048148 },
    prompt: (p) =>
      `A person produces heat at the rate of about ${fmt(p.P)} W when at rest. At what rate must water evaporate from the body to get rid of all this energy? Ignore heat transfer by other methods. Latent heat of vaporization for water is ${fmt(p.L)} kJ/g. Answer in g/s.`,
    compute: (p) => numeric(p.P / (p.L * 1000), 'g/s'),
    solution: (p, a) => steps('\\dfrac{dm}{dt}=\\dfrac{P}{L_v}', ans('\\dfrac{dm}{dt}', a, UNIT.gs)),
  }),

  defineQuestion('PHY4_HE10', {
    sourceRef: 'P35',
    topic: 'heatEnergy',
    difficulty: 1,
    params: { P: { min: 100, max: 130, step: 1 }, m: { min: 30, max: 45, step: 1 }, L: { min: 2.4, max: 2.45, step: 0.01 } },
    source: { params: { P: 117, m: 36, L: 2.42 }, answer: 744.615 },
    prompt: (p) =>
      `A person produces heat at the rate of about ${fmt(p.P)} W when at rest, and gets rid of it entirely by evaporating water. How long does it take to evaporate ${fmt(p.m)} g of water this way? Latent heat of vaporization for water is ${fmt(p.L)} kJ/g.`,
    compute: (p) => numeric((p.m * p.L * 1000) / p.P, 's'),
    solution: (p, a) => steps('t=\\dfrac{mL_v}{P}', ans('t', a, UNIT.s)),
  }),

  // ---------- Calorimetry & phase changes ----------
  defineQuestion('PHY4_CA01', {
    sourceRef: 'P3',
    topic: 'calorimetry',
    difficulty: 3,
    params: { mb: { min: 0.1, max: 0.4, step: 0.05 }, ms: { min: 0.5, max: 1.2, step: 0.1 }, T0: { min: 15, max: 30, step: 1 }, Qk: { min: 250, max: 450, step: 5 } },
    constraints: (p) => {
      const TK = heat.frozenFinalTemperatureK(p.mb, 900, p.ms, p.T0, p.Qk * 1000, 4186, 2090, 334000)
      return TK < 273.15 - 3 && TK > 273.15 - 50
    },
    source: { params: { mb: 0.2, ms: 0.8, T0: 21, Qk: 360 }, answer: 262.90539956803 },
    prompt: (p) =>
      `A ${fmt(p.mb)} kg aluminum bowl holding ${fmt(p.ms)} kg of soup at ${fmt(p.T0)} ˚C is placed in a freezer. What is the final temperature, if ${fmt(p.Qk)} kJ of energy is transferred from the bowl and soup, assuming the soup's thermal properties are the same as that of water? Answer in Kelvin (K). Specific heat of ice is 2090 J/(kg K) Specific heat of water is 4186 J/ (kg K) Specific heat of aluminum is 900 J/ (kg K) Latent heat of fusion for water is 334 kJ/kg`,
    compute: (p) => numeric(heat.frozenFinalTemperatureK(p.mb, 900, p.ms, p.T0, p.Qk * 1000, 4186, 2090, 334000), 'K'),
    solution: (p, a) =>
      steps('Q=(m_bc_{Al}+m_sc_w)T_0+m_sL_f+(m_bc_{Al}+m_sc_{ice})\\,|T_f|', ans('T_f', a, UNIT.K), 'Cool the bowl and soup to 0 °C, freeze the soup, then use the energy that is left to cool the bowl and ice below 0 °C.'),
  }),

  defineQuestion('PHY4_CA02', {
    sourceRef: 'P9',
    topic: 'calorimetry',
    difficulty: 2,
    params: { mi: { min: 0.3, max: 0.5, step: 0.01 }, mw: { min: 0.1, max: 0.2, step: 0.001 }, Tw: { min: 80, max: 90, step: 1 } },
    constraints: (p) => (p.mw * 4186 * p.Tw) / 334000 < p.mi - 0.02,
    source: { params: { mi: 0.35, mw: 0.133, Tw: 86 }, answer: 0.2763517005988 },
    prompt: (p) =>
      `An insulated cup containing ${fmt(p.mi)} kg of ice at 0°C is filled with ${fmt(p.mw)} kg of water at ${fmt(p.Tw)}°C. Calculate the mass of liquid after the system reaches thermal equilibrium. Specific heat of water is 4186 J/ (kg K). ${ICE_FUSION_TEXT}`,
    compute: (p) => numeric(p.mw + (p.mw * 4186 * p.Tw) / 334000, 'kg'),
    solution: (p, a) =>
      steps('m_{melted}=\\dfrac{m_wc_wT_w}{L_f},\\quad m_{liquid}=m_w+m_{melted}', ans('m', a, UNIT.kg), 'Not all the ice melts, so the final temperature is 0 °C and the heat given up by the cooling water melts exactly m_melted of ice.'),
  }),

  defineQuestion('PHY4_CA03', {
    sourceRef: 'P10',
    topic: 'calorimetry',
    difficulty: 2,
    params: { mi: { min: 0.3, max: 0.5, step: 0.005 }, mw: { min: 0.1, max: 0.2, step: 0.005 }, Tw: { min: 80, max: 90, step: 1 } },
    constraints: (p) => (p.mw * 4186 * p.Tw) / 334000 < p.mi - 0.02,
    source: { params: { mi: 0.375, mw: 0.145, Tw: 83 }, answer: 0.224166 },
    prompt: (p) =>
      `An insulated cup containing ${fmt(p.mi)} kg of ice at 0° is filled with ${fmt(p.mw)} kg of water at ${fmt(p.Tw)}°. Calculate the mass of ice still unmelted after the system reaches thermal equilibrium. Specific heat of water is 4186 J/(kg K). ${ICE_FUSION_TEXT}`,
    compute: (p) => numeric(p.mi - (p.mw * 4186 * p.Tw) / 334000, 'kg'),
    solution: (p, a) => steps('m_{unmelted}=m_i-\\dfrac{m_wc_wT_w}{L_f}', ans('m', a, UNIT.kg)),
  }),

  defineQuestion('PHY4_CA04', {
    sourceRef: 'P11',
    topic: 'calorimetry',
    difficulty: 2,
    params: { mw: { min: 0.1, max: 0.2, step: 0.01 }, mi: { min: 2.5, max: 3, step: 0.01 }, Tw: { min: 80, max: 90, step: 1 } },
    source: { params: { mw: 0.13, mi: 2.81, Tw: 83 }, answer: 0.26523035928144 },
    prompt: (p) =>
      `A portion of ${fmt(p.mw)} kg of water at ${fmt(p.Tw)}°C is poured into an insulated cup containing ${fmt(p.mi)} kg of ice at 0°C. Calculate the mass of liquid when the system reaches thermal equilibrium. Heat of fusion of water is 334 kJ/kg. Specific heat of water is 4186 J/(kg K).`,
    compute: (p) => numeric(p.mw + (p.mw * 4186 * p.Tw) / 334000, 'kg'),
    solution: (p, a) => steps('m_{liquid}=m_w+\\dfrac{m_wc_wT_w}{L_f}', ans('m', a, UNIT.kg)),
  }),

  defineQuestion('PHY4_CA05', {
    sourceRef: 'P12',
    topic: 'calorimetry',
    difficulty: 3,
    params: { mw: { min: 0.2, max: 0.3, step: 0.01 }, Tw: { min: 18, max: 25, step: 1 }, Ti: { min: -20, max: -10, step: 1 } },
    source: { params: { mw: 0.25, Tw: 22, Ti: -16 }, answer: 0.062630576713819 },
    prompt: (p) =>
      `A physics student wants to cool ${fmt(p.mw)} kg of water, initially at ${fmt(p.Tw)}°C, by adding ice initially at ${fmt(p.Ti)}°C. How much ice should she add so that the final temperature will be 0°C with all the ice melted if the heat capacity of the container may be neglected? Latent heat of fusion for water is 334 kJ/kg. Specific heat of water is 4186 J/(kg K). Specific heat of ice is 2100 J/(kg K).`,
    compute: (p) => numeric((p.mw * 4186 * p.Tw) / (2100 * -p.Ti + 334000), 'kg'),
    solution: (p, a) =>
      steps('m_wc_wT_w=m_i\\left(c_{ice}|T_i|+L_f\\right) \\Rightarrow m_i=\\dfrac{m_wc_wT_w}{c_{ice}|T_i|+L_f}', ans('m_i', a, UNIT.kg), 'The ice must warm from its initial temperature to 0 °C and then melt completely, all using heat from the water as it cools to 0 °C.'),
  }),

  defineQuestion('PHY4_CA06', {
    sourceRef: 'P13',
    topic: 'calorimetry',
    difficulty: 2,
    params: { h: { min: 100, max: 150, step: 0.1 }, T0: { min: 15, max: 25, step: 0.1 } },
    source: { params: { h: 126.1, T0: 20.1 }, answer: 302.75453125 },
    prompt: (p) =>
      `Calculate the absolute temperature of the lead ball after it falls from the height of ${fmt(p.h)} m on the floor without bouncing off, so that all the energy of the fall goes into heating the lead. Initial temperature of the ball is ${fmt(p.T0)}°C and clead = 128 J/(kg·°C). The gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => numeric(toKelvin(p.T0) + (9.8 * p.h) / 128, 'K'),
    solution: (p, a) => steps('mgh=mc\\Delta T \\Rightarrow T=T_0+\\dfrac{gh}{c}', ans('T', a, UNIT.K)),
  }),

  defineQuestion('PHY4_CA07', {
    sourceRef: 'P14',
    topic: 'calorimetry',
    difficulty: 1,
    params: { dT: { min: 1, max: 3, step: 0.5 }, c: { min: 125, max: 130, step: 0.5 } },
    source: { params: { dT: 2, c: 127.5 }, answer: 26.0204 },
    prompt: (p) =>
      `A lead ball falls from rest and lands on the floor without bouncing, so that all of the energy of the fall goes into heating the ball. From what height must it fall for its temperature to rise by ${fmt(p.dT)} K? The specific heat of lead is ${fmt(p.c)} J/(kg K) and the gravitational acceleration is g = 9.8 m/s².`,
    compute: (p) => numeric((p.c * p.dT) / 9.8, 'm'),
    solution: (p, a) => steps('mgh=mc\\Delta T \\Rightarrow h=\\dfrac{c\\Delta T}{g}', ans('h', a, UNIT.m)),
  }),

  defineQuestion('PHY4_CA08', {
    sourceRef: 'P15',
    topic: 'calorimetry',
    difficulty: 2,
    params: { m: { min: 15, max: 25, step: 0.1 }, v: { min: 3.5, max: 5.5, step: 0.01 } },
    source: { params: { m: 19.9, v: 4.62 }, answer: 0.00063585862275449 },
    prompt: (p) =>
      `A block of ice at 0°C whose mass initially is m = ${fmt(p.m)} kg slides along a horizontal surface, starting at a speed v = ${fmt(p.v)} m/s and finally coming to rest after traveling a certain distance. Compute the mass of ice melted as a result of the friction between the block and the surface. (Assume that all the heat generated owing to friction goes into the block of ice.) Latent heat of fusion for water is 334 kJ/kg.`,
    compute: (p) => numeric((0.5 * p.m * p.v * p.v) / 334000, 'kg'),
    solution: (p, a) => steps('\\tfrac12mv^2=m_{melted}L_f \\Rightarrow m_{melted}=\\dfrac{mv^2}{2L_f}', ans('m_{melted}', a, UNIT.kg), 'All the block\'s kinetic energy is turned into heat by friction.'),
  }),

  defineQuestion('PHY4_CA09', {
    sourceRef: 'P16',
    topic: 'calorimetry',
    difficulty: 3,
    params: { mc: { min: 6, max: 9, step: 0.1 }, mw: { min: 14, max: 17, step: 0.1 }, mp: { min: 1.5, max: 2, step: 0.01 }, Tp: { min: 170, max: 200, step: 1 }, T0: { min: 12, max: 16, step: 0.1 }, Tf: { min: 16, max: 20, step: 0.1 } },
    constraints: (p) => p.mp * (p.Tp - p.Tf) - p.mc * (p.Tf - p.T0) > 50,
    source: { params: { mc: 7.9, mw: 15.3, mp: 1.68, Tp: 184, T0: 14.4, Tf: 17.8 }, answer: 862.89099526066 },
    prompt: (p) =>
      `A metal container of mass ${fmt(p.mc)} kg contains ${fmt(p.mw)} kg of water. A ${fmt(p.mp)}-kg piece of the same metal, initially at a temperature of ${fmt(p.Tp)}°C, is dropped into the water. The container and the water initially have a temperature of ${fmt(p.T0)}°C and the final temperature of the entire system is ${fmt(p.Tf)}°C. Calculate the specific heat of the metal in units J/(kg K). Specific heat of water is 4186 J/(kg·°C).`,
    compute: (p) => numeric((p.mw * 4186 * (p.Tf - p.T0)) / (p.mp * (p.Tp - p.Tf) - p.mc * (p.Tf - p.T0)), 'J/(kg K)'),
    solution: (p, a) =>
      steps('m_pc(T_p-T_f)=m_cc(T_f-T_0)+m_wc_w(T_f-T_0) \\Rightarrow c=\\dfrac{m_wc_w(T_f-T_0)}{m_p(T_p-T_f)-m_c(T_f-T_0)}', ans('c', a, UNIT.JkgK), 'The hot piece loses the heat that the container (same metal) and the water gain.'),
  }),

  defineQuestion('PHY4_CA10', {
    sourceRef: 'P19',
    topic: 'calorimetry',
    difficulty: 2,
    params: { mg: { min: 120, max: 200, step: 1 }, Ts: { min: 140, max: 160, step: 1 } },
    source: { params: { mg: 164, Ts: 147 }, answer: 509597.2 },
    prompt: (p) =>
      `How much energy must be removed when ${fmt(p.mg)} g of steam, at a temperature of ${fmt(p.Ts)}°C, is cooled and frozen into ${fmt(p.mg)} g of ice at 0°C? Provide an absolute value. Specific heat of steam is 2.1 kJ/(kg K). Specific heat of water is 4186 J/ (kg K). Latent heat of vaporization for water is 2256 kJ/kg. Latent heat of fusion for water is 334 kJ/kg.`,
    compute: (p) => numeric(heat.steamToIceHeat(p.mg / 1000, p.Ts, 2100, 4186, 2256000, 334000), 'J'),
    solution: (p, a) =>
      steps('Q=m\\left[c_{steam}(T_s-100)+L_v+c_w\\cdot100+L_f\\right]', ans('Q', a, UNIT.J), 'Four steps: cool the steam to 100 °C, condense it, cool the water to 0 °C, freeze it.'),
  }),

  defineQuestion('PHY4_CA11', {
    sourceRef: 'P28',
    topic: 'calorimetry',
    difficulty: 3,
    params: { mw: { min: 0.2, max: 0.3, step: 0.005 }, Tw: { min: 85, max: 95, step: 1 }, Ti: { min: -20, max: -10, step: 1 }, Tf: { min: 30, max: 40, step: 1 } },
    source: { params: { mw: 0.225, Tw: 91, Ti: -14, Tf: 33 }, answer: 0.10891956342291 },
    prompt: (p) =>
      `An insulated beaker with negligible mass contains ${fmt(p.mw)} kg of water at a temperature of ${fmt(p.Tw)}°C. How many kilograms of ice at a temperature of ${fmt(p.Ti)}°C must be dropped into the water to make the final temperature of the system ${fmt(p.Tf)}°C? Specific heat of water is 4186 J/ (kg K). Specific heat of ice is 2100 J/ (kg K). Latent heat of fusion for water is 334 kJ/kg.`,
    compute: (p) => numeric((p.mw * 4186 * (p.Tw - p.Tf)) / (2100 * -p.Ti + 334000 + 4186 * p.Tf), 'kg'),
    solution: (p, a) =>
      steps('m_wc_w(T_w-T_f)=m_i\\left[c_{ice}|T_i|+L_f+c_wT_f\\right]', ans('m_i', a, UNIT.kg), 'The ice warms to 0 °C, melts, and the meltwater then warms to the final temperature.'),
  }),

  defineQuestion('PHY4_CA12', {
    sourceRef: 'P39',
    topic: 'calorimetry',
    difficulty: 3,
    params: { mw: { min: 0.3, max: 0.5, step: 0.001 }, Tw: { min: 80, max: 90, step: 1 }, rcm: { min: 4.5, max: 6.5, step: 0.1 } },
    source: { params: { mw: 0.393, Tw: 88, rcm: 5.5 }, answer: 0.045609228711262 },
    prompt: (p) =>
      `An insulated cylindrical cup contains ${fmt(p.mw)} kg of water at ${fmt(p.Tw)}°C. Some ice at 0°C is placed into the cup. When the system reaches thermal equilibrium, the final temperature will be 0°C with all the ice melted. Calculate by how much the water level will be higher compared to that before adding the ice. The internal radius of the cup is ${fmt(p.rcm)} cm. Specific heat of water is 4186J/ (kg K). Latent heat of fusion for water is 334 kJ/kg. Density of water is 1 g/cm³.`,
    compute: (p) => {
      const iceMass = (p.mw * 4186 * p.Tw) / 334000
      return numeric(iceMass / 1000 / (Math.PI * (p.rcm / 100) ** 2), 'm')
    },
    solution: (p, a) =>
      steps('m_{ice}=\\dfrac{m_wc_wT_w}{L_f},\\quad \\Delta h=\\dfrac{m_{ice}/\\rho}{\\pi r^2}', ans('\\Delta h', a, UNIT.m), 'The ice melts completely and becomes extra water, so the added volume is m_ice/ρ.'),
  }),

  // ---------- Heat conduction ----------
  defineQuestion('PHY4_HC01', {
    sourceRef: 'P31',
    topic: 'heatConduction',
    difficulty: 3,
    params: { A: { min: 1.5, max: 2.2, step: 0.1 }, Lc: { min: 8, max: 14, step: 1 }, Lb: { min: 18, max: 24, step: 1 }, Ls: { min: 20, max: 26, step: 1 } },
    source: { params: { A: 1.8, Lc: 11, Lb: 21, Ls: 23 }, answer: 353.9114729 },
    prompt: (p) =>
      `Rods of copper, brass, and steel are welded together to form a Y-shaped figure. The cross-sectional area of each rod is ${fmt(p.A)} cm². The free end of the copper rod is maintained at 100°C, and the free ends of the brass and steel rods at 0°C. Assume there is no heat loss from the surfaces of the rods. The lengths of the rods are: copper, ${fmt(p.Lc)} cm; brass, ${fmt(p.Lb)} cm; steel, ${fmt(p.Ls)} cm. What is the temperature of the junction point? Answer in Kelvins (K). Thermal conductivity of the copper is 390 W/(m °C). Thermal conductivity of the steel is 50 W/(m °C). Thermal conductivity of the brass is 130 W/(m °C).`,
    compute: (p) => numeric(toKelvin(heat.yJunctionTemperature(390, p.Lc, 130, p.Lb, 50, p.Ls, 100, 0)), 'K'),
    solution: (p, a) =>
      steps('\\dfrac{k_cA(100-T)}{L_c}=\\dfrac{k_bAT}{L_b}+\\dfrac{k_sAT}{L_s} \\Rightarrow T=\\dfrac{100\\,k_c/L_c}{k_c/L_c+k_b/L_b+k_s/L_s}', ans('T', a, UNIT.K), 'In steady state the heat arriving through the copper rod equals the heat leaving through the brass and steel rods. The cross-sectional area is the same everywhere and cancels.'),
    diagram: () => exerciseImage('p31'),
  }),

  defineQuestion('PHY4_HC02', {
    sourceRef: 'P32',
    topic: 'heatConduction',
    difficulty: 2,
    params: { A: { min: 0.8, max: 1.2, step: 0.01 }, dcm: { min: 1.5, max: 3, step: 0.1 }, T: { min: 25, max: 35, step: 1 } },
    source: { params: { A: 0.94, dcm: 2, T: 27 }, answer: 3.2826826347305 },
    prompt: (p) =>
      `A polystyrene foam icebox has a total area of ${fmt(p.A)} m² and walls with an average thickness of ${fmt(p.dcm)} cm. The box contains ice, water, and canned beverages at 0°C. The inside of the box is kept cold by melting ice. How much ice melts in one day if the icebox is kept in the trunk of a car at ${fmt(p.T)}°C? Thermal conductivity of polystyrene foam is k = 0.010 W/ (m°C). Latent heat of fusion of water is 334 kJ/kg.`,
    compute: (p) => numeric((heat.conductionRate(0.01, p.A, p.T, p.dcm / 100) * 86400) / 334000, 'kg'),
    solution: (p, a) =>
      steps('\\dfrac{Q}{t}=\\dfrac{kA\\Delta T}{d},\\quad m=\\dfrac{(Q/t)(86400\\text{ s})}{L_f}', ans('m', a, UNIT.kg)),
  }),

  defineQuestion('PHY4_HC03', {
    sourceRef: 'P33',
    topic: 'heatConduction',
    difficulty: 1,
    params: { A: { min: 0.9, max: 1.2, step: 0.01 }, dcm: { min: 1.8, max: 2.6, step: 0.1 }, T: { min: 28, max: 36, step: 1 }, k: { min: 0.01, max: 0.013, step: 0.0005 } },
    source: { params: { A: 1.01, dcm: 2.2, T: 33, k: 0.0115 }, answer: 17.4225 },
    prompt: (p) =>
      `A polystyrene foam icebox has a total area of ${fmt(p.A)} m² and walls with an average thickness of ${fmt(p.dcm)} cm. The box contains ice and water at 0°, and the outside temperature is ${fmt(p.T)}°. What is the rate of heat flow into the box? The thermal conductivity of polystyrene foam is k = ${fmt(p.k)} W/(m °C).`,
    compute: (p) => numeric(heat.conductionRate(p.k, p.A, p.T, p.dcm / 100), 'W'),
    solution: (p, a) => steps('\\dfrac{Q}{t}=\\dfrac{kA\\Delta T}{d}', ans('\\dfrac{Q}{t}', a, UNIT.W)),
  }),

  defineQuestion('PHY4_HC04', {
    sourceRef: 'P36',
    topic: 'heatConduction',
    difficulty: 1,
    params: { w: { min: 1.5, max: 2.5, step: 0.1 }, h: { min: 1, max: 1.5, step: 0.1 }, dmm: { min: 3, max: 4, step: 0.1 }, T1: { min: 15, max: 18, step: 1 }, T2: { min: 10, max: 14, step: 1 } },
    source: { params: { w: 2, h: 1.3, dmm: 3.4, T1: 16, T2: 13 }, answer: 1927 },
    prompt: (p) =>
      `A major source of heat loss from a house in cold weather is through the windows. Calculate the rate of heat flow through a glass window ${fmt(p.w)} m × ${fmt(p.h)} m in area and d = ${fmt(p.dmm)} mm thick, if the temperatures at the inner and outer surfaces are T1 = ${fmt(p.T1)}°C and T2 = ${fmt(p.T2)}°C, respectively. Thermal conductivity of the glass k = 0.84 W / (m ⋅°C).`,
    compute: (p) => numeric(heat.conductionRate(0.84, p.w * p.h, p.T1 - p.T2, p.dmm / 1000), 'W'),
    solution: (p, a) => steps('\\dfrac{Q}{t}=\\dfrac{kA(T_1-T_2)}{d}', ans('\\dfrac{Q}{t}', a, UNIT.W)),
    diagram: () => exerciseImage('p36'),
  }),

  defineQuestion('PHY4_HC05', {
    sourceRef: 'P37',
    topic: 'heatConduction',
    difficulty: 2,
    params: { w: { min: 1.5, max: 2.2, step: 0.05 }, h: { min: 1, max: 1.3, step: 0.05 }, dmm: { min: 3.5, max: 4.5, step: 0.1 }, T1: { min: 18, max: 21, step: 0.5 }, T2: { min: 10, max: 13, step: 0.5 }, hours: { min: 5, max: 8, step: 0.5 } },
    source: { params: { w: 1.95, h: 1, dmm: 4.1, T1: 19.5, T2: 11.5, hours: 6.5 }, answer: 71227300 },
    prompt: (p) =>
      `A major source of heat loss from a house in cold weather is through the windows. A glass window is ${fmt(p.w)} m × ${fmt(p.h)} m in area and d = ${fmt(p.dmm)} mm thick. The inner and outer surface temperatures are ${fmt(p.T1)}° and ${fmt(p.T2)}° respectively. How much energy flows through this window in ${fmt(p.hours)} hours? Thermal conductivity of the glass k = 0.8 W/(m °C).`,
    compute: (p) => numeric(heat.conductionRate(0.8, p.w * p.h, p.T1 - p.T2, p.dmm / 1000) * p.hours * 3600, 'J'),
    solution: (p, a) => steps('Q=\\dfrac{kA\\Delta T}{d}\\,t', ans('Q', a, UNIT.J)),
  }),

  defineQuestion('PHY4_HC06', {
    sourceRef: 'P38',
    topic: 'heatConduction',
    difficulty: 2,
    params: { P: { min: 120, max: 200, step: 5 }, dT: { min: 45, max: 65, step: 1 }, A: { min: 1.8, max: 2.5, step: 0.01 }, dcm: { min: 2.5, max: 3.5, step: 0.1 } },
    source: { params: { P: 155, dT: 55, A: 2.15, dcm: 3.1 }, answer: 0.040634249471459 },
    prompt: (p) =>
      `A power input of ${fmt(p.P)} W is required to keep the interior surface of the box of an apparatus ${fmt(p.dT)}°C above the temperature of the outer surface. The total area of the box is ${fmt(p.A)} m², and the wall thickness is ${fmt(p.dcm)} cm. Find the thermal conductivity of the material of the box.`,
    compute: (p) => numeric((p.P * (p.dcm / 100)) / (p.A * p.dT), 'W/(m K)'),
    solution: (p, a) => steps('P=\\dfrac{kA\\Delta T}{d} \\Rightarrow k=\\dfrac{Pd}{A\\Delta T}', ans('k', a, UNIT.WmK)),
  }),
]
