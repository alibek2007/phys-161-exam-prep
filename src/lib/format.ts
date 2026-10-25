/** Format a number for display, trimming floating-point noise, using up to `maxDecimals`. */
export function fmt(value: number, maxDecimals = 4): string {
  if (!Number.isFinite(value)) return String(value)
  const rounded = Number(value.toFixed(maxDecimals))
  return rounded.toString()
}

const SUPERSCRIPT: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻',
}

export function superscript(n: number): string {
  return String(n)
    .split('')
    .map((c) => SUPERSCRIPT[c] ?? c)
    .join('')
}

/** "5.97×10²⁴" from a mantissa and exponent, for prompt text. */
export function sciText(mantissa: number, exponent: number): string {
  return `${fmt(mantissa)}×10${superscript(exponent)}`
}

function needsScientific(value: number): boolean {
  const abs = Math.abs(value)
  return abs !== 0 && (abs >= 1e6 || abs < 1e-3)
}

function splitScientific(value: number, sig: number): { mantissa: number; exponent: number } {
  const [m, e] = value.toExponential(sig - 1).split('e')
  return { mantissa: Number(m), exponent: Number(e) }
}

/** `sig` significant figures as plain text; very large or small values use ×10ⁿ form. */
export function fmtSig(value: number, sig = 4): string {
  if (!Number.isFinite(value)) return String(value)
  if (needsScientific(value)) {
    const { mantissa, exponent } = splitScientific(value, sig)
    return sciText(mantissa, exponent)
  }
  return String(Number(value.toPrecision(sig)))
}

/** Same as fmtSig but as a KaTeX string. */
export function texSig(value: number, sig = 4): string {
  if (!Number.isFinite(value)) return String(value)
  if (needsScientific(value)) {
    const { mantissa, exponent } = splitScientific(value, sig)
    return `${mantissa}\times10^{${exponent}}`
  }
  return String(Number(value.toPrecision(sig)))
}

/** Reference answer shown to students: up to 6 significant figures, no trailing zeros. */
export function fmtAnswerValue(value: number): string {
  return String(Number(value.toPrecision(6)))
}
