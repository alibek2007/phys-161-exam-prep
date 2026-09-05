import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, History, TrendingUp } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { StatCard } from '../components/ui/StatCard'
import { storage } from '../lib/storage'
import { computeDashboardStats } from '../lib/analyticsEngine'
import { generateExam } from '../lib/examEngine'
import { QUESTION_BANK } from '../lib/questionBank'
import { TOPIC_LABELS } from '../types/question'
import { useToast } from '../components/ui/Toast'

export function HomePage() {
  const navigate = useNavigate()
  const { show } = useToast()
  const history = useMemo(() => storage.getHistory(), [])
  const stats = useMemo(() => computeDashboardStats(history), [history])

  function startExam() {
    const existing = storage.getActiveExam()
    if (existing && existing.status === 'active' && existing.deadline > Date.now()) {
      navigate('/exam')
      return
    }
    const session = generateExam()
    storage.saveActiveExam(session)
    show('Exam started — good luck!')
    navigate('/exam')
  }

  return (
    <div className="flex flex-col gap-14">
      <section className="text-center flex flex-col items-center gap-5 py-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-950 max-w-3xl">
          Master physics. <span className="text-accent-500">Under exam conditions.</span>
        </h1>
        <p className="text-navy-700 text-lg max-w-xl">
          7 problems. 40 minutes. {QUESTION_BANK.length}+ exercises. Unlimited randomized attempts.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <Button size="lg" onClick={startExam}>
            Start Exam
          </Button>
          <Button size="lg" variant="secondary" onClick={() => navigate('/practice')}>
            Practice Mode
          </Button>
        </div>
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
