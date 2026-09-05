import { Flag } from 'lucide-react'

export interface NavItemState {
  answered: boolean
  flagged: boolean
}

export function QuestionNavigator({
  states,
  currentIndex,
  onJump,
}: {
  states: NavItemState[]
  currentIndex: number
  onJump: (index: number) => void
}) {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap" role="tablist" aria-label="Question navigator">
      {states.map((s, i) => {
        const isCurrent = i === currentIndex
        const base = 'relative size-9 rounded-full text-sm font-bold flex items-center justify-center transition-all border-2'
        const classes = isCurrent
          ? 'border-navy-900 bg-navy-900 text-white scale-110'
          : s.answered
            ? 'border-good-600 bg-good-100 text-good-600'
            : 'border-navy-100 bg-white text-navy-600 hover:border-navy-600'
        return (
          <button
            key={i}
            role="tab"
            aria-selected={isCurrent}
            aria-label={`Question ${i + 1}${s.answered ? ', answered' : ', unanswered'}${s.flagged ? ', flagged' : ''}`}
            onClick={() => onJump(i)}
            className={`${base} ${classes}`}
          >
            {i + 1}
            {s.flagged && <Flag className="absolute -top-1.5 -right-1.5 size-3.5 fill-accent-500 text-accent-600" aria-hidden="true" />}
          </button>
        )
      })}
    </div>
  )
}
