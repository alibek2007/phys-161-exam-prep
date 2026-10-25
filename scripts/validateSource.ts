import { readFileSync } from 'node:fs'
import { QUESTION_BANK } from '../src/lib/questionBank'
import { TOPIC_EXAM_SET } from '../src/types/question'

/**
 * Recomputes each template with the original exercise's printed numbers and compares with the
 * answer printed in the problem set; also flags numbers in the generated prompt that do not
 * appear in the source wording (transcription typos).
 */

const SOURCE_FILES: Record<string, string> = { exam3: 'docs/source_exercises_exam3.txt' }

const SUPER_TO_ASCII: Record<string, string> = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9', '⁻': '',
}

function normalize(text: string): string {
  return text
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉⁻]/g, (c) => SUPER_TO_ASCII[c] ?? c)
    .replace(/\s*[×x]\s*/g, '×')
    .replace(/[−\-^]/g, '')
    .replace(/,/g, '')
}

function numberTokens(text: string): string[] {
  return normalize(text).match(/\d+(?:\.\d+)?/g) ?? []
}

function loadSourceProblems(file: string): Map<string, string> {
  const raw = readFileSync(file, 'utf8')
  const problems = new Map<string, string>()
  const marker = /(?:^|\n)P(\d+)\./g
  const hits: { n: string; index: number }[] = []
  let m: RegExpExecArray | null
  while ((m = marker.exec(raw))) hits.push({ n: m[1], index: m.index })
  hits.forEach((hit, i) => {
    const end = i + 1 < hits.length ? hits[i + 1].index : raw.length
    problems.set(`P${hit.n}`, raw.slice(hit.index, end))
  })
  return problems
}

let failures = 0
let warnings = 0
let checked = 0
const sources = Object.fromEntries(Object.entries(SOURCE_FILES).map(([set, file]) => [set, loadSourceProblems(file)]))

for (const q of QUESTION_BANK) {
  const examSet = TOPIC_EXAM_SET[q.topic]
  if (!(examSet in SOURCE_FILES)) continue

  if (!q.verifySource) {
    console.log(`MISSING  ${q.id} ${q.sourceRef}: no source numbers declared`)
    failures++
    continue
  }
  checked++

  const check = q.verifySource()
  const relErr = Math.abs(check.actual - check.expected) / Math.max(Math.abs(check.expected), 1e-300)
  const ok = relErr <= check.tolerance
  if (!ok) failures++
  console.log(
    `${ok ? 'OK  ' : 'FAIL'} ${q.id.padEnd(10)} ${q.sourceRef.padEnd(5)} expected=${check.expected} actual=${check.actual.toPrecision(7)} (${(relErr * 100).toFixed(3)}%)`,
  )

  const sourceText = sources[examSet].get(q.sourceRef)
  if (!sourceText) {
    console.log(`WARN     ${q.id}: ${q.sourceRef} not found in the source text`)
    warnings++
    continue
  }
  const sourceTokens = new Set(numberTokens(sourceText))
  const unmatched = numberTokens(check.prompt).filter((t) => !sourceTokens.has(t))
  if (unmatched.length > 0) {
    console.log(`WARN     ${q.id} ${q.sourceRef}: prompt numbers not in source wording: ${[...new Set(unmatched)].join(', ')}`)
    warnings++
  }
}

const exam3Refs = QUESTION_BANK.filter((q) => TOPIC_EXAM_SET[q.topic] === 'exam3').map((q) => q.sourceRef)
for (let n = 1; n <= 150; n++) {
  const count = exam3Refs.filter((ref) => ref === `P${n}`).length
  if (count !== 1) {
    console.log(`COVERAGE P${n} appears ${count} times in Exam 3`)
    failures++
  }
}

console.log(`\n${checked} source checks, ${failures} failures, ${warnings} warnings.`)
if (failures > 0) process.exit(1)
