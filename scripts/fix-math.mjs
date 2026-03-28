/**
 * fix-math.mjs
 *
 * Cleans up "scraped" LaTeX artifacts from labuladong markdown files.
 *
 * The scraper picked up the KaTeX output HTML + raw LaTeX source + plain fallback,
 * resulting in triples like:
 *
 *   O(n2)O(n^2)O(n2)         → $O(n^2)$
 *   O(1)O(1)O(1)             → $O(1)$
 *   nnn                      → $n$
 *   n2n^2n2                  → $n^2$
 *   g(n)g(n)g(n)             → $g(n)$
 *   0≤f(n)≤cg(n) 0≤f(n)≤c*g(n) 0≤f(n)≤cg(n) → $0≤f(n)≤c*g(n)$
 *
 * Also cleans up:
 *   - "CC++GoJavaJavaScriptPython" tab-bar lines
 *   - Multiple blank lines → max 2
 *
 * Usage: node scripts/fix-math.mjs [--dir <path>]
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

function* walkMd(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) yield* walkMd(full)
    else if (extname(entry) === '.md') yield full
  }
}

/**
 * Main replacement logic for a single file's text content.
 */
function fixMath(src) {
  let text = src

  // ── 1. Remove language tab bars ──────────────────────────────────────────
  text = text.replace(/^CC\+\+GoJavaJavaScriptPython\s*$/gm, '')

  // ── 2. Triple-repetition math patterns ──────────────────────────────────
  //
  // Pattern:  PLAIN  LATEX  PLAIN
  //   The PLAIN version is the HTML-rendered (subscripts stripped) or fallback.
  //   The LATEX version is the actual LaTeX source (the middle one).
  //
  // We iterate until stable so nested fixes all get applied.

  let prev
  let iterations = 0
  do {
    prev = text
    iterations++

    // ── A: Function-call triples: fn(plain)fn(latex)fn(plain) ─────────────
    // e.g.  O(n2)O(n^2)O(n2)
    //        g(n)g(n)g(n)
    //        f(n)f(n)f(n)
    // Captures the first group (fn(args)) and the middle (fn(latex_args)),
    // discards the repeated last copy and wraps middle in $...$
    text = text.replace(
      /([A-ZΘΩa-zf-h]?\([^)$]{0,80}\))\s*([A-ZΘΩa-zf-h]?\([^)$]{0,100}\))\s*\1/g,
      (_m, _plain, latex) => `$${latex}$`
    )

    // ── B: bare triple variable — nnn → $n$  NNN → $N$  KKK → $K$ ─────────
    text = text.replace(/(?<![A-Za-z$])([A-Za-z])\1\1(?![A-Za-z$])/g, '$$$1$')

    // ── C: variable+digits+latex+digits — n2n^2n2 → $n^2$ ──────────────────
    // Also handles: n0n_0n0 → $n_0$
    text = text.replace(
      /(?<![A-Za-z$])([A-Za-z])([0-9]*)([A-Za-z][^,，。；:！？\)）\s$]{0,30}?[\\^_{][^,，。；:！？\)）\s$]{0,30})\2\1[\u200B\u200C\u200D\uFEFF]?(?![A-Za-z$])/g,
      (_m, varr, _plain, latexSuffix) => `$${varr}${latexSuffix}$`
    )

    // ── D: compact equation triple (no spaces) vs spaced (latex) vs compact ─
    // e.g.  0≤f(n)≤c∗g(n)  0 ≤ f(n) ≤ c*g(n)  0≤f(n)≤c∗g(n)
    // Heuristic: two copies of the compact version sandwich a spaced latex one
    text = text.replace(
      /([^\s$]{5,80})\s+([^\s$]{5,40}(?:\s[^\s$]{1,40}){1,10})\s+\1/g,
      (_m, _compact, latex) => `$${latex}$`
    )

  } while (prev !== text && iterations < 25)

  // ── 3. Clean up remaining standalone bare O(n^2) not yet wrapped ─────────
  // Only wrap if NOT already inside $...$
  text = text.replace(
    /(?<!\$)\bO\(([^)]*\^[^)]*)\)(?!\$)/g,
    (_m, inner) => `$O(${inner})$`
  )

  // ── 4. Collapse multiple blank lines ────────────────────────────────────
  text = text.replace(/\n{3,}/g, '\n\n')

  return text
}

// ─── main ────────────────────────────────────────────────────────────────────

// Allow override via --dir argument
const args = process.argv.slice(2)
const dirArgIdx = args.indexOf('--dir')
let contentDir
if (dirArgIdx !== -1 && args[dirArgIdx + 1]) {
  contentDir = args[dirArgIdx + 1]
} else {
  // Default: scan both content/ and public/algorithm-study-note/
  const base = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
  contentDir = join(base, 'public', 'algorithm-study-note')
}

console.log(`Scanning: ${contentDir}\n`)

let changed = 0
let total = 0
for (const file of walkMd(contentDir)) {
  total++
  const original = readFileSync(file, 'utf8')
  const fixed = fixMath(original)
  if (fixed !== original) {
    writeFileSync(file, fixed, 'utf8')
    console.log(`  ✓  ${file.replace(contentDir, '')}`)
    changed++
  }
}

console.log(`\nDone. Fixed ${changed} / ${total} files.`)
