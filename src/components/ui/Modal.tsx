import type { ReactNode } from 'react'

export function Modal({ open, onClose, children }: { open: boolean; onClose?: () => void; children: ReactNode }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-[fadeIn_0.15s_ease-out]">
        {children}
      </div>
    </div>
  )
}
