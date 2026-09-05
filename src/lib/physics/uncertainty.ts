/** Error propagation (worst-case / maximum uncertainty) formulas. */

export function relativeError(overshoot: number, nominal: number): number {
  return overshoot / nominal
}

export function overshootFromRelativeError(nominal: number, relErr: number): number {
  return nominal * relErr
}

/** Max uncertainty in area of a rectangle L x W. */
export function uncertaintyRectArea(L: number, W: number, dL: number, dW: number): number {
  return L * dW + W * dL
}

/** Max uncertainty in perimeter of a rectangle. */
export function uncertaintyRectPerimeter(dL: number, dW: number): number {
  return 2 * (dL + dW)
}

/** Max uncertainty in volume of a cylindrical disk (diameter d, thickness t). */
export function uncertaintyDiskVolume(d: number, dd: number, t: number, dt: number): number {
  return (Math.PI * d * t * dd) / 2 + (Math.PI * d * d * dt) / 4
}

/** Max uncertainty in the area of a circular face (diameter d). */
export function uncertaintyCircleArea(d: number, dd: number): number {
  return (Math.PI * d * dd) / 2
}
