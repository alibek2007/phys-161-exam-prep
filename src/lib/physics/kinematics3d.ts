import { type Vec3, add, magnitude, scale } from './vectors'

/** Position/velocity under constant vector acceleration. */
export function positionConstAccel(r0: Vec3, v0: Vec3, a: Vec3, t: number): Vec3 {
  return add(add(r0, scale(v0, t)), scale(a, 0.5 * t * t))
}

export function velocityConstAccel(v0: Vec3, a: Vec3, t: number): Vec3 {
  return add(v0, scale(a, t))
}

/** Constant acceleration vector inferred from initial/final velocity over elapsed time T. */
export function accelFromVelocities(vi: Vec3, vf: Vec3, T: number): Vec3 {
  return scale(add(vf, scale(vi, -1)), 1 / T)
}

export function accelMagnitudeFromVelocities(vi: Vec3, vf: Vec3, T: number): number {
  return magnitude(accelFromVelocities(vi, vf, T))
}

/**
 * Rocket in the xy-plane with acceleration components a_x(t) = alpha*t^2 and
 * a_y(t) = beta - gamma*t, starting at the origin with velocity (v0x, v0y).
 * Returns position and velocity at time t (closed-form integrals).
 */
export function rocketState(
  alpha: number,
  beta: number,
  gamma: number,
  v0x: number,
  v0y: number,
  t: number,
): { x: number; y: number; vx: number; vy: number } {
  const vx = v0x + (alpha * t ** 3) / 3
  const vy = v0y + beta * t - (gamma * t ** 2) / 2
  const x = v0x * t + (alpha * t ** 4) / 12
  const y = v0y * t + (beta * t ** 2) / 2 - (gamma * t ** 3) / 6
  return { x, y, vx, vy }
}
