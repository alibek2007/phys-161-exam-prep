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
    <div className="flex flex-col gap-1.5">
      <label htmlFor="answer-input" className="sr-only">
        Your answer
      </label>
      <input
        id="answer-input"
        type="text"
        inputMode="text"
        autoFocus={autoFocus}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your answer"
        className="w-full rounded-xl border-2 border-navy-100 bg-white px-4 py-3 text-lg font-medium text-navy-950 outline-none transition-colors focus:border-navy-600 disabled:bg-navy-50"
      />
    </div>
  )
}
