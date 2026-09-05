/** 1D/2D kinematics with constant acceleration. */

export function finalVelocity(v0: number, a: number, t: number): number {
  return v0 + a * t
}

export function displacement(v0: number, a: number, t: number): number {
  return v0 * t + 0.5 * a * t * t
}

/** v^2 = v0^2 + 2 a s, solved for v (assumes v >= 0 branch unless told otherwise). */
export function velocityFromDisplacement(v0: number, a: number, s: number): number {
  return Math.sqrt(Math.max(v0 * v0 + 2 * a * s, 0))
}

/** Solve s = v0 t + 1/2 a t^2 for t (positive root), given v0, a, s. */
export function timeFromDisplacement(v0: number, a: number, s: number): number {
  if (Math.abs(a) < 1e-12) return s / v0
  const disc = v0 * v0 + 2 * a * s
  if (disc < 0) return NaN
  const sq = Math.sqrt(disc)
  const t1 = (-v0 + sq) / a
  const t2 = (-v0 - sq) / a
  const candidates = [t1, t2].filter((t) => t >= 0)
  return candidates.length ? Math.min(...candidates) : NaN
}

/** Average velocity/speed. */
export function average(total: number, time: number): number {
  return total / time
}

/** Acceleration from v0, v, t. */
export function accelerationFromVelocities(v0: number, v: number, t: number): number {
  return (v - v0) / t
}

/** Free fall: time to fall height h from rest under gravity g. */
export function timeToFall(h: number, g: number): number {
  return Math.sqrt((2 * h) / g)
}

/**
 * Pursuit problem: a vehicle at constant speed `vm` passes a pursuer that starts from rest
 * with constant acceleration `a` at the same instant/place. Time until the pursuer catches up.
 */
export function pursuitCatchTime(vm: number, a: number): number {
  return (2 * vm) / a
}

export function pursuitCatchDistance(vm: number, a: number): number {
  return (2 * vm * vm) / a
}

export function pursuitCatchOfficerSpeed(vm: number): number {
  return 2 * vm
}

/** Max head start (gap) the constant-speed vehicle opens up before the accelerating pursuer catches it. */
export function pursuitMaxGap(vm: number, a: number): number {
  return (0.5 * vm * vm) / a
}

/**
 * Sprinter accelerates uniformly from rest to max speed in `t1`, then holds that speed for the
 * rest of a race of length `distance`, finishing at total time `T`. Returns the max speed.
 */
export function sprinterMaxSpeed(t1: number, T: number, distance: number): number {
  return distance / (T - t1 / 2)
}
