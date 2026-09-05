import type { ReactNode } from 'react'

type Tone = 'navy' | 'accent' | 'good' | 'bad' | 'muted'

const toneClasses: Record<Tone, string> = {
  navy: 'bg-navy-100 text-navy-800',
  accent: 'bg-accent-100 text-accent-600',
  good: 'bg-good-100 text-good-600',
  bad: 'bg-bad-100 text-bad-600',
  muted: 'bg-navy-50 text-navy-600 border border-navy-100',
}

export function Badge({ children, tone = 'navy' }: { children: ReactNode; tone?: Tone }) {
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]}`}>{children}</span>
}
