import { useEffect, useRef, useState } from 'react'

/** Ticks once per second and reports ms remaining until `deadline`, firing `onExpire` once. */
export function useExamTimer(deadline: number, onExpire: () => void): number {
  const [remaining, setRemaining] = useState(() => Math.max(0, deadline - Date.now()))
  const firedRef = useRef(false)

  useEffect(() => {
    firedRef.current = false
    const tick = () => {
      const ms = Math.max(0, deadline - Date.now())
      setRemaining(ms)
      if (ms <= 0 && !firedRef.current) {
        firedRef.current = true
        onExpire()
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadline])

  return remaining
}

export function formatClock(ms: number): string {
  const totalSec = Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
