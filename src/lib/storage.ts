import type { ExamResult } from '../types/exam'
import type { ExamSession } from '../types/exam'

/**
 * Storage boundary: the rest of the app talks to this interface, not localStorage directly, so
 * the MVP's local persistence can later be swapped for a real backend (Supabase/Postgres/etc.)
 * without touching UI or engine code.
 */
export interface StorageAdapter {
  getHistory(): ExamResult[]
  saveResult(result: ExamResult): void
  clearHistory(): void
  getActiveExam(): ExamSession | null
  saveActiveExam(session: ExamSession | null): void
}

const HISTORY_KEY = 'phys161.examHistory.v1'
const ACTIVE_EXAM_KEY = 'phys161.activeExam.v1'
const MAX_HISTORY = 200

class LocalStorageAdapter implements StorageAdapter {
  getHistory(): ExamResult[] {
    try {
      const raw = localStorage.getItem(HISTORY_KEY)
      return raw ? (JSON.parse(raw) as ExamResult[]) : []
    } catch {
      return []
    }
  }

  saveResult(result: ExamResult): void {
    const history = this.getHistory()
    history.push(result)
    while (history.length > MAX_HISTORY) history.shift()
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    } catch {
      // storage full/unavailable — fail silently, exam result is still shown this session
    }
  }

  clearHistory(): void {
    localStorage.removeItem(HISTORY_KEY)
  }

  getActiveExam(): ExamSession | null {
    try {
      const raw = localStorage.getItem(ACTIVE_EXAM_KEY)
      return raw ? (JSON.parse(raw) as ExamSession) : null
    } catch {
      return null
    }
  }

  saveActiveExam(session: ExamSession | null): void {
    try {
      if (session) localStorage.setItem(ACTIVE_EXAM_KEY, JSON.stringify(session))
      else localStorage.removeItem(ACTIVE_EXAM_KEY)
    } catch {
      // ignore
    }
  }
}

export const storage: StorageAdapter = new LocalStorageAdapter()
