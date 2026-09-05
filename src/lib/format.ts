/** Format a number for display, trimming floating-point noise, using up to `maxDecimals`. */
export function fmt(value: number, maxDecimals = 4): string {
  if (!Number.isFinite(value)) return String(value)
  const rounded = Number(value.toFixed(maxDecimals))
  return rounded.toString()
}
