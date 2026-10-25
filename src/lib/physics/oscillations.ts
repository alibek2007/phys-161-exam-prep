/** Simple harmonic motion, pendulums, springs, damped and driven oscillators. SI units. */

const TWO_PI = 2 * Math.PI

export const pendulumG = (L: number, T: number) => (4 * Math.PI * Math.PI * L) / (T * T)
export const pendulumLength = (g: number, T: number) => (g * T * T) / (4 * Math.PI * Math.PI)
export const pendulumPeriod = (L: number, g: number) => TWO_PI * Math.sqrt(L / g)
export const pendulumFrequency = (L: number, g: number) => Math.sqrt(g / L) / TWO_PI

export const springPeriod = (m: number, k: number) => TWO_PI * Math.sqrt(m / k)
export const springFrequency = (m: number, k: number) => Math.sqrt(k / m) / TWO_PI
export const springConstantFromPeriod = (m: number, T: number) => (4 * Math.PI * Math.PI * m) / (T * T)

/** SHM with amplitude A: angular frequency from a (speed, displacement) sample. */
export const omegaFromSample = (A: number, x: number, v: number) => v / Math.sqrt(A * A - x * x)

/** Energy fraction after n cycles when the amplitude shrinks by `ratio` each cycle. */
export const cyclesForEnergyFraction = (ratio: number, fraction: number) => Math.log(fraction) / (2 * Math.log(ratio))

export const dampedAngularFrequency = (m: number, k: number, b: number) => Math.sqrt(k / m - (b / (2 * m)) ** 2)
export const amplitudeLossPerCycle = (m: number, k: number, b: number) => {
  const gamma = b / (2 * m)
  const period = TWO_PI / dampedAngularFrequency(m, k, b)
  return 1 - Math.exp(-gamma * period)
}

/** Forced undamped oscillator: amplitude A = (F0/m) / |w0² − w²|. */
export const drivingForceAmplitude = (m: number, k: number, driveFreqHz: number, A: number) => {
  const w0sq = k / m
  const w = TWO_PI * driveFreqHz
  return m * Math.abs(w0sq - w * w) * A
}
