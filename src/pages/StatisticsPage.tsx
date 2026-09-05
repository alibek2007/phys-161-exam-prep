import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { storage } from '../lib/storage'
import { aggregateDifficulty, aggregateTopics, personalizedRecommendation, scoreHistorySeries } from '../lib/analyticsEngine'
import { TOPIC_LABELS } from '../types/question'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

const DIFF_LABELS: Record<number, string> = { 1: 'Easy', 2: 'Medium', 3: 'Hard' }

export function StatisticsPage() {
  const navigate = useNavigate()
  const history = useMemo(() => storage.getHistory(), [])

  if (history.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-navy-700">Complete an exam to see your statistics.</p>
        <Button className="mt-4" onClick={() => navigate('/')}>
          Start Exam
        </Button>
      </Card>
    )
  }

  const scoreSeries = scoreHistorySeries(history)
  const topicAgg = aggregateTopics(history)
  const diffAgg = aggregateDifficulty(history)
  const recommendation = personalizedRecommendation(history)

  const topicData = Object.entries(topicAgg).map(([topic, s]) => ({
    topic: TOPIC_LABELS[topic as keyof typeof TOPIC_LABELS],
    pct: Math.round((s!.correct / s!.total) * 100),
  }))

  const diffData = ([1, 2, 3] as const)
    .filter((d) => diffAgg[d])
    .map((d) => ({ difficulty: DIFF_LABELS[d], pct: Math.round((diffAgg[d]!.correct / diffAgg[d]!.total) * 100) }))

  const times = history.flatMap((r) => (r.durationSec > 0 ? [r.durationSec / r.total] : []))
  const avgTimePerQ = times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0
  const fastest = history.reduce((best, r) => Math.min(best, r.durationSec), Infinity)
  const slowest = history.reduce((worst, r) => Math.max(worst, r.durationSec), 0)

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-navy-950">Statistics</h1>

      <Card className="p-6">
        <h2 className="font-bold text-navy-950 mb-4">Score history</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={scoreSeries} margin={{ left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7edf5" />
            <XAxis dataKey="attempt" tick={{ fontSize: 12, fill: '#2a5a91' }} label={{ value: 'Attempt', position: 'insideBottom', offset: -2, fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#2a5a91' }} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Line type="monotone" dataKey="pct" stroke="#f5a524" strokeWidth={3} dot={{ r: 4, fill: '#f5a524' }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="font-bold text-navy-950 mb-4">Performance by topic</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topicData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7edf5" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#2a5a91' }} />
              <YAxis type="category" dataKey="topic" width={110} tick={{ fontSize: 11, fill: '#102a4c' }} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="pct" fill="#16365f" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="font-bold text-navy-950 mb-4">Accuracy by difficulty</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={diffData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7edf5" />
              <XAxis dataKey="difficulty" tick={{ fontSize: 12, fill: '#2a5a91' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#2a5a91' }} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="pct" fill="#f5a524" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="font-bold text-navy-950 mb-4">Time performance</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-navy-950">{Math.round(avgTimePerQ)}s</div>
            <div className="text-xs text-navy-600 uppercase tracking-wide">Avg / question</div>
          </div>
          <div>
            <div className="text-xl font-bold text-navy-950">{fastest === Infinity ? '—' : `${Math.floor(fastest / 60)}:${(fastest % 60).toString().padStart(2, '0')}`}</div>
            <div className="text-xs text-navy-600 uppercase tracking-wide">Fastest exam</div>
          </div>
          <div>
            <div className="text-xl font-bold text-navy-950">{`${Math.floor(slowest / 60)}:${(slowest % 60).toString().padStart(2, '0')}`}</div>
            <div className="text-xs text-navy-600 uppercase tracking-wide">Slowest exam</div>
          </div>
        </div>
      </Card>

      {recommendation && (
        <Card className="p-6">
          <h2 className="font-bold text-navy-950 mb-4">Your analysis</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-semibold text-good-600 mb-2">Strong</div>
              <ul className="flex flex-col gap-1">
                {recommendation.strong.map((t) => (
                  <li key={t} className="flex items-center gap-1.5 text-sm text-navy-800">
                    <CheckCircle2 className="size-4 text-good-600" /> {TOPIC_LABELS[t]}
                  </li>
                ))}
                {recommendation.strong.length === 0 && <li className="text-sm text-navy-500">None yet</li>}
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-accent-600 mb-2">Needs improvement</div>
              <ul className="flex flex-col gap-1">
                {recommendation.weak.map((t) => (
                  <li key={t} className="flex items-center gap-1.5 text-sm text-navy-800">
                    <AlertTriangle className="size-4 text-accent-600" /> {TOPIC_LABELS[t]}
                  </li>
                ))}
                {recommendation.weak.length === 0 && <li className="text-sm text-navy-500">None — nice work</li>}
              </ul>
            </div>
          </div>
          <p className="text-sm text-navy-700 mt-4 pt-4 border-t border-navy-100">{recommendation.message}</p>
        </Card>
      )}
    </div>
  )
}
