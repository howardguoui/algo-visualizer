import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import { AppLayout } from './components/Layout/AppLayout'
import { LabuladongLayout } from './components/Layout/LabuladongLayout'
import { HomePage } from './pages/HomePage'
import { TopicPage } from './pages/TopicPage'
import { VisualizePage } from './pages/VisualizePage'
import { ProblemsPage } from './pages/ProblemsPage'
import { PracticePage } from './pages/PracticePage'
import { LabuladongArticlePage } from './pages/LabuladongArticlePage'
import { LabuladongProblemSetPage } from './pages/LabuladongProblemSetPage'

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Routes>
          {/* Practice page is full-screen — no sidebar layout */}
          <Route path="/practice/:problemId" element={<PracticePage />} />

          {/* Labuladong curriculum — uses its own sidebar */}
          <Route path="/labuladong" element={<LabuladongLayout />}>
            <Route index element={<Navigate to="/labuladong/article/lb-home" replace />} />
            <Route path="article/:articleId" element={<LabuladongArticlePage />} />
            <Route path="problem-set" element={<LabuladongProblemSetPage />} />
          </Route>

          {/* Main app layout */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn/:topicId" element={<TopicPage />} />
            <Route path="/visualize" element={<VisualizePage />} />
            <Route path="/problems" element={<ProblemsPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LangProvider>
  )
}
