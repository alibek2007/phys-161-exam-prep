export function ProgressBar({ value, max, colorClass = 'bg-accent-500' }: { value: number; max: number; colorClass?: string }) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0
  return (
    <div className="h-2 w-full rounded-full bg-navy-100 overflow-hidden" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <div className={`h-full rounded-full transition-[width] duration-500 ease-out ${colorClass}`} style={{ width: `${pct}%` }} />
    </div>
  )
}
