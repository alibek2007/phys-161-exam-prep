import { Label, polar, STROKE, ACCENT, Svg, Vec, W, H } from './shared'

export function VectorPairDiagram({ magA, magB, angleDeg, mode }: { magA: number; magB: number; angleDeg: number; mode: string }) {
  const cx = W / 2
  const cy = H / 2 + 20
  const scale = 55 / Math.max(magA, magB, 1)
  const rA = Math.max(magA * scale, 20)
  const rB = Math.max(magB * scale, 20)

  const [ax, ay] = polar(cx, cy, rA, 0)
  const [bx, by] = polar(cx, cy, rB, angleDeg)

  return (
    <Svg>
      <line x1={20} y1={cy} x2={W - 20} y2={cy} stroke="#e2e8f0" strokeWidth={1} />
      <Vec x1={cx} y1={cy} x2={ax} y2={ay} label="A" />
      <Vec x1={cx} y1={cy} x2={bx} y2={by} color={ACCENT} label="B" />
      {mode === 'sum' && (
        <>
          <line x1={ax} y1={ay} x2={ax + (bx - cx)} y2={ay + (by - cy)} stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="3 3" />
          <line x1={bx} y1={by} x2={bx + (ax - cx)} y2={by + (ay - cy)} stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="3 3" />
          <Vec x1={cx} y1={cy} x2={ax + bx - cx} y2={ay + by - cy} color="#16a34a" label="A+B" />
        </>
      )}
      {mode === 'diff' && <Vec x1={bx} y1={by} x2={ax} y2={ay} color="#16a34a" label="A-B" />}
      {(mode === 'dot' || mode === 'cross') && (
        <path d={`M ${cx + 26} ${cy} A 26 26 0 0 0 ${cx + 26 * Math.cos(-(angleDeg * Math.PI) / 180)} ${cy + 26 * Math.sin(-(angleDeg * Math.PI) / 180)}`} fill="none" stroke={STROKE} strokeWidth={1} />
      )}
      <Label x={cx} y={cy + 18}>
        θ = {angleDeg}°
      </Label>
      {mode === 'components' && (
        <>
          <line x1={ax} y1={cy} x2={ax} y2={ay} stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="3 3" />
          <Label x={(cx + ax) / 2} y={cy + 16}>
            Bₓ
          </Label>
        </>
      )}
    </Svg>
  )
}
