import { useEffect, useRef, useState } from 'react'

/** Ticks once per second and reports ms remaining until `deadline`, firing `onExpire` once. */
export function useExamTimer(deadline: number, onExpire: () => void): number {
  const [remaining, setRemaining] = useState(() => Math.max(0, deadline - Date.now()))
  const firedRef = useRef(false)
  // Keep the latest onExpire in a ref so the interval (set up once per deadline) always
  // calls the most recent closure — otherwise it fires against whatever session was
  // current on the render that started the interval, dropping answers typed afterward.
  const onExpireRef = useRef(onExpire)

  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  useEffect(() => {
    firedRef.current = false
    const tick = () => {
      const ms = Math.max(0, deadline - Date.now())
      setRemaining(ms)
      if (ms <= 0 && !firedRef.current) {
        firedRef.current = true
        onExpireRef.current()
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [deadline])

  return remaining
}

export function formatClock(ms: number): string {
  const totalSec = Math.max(0, Math.ceil(ms / 1000))
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
