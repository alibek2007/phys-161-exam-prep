import { useCallback, useEffect, useState } from 'react'
import type { ExamSession } from '../types/exam'
import { storage } from '../lib/storage'

/** Loads/persists the single active exam session, keeping localStorage in sync on every change. */
export function useExam() {
  const [session, setSession] = useState<ExamSession | null>(() => storage.getActiveExam())

  useEffect(() => {
    storage.saveActiveExam(session)
  }, [session])

  const setAnswer = useCallback((questionId: string, value: string) => {
    setSession((s) => (s ? { ...s, answers: { ...s.answers, [questionId]: value } } : s))
  }, [])

  const toggleFlag = useCallback((questionId: string) => {
    setSession((s) => (s ? { ...s, flags: { ...s.flags, [questionId]: !s.flags[questionId] } } : s))
  }, [])

  const clearExam = useCallback(() => {
    setSession(null)
  }, [])

  return { session, setSession, setAnswer, toggleFlag, clearExam }
}
