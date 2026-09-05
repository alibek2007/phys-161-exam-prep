import { QUESTION_BANK } from '../src/lib/questionBank'
import { mulberry32, seedFromString } from '../src/lib/physics/random'

let failures = 0
let total = 0

for (const q of QUESTION_BANK) {
  for (let trial = 0; trial < 20; trial++) {
    total++
    const seed = seedFromString(`${q.id}-${trial}`)
    const rng = mulberry32(seed)
    try {
      const variant = q.generate(rng)
      if (!Number.isFinite(variant.answer.value)) {
        console.error(`[NON-FINITE] ${q.id} (${q.sourceRef}) trial ${trial}`)
        failures++
      }
      if (trial === 0) {
        console.log(`${q.id.padEnd(12)} ${q.sourceRef.padEnd(6)} answer=${variant.answer.value.toFixed(4)} ${variant.answer.unit}`)
      }
    } catch (e) {
      console.error(`[THROW] ${q.id} (${q.sourceRef}) trial ${trial}:`, (e as Error).message)
      failures++
    }
  }
}

console.log(`\n${total} generations across ${QUESTION_BANK.length} questions, ${failures} failures.`)
if (failures > 0) process.exit(1)
