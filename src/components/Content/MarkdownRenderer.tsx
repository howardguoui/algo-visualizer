import { createContext, useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom'
import type { Components } from 'react-markdown'
import { practiceProblemIds } from '../../data/problems/practiceProblems'

// react-markdown v10 removed the `inline` prop from the code component.
// We use a context to tell <code> whether it's nested inside a <pre> block,
// so inline code and fenced code blocks can be styled differently.
const BlockCodeCtx = createContext(false)

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-white mt-8 mb-4 pb-3 border-b border-slate-800">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold text-white mt-8 mb-3 flex items-center gap-2">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-semibold text-slate-200 mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-slate-300 leading-7 mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-1.5 mb-4 text-slate-300 pl-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-1.5 mb-4 text-slate-300 pl-2">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-7">{children}</li>
  ),

  // All fenced code blocks pass through <pre>. We detect the language here
  // from the hast node's first child (the <code> element) and render the
  // full styled container. A context flag tells <code> it's inside a block.
  pre: ({ node, children }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const codeNode = (node as any)?.children?.[0]
    const classNames: string[] = codeNode?.properties?.className ?? []
    const langClass = classNames.find((c: string) => c.startsWith('language-')) ?? ''
    const lang = langClass.replace('language-', '')

    return (
      <BlockCodeCtx.Provider value={true}>
        <div className="my-4 rounded-xl overflow-hidden border border-slate-700">
          {lang && (
            <div className="bg-slate-800 px-4 py-2 text-xs text-slate-400 font-mono border-b border-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="ml-2">{lang}</span>
            </div>
          )}
          <pre className="bg-slate-900 p-4 overflow-x-auto text-sm font-mono text-slate-200 leading-6">
            {children}
          </pre>
        </div>
      </BlockCodeCtx.Provider>
    )
  },

  // <code> is called for both fenced blocks (nested inside <pre>) and inline
  // backtick spans. Use context to tell them apart.
  code: ({ children }) => {
    const isBlock = useContext(BlockCodeCtx)
    if (isBlock) {
      // Inside a fenced block — <pre> already provides the styled container,
      // just render a plain <code> so the text inherits the pre's font/color.
      return <code>{children}</code>
    }
    return (
      <code className="bg-slate-800 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    )
  },

  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 my-4 text-slate-400 italic">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  hr: () => <hr className="border-slate-800 my-8" />,
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm text-slate-300 border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-slate-700 bg-slate-800 px-4 py-2 text-left font-semibold text-slate-200">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-slate-700 px-4 py-2">{children}</td>
  ),
  a: ({ href, children }) => {
    // Intercept LeetCode problem links — redirect to internal practice page if available
    if (href?.includes('leetcode.com/problems/')) {
      const text = Array.isArray(children)
        ? children.map(c => (typeof c === 'string' ? c : '')).join('')
        : String(children ?? '')
      const idMatch = text.match(/^(\d+)[\.\s]/)
      const id = idMatch ? parseInt(idMatch[1]) : null
      if (id && practiceProblemIds.has(id)) {
        return (
          <Link to={`/practice/${id}`} className="text-blue-400 hover:text-blue-300 underline font-medium">
            {children}
            <span className="ml-1 text-[10px] text-blue-500 align-middle">●</span>
          </Link>
        )
      }
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
        {children}
      </a>
    )
  },
}

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
