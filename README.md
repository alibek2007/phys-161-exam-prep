# Physics 161 Exam Prep

A physics exam simulator: 7 randomly-generated questions, 40-minute timer, drawn from a
150-exercise question bank (kinematics, vectors, circular motion, Newton's laws, and more).
Each question is a parameterized generator — numbers change on every attempt, but the
underlying physics, formula, and difficulty stay the same. Answers, solution steps, and
diagrams are all computed deterministically from the same generated parameters, never
guessed.

**Live:** https://phys161examprepapp.vercel.app

## Features

- 40-minute, 7-question exam with balanced topic coverage, a persistent countdown (survives
  page refresh), flagging, and a question navigator
- Practice Mode — pick a topic/difficulty, regenerate variants, reveal hints/solutions, no timer
- Results with a full topic/question breakdown and KaTeX-rendered step-by-step solutions
- History and Statistics (score trend, topic/difficulty accuracy, personalized recommendations)
- A Question Bank debug view showing generated parameters/seed/validation for every question
- ~40 parameter-driven SVG diagrams that update with the question's own numbers

## Stack

React 19 + TypeScript + Vite + Tailwind CSS v4, KaTeX, Recharts, React Router. No backend —
state and exam history live in the browser via a small storage-adapter interface designed so
a real backend could be swapped in later without touching UI code.

## Development

```bash
npm install
npm run dev            # start the dev server
npm run build           # typecheck + production build
npm run validate:bank   # generate ~3000 random variants across all 150 questions, checking for exceptions/non-finite answers
npm run validate:spotcheck  # verify formulas against the source exercise set's known answers
```
