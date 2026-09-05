/** Unit conversion constants and helpers used across the "Units" topic. */

export const CM3_PER_L = 1000
export const CM_PER_IN = 2.54
export const M_PER_FT = 0.3048
export const M2_PER_HECTARE = 10000
export const FT2_PER_ACRE = 43600
export const SPEED_OF_LIGHT_M_S = 3e8

/** Radius of a sphere with given mass (g) and density (g/cm^3). Returns radius in cm. */
export function sphereRadiusFromMassDensity(massG: number, densityGPerCm3: number): number {
  const volumeCm3 = massG / densityGPerCm3
  return Math.cbrt((3 * volumeCm3) / (4 * Math.PI))
}

/** Density (g/cm^3) of a sphere with given mass (g) and radius (cm). */
export function sphereDensityFromMassRadius(massG: number, radiusCm: number): number {
  const volumeCm3 = (4 / 3) * Math.PI * radiusCm ** 3
  return massG / volumeCm3
}

export function litersToCubicInches(liters: number): number {
  return (liters * CM3_PER_L) / CM_PER_IN ** 3
}

export function cubicInchesToLiters(cubicInches: number): number {
  return (cubicInches * CM_PER_IN ** 3) / CM3_PER_L
}

export function acresToHectares(acres: number): number {
  const m2PerAcre = FT2_PER_ACRE * M_PER_FT ** 2
  return (acres * m2PerAcre) / M2_PER_HECTARE
}

/** Total volume of air (m^3) breathed by `people` breathing `cm3PerBreath` at `breathsPerMin`, over `days`. */
export function totalBreathVolumeM3(
  people: number,
  cm3PerBreath: number,
  breathsPerMin: number,
  days: number,
): number {
  const minutes = days * 24 * 60
  const totalCm3 = people * breathsPerMin * minutes * cm3PerBreath
  return totalCm3 / 1e6
}

/** Days to breathe a total volume equal to a sphere's internal volume (radius in m). */
export function daysToFillSphere(
  radiusM: number,
  people: number,
  cm3PerBreath: number,
  breathsPerMin: number,
): number {
  const volumeM3 = (4 / 3) * Math.PI * radiusM ** 3
  const rateM3PerMin = (people * breathsPerMin * cm3PerBreath) / 1e6
  return volumeM3 / (rateM3PerMin * 24 * 60)
}
