import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useExam } from '../hooks/useExam'
import { useExamTimer } from '../hooks/useExamTimer'
import { Timer } from '../components/exam/Timer'
import { QuestionCard } from '../components/exam/QuestionCard'
import { QuestionNavigator } from '../components/exam/QuestionNavigator'
import { SubmitConfirmModal } from '../components/exam/SubmitConfirmModal'
import { Calculator } from '../components/exam/Calculator'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { scoreExam } from '../lib/scoringEngine'
import { storage } from '../lib/storage'

export function ExamPage() {
  const navigate = useNavigate()
  const { session, setAnswer, toggleFlag } = useExam()
  const [index, setIndex] = useState(0)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const submittedRef = useRef(false)

  const submit = useCallback(
    (timeExpired: boolean) => {
      if (submittedRef.current) return
      if (!session || session.status !== 'active') return
      submittedRef.current = true
      setSubmitting(true)

      const submitted = { ...session, status: 'submitted' as const, submittedAt: Date.now() }
      const result = scoreExam(submitted, timeExpired)
      storage.saveResult(result)
      storage.saveActiveExam(null)
      navigate('/results', { state: { result } })
    },
    [session, navigate],
  )

  const remaining = useExamTimer(session?.deadline ?? 0, () => submit(true))

  useEffect(() => {
    if (!submitting && !session) {
      navigate('/', { replace: true })
    }
  }, [session, submitting, navigate])

  if (!session || session.status !== 'active' || submitting) return null

  const total = session.questions.length
  const current = session.questions[index]
  const answeredCount = session.questions.filter((q) => (session.answers[q.questionId] ?? '').trim() !== '').length

  const navStates = session.questions.map((q) => ({
    answered: (session.answers[q.questionId] ?? '').trim() !== '',
    flagged: !!session.flags[q.questionId],
  }))

  return (
    <div className="min-h-screen bg-navy-50 flex flex-col">
      <header className="bg-white border-b border-navy-100 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <span className="font-bold text-navy-950">Physics Exam</span>
          <span className="text-sm font-semibold text-navy-600">
            Question {index + 1} / {total}
          </span>
          <Timer remainingMs={remaining} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-3">
          <ProgressBar value={answeredCount} max={total} />
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-6 sm:p-8">
          <QuestionCard
            variant={current}
            index={index}
            total={total}
            answer={session.answers[current.questionId] ?? ''}
            onAnswerChange={(v) => setAnswer(current.questionId, v)}
            flagged={!!session.flags[current.questionId]}
            onToggleFlag={() => toggleFlag(current.questionId)}
          />

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-navy-100">
            <Button variant="ghost" disabled={!session.config.allowBackNavigation || index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))}>
              <ChevronLeft className="size-4" /> Previous
            </Button>
            {index < total - 1 ? (
              <Button onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}>
                Next Question <ChevronRight className="size-4" />
              </Button>
            ) : (
              <Button onClick={() => setConfirmOpen(true)}>Submit Exam</Button>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl border border-navy-100 shadow-sm p-4">
          <QuestionNavigator states={navStates} currentIndex={index} onJump={setIndex} />
        </div>

        {index < total - 1 && (
          <div className="flex justify-center mt-4">
            <Button variant="ghost" size="sm" onClick={() => setConfirmOpen(true)}>
              Submit Exam Early
            </Button>
          </div>
        )}
      </div>

      <Calculator />

      <SubmitConfirmModal
        open={confirmOpen}
        answeredCount={answeredCount}
        total={total}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false)
          submit(false)
        }}
      />
    </div>
  )
}
