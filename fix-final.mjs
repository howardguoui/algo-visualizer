/**
 * Final fix: Convert broken template literal content to JSON-encoded strings.
 *
 * Current broken state (after previous fix attempts):
 *   en: `...content with \u0060 chars...\u0060,
 *
 * Target state:
 *   en: "...content with ` chars...",
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, basename, dirname } from 'path'

const U0060 = '\\u0060'  // literal text \u0060 in the file
const BACKTICK = '`'

function processFile(source) {
  const lines = source.split('\n')
  const result = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Detect start of a content template literal: "    en: `" or "    zh: `"
    const startMatch = line.match(/^(\s+)(en|zh):\s*`(.*)$/)
    if (startMatch) {
      const [, indent, key, firstLineContent] = startMatch
      const contentLines = []

      // Check if first line already ends the template (single-line template)
      if (firstLineContent.endsWith(U0060 + ',') || firstLineContent.endsWith(U0060)) {
        // Single-line: content is firstLineContent minus the closing \u0060 and comma
        let inner = firstLineContent
        if (inner.endsWith(U0060 + ',')) inner = inner.slice(0, -U0060.length - 1)
        else if (inner.endsWith(U0060)) inner = inner.slice(0, -U0060.length)
        const realContent = inner.replaceAll(U0060, BACKTICK)
        result.push(indent + key + ': ' + JSON.stringify(realContent) + ',')
        i++
        continue
      }

      // If it ends with `,` that's not escaped - it's the closing on the first line
      if (firstLineContent !== '') {
        contentLines.push(firstLineContent)
      }

      i++

      // Collect content lines until we find the closing delimiter
      while (i < lines.length) {
        const contentLine = lines[i]

        // Closing patterns:
        // 1. Line ending with \u0060, (closing backtick + comma at end of content line)
        if (contentLine.endsWith(U0060 + ',')) {
          const lastContent = contentLine.slice(0, -U0060.length - 1)
          if (lastContent !== '') contentLines.push(lastContent)
          i++
          break
        }
        // 2. Line that is just \u0060 or `  \u0060,`
        if (contentLine.trim() === U0060 + ',' || contentLine.trim() === U0060) {
          i++
          break
        }
        // 3. Regular content line - collect it
        contentLines.push(contentLine)
        i++
      }

      // Build the real content string (replace \u0060 text with actual backtick)
      const rawContent = contentLines.join('\n').replaceAll(U0060, BACKTICK)

      // Use JSON.stringify for safe encoding
      result.push(indent + key + ': ' + JSON.stringify(rawContent) + ',')
      continue
    }

    result.push(line)
    i++
  }

  return result.join('\n')
}

function walk(dir) {
  const entries = readdirSync(dir)
  const result = []
  for (const f of entries) {
    const full = join(dir, f)
    if (statSync(full).isDirectory()) result.push(...walk(full))
    else if (f.endsWith('.ts')) result.push(full)
  }
  return result
}

const base = 'E:/ClaudeProject/algo-visualizer/src/content/topics'
let fixed = 0

for (const file of walk(base)) {
  const original = readFileSync(file, 'utf8')
  const updated = processFile(original)
  if (updated !== original) {
    writeFileSync(file, updated, 'utf8')
    fixed++
    console.log('Fixed:', basename(dirname(file)) + '/' + basename(file))
  }
}
console.log('Done. Fixed:', fixed, 'files')
