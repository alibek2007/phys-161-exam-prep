import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { ExamResult } from '../types/exam'
import { TOPIC_LABELS } from '../types/question'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { storage } from '../lib/storage'

function useCountUp(target: number, durationMs = 800) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      setValue(Math.round(target * (1 - (1 - t) ** 3)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, durationMs])
  return value
}

export function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = useMemo<ExamResult | null>(() => {
    const stateResult = (location.state as { result?: ExamResult } | null)?.result
    if (stateResult) return stateResult
    const history = storage.getHistory()
    return history.length ? history[history.length - 1] : null
  }, [location.state])

  const pct = result ? Math.round((result.score / result.total) * 100) : 0
  const animatedPct = useCountUp(pct)

  if (!result) {
    return (
      <Card className="p-8 text-center">
        <p className="text-navy-700">No exam results to show yet.</p>
        <Button className="mt-4" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Card>
    )
  }

  const minutes = Math.floor(result.durationSec / 60)
  const seconds = result.durationSec % 60

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto">
      <Card className="p-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-600">Exam Complete</span>
        <div className="mt-3 text-6xl font-extrabold text-navy-950">{animatedPct}%</div>
        <p className="text-navy-700 mt-1">
          Score {result.score} / {result.total}
        </p>
        {result.timeExpired && <p className="text-bad-600 text-sm font-semibold mt-2">Time expired — exam auto-submitted</p>}
        <div className="flex justify-center gap-10 mt-6">
          <div>
            <div className="text-2xl font-bold text-navy-950">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-navy-600 uppercase tracking-wide">Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-navy-950">{pct}%</div>
            <div className="text-xs text-navy-600 uppercase tracking-wide">Accuracy</div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-bold text-navy-950 mb-4">Question breakdown</h2>
        <ul className="flex flex-col divide-y divide-navy-100">
          {result.questions.map((q, i) => {
            const correct = result.correctByQuestion[q.questionId]
            return (
              <li key={q.questionId} className="flex items-center gap-3 py-2.5">
                {correct ? <CheckCircle2 className="size-5 text-good-600 shrink-0" /> : <XCircle className="size-5 text-bad-600 shrink-0" />}
                <span className="text-sm font-medium text-navy-800">Q{i + 1}</span>
                <span className="text-sm text-navy-600 truncate flex-1">{TOPIC_LABELS[q.topic]}</span>
                <span className={`text-sm font-semibold ${correct ? 'text-good-600' : 'text-bad-600'}`}>{correct ? 'Correct' : 'Incorrect'}</span>
              </li>
            )
          })}
        </ul>
      </Card>

      <Card className="p-6">
        <h2 className="font-bold text-navy-950 mb-4">Performance by topic</h2>
        <div className="flex flex-col gap-3">
          {Object.entries(result.topicPerformance).map(([topic, stat]) => {
            const p = Math.round((stat!.correct / stat!.total) * 100)
            return (
              <div key={topic} className="flex items-center gap-3">
                <span className="text-sm text-navy-700 w-44 shrink-0">{TOPIC_LABELS[topic as keyof typeof TOPIC_LABELS]}</span>
                <div className="flex-1 h-2 rounded-full bg-navy-100 overflow-hidden">
                  <div className="h-full bg-accent-500 rounded-full" style={{ width: `${p}%` }} />
                </div>
                <span className="text-sm font-semibold text-navy-800 w-10 text-right">{p}%</span>
              </div>
            )
          })}
        </div>
      </Card>

      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={() => navigate('/review', { state: { result } })}>
          View Solutions
        </Button>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    </div>
  )
}
