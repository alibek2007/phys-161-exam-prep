export function AnswerInput({
  value,
  onChange,
  unit,
  disabled,
  autoFocus,
}: {
  value: string
  onChange: (v: string) => void
  unit: string
  disabled?: boolean
  autoFocus?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="answer-input" className="sr-only">
        Your answer
      </label>
      <input
        id="answer-input"
        type="text"
        inputMode="decimal"
        autoFocus={autoFocus}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your answer"
        className="flex-1 rounded-xl border-2 border-navy-100 bg-white px-4 py-3 text-lg font-medium text-navy-950 outline-none transition-colors focus:border-navy-600 disabled:bg-navy-50"
      />
      {unit && <span className="text-navy-600 font-medium min-w-fit">{unit}</span>}
    </div>
  )
}
