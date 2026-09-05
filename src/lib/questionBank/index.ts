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
]

export const QUESTION_BY_ID: Map<string, PhysicsQuestion> = new Map(QUESTION_BANK.map((q) => [q.id, q]))

export const QUESTIONS_BY_TOPIC: Record<Topic, PhysicsQuestion[]> = QUESTION_BANK.reduce(
  (acc, q) => {
    ;(acc[q.topic] ??= []).push(q)
    return acc
  },
  {} as Record<Topic, PhysicsQuestion[]>,
)
