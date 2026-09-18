/** Impulse, collisions, and conservation of linear momentum. */

export function momentum(m: number, v: number): number {
  return m * v
}

/** Impulse magnitude for a ball bouncing straight back elastically (speed unchanged): 2mv. */
export function impulseElasticBounce(m: number, v: number): number {
  return 2 * m * v
}

/** Impulse for a ball hitting a surface at angle theta from the normal, rebounding at the same angle/speed. */
export function impulseObliqueBounce(m: number, v: number, thetaFromNormalRad: number): number {
  return 2 * m * v * Math.cos(thetaFromNormalRad)
}

/** Average force from a stream of particles (mass m each, rate per second) bouncing straight back elastically. */
export function streamForceBounce(m: number, ratePerSec: number, v: number): number {
  return m * ratePerSec * 2 * v
}

/** Average force from a stream of particles (mass m each, rate per second) that embed (stop) on impact. */
export function streamForceEmbed(m: number, ratePerSec: number, v: number): number {
  return m * ratePerSec * v
}

/** Impulse delivered to a ball dropped from h1, rebounding to h2 (vertical bounce off a surface). */
export function impulseDropBounce(m: number, h1: number, h2: number, g: number): number {
  const vDown = Math.sqrt(2 * g * h1)
  const vUp = Math.sqrt(2 * g * h2)
  return m * (vDown + vUp)
}

/** Perfectly inelastic collision: final speed of combined mass m1 (moving v1) striking stationary m2. */
export function inelasticFinalSpeed(m1: number, v1: number, m2: number): number {
  return (m1 * v1) / (m1 + m2)
}

/** Kinetic energy lost in a perfectly inelastic collision (m1 at v1 strikes stationary m2). */
export function inelasticEnergyLoss(m1: number, v1: number, m2: number): number {
  const vf = inelasticFinalSpeed(m1, v1, m2)
  return 0.5 * m1 * v1 * v1 - 0.5 * (m1 + m2) * vf * vf
}

/** Elastic collision: speed of initially-stationary m2 after being struck by m1 (moving v1). */
export function elasticFinalSpeedM2(m1: number, v1: number, m2: number): number {
  return (2 * m1 * v1) / (m1 + m2)
}

/** Elastic collision: speed of m1 (moving v1) after striking stationary m2. */
export function elasticFinalSpeedM1(m1: number, v1: number, m2: number): number {
  return ((m1 - m2) / (m1 + m2)) * v1
}

/**
 * Two blocks (m1, m2) held together compressing a spring (k) by d, released from rest on a
 * frictionless surface. Momentum conservation + energy release gives the speed of whichever
 * block's mass is passed as `mSelf` (the other block's mass is `mOther`).
 */
export function springLaunchSpeed(k: number, d: number, mSelf: number, mOther: number): number {
  return d * Math.sqrt((k * mOther) / (mSelf * (mSelf + mOther)))
}

/** Speed of an object thrown backward from a moving system (astronaut discarding a power pack). */
export function throwRecoilSpeed(totalMassBefore: number, vBefore: number, thrownMass: number, thrownSpeed: number): number {
  const remaining = totalMassBefore - thrownMass
  return (totalMassBefore * vBefore - thrownMass * thrownSpeed) / remaining
}

/** Landing distance of the heavier fragment after an explosion splits a mass 1:3 (momentum conservation, equal fall time). */
export function explosionHeavyLanding(lightLanding: number, massRatioHeavyToLight: number): number {
  return lightLanding / massRatioHeavyToLight
}

/** Speed of the momentum component along one axis, given total momentum magnitude and the angle from that axis. */
export function momentumComponentSpeed(pTotal: number, angleFromAxisRad: number, mass: number): number {
  return (pTotal * Math.cos(angleFromAxisRad)) / mass
}
