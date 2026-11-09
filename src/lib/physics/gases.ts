/** Ideal gas, kinetic theory and gas processes. SI units. */

export const ATM = 101325
export const R_GAS = 8.31
export const K_BOLTZMANN = 1.38e-23
export const N_AVOGADRO = 6.022e23

export const idealTemperature = (P: number, V: number, n: number) => (P * V) / (n * R_GAS)
export const rmsSpeed = (T: number, molarMass: number) => Math.sqrt((3 * R_GAS * T) / molarMass)
export const temperatureFromRms = (v: number, molarMass: number) => (molarMass * v * v) / (3 * R_GAS)
export const meanKineticEnergy = (T: number) => 1.5 * K_BOLTZMANN * T

/** Air bubble rising from depth h: ratio P1 T2 / (P0 T1) times the initial volume. */
export const bubbleVolumeAtSurface = (V1: number, depth: number, rho: number, g: number, P0: number, T1: number, T2: number) =>
  (V1 * (P0 + rho * g * depth) * T2) / (P0 * T1)

export const sphereRadius = (volume: number) => Math.cbrt((3 * volume) / (4 * Math.PI))

/** Adiabatic compression by volume ratio r = V1/V2. */
export const adiabaticTemperature = (T1: number, ratio: number, gamma: number) => T1 * ratio ** (gamma - 1)
export const adiabaticPressure = (P1: number, ratio: number, gamma: number) => P1 * ratio ** gamma
export const adiabaticWorkOnGas = (P1: number, V1: number, ratio: number, gamma: number) => (P1 * V1 * (ratio ** (gamma - 1) - 1)) / (gamma - 1)
