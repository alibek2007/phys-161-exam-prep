/** Mechanical waves on strings, in fluids and bars, interference and standing waves. SI units. */

export const GRAVITY = 9.8

export const stringSpeed = (T: number, mass: number, length: number) => Math.sqrt((T * length) / mass)
export const linearDensity = (mass: number, length: number) => mass / length
export const fluidSpeed = (B: number, rho: number) => Math.sqrt(B / rho)

/** Path difference from the second megaphone for a listener directly in front of the first. */
export const megaphonePathDifference = (x: number, L: number) => Math.hypot(L, x) - L

/** Nylon string with cross-section A0(1 + x/L): travel time of a pulse along its length. */
export const taperedStringTravelTime = (T: number, L: number, rho: number, A0: number) =>
  Math.sqrt((rho * A0) / T) * L * (2 / 3) * (2 ** 1.5 - 1)

export const harmonicWaveAngularFrequency = (v: number, wavelength: number) => (2 * Math.PI * v) / wavelength
export const harmonicWaveNumber = (wavelength: number) => (2 * Math.PI) / wavelength

/** Average power of a sinusoidal wave on a string. */
export const stringWavePower = (mu: number, omega: number, A: number, v: number) => 0.5 * mu * omega * omega * A * A * v

/** Fixed-fixed string: speed from the fundamental, tension from frequency. */
export const speedFromFundamental = (L: number, f1: number) => 2 * L * f1
export const tensionFromFundamental = (mu: number, L: number, f1: number) => mu * (2 * L * f1) ** 2

/** Wire holding two posts of weight W leaning at angle theta above the ground (horizontal wire, pivots at the base). */
export const postWireTension = (W: number, thetaRad: number) => W / (2 * Math.tan(thetaRad))

/** Horizontal beam of weight W hung by two wires; the center of gravity is a fraction `fromA` of the way from A to B. */
export const beamWireTensions = (W: number, fromA: number) => ({ A: W * (1 - fromA), B: W * fromA })
export const wirePulseTime = (L: number, wireWeight: number, tension: number) => Math.sqrt((L * wireWeight) / (GRAVITY * tension))
export const wireFundamental = (L: number, wireWeight: number, tension: number) => Math.sqrt((tension * GRAVITY * L) / wireWeight) / (2 * L)
