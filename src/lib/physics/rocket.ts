/** Rocket propulsion (Tsiolkovsky rocket equation), starting from rest with no external forces. */

export function rocketFinalSpeed(exhaustVelocity: number, payloadFraction: number): number {
  return exhaustVelocity * Math.log(1 / payloadFraction)
}

export function rocketPayloadFraction(exhaustVelocity: number, finalSpeed: number): number {
  return Math.exp(-finalSpeed / exhaustVelocity)
}
