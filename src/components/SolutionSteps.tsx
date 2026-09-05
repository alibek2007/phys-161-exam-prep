import { BlockMath } from 'react-katex'
import type { SolutionStep } from '../types/question'

export function SolutionSteps({ steps }: { steps: SolutionStep[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3">
          <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-navy-600 w-24 pt-1">{step.label}</span>
          <div className="flex-1 text-sm text-navy-900">
            {step.math && (
              <div className="overflow-x-auto py-0.5">
                <BlockMath math={step.math} errorColor="#dc2626" />
              </div>
            )}
            {step.text && <p className="text-navy-700">{step.text}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}
