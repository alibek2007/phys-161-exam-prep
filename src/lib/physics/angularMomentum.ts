/** Angular momentum: conservation in impact/explosion problems, and central-force (string) problems. */

export function angularMomentumPoint(m: number, v: number, r: number): number {
  return m * v * r
}

/**
 * A bullet (mass m, speed v) strikes a rotating body at perpendicular distance `impactArm` from
 * the axis (angular momentum m*v*impactArm) and embeds at radius `embedRadius` (usually the
 * body's outer radius, which can differ from the impact arm/moment-arm used for L).
 */
export function embedAngularSpeed(m: number, v: number, impactArm: number, embedRadius: number, I_body: number): number {
  const L = angularMomentumPoint(m, v, impactArm)
  const I_total = I_body + m * embedRadius * embedRadius
  return L / I_total
}

/** Conservation of angular momentum: final angular speed after moving a point mass on a rotating platform. */
export function platformFinalOmega(I_platform: number, m: number, rInitial: number, omegaInitial: number, rFinal: number): number {
  const L = (I_platform + m * rInitial * rInitial) * omegaInitial
  return L / (I_platform + m * rFinal * rFinal)
}

/** Factor by which KE increases when a person walks from radius r to the center (r=0) of a rotating platform. */
export function platformKEFactor(I_platform: number, m: number, rInitial: number): number {
  const I_initial = I_platform + m * rInitial * rInitial
  return I_initial / I_platform
}

/** Central-force (string through a hole) problem: radius at which tension reaches breaking strength T. */
export function stringBreakRadius(m: number, v0: number, r0: number, T: number): number {
  return Math.cbrt((m * v0 * v0 * r0 * r0) / T)
}

/** Central-force (string through a hole) problem: speed at which tension reaches breaking strength T. */
export function stringBreakSpeed(T: number, v0: number, r0: number, m: number): number {
  return Math.cbrt((T * v0 * r0) / m)
}
