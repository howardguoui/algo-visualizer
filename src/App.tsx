import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import { ThemeProvider } from './context/ThemeContext'
import { FloatingPanelProvider } from './context/FloatingPanelContext'
import { ProgressProvider } from './context/ProgressContext'
import { GlobalAIChat } from './components/AITutor/GlobalAIChat'
import { AppLayout } from './components/Layout/AppLayout'
import { HomePage } from './pages/HomePage'
import { TopicPage } from './pages/TopicPage'
import { VisualizePage } from './pages/VisualizePage'
import { ProblemsPage } from './pages/ProblemsPage'
import { PracticePage } from './pages/PracticePage'
import { AlgorithmStudyNotePage } from './pages/AlgorithmStudyNotePage'
import { AlgorithmStudyNoteProblemSetPage } from './pages/AlgorithmStudyNoteProblemSetPage'
import { SQLSandboxPage } from './pages/SQLSandboxPage'
import { SystemDesignPage } from './pages/SystemDesignPage'
import { AITutorPage } from './pages/AITutorPage'

export default function App() {
  return (
    <ThemeProvider>
    <LangProvider>
    <ProgressProvider>
    <FloatingPanelProvider>
      <BrowserRouter>
        <Routes>
          {/* Full-screen standalone pages (no sidebar) */}
          <Route path="/practice/:problemId" element={<PracticePage />} />
          <Route path="/sql-sandbox" element={<SQLSandboxPage />} />

          {/* Main app layout — all routes share the unified sidebar */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn/:topicId" element={<TopicPage />} />
            <Route path="/visualize" element={<VisualizePage />} />
            <Route path="/problems" element={<ProblemsPage />} />
            <Route path="/algorithm-study-note" element={<Navigate to="/algorithm-study-note/article/lb-home" replace />} />
            <Route path="/algorithm-study-note/article/:articleId" element={<AlgorithmStudyNotePage />} />
            <Route path="/algorithm-study-note/problem-set" element={<AlgorithmStudyNoteProblemSetPage />} />
            <Route path="/system-design" element={<SystemDesignPage />} />
            <Route path="/ai-tutor" element={<AITutorPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
        {/* Global AI Chat */}
        <GlobalAIChat />
      </BrowserRouter>
    </FloatingPanelProvider>
    </ProgressProvider>
    </LangProvider>
    </ThemeProvider>
  )
}
