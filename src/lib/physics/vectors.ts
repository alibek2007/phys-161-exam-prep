export interface Vec3 {
  x: number
  y: number
  z: number
}

export const v3 = (x: number, y = 0, z = 0): Vec3 => ({ x, y, z })

export function add(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }
}

export function sub(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }
}

export function scale(a: Vec3, k: number): Vec3 {
  return { x: a.x * k, y: a.y * k, z: a.z * k }
}

export function magnitude(a: Vec3): number {
  return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z)
}

export function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z
}

export function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  }
}

export function angleBetween(a: Vec3, b: Vec3): number {
  return Math.acos(dot(a, b) / (magnitude(a) * magnitude(b)))
}

/** Magnitude of the vector sum of two 2D vectors given magnitudes & the angle between them. */
export function sumMagnitude(A: number, B: number, angleRad: number): number {
  return Math.sqrt(A * A + B * B + 2 * A * B * Math.cos(angleRad))
}

/** Magnitude of the vector difference of two 2D vectors given magnitudes & the angle between them. */
export function diffMagnitude(A: number, B: number, angleRad: number): number {
  return Math.sqrt(A * A + B * B - 2 * A * B * Math.cos(angleRad))
}

export function toDeg(rad: number): number {
  return (rad * 180) / Math.PI
}

export function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}

/** Scalar (dot) product of two 2D vectors from magnitudes and angle between them. */
export function dotFromAngle(A: number, B: number, angleRad: number): number {
  return A * B * Math.cos(angleRad)
}

/** Magnitude of cross product of two 2D vectors from magnitudes and angle between them. */
export function crossMagFromAngle(A: number, B: number, angleRad: number): number {
  return A * B * Math.sin(angleRad)
}

/** Scalar projection of A along B (component of A along direction of B). */
export function scalarProjection(a: Vec3, b: Vec3): number {
  return dot(a, b) / magnitude(b)
}
