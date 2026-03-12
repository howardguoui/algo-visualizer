import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LangProvider } from './context/LangContext'
import { AppLayout } from './components/Layout/AppLayout'
import { HomePage } from './pages/HomePage'
import { TopicPage } from './pages/TopicPage'
import { VisualizePage } from './pages/VisualizePage'

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn/:topicId" element={<TopicPage />} />
            <Route path="/visualize" element={<VisualizePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LangProvider>
  )
}
