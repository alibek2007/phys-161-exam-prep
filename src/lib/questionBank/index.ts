import type { PhysicsQuestion, Topic } from '../../types/question'
import { unitsQuestions } from './topics/units'
import { uncertaintyQuestions } from './topics/uncertainty'
import { vectorsQuestions } from './topics/vectors'
import { kinematics1dQuestions } from './topics/kinematics1d'
import { kinematics2dQuestions } from './topics/kinematics2d'
import { projectileQuestions } from './topics/projectile'
import { kinematics3dQuestions } from './topics/kinematics3d'
import { circularMotionQuestions } from './topics/circularMotion'
import { frictionQuestions } from './topics/friction'
import { newton2Questions } from './topics/newton2'
import { applicationsQuestions } from './topics/applications'
import { workQuestions } from './topics2/work'
import { kineticEnergyQuestions } from './topics2/kineticEnergy'
import { powerQuestions } from './topics2/power'
import { potentialEnergyQuestions } from './topics2/potentialEnergy'
import { energyConservationQuestions } from './topics2/energyConservation'
import { impulseCollisionsQuestions } from './topics2/impulseCollisions'
import { momentumQuestions } from './topics2/momentum'
import { rocketPropulsionQuestions } from './topics2/rocketPropulsion'
import { momentOfInertiaQuestions } from './topics2/momentOfInertia'
import { rotationQuestions } from './topics2/rotation'
import { torqueQuestions } from './topics2/torque'
import { angularMomentumQuestions } from './topics2/angularMomentum'

export const QUESTION_BANK: PhysicsQuestion[] = [
  ...unitsQuestions,
  ...uncertaintyQuestions,
  ...vectorsQuestions,
  ...kinematics1dQuestions,
  ...kinematics2dQuestions,
  ...projectileQuestions,
  ...kinematics3dQuestions,
  ...circularMotionQuestions,
  ...frictionQuestions,
  ...newton2Questions,
  ...applicationsQuestions,
  ...workQuestions,
  ...kineticEnergyQuestions,
  ...powerQuestions,
  ...potentialEnergyQuestions,
  ...energyConservationQuestions,
  ...impulseCollisionsQuestions,
  ...momentumQuestions,
  ...rocketPropulsionQuestions,
  ...momentOfInertiaQuestions,
  ...rotationQuestions,
  ...torqueQuestions,
  ...angularMomentumQuestions,
]

export const QUESTION_BY_ID: Map<string, PhysicsQuestion> = new Map(QUESTION_BANK.map((q) => [q.id, q]))

export const QUESTIONS_BY_TOPIC: Record<Topic, PhysicsQuestion[]> = QUESTION_BANK.reduce(
  (acc, q) => {
    ;(acc[q.topic] ??= []).push(q)
    return acc
  },
  {} as Record<Topic, PhysicsQuestion[]>,
)
