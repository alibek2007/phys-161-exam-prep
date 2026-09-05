import { ACCENT, Label, MUTED, STROKE, Svg, Vec, W } from './shared'

export function PulleyBlockHangingDiagram({ m1, m2, forceAngleDeg }: { m1: number; m2: number; forceAngleDeg?: number }) {
  const tableY = 90
  const blockX = 140
  const pulleyX = 240
  return (
    <Svg>
      <line x1={20} y1={tableY} x2={pulleyX} y2={tableY} stroke={STROKE} strokeWidth={3} />
      <circle cx={pulleyX} cy={tableY - 14} r={12} fill="none" stroke={STROKE} strokeWidth={2.5} />
      <rect x={blockX - 20} y={tableY - 28} width={40} height={28} fill="#fff" stroke={STROKE} strokeWidth={2} />
      <Label x={blockX} y={tableY - 10}>
        m₁={m1}
      </Label>
      <line x1={blockX + 20} y1={tableY - 14} x2={pulleyX} y2={tableY - 14} stroke={STROKE} strokeWidth={1.5} />
      <line x1={pulleyX} y1={tableY - 2} x2={pulleyX} y2={tableY + 55} stroke={STROKE} strokeWidth={1.5} />
      <rect x={pulleyX - 16} y={tableY + 55} width={32} height={26} fill="#fff" stroke={STROKE} strokeWidth={2} />
      <Label x={pulleyX} y={tableY + 72}>
        m₂={m2}
      </Label>
      {forceAngleDeg !== undefined && (
        <Vec
          x1={blockX - 20}
          y1={tableY - 14}
          x2={blockX - 20 - 45 * Math.cos((forceAngleDeg * Math.PI) / 180)}
          y2={tableY - 14 - 45 * Math.sin((forceAngleDeg * Math.PI) / 180)}
          color={ACCENT}
          label="F"
        />
      )}
    </Svg>
  )
}

export function ChainLinksDiagram({ a, highlightBoundary }: { linkMass: number; a: number; highlightBoundary: number }) {
  const cx = W / 2
  const startY = 25
  const step = 32
  return (
    <Svg>
      <Vec x1={cx} y1={startY - 15} x2={cx} y2={startY - 2} color={ACCENT} label="F" />
      {[5, 4, 3, 2, 1].map((n, i) => {
        const y = startY + i * step
        const isBoundary = n === highlightBoundary
        return (
          <g key={n}>
            <ellipse cx={cx} cy={y} rx={16} ry={11} fill={isBoundary ? '#fef3c7' : '#fff'} stroke={STROKE} strokeWidth={2} />
            <Label x={cx} y={y + 4}>
              {n}
            </Label>
          </g>
        )
      })}
      <Label x={cx} y={startY + 5 * step + 10} color={MUTED}>
        a = {a} m/s²
      </Label>
    </Svg>
  )
}

export function BlockAgainstBlockDiagram({ together }: { m1: number; m2: number; together?: boolean }) {
  const y = 90
  return (
    <Svg>
      <rect x={70} y={y - 10} width={40} height={60} fill="#fff" stroke={STROKE} strokeWidth={2} />
      <Vec x1={30} y1={y + 20} x2={68} y2={y + 20} color={ACCENT} label="F" />
      <Label x={90} y={y + 4}>
        A
      </Label>
      <rect x={110} y={y - 40} width={90} height={110} fill="#fff" stroke={STROKE} strokeWidth={2} />
      <Label x={155} y={y + 20}>
        B
      </Label>
      <line x1={110} y1={y + 90} x2={220} y2={y + 90} stroke="#cbd5e1" strokeWidth={2} />
      {together === false && (
        <Label x={155} y={y + 60} color="#dc2626" size={11}>
          B slides out
        </Label>
      )}
    </Svg>
  )
}

export function TwoRopeHangingDiagram({ angle1, angle2 }: { angle1: number; angle2: number }) {
  const anchorL = 40
  const anchorR = W - 40
  const ceilingY = 25
  const jx = W / 2
  const jy = 110
  return (
    <Svg>
      <line x1={10} y1={ceilingY} x2={W - 10} y2={ceilingY} stroke={STROKE} strokeWidth={4} />
      <line x1={anchorL} y1={ceilingY} x2={jx} y2={jy} stroke={STROKE} strokeWidth={2} />
      <line x1={anchorR} y1={ceilingY} x2={jx} y2={jy} stroke={STROKE} strokeWidth={2} />
      <line x1={jx} y1={jy} x2={jx} y2={jy + 45} stroke={STROKE} strokeWidth={2} />
      <rect x={jx - 15} y={jy + 45} width={30} height={22} fill="#fff" stroke={STROKE} strokeWidth={2} />
      <Label x={anchorL + 25} y={ceilingY + 22}>
        {angle1}°
      </Label>
      <Label x={anchorR - 25} y={ceilingY + 22}>
        {angle2}°
      </Label>
      <Label x={jx} y={jy + 82}>
        W
      </Label>
    </Svg>
  )
}

export function MovablePulleyDiagram({ W: weight }: { W: number }) {
  return (
    <Svg>
      <circle cx={W / 2} cy={30} r={12} fill="none" stroke={STROKE} strokeWidth={2.5} />
      <line x1={W / 2 - 12} y1={30} x2={W / 2 - 12} y2={110} stroke={STROKE} strokeWidth={1.5} />
      <line x1={W / 2 + 12} y1={30} x2={W / 2 + 12} y2={110} stroke={STROKE} strokeWidth={1.5} />
      <circle cx={W / 2} cy={122} r={12} fill="none" stroke={STROKE} strokeWidth={2.5} />
      <rect x={W / 2 - 18} y={134} width={36} height={30} fill="#fff" stroke={STROKE} strokeWidth={2} />
      <Label x={W / 2} y={153}>
        W={weight}N
      </Label>
      <Vec x1={W / 2 - 12} y1={110} x2={W / 2 - 12} y2={150} color={ACCENT} label="F" />
    </Svg>
  )
}

export function ClotheslineDiagram({ angleDeg }: { angleDeg: number }) {
  const postL = 40
  const postR = W - 40
  const topY = 30
  const sagY = 120
  return (
    <Svg>
      <line x1={postL} y1={topY} x2={postL} y2={sagY + 20} stroke={STROKE} strokeWidth={3} />
      <line x1={postR} y1={topY} x2={postR} y2={sagY + 20} stroke={STROKE} strokeWidth={3} />
      <path d={`M ${postL} ${topY} Q ${W / 2} ${sagY} ${postR} ${topY}`} fill="none" stroke={STROKE} strokeWidth={2} />
      <Label x={postL + 35} y={topY + 25}>
        {angleDeg.toFixed(0)}°
      </Label>
    </Svg>
  )
}

export function InclinePulleyDiagram({ alphaDeg, direction }: { alphaDeg: number; direction: number }) {
  const baseY = 170
  const topX = 60
  const rad = (alphaDeg * Math.PI) / 180
  const inclineLen = 200
  const topY = baseY - inclineLen * Math.sin(rad)
  const rightX = topX + inclineLen * Math.cos(rad)
  return (
    <Svg>
      <path d={`M ${topX} ${topY} L ${topX} ${baseY} L ${rightX} ${baseY} Z`} fill="#eef2f7" stroke={STROKE} strokeWidth={2} />
      <rect x={topX + 60} y={baseY - 60 * Math.sin(rad) - 16} width={30} height={20} fill="#fff" stroke={STROKE} strokeWidth={2} transform={`rotate(${-alphaDeg} ${topX + 60 + 15} ${baseY - 60 * Math.sin(rad) - 6})`} />
      <circle cx={rightX + 6} cy={topY} r={10} fill="none" stroke={STROKE} strokeWidth={2} />
      <line x1={rightX + 6} y1={topY + 10} x2={rightX + 6} y2={topY + 50} stroke={STROKE} strokeWidth={1.5} />
      <rect x={rightX - 8} y={topY + 50} width={28} height={22} fill="#fff" stroke={STROKE} strokeWidth={2} />
      <Label x={rightX + 6} y={topY + 66}>
        m₂
      </Label>
      <Vec
        x1={topX + 75}
        y1={baseY - 75 * Math.sin(rad) - 6}
        x2={topX + 75 + 30 * Math.cos(rad) * direction}
        y2={baseY - 75 * Math.sin(rad) - 6 - 30 * Math.sin(rad) * direction}
        color={ACCENT}
      />
      <Label x={topX + 40} y={baseY - 8} color={MUTED}>
        α={alphaDeg}°
      </Label>
    </Svg>
  )
}

export function BlockCordWeightDiagram({ angleDeg }: { angleDeg: number }) {
  const tableY = 120
  const blockX = 90
  const pulleyX = 220
  const rad = (angleDeg * Math.PI) / 180
  return (
    <Svg>
      <line x1={20} y1={tableY} x2={W - 20} y2={tableY} stroke={STROKE} strokeWidth={3} />
      <rect x={blockX - 22} y={tableY - 24} width={44} height={24} fill="#fff" stroke={STROKE} strokeWidth={2} />
      <Label x={blockX} y={tableY - 8}>
        A
      </Label>
      <circle cx={pulleyX} cy={tableY - 60 * Math.sin(rad)} r={9} fill="none" stroke={STROKE} strokeWidth={2} />
      <line x1={blockX + 22} y1={tableY - 12} x2={pulleyX} y2={tableY - 60 * Math.sin(rad)} stroke={STROKE} strokeWidth={1.5} />
      <line x1={pulleyX} y1={tableY - 60 * Math.sin(rad) + 9} x2={pulleyX} y2={tableY + 30} stroke={STROKE} strokeWidth={1.5} />
      <rect x={pulleyX - 14} y={tableY + 30} width={28} height={22} fill="#fff" stroke={STROKE} strokeWidth={2} />
      <Label x={pulleyX} y={tableY + 46}>
        w
      </Label>
      <Label x={(blockX + pulleyX) / 2} y={tableY - 30 * Math.sin(rad) - 6}>
        α = {angleDeg}°
      </Label>
    </Svg>
  )
}

export function BlockOnBlockDiagram({ together }: { together: boolean }) {
  return <BlockAgainstBlockDiagram m1={0} m2={0} together={together} />
}

export function WindowBrushDiagram({ angleDeg }: { angleDeg: number }) {
  const wallX = 60
  const brushY = 110
  const rad = (angleDeg * Math.PI) / 180
  return (
    <Svg>
      <rect x={20} y={20} width={wallX - 20} height={170} fill="#eef2f7" stroke={STROKE} strokeWidth={2} />
      <rect x={wallX} y={brushY - 15} width={30} height={30} fill="#fff" stroke={STROKE} strokeWidth={2} />
      <Vec x1={wallX + 30} y1={brushY} x2={wallX + 30 + 70 * Math.cos(rad)} y2={brushY - 70 * Math.sin(rad)} color={ACCENT} label="F" />
      <Vec x1={wallX + 15} y1={brushY - 15} x2={wallX + 15} y2={brushY - 45} color={MUTED} label="up" />
      <Label x={wallX + 60} y={brushY + 30} color={MUTED}>
        α = {angleDeg}°
      </Label>
    </Svg>
  )
}
