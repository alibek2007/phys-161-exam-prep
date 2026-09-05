import { Flag } from 'lucide-react'
import type { QuestionVariant } from '../../types/question'
import { TOPIC_LABELS } from '../../types/question'
import { Badge } from '../ui/Badge'
import { DiagramRenderer } from '../diagrams/DiagramRenderer'
import { AnswerInput } from './AnswerInput'

export function QuestionCard({
  variant,
  index,
  total,
  answer,
  onAnswerChange,
  flagged,
  onToggleFlag,
  disabled,
}: {
  variant: QuestionVariant
  index: number
  total: number
  answer: string
  onAnswerChange: (v: string) => void
  flagged: boolean
  onToggleFlag: () => void
  disabled?: boolean
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge tone="navy">{TOPIC_LABELS[variant.topic]}</Badge>
          <span className="text-sm text-navy-600">
            Question {index + 1} of {total}
          </span>
        </div>
        <button
          onClick={onToggleFlag}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
            flagged ? 'bg-accent-100 text-accent-600' : 'text-navy-600 hover:bg-navy-100'
          }`}
        >
          <Flag className={`size-4 ${flagged ? 'fill-accent-500' : ''}`} aria-hidden="true" />
          {flagged ? 'Flagged for review' : 'Flag for review'}
        </button>
      </div>

      <p className="text-lg leading-relaxed text-navy-950">{variant.prompt}</p>

      {variant.diagram && (
        <div className="rounded-xl bg-navy-50 border border-navy-100 p-4 flex justify-center">
          <DiagramRenderer diagram={variant.diagram} />
        </div>
      )}

      <div>
        <span className="block text-sm font-semibold text-navy-700 mb-2">Your answer</span>
        <AnswerInput value={answer} onChange={onAnswerChange} unit={variant.answer.unit} disabled={disabled} />
      </div>
    </div>
  )
}
