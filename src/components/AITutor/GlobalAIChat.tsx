import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useLang } from '../../context/LangContext'
import { findTopic } from '../../content/curriculum'
import { getPracticeProblem } from '../../data/problems/practiceProblems'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function GlobalAIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const { theme } = useTheme()
  const { lang, t } = useLang()
  const location = useLocation()
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsTyping(true)
    
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    // Detect specific page context paths
    let pageContext = 'The user is navigating the platform.'
    let constraints = ''

    if (location.pathname.includes('/learn/')) {
      const topicId = location.pathname.split('/learn/')[1]
      const found = findTopic(topicId)
      if (found) {
        const topicTitle = lang === 'zh' ? found.topic.title.zh : found.topic.title.en
        pageContext = `The user is reading a learning material. Topic: "${topicTitle}". Content summary or identifier: ${found.topic.id}.`
        // Provide the first 1000 chars of content text as context if available
        const localContent = lang === 'zh' ? found.topic.content.zh : found.topic.content.en
        const rawContent = localContent.slice(0, 1000) 
        pageContext += `\nTopic content excerpt:\n"""\n${rawContent}\n"""\n`
        constraints = `CRITICAL RULE: ALWAYS learn from the topic content provided above. ONLY answer questions that are related to this exact topic. Do NOT answer anything beyond this topic.`
      }
    } else if (location.pathname.includes('/practice/')) {
      const problemIdStr = location.pathname.split('/practice/')[1]
      const problem = getPracticeProblem(Number(problemIdStr))
      if (problem) {
        const title = lang === 'zh' ? problem.titleZh : problem.title
        pageContext = `The user is trying to solve a coding challenge. Problem: "${title}". Description: \n"""\n${problem.description}\n"""`
        constraints = `CRITICAL RULE: YOU MUST ONLY give hints on how to write the solution. DO NOT provide the full code solution. DO NOT answer any questions beyond providing hints for solving THIS specific problem.`
      }
    } else if (location.pathname.includes('/visualize')) {
      pageContext = 'The user is looking at an algorithm visualizer.'
      constraints = 'Explain the algorithmic steps conceptually if asked.'
    }

    const prompt = `You are an expert algorithm tutor.
${pageContext}
${constraints}
CRITICAL RULE: Always reply in the exact same language (English or Chinese) that the user typed their request in.
User request: ${userMessage}`

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'glm-4.7-flash', 
          prompt: prompt,
          stream: true,
        }),
      });

      if (!response.ok) throw new Error()
      if (!response.body) throw new Error()
      
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(line => line.trim() !== '')
        
        for (const line of lines) {
          try {
            const parsed = JSON.parse(line)
            if (parsed.response) {
              setMessages(prev => {
                const newMsgs = [...prev]
                const last = { ...newMsgs[newMsgs.length - 1] }
                if (last.role === 'assistant') {
                  last.content += parsed.response
                  newMsgs[newMsgs.length - 1] = last
                }
                return newMsgs
              })
            }
          } catch (err) {}
        }
      }
    } catch (err) {
      setMessages(prev => {
        const newMsgs = [...prev]
        const last = newMsgs[newMsgs.length - 1]
        if (last.role === 'assistant') {
          last.content = lang === 'zh' ? '连接本地AI失败。请确保Ollama正在运行，并且安装了预设模型。' : 'Failed to connect to local AI. Ensure Ollama is running.'
        }
        return newMsgs
      })
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className={`mb-4 w-80 sm:w-96 h-[500px] flex flex-col rounded-2xl shadow-xl overflow-hidden border ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
          {/* Header */}
          <div className={`p-4 flex items-center justify-between border-b ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-indigo-600 border-indigo-700'}`}>
            <div className="flex items-center gap-2 text-white">
              <span className="text-xl">🤖</span>
              <span className="font-semibold">{t('AI Tutor', 'AI 导师')}</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'}`}>
            {messages.length === 0 ? (
              <div className={`text-center mt-10 text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>
                {t('Hello! I can help you with algorithms. What would you like to know?', '你好！我是算法导师。有什么我可以帮忙的吗？')}
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : theme === 'dark' 
                        ? 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                        : 'bg-white border border-gray-200 text-gray-800 shadow-sm rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className={`p-3 border-t flex gap-2 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={lang === 'zh' ? '问我任何问题...' : 'Ask me anything...' }
              className={`flex-1 rounded-full px-4 py-2 text-sm outline-none border focus:ring-2 transition-shadow ${
                theme === 'dark' 
                  ? 'bg-slate-900 border-slate-700 text-white focus:ring-blue-500'
                  : 'bg-gray-100 border-transparent text-gray-900 focus:ring-indigo-300'
              }`}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                !input.trim() || isTyping
                  ? (theme === 'dark' ? 'bg-slate-700 text-slate-500' : 'bg-gray-200 text-gray-400')
                  : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      {isOpen ? null : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        >
          <span className="text-2xl">💬</span>
        </button>
      )}
    </div>
  )
}
