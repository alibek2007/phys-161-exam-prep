import { useState } from 'react'
import { Calculator as CalcIcon, X } from 'lucide-react'

const KEYS = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+']

export function Calculator() {
  const [open, setOpen] = useState(false)
  const [expr, setExpr] = useState('')

  function press(key: string) {
    if (key === '=') {
      try {
        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict"; return (${expr.replace(/[^0-9+\-*/.()]/g, '')})`)()
        setExpr(Number.isFinite(result) ? String(result) : 'Error')
      } catch {
        setExpr('Error')
      }
    } else {
      setExpr((e) => (e === 'Error' ? key : e + key))
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-navy-900 text-white px-4 py-3 shadow-lg hover:bg-navy-800 transition-colors"
        aria-label="Open calculator"
      >
        <CalcIcon className="size-5" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-5 left-5 z-40 w-64 rounded-2xl bg-white border border-navy-100 shadow-2xl p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-navy-700">Calculator</span>
        <button onClick={() => setOpen(false)} aria-label="Close calculator" className="text-navy-500 hover:text-navy-900">
          <X className="size-4" />
        </button>
      </div>
      <input
        readOnly
        value={expr}
        className="w-full rounded-lg bg-navy-50 px-3 py-2 mb-2 text-right font-mono text-lg text-navy-950"
        aria-label="Calculator display"
      />
      <div className="grid grid-cols-4 gap-1.5">
        {KEYS.map((k) => (
          <button
            key={k}
            onClick={() => press(k)}
            className="rounded-lg bg-navy-50 hover:bg-navy-100 py-2 text-sm font-semibold text-navy-900 transition-colors"
          >
            {k}
          </button>
        ))}
        <button
          onClick={() => setExpr('')}
          className="col-span-4 rounded-lg bg-bad-100 hover:bg-red-200 py-1.5 text-xs font-semibold text-bad-600 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
