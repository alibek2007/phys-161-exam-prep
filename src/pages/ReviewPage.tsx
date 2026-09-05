import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { ExamResult } from '../types/exam'
import { TOPIC_LABELS } from '../types/question'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { SolutionSteps } from '../components/SolutionSteps'
import { DiagramRenderer } from '../components/diagrams/DiagramRenderer'
import { storage } from '../lib/storage'

export function ReviewPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const result = useMemo<ExamResult | null>(() => {
    const stateResult = (location.state as { result?: ExamResult } | null)?.result
    if (stateResult) return stateResult
    const history = storage.getHistory()
    return history.length ? history[history.length - 1] : null
  }, [location.state])

  if (!result) {
    return (
      <Card className="p-8 text-center">
        <p className="text-navy-700">No exam to review yet.</p>
        <Button className="mt-4" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-950">Detailed Solutions</h1>
        <Button variant="ghost" onClick={() => navigate('/results', { state: { result } })}>
          Back to Results
        </Button>
      </div>

      {result.questions.map((q, i) => {
        const correct = result.correctByQuestion[q.questionId]
        const studentAnswer = result.answers[q.questionId] || '(no answer)'
        return (
          <Card key={q.questionId} className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Badge tone="navy">{TOPIC_LABELS[q.topic]}</Badge>
                <span className="text-sm font-semibold text-navy-600">Question {i + 1}</span>
              </div>
              {correct ? (
                <span className="flex items-center gap-1.5 text-good-600 font-semibold text-sm">
                  <CheckCircle2 className="size-4" /> Correct
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-bad-600 font-semibold text-sm">
                  <XCircle className="size-4" /> Incorrect
                </span>
              )}
            </div>

            <p className="text-navy-900">{q.prompt}</p>

            {q.diagram && (
              <div className="rounded-xl bg-navy-50 border border-navy-100 p-4 flex justify-center">
                <DiagramRenderer diagram={q.diagram} />
              </div>
            )}

            <div className="flex gap-6 text-sm">
              <span className="text-navy-600">
                Your answer: <span className="font-semibold text-navy-900">{studentAnswer}</span>
              </span>
              <span className="text-navy-600">
                Correct answer:{' '}
                <span className="font-semibold text-navy-900">
                  {q.answer.value.toPrecision(6).replace(/\.?0+$/, '')} {q.answer.unit}
                </span>
              </span>
            </div>

            <div className="pt-4 border-t border-navy-100">
              <SolutionSteps steps={q.solutionSteps} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
