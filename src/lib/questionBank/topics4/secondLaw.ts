import { defineQuestion } from '../defineQuestion'
import { fmt } from '../../format'
import * as gas from '../../physics/gases'
import * as thermo from '../../physics/thermodynamics'
import { toKelvin } from '../../physics/thermal'
import { ans, exerciseImage, numeric, steps, UNIT } from './helpers'

const { R_GAS: R } = gas
const FUSION = 334000
const T_BOILING = toKelvin(100)
const T_ICE = toKelvin(0)

/** Lead block (m, c) at hot °C dropped into a lake at lake °C. */
const leadHeat = (m: number, c: number, hotC: number, lakeC: number) => m * c * (hotC - lakeC)

export const secondLawQuestions = [
  // ---------- Carnot engines & refrigerators ----------
  defineQuestion('PHY4_CE01', {
    sourceRef: 'P115',
    topic: 'carnotEngines',
    difficulty: 1,
    params: { Th: { min: 450, max: 550, step: 5 }, Tc: { min: 280, max: 330, step: 5 }, Qh: { min: 400, max: 600, step: 1 } },
    source: { params: { Th: 495, Tc: 305, Qh: 494 }, answer: 189.61616161616 },
    prompt: (p) =>
      `A Carnot engine operates between a hot reservoir at ${fmt(p.Th)} K and a cold reservoir at ${fmt(p.Tc)} K. If it absorbs ${fmt(p.Qh)} J of heat per cycle at the hot reservoir, how much work per cycle does it deliver?`,
    compute: (p) => numeric(p.Qh * thermo.carnotEfficiency(p.Tc, p.Th), 'J'),
    solution: (p, a) => steps('W=Q_h\\left(1-\\dfrac{T_c}{T_h}\\right)', ans('W', a, UNIT.J)),
  }),

  defineQuestion('PHY4_CE02', {
    sourceRef: 'P116',
    topic: 'carnotEngines',
    difficulty: 1,
    params: { Th: { min: 480, max: 520, step: 5 }, Tc: { min: 300, max: 350, step: 5 }, Qh: { min: 380, max: 460, step: 1 } },
    source: { params: { Th: 505, Tc: 330, Qh: 426 }, answer: 278.376 },
    prompt: (p) =>
      `A Carnot engine operates between a hot reservoir at ${fmt(p.Th)} K and a cold reservoir at ${fmt(p.Tc)} K. If it absorbs ${fmt(p.Qh)} J of heat per cycle at the hot reservoir, how much heat does it reject per cycle to the cold reservoir?`,
    compute: (p) => numeric((p.Qh * p.Tc) / p.Th, 'J'),
    solution: (p, a) => steps('\\dfrac{Q_c}{Q_h}=\\dfrac{T_c}{T_h} \\Rightarrow Q_c=Q_h\\dfrac{T_c}{T_h}', ans('Q_c', a, UNIT.J)),
  }),

  defineQuestion('PHY4_CE03', {
    sourceRef: 'P117',
    topic: 'carnotEngines',
    difficulty: 2,
    params: { Th: { min: 370, max: 420, step: 5 }, Tc: { min: 240, max: 280, step: 5 }, Qc: { min: 800, max: 1200, step: 50 } },
    source: { params: { Th: 390, Tc: 260, Qc: 1000 }, answer: 500 },
    prompt: (p) =>
      `A Carnot engine operates between a hot reservoir at ${fmt(p.Th)} K and a cold reservoir at ${fmt(p.Tc)} K. If the same engine working in reverse functions as a refrigerator between the same two reservoirs how much work per cycle must be supplied to remove ${fmt(p.Qc)} J of heat from the cold reservoir?`,
    compute: (p) => numeric(p.Qc / thermo.refrigeratorCop(p.Tc, p.Th), 'J'),
    solution: (p, a) =>
      steps('\\text{COP}=\\dfrac{T_c}{T_h-T_c}=\\dfrac{Q_c}{W} \\Rightarrow W=Q_c\\,\\dfrac{T_h-T_c}{T_c}', ans('W', a, UNIT.J)),
  }),

  defineQuestion('PHY4_CE04', {
    sourceRef: 'P118',
    topic: 'carnotEngines',
    difficulty: 1,
    params: { Th: { min: 340, max: 380, step: 5 }, Tc: { min: 240, max: 270, step: 5 } },
    source: { params: { Th: 355, Tc: 250 }, answer: 2.38095 },
    prompt: (p) =>
      `A Carnot engine operates between a hot reservoir at ${fmt(p.Th)} K and a cold reservoir at ${fmt(p.Tc)} K. If the same engine working in reverse functions as a refrigerator between the same two reservoirs, what is its coefficient of performance?`,
    compute: (p) => numeric(thermo.refrigeratorCop(p.Tc, p.Th), ''),
    solution: (p, a) => steps('\\text{COP}=\\dfrac{T_c}{T_h-T_c}', ans('\\text{COP}', a)),
  }),

  defineQuestion('PHY4_CE05', {
    sourceRef: 'P119',
    topic: 'carnotEngines',
    difficulty: 1,
    params: { Tc: { min: 20, max: 40, step: 1 }, pct: { min: 50, max: 60, step: 1 } },
    source: { params: { Tc: 31, pct: 57 }, answer: 706.977 },
    prompt: (p) =>
      `The maximum possible efficiency of a heat engine which exhausts its heat at a temperature of ${fmt(p.Tc)}°C is ${fmt(p.pct)} percent. What is the minimum value of the temperature at which the engine takes in heat?`,
    compute: (p) => numeric(toKelvin(p.Tc) / (1 - p.pct / 100), 'K'),
    solution: (p, a) => steps('e=1-\\dfrac{T_c}{T_h} \\Rightarrow T_h=\\dfrac{T_c}{1-e}', ans('T_h', a, UNIT.K), 'Use absolute temperatures (kelvins).'),
  }),

  defineQuestion('PHY4_CE06', {
    sourceRef: 'P120',
    topic: 'carnotEngines',
    difficulty: 1,
    params: { Tc: { min: 30, max: 50, step: 1 }, Th: { min: 400, max: 500, step: 1 } },
    source: { params: { Tc: 42, Th: 455 }, answer: 0.567308 },
    prompt: (p) =>
      `A heat engine exhausts its heat at a temperature of ${fmt(p.Tc)}° and takes in heat at ${fmt(p.Th)}°. What is the maximum possible efficiency of this engine? Give the answer as a fraction, not a percentage.`,
    compute: (p) => numeric(thermo.carnotEfficiency(toKelvin(p.Tc), toKelvin(p.Th)), ''),
    solution: (p, a) => steps('e_{max}=1-\\dfrac{T_c}{T_h}', ans('e_{max}', a), 'Use absolute temperatures (kelvins).'),
  }),

  defineQuestion('PHY4_CE07', {
    sourceRef: 'P131',
    topic: 'carnotEngines',
    difficulty: 1,
    params: { Qh: { min: 9000, max: 11000, step: 100 }, Tc: { min: 220, max: 240, step: 5 }, Th: { min: 550, max: 600, step: 5 } },
    source: { params: { Qh: 10500, Tc: 230, Th: 575 }, answer: 6300 },
    prompt: (p) =>
      `An ideal engine extracts ${fmt(p.Qh)} J of heat from its hot reservoir while operating between ${fmt(p.Tc)} K and ${fmt(p.Th)} K. Find the work done by an ideal engine.`,
    compute: (p) => numeric(p.Qh * thermo.carnotEfficiency(p.Tc, p.Th), 'J'),
    solution: (p, a) => steps('W=Q_h\\left(1-\\dfrac{T_c}{T_h}\\right)', ans('W', a, UNIT.J)),
  }),

  defineQuestion('PHY4_CE08', {
    sourceRef: 'P132',
    topic: 'carnotEngines',
    difficulty: 1,
    params: { Qh: { min: 8500, max: 10000, step: 100 }, Tc: { min: 220, max: 250, step: 5 }, Th: { min: 550, max: 600, step: 5 } },
    source: { params: { Qh: 9200, Tc: 235, Th: 570 }, answer: 3792.98 },
    prompt: (p) =>
      `An ideal engine extracts ${fmt(p.Qh)} J of heat from its hot reservoir while operating between ${fmt(p.Tc)} K and ${fmt(p.Th)} K. How much heat does it reject to the cold reservoir?`,
    compute: (p) => numeric((p.Qh * p.Tc) / p.Th, 'J'),
    solution: (p, a) => steps('Q_c=Q_h\\dfrac{T_c}{T_h}', ans('Q_c', a, UNIT.J)),
  }),

  defineQuestion('PHY4_CE09', {
    sourceRef: 'P133',
    topic: 'carnotEngines',
    difficulty: 3,
    params: { Qh: { min: 10000, max: 12000, step: 100 }, Tc: { min: 220, max: 230, step: 5 }, Th: { min: 500, max: 550, step: 5 }, Qc: { min: 4000, max: 4800, step: 100 } },
    source: { params: { Qh: 10800, Tc: 225, Th: 525, Qc: 4400 }, answer: 0.71296296296296 },
    prompt: (p) =>
      `An ideal engine extracts ${fmt(p.Qh)} J of heat from its hot reservoir while operating between ${fmt(p.Tc)} K and ${fmt(p.Th)} K. The work from the engine goes into an ideal refrigerator which extracts ${fmt(p.Qc)} J of heat from its cold reservoir. Find the coefficient of performance of the ideal refrigerator.`,
    compute: (p) => numeric(p.Qc / (p.Qh * thermo.carnotEfficiency(p.Tc, p.Th)), ''),
    solution: (p, a) =>
      steps('W=Q_h\\left(1-\\dfrac{T_c}{T_h}\\right),\\quad \\text{COP}=\\dfrac{Q_{c,ref}}{W}', ans('\\text{COP}', a), 'The temperatures of the refrigerator are not needed: the COP is just the heat it removes divided by the work it gets from the engine.'),
  }),

  defineQuestion('PHY4_CE10', {
    sourceRef: 'P145',
    topic: 'carnotEngines',
    difficulty: 2,
    params: { Th: { min: 480, max: 520, step: 1 }, Qh: { min: 400, max: 500, step: 10 }, W: { min: 250, max: 320, step: 10 } },
    source: { params: { Th: 491, Qh: 440, W: 290 }, answer: 260.45 },
    prompt: (p) =>
      `A Carnot engine has CO2 as its working substance. The gas is to have a maximum temperature of ${fmt(p.Th)}°C. With a heat input of ${fmt(p.Qh)} J per cycle, you want ${fmt(p.W)} J of useful work. Find the temperature of the cold reservoir. Answer in kelvins (K).`,
    compute: (p) => numeric(toKelvin(p.Th) * (1 - p.W / p.Qh), 'K'),
    solution: (p, a) => steps('e=\\dfrac{W}{Q_h}=1-\\dfrac{T_c}{T_h} \\Rightarrow T_c=T_h\\left(1-\\dfrac{W}{Q_h}\\right)', ans('T_c', a, UNIT.K)),
  }),

  defineQuestion('PHY4_CE11', {
    sourceRef: 'P146',
    topic: 'carnotEngines',
    difficulty: 2,
    params: { Th: { min: 480, max: 520, step: 1 }, Qh: { min: 400, max: 450, step: 5 }, W: { min: 260, max: 300, step: 5 }, M: { min: 10, max: 14, step: 1 } },
    source: { params: { Th: 496, Qh: 420, W: 290, M: 12 }, answer: 30830.769 },
    prompt: (p) =>
      `A Carnot engine has CO2 as its working substance. The gas is to have a maximum temperature of ${fmt(p.Th)}°C. With a heat input of ${fmt(p.Qh)} J per cycle, you want ${fmt(p.W)} J of useful work. For how many cycles must this engine run to melt completely a ${fmt(p.M)} kg block of ice originally at 0°C, using only the heat rejected by the engine. Heat of fusion of water is 334 kJ/kg. Answer without units.`,
    compute: (p) => numeric((p.M * FUSION) / (p.Qh - p.W), ''),
    solution: (p, a) =>
      steps('Q_c=Q_h-W\\ \\text{per cycle},\\quad N=\\dfrac{ML_f}{Q_c}', ans('N', a), 'The reservoir temperatures are not needed: only the heat rejected per cycle matters.'),
  }),

  defineQuestion('PHY4_CE12', {
    sourceRef: 'P147',
    topic: 'carnotEngines',
    difficulty: 3,
    params: { Tc: { min: -100, max: -80, step: 1 }, e1: { min: 20, max: 30, step: 1 }, e2: { min: 45, max: 55, step: 1 } },
    source: { params: { Tc: -90, e1: 25, e2: 50 }, answer: 122 },
    prompt: (p) =>
      `A Carnot engine whose low-temperature reservoir is at ${fmt(p.Tc)}°C has an efficiency of ${fmt(p.e1)}%. The efficiency is to be increased to ${fmt(p.e2)}%. By how many kelvins must the temperature of the high-temperature reservoir be increased if the temperature of the low-temperature reservoir remains constant?`,
    compute: (p) => {
      const Tc = toKelvin(p.Tc)
      return numeric(Tc / (1 - p.e2 / 100) - Tc / (1 - p.e1 / 100), 'K')
    },
    solution: (p, a) =>
      steps('T_h=\\dfrac{T_c}{1-e} \\Rightarrow \\Delta T_h=T_c\\left(\\dfrac{1}{1-e_2}-\\dfrac{1}{1-e_1}\\right)', ans('\\Delta T_h', a, UNIT.K)),
  }),

  defineQuestion('PHY4_CE13', {
    sourceRef: 'P148',
    topic: 'carnotEngines',
    difficulty: 1,
    params: { Tc: { min: -100, max: -80, step: 1 }, e: { min: 15, max: 25, step: 1 } },
    source: { params: { Tc: -90, e: 20 }, answer: 228.75 },
    prompt: (p) =>
      `A Carnot engine whose low-temperature reservoir is at ${fmt(p.Tc)}° has an efficiency of ${fmt(p.e)}%. What is the temperature of its high-temperature reservoir? Answer in kelvins (K).`,
    compute: (p) => numeric(toKelvin(p.Tc) / (1 - p.e / 100), 'K'),
    solution: (p, a) => steps('T_h=\\dfrac{T_c}{1-e}', ans('T_h', a, UNIT.K)),
  }),

  defineQuestion('PHY4_CE14', {
    sourceRef: 'P149',
    topic: 'carnotEngines',
    difficulty: 3,
    params: { Tc: { min: -80, max: -60, step: 1 }, e1: { min: 20, max: 30, step: 1 }, e2: { min: 45, max: 55, step: 1 } },
    source: { params: { Tc: -70, e1: 25, e2: 50 }, answer: 67.667 },
    prompt: (p) =>
      `A Carnot engine whose low-temperature reservoir is at ${fmt(p.Tc)}°C has an efficiency of ${fmt(p.e1)}%. The efficiency is to be increased to ${fmt(p.e2)}%. By how many kelvins must the temperature of the low-temperature reservoir be decreased if the temperature of the high-temperature reservoir remains constant? Find the magnitude of the temperature change.`,
    compute: (p) => {
      const Tc = toKelvin(p.Tc)
      const Th = Tc / (1 - p.e1 / 100)
      return numeric(Tc - Th * (1 - p.e2 / 100), 'K')
    },
    solution: (p, a) =>
      steps('T_h=\\dfrac{T_c}{1-e_1},\\quad T_c\'=T_h(1-e_2),\\quad |\\Delta T_c|=T_c-T_c\'', ans('|\\Delta T_c|', a, UNIT.K)),
  }),

  // ---------- Entropy ----------
  defineQuestion('PHY4_EN01', {
    sourceRef: 'P121',
    topic: 'entropy',
    difficulty: 1,
    params: { mg: { min: 200, max: 300, step: 1 } },
    source: { params: { mg: 238 }, answer: 291.17948717949 },
    prompt: (p) =>
      `A block of ice with a mass of ${fmt(p.mg)} g at 0°C is placed in a large lake. The temperature of the lake is just slightly higher than 0°C, and the ice melts. What is the entropy change of the ice? Heat of fusion of water is 334 kJ/kg.`,
    compute: (p) => numeric((p.mg / 1000 * FUSION) / T_ICE, 'J/K'),
    solution: (p, a) => steps('\\Delta S=\\dfrac{Q}{T}=\\dfrac{mL_f}{273\\text{ K}}', ans('\\Delta S', a, UNIT.JK), 'The ice melts at 0 °C (273 K) and absorbs heat mL_f.'),
  }),

  defineQuestion('PHY4_EN02', {
    sourceRef: 'P122',
    topic: 'entropy',
    difficulty: 1,
    params: { dS: { min: 250, max: 350, step: 1 } },
    source: { params: { dS: 302 }, answer: 246.844 },
    prompt: (p) =>
      `A block of ice at 0° is placed in a large lake whose temperature is just slightly above 0°, and the ice melts completely. The entropy change of the ice is ${fmt(p.dS)} J/K. What was the mass of the block? Latent heat of fusion for water is 334 kJ/kg.`,
    compute: (p) => numeric(((p.dS * T_ICE) / FUSION) * 1000, 'g'),
    solution: (p, a) => steps('\\Delta S=\\dfrac{mL_f}{T} \\Rightarrow m=\\dfrac{T\\,\\Delta S}{L_f}', ans('m', a, UNIT.g)),
  }),

  defineQuestion('PHY4_EN03', {
    sourceRef: 'P123',
    topic: 'entropy',
    difficulty: 1,
    params: { mg: { min: 200, max: 300, step: 1 } },
    source: { params: { mg: 237 }, answer: -289.95604395604 },
    prompt: (p) =>
      `A block of ice with a mass of ${fmt(p.mg)} g at 0°C is placed in a large lake. The temperature of the lake is just slightly higher than 0°C, and the ice melts. What is the entropy change of the lake? Heat of fusion of water is 334 kJ/kg.`,
    compute: (p) => numeric(-(p.mg / 1000 * FUSION) / T_ICE, 'J/K'),
    solution: (p, a) => steps('\\Delta S_{lake}=-\\dfrac{Q}{T}=-\\dfrac{mL_f}{T}', ans('\\Delta S_{lake}', a, UNIT.JK), 'The lake gives up the heat the ice absorbs, at essentially the same temperature, so its entropy change is negative.'),
  }),

  defineQuestion('PHY4_EN04', {
    sourceRef: 'P124',
    topic: 'entropy',
    difficulty: 2,
    params: { m: { min: 6, max: 10, step: 1 }, hot: { min: 300, max: 340, step: 5 }, lake: { min: 10, max: 20, step: 1 } },
    source: { params: { m: 8, hot: 320, lake: 14 }, answer: 1091.79 },
    prompt: (p) =>
      `A ${fmt(p.m)} kg piece of lead at a temperature of ${fmt(p.hot)} ˚C is placed in a lake whose temperature is ${fmt(p.lake)}°C. Determine the entropy change of the lake. Specific heat of the lead is clead = 128 J/(kg K).`,
    compute: (p) => numeric(leadHeat(p.m, 128, p.hot, p.lake) / toKelvin(p.lake), 'J/K'),
    solution: (p, a) =>
      steps('Q=mc(T_{hot}-T_{lake}),\\quad \\Delta S_{lake}=\\dfrac{Q}{T_{lake}}', ans('\\Delta S_{lake}', a, UNIT.JK), 'The lake is so large that its temperature stays constant while it absorbs the lead\'s heat.'),
  }),

  defineQuestion('PHY4_EN05', {
    sourceRef: 'P125',
    topic: 'entropy',
    difficulty: 1,
    params: { m: { min: 5, max: 7, step: 1 }, hot: { min: 330, max: 350, step: 5 }, lake: { min: 15, max: 20, step: 1 }, c: { min: 120, max: 130, step: 5 } },
    source: { params: { m: 6, hot: 340, lake: 17, c: 125 }, answer: 242250 },
    prompt: (p) =>
      `A ${fmt(p.m)} kg piece of lead at a temperature of ${fmt(p.hot)}° is placed in a lake whose temperature is ${fmt(p.lake)}°. How much heat flows from the lead into the lake? Specific heat of the lead is ${fmt(p.c)} J/(kg K).`,
    compute: (p) => numeric(leadHeat(p.m, p.c, p.hot, p.lake), 'J'),
    solution: (p, a) => steps('Q=mc\\,\\Delta T', ans('Q', a, UNIT.J)),
  }),

  defineQuestion('PHY4_EN06', {
    sourceRef: 'P126',
    topic: 'entropy',
    difficulty: 3,
    params: { m: { min: 3, max: 5, step: 1 }, hot: { min: 300, max: 340, step: 5 }, lake: { min: 10, max: 20, step: 1 } },
    source: { params: { m: 4, hot: 320, lake: 14 }, answer: -371.56 },
    prompt: (p) =>
      `A ${fmt(p.m)} kg piece of lead at a temperature of ${fmt(p.hot)} ˚C is placed in a lake whose temperature is ${fmt(p.lake)} ˚C. Determine the entropy change of the lead piece. Specific heat of the lead is clead = 128 J/(kg K).`,
    compute: (p) => numeric(thermo.entropyOfHeating(p.m * 128, toKelvin(p.hot), toKelvin(p.lake)), 'J/K'),
    solution: (p, a) =>
      steps('\\Delta S=\\int\\dfrac{mc\\,dT}{T}=mc\\ln\\dfrac{T_f}{T_i}', ans('\\Delta S', a, UNIT.JK), 'The lead\'s temperature changes continuously from its initial value to the lake\'s temperature, so the entropy change needs an integral (the log).'),
  }),

  defineQuestion('PHY4_EN07', {
    sourceRef: 'P127',
    topic: 'entropy',
    difficulty: 3,
    params: { m: { min: 6, max: 10, step: 1 }, hot: { min: 300, max: 340, step: 5 }, lake: { min: 10, max: 20, step: 1 } },
    source: { params: { m: 8, hot: 320, lake: 14 }, answer: 348.4 },
    prompt: (p) =>
      `A ${fmt(p.m)} kg piece of lead at a temperature of ${fmt(p.hot)} ˚C is placed in a lake whose temperature is ${fmt(p.lake)} ˚C. Determine the entropy change of the universe due to this process. Specific heat of the lead is clead = 128 J/(kg K).`,
    compute: (p) => {
      const lead = thermo.entropyOfHeating(p.m * 128, toKelvin(p.hot), toKelvin(p.lake))
      const lake = leadHeat(p.m, 128, p.hot, p.lake) / toKelvin(p.lake)
      return numeric(lead + lake, 'J/K')
    },
    solution: (p, a) =>
      steps('\\Delta S_{universe}=mc\\ln\\dfrac{T_{lake}}{T_{hot}}+\\dfrac{mc\\,(T_{hot}-T_{lake})}{T_{lake}}', ans('\\Delta S_{universe}', a, UNIT.JK), 'Add the entropy change of the lead (negative) and of the lake (positive); the total is positive, as it must be for an irreversible process.'),
  }),

  defineQuestion('PHY4_EN08', {
    sourceRef: 'P136',
    topic: 'entropy',
    difficulty: 2,
    params: { n: { min: 2, max: 4, step: 1 }, T: { min: 20, max: 25, step: 1 }, W: { min: 1400, max: 1700, step: 10 } },
    source: { params: { n: 3, T: 22, W: 1550 }, answer: -5.2542372881356 },
    prompt: (p) =>
      `${fmt(p.n)} moles of an ideal gas undergo a reversible isothermal compression at ${fmt(p.T)}°C. During this compression, ${fmt(p.W)} J of work is done on the gas. What is the change in entropy of the gas?`,
    compute: (p) => numeric(-p.W / toKelvin(p.T), 'J/K'),
    solution: (p, a) =>
      steps('\\Delta U=0 \\Rightarrow Q=-W_{on},\\quad \\Delta S=\\dfrac{Q}{T}=-\\dfrac{W_{on}}{T}', ans('\\Delta S', a, UNIT.JK), 'In an isothermal process the gas gives off a heat equal to the work done on it.'),
  }),

  defineQuestion('PHY4_EN09', {
    sourceRef: 'P137',
    topic: 'entropy',
    difficulty: 2,
    params: { n: { min: 2, max: 4, step: 1 }, T: { min: 14, max: 20, step: 0.5 }, W: { min: 1400, max: 1700, step: 10 } },
    source: { params: { n: 3, T: 16.5, W: 1530 }, answer: 5.28497 },
    prompt: (p) =>
      `${fmt(p.n)} moles of an ideal gas undergo a reversible isothermal compression at ${fmt(p.T)}°. During this compression, ${fmt(p.W)} J of work is done on the gas, and the heat produced flows into the surroundings at the same temperature. What is the entropy change of the surroundings?`,
    compute: (p) => numeric(p.W / toKelvin(p.T), 'J/K'),
    solution: (p, a) => steps('\\Delta S_{surr}=\\dfrac{Q}{T}=\\dfrac{W_{on}}{T}', ans('\\Delta S_{surr}', a, UNIT.JK)),
  }),

  defineQuestion('PHY4_EN10', {
    sourceRef: 'P138',
    topic: 'entropy',
    difficulty: 2,
    params: { m: { min: 0.12, max: 0.2, step: 0.01 } },
    source: { params: { m: 0.16 }, answer: -143.27077747989 },
    prompt: (p) =>
      `A student immerses one end of a copper rod in boiling water at 100°C and the other end in an icewater mixture at 0°C. The sides of the rod are insulated. After steady-state conditions have been achieved in the rod, ${fmt(p.m)} kg of ice melts in a certain time interval. For this time interval, find the entropy change of the boiling water. Heat of fusion of water is 334 kJ/kg.`,
    compute: (p) => numeric(-(p.m * FUSION) / T_BOILING, 'J/K'),
    solution: (p, a) =>
      steps('Q=mL_f,\\quad \\Delta S_{hot}=-\\dfrac{Q}{T_{hot}}=-\\dfrac{mL_f}{373\\text{ K}}', ans('\\Delta S_{hot}', a, UNIT.JK), 'In steady state the heat that melts the ice is the heat given up by the boiling water.'),
  }),

  defineQuestion('PHY4_EN11', {
    sourceRef: 'P139',
    topic: 'entropy',
    difficulty: 2,
    params: { m: { min: 0.12, max: 0.2, step: 0.01 } },
    source: { params: { m: 0.16 }, answer: 195.75091575092 },
    prompt: (p) =>
      `A student immerses one end of a copper rod in boiling water at 100°C and the other end in an icewater mixture at 0°C. The sides of the rod are insulated. After steady-state conditions have been achieved in the rod, ${fmt(p.m)} kg of ice melts in a certain time interval. For this time interval, find the entropy change of the ice-water mixture. Heat of fusion of water is 334 kJ/kg.`,
    compute: (p) => numeric((p.m * FUSION) / T_ICE, 'J/K'),
    solution: (p, a) => steps('\\Delta S_{cold}=\\dfrac{Q}{T_{cold}}=\\dfrac{mL_f}{273\\text{ K}}', ans('\\Delta S_{cold}', a, UNIT.JK)),
  }),

  defineQuestion('PHY4_EN12', {
    sourceRef: 'P140',
    topic: 'entropy',
    difficulty: 3,
    params: { m: { min: 0.15, max: 0.25, step: 0.01 } },
    source: { params: { m: 0.19 }, answer: 62.32016419684 },
    prompt: (p) =>
      `A student immerses one end of a copper rod in boiling water at 100°C and the other end in an icewater mixture at 0°C. The sides of the rod are insulated. After steady-state conditions have been achieved in the rod, ${fmt(p.m)} kg of ice melts in a certain time interval. For this time interval, find the total entropy change of the entire system. Heat of fusion of water is 334 kJ/kg.`,
    compute: (p) => numeric(p.m * FUSION * (1 / T_ICE - 1 / T_BOILING), 'J/K'),
    solution: (p, a) =>
      steps('\\Delta S=Q\\left(\\dfrac{1}{T_{cold}}-\\dfrac{1}{T_{hot}}\\right),\\quad Q=mL_f', ans('\\Delta S', a, UNIT.JK), 'The copper rod itself is in steady state and its entropy does not change; the total is the gain of the ice water minus the loss of the boiling water.'),
  }),

  defineQuestion('PHY4_EN13', {
    sourceRef: 'P141',
    topic: 'entropy',
    difficulty: 3,
    params: { n: { min: 20, max: 30, step: 1 }, V1: { min: 40, max: 50, step: 1 }, V2: { min: 9, max: 15, step: 1 }, T: { min: 280, max: 300, step: 1 } },
    source: { params: { n: 23, V1: 48, V2: 11, T: 293 }, answer: -703.9823 },
    prompt: (p) =>
      `A system consisting of ${fmt(p.n)} mol of a monatomic ideal gas is cooled at constant pressure from a volume ${fmt(p.V1)} L to ${fmt(p.V2)} L. The initial temperature was ${fmt(p.T)} K. What is the change in entropy of the gas? The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(p.n * 2.5 * R * Math.log(p.V2 / p.V1), 'J/K'),
    solution: (p, a) =>
      steps('\\Delta S=nC_P\\ln\\dfrac{T_2}{T_1}=n\\cdot\\tfrac52R\\ln\\dfrac{V_2}{V_1}', ans('\\Delta S', a, UNIT.JK), 'At constant pressure T ∝ V, and for a monatomic gas C_P = (5/2)R.'),
  }),

  defineQuestion('PHY4_EN14', {
    sourceRef: 'P142',
    topic: 'entropy',
    difficulty: 1,
    params: { n: { min: 25, max: 30, step: 1 }, V1: { min: 40, max: 48, step: 1 }, V2: { min: 8, max: 12, step: 1 }, T: { min: 295, max: 305, step: 1 } },
    source: { params: { n: 28, V1: 44, V2: 9, T: 302 }, answer: 61.7727 },
    prompt: (p) =>
      `A system consisting of ${fmt(p.n)} mol of a monatomic ideal gas is cooled at constant pressure from a volume of ${fmt(p.V1)} L to ${fmt(p.V2)} L. The initial temperature was ${fmt(p.T)} K. What is the final temperature of the gas? The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric((p.T * p.V2) / p.V1, 'K'),
    solution: (p, a) => steps('\\dfrac{V_1}{T_1}=\\dfrac{V_2}{T_2} \\Rightarrow T_2=T_1\\dfrac{V_2}{V_1}', ans('T_2', a, UNIT.K)),
  }),

  defineQuestion('PHY4_EN15', {
    sourceRef: 'P143',
    topic: 'entropy',
    difficulty: 1,
    params: { mg: { min: 200, max: 250, step: 1 } },
    source: { params: { mg: 222 }, answer: -1342.7131367292 },
    prompt: (p) =>
      `What is the entropy change of ${fmt(p.mg)} g of steam at 100°C when it condenses to water at the same temperature? Latent heat of vaporization of water is 2256 kJ/kg.`,
    compute: (p) => numeric(-(p.mg / 1000 * 2256000) / T_BOILING, 'J/K'),
    solution: (p, a) => steps('\\Delta S=-\\dfrac{mL_v}{T}', ans('\\Delta S', a, UNIT.JK), 'Condensation releases heat mL_v at the constant temperature 373 K.'),
  }),

  defineQuestion('PHY4_EN16', {
    sourceRef: 'P144',
    topic: 'entropy',
    difficulty: 2,
    params: { dS: { min: 1100, max: 1300, step: 1 } },
    source: { params: { dS: 1205 }, answer: 199.408 },
    prompt: (p) =>
      `Steam at 100° condenses to water at the same temperature, and the entropy change of the steam is -${fmt(p.dS)} J/K. What mass of steam condensed? Latent heat of vaporization of water is 2254 kJ/kg.`,
    compute: (p) => numeric(((p.dS * T_BOILING) / 2254000) * 1000, 'g'),
    solution: (p, a) => steps('|\\Delta S|=\\dfrac{mL_v}{T} \\Rightarrow m=\\dfrac{T\\,|\\Delta S|}{L_v}', ans('m', a, UNIT.g)),
  }),

  // ---------- Engine efficiency & power ----------
  defineQuestion('PHY4_EF01', {
    sourceRef: 'P128',
    topic: 'engineEfficiency',
    difficulty: 2,
    params: { e: { min: 15, max: 25, step: 1 }, P: { min: 200, max: 230, step: 1 }, rate: { min: 6, max: 10, step: 1 } },
    source: { params: { e: 20, P: 215, rate: 8 }, answer: 107.5 },
    prompt: (p) =>
      `An output of an engine with efficiency of ${fmt(p.e)}% is ${fmt(p.P)} W. It works at ${fmt(p.rate)} cycles/s. How much heat is rejected each cycle?`,
    compute: (p) => {
      const W = p.P / p.rate
      return numeric(W / (p.e / 100) - W, 'J')
    },
    solution: (p, a) =>
      steps('W=\\dfrac{P}{f},\\quad Q_h=\\dfrac{W}{e},\\quad Q_c=Q_h-W', ans('Q_c', a, UNIT.J)),
  }),

  defineQuestion('PHY4_EF02', {
    sourceRef: 'P129',
    topic: 'engineEfficiency',
    difficulty: 2,
    params: { e: { min: 15, max: 25, step: 1 }, P: { min: 180, max: 230, step: 1 }, rate: { min: 10, max: 15, step: 1 } },
    source: { params: { e: 17, P: 192, rate: 13 }, answer: 86.8778 },
    prompt: (p) =>
      `The output of an engine with an efficiency of ${fmt(p.e)}% is ${fmt(p.P)} W. It works at ${fmt(p.rate)} cycles/s. How much heat does it absorb from the hot reservoir in each cycle?`,
    compute: (p) => numeric(p.P / p.rate / (p.e / 100), 'J'),
    solution: (p, a) => steps('W=\\dfrac{P}{f},\\quad Q_h=\\dfrac{W}{e}', ans('Q_h', a, UNIT.J)),
  }),

  defineQuestion('PHY4_EF03', {
    sourceRef: 'P130',
    topic: 'engineEfficiency',
    difficulty: 1,
    params: { e: { min: 12, max: 20, step: 1 }, P: { min: 220, max: 260, step: 1 }, rate: { min: 10, max: 15, step: 1 } },
    source: { params: { e: 15, P: 243, rate: 13 }, answer: 18.692307692308 },
    prompt: (p) =>
      `An output of an engine with efficiency of ${fmt(p.e)}% is ${fmt(p.P)} W. It works at ${fmt(p.rate)} cycles/s. How much work is done in each cycle?`,
    compute: (p) => numeric(p.P / p.rate, 'J'),
    solution: (p, a) => steps('W=\\dfrac{P}{f}', ans('W', a, UNIT.J), 'The efficiency is not needed: the output power is the work per cycle times the number of cycles per second.'),
  }),

  defineQuestion('PHY4_EF04', {
    sourceRef: 'P134',
    topic: 'engineEfficiency',
    difficulty: 2,
    params: { kgh: { min: 120000, max: 160000, step: 5000 }, MW: { min: 250, max: 320, step: 10 }, H: { min: 28, max: 32, step: 1 } },
    constraints: (p) => (p.MW * 1e6) / ((p.kgh * p.H * 1e6) / 3600) < 0.5,
    source: { params: { kgh: 140000, MW: 300, H: 30 }, answer: 0.25714285714286 },
    prompt: (p) =>
      `A coal power plant consumes ${fmt(p.kgh)} kg of coal per hour and produces ${fmt(p.MW)} MW of power. If the heat of combustion of coal is ${fmt(p.H)} MJ/kg, what is the efficiency of the power plant?`,
    compute: (p) => numeric((p.MW * 1e6) / ((p.kgh * p.H * 1e6) / 3600), ''),
    solution: (p, a) =>
      steps('e=\\dfrac{P_{out}}{P_{in}},\\quad P_{in}=\\dfrac{(\\text{kg/h})\\,H}{3600\\text{ s/h}}', ans('e', a)),
  }),

  defineQuestion('PHY4_EF05', {
    sourceRef: 'P135',
    topic: 'engineEfficiency',
    difficulty: 2,
    params: { MW: { min: 200, max: 260, step: 10 }, e: { min: 0.24, max: 0.3, step: 0.01 }, H: { min: 24, max: 28, step: 1 } },
    source: { params: { MW: 230, e: 0.26, H: 26 }, answer: 122485 },
    prompt: (p) =>
      `A coal power plant produces ${fmt(p.MW)} MW of electrical power at an efficiency of ${fmt(p.e)}. If the heat of combustion of coal is ${fmt(p.H)} MJ/kg, how many kilograms of coal does it consume per hour?`,
    compute: (p) => numeric(((p.MW * 1e6) / p.e) * 3600 / (p.H * 1e6), 'kg'),
    solution: (p, a) =>
      steps('P_{in}=\\dfrac{P_{out}}{e},\\quad m=\\dfrac{P_{in}\\,(3600\\text{ s})}{H}', ans('m', a, UNIT.kg)),
  }),

  defineQuestion('PHY4_EF06', {
    sourceRef: 'P150',
    topic: 'engineEfficiency',
    difficulty: 3,
    params: { n: { min: 0.25, max: 0.4, step: 0.01 }, T1: { min: 290, max: 300, step: 1 }, T2: { min: 590, max: 620, step: 1 }, T3: { min: 480, max: 520, step: 1 } },
    constraints: (p) => {
      const Q = p.n * 2.5 * R * (p.T2 - p.T1) + p.n * 3.5 * R * (p.T1 - p.T3)
      return Q > 30
    },
    source: { params: { n: 0.3, T1: 297, T2: 603, T3: 498 }, answer: 153.3195 },
    prompt: (p) =>
      `A heat engine takes ${fmt(p.n)} mol of a diatomic ideal gas around the cycle shown in PV-diagram. Process 1 → 2 is at constant volume, process 2 → 3 is adiabatic, and process 3 → 1 is at a constant pressure of 1 atm. The value of γ for this gas is 1.4. Find the net heat flow into the engine in one cycle. T1 = ${fmt(p.T1)} K, T2 = ${fmt(p.T2)} K and T3 = ${fmt(p.T3)} K. The universal gas constant is R = 8.31 J/(mol K). 1 atm = 101325 Pa.`,
    compute: (p) => numeric(p.n * 2.5 * R * (p.T2 - p.T1) + p.n * 3.5 * R * (p.T1 - p.T3), 'J'),
    solution: (p, a) =>
      steps('Q_{12}=nC_V(T_2-T_1),\\quad Q_{23}=0,\\quad Q_{31}=nC_P(T_1-T_3),\\quad Q_{net}=Q_{12}+Q_{31}', ans('Q_{net}', a, UNIT.J), 'For a diatomic gas C_V = (5/2)R and C_P = (7/2)R. Heat enters during 1→2, none flows in the adiabatic step, and heat leaves during the constant-pressure compression 3→1.'),
    diagram: () => exerciseImage('p150'),
  }),
]
