# AlgoVisualizer

An interactive algorithm & database learning platform built with React + TypeScript + Vite.
Bilingual (EN / 中文), dark-mode-first, fully client-side — no backend required.

**Live branch:** `AI-integration` on [github.com/howardguoui/algo-visualizer](https://github.com/howardguoui/algo-visualizer)

---

## Features

### Skill Tree / Curriculum
- Interactive ReactFlow skill-dependency graph with 31 nodes across 12 colour-coded categories
- **Progress tracking** — nodes auto-mark as read on navigation; hover to manually toggle; animated progress bar; two-step reset; persisted in `localStorage`
- Bilingual node labels (EN / ZH), MiniMap, zoom & pan

### Topic Pages (`/learn/:topicId`)
- Bilingual markdown content rendered with syntax highlighting
- Embedded sorting visualizer (Bubble / Merge / Quick Sort) with step controls
- LeetCode problem links per topic
- Prev / Next topic navigation

### SQL & Databases Chapter
8 topics with comprehensive bilingual tutorials:

| Topic | ID |
|---|---|
| SQL Basics | `sql-basics` |
| SQL Joins | `sql-joins` |
| SQL Aggregation | `sql-aggregation` |
| SQL Subqueries | `sql-subqueries` |
| Window Functions | `sql-window-functions` |
| Oracle SQL | `sql-oracle` |
| PostgreSQL Deep Dive | `sql-postgresql` |
| MySQL Deep Dive | `sql-mysql` |

### SQL Sandbox (`/sql-sandbox`)
- **In-browser SQLite** powered by `sql.js` (WebAssembly, zero server)
- Monaco Editor with SQL syntax highlighting
- TechCorp sample database — 8 tables, 26 employees, full relational data
- 18 exercises across Easy / Medium / Hard
- Schema browser, DB guide, resizable panels

### Algorithm Study Notes (`/algorithm-study-note/article/:id`)
- 466 bilingual study notes from labuladong
- Sidebar with chapter / section / article navigation, search

### Problem Sets (`/problems`)
- LeetCode Hot 100, Quick Master, Beginner tabs from labuladong

### Sorting Visualizer (`/visualize`)
- Bubble, Selection, Insertion, Merge, Quick Sort
- Step-through with speed control, stats panel, code panel

### Practice (`/practice/:problemId`)
- Monaco code editor (Python via Pyodide, JS native)
- Test case runner, AI Tutor panel (Ollama local LLM)

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| Skill Tree | @xyflow/react (ReactFlow) |
| SQL Engine | sql.js (SQLite via WebAssembly) |
| Code Editor | @monaco-editor/react |
| Markdown | react-markdown + react-syntax-highlighter |
| Resizable Panels | react-resizable-panels |
| Drawing | tldraw |
| Python Runtime | Pyodide |

---

## Project Structure

```
src/
├── algorithms/           # Step-by-step sorting algorithm logic
│   └── sorting/          # bubbleSort, mergeSort, quickSort, …
├── components/
│   ├── Layout/           # AppLayout, Header, Sidebar
│   ├── Content/          # MarkdownRenderer, VisualizerEmbed, LeetCodeLinks
│   ├── SkillTree/        # SkillTreeRenderer (ReactFlow)
│   ├── Practice/         # CodeEditor, TestPanel, AITutorPanel
│   └── Notes/            # TldrawCanvas, NoteDrawer
├── content/
│   ├── curriculum.ts     # Chapter registry — imports all TopicContent files
│   ├── types.ts          # TopicContent + LeetCodeProblem interfaces
│   ├── topics/           # One .ts file per topic, grouped by chapter
│   │   ├── arrays/       # fundamentals, twoPointers, slidingWindow, …
│   │   ├── trees/        # traversal, bfs, bst
│   │   ├── sql/          # basics, joins, aggregation, subqueries,
│   │   │                 # windowFunctions, oracleSQL, postgresql, mysql
│   │   └── …
│   └── algorithm-study-note/
│       └── curriculum.ts # labuladong note chapter/section/article tree
├── data/
│   ├── curriculumGraph.ts     # ReactFlow nodes + edges for skill tree
│   ├── problems/
│   │   └── practiceProblems.ts
│   └── sqlSandbox/
│       ├── sampleDatabase.ts  # TechCorp DDL + seed data + DB_SCHEMA
│       └── exercises.ts       # 18 SQL exercises + DIFFICULTY_COLORS
├── pages/
│   ├── HomePage.tsx
│   ├── TopicPage.tsx
│   ├── SQLSandboxPage.tsx
│   ├── ProblemsPage.tsx
│   ├── VisualizePage.tsx
│   ├── PracticePage.tsx
│   └── AlgorithmStudyNotePage.tsx
├── context/
│   ├── LangContext.tsx    # EN/ZH toggle, default ZH
│   └── ThemeContext.tsx   # light/dark toggle
├── hooks/
│   └── useVisualizer.ts
└── services/
    └── ollamaService.ts
public/
├── sql-wasm-browser.wasm  # sql.js WebAssembly (browser build)
├── sql-wasm.wasm          # sql.js WebAssembly (node build, kept for reference)
└── algorithm-study-note/  # Static .md files (466 articles, excluded from Vite watch)
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (port 5173)
npm run dev

# Build for production
npm run build
```

> The SQL Sandbox requires `public/sql-wasm-browser.wasm`. It is already committed.
> If missing, copy from: `node_modules/sql.js/dist/sql-wasm-browser.wasm`

---

## Adding a New Topic

1. Create `src/content/topics/<chapter>/<topicName>.ts` implementing `TopicContent`:

```ts
import type { TopicContent } from '../../types'

export const myTopic: TopicContent = {
  id: 'chapter-topic-name',          // must be unique, kebab-case
  title: { en: 'Topic Title', zh: '主题标题' },
  description: { en: '...', zh: '...' },
  timeEstimate: '30 min',
  contentType: 'content',            // 'content' | 'content+visual' | 'content+practice' | 'all'
  hasVisualizer: false,
  content: {
    en: ['## Heading', '', 'Paragraph…'].join('\n'),
    zh: ['## 标题', '', '内容…'].join('\n'),
  },
  leetcode: [
    { id: 1, title: 'Two Sum', titleZh: '两数之和', difficulty: 'Easy' },
  ],
}
```

2. Import and add to the chapter's `topics` array in `src/content/curriculum.ts`.

3. Add a matching node to `src/data/curriculumGraph.ts`:

```ts
{
  id: 'chapter-topic-name',   // must match TopicContent.id
  type: 'custom',
  position: { x: 400, y: 300 },
  data: {
    labelEn: 'Topic Title',
    labelZh: '主题标题',
    color: C.arrays,           // pick from the C color map at top of file
    path: '/learn/chapter-topic-name',
    locked: false,
  },
}
```

4. Add edges connecting it to prerequisite and successor nodes.

---

## SQL Sandbox — Adding Exercises

Edit `src/data/sqlSandbox/exercises.ts`:

```ts
{
  id: 'ex-19',
  title: 'Exercise Title',
  difficulty: 'Medium',         // 'Easy' | 'Medium' | 'Hard'
  topic: 'Joins',
  description: 'What to do...',
  hint: 'Hint text...',
  solution: 'SELECT ...',
  starterQuery: 'SELECT -- your query here',
}
```

---

## Key Conventions

- **No emojis in UI** — SVG icons only (per user preference)
- **Bilingual** — every user-visible string uses `t('English', '中文')` from `useLang()`
- **Default language: Chinese** — `LangContext` initialises with `'zh'`
- **Content arrays** — multi-line markdown stored as `string[].join('\n')` to avoid backtick conflicts
- **`import type`** — required for interface imports (`verbatimModuleSyntax` is on)
- **Branch** — active development on `AI-integration`; push to `origin/AI-integration` after each session
