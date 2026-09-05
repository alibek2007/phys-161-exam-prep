export type Topic =
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
