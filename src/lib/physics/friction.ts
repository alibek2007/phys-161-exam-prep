/** Specialized friction-system formulas (block+pulley+hanging-mass families). */

/**
 * A hanging mass m2 is slowly increased until the system (block m1 on a horizontal surface,
 * connected over a pulley to m2) just starts to accelerate at rate `a`. Returns mu_s - mu_k.
 */
export function staticKineticFrictionDiff(a: number, m1: number, m2: number, g: number): number {
  return (a * (m1 + m2)) / (m1 * g)
}

/**
 * Force F applied at angle theta above horizontal to block m1 (on a horizontal surface with
 * kinetic friction mu), connected over a pulley to a hanging mass m2. Returns the system's
 * acceleration (m2 moving down, m1 being dragged toward the pulley).
 */
export function accelForceAtAngleWithHangingMass(
  F: number,
  thetaRad: number,
  m1: number,
  m2: number,
  mu: number,
  g: number,
): number {
  const N = m1 * g - F * Math.sin(thetaRad)
  const friction = mu * Math.max(N, 0)
  return (F * Math.cos(thetaRad) - friction - m2 * g) / (m1 + m2)
}

/**
 * Block m1 is pressed horizontally against the vertical face of block m2 (frictionless floor
 * beneath m2, static friction mu between the blocks). Minimum force F to keep m1 from sliding down.
 */
export function minForceBlockAgainstBlock(m1: number, m2: number, mu: number, g: number): number {
  return (m1 * g * (m1 + m2)) / (mu * m2)
}
