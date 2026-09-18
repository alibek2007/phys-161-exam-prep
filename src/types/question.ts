export type ExamSet = 'exam1' | 'exam2'

export const EXAM_SET_LABELS: Record<ExamSet, string> = {
  exam1: 'Exam 1',
  exam2: 'Exam 2',
}

export const EXAM_SET_TAGLINES: Record<ExamSet, string> = {
  exam1: 'Units, vectors, kinematics, circular motion & Newton’s laws',
  exam2: 'Work, energy, momentum, rotation, torque & angular momentum',
}

export type Exam1Topic =
  | 'units'
  | 'uncertainty'
  | 'vectors'
  | 'kinematics1d'
  | 'kinematics2d'
  | 'projectile'
  | 'kinematics3d'
  | 'circular'
  | 'friction'
  | 'newton2'
  | 'applications'

export type Exam2Topic =
  | 'work'
  | 'kineticEnergy'
  | 'power'
  | 'potentialEnergy'
  | 'energyConservation'
  | 'impulseCollisions'
  | 'momentum'
  | 'rocketPropulsion'
  | 'momentOfInertia'
  | 'rotation'
  | 'torque'
  | 'angularMomentum'

export type Topic = Exam1Topic | Exam2Topic

export const TOPIC_LABELS: Record<Topic, string> = {
  units: 'Units & Conversions',
  uncertainty: 'Uncertainty',
  vectors: 'Vectors',
  kinematics1d: 'Kinematics (1D)',
  kinematics2d: 'Kinematics (2D)',
  projectile: 'Projectile Motion',
  kinematics3d: 'Kinematics (Vector Form)',
  circular: 'Circular Motion',
  friction: 'Friction',
  newton2: "Newton's 2nd Law",
  applications: "Applications of Newton's Laws",
  work: 'Work',
  kineticEnergy: 'Kinetic Energy',
  power: 'Power',
  potentialEnergy: 'Potential Energy',
  energyConservation: 'Energy Conservation',
  impulseCollisions: 'Impulse & Collisions',
  momentum: 'Conservation of Momentum',
  rocketPropulsion: 'Rocket Propulsion',
  momentOfInertia: 'Moment of Inertia',
  rotation: 'Rotation',
  torque: 'Torque',
  angularMomentum: 'Angular Momentum',
}

export const TOPIC_EXAM_SET: Record<Topic, ExamSet> = {
  units: 'exam1',
  uncertainty: 'exam1',
  vectors: 'exam1',
  kinematics1d: 'exam1',
  kinematics2d: 'exam1',
  projectile: 'exam1',
  kinematics3d: 'exam1',
  circular: 'exam1',
  friction: 'exam1',
  newton2: 'exam1',
  applications: 'exam1',
  work: 'exam2',
  kineticEnergy: 'exam2',
  power: 'exam2',
  potentialEnergy: 'exam2',
  energyConservation: 'exam2',
  impulseCollisions: 'exam2',
  momentum: 'exam2',
  rocketPropulsion: 'exam2',
  momentOfInertia: 'exam2',
  rotation: 'exam2',
  torque: 'exam2',
  angularMomentum: 'exam2',
}

export type Difficulty = 1 | 2 | 3

export type ToleranceMode = 'relative' | 'absolute' | 'sigfig'

export interface Tolerance {
  mode: ToleranceMode
  value: number
}

export interface ParamRange {
  min: number
  max: number
  /** Granularity to snap generated values to. Default 1. */
  step?: number
  unit?: string
}

export type GeneratedParams = Record<string, number>

export interface SolutionStep {
  label: string
  /** KaTeX math string (no surrounding $) */
  math?: string
  /** Plain text note, shown alongside or instead of math */
  text?: string
}

export interface AnswerSpec {
  value: number
  unit: string
  tolerance: Tolerance
}

export interface DiagramSpec {
  kind: string
  props: Record<string, number | string | boolean>
}

export interface QuestionVariant {
  questionId: string
  sourceRef: string
  seed: number
  topic: Topic
  subtopic?: string
  difficulty: Difficulty
  prompt: string
  params: GeneratedParams
  answer: AnswerSpec
  solutionSteps: SolutionStep[]
  diagram?: DiagramSpec
}

export interface PhysicsQuestion {
  id: string
  sourceRef: string
  topic: Topic
  subtopic?: string
  difficulty: Difficulty
  type: 'numeric'
  randomizable: boolean
  /** Generate a validated variant using the given seeded RNG. */
  generate: (rng: () => number) => QuestionVariant
}
