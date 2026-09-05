import type { Topic } from '../types/question'
import type { ExamConfig, ExamSession } from '../types/exam'
import { DEFAULT_EXAM_CONFIG } from '../types/exam'
import { QUESTIONS_BY_TOPIC } from './questionBank'
import { mulberry32, pickInt, seedFromString } from './physics/random'

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function randomExamSeed(): number {
  return (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0
}

/**
 * Builds an exam of `config.questionCount` questions with balanced topic coverage: distinct
 * topics are shuffled and one question is drawn from each, so no topic repeats and no two
 * questions can ever be exact duplicates.
 */
export function generateExam(config: ExamConfig = DEFAULT_EXAM_CONFIG, seed?: number): ExamSession {
  const examSeed = seed ?? randomExamSeed()
  const rng = mulberry32(examSeed)

  const allTopics = Object.keys(QUESTIONS_BY_TOPIC) as Topic[]
  const topics = shuffle(allTopics, rng).slice(0, config.questionCount)

  const questions = topics.map((topic, i) => {
    const pool = QUESTIONS_BY_TOPIC[topic]
    const question = pool[pickInt(rng, 0, pool.length - 1)]
    const variantSeed = seedFromString(`${examSeed}:${question.id}:${i}`)
    const variant = question.generate(mulberry32(variantSeed))
    variant.seed = variantSeed
    return variant
  })

  const startedAt = Date.now()
  return {
    examId: crypto.randomUUID(),
    seed: examSeed,
    startedAt,
    deadline: startedAt + config.durationMinutes * 60_000,
    config,
    questions,
    answers: {},
    flags: {},
    status: 'active',
  }
}

/** Generates a single fresh variant of one question (used by Practice Mode). */
export function generatePracticeVariant(questionId: string, seed?: number) {
  const q = [...Object.values(QUESTIONS_BY_TOPIC)].flat().find((question) => question.id === questionId)
  if (!q) throw new Error(`Unknown question id: ${questionId}`)
  const variantSeed = seed ?? randomExamSeed()
  const variant = q.generate(mulberry32(variantSeed))
  variant.seed = variantSeed
  return variant
}

export function remainingMs(session: ExamSession): number {
  return Math.max(0, session.deadline - Date.now())
}

export function isExpired(session: ExamSession): boolean {
  return Date.now() >= session.deadline
}
