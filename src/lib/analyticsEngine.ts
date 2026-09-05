import type { Difficulty, Topic } from '../types/question'
import { TOPIC_LABELS } from '../types/question'
import type { ExamResult } from '../types/exam'

export interface DashboardStats {
  examsCompleted: number
  bestScorePct: number | null
  avgScorePct: number | null
  strongestTopic: Topic | null
  weakestTopic: Topic | null
}

export function computeDashboardStats(history: ExamResult[]): DashboardStats {
  if (history.length === 0) {
    return { examsCompleted: 0, bestScorePct: null, avgScorePct: null, strongestTopic: null, weakestTopic: null }
  }
  const pcts = history.map((r) => (r.score / r.total) * 100)
  const best = Math.max(...pcts)
  const avg = pcts.reduce((a, b) => a + b, 0) / pcts.length

  const topicAgg = aggregateTopics(history)
  const ranked = Object.entries(topicAgg)
    .filter(([, s]) => s.total >= 2)
    .map(([topic, s]) => [topic, s.correct / s.total] as const)
    .sort((a, b) => b[1] - a[1])

  return {
    examsCompleted: history.length,
    bestScorePct: best,
    avgScorePct: avg,
    strongestTopic: (ranked[0]?.[0] as Topic) ?? null,
    weakestTopic: (ranked[ranked.length - 1]?.[0] as Topic) ?? null,
  }
}

export function aggregateTopics(history: ExamResult[]): Partial<Record<Topic, { correct: number; total: number }>> {
  const agg: Partial<Record<Topic, { correct: number; total: number }>> = {}
  for (const result of history) {
    for (const [topic, stat] of Object.entries(result.topicPerformance)) {
      const t = agg[topic as Topic] ??= { correct: 0, total: 0 }
      t.correct += stat!.correct
      t.total += stat!.total
    }
  }
  return agg
}

export function aggregateDifficulty(history: ExamResult[]): Partial<Record<Difficulty, { correct: number; total: number }>> {
  const agg: Partial<Record<Difficulty, { correct: number; total: number }>> = {}
  for (const result of history) {
    for (const [diff, stat] of Object.entries(result.difficultyPerformance)) {
      const d = Number(diff) as Difficulty
      const t = agg[d] ??= { correct: 0, total: 0 }
      t.correct += stat!.correct
      t.total += stat!.total
    }
  }
  return agg
}

export function scoreHistorySeries(history: ExamResult[]): { attempt: number; pct: number }[] {
  return history.map((r, i) => ({ attempt: i + 1, pct: Math.round((r.score / r.total) * 100) }))
}

export interface Recommendation {
  strong: Topic[]
  weak: Topic[]
  message: string
}

export function personalizedRecommendation(history: ExamResult[]): Recommendation | null {
  if (history.length < 2) return null
  const agg = aggregateTopics(history)
  const entries = Object.entries(agg).filter(([, s]) => s!.total >= 2)
  if (entries.length === 0) return null

  const withPct = entries.map(([topic, s]) => ({ topic: topic as Topic, pct: s!.correct / s!.total }))
  withPct.sort((a, b) => b.pct - a.pct)

  const strong = withPct.filter((e) => e.pct >= 0.75).map((e) => e.topic)
  const weak = withPct.filter((e) => e.pct < 0.6).map((e) => e.topic)

  const message =
    weak.length > 0
      ? `Practice a few more ${TOPIC_LABELS[weak[weak.length - 1]]} problems before your next full exam.`
      : 'Solid performance across topics — keep up mixed full-length exams.'

  return { strong, weak, message }
}
