import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import { AppLayout } from './components/Layout/AppLayout'
import { AlgorithmStudyNoteLayout } from './components/Layout/AlgorithmStudyNoteLayout'
import { HomePage } from './pages/HomePage'
import { TopicPage } from './pages/TopicPage'
import { VisualizePage } from './pages/VisualizePage'
import { ProblemsPage } from './pages/ProblemsPage'
import { PracticePage } from './pages/PracticePage'
import { AlgorithmStudyNotePage } from './pages/AlgorithmStudyNotePage'
import { AlgorithmStudyNoteProblemSetPage } from './pages/AlgorithmStudyNoteProblemSetPage'

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Routes>
          {/* Practice page is full-screen — no sidebar layout */}
          <Route path="/practice/:problemId" element={<PracticePage />} />

          {/* Algorithm Study Note — uses its own sidebar */}
          <Route path="/algorithm-study-note" element={<AlgorithmStudyNoteLayout />}>
            <Route index element={<Navigate to="/algorithm-study-note/article/lb-home" replace />} />
            <Route path="article/:articleId" element={<AlgorithmStudyNotePage />} />
            <Route path="problem-set" element={<AlgorithmStudyNoteProblemSetPage />} />
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
