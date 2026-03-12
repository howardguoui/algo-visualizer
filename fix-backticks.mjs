import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, dirname, basename } from 'path'

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
  const content = readFileSync(file, 'utf8')
  // Escape triple backticks so they don't terminate template literals
  const updated = content.split('```').join('\\`\\`\\`')
  if (updated !== content) {
    writeFileSync(file, updated, 'utf8')
    fixed++
    console.log('Fixed:', basename(dirname(file)) + '/' + basename(file))
  }
}
console.log('Total files fixed:', fixed)
