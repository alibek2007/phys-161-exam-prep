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
        Your answer, including units
      </label>
      <input
        id="answer-input"
        type="text"
        inputMode="text"
        autoFocus={autoFocus}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={unit ? `e.g. 12.5 ${unit}` : 'Enter your answer'}
        className="w-full rounded-xl border-2 border-navy-100 bg-white px-4 py-3 text-lg font-medium text-navy-950 outline-none transition-colors focus:border-navy-600 disabled:bg-navy-50"
      />
      {unit && (
        <p className="text-xs text-navy-500">
          Don't forget units — enter your answer as a number followed by the unit (e.g.{' '}
          <span className="font-mono text-navy-700">12.5 {unit}</span>). No superscript key? "^" works too, e.g.{' '}
          <span className="font-mono text-navy-700">m/s^2</span>.
        </p>
      )}
    </div>
  )
}
