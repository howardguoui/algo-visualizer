# CLAUDE.md — algo-visualizer

Project-level instructions for Claude Code when working in this repository.

## 🚨 ABSOLUTE PROHIBITIONS

### ❌ NEVER delete or modify `algorithms-history-archives/`

> **The `algorithms-history-archives/` folder and ALL its contents are permanently protected.**
>
> This folder contains personal learning notes and eBooks collected over time.
> **Do NOT delete, move, rename, or overwrite any file or subfolder inside it — ever.**

This rule applies to:
- Direct deletion (`rm`, `del`, file system ops)
- Refactoring or "cleanup" operations
- Glob patterns that might match files inside it
- Any automated scripts or batch operations

If a task would touch `algorithms-history-archives/` in any way, **stop and ask the user first**.

---

## Project Overview

**algo-visualizer** — Interactive algorithm learning platform built with React + TypeScript + Vite.

### Key directories
| Path | Purpose |
|---|---|
| `src/algorithms/` | Algorithm step-by-step visualization logic |
| `src/components/` | React UI components |
| `src/content/topics/` | Bilingual (EN/ZH) educational markdown per topic |
| `src/data/problems/` | Practice problem definitions (`practiceProblems.ts`) |
| `src/pages/` | Page-level route components |
| `docs/` | Progress trackers and project documentation |
| `algorithms-history-archives/` | **Protected** — personal notes & eBooks, never touch |

### Practice problems batch progress
See `docs/practice-conversion-progress.md` for current batch status (B1–B10).
Add new problems to `src/data/problems/practiceProblems.ts` following the existing structure.

### Tech stack
- React 19 + TypeScript + Vite
- TailwindCSS + Framer Motion
- React Router v7
- Pyodide (Python execution in browser)
