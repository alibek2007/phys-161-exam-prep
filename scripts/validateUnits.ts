import { QUESTION_BANK } from '../src/lib/questionBank'
import { mulberry32, seedFromString } from '../src/lib/physics/random'
import { checkAnswer } from '../src/lib/scoringEngine'

let failures = 0

function asciiVariant(unit: string): string {
  return unit
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/°/g, 'deg')
}

for (const q of QUESTION_BANK) {
  const rng = mulberry32(seedFromString(`${q.id}-units-check`))
  const variant = q.generate(rng)
  const { value, unit } = variant.answer
  const valueStr = value.toPrecision(8)

  const exactResult = checkAnswer(variant.answer, `${valueStr} ${unit}`)
  if (exactResult !== 'correct') {
    console.error(`[EXACT FAIL] ${q.id} (${q.sourceRef}) unit="${unit}" -> got ${exactResult}`)
    failures++
  }

  if (unit.trim() !== '') {
    const asciiResult = checkAnswer(variant.answer, `${valueStr} ${asciiVariant(unit)}`)
    if (asciiResult !== 'correct') {
      console.error(`[ASCII FAIL] ${q.id} (${q.sourceRef}) unit="${asciiVariant(unit)}" -> got ${asciiResult}`)
      failures++
    }

    const missingResult = checkAnswer(variant.answer, valueStr)
    if (missingResult !== 'missing_units') {
      console.error(`[MISSING-UNITS FAIL] ${q.id} (${q.sourceRef}) -> got ${missingResult}, expected missing_units`)
      failures++
    }

    const wrongUnitResult = checkAnswer(variant.answer, `${valueStr} bananas`)
    if (wrongUnitResult !== 'wrong_units') {
      console.error(`[WRONG-UNITS FAIL] ${q.id} (${q.sourceRef}) -> got ${wrongUnitResult}, expected wrong_units`)
      failures++
    }
  } else {
    // dimensionless: bare number alone should still be accepted as correct
    const bareResult = checkAnswer(variant.answer, valueStr)
    if (bareResult !== 'correct') {
      console.error(`[DIMENSIONLESS FAIL] ${q.id} (${q.sourceRef}) -> got ${bareResult}`)
      failures++
    }
  }

  const wrongValueResult = checkAnswer(variant.answer, `${value * 5 + 1000} ${unit}`)
  if (wrongValueResult === 'correct') {
    console.error(`[FALSE POSITIVE] ${q.id} (${q.sourceRef}) accepted a wildly wrong value`)
    failures++
  }
}

console.log(`\nChecked ${QUESTION_BANK.length} questions, ${failures} failures.`)
if (failures > 0) process.exit(1)
