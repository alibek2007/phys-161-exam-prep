import { useMemo, useState } from 'react'
import { Star, Shuffle } from 'lucide-react'
import type { Difficulty, QuestionVariant, Topic } from '../types/question'
import { TOPIC_LABELS } from '../types/question'
import { QUESTIONS_BY_TOPIC } from '../lib/questionBank'
import { mulberry32 } from '../lib/physics/random'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { AnswerInput } from '../components/exam/AnswerInput'
import { SolutionSteps } from '../components/SolutionSteps'
import { DiagramRenderer } from '../components/diagrams/DiagramRenderer'
import { checkAnswer, type AnswerCheckResult } from '../lib/scoringEngine'

const TOPICS = Object.keys(QUESTIONS_BY_TOPIC) as Topic[]

export function PracticePage() {
  const [topic, setTopic] = useState<Topic>(TOPICS[0])
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [questionId, setQuestionId] = useState<string | null>(null)
  const [variant, setVariant] = useState<QuestionVariant | null>(null)
  const [answer, setAnswer] = useState('')
  const [checkResult, setCheckResult] = useState<AnswerCheckResult | null>(null)
  const [showSolution, setShowSolution] = useState(false)

  const pool = useMemo(() => QUESTIONS_BY_TOPIC[topic].filter((q) => !difficulty || q.difficulty === difficulty), [topic, difficulty])

  function generate(sameQuestion = false) {
    const chosen = sameQuestion && questionId ? pool.find((q) => q.id === questionId) : pool[Math.floor(Math.random() * pool.length)]
    if (!chosen) return
    const seed = Math.floor(Math.random() * 0xffffffff)
    const v = chosen.generate(mulberry32(seed))
    v.seed = seed
    setQuestionId(chosen.id)
    setVariant(v)
    setAnswer('')
    setCheckResult(null)
    setShowSolution(false)
  }

  function handleCheckAnswer() {
    if (!variant) return
    setCheckResult(checkAnswer(variant.answer, answer))
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-navy-950">Practice Mode</h1>
        <p className="text-navy-600 text-sm mt-1">No timer. Hints and full solutions available. Regenerate as many variants as you like.</p>
      </div>

      <Card className="p-6 flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-navy-700">Topic</span>
            <select
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value as Topic)
                setQuestionId(null)
                setVariant(null)
              }}
              className="rounded-xl border-2 border-navy-100 px-3 py-2.5 text-navy-950 font-medium outline-none focus:border-navy-600"
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {TOPIC_LABELS[t]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-navy-700">Difficulty</span>
            <div className="flex items-center gap-1 h-[42px]">
              {([1, 2, 3] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(difficulty === d ? null : d)}
                  aria-label={`Difficulty ${d}`}
                  className="p-1"
                >
                  <Star className={`size-6 ${difficulty && d <= difficulty ? 'fill-accent-500 text-accent-500' : 'text-navy-200'}`} />
                </button>
              ))}
              {difficulty && (
                <button onClick={() => setDifficulty(null)} className="text-xs text-navy-500 ml-2 underline">
                  clear
                </button>
              )}
            </div>
          </label>
        </div>
        <Button onClick={() => generate(false)} disabled={pool.length === 0}>
          Generate Question
        </Button>
        {pool.length === 0 && <p className="text-sm text-bad-600">No questions match that filter yet.</p>}
      </Card>

      {variant && (
        <Card className="p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-navy-600">{TOPIC_LABELS[variant.topic]}</span>
            <Button variant="ghost" size="sm" onClick={() => generate(true)}>
              <Shuffle className="size-4" /> New variant
            </Button>
          </div>

          <p className="text-lg text-navy-950 leading-relaxed">{variant.prompt}</p>

          {variant.diagram && (
            <div className="rounded-xl bg-navy-50 border border-navy-100 p-4 flex justify-center">
              <DiagramRenderer diagram={variant.diagram} />
            </div>
          )}

          <div>
            <span className="block text-sm font-semibold text-navy-700 mb-2">Your answer</span>
            <AnswerInput value={answer} onChange={setAnswer} unit={variant.answer.unit} />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleCheckAnswer}>Check Answer</Button>
            <Button variant="ghost" onClick={() => setShowSolution((s) => !s)}>
              {showSolution ? 'Hide Solution' : 'Reveal Solution'}
            </Button>
          </div>

          {checkResult !== null && (
            <p className={`font-semibold ${checkResult === 'correct' ? 'text-good-600' : 'text-bad-600'}`}>
              {checkResult === 'correct' && 'Correct!'}
              {checkResult === 'missing_units' &&
                `Your number is right, but don't forget units — the answer needs "${variant.answer.unit}".`}
              {checkResult === 'wrong_units' &&
                `Your number is right, but the units are off — expected "${variant.answer.unit}".`}
              {(checkResult === 'wrong_value' || checkResult === 'unparseable') &&
                `Not quite — correct answer is ${variant.answer.value.toPrecision(6).replace(/\.?0+$/, '')} ${variant.answer.unit}`}
            </p>
          )}

          {showSolution && (
            <div className="pt-4 border-t border-navy-100">
              <SolutionSteps steps={variant.solutionSteps} />
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
