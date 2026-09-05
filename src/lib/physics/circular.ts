/** Centripetal acceleration = v^2 / r. */
export function centripetalAccel(v: number, r: number): number {
  return (v * v) / r
}

/** Total acceleration magnitude when both centripetal and tangential components exist. */
export function totalAccel(radial: number, tangential: number): number {
  return Math.hypot(radial, tangential)
}

/** Minimum speed at the top of a vertical circle for the object/liquid to maintain contact (a_c = g). */
export function minSpeedTopOfLoop(r: number, g: number): number {
  return Math.sqrt(g * r)
}

/** Period of revolution from radius and speed. */
export function period(r: number, v: number): number {
  return (2 * Math.PI * r) / v
}

/** Speed from radius and period. */
export function speedFromPeriod(r: number, T: number): number {
  return (2 * Math.PI * r) / T
}

/** Banking angle (frictionless) such that tan(theta) = v^2 / (r g). Returns radians. */
export function bankingAngle(v: number, r: number, g: number): number {
  return Math.atan((v * v) / (r * g))
}

/** Tension at bottom of vertical circle: T = m(g + v^2/r). */
export function tensionBottomOfCircle(m: number, v: number, r: number, g: number): number {
  return m * (g + (v * v) / r)
}

/** Tension/normal force at top of vertical circle: N = m(v^2/r - g) (can be negative -> loses contact). */
export function forceTopOfCircle(m: number, v: number, r: number, g: number): number {
  return m * ((v * v) / r - g)
}

/** Conical pendulum speed: string length L, half-angle theta from vertical. */
export function conicalPendulumSpeed(L: number, thetaRad: number, g: number): number {
  return Math.sqrt(g * L * Math.sin(thetaRad) * Math.tan(thetaRad))
}

/**
 * A vehicle starts from rest with constant tangential acceleration a_t on a flat circular track
 * and skids off after covering a fraction `f` of the circle (f=0.5 => half circle). Returns the
 * coefficient of static friction at the moment of skidding (radius cancels out algebraically).
 */
export function skidFrictionCoefficient(aTangential: number, f: number, g: number): number {
  return (aTangential * Math.sqrt(1 + (4 * Math.PI * f) ** 2)) / g
}

/** Inverse of skidFrictionCoefficient: tangential acceleration given the friction coefficient. */
export function skidTangentialAccel(mu: number, f: number, g: number): number {
  return (mu * g) / Math.sqrt(1 + (4 * Math.PI * f) ** 2)
}
