import { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { QUESTION_BANK } from '../lib/questionBank'
import { TOPIC_LABELS, type Topic } from '../types/question'
import type { QuestionVariant } from '../types/question'
import { mulberry32 } from '../lib/physics/random'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { SolutionSteps } from '../components/SolutionSteps'
import { DiagramRenderer } from '../components/diagrams/DiagramRenderer'

const TOPICS = ['all', ...Object.keys(TOPIC_LABELS)] as (Topic | 'all')[]

export function QuestionBankPage() {
  const [topicFilter, setTopicFilter] = useState<Topic | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [expandedVariant, setExpandedVariant] = useState<QuestionVariant | null>(null)
  const [expandedError, setExpandedError] = useState<string | null>(null)

  const filtered = useMemo(
    () => QUESTION_BANK.filter((q) => topicFilter === 'all' || q.topic === topicFilter),
    [topicFilter],
  )

  function toggle(id: string) {
    if (expanded === id) {
      setExpanded(null)
      return
    }
    setExpanded(id)
    setExpandedVariant(null)
    setExpandedError(null)
    const q = QUESTION_BANK.find((question) => question.id === id)
    if (!q) return
    try {
      const seed = Date.now() & 0xffffffff
      const variant = q.generate(mulberry32(seed))
      variant.seed = seed
      setExpandedVariant(variant)
    } catch (e) {
      setExpandedError((e as Error).message)
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-navy-950">Question Bank</h1>
        <p className="text-navy-600 text-sm mt-1">
          {QUESTION_BANK.length} question templates. Expand a row to see a freshly generated variant (developer/debug view).
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {TOPICS.map((t) => (
          <button
            key={t}
            onClick={() => setTopicFilter(t)}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
              topicFilter === t ? 'bg-navy-900 text-white' : 'bg-white border border-navy-100 text-navy-700 hover:bg-navy-100'
            }`}
          >
            {t === 'all' ? 'All' : TOPIC_LABELS[t]}
          </button>
        ))}
      </div>

      <Card className="p-2">
        <ul className="flex flex-col divide-y divide-navy-100">
          {filtered.map((q) => {
            const isOpen = expanded === q.id
            const variant = isOpen ? expandedVariant : null
            const error = isOpen ? expandedError : null
            return (
              <li key={q.id}>
                <button className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-navy-50 rounded-lg" onClick={() => toggle(q.id)}>
                  {isOpen ? <ChevronDown className="size-4 text-navy-500 shrink-0" /> : <ChevronRight className="size-4 text-navy-500 shrink-0" />}
                  <span className="font-mono text-xs text-navy-500 w-24 shrink-0">{q.sourceRef}</span>
                  <Badge tone="navy">{TOPIC_LABELS[q.topic]}</Badge>
                  <span className="text-xs text-navy-500">difficulty {q.difficulty}</span>
                  {!q.randomizable && <Badge tone="muted">fixed</Badge>}
                  <span className="ml-auto font-mono text-xs text-navy-400">{q.id}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4">
                    {error && <p className="text-bad-600 text-sm">Generation failed: {error}</p>}
                    {variant && (
                      <div className="bg-navy-50 rounded-xl p-4 flex flex-col gap-3">
                        <p className="text-sm text-navy-900">{variant.prompt}</p>
                        {variant.diagram && (
                          <div className="rounded-xl bg-white border border-navy-100 p-4 flex flex-col items-center gap-1">
                            <DiagramRenderer diagram={variant.diagram} />
                            <span className="font-mono text-[10px] text-navy-400">
                              kind: {variant.diagram.kind} · props: {JSON.stringify(variant.diagram.props)}
                            </span>
                          </div>
                        )}
                        <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono text-navy-600 bg-white rounded-lg p-3 border border-navy-100">
                          <div>
                            <span className="font-bold">Seed:</span> {variant.seed}
                          </div>
                          <div>
                            <span className="font-bold">Answer:</span> {variant.answer.value.toPrecision(6)} {variant.answer.unit}
                          </div>
                          <div className="sm:col-span-2">
                            <span className="font-bold">Parameters:</span>{' '}
                            {Object.entries(variant.params)
                              .map(([k, v]) => `${k}=${v}`)
                              .join(', ')}
                          </div>
                          <div className="sm:col-span-2 text-good-600 font-bold">✓ PASS (validated on generation)</div>
                        </div>
                        <SolutionSteps steps={variant.solutionSteps} />
                      </div>
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}
