/** Moment of inertia formulas and rotational kinematics (theta, omega, alpha). */

// --- Standard shapes ---
export const I_rodEnd = (m: number, L: number) => (1 / 3) * m * L * L
export const I_rodCenter = (m: number, L: number) => (1 / 12) * m * L * L
export const I_diskOrSolidCylinder = (m: number, R: number) => 0.5 * m * R * R
export const I_hoopOrThinRing = (m: number, R: number) => m * R * R
export const I_solidSphere = (m: number, R: number) => 0.4 * m * R * R
export const I_thinSphericalShell = (m: number, R: number) => (2 / 3) * m * R * R
/** Uniform flat plate about an in-plane edge, side length L perpendicular to the axis (same form as a rod-about-end). */
export const I_plateEdge = (m: number, L: number) => (1 / 3) * m * L * L
/** Uniform right-triangle plate (legs = base B, height H) about the axis running along the H leg. */
export const I_rightTriangleAboutHeightLeg = (m: number, base: number) => (m * base * base) / 6
export const I_pointMass = (m: number, r: number) => m * r * r

// --- Rotational kinematics (direct analogues of 1D kinematics) ---
export function angularSpeedFromAccel(alpha: number, t: number): number {
  return alpha * t
}

export function angleFromRest(alpha: number, t: number): number {
  return 0.5 * alpha * t * t
}

/** theta covered accelerating from rest to omega, using theta = omega^2 / (2 alpha). */
export function angleFromOmega(omega: number, alpha: number): number {
  return (omega * omega) / (2 * alpha)
}

/** Time already elapsed (from rest) at the start of an interval [t0, t0+dt] covering angle dTheta. */
export function timeAtIntervalStart(alpha: number, dt: number, dTheta: number): number {
  // dTheta = 0.5*alpha*((t0+dt)^2 - t0^2) = 0.5*alpha*(2*t0*dt + dt^2)
  return (dTheta / (0.5 * alpha) - dt * dt) / (2 * dt)
}

/** Rolling without slipping up an incline (rolls to rest a distance d up the slope): moment of inertia about the CM. */
export function rollingMomentOfInertia(M: number, R: number, V: number, thetaRad: number, d: number, g: number): number {
  const energyToHeight = M * g * d * Math.sin(thetaRad) - 0.5 * M * V * V
  return (2 * R * R * energyToHeight) / (V * V)
}
