/**
 * Projectile motion. `angleRad` is signed: positive = above horizontal, negative = below
 * horizontal. This lets a single set of formulas cover both launch-upward and toss-downward
 * problems.
 */

export function projectileX(v0: number, angleRad: number, t: number): number {
  return v0 * Math.cos(angleRad) * t
}

/** Vertical displacement relative to the launch point (positive = above launch point). */
export function projectileY(v0: number, angleRad: number, t: number, g: number): number {
  return v0 * Math.sin(angleRad) * t - 0.5 * g * t * t
}

export function projectileSpeed(v0: number, angleRad: number, t: number, g: number): number {
  const vx = v0 * Math.cos(angleRad)
  const vy = v0 * Math.sin(angleRad) - g * t
  return Math.hypot(vx, vy)
}

/** Height fallen below the launch point (positive number) — equivalent to -projectileY. */
export function projectileHeightBelowLaunch(v0: number, angleRad: number, t: number, g: number): number {
  return 0.5 * g * t * t - v0 * Math.sin(angleRad) * t
}

export function projectileMaxHeight(v0: number, angleRad: number, g: number): number {
  const vy0 = v0 * Math.sin(angleRad)
  return (vy0 * vy0) / (2 * g)
}

export function projectileTimeToMaxHeight(v0: number, angleRad: number, g: number): number {
  return (v0 * Math.sin(angleRad)) / g
}

/** Time to fall height h (m) starting from zero vertical velocity (horizontal launch). */
export function horizontalLaunchFallTime(h: number, g: number): number {
  return Math.sqrt((2 * h) / g)
}

/** Horizontal launch speed given the range x and fall height h. */
export function horizontalLaunchSpeed(x: number, h: number, g: number): number {
  return x / horizontalLaunchFallTime(h, g)
}

/** Impact speed for a horizontally-launched projectile given range x and fall height h. */
export function horizontalLaunchImpactSpeed(x: number, h: number, g: number): number {
  const t = horizontalLaunchFallTime(h, g)
  const vx = x / t
  const vy = g * t
  return Math.hypot(vx, vy)
}

/** Impact angle below horizontal (radians) for a horizontally-launched projectile. */
export function horizontalLaunchImpactAngle(x: number, h: number, g: number): number {
  const t = horizontalLaunchFallTime(h, g)
  const vx = x / t
  const vy = g * t
  return Math.atan(vy / vx)
}
