/** River-crossing (relative velocity) problems: boat velocity relative to water + current. */

/** Resultant speed relative to ground when the boat aims straight across a perpendicular current. */
export function crossingResultantSpeed(boatSpeed: number, currentSpeed: number): number {
  return Math.hypot(boatSpeed, currentSpeed)
}

/**
 * The boat's velocity relative to the earth is straight across (current-perpendicular).
 * Given the boat's speed relative to the water and the current speed, returns the
 * resultant (across-current) ground speed.
 */
export function straightAcrossSpeed(boatSpeedRelWater: number, currentSpeed: number): number {
  return Math.sqrt(boatSpeedRelWater ** 2 - currentSpeed ** 2)
}

export function crossingTime(width: number, acrossSpeed: number): number {
  return width / acrossSpeed
}

export function downstreamDrift(currentSpeed: number, time: number): number {
  return currentSpeed * time
}
