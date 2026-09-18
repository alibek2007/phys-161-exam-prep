/** Work-energy topic: constant forces, friction, springs. */

/** Work by a constant force F at angle theta above the direction of displacement d. */
export function workConstantForce(F: number, thetaRad: number, d: number): number {
  return F * Math.cos(thetaRad) * d
}

/** Work by kinetic friction (always negative) on an incline, normal force N = mg cos(theta). */
export function workFrictionIncline(mu: number, m: number, g: number, thetaRad: number, d: number): number {
  return -mu * m * g * Math.cos(thetaRad) * d
}

/** Spring potential energy stored at extension/compression x. */
export function springPE(k: number, x: number): number {
  return 0.5 * k * x * x
}

/** Speed of a block of mass m launched from a spring (k, compression x) with no other energy loss. */
export function speedFromSpring(k: number, x: number, m: number): number {
  return x * Math.sqrt(k / m)
}
