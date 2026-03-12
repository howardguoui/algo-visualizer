/**
 * Fix content files: escape ALL backticks inside markdown template literals
 * Uses a state machine to distinguish template delimiters from content backticks
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, basename, dirname } from 'path'

function fixFile(source) {
  const lines = source.split('\n')
  const result = []
  let inContent = false  // true when inside en:/zh: template literal

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (!inContent) {
      // Detect start of a content template literal
      // Pattern: "    en: `" or "    zh: `" - could be indented
      const startMatch = line.match(/^(\s+(?:en|zh):\s*)(`)(.*)?$/)
      if (startMatch) {
        const [, prefix, _bt, rest] = startMatch
        inContent = true
        // Check if the template closes on the same line
        const closingOnSameLine = rest !== undefined && rest.endsWith('`')
        if (closingOnSameLine) {
          // Single-line template literal - escape internal backticks (not the delimiters)
          const inner = rest.slice(0, -1)
          result.push(prefix + '`' + inner.replace(/`/g, '\\u0060') + '`')
          inContent = false
        } else {
          // Opening of multi-line template literal
          const escapedRest = rest ? rest.replace(/`/g, '\\u0060') : ''
          result.push(prefix + '`' + escapedRest)
        }
        continue
      }
      result.push(line)
    } else {
      // Inside a multi-line template literal
      // Detect the closing backtick line: just whitespace + backtick + optional comma
      const closingMatch = line.match(/^(\s*)`(,?)(\s*)$/)
      if (closingMatch) {
        const [, spaces, comma, trail] = closingMatch
        result.push(spaces + '`' + comma + trail)
        inContent = false
      } else {
        // Content line - escape all backticks
        result.push(line.replace(/`/g, '\\u0060'))
      }
    }
  }

  return result.join('\n')
}

function walk(dir) {
  const result = []
  for (const f of readdirSync(dir)) {
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
  const fixed_content = fixFile(original)
  if (fixed_content !== original) {
    writeFileSync(file, fixed_content, 'utf8')
    fixed++
    console.log('Fixed:', basename(dirname(file)) + '/' + basename(file))
  }
}
console.log('Total files fixed:', fixed)
