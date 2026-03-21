# CLAUDE.md — algo-visualizer

Project-level instructions for Claude Code. Read this before touching any file.

---

## ABSOLUTE PROHIBITIONS

### NEVER touch `algorithms-history-archives/`
This folder contains personal learning notes and eBooks.
**Do NOT delete, move, rename, or overwrite anything inside it — ever.**
If any task would affect it, stop and ask the user.

### NEVER use emoji in UI code
All icons must be inline SVG. No emoji in JSX, className strings, or data files.
Exception: the curriculum chapter `icon` field (used in sidebar only) may keep emoji
until explicitly migrated.

### NEVER create files in the project root
New source files go under `src/`. New docs go under `docs/`.

---

## Project Overview

**AlgoVisualizer** — interactive algorithm & database learning platform.
**Stack:** React 19 + TypeScript + Vite 7 + Tailwind CSS v4 + React Router v7
**Branch:** `AI-integration` (push here after every session)
**Repo:** `howardguoui/algo-visualizer`
**Dev server:** `npm run dev` → `http://localhost:5173`

---

## Route Map

| URL | Page | File |
|---|---|---|
| `/` | Home — skill tree + overview cards | `src/pages/HomePage.tsx` |
| `/learn/:topicId` | Topic detail — markdown + visualizer | `src/pages/TopicPage.tsx` |
| `/sql-sandbox` | Interactive SQL Sandbox | `src/pages/SQLSandboxPage.tsx` |
| `/problems` | LeetCode problem sets | `src/pages/ProblemsPage.tsx` |
| `/visualize` | Sorting visualizer | `src/pages/VisualizePage.tsx` |
| `/practice/:problemId` | Code practice + AI tutor | `src/pages/PracticePage.tsx` |
| `/algorithm-study-note/article/:id` | Study note article | `src/pages/AlgorithmStudyNotePage.tsx` |

---

## Key Files

### Layout & Navigation
| File | Purpose |
|---|---|
| `src/components/Layout/AppLayout.tsx` | Root layout: header + sidebar + outlet |
| `src/components/Layout/Header.tsx` | Logo, theme toggle, language pill, SQL Sandbox link, Problems link |
| `src/components/Layout/Sidebar.tsx` | Nav links + study note tree + curriculum quick view |

### Content System
| File | Purpose |
|---|---|
| `src/content/types.ts` | `TopicContent` + `LeetCodeProblem` interfaces |
| `src/content/curriculum.ts` | Imports all topic files; exports `Chapter[]` + helpers |
| `src/content/topics/` | One `.ts` file per topic; grouped by chapter subfolder |
| `src/content/algorithm-study-note/curriculum.ts` | labuladong note chapter tree |

### Skill Tree
| File | Purpose |
|---|---|
| `src/data/curriculumGraph.ts` | ReactFlow node + edge definitions; 31 nodes, 12 categories |
| `src/components/SkillTree/SkillTreeRenderer.tsx` | ReactFlow renderer, progress hook, CustomNode, legend |

### SQL Sandbox
| File | Purpose |
|---|---|
| `src/pages/SQLSandboxPage.tsx` | Full sandbox UI: Monaco editor, results table, exercises, schema |
| `src/data/sqlSandbox/sampleDatabase.ts` | TechCorp DDL + seed SQL + `DB_SCHEMA` display array |
| `src/data/sqlSandbox/exercises.ts` | 18 exercises + `DIFFICULTY_COLORS` |
| `public/sql-wasm-browser.wasm` | **Required** — sql.js WebAssembly for browser. Never delete. |

### Contexts
| File | Default | Purpose |
|---|---|---|
| `src/context/LangContext.tsx` | `'zh'` | EN/ZH language toggle; `useLang()` → `{ lang, toggle, t }` |
| `src/context/ThemeContext.tsx` | `'dark'` | light/dark toggle; `useTheme()` → `{ theme, toggleTheme }` |

---

## TopicContent Interface

Every topic file must satisfy this interface exactly:

```ts
interface TopicContent {
  id: string                                              // unique, kebab-case
  title: { en: string; zh: string }                      // NOT a plain string
  description: { en: string; zh: string }                // NOT a plain string
  timeEstimate: string                                    // e.g. '30 min'
  contentType: 'content' | 'content+visual' | 'content+practice' | 'all'
  hasVisualizer: boolean
  visualizerKey?: string
  content: { en: string; zh: string }                    // joined string, not array
  leetcode: LeetCodeProblem[]
}

interface LeetCodeProblem {
  id: number
  title: string
  titleZh: string          // REQUIRED — Sidebar badge crashes without it
  difficulty: 'Easy' | 'Medium' | 'Hard'
}
```

**Common mistakes that cause runtime crashes:**
- `title: 'string'` instead of `title: { en, zh }` → Sidebar `badge.color` TypeError
- `contentType: 'reading'` → not a valid value → same crash
- Missing `titleZh` in leetcode entries → same crash

---

## SQL Topics

8 topic files under `src/content/topics/sql/`:

| File | `id` | Route |
|---|---|---|
| `basics.ts` | `sql-basics` | `/learn/sql-basics` |
| `joins.ts` | `sql-joins` | `/learn/sql-joins` |
| `aggregation.ts` | `sql-aggregation` | `/learn/sql-aggregation` |
| `subqueries.ts` | `sql-subqueries` | `/learn/sql-subqueries` |
| `windowFunctions.ts` | `sql-window-functions` | `/learn/sql-window-functions` |
| `oracleSQL.ts` | `sql-oracle` | `/learn/sql-oracle` |
| `postgresql.ts` | `sql-postgresql` | `/learn/sql-postgresql` |
| `mysql.ts` | `sql-mysql` | `/learn/sql-mysql` |

---

## Skill Tree — Adding Nodes

Nodes are defined in `src/data/curriculumGraph.ts`.

**Category color palette (constant `C` at top of file):**
```
intro, arrays, linkedList, stackQueue, hashTable,
sorting, trees, heaps, graphs, backtracking, dp, sql
```

**Node shape:**
```ts
{
  id: 'topic-id',            // must match TopicContent.id
  type: 'custom',
  position: { x: number, y: number },
  data: {
    labelEn: 'English Label',
    labelZh: '中文标签',
    color: C.arrays,          // from the C palette
    path: '/learn/topic-id',
    locked: false,
  },
}
```

**Edge helper** `e(id, source, target, color)` creates styled coloured arrows.

**Progress tracking** — `SkillTreeRenderer` auto-marks a node done when the user
clicks it and navigates. Progress is stored in `localStorage` under key
`algoviz-progress-v1` as a JSON array of node IDs.

---

## SQL Sandbox — WASM Loading

sql.js loads via dynamic import: `const mod = await import('sql.js')`.
Vite pre-bundles it as `sql-wasm-browser.js` which calls
`locateFile('sql-wasm-browser.wasm')`. The WASM file must be at
`public/sql-wasm-browser.wasm`.

**If the sandbox shows "expected magic word 00 61 73 6d":**
```bash
cp node_modules/sql.js/dist/sql-wasm-browser.wasm public/
```

Do **not** add `optimizeDeps.exclude: ['sql.js']` to `vite.config.ts` —
that breaks CJS→ESM transform and makes `initSqlJs` undefined.

---

## Vite Config Notes

`vite.config.ts` intentionally excludes `public/algorithm-study-note/**` from
the file watcher (`server.watch.ignored`) — the 466 static `.md` files would
otherwise trigger constant hot-reloads during development.

---

## Conventions

| Rule | Detail |
|---|---|
| No emoji in UI | SVG icons only |
| Bilingual strings | `t('EN text', '中文')` via `useLang()` |
| Default language | Chinese (`'zh'`) |
| Markdown content | `string[].join('\n')` array format — avoids backtick conflicts in TS |
| Type imports | `import type { X }` — `verbatimModuleSyntax` is enabled |
| Branch | Always commit to and push `AI-integration` |
| Commit after each session | `git add <files> && git commit && git push origin AI-integration` |

---

## Adding a New Chapter

1. Create `src/content/topics/<chapter>/` folder
2. Add topic files (see TopicContent interface above)
3. Import all topics in `src/content/curriculum.ts` and add to the `curriculum` array
4. Add skill tree nodes + edges in `src/data/curriculumGraph.ts`
5. Add sidebar quick-view will auto-update (reads from `curriculum`)

---

## Protected Assets

| Path | Status |
|---|---|
| `algorithms-history-archives/` | PROTECTED — never touch |
| `public/sql-wasm-browser.wasm` | Required runtime asset — never delete |
| `public/algorithm-study-note/` | 466 static note files — do not bulk-modify |
