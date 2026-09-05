import { Clock } from 'lucide-react'
import { formatClock } from '../../hooks/useExamTimer'

export function Timer({ remainingMs }: { remainingMs: number }) {
  const minutesLeft = remainingMs / 60000
  const tone = minutesLeft <= 5 ? 'danger' : minutesLeft <= 10 ? 'warning' : 'normal'

  const toneClasses = {
    normal: 'bg-navy-100 text-navy-900',
    warning: 'bg-accent-100 text-accent-600',
    danger: 'bg-bad-100 text-bad-600 animate-pulse',
  }[tone]

  return (
    <div className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-lg font-bold tabular-nums ${toneClasses}`} role="timer" aria-live="polite">
      <Clock className="size-5" aria-hidden="true" />
      {formatClock(remainingMs)}
    </div>
  )
}
