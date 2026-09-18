/** Torque and angular acceleration. */

export function torque(F: number, r: number, thetaRad = Math.PI / 2): number {
  return F * r * Math.sin(thetaRad)
}

export function angularAccel(netTorque: number, I: number): number {
  return netTorque / I
}

/**
 * Grindstone (disk, radius R) with an axe pressed on the rim (normal force N, friction mu)
 * plus a constant axle friction torque, driven by a tangential force F at a crank of length
 * `handle`. Returns the resulting angular acceleration.
 */
export function grindstoneAccel(I: number, F: number, handle: number, mu: number, N: number, R: number, axleFriction: number): number {
  return (F * handle - mu * N * R - axleFriction) / I
}

/** Force at the crank handle needed to reach omega from rest in time t (grindstone + axe + axle friction). */
export function grindstoneDriveForce(I: number, omega: number, t: number, handle: number, mu: number, N: number, R: number, axleFriction: number): number {
  const alpha = omega / t
  return (I * alpha + mu * N * R + axleFriction) / handle
}

/** Time to stop from omega0 under a constant total opposing (friction) torque. */
export function stopTimeFromFriction(I: number, omega0: number, frictionTorque: number): number {
  return (I * omega0) / frictionTorque
}
