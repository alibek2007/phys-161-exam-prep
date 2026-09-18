/** Kinetic/potential energy and energy-conservation topic. */

export function kineticEnergy(m: number, v: number): number {
  return 0.5 * m * v * v
}

export function speedFromKineticEnergy(KE: number, m: number): number {
  return Math.sqrt((2 * KE) / m)
}

export function gravPE(m: number, g: number, h: number): number {
  return m * g * h
}

/** Free-fall speed after dropping height h from rest. */
export function speedFromFreeFall(h: number, g: number): number {
  return Math.sqrt(2 * g * h)
}

/**
 * Atwood machine (two masses over a frictionless pulley) released from rest; after the heavier
 * mass (m1) descends height h it has speed v. Solves for m1 given total mass M = m1 + m2.
 */
export function atwoodHeavierMass(v: number, h: number, M: number, g: number): number {
  return ((0.5 * M * v * v) / (g * h) + M) / 2
}

/** Block+spring on a horizontal surface with friction: block slides total distance D to rest
 * after spring energy E is released. Speed when it has moved distance d (d < D) from the start. */
export function speedAlongFrictionSlide(E: number, D: number, d: number, m: number): number {
  return Math.sqrt((2 * E * (1 - d / D)) / m)
}

/** Coefficient of kinetic friction from spring energy E fully dissipated over stopping distance D. */
export function muFromFrictionStop(E: number, D: number, m: number, g: number): number {
  return E / (m * g * D)
}

/** Fractional energy loss (of a bouncing ball) between drop height h1 and rebound height h2. */
export function bounceEnergyLoss(m: number, g: number, h1: number, h2: number): number {
  return m * g * (h1 - h2)
}

/** Minimum start height (from rest) to complete a vertical loop of radius R, frictionless. */
export function minLoopHeight(R: number): number {
  return 2.5 * R
}

/** Speed at the bottom of a loop, released from the minimum height needed to complete it. */
export function loopBottomSpeedFromMinHeight(R: number, g: number): number {
  return Math.sqrt(5 * g * R)
}

/** Max height reached going up a rough incline (angle theta, mu_k) from speed v at the base. */
export function maxHeightUpRoughIncline(v: number, thetaRad: number, mu: number, g: number): number {
  return (0.5 * v * v) / (g * (1 + mu / Math.tan(thetaRad)))
}

/** Distance traveled up a rough incline (angle theta, mu_k) before stopping, from speed v at the base. */
export function stopDistanceUpRoughIncline(v: number, thetaRad: number, mu: number, g: number): number {
  return (0.5 * v * v) / (g * (Math.sin(thetaRad) + mu * Math.cos(thetaRad)))
}
