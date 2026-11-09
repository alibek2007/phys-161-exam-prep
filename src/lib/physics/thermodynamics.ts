/** Heat engines, refrigerators and entropy. */

import { R_GAS } from './gases'

export const carnotEfficiency = (Tc: number, Th: number) => 1 - Tc / Th
export const refrigeratorCop = (Tc: number, Th: number) => Tc / (Th - Tc)

/** Entropy change of a body whose temperature changes from Ti to Tf (constant heat capacity m·c). */
export const entropyOfHeating = (heatCapacity: number, Ti: number, Tf: number) => heatCapacity * Math.log(Tf / Ti)

/** Monatomic ideal gas heat capacities. */
export const CV_MONATOMIC = 1.5 * R_GAS
export const CP_MONATOMIC = 2.5 * R_GAS
