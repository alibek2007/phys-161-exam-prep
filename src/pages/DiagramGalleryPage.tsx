import type { DiagramSpec } from '../types/question'
import { DiagramRenderer } from '../components/diagrams/DiagramRenderer'
import { Card } from '../components/ui/Card'

const SAMPLES: DiagramSpec[] = [
  { kind: 'vectorPair', props: { magA: 6, magB: 4, angleDeg: 110, mode: 'sum' } },
  { kind: 'vectorPair', props: { magA: 6, magB: 4, angleDeg: 60, mode: 'diff' } },
  { kind: 'vectorComponents', props: { mag: 7, angleDeg: 75 } },
  { kind: 'vectorPair', props: { magA: 6, magB: 14, angleDeg: 60, mode: 'dot' } },
  { kind: 'vectorPair', props: { magA: 8, magB: 10.5, angleDeg: 60, mode: 'cross' } },
  { kind: 'circularHill', props: { radius: 530 } },
  { kind: 'verticalCircle', props: { radius: 0.8 } },
  { kind: 'holeTable', props: { m: 1, M: 1.5, r: 0.18 } },
  { kind: 'conicalPendulum', props: { L: 0.88, angleDeg: 14 } },
  { kind: 'bankedCurve', props: { angleDeg: 27 } },
  { kind: 'cylinderLoop', props: { radius: 4, point: 'bottom' } },
  { kind: 'cylinderLoop', props: { radius: 4, point: 'top' } },
  { kind: 'hillValley', props: { r: 40, shape: 'hill' } },
  { kind: 'hillValley', props: { r: 40, shape: 'valley' } },
  { kind: 'pulleyBlockHanging', props: { m1: 4, m2: 2.8 } },
  { kind: 'pulleyBlockHanging', props: { m1: 26, m2: 4.3, forceAngleDeg: 30.9 } },
  { kind: 'chainLinks', props: { linkMass: 0.6, a: 2.2, highlightBoundary: 2 } },
  { kind: 'chainLinks', props: { linkMass: 0.6, a: 2.2, highlightBoundary: 5 } },
  { kind: 'blockAgainstBlock', props: { m1: 20, m2: 60 } },
  { kind: 'twoRopeHanging', props: { angle1: 60, angle2: 40 } },
  { kind: 'movablePulley', props: { W: 380 } },
  { kind: 'clothesline', props: { angleDeg: 16 } },
  { kind: 'inclinePulley', props: { alphaDeg: 39, direction: 1 } },
  { kind: 'inclinePulley', props: { alphaDeg: 29, direction: -1 } },
  { kind: 'blockCordWeight', props: { angleDeg: 52 } },
  { kind: 'blockOnBlock', props: { together: true } },
  { kind: 'blockOnBlock', props: { together: false } },
  { kind: 'windowBrush', props: { angleDeg: 58.8 } },
]

export function DiagramGalleryPage() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {SAMPLES.map((spec, i) => (
        <Card key={i} className="p-3 flex flex-col items-center gap-1">
          <span className="text-xs font-mono text-navy-500">
            {spec.kind} {JSON.stringify(spec.props)}
          </span>
          <DiagramRenderer diagram={spec} />
        </Card>
      ))}
    </div>
  )
}
