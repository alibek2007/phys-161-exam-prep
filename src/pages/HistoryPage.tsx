import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { storage } from '../lib/storage'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export function HistoryPage() {
  const navigate = useNavigate()
  const [history, setHistory] = useState(() => storage.getHistory().slice().reverse())

  const empty = useMemo(() => history.length === 0, [history])

  function clearAll() {
    storage.clearHistory()
    setHistory([])
  }

  if (empty) {
    return (
      <Card className="p-8 text-center">
        <p className="text-navy-700">You haven't completed any exams yet.</p>
        <Button className="mt-4" onClick={() => navigate('/')}>
          Take your first exam
        </Button>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-950">Exam History</h1>
        <Button variant="ghost" size="sm" onClick={clearAll}>
          <Trash2 className="size-4" /> Clear history
        </Button>
      </div>

      <Card className="p-2">
        <ul className="flex flex-col divide-y divide-navy-100">
          {history.map((r) => {
            const pct = Math.round((r.score / r.total) * 100)
            const date = new Date(r.completedAt)
            const min = Math.floor(r.durationSec / 60)
            const sec = r.durationSec % 60
            return (
              <li key={r.examId} className="flex items-center justify-between gap-4 px-4 py-3">
                <div>
                  <div className="font-semibold text-navy-950">
                    {r.score} / {r.total} correct ({pct}%)
                  </div>
                  <div className="text-xs text-navy-600">
                    {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {min}:{sec.toString().padStart(2, '0')}
                    {r.timeExpired && ' · time expired'}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/review', { state: { result: r } })}>
                  View
                </Button>
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}
