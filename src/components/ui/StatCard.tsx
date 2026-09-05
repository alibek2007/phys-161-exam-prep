import type { ReactNode } from 'react'
import { Card } from './Card'

export function StatCard({ label, value, icon, sub }: { label: string; value: ReactNode; icon?: ReactNode; sub?: string }) {
  return (
    <Card className="p-5 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-navy-600">{label}</span>
        {icon && <span className="text-accent-500">{icon}</span>}
      </div>
      <span className="text-2xl font-bold text-navy-950">{value}</span>
      {sub && <span className="text-xs text-navy-600">{sub}</span>}
    </Card>
  )
}
