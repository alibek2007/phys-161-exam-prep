export const W = 320
export const H = 220
export const STROKE = '#1e3a5f'
export const ACCENT = '#f5a524'
export const MUTED = '#8a97a8'

export function ArrowDefs() {
  return (
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill={STROKE} />
      </marker>
      <marker id="arrowAccent" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill={ACCENT} />
      </marker>
    </defs>
  )
}

export function Vec({
  x1,
  y1,
  x2,
  y2,
  color = STROKE,
  label,
  dashed = false,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  color?: string
  label?: string
  dashed?: boolean
}) {
  const marker = color === ACCENT ? 'url(#arrowAccent)' : 'url(#arrow)'
  const lx = x2 + (x2 - x1) * 0.08
  const ly = y2 + (y2 - y1) * 0.08
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.5} markerEnd={marker} strokeDasharray={dashed ? '4 3' : undefined} />
      {label && (
        <text x={lx} y={ly} fontSize={13} fill={color} fontWeight={600} textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  )
}

export function Label({ x, y, children, size = 12, color = STROKE, anchor = 'middle' as const }: { x: number; y: number; children: React.ReactNode; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }) {
  return (
    <text x={x} y={y} fontSize={size} fill={color} textAnchor={anchor} fontFamily="ui-sans-serif, system-ui">
      {children}
    </text>
  )
}

export function deg2rad(d: number): number {
  return (d * Math.PI) / 180
}

export function polar(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const rad = deg2rad(angleDeg)
  return [cx + r * Math.cos(rad), cy - r * Math.sin(rad)]
}

export function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-72" role="img" aria-label="Diagram illustrating the problem parameters">
      <ArrowDefs />
      {children}
    </svg>
  )
}
