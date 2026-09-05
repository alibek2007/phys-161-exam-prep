import type { Difficulty, QuestionVariant, Topic } from './question'

export interface ExamConfig {
  questionCount: number
  durationMinutes: number
  allowBackNavigation: boolean
  showProgress: boolean
}

export const DEFAULT_EXAM_CONFIG: ExamConfig = {
  questionCount: 7,
  durationMinutes: 40,
  allowBackNavigation: true,
  showProgress: true,
}

export type ExamStatus = 'active' | 'submitted' | 'time_expired'

export interface ExamSession {
  examId: string
  seed: number
  startedAt: number
  deadline: number
  config: ExamConfig
  questions: QuestionVariant[]
  answers: Record<string, string>
  flags: Record<string, boolean>
  status: ExamStatus
  submittedAt?: number
}

export interface TopicStat {
  correct: number
  total: number
}

export interface ExamResult {
  examId: string
  seed: number
  completedAt: number
  durationSec: number
  score: number
  total: number
  correctByQuestion: Record<string, boolean>
  topicPerformance: Partial<Record<Topic, TopicStat>>
  difficultyPerformance: Partial<Record<Difficulty, TopicStat>>
  questions: QuestionVariant[]
  answers: Record<string, string>
  timeExpired: boolean
}
