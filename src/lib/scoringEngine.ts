import type { AnswerSpec } from '../types/question'
import type { ExamResult, ExamSession, TopicStat } from '../types/exam'

export interface ParsedAnswer {
  value: number
  /** Whatever text followed the number, trimmed — the student's attempt at units. */
  unit: string
}

/** Splits a student's raw text into a leading number and a trailing unit string, e.g. "12.5 m/s^2". */
export function parseStudentAnswer(raw: string): ParsedAnswer | null {
  const cleaned = raw.trim().replace(/,/g, '')
  if (cleaned === '') return null
  const match = cleaned.match(/^([+-]?\d*\.?\d+(?:[eE][+-]?\d+)?)\s*(.*)$/)
  if (!match) return null
  const value = Number(match[1])
  if (!Number.isFinite(value)) return null
  return { value, unit: match[2].trim() }
}

/** Normalizes a unit string so common keyboard-friendly variants compare equal (m/s^2 = m/s2 = m/s²). */
function normalizeUnit(unit: string): string {
  return unit
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/°/g, 'deg')
    .replace(/degrees?/g, 'deg')
    .replace(/²/g, '2')
    .replace(/³/g, '3')
    .replace(/\^/g, '')
    .replace(/[·*]/g, '')
}

/** A blank expected unit (dimensionless answer) always matches — nothing for the student to enter. */
export function unitsMatch(expectedUnit: string, enteredUnit: string): boolean {
  if (expectedUnit.trim() === '') return true
  return normalizeUnit(expectedUnit) === normalizeUnit(enteredUnit)
}

function withinTolerance(answer: AnswerSpec, value: number): boolean {
  const { value: correct, tolerance } = answer
  switch (tolerance.mode) {
    case 'relative':
      return Math.abs(value - correct) <= Math.abs(correct) * tolerance.value + 1e-9
    case 'absolute':
      return Math.abs(value - correct) <= tolerance.value
    case 'sigfig': {
      const round = (n: number) => Number(n.toPrecision(tolerance.value))
      return round(value) === round(correct)
    }
    default:
      return false
  }
}

export type AnswerCheckResult = 'correct' | 'wrong_value' | 'missing_units' | 'wrong_units' | 'unparseable'

/** Checks a raw student answer against the expected value AND expected units, distinguishing why it's wrong. */
export function checkAnswer(answer: AnswerSpec, raw: string): AnswerCheckResult {
  const parsed = parseStudentAnswer(raw)
  if (!parsed) return 'unparseable'

  const valueOk = withinTolerance(answer, parsed.value)
  const needsUnit = answer.unit.trim() !== ''

  if (needsUnit && parsed.unit === '') return valueOk ? 'missing_units' : 'wrong_value'
  if (!unitsMatch(answer.unit, parsed.unit)) return valueOk ? 'wrong_units' : 'wrong_value'
  return valueOk ? 'correct' : 'wrong_value'
}

export function isAnswerCorrect(answer: AnswerSpec, raw: string): boolean {
  return checkAnswer(answer, raw) === 'correct'
}

export function scoreExam(session: ExamSession, timeExpired: boolean): ExamResult {
  const correctByQuestion: Record<string, boolean> = {}
  const topicPerformance: Partial<Record<string, TopicStat>> = {}
  const difficultyPerformance: Partial<Record<number, TopicStat>> = {}

  let score = 0
  for (const q of session.questions) {
    const raw = session.answers[q.questionId] ?? ''
    const correct = isAnswerCorrect(q.answer, raw)
    correctByQuestion[q.questionId] = correct
    if (correct) score++

    const topicStat = (topicPerformance[q.topic] ??= { correct: 0, total: 0 })
    topicStat.total++
    if (correct) topicStat.correct++

    const diffStat = (difficultyPerformance[q.difficulty] ??= { correct: 0, total: 0 })
    diffStat.total++
    if (correct) diffStat.correct++
  }

  const completedAt = session.submittedAt ?? Date.now()
  return {
    examId: session.examId,
    seed: session.seed,
    completedAt,
    durationSec: Math.round((completedAt - session.startedAt) / 1000),
    score,
    total: session.questions.length,
    correctByQuestion,
    topicPerformance: topicPerformance as ExamResult['topicPerformance'],
    difficultyPerformance: difficultyPerformance as ExamResult['difficultyPerformance'],
    questions: session.questions,
    answers: session.answers,
    timeExpired,
  }
}
