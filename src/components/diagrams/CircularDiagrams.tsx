import { ACCENT, Label, MUTED, STROKE, Svg, Vec, W } from './shared'

export function CircularHillDiagram({ radius }: { radius: number }) {
  const cx = W / 2
  const cyCircle = 160
  const r = 90
  return (
    <Svg>
      <path d={`M 10 170 Q ${cx} 60 ${W - 10} 170`} fill="none" stroke={STROKE} strokeWidth={3} />
      <circle cx={cx} cy={cyCircle - r} r={5} fill={ACCENT} />
      <Vec x1={cx} y1={cyCircle - r} x2={cx + 40} y2={cyCircle - r} label="v" />
      <Vec x1={cx} y1={cyCircle - r} x2={cx} y2={cyCircle - r + 30} color={MUTED} />
      <Label x={cx + 10} y={cyCircle - r + 42} color={MUTED}>
        aᵣ
      </Label>
      <Label x={cx} y={200}>
        r = {radius} m
      </Label>
    </Svg>
  )
}

export function VerticalCircleDiagram({ radius }: { radius: number }) {
  const cx = W / 2
  const cy = 115
  const r = 70
  return (
    <Svg>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={STROKE} strokeWidth={2} strokeDasharray="4 4" />
      <circle cx={cx} cy={cy - r} r={7} fill={ACCENT} />
      <Vec x1={cx} y1={cy - r} x2={cx + 36} y2={cy - r} label="v" />
      <Vec x1={cx} y1={cy - r} x2={cx} y2={cy - r + 26} color={MUTED} label="g" />
      <Label x={cx} y={cy + r + 22}>
        r = {(radius * 100).toFixed(0)} cm
      </Label>
    </Svg>
  )
}

export function HoleTableDiagram({ m, M, r }: { m: number; M: number; r: number }) {
  const cx = W / 2
  const cy = 90
  const rad = 55
  return (
    <Svg>
      <ellipse cx={cx} cy={cy} rx={rad + 25} ry={22} fill="#eef2f7" stroke="#cbd5e1" />
      <ellipse cx={cx} cy={cy} rx={rad} ry={18} fill="none" stroke={STROKE} strokeWidth={1.5} strokeDasharray="3 3" />
      <circle cx={cx + rad} cy={cy} r={7} fill={ACCENT} />
      <Label x={cx + rad} y={cy - 14}>
        m = {m} kg
      </Label>
      <line x1={cx} y1={cy} x2={cx} y2={cy + 60} stroke={STROKE} strokeWidth={2} />
      <rect x={cx - 14} y={cy + 60} width={28} height={22} fill="#fff" stroke={STROKE} strokeWidth={2} />
      <Label x={cx} y={cy + 75}>
        M = {M} kg
      </Label>
      <Label x={cx + rad / 2} y={cy + 40} color="#64748b">
        r = {r} m
      </Label>
    </Svg>
  )
}

export function ConicalPendulumDiagram({ angleDeg }: { L: number; angleDeg: number }) {
  const pivotX = W / 2
  const pivotY = 25
  const len = 130
  const rad = (angleDeg * Math.PI) / 180
  const bx = pivotX + len * Math.sin(rad)
  const by = pivotY + len * Math.cos(rad)
  return (
    <Svg>
      <line x1={pivotX - 20} y1={pivotY} x2={pivotX + 20} y2={pivotY} stroke={STROKE} strokeWidth={4} />
      <line x1={pivotX} y1={pivotY} x2={bx} y2={by} stroke={STROKE} strokeWidth={2} />
      <line x1={pivotX} y1={pivotY} x2={pivotX} y2={by} stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="3 3" />
      <ellipse cx={pivotX} cy={by} rx={len * Math.sin(rad)} ry={10} fill="none" stroke="#cbd5e1" strokeDasharray="3 3" />
      <circle cx={bx} cy={by} r={8} fill={ACCENT} />
      <Label x={pivotX + 10} y={pivotY + 30}>
        θ = {angleDeg}°
      </Label>
    </Svg>
  )
}

export function BankedCurveDiagram({ angleDeg }: { angleDeg: number }) {
  const baseY = 170
  const cx = W / 2
  const half = 90
  const rise = half * Math.tan((angleDeg * Math.PI) / 180) * 0.6
  return (
    <Svg>
      <path d={`M ${cx - half} ${baseY} L ${cx} ${baseY - rise} L ${cx + half} ${baseY}`} fill="none" stroke={STROKE} strokeWidth={3} />
      <line x1={cx - half} y1={baseY} x2={cx + half} y2={baseY} stroke="#cbd5e1" strokeWidth={1} strokeDasharray="3 3" />
      <Label x={cx - half + 30} y={baseY - rise * 0.35}>
        θ = {angleDeg.toFixed(1)}°
      </Label>
      <circle cx={cx} cy={baseY - rise - 6} r={6} fill={ACCENT} />
    </Svg>
  )
}

export function CylinderLoopDiagram({ radius, point }: { radius: number; point: string }) {
  const cx = W / 2
  const cy = 115
  const r = 70
  const dotY = point === 'top' ? cy - r : cy + r
  return (
    <Svg>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={STROKE} strokeWidth={3} />
      <circle cx={cx} cy={dotY} r={7} fill={ACCENT} />
      <Label x={cx} y={dotY + (point === 'top' ? -14 : 22)}>
        {point === 'top' ? 'Point B (top)' : 'Point A (bottom)'}
      </Label>
      <Label x={cx} y={cy + r + 22}>
        r = {radius} m
      </Label>
    </Svg>
  )
}

export function HillValleyDiagram({ r, shape }: { r: number; shape: string }) {
  const cx = W / 2
  const baseY = shape === 'hill' ? 170 : 60
  const sign = shape === 'hill' ? -1 : 1
  return (
    <Svg>
      <path d={`M 20 ${baseY} Q ${cx} ${baseY + sign * 100} ${W - 20} ${baseY}`} fill="none" stroke={STROKE} strokeWidth={3} />
      <circle cx={cx} cy={baseY + sign * 100} r={7} fill={ACCENT} />
      <Label x={cx} y={baseY + sign * 100 + (shape === 'hill' ? -14 : 24)}>
        r = {r} m
      </Label>
    </Svg>
  )
}
