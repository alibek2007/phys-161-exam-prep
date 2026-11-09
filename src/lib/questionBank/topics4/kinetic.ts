import { defineQuestion } from '../defineQuestion'
import { fmt, sciText } from '../../format'
import * as gas from '../../physics/gases'
import { toKelvin } from '../../physics/thermal'
import { ans, numeric, steps, UNIT } from './helpers'

const { R_GAS: R, ATM, K_BOLTZMANN: KB, N_AVOGADRO: NA } = gas
const BOLTZMANN_TEXT = 'Boltzmann constant kB = 1.38×10⁻²³ J/K'
const AVOGADRO_TEXT = 'Avogadro\'s number NA = 6.022×10²³ 1/mol'
const ATM_TEXT = '1 atm = 101325 Pa'

export const kineticQuestions = [
  // ---------- Molecular speeds & kinetic energy ----------
  defineQuestion('PHY4_MS01', {
    sourceRef: 'P42',
    topic: 'molecularSpeed',
    difficulty: 1,
    params: { v: { min: 400, max: 500, step: 5 } },
    source: { params: { v: 435 }, answer: 1230.365799 },
    prompt: (p) =>
      `Consider a gas mixture of Helium and Oxygen molecules assuming O2 is diatomic. The root-mean-square velocity for the O2 molecules is ${fmt(p.v)} m/s. Find vrms for the Helium atoms. Molar mass of helium is 4 g/mol, molar mass of oxygen is 32 g/mol.`,
    compute: (p) => numeric(p.v * Math.sqrt(32 / 4), 'm/s'),
    solution: (p, a) => steps('v_{rms}=\\sqrt{\\dfrac{3RT}{M}} \\Rightarrow \\dfrac{v_{He}}{v_{O_2}}=\\sqrt{\\dfrac{M_{O_2}}{M_{He}}}', ans('v_{He}', a, UNIT.ms), 'Same temperature for both gases, so v_rms ∝ 1/√M.'),
  }),

  defineQuestion('PHY4_MS02', {
    sourceRef: 'P43',
    topic: 'molecularSpeed',
    difficulty: 1,
    params: { MO: { min: 31.9, max: 32.1, step: 0.05 } },
    source: { params: { MO: 31.95 }, answer: 2.82622 },
    prompt: (p) =>
      `Consider a gas mixture of helium atoms and oxygen molecules in thermal equilibrium, with O₂ treated as diatomic. Molar mass of helium is 4 g/mol and molar mass of oxygen is ${fmt(p.MO)} g/mol. By what factor is the root-mean-square speed of the helium atoms larger than that of the oxygen molecules?`,
    compute: (p) => numeric(Math.sqrt(p.MO / 4), ''),
    solution: (p, a) => steps('\\dfrac{v_{He}}{v_{O_2}}=\\sqrt{\\dfrac{M_{O_2}}{M_{He}}}', ans('\\text{factor}', a)),
  }),

  defineQuestion('PHY4_MS03', {
    sourceRef: 'P44',
    topic: 'molecularSpeed',
    difficulty: 2,
    params: { v: { min: 400, max: 520, step: 5 } },
    source: { params: { v: 485 }, answer: 301.93341355796 },
    prompt: (p) =>
      `Consider a gas mixture of Helium and Oxygen molecules assuming O2 is diatomic. The root-mean-square velocity for the O2 molecules is ${fmt(p.v)} m/s. Molar mass of helium is 4 g/mol, molar mass of oxygen is 32 g/mol. The universal gas constant is R = 8.31 J/(mol K). Find the temperature of the gas in Kelvin.`,
    compute: (p) => numeric(gas.temperatureFromRms(p.v, 0.032), 'K'),
    solution: (p, a) => steps('v_{rms}=\\sqrt{\\dfrac{3RT}{M}} \\Rightarrow T=\\dfrac{Mv_{rms}^2}{3R}', ans('T', a, UNIT.K)),
  }),

  defineQuestion('PHY4_MS04', {
    sourceRef: 'P45',
    topic: 'molecularSpeed',
    difficulty: 2,
    params: { V: { min: 15, max: 25, step: 0.1 }, n: { min: 10, max: 20, step: 1 }, P: { min: 150000, max: 250000, step: 1000 } },
    source: { params: { V: 19.3, n: 16, P: 202000 }, answer: 6.0693083693125e-22 },
    prompt: (p) =>
      `A spherical ${fmt(p.V)}-liters balloon contains ${fmt(p.n)}-mol of oxygen gas at a pressure of ${fmt(p.P)} Pa. Find the average translational kinetic energy of an oxygen molecule in the balloon. The universal gas constant is R = 8.31 J/(mol K). ${BOLTZMANN_TEXT}. ${AVOGADRO_TEXT}.`,
    compute: (p) => numeric(gas.meanKineticEnergy(gas.idealTemperature(p.P, p.V / 1000, p.n)), 'J'),
    solution: (p, a) => steps('T=\\dfrac{PV}{nR},\\quad \\overline{K}=\\tfrac32k_BT', ans('\\overline{K}', a, UNIT.J)),
  }),

  defineQuestion('PHY4_MS05', {
    sourceRef: 'P47',
    topic: 'molecularSpeed',
    difficulty: 2,
    params: { V: { min: 6, max: 10, step: 0.1 }, n: { min: 1, max: 2.5, step: 0.1 }, Patm: { min: 3, max: 6, step: 0.1 } },
    source: { params: { V: 8.1, n: 1.6, Patm: 4.7 }, answer: 425.50322889891 },
    prompt: (p) =>
      `Find the root mean square speed of argon atom in an ${fmt(p.V)} liter container filled with ${fmt(p.n)} mol of argon gas at pressure of ${fmt(p.Patm)} atm. Molar mass of argon is 39.948 g/mol. The standard atmosphere pressure is 101325 Pa.`,
    compute: (p) => numeric(Math.sqrt((3 * p.Patm * ATM * (p.V / 1000)) / (p.n * 0.039948)), 'm/s'),
    solution: (p, a) => steps('v_{rms}=\\sqrt{\\dfrac{3RT}{M}},\\ \\ RT=\\dfrac{PV}{n} \\Rightarrow v_{rms}=\\sqrt{\\dfrac{3PV}{nM}}', ans('v_{rms}', a, UNIT.ms)),
  }),

  defineQuestion('PHY4_MS06', {
    sourceRef: 'P49',
    topic: 'molecularSpeed',
    difficulty: 1,
    params: { n: { min: 0.5, max: 1.2, step: 0.01 }, T: { min: 400, max: 600, step: 1 } },
    source: { params: { n: 0.71, T: 483 }, answer: 4274.62245 },
    prompt: (p) =>
      `Calculate the total kinetic energy content of ${fmt(p.n)} moles of a monatomic ideal gas at a temperature of ${fmt(p.T)} K. ${BOLTZMANN_TEXT}. ${AVOGADRO_TEXT}. The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(1.5 * p.n * R * p.T, 'J'),
    solution: (p, a) => steps('K_{total}=\\tfrac32nRT', ans('K_{total}', a, UNIT.J)),
  }),

  defineQuestion('PHY4_MS07', {
    sourceRef: 'P50',
    topic: 'molecularSpeed',
    difficulty: 1,
    params: { T: { min: 450, max: 650, step: 1 } },
    source: { params: { T: 526 }, answer: 1.08882e-20 },
    prompt: (p) =>
      `Calculate the average translational kinetic energy of one molecule of a monatomic ideal gas at a temperature of ${fmt(p.T)} K. Boltzmann constant k_B = 1.38×10⁻²³ J/K.`,
    compute: (p) => numeric(gas.meanKineticEnergy(p.T), 'J'),
    solution: (p, a) => steps('\\overline{K}=\\tfrac32k_BT', ans('\\overline{K}', a, UNIT.J)),
  }),

  defineQuestion('PHY4_MS08', {
    sourceRef: 'P51',
    topic: 'molecularSpeed',
    difficulty: 2,
    params: { v: { min: 2.2, max: 3, step: 0.1 } },
    source: { params: { v: 2.6 }, answer: 546.65703971119 },
    prompt: (p) =>
      `The escape velocity from Planet X is ${fmt(p.v)} km/s. At what temperature would hydrogen molecules (molar mass is equal to 2.016 g/mol) have a root-mean-square velocity equal to the Planet X's escape velocity? The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(gas.temperatureFromRms(p.v * 1000, 0.002016), 'K'),
    solution: (p, a) => steps('T=\\dfrac{Mv_{rms}^2}{3R}', ans('T', a, UNIT.K)),
  }),

  defineQuestion('PHY4_MS09', {
    sourceRef: 'P52',
    topic: 'molecularSpeed',
    difficulty: 1,
    params: { T: { min: 400, max: 600, step: 10 } },
    source: { params: { T: 460 }, answer: 2394.56 },
    prompt: (p) =>
      `At a temperature of ${fmt(p.T)} K, what is the root-mean-square speed of hydrogen molecules, whose molar mass is 2 g/mol? The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(gas.rmsSpeed(p.T, 0.002), 'm/s'),
    solution: (p, a) => steps('v_{rms}=\\sqrt{\\dfrac{3RT}{M}}', ans('v_{rms}', a, UNIT.ms)),
  }),

  defineQuestion('PHY4_MS10', {
    sourceRef: 'P53',
    topic: 'molecularSpeed',
    difficulty: 1,
    params: { K21: { min: 6, max: 9, step: 0.1 } },
    source: { params: { K21: 7.6 }, answer: 367.14975845411 },
    prompt: (p) =>
      `Find the temperature of the ideal gas with the average translational kinetic energy of a molecule ${sciText(p.K21, -21)} J. Boltzmann constant kB = 1.38×10⁻²³ J/K.`,
    compute: (p) => numeric((2 * p.K21 * 1e-21) / (3 * KB), 'K'),
    solution: (p, a) => steps('\\overline{K}=\\tfrac32k_BT \\Rightarrow T=\\dfrac{2\\overline{K}}{3k_B}', ans('T', a, UNIT.K)),
  }),

  defineQuestion('PHY4_MS11', {
    sourceRef: 'P69',
    topic: 'molecularSpeed',
    difficulty: 3,
    params: { VL: { min: 500, max: 700, step: 1 }, v: { min: 400, max: 480, step: 5 }, n: { min: 4, max: 7, step: 0.01 } },
    source: { params: { VL: 617, v: 445, n: 5.57 }, answer: 19068.598595354 },
    prompt: (p) =>
      `If the root-mean-square speed of oxygen molecules inside a refrigerator of volume ${fmt(p.VL)} L is ${fmt(p.v)} m/s, what is the partial pressure of the oxygen? There are ${fmt(p.n)} moles of oxygen in the refrigerator, and the molar mass of oxygen is 32 g/mol. The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric((p.n * gas.R_GAS * gas.temperatureFromRms(p.v, 0.032)) / (p.VL / 1000), 'Pa'),
    solution: (p, a) =>
      steps('T=\\dfrac{Mv_{rms}^2}{3R},\\quad P=\\dfrac{nRT}{V}=\\dfrac{nMv_{rms}^2}{3V}', ans('P', a, UNIT.Pa)),
  }),

  defineQuestion('PHY4_MS12', {
    sourceRef: 'P72',
    topic: 'molecularSpeed',
    difficulty: 2,
    params: { T0: { min: 15, max: 25, step: 1 }, pct: { min: 2, max: 5, step: 1 } },
    source: { params: { T0: 20, pct: 3 }, answer: 311 },
    prompt: (p) =>
      `The root-mean-square speed of molecules in a gas at ${fmt(p.T0)}°C is to be increased by ${fmt(p.pct)}%. To what temperature must it be raised? Answer in kelvins (K).`,
    compute: (p) => numeric(toKelvin(p.T0) * (1 + p.pct / 100) ** 2, 'K'),
    solution: (p, a) => steps('v_{rms}\\propto\\sqrt{T} \\Rightarrow T\'=T\\left(1+\\dfrac{\\%}{100}\\right)^2', ans('T\'', a, UNIT.K), 'Use the absolute temperature in kelvins.'),
  }),

  defineQuestion('PHY4_MS13', {
    sourceRef: 'P73',
    topic: 'molecularSpeed',
    difficulty: 2,
    params: { pct: { min: 2, max: 6, step: 1 } },
    source: { params: { pct: 4 }, answer: 8.16 },
    prompt: (p) => `The root-mean-square speed of the molecules in a gas is to be increased by ${fmt(p.pct)}%. By what percentage must the absolute temperature be raised?`,
    compute: (p) => numeric(((1 + p.pct / 100) ** 2 - 1) * 100, '%'),
    solution: (p, a) => steps('\\dfrac{T\'}{T}=\\left(1+\\dfrac{\\%}{100}\\right)^2 \\Rightarrow \\text{increase}=\\left[(1+\\tfrac{\\%}{100})^2-1\\right]\\cdot100', ans('\\text{increase}', a, UNIT.percent)),
  }),

  defineQuestion('PHY4_MS14', {
    sourceRef: 'P74',
    topic: 'molecularSpeed',
    difficulty: 2,
    params: { T: { min: 5, max: 25, step: 1 }, room: { min: 4, max: 8, step: 1 }, n: { min: 30, max: 50, step: 10 } },
    source: { params: { T: 12, room: 6, n: 40 }, answer: 0.50933399254989 },
    prompt: (p) =>
      `Calculate how much time in average it would take an oxygen molecule at ${fmt(p.T)}°C to move back and forth across a ${fmt(p.room)}-m-long room ${fmt(p.n)} times, passing in total ${fmt(p.room * p.n)} m distance. Molar mass of oxygen is 32 g/mol. The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric((p.room * p.n) / gas.rmsSpeed(toKelvin(p.T), 0.032), 's'),
    solution: (p, a) => steps('v_{rms}=\\sqrt{\\dfrac{3RT}{M}},\\quad t=\\dfrac{d}{v_{rms}}', ans('t', a, UNIT.s)),
  }),

  // ---------- Moles, mass & molecules ----------
  defineQuestion('PHY4_MM01', {
    sourceRef: 'P60',
    topic: 'moleculesMoles',
    difficulty: 2,
    params: { VmL: { min: 400, max: 600, step: 10 }, T: { min: 10, max: 25, step: 1 }, Patm: { min: 0.95, max: 1.05, step: 0.01 } },
    source: { params: { VmL: 490, T: 16, Patm: 1.02 }, answer: 1.2698e22 },
    prompt: (p) =>
      `Calculate the number of molecules in the air in one breath, with a volume of ${fmt(p.VmL)} mL, ${fmt(p.T)}°C and ${fmt(p.Patm)} atm. Boltzmann's constant kB = 1.38⋅10⁻²³ J/K. ${ATM_TEXT} 1 L = 0.001 m³`,
    compute: (p) => numeric((p.Patm * ATM * (p.VmL / 1e6)) / (KB * toKelvin(p.T)), ''),
    solution: (p, a) => steps('PV=Nk_BT \\Rightarrow N=\\dfrac{PV}{k_BT}', ans('N', a)),
  }),

  defineQuestion('PHY4_MM02', {
    sourceRef: 'P61',
    topic: 'moleculesMoles',
    difficulty: 2,
    params: { VmL: { min: 500, max: 650, step: 5 }, T: { min: 10, max: 20, step: 1 }, Patm: { min: 1, max: 1.1, step: 0.01 } },
    source: { params: { VmL: 585, T: 15, Patm: 1.05 }, answer: 0.0260057 },
    prompt: (p) =>
      `Calculate the number of moles of air in one breath, with a volume of ${fmt(p.VmL)} mL, at ${fmt(p.T)}° and ${fmt(p.Patm)} atm. The universal gas constant is R = 8.31 J/(mol K). ${ATM_TEXT}. 1 L = 0.001 m³.`,
    compute: (p) => numeric((p.Patm * ATM * (p.VmL / 1e6)) / (R * toKelvin(p.T)), 'mol'),
    solution: (p, a) => steps('n=\\dfrac{PV}{RT}', ans('n', a, UNIT.mol)),
  }),

  defineQuestion('PHY4_MM03', {
    sourceRef: 'P62',
    topic: 'moleculesMoles',
    difficulty: 3,
    params: { VmL: { min: 450, max: 550, step: 10 }, Patm: { min: 1, max: 1.1, step: 0.01 } },
    source: { params: { VmL: 510, Patm: 1.04 }, answer: 1.3451937424789 },
    prompt: (p) =>
      `Calculate the density of ${fmt(p.VmL)} mL air under ${fmt(p.Patm)} atm pressure at 0°C. In terms of molar fraction, air contains 78% N2, 21% O2, and 1% Ar molecules. Molar masses: MN2 = 28 g/mol, MO2 = 32 g/mol, and MAr = 40 g/mol. The universal gas constant is R = 8.31 J/(mol K). ${ATM_TEXT} 1 L = 0.001 m3`,
    compute: (p) => {
      const molarMass = 0.78 * 0.028 + 0.21 * 0.032 + 0.01 * 0.04
      return numeric((p.Patm * ATM * molarMass) / (R * toKelvin(0)), 'kg/m^3')
    },
    solution: (p, a) =>
      steps('M_{air}=\\sum x_iM_i,\\quad \\rho=\\dfrac{PM_{air}}{RT}', ans('\\rho', a, UNIT.kgm3), 'The volume given does not matter: the density of an ideal gas depends only on pressure, temperature and molar mass.'),
  }),

  defineQuestion('PHY4_MM04', {
    sourceRef: 'P63',
    topic: 'moleculesMoles',
    difficulty: 1,
    params: { n2: { min: 70, max: 80, step: 1 }, o2: { min: 15, max: 22, step: 0.5 } },
    source: { params: { n2: 76, o2: 18.5 }, answer: 29.4 },
    prompt: (p) =>
      `In terms of molar fraction, air contains ${fmt(p.n2)}% N₂, ${fmt(p.o2)}% O₂ and the remainder Ar. The molar masses are M(N2) = 28 g/mol, M(O2) = 32 g/mol and M(Ar) = 40 g/mol. What is the average molar mass of air?`,
    compute: (p) => numeric((p.n2 * 28 + p.o2 * 32 + (100 - p.n2 - p.o2) * 40) / 100, 'g/mol'),
    solution: (p, a) => steps('M_{avg}=\\sum x_iM_i', ans('M_{avg}', a, UNIT.gmol)),
  }),

  defineQuestion('PHY4_MM05', {
    sourceRef: 'P64',
    topic: 'moleculesMoles',
    difficulty: 1,
    params: { M: { min: 16, max: 44, step: 1 } },
    source: { params: { M: 32 }, answer: 5.3138492195284e-26 },
    prompt: (p) => `Find the mass of a molecule of the gas with molar mass ${fmt(p.M)} g/mol. ${AVOGADRO_TEXT}.`,
    compute: (p) => numeric(p.M / 1000 / NA, 'kg'),
    solution: (p, a) => steps('m=\\dfrac{M}{N_A}', ans('m', a, UNIT.kg)),
  }),

  defineQuestion('PHY4_MM06', {
    sourceRef: 'P65',
    topic: 'moleculesMoles',
    difficulty: 1,
    params: { m: { min: 20, max: 50, step: 0.5 }, M: { min: 18, max: 44, step: 0.5 } },
    source: { params: { m: 35.5, M: 22.5 }, answer: 9.50138e23 },
    prompt: (p) => `How many molecules are contained in ${fmt(p.m)} g of a gas whose molar mass is ${fmt(p.M)} g/mol? Avogadro's number N_A = 6.022×10²³ 1/mol.`,
    compute: (p) => numeric((p.m / p.M) * NA, ''),
    solution: (p, a) => steps('N=\\dfrac{m}{M}N_A', ans('N', a)),
  }),

  defineQuestion('PHY4_MM07', {
    sourceRef: 'P66',
    topic: 'moleculesMoles',
    difficulty: 1,
    params: { m21: { min: 1, max: 2, step: 0.1 } },
    source: { params: { m21: 1.3 }, answer: 782.86 },
    prompt: (p) => `A large organic molecule has a mass of ${sciText(p.m21, -21)} kg. What is the molar mass of this compound? ${AVOGADRO_TEXT}.`,
    compute: (p) => numeric(p.m21 * 1e-21 * NA, 'kg/mol'),
    solution: (p, a) => steps('M=mN_A', ans('M', a, UNIT.kgmol)),
  }),

  defineQuestion('PHY4_MM08', {
    sourceRef: 'P67',
    topic: 'moleculesMoles',
    difficulty: 2,
    params: { P7: { min: 1, max: 5, step: 0.1 }, T: { min: 20, max: 30, step: 1 } },
    source: { params: { P7: 1.9, T: 25 }, answer: 46180487 },
    prompt: (p) =>
      `A vacuum system can achieve a pressure of ${sciText(p.P7, -7)} N/m² at ${fmt(p.T)}°C. How many molecules are there in a cubic centimeter at given pressure and temperature? Avogadro's number NA = 6.022×10²³ 1/mol. The universal gas constant is R = 8.31 J/(mol K). Answer without units.`,
    compute: (p) => numeric((p.P7 * 1e-7 * NA) / (R * toKelvin(p.T)) * 1e-6, ''),
    solution: (p, a) => steps('\\dfrac{N}{V}=\\dfrac{PN_A}{RT}\\ (\\text{per m}^3),\\ \\ 1\\text{ cm}^3=10^{-6}\\text{ m}^3', ans('N', a)),
  }),

  defineQuestion('PHY4_MM09', {
    sourceRef: 'P68',
    topic: 'moleculesMoles',
    difficulty: 2,
    params: { P7: { min: 3, max: 6, step: 0.1 }, T: { min: 15, max: 25, step: 1 } },
    source: { params: { P7: 4.7, T: 20 }, answer: 1.93032e-10 },
    prompt: (p) =>
      `A vacuum system can achieve a pressure of ${sciText(p.P7, -7)} N/m² at ${fmt(p.T)}°. How many moles of gas are there in one cubic metre at this pressure and temperature? The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric((p.P7 * 1e-7) / (R * toKelvin(p.T)), 'mol'),
    solution: (p, a) => steps('n=\\dfrac{PV}{RT},\\ V=1\\text{ m}^3', ans('n', a, UNIT.mol)),
  }),

  // ---------- Ideal gas law ----------
  defineQuestion('PHY4_GL01', {
    sourceRef: 'P40',
    topic: 'gasLaws',
    difficulty: 3,
    params: { depth: { min: 20, max: 35, step: 1 }, V1: { min: 1, max: 2, step: 0.1 }, T1: { min: 4, max: 8, step: 0.5 }, T2: { min: 15, max: 20, step: 0.5 } },
    source: { params: { depth: 27, V1: 1.4, T1: 5.5, T2: 17.5 }, answer: 0.010790234882701 },
    prompt: (p) =>
      `An air bubble at the bottom of a lake ${fmt(p.depth)} m deep has a volume of ${fmt(p.V1)} cm³. If the temperature at the bottom is ${fmt(p.T1)}°C and the top ${fmt(p.T2)}°C, what is the radius of the bubble just before it reaches the surface? Normal atmosphere pressure P0 = 101325 Pa. Density of water ρwater = 997 kg/m³. Gravitational acceleration g = 9.8 m/s².`,
    compute: (p) => {
      const V2 = gas.bubbleVolumeAtSurface(p.V1 * 1e-6, p.depth, 997, 9.8, ATM, toKelvin(p.T1), toKelvin(p.T2))
      return numeric(gas.sphereRadius(V2), 'm')
    },
    solution: (p, a) =>
      steps('P_1=P_0+\\rho gh,\\quad \\dfrac{P_1V_1}{T_1}=\\dfrac{P_0V_2}{T_2} \\Rightarrow V_2,\\quad r=\\left(\\dfrac{3V_2}{4\\pi}\\right)^{1/3}', ans('r', a, UNIT.m), 'At the bottom the bubble is at atmospheric pressure plus the water pressure ρgh; at the surface only atmospheric pressure.'),
  }),

  defineQuestion('PHY4_GL02', {
    sourceRef: 'P41',
    topic: 'gasLaws',
    difficulty: 3,
    params: { depth: { min: 25, max: 35, step: 1 }, V1: { min: 1.2, max: 2, step: 0.1 }, T1: { min: 4, max: 8, step: 1 }, T2: { min: 14, max: 18, step: 1 } },
    source: { params: { depth: 29, V1: 1.7, T1: 6, T2: 16 }, answer: 6.68524 },
    prompt: (p) =>
      `An air bubble at the bottom of a lake ${fmt(p.depth)} m deep has a volume of ${fmt(p.V1)} cm³. The temperature at the bottom is ${fmt(p.T1)}° and at the top ${fmt(p.T2)}°. What is the volume of the bubble just before it reaches the surface? Atmospheric pressure is 101325 Pa, the density of water is 997 kg/m³ and g = 9.8 m/s².`,
    compute: (p) => numeric(gas.bubbleVolumeAtSurface(p.V1, p.depth, 997, 9.8, ATM, toKelvin(p.T1), toKelvin(p.T2)), 'cm^3'),
    solution: (p, a) => steps('V_2=V_1\\,\\dfrac{P_0+\\rho gh}{P_0}\\,\\dfrac{T_2}{T_1}', ans('V_2', a, UNIT.cm3)),
  }),

  defineQuestion('PHY4_GL03', {
    sourceRef: 'P46',
    topic: 'gasLaws',
    difficulty: 1,
    params: { V: { min: 20, max: 30, step: 0.1 }, n: { min: 10, max: 15, step: 0.5 }, P: { min: 180000, max: 230000, step: 1000 } },
    source: { params: { V: 24.2, n: 13.5, P: 207000 }, answer: 44.653 },
    prompt: (p) =>
      `A spherical ${fmt(p.V)}-liter balloon contains ${fmt(p.n)} mol of oxygen gas at a pressure of ${fmt(p.P)} Pa. Find the temperature of the gas in the balloon. The universal gas constant is R = 8.31 J/(mol K). 1 L = 0.001 m³.`,
    compute: (p) => numeric(gas.idealTemperature(p.P, p.V / 1000, p.n), 'K'),
    solution: (p, a) => steps('T=\\dfrac{PV}{nR}', ans('T', a, UNIT.K)),
  }),

  defineQuestion('PHY4_GL04', {
    sourceRef: 'P48',
    topic: 'gasLaws',
    difficulty: 1,
    params: { V: { min: 7, max: 10, step: 0.1 }, n: { min: 1.5, max: 2.5, step: 0.1 }, Patm: { min: 4, max: 6, step: 0.1 } },
    source: { params: { V: 8.5, n: 1.9, Patm: 4.8 }, answer: 261.832 },
    prompt: (p) =>
      `An ${fmt(p.V)}-liter container is filled with ${fmt(p.n)} mol of argon gas at a pressure of ${fmt(p.Patm)} atm. Find the temperature of the gas. The universal gas constant is R = 8.31 J/(mol K). 1 atm = 101325 Pa. 1 L = 0.001 m³.`,
    compute: (p) => numeric(gas.idealTemperature(p.Patm * ATM, p.V / 1000, p.n), 'K'),
    solution: (p, a) => steps('T=\\dfrac{PV}{nR}', ans('T', a, UNIT.K)),
  }),

  defineQuestion('PHY4_GL05', {
    sourceRef: 'P54',
    topic: 'gasLaws',
    difficulty: 2,
    params: { n: { min: 1.5, max: 2.5, step: 0.01 }, rcm: { min: 1.5, max: 2.5, step: 0.1 } },
    source: { params: { n: 1.87, rcm: 1.8 }, answer: 10.52 },
    prompt: (p) =>
      `A vertical cylindrical tank contains ${fmt(p.n)} mol of an ideal gas under a pressure of 1 atm at 20°C. The round part of the tank has a radius of ${fmt(p.rcm)} cm, and the gas is supporting a piston that can move up and down in the cylinder without friction. What is the mass of this piston? Assume a vacuum in the tank above the piston. Pressure 1 atm = 101325 Pa and gravitational acceleration g = 9.8 m/s². The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric((ATM * Math.PI * (p.rcm / 100) ** 2) / 9.8, 'kg'),
    solution: (p, a) =>
      steps('PA=mg \\Rightarrow m=\\dfrac{P\\pi r^2}{g}', ans('m', a, UNIT.kg), 'With vacuum above, the gas pressure alone holds up the piston\'s weight.'),
  }),

  defineQuestion('PHY4_GL06', {
    sourceRef: 'P55',
    topic: 'gasLaws',
    difficulty: 2,
    params: { n: { min: 1.5, max: 2, step: 0.01 }, rcm: { min: 8, max: 12, step: 0.1 } },
    source: { params: { n: 1.73, rcm: 10.2 }, answer: 1.2718852142085 },
    prompt: (p) =>
      `A vertical cylindrical tank contains ${fmt(p.n)} mol of an ideal gas under a pressure of 1 atm at 20°C. The round part of the tank has a radius of ${fmt(p.rcm)} cm, and the gas is supporting a piston that can move up and down in the cylinder without friction. How tall is the column of gas that is supporting the piston? Assume a vacuum in the tank above the piston. Pressure 1 atm = 101325 Pa and the universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(((p.n * R * toKelvin(20)) / ATM) / (Math.PI * (p.rcm / 100) ** 2), 'm'),
    solution: (p, a) => steps('V=\\dfrac{nRT}{P},\\quad h=\\dfrac{V}{\\pi r^2}', ans('h', a, UNIT.m)),
  }),

  defineQuestion('PHY4_GL07', {
    sourceRef: 'P56',
    topic: 'gasLaws',
    difficulty: 3,
    params: { VL: { min: 1, max: 2, step: 0.01 }, T1: { min: 290, max: 300, step: 1 }, T2: { min: 380, max: 400, step: 1 } },
    source: { params: { VL: 1.29, T1: 295, T2: 388 }, answer: 77038.337628866 },
    prompt: (p) =>
      `A flask with a volume of ${fmt(p.VL)} L, provided with a stopcock, contains ethane gas at ${fmt(p.T1)} K and atmospheric pressure 1.01325×10⁵ Pa. The molar mass of ethane is 30.1 g/mol. The system is warmed to a temperature of ${fmt(p.T2)} K, with the stopcock open to the atmosphere. The stopcock is then closed, and the flask is cooled to its original temperature. What is the final pressure of the ethane in the flask? 1 L = 0.001 m³.`,
    compute: (p) => numeric((ATM * p.T1) / p.T2, 'Pa'),
    solution: (p, a) =>
      steps('P_f=P_0\\dfrac{T_1}{T_2}', ans('P_f', a, UNIT.Pa), 'While the stopcock is open the pressure stays at P₀ and gas escapes; after it is closed the amount of gas is fixed (at P₀, T₂) and the volume is constant, so the pressure scales with T.'),
  }),

  defineQuestion('PHY4_GL08', {
    sourceRef: 'P57',
    topic: 'gasLaws',
    difficulty: 3,
    params: { VL: { min: 1, max: 2, step: 0.1 }, T1: { min: 285, max: 295, step: 1 }, T2: { min: 380, max: 390, step: 1 } },
    source: { params: { VL: 1.4, T1: 290, T2: 385 }, answer: 0.00133459 },
    prompt: (p) =>
      `A flask with a volume of ${fmt(p.VL)} L, provided with a stopcock, contains ethane gas at ${fmt(p.T1)} K and atmospheric pressure 1.01325×10⁵ Pa. The molar mass of ethane is 30.1 g/mol. The system is warmed to a temperature of ${fmt(p.T2)} K, with the stopcock open to the atmosphere. The stopcock is then closed, and the flask is cooled to its original temperature. Find the mass of ethane remaining in the flask. 1 L = 0.001 m³. The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(((ATM * (p.VL / 1000)) / (R * p.T2)) * 0.0301, 'kg'),
    solution: (p, a) =>
      steps('n=\\dfrac{P_0V}{RT_2},\\quad m=nM', ans('m', a, UNIT.kg), 'The gas that remains is whatever was left in the flask at the highest temperature when the stopcock was closed.'),
  }),

  defineQuestion('PHY4_GL09', {
    sourceRef: 'P58',
    topic: 'gasLaws',
    difficulty: 3,
    params: { m: { min: 0.1, max: 0.2, step: 0.005 }, T0: { min: 18, max: 26, step: 1 }, Q: { min: 250, max: 320, step: 2 } },
    source: { params: { m: 0.155, T0: 22, Q: 284 }, answer: 314.4500789 },
    prompt: (p) =>
      `A sample of ${fmt(p.m)} kg of xenon is contained in a rigid metal cylinder, big enough that the xenon can be modeled as an ideal monatomic gas, at a temperature of ${fmt(p.T0)}°C. The cylinder is moved outside on a hot summer day. As the xenon comes into equilibrium by reaching the temperature of its surrounding, ${fmt(p.Q)} J of heat is conducted to it through the cylinder walls. What is the equilibrium temperature? Ignore the expansion of the metal cylinder. The universal gas constant is R = 8.31 J/(mol K). Answer in kelvins (K). Molar mass of xenon M = 131.3 g/mol.`,
    compute: (p) => numeric(toKelvin(p.T0) + p.Q / ((p.m / 0.1313) * 1.5 * R), 'K'),
    solution: (p, a) =>
      steps('Q=nC_V\\Delta T=n\\cdot\\tfrac32R\\,\\Delta T,\\ n=\\dfrac{m}{M}', ans('T_f', a, UNIT.K), 'The cylinder is rigid, so the heat goes entirely into internal energy at constant volume.'),
  }),

  defineQuestion('PHY4_GL10', {
    sourceRef: 'P59',
    topic: 'gasLaws',
    difficulty: 2,
    params: { V1: { min: 0.14, max: 0.16, step: 0.001 }, T1: { min: 0, max: 10, step: 1 }, Patm: { min: 2, max: 2.5, step: 0.1 }, T2: { min: 35, max: 45, step: 1 }, V2: { min: 0.155, max: 0.17, step: 0.001 } },
    source: { params: { V1: 0.151, T1: 5, Patm: 2.2, T2: 41, V2: 0.16 }, answer: 237604.27904795 },
    prompt: (p) =>
      `An automobile tire has a volume of ${fmt(p.V1)} m³ on a cold day when the temperature of the air in the tire is ${fmt(p.T1)}°C and the pressure is ${fmt(p.Patm)} atm. After the car is driven on the highway, the temperature of the air in the tires has risen to ${fmt(p.T2)}°C and the volume has risen to ${fmt(p.V2)} m³. What then is the pressure? Normal atmosphere pressure P0 = 101325 Pa.`,
    compute: (p) => numeric((p.Patm * ATM * p.V1 * toKelvin(p.T2)) / (toKelvin(p.T1) * p.V2), 'Pa'),
    solution: (p, a) => steps('\\dfrac{P_1V_1}{T_1}=\\dfrac{P_2V_2}{T_2} \\Rightarrow P_2=P_1\\dfrac{V_1}{V_2}\\dfrac{T_2}{T_1}', ans('P_2', a, UNIT.Pa)),
  }),

  defineQuestion('PHY4_GL11', {
    sourceRef: 'P70',
    topic: 'gasLaws',
    difficulty: 1,
    params: { P1: { min: 100000, max: 110000, step: 100 }, m1: { min: 20, max: 30, step: 0.1 }, add: { min: 28, max: 38, step: 0.1 } },
    source: { params: { P1: 104712, m1: 26.2, add: 32.9 }, answer: 236201.49618321 },
    prompt: (p) =>
      `A storage tank at pressure of ${fmt(p.P1)} Pa contains ${fmt(p.m1)} kg of diatomic nitrogen. What is the pressure if an additional ${fmt(p.add)} kg of nitrogen is added without changing the temperature? Molar mass of diatomic nitrogen is MN2 = 28 g/mol.`,
    compute: (p) => numeric((p.P1 * (p.m1 + p.add)) / p.m1, 'Pa'),
    solution: (p, a) => steps('P=\\dfrac{nRT}{V}\\propto m \\Rightarrow P_2=P_1\\dfrac{m_1+\\Delta m}{m_1}', ans('P_2', a, UNIT.Pa)),
  }),

  defineQuestion('PHY4_GL12', {
    sourceRef: 'P71',
    topic: 'gasLaws',
    difficulty: 1,
    params: { P1: { min: 100000, max: 110000, step: 100 }, m1: { min: 20, max: 28, step: 0.1 }, P2: { min: 200000, max: 220000, step: 1000 } },
    source: { params: { P1: 105500, m1: 23.6, P2: 213000 }, answer: 24.0474 },
    prompt: (p) =>
      `A storage tank at a pressure of ${fmt(p.P1)} Pa contains ${fmt(p.m1)} kg of diatomic nitrogen. How much additional nitrogen must be added, without changing the temperature or the volume, to raise the pressure to ${fmt(p.P2)} Pa? Molar mass of diatomic nitrogen is 28 g/mol.`,
    compute: (p) => numeric(p.m1 * (p.P2 / p.P1 - 1), 'kg'),
    solution: (p, a) => steps('P\\propto m \\Rightarrow \\Delta m=m_1\\left(\\dfrac{P_2}{P_1}-1\\right)', ans('\\Delta m', a, UNIT.kg)),
  }),

  defineQuestion('PHY4_GL13', {
    sourceRef: 'P75',
    topic: 'gasLaws',
    difficulty: 2,
    params: { VL: { min: 35, max: 45, step: 1 }, m: { min: 90, max: 120, step: 1 }, T: { min: 20, max: 30, step: 1 } },
    source: { params: { VL: 39, m: 108, T: 26 }, answer: 172103296.1538 },
    prompt: (p) =>
      `What is the pressure inside a ${fmt(p.VL)} L container holding ${fmt(p.m)} kg of argon gas at ${fmt(p.T)}°C? Molar mass of argon is MAr = 40 g/mol. The universal gas constant is R = 8.31 J/(mol K).`,
    compute: (p) => numeric(((p.m / 0.04) * R * toKelvin(p.T)) / (p.VL / 1000), 'Pa'),
    solution: (p, a) => steps('n=\\dfrac{m}{M},\\quad P=\\dfrac{nRT}{V}', ans('P', a, UNIT.Pa)),
  }),

  defineQuestion('PHY4_GL14', {
    sourceRef: 'P76',
    topic: 'gasLaws',
    difficulty: 2,
    params: { VL: { min: 30, max: 40, step: 0.1 }, m: { min: 100, max: 130, step: 1 }, P6: { min: 150, max: 190, step: 1 } },
    source: { params: { VL: 34.5, m: 117, P6: 172 }, answer: 244.13 },
    prompt: (p) =>
      `What is the temperature inside a ${fmt(p.VL)} L container holding ${fmt(p.m)} kg of argon gas at a pressure of ${fmt(p.P6)}×10⁶ Pa? Molar mass of argon is 40 g/mol. The universal gas constant is R = 8.31 J/(mol K). 1 L = 0.001 m³.`,
    compute: (p) => numeric(gas.idealTemperature(p.P6 * 1e6, p.VL / 1000, p.m / 0.04), 'K'),
    solution: (p, a) => steps('n=\\dfrac{m}{M},\\quad T=\\dfrac{PV}{nR}', ans('T', a, UNIT.K)),
  }),
]
