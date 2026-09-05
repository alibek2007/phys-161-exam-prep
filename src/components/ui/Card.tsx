import type { HTMLAttributes } from 'react'

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-white rounded-2xl border border-navy-100 shadow-[0_1px_2px_rgba(16,42,76,0.06),0_8px_24px_-12px_rgba(16,42,76,0.15)] ${className}`}
      {...props}
    />
  )
}
