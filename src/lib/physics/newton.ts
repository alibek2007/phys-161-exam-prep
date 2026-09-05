/** Newton's laws: forces, friction, inclines, pulleys, apparent weight, drag. */

export function weight(m: number, g: number): number {
  return m * g
}

export function netForce(m: number, a: number): number {
  return m * a
}

export function frictionForce(mu: number, normal: number): number {
  return mu * normal
}

/**
 * Block on a horizontal surface pulled by force F at angle theta above horizontal.
 * Returns normal force N = mg - F sin(theta).
 */
export function normalForcePulledAtAngle(m: number, g: number, F: number, thetaRad: number): number {
  return m * g - F * Math.sin(thetaRad)
}

/**
 * Block on a horizontal surface pushed by force F at angle theta below horizontal.
 * Returns normal force N = mg + F sin(theta).
 */
export function normalForcePushedAtAngle(m: number, g: number, F: number, thetaRad: number): number {
  return m * g + F * Math.sin(thetaRad)
}

/** Acceleration of a block pulled horizontally at angle theta above horizontal, with friction. */
export function accelPulledAtAngleWithFriction(
  m: number,
  g: number,
  F: number,
  thetaRad: number,
  mu: number,
): number {
  const N = normalForcePulledAtAngle(m, g, F, thetaRad)
  const friction = mu * Math.max(N, 0)
  return (F * Math.cos(thetaRad) - friction) / m
}

/** Speed after accelerating from rest under net force F (mass m) for time t, with friction mu on horizontal ground. */
export function speedFromForceFriction(
  m: number,
  g: number,
  F: number,
  thetaRad: number,
  mu: number,
  t: number,
): number {
  const a = accelPulledAtAngleWithFriction(m, g, F, thetaRad, mu)
  return Math.max(a, 0) * t
}

/**
 * Atwood-like system: block 1 (mass m1) on horizontal surface with friction mu, connected over a
 * pulley to hanging block 2 (mass m2). Returns the acceleration magnitude of the system.
 */
export function atwoodWithFrictionAccel(m1: number, m2: number, mu: number, g: number): number {
  return (m2 * g - mu * m1 * g) / (m1 + m2)
}

/**
 * Block m1 on an incline (angle alpha, friction mu) connected over a frictionless pulley to a
 * hanging mass m2. `direction` = +1 if m1 slides up the incline, -1 if m1 slides down the incline.
 * Returns the system's acceleration magnitude (assuming motion proceeds in `direction`).
 */
export function inclinePulleyAccel(
  m1: number,
  m2: number,
  alphaRad: number,
  mu: number,
  g: number,
  direction: 1 | -1,
): number {
  const gravityComponent = m1 * g * Math.sin(alphaRad)
  const friction = mu * m1 * g * Math.cos(alphaRad)
  return direction === 1
    ? (m2 * g - gravityComponent - friction) / (m1 + m2)
    : (gravityComponent - friction - m2 * g) / (m1 + m2)
}

/** Hanging mass m2 needed for the system to move at acceleration `a` (a=0 => constant speed) in `direction`. */
export function inclinePulleyMassForAccel(
  m1: number,
  alphaRad: number,
  mu: number,
  g: number,
  a: number,
  direction: 1 | -1,
): number {
  const gravityComponent = m1 * g * Math.sin(alphaRad)
  const friction = mu * m1 * g * Math.cos(alphaRad)
  return direction === 1
    ? (m1 * a + gravityComponent + friction) / (g - a)
    : (gravityComponent - friction - m1 * a) / (g + a)
}

/** Tension in the cord for the incline+pulley system moving at acceleration `a` in `direction`. */
export function inclinePulleyTension(m2: number, g: number, a: number, direction: 1 | -1): number {
  return direction === 1 ? m2 * (g - a) : m2 * (g + a)
}

/** Cord tension computed from the incline (m1) side of the system, equivalent to inclinePulleyTension. */
export function inclinePulleyTensionFromM1(
  m1: number,
  alphaRad: number,
  mu: number,
  g: number,
  a: number,
  direction: 1 | -1,
): number {
  const gravityComponent = m1 * g * Math.sin(alphaRad)
  const friction = mu * m1 * g * Math.cos(alphaRad)
  return direction === 1 ? m1 * a + gravityComponent + friction : gravityComponent - friction - m1 * a
}

/**
 * A chain of equal links is lifted with acceleration a. The force the (k)-th link exerts on the
 * (k-1)-th link equals the weight+inertia of all `nBelow` links beneath that boundary.
 */
export function chainLinkForce(nBelow: number, linkMass: number, g: number, a: number): number {
  return nBelow * linkMass * (g + a)
}

/** Apparent weight (scale reading) for a person of mass m accelerating vertically with acceleration a (up positive). */
export function apparentWeight(m: number, a: number, g: number): number {
  return m * (g + a)
}

/** Acceleration of a bus/vehicle from the angle a hanging mass's cord makes with the vertical. */
export function accelFromHangingAngle(thetaFromVerticalRad: number, g: number): number {
  return g * Math.tan(thetaFromVerticalRad)
}

/** Terminal velocity under quadratic drag: v_t = sqrt(2mg / (rho A C)). */
export function terminalVelocity(m: number, g: number, rho: number, A: number, C: number): number {
  return Math.sqrt((2 * m * g) / (rho * A * C))
}

/** Cross-sectional area from terminal velocity: inverse of terminalVelocity. */
export function areaFromTerminalVelocity(m: number, g: number, rho: number, C: number, vt: number): number {
  return (2 * m * g) / (rho * C * vt * vt)
}

/** Apparent weight of a person of mass m in a cart of mass M going over a convex hill (top) at speed v, radius r. */
export function apparentWeightHillTop(m: number, v: number, r: number, g: number): number {
  return m * (g - (v * v) / r)
}

/** Apparent weight of a person of mass m at the bottom of a concave valley at speed v, radius r. */
export function apparentWeightValleyBottom(m: number, v: number, r: number, g: number): number {
  return m * (g + (v * v) / r)
}

/** Max speed over a convex hilltop before losing contact (apparent weight -> 0). */
export function maxSpeedHillTop(r: number, g: number): number {
  return Math.sqrt(r * g)
}

/** Normal force from the wall of a vertical circular track (inside a cylinder) at the bottom point. */
export function normalForceCylinderBottom(m: number, v: number, r: number, g: number): number {
  return m * ((v * v) / r + g)
}

/** Normal force from the wall of a vertical circular track (inside a cylinder) at the top point. */
export function normalForceCylinderTop(m: number, v: number, r: number, g: number): number {
  return m * ((v * v) / r - g)
}

/** Minimum speed to maintain contact with the wall at the top of a vertical circular track (N -> 0). */
export function minSpeedCylinderTop(r: number, g: number): number {
  return Math.sqrt(g * r)
}

/**
 * Two ropes support a hanging weight W, each making the given angle with the ceiling
 * (horizontal). Returns the tension in the rope at `thisAngleRad`, given the other rope's angle.
 */
export function twoRopeTensionAtAngle(W: number, thisAngleRad: number, otherAngleRad: number): number {
  return W / (Math.cos(thisAngleRad) * Math.tan(otherAngleRad) + Math.sin(thisAngleRad))
}

/** Max hanging weight two ropes (angles with the ceiling) can support before the weaker one (larger angle) snaps at `maxTension`. */
export function twoRopeMaxWeight(maxTension: number, angle1Rad: number, angle2Rad: number): number {
  const big = Math.max(angle1Rad, angle2Rad)
  const small = Math.min(angle1Rad, angle2Rad)
  return maxTension * (Math.cos(big) * Math.tan(small) + Math.sin(big))
}

/** Force needed to lift weight W at constant speed with a single movable pulley (2 supporting rope segments). */
export function movablePulleyForce(W: number): number {
  return W / 2
}

/** Force needed to lift weight W with a movable pulley (2 segments) at upward acceleration a. */
export function movablePulleyForceWithAccel(W: number, a: number, g: number): number {
  return (W * (g + a)) / (2 * g)
}

/** Tension at each end of a clothesline of weight W sagging at angle theta from the horizontal at each end. */
export function clotheslineTension(W: number, thetaFromHorizontalRad: number): number {
  return W / (2 * Math.sin(thetaFromHorizontalRad))
}

/**
 * Block A (weight WA) rests on block B (weight WB); a horizontal force F drags B (and A, moving
 * together with no relative slipping) at constant speed across a floor with kinetic friction mu.
 */
export function dragBlockTogether(WA: number, WB: number, mu: number): number {
  return mu * (WA + WB)
}

/**
 * Block A (weight WA) is held fixed while block B (weight WB, same kinetic friction mu at both
 * interfaces) is dragged out from under it at constant speed. Force must overcome friction at
 * the floor (normal = WA+WB) and at the A/B interface (normal = WA, since B slides under A).
 */
export function dragBlockFromUnder(WA: number, WB: number, mu: number): number {
  return mu * (WB + 2 * WA)
}

/**
 * A brush/pad of weight W is pushed at constant speed up a vertical window by a force F applied
 * at angle `angleRad` above the horizontal; N = F cos(angle) presses it against the window,
 * kinetic friction mu opposes the upward motion. `a` (default 0) is any upward acceleration.
 */
export function windowBrushForce(W: number, mu: number, angleRad: number, g: number, a = 0): number {
  return (W * (1 + a / g)) / (Math.sin(angleRad) - mu * Math.cos(angleRad))
}

export function windowBrushNormal(F: number, angleRad: number): number {
  return F * Math.cos(angleRad)
}

/**
 * Block A (weight WA) rests on a horizontal surface; a cord/bracket arrangement at angle theta
 * (with the horizontal) connects it to a hanging weight w, requiring a static friction force
 * f = w / tan(theta) on A for equilibrium.
 */
export function cordAngleFriction(w: number, angleRad: number): number {
  return w / Math.tan(angleRad)
}

/** Max hanging weight w for equilibrium given coefficient of static friction mu. */
export function cordAngleMaxWeight(mu: number, WA: number, angleRad: number): number {
  return mu * WA * Math.tan(angleRad)
}

/** Minimum coefficient of static friction required for equilibrium with hanging weight w. */
export function cordAngleMinMu(w: number, WA: number, angleRad: number): number {
  return w / (WA * Math.tan(angleRad))
}
