/** Newtonian gravitation: field strength, orbits, escape and two-body problems. All SI units. */

export const G_COMMON = 6.67e-11
export const G_PRECISE = 6.6743e-11

export const gAtAltitude = (g0: number, R: number, h: number) => g0 * (R / (R + h)) ** 2
export const altitudeForG = (R: number, g0: number, g: number) => R * (Math.sqrt(g0 / g) - 1)
export const altitudeForGFraction = (R: number, fraction: number) => R * (1 / Math.sqrt(fraction) - 1)

export const newtonForce = (G: number, m1: number, m2: number, r: number) => (G * m1 * m2) / (r * r)

/** Rotating ring: angular speed giving `fraction` of Earth weight at radius R. */
export const ringAngularSpeed = (fraction: number, g: number, R: number) => Math.sqrt((fraction * g) / R)
export const ringRimSpeed = (fraction: number, g: number, R: number) => Math.sqrt(fraction * g * R)

export const surfaceGravityRatio = (massRatio: number, radiusRatio: number) => massRatio / radiusRatio ** 2
export const escapeSpeedScaled = (vX: number, massRatio: number, radiusRatio: number) => vX * Math.sqrt(massRatio / radiusRatio)

/** Uniform-density sphere: surface g and escape speed from radius and density. */
export const sphereSurfaceG = (G: number, rho: number, R: number) => (4 / 3) * Math.PI * G * rho * R
export const sphereEscapeSpeed = (G: number, rho: number, R: number) => R * Math.sqrt((8 * Math.PI * G * rho) / 3)

/** Five equal masses M at 0°, 45°, 90°, 135°, 180° on a semicircle of radius r; force on m at the center. */
export const semicircleForce = (G: number, M: number, m: number, r: number) => (G * M * m * (1 + Math.SQRT2)) / (r * r)

/** Sphere of radius R and mass M (before hollowing) with a hollow of radius R/2 reaching the center and the surface; m at distance d from the center, on the side away from the hollow. */
export function hollowSphereForce(G: number, M: number, R: number, m: number, d: number): number {
  const hollowMass = M / 8
  const hollowDistance = d + R / 2
  return G * m * (M / (d * d) - hollowMass / (hollowDistance * hollowDistance))
}

/** Position between M1 (origin) and M2 (at x2) where the net gravitational force on a third mass is zero. */
export const nullPoint = (M1: number, M2: number, x2: number) => (x2 * Math.sqrt(M1)) / (Math.sqrt(M1) + Math.sqrt(M2))

export const surfaceOrbitDensity = (G: number, T: number) => (3 * Math.PI) / (G * T * T)
export const surfaceOrbitPeriod = (G: number, rho: number) => Math.sqrt((3 * Math.PI) / (G * rho))

export const orbitRadius = (G: number, M: number, T: number) => Math.cbrt((G * M * T * T) / (4 * Math.PI * Math.PI))
export const orbitPeriod = (G: number, M: number, r: number) => 2 * Math.PI * Math.sqrt((r * r * r) / (G * M))

export const liftEnergy = (G: number, M: number, m: number, R: number, h: number) => G * M * m * (1 / R - 1 / (R + h))
export const launchSpeedToAltitude = (G: number, M: number, R: number, h: number) => Math.sqrt(2 * G * M * (1 / R - 1 / (R + h)))
export const launchSpeedFromFarSpeed = (G: number, M: number, R: number, vFar: number) => Math.sqrt(vFar * vFar + (2 * G * M) / R)
export const farSpeed = (G: number, M: number, R: number, v0: number) => Math.sqrt(v0 * v0 - (2 * G * M) / R)
export function maxHeightFromLaunch(G: number, M: number, R: number, v0: number): number {
  const inverse = 1 / R - (v0 * v0) / (2 * G * M)
  return 1 / inverse - R
}

/** Three equal stars at the corners of an equilateral triangle of side a, orbiting their common center. */
export const triangleOrbitSpeed = (G: number, M: number, a: number) => Math.sqrt((G * M) / a)

/** Energy and angular momentum conservation for a comet around a star of mass M. */
export const cometSpeedAt = (G: number, M: number, v1: number, r1: number, r2: number) => Math.sqrt(v1 * v1 + 2 * G * M * (1 / r2 - 1 / r1))
export const cometDistanceAt = (G: number, M: number, v1: number, r1: number, v2: number) => 1 / (1 / r1 + (v2 * v2 - v1 * v1) / (2 * G * M))

/** Two equal stars of mass M, each on a circle of radius r around the common center (separation 2r). */
export const binaryForce = (G: number, M: number, r: number) => (G * M * M) / (4 * r * r)
export const binarySpeed = (G: number, M: number, r: number) => Math.sqrt((G * M) / (4 * r))
export const binaryPeriod = (G: number, M: number, r: number) => (2 * Math.PI * r) / binarySpeed(G, M, r)
export const binarySeparationEnergy = (G: number, M: number, r: number) => (G * M * M) / (4 * r)

/** Two spheres released from rest d0 apart, speed of the first (m1) and relative speed when d apart. */
export const fallSpeedOfFirst = (G: number, m1: number, m2: number, d0: number, d: number) => m2 * Math.sqrt((2 * G * (1 / d - 1 / d0)) / (m1 + m2))
export const fallRelativeSpeed = (G: number, m1: number, m2: number, d0: number, d: number) => Math.sqrt(2 * G * (m1 + m2) * (1 / d - 1 / d0))
/** Where (measured from the first center's start) the two spheres of radius r touch. */
export const contactPointFromFirst = (m1: number, m2: number, d0: number, r: number) => (m2 * (d0 - 2 * r)) / (m1 + m2) + r
