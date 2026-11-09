import { defineQuestion } from '../defineQuestion'
import { fmt, sciText } from '../../format'
import * as gas from '../../physics/gases'
import { ans, exerciseImage, numeric, steps, UNIT } from './helpers'

const { R_GAS: R, ATM } = gas
const FRACTION_WORDS: Record<number, string> = { 3: 'one-third', 4: 'one-fourth', 5: 'one-fifth', 6: 'one-sixth' }

/** Steam volume (L) produced by boiling Vw litres of water, rounded to whole litres as printed. */
const steamVolume = (Vw: number, ratio: number) => Math.round(Vw * ratio)

export const firstLawQuestions = [
  // ---------- Constant-pressure processes ----------
  defineQuestion('PHY4_CP01', {
    sourceRef: 'P77',
    topic: 'constantPressure',
    difficulty: 3,
    params: { Q: { min: 25, max: 35, step: 0.1 }, V1: { min: 40, max: 46, step: 0.1 }, V2: { min: 65, max: 75, step: 0.1 } },
    source: { params: { Q: 29.2, V1: 42.6, V2: 69.3 }, answer: 81.382473601189 },
    prompt: (p) =>
      `Let ${fmt(p.Q)} J of heat be added to a particular real gas. As a result, its volume changes from ${fmt(p.V1)} to ${fmt(p.V2)} cm³ while the pressure remains constant at 1.0 atm. Find the molar specific heat at constant volume. The standard atmosphere pressure is 101325 Pa. Universal gas constant is 8.31 J/(mol K).`,
    compute: (p) => {
      const W = ATM * (p.V2 - p.V1) * 1e-6
      return numeric((p.Q * R) / W - R, 'J/(mol K)')
    },
    solution: (p, a) =>
      steps('W=P\\Delta V=nR\\Delta T,\\quad C_P=\\dfrac{Q}{n\\Delta T}=\\dfrac{QR}{W},\\quad C_V=C_P-R', ans('C_V', a, UNIT.JmolK), 'At constant pressure the work equals nRΔT, which gives nΔT without knowing n or T separately.'),
  }),

  defineQuestion('PHY4_CP02', {
    sourceRef: 'P78',
    topic: 'constantPressure',
    difficulty: 1,
    params: { Q: { min: 30, max: 45, step: 0.1 }, V1: { min: 40, max: 50, step: 0.1 }, V2: { min: 100, max: 120, step: 0.1 } },
    source: { params: { Q: 38, V1: 45.5, V2: 110.9 }, answer: 6.62666 },
    prompt: (p) =>
      `Let ${fmt(p.Q)} J of heat be added to a particular real gas. As a result, its volume changes from ${fmt(p.V1)} to ${fmt(p.V2)} cm³ while the pressure remains constant at 1 atm. How much work does the gas do? 1 atm = 101325 Pa.`,
    compute: (p) => numeric(ATM * (p.V2 - p.V1) * 1e-6, 'J'),
    solution: (p, a) => steps('W=P\\Delta V', ans('W', a, UNIT.J)),
  }),

  defineQuestion('PHY4_CP03', {
    sourceRef: 'P79',
    topic: 'constantPressure',
    difficulty: 3,
    params: { Q: { min: 28, max: 36, step: 0.1 }, V1: { min: 45, max: 52, step: 0.1 }, V2: { min: 70, max: 85, step: 0.1 } },
    source: { params: { Q: 31.9, V1: 48, V2: 77.9 }, answer: 87.499164498489 },
    prompt: (p) =>
      `Let ${fmt(p.Q)} J of heat be added to a particular real gas. As a result, its volume changes from ${fmt(p.V1)} to ${fmt(p.V2)} cm³ while the pressure remains constant at 1.0 atm. What is the molar specific heat at constant pressure? The standard atmosphere pressure is 101325 Pa. Universal gas constant is 8.31 J/(mol K).`,
    compute: (p) => numeric((p.Q * R) / (ATM * (p.V2 - p.V1) * 1e-6), 'J/(mol K)'),
    solution: (p, a) => steps('W=nR\\Delta T=P\\Delta V,\\quad C_P=\\dfrac{Q}{n\\Delta T}=\\dfrac{QR}{P\\Delta V}', ans('C_P', a, UNIT.JmolK)),
  }),

  defineQuestion('PHY4_CP04', {
    sourceRef: 'P80',
    topic: 'constantPressure',
    difficulty: 2,
    params: { Q: { min: 32, max: 42, step: 0.1 }, V1: { min: 50, max: 60, step: 0.1 }, V2: { min: 105, max: 120, step: 0.1 } },
    source: { params: { Q: 37.3, V1: 57.2, V2: 112 }, answer: 31.74739 },
    prompt: (p) =>
      `Let ${fmt(p.Q)} J of heat be added to a particular real gas. As a result, its volume changes from ${fmt(p.V1)} to ${fmt(p.V2)} cm³ while the pressure remains constant at 1.0 atm. By how much did the internal energy of the gas change? The standard atmosphere pressure is 101325 Pa.`,
    compute: (p) => numeric(p.Q - ATM * (p.V2 - p.V1) * 1e-6, 'J'),
    solution: (p, a) => steps('\\Delta U=Q-W=Q-P\\Delta V', ans('\\Delta U', a, UNIT.J)),
  }),

  defineQuestion('PHY4_CP05', {
    sourceRef: 'P81',
    topic: 'constantPressure',
    difficulty: 2,
    params: { V1: { min: 1, max: 2, step: 0.1 }, V2: { min: 2.5, max: 3.5, step: 0.1 }, Patm: { min: 1.5, max: 2, step: 0.01 }, T: { min: 270, max: 290, step: 1 } },
    source: { params: { V1: 1, V2: 2.7, Patm: 1.82, T: 278 }, answer: 79.82559800535 },
    prompt: (p) =>
      `An ideal monatomic gas expands reversibly from ${fmt(p.V1)} m³ to ${fmt(p.V2)} m³ at a constant pressure of ${fmt(p.Patm)} atm and initial temperature of ${fmt(p.T)} K. The standard atmosphere pressure is 1 atm = 101325 Pa. Gas constant is R = 8.31 J/(mol K). Find the number of moles of gas.`,
    compute: (p) => numeric((p.Patm * ATM * p.V1) / (R * p.T), 'mol'),
    solution: (p, a) => steps('n=\\dfrac{PV_1}{RT_1}', ans('n', a, UNIT.mol)),
  }),

  defineQuestion('PHY4_CP06', {
    sourceRef: 'P82',
    topic: 'constantPressure',
    difficulty: 1,
    params: { V1: { min: 1.5, max: 2, step: 0.1 }, V2: { min: 2.2, max: 2.8, step: 0.1 }, T: { min: 280, max: 295, step: 1 } },
    source: { params: { V1: 1.8, V2: 2.5, T: 285 }, answer: 395.833 },
    prompt: (p) =>
      `An ideal monatomic gas expands reversibly from ${fmt(p.V1)} m³ to ${fmt(p.V2)} m³ at a constant pressure, starting from a temperature of ${fmt(p.T)} K. Find the final temperature of the gas.`,
    compute: (p) => numeric((p.T * p.V2) / p.V1, 'K'),
    solution: (p, a) => steps('\\dfrac{V}{T}=\\text{const} \\Rightarrow T_2=T_1\\dfrac{V_2}{V_1}', ans('T_2', a, UNIT.K)),
  }),

  defineQuestion('PHY4_CP07', {
    sourceRef: 'P83',
    topic: 'constantPressure',
    difficulty: 1,
    params: { V1: { min: 1.5, max: 2.2, step: 0.1 }, V2: { min: 2.4, max: 3, step: 0.1 }, T: { min: 270, max: 290, step: 1 } },
    source: { params: { V1: 1.9, V2: 2.7, T: 276 }, answer: 392.21052631579 },
    prompt: (p) =>
      `An ideal monatomic gas expands reversibly from ${fmt(p.V1)} m³ to ${fmt(p.V2)} m³ at a constant pressure. Initial temperature is ${fmt(p.T)} K. Find the final temperature of the gas.`,
    compute: (p) => numeric((p.T * p.V2) / p.V1, 'K'),
    solution: (p, a) => steps('T_2=T_1\\dfrac{V_2}{V_1}', ans('T_2', a, UNIT.K)),
  }),

  defineQuestion('PHY4_CP08', {
    sourceRef: 'P84',
    topic: 'constantPressure',
    difficulty: 1,
    params: { V1: { min: 2, max: 2.5, step: 0.1 }, V2: { min: 2.6, max: 3, step: 0.1 }, Patm: { min: 1.5, max: 2.2, step: 0.01 } },
    source: { params: { V1: 2.1, V2: 2.8, Patm: 1.89 }, answer: 134052.975 },
    prompt: (p) =>
      `An ideal monatomic gas expands reversibly from ${fmt(p.V1)} m³ to ${fmt(p.V2)} m³ at a constant pressure of ${fmt(p.Patm)} atm. The standard atmosphere pressure is 1 atm = 101325 Pa. Calculate the work done by the gas.`,
    compute: (p) => numeric(p.Patm * ATM * (p.V2 - p.V1), 'J'),
    solution: (p, a) => steps('W=P\\Delta V', ans('W', a, UNIT.J)),
  }),

  defineQuestion('PHY4_CP09', {
    sourceRef: 'P85',
    topic: 'constantPressure',
    difficulty: 1,
    params: { V1: { min: 2, max: 2.5, step: 0.1 }, V2: { min: 3, max: 3.6, step: 0.1 }, Wk: { min: 100, max: 140, step: 1 } },
    source: { params: { V1: 2.3, V2: 3.4, Wk: 120 }, answer: 109091 },
    prompt: (p) =>
      `An ideal monatomic gas expands reversibly from ${fmt(p.V1)} m³ to ${fmt(p.V2)} m³ at constant pressure, doing ${fmt(p.Wk)} kJ of work. What is the pressure of the gas? 1 atm = 101325 Pa.`,
    compute: (p) => numeric((p.Wk * 1000) / (p.V2 - p.V1), 'Pa'),
    solution: (p, a) => steps('W=P\\Delta V \\Rightarrow P=\\dfrac{W}{\\Delta V}', ans('P', a, UNIT.Pa)),
  }),

  defineQuestion('PHY4_CP10', {
    sourceRef: 'P95',
    topic: 'constantPressure',
    difficulty: 1,
    params: { P5: { min: 1, max: 1.1, step: 0.01 }, V1: { min: 3, max: 4, step: 0.1 }, V2: { min: 6, max: 7.5, step: 0.1 } },
    source: { params: { P5: 1.02, V1: 3.7, V2: 6.7 }, answer: 306 },
    prompt: (p) =>
      `A cylinder with a frictionless, movable piston contains helium gas at a pressure of ${sciText(p.P5, 5)} Pa occupying ${fmt(p.V1)} L. The gas is heated at constant pressure until it occupies ${fmt(p.V2)} L. How much work does the gas do? 1 L = 0.001 m³.`,
    compute: (p) => numeric(p.P5 * 1e5 * (p.V2 - p.V1) * 1e-3, 'J'),
    solution: (p, a) => steps('W=P\\Delta V', ans('W', a, UNIT.J)),
  }),

  // ---------- Isothermal processes ----------
  defineQuestion('PHY4_IW01', {
    sourceRef: 'P86',
    topic: 'isothermalWork',
    difficulty: 2,
    params: { W: { min: 350, max: 450, step: 5 }, n: { min: 0.7, max: 1, step: 0.1 }, f: { min: 3, max: 6, step: 1 } },
    source: { params: { W: 400, n: 0.8, f: 5 }, answer: 37.384773439206 },
    prompt: (p) =>
      `It takes ${fmt(p.W)} J of work to compress quasi-statically ${fmt(p.n)} moles of an ideal gas to ${FRACTION_WORDS[p.f]} its volume. Calculate the temperature of the gas, assuming it remains constant during the compression. The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(p.W / (p.n * R * Math.log(p.f)), 'K'),
    solution: (p, a) => steps('|W|=nRT\\ln\\dfrac{V_i}{V_f} \\Rightarrow T=\\dfrac{|W|}{nR\\ln(V_i/V_f)}', ans('T', a, UNIT.K)),
  }),

  defineQuestion('PHY4_IW02', {
    sourceRef: 'P87',
    topic: 'isothermalWork',
    difficulty: 2,
    params: { W: { min: 400, max: 500, step: 5 }, n: { min: 0.8, max: 1, step: 0.01 }, T: { min: 30, max: 40, step: 0.5 } },
    source: { params: { W: 455, n: 0.95, T: 33.5 }, answer: 5.58704 },
    prompt: (p) =>
      `It takes ${fmt(p.W)} J of work to compress quasi-statically ${fmt(p.n)} moles of an ideal gas at a constant temperature of ${fmt(p.T)} K. By what factor was the volume reduced? The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(Math.exp(p.W / (p.n * R * p.T)), ''),
    solution: (p, a) => steps('|W|=nRT\\ln\\dfrac{V_i}{V_f} \\Rightarrow \\dfrac{V_i}{V_f}=e^{|W|/nRT}', ans('\\dfrac{V_i}{V_f}', a)),
  }),

  defineQuestion('PHY4_IW03', {
    sourceRef: 'P88',
    topic: 'isothermalWork',
    difficulty: 2,
    params: { n: { min: 0.15, max: 0.3, step: 0.01 }, P5: { min: 2.5, max: 3.5, step: 0.1 }, V1: { min: 1.2, max: 1.6, step: 0.1 }, V2: { min: 3, max: 4, step: 0.1 } },
    source: { params: { n: 0.2, P5: 3, V1: 1.4, V2: 3.5 }, answer: 384.83 },
    prompt: (p) =>
      `${fmt(p.n)} moles of an ideal gas, at an initial pressure of ${sciText(p.P5, 5)} N/m² and an initial volume of ${fmt(p.V1)} l, undergo an isothermal expansion to a volume of ${fmt(p.V2)} l. Find the work done by the gas. The universal gas constant is R = 8.31 J/(mol K). 1 L = 0.001 m³.`,
    compute: (p) => numeric(p.P5 * 1e5 * (p.V1 / 1000) * Math.log(p.V2 / p.V1), 'J'),
    solution: (p, a) => steps('W=nRT\\ln\\dfrac{V_2}{V_1}=P_1V_1\\ln\\dfrac{V_2}{V_1}', ans('W', a, UNIT.J), 'Since nRT = P₁V₁, the temperature never has to be calculated.'),
  }),

  defineQuestion('PHY4_IW04', {
    sourceRef: 'P89',
    topic: 'isothermalWork',
    difficulty: 1,
    params: { n: { min: 0.2, max: 0.35, step: 0.01 }, P5: { min: 3, max: 4, step: 0.1 }, V1: { min: 1.2, max: 1.8, step: 0.1 }, V2: { min: 3, max: 3.5, step: 0.1 } },
    source: { params: { n: 0.28, P5: 3.7, V1: 1.5, V2: 3.2 }, answer: 173438 },
    prompt: (p) =>
      `${fmt(p.n)} moles of an ideal gas, at an initial pressure of ${sciText(p.P5, 5)} N/m² and an initial volume of ${fmt(p.V1)} L, undergo an isothermal expansion to a volume of ${fmt(p.V2)} L. Find the final pressure of the gas. 1 L = 0.001 m³.`,
    compute: (p) => numeric((p.P5 * 1e5 * p.V1) / p.V2, 'Pa'),
    solution: (p, a) => steps('P_1V_1=P_2V_2 \\Rightarrow P_2=P_1\\dfrac{V_1}{V_2}', ans('P_2', a, UNIT.Pa)),
  }),

  defineQuestion('PHY4_IW05', {
    sourceRef: 'P94',
    topic: 'isothermalWork',
    difficulty: 1,
    params: { P5: { min: 0.9, max: 1, step: 0.01 }, T: { min: 290, max: 310, step: 1 }, V1: { min: 1.3, max: 1.6, step: 0.01 }, P4: { min: 2.2, max: 2.6, step: 0.01 } },
    source: { params: { P5: 0.94, T: 299, V1: 1.46, P4: 2.36 }, answer: 0.0058152542372881 },
    prompt: (p) =>
      `A cylinder with a frictionless, movable piston contains a quantity of helium gas. Initially the gas is at a pressure of ${fmt(p.P5)}×10⁵ Pa, has a temperature of ${fmt(p.T)} K, and occupies a volume of ${fmt(p.V1)} L. The gas then is heated and the piston is allowed to move to keep the temperature equal to ${fmt(p.T)} K. This continues until the pressure reaches ${sciText(p.P4, 4)} Pa. Assume that the gas may be treated as ideal. Find the volume of the gas at the end of the process. 1 L = 0.001 m³`,
    compute: (p) => numeric((p.P5 * 1e5 * (p.V1 / 1000)) / (p.P4 * 1e4), 'm^3'),
    solution: (p, a) => steps('P_1V_1=P_2V_2 \\Rightarrow V_2=\\dfrac{P_1V_1}{P_2}', ans('V_2', a, UNIT.m3)),
  }),

  defineQuestion('PHY4_IW06', {
    sourceRef: 'P106',
    topic: 'isothermalWork',
    difficulty: 1,
    params: { W: { min: 250, max: 350, step: 1 } },
    source: { params: { W: 315 }, answer: 315 },
    prompt: (p) =>
      `A monatomic ideal gas expands slowly to twice its original volume, doing ${fmt(p.W)} J of work in the process. Find the heat added to the gas if the process is isothermal. The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(p.W, 'J'),
    solution: (p, a) => steps('\\Delta T=0 \\Rightarrow \\Delta U=0 \\Rightarrow Q=W', ans('Q', a, UNIT.J)),
  }),

  // ---------- PV diagrams & cycles ----------
  defineQuestion('PHY4_PV01', {
    sourceRef: 'P90',
    topic: 'pvDiagrams',
    difficulty: 2,
    params: { p1: { min: 1, max: 3, step: 1 }, p2: { min: 4, max: 7, step: 1 }, V1: { min: 1, max: 3, step: 1 }, V2: { min: 4, max: 7, step: 1 } },
    source: { params: { p1: 2, p2: 6, V1: 2, V2: 6 }, answer: 810.6 },
    prompt: (p) =>
      `PV diagram is shown below. Calculate the work done by the gas in the quasi-static processes represented by the ADBA path cycle. p1 = ${fmt(p.p1)} atm, p2 = ${fmt(p.p2)} atm, V1 = ${fmt(p.V1)} L, V2 = ${fmt(p.V2)} L 1 atm = 101325 Pa 1 L = 0.001 m³`,
    compute: (p) => numeric(0.5 * (p.p2 - p.p1) * (p.V2 - p.V1) * ATM * 1e-3, 'J'),
    solution: (p, a) =>
      steps('W=\\tfrac12(p_2-p_1)(V_2-V_1)', ans('W', a, UNIT.J), 'A→D (vertical, no work); D→B slopes down so the work equals the area under it, ½(p₁+p₂)(V₂−V₁); B→A returns at p₁ and takes back p₁(V₂−V₁). The cycle runs clockwise, so the net work is the positive area of the triangle ADB.'),
    diagram: () => exerciseImage('p90-92'),
  }),

  defineQuestion('PHY4_PV02', {
    sourceRef: 'P91',
    topic: 'pvDiagrams',
    difficulty: 2,
    params: { p1: { min: 1, max: 3, step: 1 }, p2: { min: 4, max: 7, step: 1 }, V1: { min: 1, max: 3, step: 1 }, V2: { min: 4, max: 7, step: 1 } },
    source: { params: { p1: 2, p2: 5, V1: 1, V2: 5 }, answer: -607.95 },
    prompt: (p) =>
      `PV diagram is shown below. Calculate the work done by the gas in the quasi-static process represented by the ABDA cycle path, that is the ADBA cycle traversed in the opposite direction. p1 = ${fmt(p.p1)} atm, p2 = ${fmt(p.p2)} atm, V1 = ${fmt(p.V1)} L, V2 = ${fmt(p.V2)} L. 1 atm = 101325 Pa. 1 L = 0.001 m³.`,
    compute: (p) => numeric(-0.5 * (p.p2 - p.p1) * (p.V2 - p.V1) * ATM * 1e-3, 'J'),
    solution: (p, a) =>
      steps('W=-\\tfrac12(p_2-p_1)(V_2-V_1)', ans('W', a, UNIT.J), 'Traversing the same loop in the opposite (counter-clockwise) direction reverses the sign of the net work.'),
    diagram: () => exerciseImage('p90-92'),
  }),

  defineQuestion('PHY4_PV03', {
    sourceRef: 'P92',
    topic: 'pvDiagrams',
    difficulty: 2,
    params: { p1: { min: 1, max: 3, step: 1 }, p2: { min: 4, max: 7, step: 1 }, V1: { min: 1, max: 3, step: 1 }, V2: { min: 4, max: 7, step: 1 } },
    source: { params: { p1: 1, p2: 5, V1: 1, V2: 5 }, answer: 1621.2 },
    prompt: (p) =>
      `PV diagram is shown below. Calculate the work done by the gas in the quasi-static processes represented by the ADCBA cycle path. p1 = ${fmt(p.p1)} atm, p2 = ${fmt(p.p2)} atm, V1 = ${fmt(p.V1)} L, V2 = ${fmt(p.V2)} L 1 atm = 101325 Pa 1 L = 0.001 m³`,
    compute: (p) => numeric((p.p2 - p.p1) * (p.V2 - p.V1) * ATM * 1e-3, 'J'),
    solution: (p, a) =>
      steps('W=(p_2-p_1)(V_2-V_1)', ans('W', a, UNIT.J), 'A→D→C→B→A goes once clockwise around the rectangle, so the work is the rectangle\'s area.'),
    diagram: () => exerciseImage('p90-92'),
  }),

  defineQuestion('PHY4_PV04', {
    sourceRef: 'P93',
    topic: 'pvDiagrams',
    difficulty: 3,
    params: { n: { min: 2, max: 4, step: 1 }, Cp: { min: 28.5, max: 29.5, step: 0.1 }, Ta: { min: 290, max: 310, step: 1 }, Tc: { min: 470, max: 510, step: 1 }, Tb: { min: 580, max: 620, step: 1 } },
    source: { params: { n: 3, Cp: 29.1, Ta: 298, Tc: 489, Tb: 598 }, answer: 2036.7 },
    prompt: (p) =>
      `${fmt(p.n)} moles of an ideal gas are taken around the cycle acba. For this gas, Cp = ${fmt(p.Cp)} J/(mol⋅K). Process ac is at constant pressure, process ba is at constant volume, and process cb is adiabatic. The temperatures of the gas in states a, c and b are Ta = ${fmt(p.Ta)} K, Tc = ${fmt(p.Tc)} K, and Tb = ${fmt(p.Tb)} K. Calculate the magnitude of the total work for the cycle. The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => {
      const Qac = p.n * p.Cp * (p.Tc - p.Ta)
      const Qba = p.n * (p.Cp - R) * (p.Ta - p.Tb)
      return numeric(Math.abs(Qac + Qba), 'J')
    },
    solution: (p, a) =>
      steps('W_{cycle}=Q_{net}=nC_P(T_c-T_a)+nC_V(T_a-T_b),\\quad C_V=C_P-R', ans('|W|', a, UNIT.J), 'Over a full cycle ΔU = 0, so the net work equals the net heat. The adiabatic step cb exchanges no heat.'),
    diagram: () => exerciseImage('p93'),
  }),

  defineQuestion('PHY4_PV05', {
    sourceRef: 'P96',
    topic: 'pvDiagrams',
    difficulty: 3,
    params: { P5: { min: 0.9, max: 1, step: 0.01 }, T: { min: 295, max: 310, step: 1 }, V1: { min: 1.2, max: 1.5, step: 0.01 }, P4: { min: 2, max: 2.5, step: 0.01 } },
    source: { params: { P5: 0.92, T: 303, V1: 1.23, P4: 2.06 }, answer: 67.845652173913 },
    prompt: (p) =>
      `A cylinder with a frictionless, movable piston contains a quantity of helium gas. Initially the gas is at a pressure of ${fmt(p.P5)}×10⁵ Pa, has a temperature of ${fmt(p.T)} K, and occupies a volume of ${fmt(p.V1)} L. The gas then undergoes two processes. In the first, the gas is heated and the piston is allowed to move to keep the temperature equal to ${fmt(p.T)} K. This continues until the pressure reaches ${sciText(p.P4, 4)} Pa. In the second process, the gas is compressed at constant pressure until it returns to its original volume ${fmt(p.V1)} L. Assume that the gas may be treated as ideal. Find the temperature at the end of the second process. 1 L = 0.001 m³`,
    compute: (p) => numeric((p.T * (p.P4 * 1e4)) / (p.P5 * 1e5), 'K'),
    solution: (p, a) =>
      steps('V_2=\\dfrac{P_1V_1}{P_2},\\quad \\dfrac{V_3}{T_3}=\\dfrac{V_2}{T}\\ \\text{with}\\ V_3=V_1 \\Rightarrow T_3=T\\dfrac{P_2}{P_1}', ans('T_3', a, UNIT.K)),
  }),

  defineQuestion('PHY4_PV06', {
    sourceRef: 'P97',
    topic: 'pvDiagrams',
    difficulty: 1,
    params: { Pa5: { min: 3.5, max: 4.5, step: 0.01 }, Pb5: { min: 1.8, max: 2.2, step: 0.01 }, Va: { min: 0.0018, max: 0.0022, step: 0.0001 }, Vb: { min: 0.0026, max: 0.003, step: 0.0001 }, Vc: { min: 0.0038, max: 0.0045, step: 0.0001 } },
    source: { params: { Pa5: 4.15, Pb5: 1.95, Va: 0.0019, Vb: 0.0028, Vc: 0.0041 }, answer: 192.41877256318 },
    prompt: (p) =>
      `One-half mole of a monatomic ideal gas is taken from state a to state c. If Pa = ${sciText(p.Pa5, 5)} Pa, Pb = ${sciText(p.Pb5, 5)} Pa, Va = ${fmt(p.Va)} m³, Vb = ${fmt(p.Vb)} m³, and Vc = ${fmt(p.Vc)} m³, calculate the final temperature of the gas. The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(gas.idealTemperature(p.Pb5 * 1e5, p.Vc, 0.5), 'K'),
    solution: (p, a) => steps('T_c=\\dfrac{P_cV_c}{nR},\\quad P_c=P_b', ans('T_c', a, UNIT.K), 'The segment b→c is horizontal, so the pressure at c equals the pressure at b.'),
    diagram: () => exerciseImage('p97-100'),
  }),

  defineQuestion('PHY4_PV07', {
    sourceRef: 'P98',
    topic: 'pvDiagrams',
    difficulty: 1,
    params: { Pa5: { min: 3.5, max: 4.5, step: 0.01 }, Pb5: { min: 1.8, max: 2.2, step: 0.01 }, Va: { min: 0.0019, max: 0.0023, step: 0.0001 }, Vb: { min: 0.0026, max: 0.0031, step: 0.0001 }, Vc: { min: 0.0038, max: 0.0045, step: 0.0001 } },
    source: { params: { Pa5: 3.95, Pb5: 1.95, Va: 0.0021, Vb: 0.0029, Vc: 0.004 }, answer: 136.101 },
    prompt: (p) =>
      `One-half mole of a monatomic ideal gas is taken from state a to state c along the path shown. If Pa = ${sciText(p.Pa5, 5)} Pa, Pb = ${sciText(p.Pb5, 5)} Pa, Va = ${fmt(p.Va)} m³, Vb = ${fmt(p.Vb)} m³ and Vc = ${fmt(p.Vc)} m³, calculate the temperature of the gas at state b. The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(gas.idealTemperature(p.Pb5 * 1e5, p.Vb, 0.5), 'K'),
    solution: (p, a) => steps('T_b=\\dfrac{P_bV_b}{nR}', ans('T_b', a, UNIT.K)),
    diagram: () => exerciseImage('p97-100'),
  }),

  defineQuestion('PHY4_PV08', {
    sourceRef: 'P99',
    topic: 'pvDiagrams',
    difficulty: 2,
    params: { Pa5: { min: 3.5, max: 4.5, step: 0.01 }, Pb5: { min: 1.8, max: 2.2, step: 0.01 }, Va: { min: 0.0019, max: 0.0023, step: 0.0001 }, Vb: { min: 0.0026, max: 0.0031, step: 0.0001 }, Vc: { min: 0.0038, max: 0.0045, step: 0.0001 } },
    source: { params: { Pa5: 4.05, Pb5: 2.15, Va: 0.0021, Vb: 0.003, Vc: 0.0041 }, answer: 515.5 },
    prompt: (p) =>
      `One-half mole of a monatomic ideal gas is taken from state a to state c. If Pa = ${sciText(p.Pa5, 5)} Pa, Pb = ${sciText(p.Pb5, 5)} Pa, Va = ${fmt(p.Va)} m³, Vb = ${fmt(p.Vb)} m³, and Vc = ${fmt(p.Vc)} m³, calculate the work done on (or by) the gas as it moves from state a to state c.`,
    compute: (p) => numeric(0.5 * (p.Pa5 + p.Pb5) * 1e5 * (p.Vb - p.Va) + p.Pb5 * 1e5 * (p.Vc - p.Vb), 'J'),
    solution: (p, a) =>
      steps('W=\\tfrac12(P_a+P_b)(V_b-V_a)+P_b(V_c-V_b)', ans('W', a, UNIT.J), 'Work is the area under the path: a trapezoid for the sloped segment a→b plus a rectangle for the horizontal segment b→c.'),
    diagram: () => exerciseImage('p97-100'),
  }),

  defineQuestion('PHY4_PV09', {
    sourceRef: 'P100',
    topic: 'pvDiagrams',
    difficulty: 3,
    params: { Pa5: { min: 3.5, max: 4.5, step: 0.01 }, Pb5: { min: 1.8, max: 2.2, step: 0.01 }, Va: { min: 0.0019, max: 0.0023, step: 0.0001 }, Vb: { min: 0.0026, max: 0.0031, step: 0.0001 }, Vc: { min: 0.0038, max: 0.0045, step: 0.0001 } },
    constraints: (p) => {
      const W = 0.5 * (p.Pa5 + p.Pb5) * 1e5 * (p.Vb - p.Va) + p.Pb5 * 1e5 * (p.Vc - p.Vb)
      const dU = 1.5 * (p.Pb5 * 1e5 * p.Vc - p.Pa5 * 1e5 * p.Va)
      return Math.abs(dU + W) > 30
    },
    source: { params: { Pa5: 3.95, Pb5: 1.95, Va: 0.0022, Vb: 0.0029, Vc: 0.0041 }, answer: 336.22 },
    prompt: (p) =>
      `One-half mole of a monatomic ideal gas is taken from state a to state c. If Pa = ${sciText(p.Pa5, 5)} Pa, Pb = ${sciText(p.Pb5, 5)} Pa, Va = ${fmt(p.Va)} m³, Vb = ${fmt(p.Vb)} m³, and Vc = ${fmt(p.Vc)} m³, how much heat leaves (or enters) the system during this process?`,
    compute: (p) => {
      const W = 0.5 * (p.Pa5 + p.Pb5) * 1e5 * (p.Vb - p.Va) + p.Pb5 * 1e5 * (p.Vc - p.Vb)
      const dU = 1.5 * (p.Pb5 * 1e5 * p.Vc - p.Pa5 * 1e5 * p.Va)
      return numeric(dU + W, 'J')
    },
    solution: (p, a) =>
      steps('Q=\\Delta U+W,\\quad \\Delta U=\\tfrac32(P_cV_c-P_aV_a)', ans('Q', a, UNIT.J), 'A positive result means heat enters the gas. For a monatomic ideal gas ΔU = (3/2)nRΔT = (3/2)Δ(PV).'),
    diagram: () => exerciseImage('p97-100'),
  }),

  defineQuestion('PHY4_PV10', {
    sourceRef: 'P108',
    topic: 'pvDiagrams',
    difficulty: 1,
    params: { V: { min: 0.15, max: 0.25, step: 0.01 }, P1: { min: 1.5, max: 2, step: 0.1 }, P2: { min: 4.5, max: 5.5, step: 0.1 }, V2: { min: 0.06, max: 0.12, step: 0.01 } },
    source: { params: { V: 0.19, P1: 1.7, P2: 5, V2: 0.09 }, answer: 50000 },
    prompt: (p) =>
      `A gas undergoes two processes. In the first, the volume remains constant at ${fmt(p.V)} m³ and the pressure increases from ${sciText(p.P1, 5)} Pa to ${sciText(p.P2, 5)} Pa. The second process is a compression to a volume of ${fmt(p.V2)} m³ at a constant pressure of ${sciText(p.P2, 5)} Pa. Find the magnitude of total work done on the gas during both processes.`,
    compute: (p) => numeric(p.P2 * 1e5 * (p.V - p.V2), 'J'),
    solution: (p, a) => steps('W_1=0,\\quad |W_2|=P\\,|\\Delta V|', ans('|W|', a, UNIT.J), 'No work is done at constant volume, so only the constant-pressure compression contributes.'),
  }),

  defineQuestion('PHY4_PV11', {
    sourceRef: 'P112',
    topic: 'pvDiagrams',
    difficulty: 2,
    params: { Patm: { min: 1.5, max: 2.5, step: 0.1 }, V1: { min: 10, max: 14, step: 1 }, V2: { min: 1, max: 3, step: 1 } },
    source: { params: { Patm: 1.9, V1: 12, V2: 2 }, answer: 1925.175 },
    prompt: (p) =>
      `An ideal gas is slowly compressed at a constant pressure of ${fmt(p.Patm)} atm from ${fmt(p.V1)} L to ${fmt(p.V2)} L (B to D in figure below). Heat is then added to the gas, holding the volume constant, and the pressure and temperature are allowed to rise (line DA) until the temperature reaches its original value (TA = TB). In the process BDA, calculate the absolute value of the amount of total heat involved in these processes. 1 atm = 101325 Pa, 1 L = 0.001 m³.`,
    compute: (p) => numeric(p.Patm * ATM * (p.V1 - p.V2) * 1e-3, 'J'),
    solution: (p, a) =>
      steps('T_A=T_B \\Rightarrow \\Delta U_{BDA}=0 \\Rightarrow Q=W=P\\,\\Delta V_{BD}', ans('|Q|', a, UNIT.J), 'The gas ends at its starting temperature, so its internal energy is unchanged and the net heat equals the net work; only the constant-pressure compression B→D does work.'),
    diagram: () => exerciseImage('p112'),
  }),

  // ---------- Adiabatic processes ----------
  defineQuestion('PHY4_AD01', {
    sourceRef: 'P101',
    topic: 'adiabatic',
    difficulty: 2,
    params: { VL: { min: 1.4, max: 1.8, step: 0.01 }, Patm: { min: 0.9, max: 1.1, step: 0.01 }, T0: { min: 0, max: 5, step: 1 } },
    source: { params: { VL: 1.65, Patm: 0.98, T0: 2 }, answer: 362.86467546255 },
    prompt: (p) =>
      `In a cylinder sealed with a piston, you rapidly compress ${fmt(p.VL)} L of N2 gas initially at ${fmt(p.Patm)} atm pressure and ${fmt(p.T0)}°C to half its original volume. Assume N2 behaves like an ideal gas. Assume the compression is adiabatic, γ = 1.4. Calculate the final temperature of the gas. 1 atm = 101325 Pa 1 L = 0.001 m³`,
    compute: (p) => numeric(gas.adiabaticTemperature(p.T0 + 273.15, 2, 1.4), 'K'),
    solution: (p, a) => steps('TV^{\\gamma-1}=\\text{const} \\Rightarrow T_2=T_1\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma-1}', ans('T_2', a, UNIT.K)),
  }),

  defineQuestion('PHY4_AD02', {
    sourceRef: 'P102',
    topic: 'adiabatic',
    difficulty: 3,
    params: { VL: { min: 1.4, max: 1.8, step: 0.01 }, Patm: { min: 0.95, max: 1.05, step: 0.01 } },
    source: { params: { VL: 1.57, Patm: 1.01 }, answer: 128.339 },
    prompt: (p) =>
      `In a cylinder sealed with a piston, you rapidly compress ${fmt(p.VL)} L of N₂ gas initially at ${fmt(p.Patm)} atm and 2° to half its original volume. Assume N₂ behaves like an ideal diatomic gas and that the compression is adiabatic with γ = 1.4. How much work is done on the gas? 1 atm = 101325 Pa. 1 L = 0.001 m³. The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(gas.adiabaticWorkOnGas(p.Patm * ATM, p.VL / 1000, 2, 1.4), 'J'),
    solution: (p, a) =>
      steps('W_{on}=\\Delta U=\\dfrac{P_2V_2-P_1V_1}{\\gamma-1}=\\dfrac{P_1V_1\\left(2^{\\gamma-1}-1\\right)}{\\gamma-1}', ans('W_{on}', a, UNIT.J), 'No heat flows, so the work done on the gas all becomes internal energy.'),
  }),

  defineQuestion('PHY4_AD03', {
    sourceRef: 'P103',
    topic: 'adiabatic',
    difficulty: 2,
    params: { VL: { min: 1, max: 1.5, step: 0.01 }, Patm: { min: 0.95, max: 1.05, step: 0.01 } },
    source: { params: { VL: 1.23, Patm: 1.01 }, answer: 270072.26089931 },
    prompt: (p) =>
      `In a cylinder sealed with a piston, you rapidly compress ${fmt(p.VL)} L of N2 gas initially at ${fmt(p.Patm)} atm pressure and 2°C to half its original volume. Assume N2 behaves like an ideal gas. Assume the compression is adiabatic, γ = 1.4. Calculate the final pressure of the gas. 1 atm = 101325 Pa 1 L = 0.001 m³`,
    compute: (p) => numeric(gas.adiabaticPressure(p.Patm * ATM, 2, 1.4), 'Pa'),
    solution: (p, a) => steps('PV^{\\gamma}=\\text{const} \\Rightarrow P_2=P_1\\left(\\dfrac{V_1}{V_2}\\right)^{\\gamma}', ans('P_2', a, UNIT.Pa)),
  }),

  defineQuestion('PHY4_AD04', {
    sourceRef: 'P104',
    topic: 'adiabatic',
    difficulty: 3,
    params: { VL: { min: 2, max: 3, step: 0.1 }, Patm: { min: 0.9, max: 1.1, step: 0.01 }, T0: { min: 0, max: 10, step: 1 } },
    source: { params: { VL: 2.4, Patm: 0.92, T0: 3 }, answer: 0.00090942993990624 },
    prompt: (p) =>
      `In a cylinder sealed with a piston, you rapidly compress ${fmt(p.VL)} L of N2 gas initially at ${fmt(p.Patm)} atm pressure and ${fmt(p.T0)}°C to half its original volume. Assume N2 behaves like an ideal gas. Assume the compression is adiabatic, γ = 1.4. If you now cool the gas back to ${fmt(p.T0)}°C without changing the pressure, what is its final volume? 1 atm = 101325 Pa 1 L = 0.001 m³`,
    compute: (p) => numeric(p.VL / 1000 / 2 / 2 ** 0.4, 'm^3'),
    solution: (p, a) =>
      steps('T_2=T_1\\,2^{\\gamma-1},\\quad \\dfrac{V_3}{T_1}=\\dfrac{V_2}{T_2} \\Rightarrow V_3=\\dfrac{V_1/2}{2^{\\gamma-1}}', ans('V_3', a, UNIT.m3), 'Cooling at constant pressure back to the starting temperature shrinks the volume in proportion to the absolute temperature.'),
  }),

  defineQuestion('PHY4_AD05', {
    sourceRef: 'P110',
    topic: 'adiabatic',
    difficulty: 2,
    params: { n: { min: 7, max: 9, step: 0.1 }, W: { min: 8000, max: 10000, step: 100 } },
    source: { params: { n: 8.3, W: 9200 }, answer: 88.923685113499 },
    prompt: (p) =>
      `${fmt(p.n)} moles of an ideal monatomic gas expand adiabatically, performing ${fmt(p.W)} J of work in the process. What is the magnitude of change in temperature of the gas during this expansion? The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(p.W / (1.5 * p.n * R), 'K'),
    solution: (p, a) => steps('Q=0 \\Rightarrow \\Delta U=-W,\\quad \\Delta U=\\tfrac32nR\\Delta T \\Rightarrow |\\Delta T|=\\dfrac{W}{\\tfrac32nR}', ans('|\\Delta T|', a, UNIT.K)),
  }),

  defineQuestion('PHY4_AD06', {
    sourceRef: 'P111',
    topic: 'adiabatic',
    difficulty: 1,
    params: { n: { min: 5, max: 7, step: 0.1 }, W: { min: 9500, max: 11500, step: 100 } },
    source: { params: { n: 5.8, W: 10500 }, answer: 1810.34 },
    prompt: (p) =>
      `${fmt(p.n)} moles of an ideal monatomic gas expand adiabatically, performing ${fmt(p.W)} J of work in the process. What is the magnitude of the change in internal energy per mole of the gas? The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(p.W / p.n, 'J/mol'),
    solution: (p, a) => steps('|\\Delta U|=W \\Rightarrow \\dfrac{|\\Delta U|}{n}=\\dfrac{W}{n}', ans('\\dfrac{|\\Delta U|}{n}', a, UNIT.Jmol)),
  }),

  // ---------- First law & internal energy ----------
  defineQuestion('PHY4_FL01', {
    sourceRef: 'P105',
    topic: 'firstLaw',
    difficulty: 2,
    params: { W: { min: 150, max: 250, step: 10 } },
    source: { params: { W: 200 }, answer: 500 },
    prompt: (p) =>
      `A monatomic ideal gas expands slowly to twice its original volume, doing ${fmt(p.W)} J of work in the process. Find the heat added to the gas if the process is isobaric. The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(2.5 * p.W, 'J'),
    solution: (p, a) =>
      steps('W=nR\\Delta T,\\ \\ Q=nC_P\\Delta T=\\tfrac52nR\\Delta T=\\tfrac52W', ans('Q', a, UNIT.J), 'For a monatomic gas C_P = (5/2)R, so Q is 5/2 times the work done at constant pressure.'),
  }),

  defineQuestion('PHY4_FL02', {
    sourceRef: 'P107',
    topic: 'firstLaw',
    difficulty: 2,
    params: { W: { min: 150, max: 250, step: 10 } },
    source: { params: { W: 200 }, answer: 300 },
    prompt: (p) =>
      `A monatomic ideal gas expands slowly to twice its original volume, doing ${fmt(p.W)} J of work in the process. Find the change in internal energy of the gas if the process is isobaric. The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(1.5 * p.W, 'J'),
    solution: (p, a) => steps('\\Delta U=\\tfrac32nR\\Delta T,\\ \\ W=nR\\Delta T \\Rightarrow \\Delta U=\\tfrac32W', ans('\\Delta U', a, UNIT.J)),
  }),

  defineQuestion('PHY4_FL03', {
    sourceRef: 'P109',
    topic: 'firstLaw',
    difficulty: 2,
    params: { V: { min: 0.2, max: 0.25, step: 0.01 }, P1: { min: 1.5, max: 1.8, step: 0.1 }, P2: { min: 4.5, max: 5, step: 0.1 } },
    source: { params: { V: 0.22, P1: 1.6, P2: 4.7 }, answer: 102300 },
    prompt: (p) =>
      `A monatomic ideal gas undergoes two processes. In the first, the volume remains constant at ${fmt(p.V)} m³ while the pressure increases from ${sciText(p.P1, 5)} Pa to ${sciText(p.P2, 5)} Pa. The second process is a compression at constant pressure. How much heat is added to the gas during the FIRST process alone?`,
    compute: (p) => numeric(1.5 * p.V * (p.P2 - p.P1) * 1e5, 'J'),
    solution: (p, a) =>
      steps('W=0 \\Rightarrow Q=\\Delta U=\\tfrac32nR\\Delta T=\\tfrac32V\\,\\Delta P', ans('Q', a, UNIT.J), 'At constant volume no work is done, and nRΔT = VΔP.'),
  }),

  defineQuestion('PHY4_FL04', {
    sourceRef: 'P113',
    topic: 'firstLaw',
    difficulty: 3,
    params: { Vw: { min: 1, max: 2, step: 0.1 }, ratio: { min: 1000, max: 1010, step: 0.125 } },
    source: { params: { Vw: 1.6, ratio: 1004.375 }, answer: 3446932.845 },
    prompt: (p) =>
      `Determine the change in internal energy of ${fmt(p.Vw)} L of water at 100°C when it is fully boiled from liquid to gas, which results in ${fmt(steamVolume(p.Vw, p.ratio))} L of steam at 100°C. Assume the process is done at atmospheric pressure P = 1 atm. Latent heat of vaporization of water is Lv = 2256 kJ/kg. Density of water ⍴=1000 kg/m³. 1 atm = 101325 Pa, 1 L = 0.001 m³.`,
    compute: (p) => {
      const Q = p.Vw * 2256000
      const W = ATM * (steamVolume(p.Vw, p.ratio) - p.Vw) * 1e-3
      return numeric(Q - W, 'J')
    },
    solution: (p, a) =>
      steps('Q=mL_v,\\quad W=P(V_{steam}-V_{water}),\\quad \\Delta U=Q-W', ans('\\Delta U', a, UNIT.J), 'The mass of the water is its volume times 1000 kg/m³ (1 L = 1 kg).'),
  }),

  defineQuestion('PHY4_FL05', {
    sourceRef: 'P114',
    topic: 'firstLaw',
    difficulty: 2,
    params: { Vw: { min: 1, max: 1.5, step: 0.1 }, ratio: { min: 1590, max: 1625, step: 1 } },
    source: { params: { Vw: 1.1, ratio: 1770 / 1.1 }, answer: 179234 },
    prompt: (p) =>
      `Determine the work done by ${fmt(p.Vw)} L of water at 100° when it is fully boiled from liquid to gas at constant atmospheric pressure, producing ${fmt(steamVolume(p.Vw, p.ratio))} L of steam at 100°. 1 atm = 101325 Pa. 1 L = 0.001 m³.`,
    compute: (p) => numeric(ATM * (steamVolume(p.Vw, p.ratio) - p.Vw) * 1e-3, 'J'),
    solution: (p, a) => steps('W=P\\,(V_{steam}-V_{water})', ans('W', a, UNIT.J)),
  }),
]
