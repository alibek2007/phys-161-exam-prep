/** Heat, thermal expansion, calorimetry and conduction. SI units unless noted. */

export const ZERO_CELSIUS = 273.15
export const toKelvin = (celsius: number) => celsius + ZERO_CELSIUS

export const C_WATER = 4186
export const L_FUSION = 334000

/** Bar of fixed span L that buckles upward in the middle: height of the apex after heating by dT. */
export const buckleHeight = (L: number, alpha: number, dT: number) => (L / 2) * Math.sqrt((1 + alpha * dT) ** 2 - 1)

/** Bowl + soup (treated as water) at T0 (°C) loses Q (J); final temperature in kelvin, passing through freezing. */
export function frozenFinalTemperatureK(
  mBowl: number, cBowl: number, mSoup: number, T0C: number, Q: number, cWater: number, cIce: number, Lf: number,
): number {
  const coolToZero = (mBowl * cBowl + mSoup * cWater) * T0C
  const freeze = mSoup * Lf
  const remaining = Q - coolToZero - freeze
  return toKelvin(-remaining / (mBowl * cBowl + mSoup * cIce))
}

/** Heat released when water at TwC cools to 0 °C. */
export const heatToZero = (mWater: number, TwC: number, cWater = C_WATER) => mWater * cWater * TwC

/** Heat to take steam at TsC all the way to ice at 0 °C. */
export const steamToIceHeat = (m: number, TsC: number, cSteam: number, cWater: number, Lv: number, Lf: number) =>
  m * (cSteam * (TsC - 100) + Lv + cWater * 100 + Lf)

/** Steady conduction rate through a slab. */
export const conductionRate = (k: number, A: number, dT: number, d: number) => (k * A * dT) / d

/** Junction temperature (°C) where a hot rod splits into two cold rods: heat in = heat out. */
export function yJunctionTemperature(kc: number, Lc: number, kb: number, Lb: number, ks: number, Ls: number, Thot: number, Tcold: number): number {
  const gc = kc / Lc
  const gb = kb / Lb
  const gs = ks / Ls
  return (gc * Thot + (gb + gs) * Tcold) / (gc + gb + gs)
}
