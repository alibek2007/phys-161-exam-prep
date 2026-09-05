import type {
  DiagramSpec,
  Difficulty,
  GeneratedParams,
  ParamRange,
  PhysicsQuestion,
  QuestionVariant,
  SolutionStep,
  Tolerance,
  Topic,
} from '../../types/question'
import { pickNice } from '../physics/random'

export interface QuestionDef {
  sourceRef: string
  topic: Topic
  subtopic?: string
  difficulty: Difficulty
  /** Set false for problems that depend on a fixed diagram/answer and shouldn't vary numerically. */
  randomizable?: boolean
  params: Record<string, ParamRange>
  /** Reject a sampled parameter combination (e.g. to avoid degenerate physical setups). */
  constraints?: (p: GeneratedParams) => boolean
  prompt: (p: GeneratedParams) => string
  compute: (p: GeneratedParams) => { value: number; unit: string; tolerance?: Tolerance }
  solution: (p: GeneratedParams, answer: number) => SolutionStep[]
  diagram?: (p: GeneratedParams) => DiagramSpec
}

const DEFAULT_TOLERANCE: Tolerance = { mode: 'relative', value: 0.015 }
const MAX_ATTEMPTS = 500

export function defineQuestion(id: string, def: QuestionDef): PhysicsQuestion {
  return {
    id,
    sourceRef: def.sourceRef,
    topic: def.topic,
    subtopic: def.subtopic,
    difficulty: def.difficulty,
    type: 'numeric',
    randomizable: def.randomizable ?? true,
    generate(rng): QuestionVariant {
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const params: GeneratedParams = {}
        for (const [key, range] of Object.entries(def.params)) {
          params[key] = pickNice(rng, range)
        }
        if (def.constraints && !def.constraints(params)) continue

        let result: { value: number; unit: string; tolerance?: Tolerance }
        try {
          result = def.compute(params)
        } catch {
          continue
        }
        if (!Number.isFinite(result.value)) continue

        let diagram: DiagramSpec | undefined
        try {
          diagram = def.diagram?.(params)
        } catch {
          continue
        }

        let solutionSteps: SolutionStep[]
        try {
          solutionSteps = def.solution(params, result.value)
        } catch {
          continue
        }

        return {
          questionId: id,
          sourceRef: def.sourceRef,
          seed: 0,
          topic: def.topic,
          subtopic: def.subtopic,
          difficulty: def.difficulty,
          prompt: def.prompt(params),
          params,
          answer: {
            value: result.value,
            unit: result.unit,
            tolerance: result.tolerance ?? DEFAULT_TOLERANCE,
          },
          solutionSteps,
          diagram,
        }
      }
      throw new Error(`[questionBank] Failed to generate a valid variant for ${id} (${def.sourceRef})`)
    },
  }
}

/** Helper for a param range that is pinned to a single fixed value (non-randomized inputs, e.g. g). */
export function fixed(value: number): ParamRange {
  return { min: value, max: value, step: 1 }
}
