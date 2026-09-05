import type { AnswerSpec } from '../types/question'
import type { ExamResult, ExamSession, TopicStat } from '../types/exam'

/** Parses a student's raw text input into a number, tolerant of stray whitespace/commas. */
export function parseStudentAnswer(raw: string): number | null {
  const cleaned = raw.trim().replace(/,/g, '')
  if (cleaned === '') return null
  const value = Number(cleaned)
  return Number.isFinite(value) ? value : null
}

export function isAnswerCorrect(answer: AnswerSpec, raw: string): boolean {
  const value = parseStudentAnswer(raw)
  if (value === null) return false
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
