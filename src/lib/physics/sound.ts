/** Sound: intensity, Doppler shifts, beats, pipes. SI units. */

export const REFERENCE_INTENSITY = 1e-12

export const intensityFromPressure = (p: number, rho: number, v: number) => (p * p) / (2 * rho * v)
export const levelFromIntensity = (I: number) => 10 * Math.log10(I / REFERENCE_INTENSITY)
export const intensityFromLevel = (dB: number) => REFERENCE_INTENSITY * 10 ** (dB / 10)

/** Observer approaching (+) or receding (−) from a source at rest. */
export const observerShift = (f: number, v: number, observerSpeed: number) => (f * (v + observerSpeed)) / v
/** Source moving toward (+) or away (−) from a stationary observer. */
export const sourceShift = (f: number, v: number, sourceSpeed: number) => (f * v) / (v - sourceSpeed)
/** Echo off a stationary wall (or from a target) for a source approaching at speed u. */
export const echoBeat = (f: number, v: number, u: number) => (2 * f * u) / (v - u)

/** Open-open pipe harmonic n: f = n v / 2L. Closed-open: odd n, f = n v / 4L. */
export const openPipeFrequency = (n: number, v: number, L: number) => (n * v) / (2 * L)
export const closedPipeFrequency = (n: number, v: number, L: number) => (n * v) / (4 * L)

/** Speed of the plane whose sonic boom arrives `t` after it passes overhead at altitude h. */
export const boomSpeed = (vSound: number, t: number, h: number) => vSound / Math.sqrt(1 - ((vSound * t) / h) ** 2)

export const maxSourceSpeed = (amplitude: number, freqHz: number) => 2 * Math.PI * freqHz * amplitude
