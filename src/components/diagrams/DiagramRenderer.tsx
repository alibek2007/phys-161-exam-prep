import type { DiagramSpec } from '../../types/question'
import { VectorPairDiagram } from './VectorDiagrams'
import {
  BankedCurveDiagram,
  CircularHillDiagram,
  ConicalPendulumDiagram,
  CylinderLoopDiagram,
  HillValleyDiagram,
  HoleTableDiagram,
  VerticalCircleDiagram,
} from './CircularDiagrams'
import {
  BlockAgainstBlockDiagram,
  BlockCordWeightDiagram,
  BlockOnBlockDiagram,
  ChainLinksDiagram,
  ClotheslineDiagram,
  InclinePulleyDiagram,
  MovablePulleyDiagram,
  PulleyBlockHangingDiagram,
  TwoRopeHangingDiagram,
  WindowBrushDiagram,
} from './MechanicsDiagrams'

export function DiagramRenderer({ diagram }: { diagram: DiagramSpec }) {
  const p = diagram.props as Record<string, number & string & boolean>

  switch (diagram.kind) {
    case 'vectorPair':
      return <VectorPairDiagram magA={p.magA as unknown as number} magB={p.magB as unknown as number} angleDeg={p.angleDeg as unknown as number} mode={p.mode as unknown as string} />
    case 'circularHill':
      return <CircularHillDiagram radius={p.radius as unknown as number} />
    case 'verticalCircle':
      return <VerticalCircleDiagram radius={p.radius as unknown as number} />
    case 'holeTable':
      return <HoleTableDiagram m={p.m as unknown as number} M={p.M as unknown as number} r={p.r as unknown as number} />
    case 'conicalPendulum':
      return <ConicalPendulumDiagram L={p.L as unknown as number} angleDeg={p.angleDeg as unknown as number} />
    case 'bankedCurve':
      return <BankedCurveDiagram angleDeg={p.angleDeg as unknown as number} />
    case 'cylinderLoop':
      return <CylinderLoopDiagram radius={p.radius as unknown as number} point={p.point as unknown as string} />
    case 'hillValley':
      return <HillValleyDiagram r={p.r as unknown as number} shape={p.shape as unknown as string} />
    case 'pulleyBlockHanging':
      return <PulleyBlockHangingDiagram m1={p.m1 as unknown as number} m2={p.m2 as unknown as number} forceAngleDeg={p.forceAngleDeg as unknown as number | undefined} />
    case 'chainLinks':
      return <ChainLinksDiagram linkMass={p.linkMass as unknown as number} a={p.a as unknown as number} highlightBoundary={p.highlightBoundary as unknown as number} />
    case 'blockAgainstBlock':
      return <BlockAgainstBlockDiagram m1={p.m1 as unknown as number} m2={p.m2 as unknown as number} />
    case 'twoRopeHanging':
      return <TwoRopeHangingDiagram angle1={p.angle1 as unknown as number} angle2={p.angle2 as unknown as number} />
    case 'movablePulley':
      return <MovablePulleyDiagram W={p.W as unknown as number} />
    case 'clothesline':
      return <ClotheslineDiagram angleDeg={p.angleDeg as unknown as number} />
    case 'inclinePulley':
      return <InclinePulleyDiagram alphaDeg={p.alphaDeg as unknown as number} direction={p.direction as unknown as number} />
    case 'blockCordWeight':
      return <BlockCordWeightDiagram angleDeg={p.angleDeg as unknown as number} />
    case 'blockOnBlock':
      return <BlockOnBlockDiagram together={p.together as unknown as boolean} />
    case 'windowBrush':
      return <WindowBrushDiagram angleDeg={p.angleDeg as unknown as number} />
    default:
      return null
  }
}
