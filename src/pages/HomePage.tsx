import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, History, TrendingUp, Zap } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { StatCard } from '../components/ui/StatCard'
import { storage } from '../lib/storage'
import { computeDashboardStats } from '../lib/analyticsEngine'
import { generateExam } from '../lib/examEngine'
import { QUESTION_BANK } from '../lib/questionBank'
import { EXAM_SET_LABELS, EXAM_SET_TAGLINES, TOPIC_LABELS, TOPIC_EXAM_SET, type ExamSet } from '../types/question'
import { useToast } from '../components/ui/Toast'

const EXAM_SETS: ExamSet[] = ['exam1', 'exam2']

export function HomePage() {
  const navigate = useNavigate()
  const { show } = useToast()
  const history = useMemo(() => storage.getHistory(), [])
  const stats = useMemo(() => computeDashboardStats(history), [history])

  const questionCounts = useMemo(() => {
    const counts: Record<ExamSet, number> = { exam1: 0, exam2: 0 }
    for (const q of QUESTION_BANK) counts[TOPIC_EXAM_SET[q.topic]]++
    return counts
  }, [])

  function startExam(examSet: ExamSet) {
    const existing = storage.getActiveExam()
    if (existing && existing.status === 'active' && existing.deadline > Date.now() && existing.examSet === examSet) {
      navigate('/exam')
      return
    }
    const session = generateExam(examSet)
    storage.saveActiveExam(session)
    show(`${EXAM_SET_LABELS[examSet]} started — good luck!`)
    navigate('/exam')
  }

  return (
    <div className="flex flex-col gap-14">
      <section className="text-center flex flex-col items-center gap-5 py-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-950 max-w-3xl">
          Master physics. <span className="text-accent-500">Under exam conditions.</span>
        </h1>
        <p className="text-navy-700 text-lg max-w-xl">
          7 problems. 40 minutes. {QUESTION_BANK.length}+ exercises across two exam sets. Unlimited randomized attempts.
        </p>
      </section>

      <section className="grid sm:grid-cols-2 gap-6">
        {EXAM_SETS.map((examSet) => (
          <Card key={examSet} className="p-6 flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Zap className="size-5 text-accent-500" aria-hidden="true" />
                <h2 className="text-xl font-bold text-navy-950">{EXAM_SET_LABELS[examSet]}</h2>
              </div>
              <p className="text-sm text-navy-600 mt-1">{EXAM_SET_TAGLINES[examSet]}</p>
              <p className="text-xs text-navy-500 mt-2">{questionCounts[examSet]} exercises</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => startExam(examSet)}>Start Exam</Button>
              <Button variant="secondary" onClick={() => navigate(`/practice?set=${examSet}`)}>
                Practice Mode
              </Button>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Best Score" value={stats.bestScorePct !== null ? `${Math.round(stats.bestScorePct)}%` : '—'} icon={<TrendingUp className="size-5" />} />
        <StatCard label="Average Score" value={stats.avgScorePct !== null ? `${Math.round(stats.avgScorePct)}%` : '—'} />
        <StatCard label="Exams Completed" value={stats.examsCompleted} icon={<History className="size-5" />} />
        <StatCard label="Strongest Topic" value={stats.strongestTopic ? TOPIC_LABELS[stats.strongestTopic] : '—'} icon={<BookOpen className="size-5" />} />
      </section>

      <section className="flex flex-wrap gap-3 justify-center">
        <Button variant="ghost" onClick={() => navigate('/history')}>
          View History
        </Button>
        <Button variant="ghost" onClick={() => navigate('/statistics')}>
          Statistics
        </Button>
        <Button variant="ghost" onClick={() => navigate('/bank')}>
          Question Bank
        </Button>
      </section>
    </div>
  )
}
