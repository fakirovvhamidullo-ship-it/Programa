import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Learn from './pages/Learn'
import Lesson from './pages/Lesson'
import TeacherPage from './pages/Teacher'
import {
  AchievementsPage,
  PracticePage,
  Profile,
  ProgressPage,
  ProjectDetail,
  ProjectsPage,
  ReferencePage,
  SearchPage,
  SettingsPage,
  ShopPage,
} from './pages/More'
import './styles/global.css'

function Guard({ children }) {
  const { user, ready } = useApp()
  if (!ready) return null
  if (!user) return <Navigate to="/auth" />
  return children
}

function Frame({ children }) {
  const app = useApp()
  if (!app?.progress) return null
  const { progress, settings } = app
  const theme = progress.equipped?.theme === 'theme-ember' ? 'ember' : progress.equipped?.theme === 'theme-matrix' ? 'matrix' : settings.theme
  return (
    <div className={`desk ${settings.animations ? '' : 'reduce-motion'}`} style={{ '--font-scale': settings.fontScale }}>
      <div className="phone" data-theme={theme}>
        <div className="app-bg" />
        <div className="blob a" />
        <div className="blob b" />
        <div className="blob c" />
        {children}
      </div>
    </div>
  )
}

function Shell({ children }) {
  return <Layout>{children}</Layout>
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Frame>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/*"
            element={
              <Shell>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/lesson/:id" element={<Lesson />} />
                  <Route path="/teacher" element={<TeacherPage />} />
                  <Route
                    path="/practice"
                    element={
                      <Guard>
                        <PracticePage />
                      </Guard>
                    }
                  />
                  <Route
                    path="/achievements"
                    element={
                      <Guard>
                        <AchievementsPage />
                      </Guard>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <Guard>
                        <Profile />
                      </Guard>
                    }
                  />
                  <Route
                    path="/progress"
                    element={
                      <Guard>
                        <ProgressPage />
                      </Guard>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <Guard>
                        <SettingsPage />
                      </Guard>
                    }
                  />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/reference" element={<ReferencePage />} />
                  <Route
                    path="/shop"
                    element={
                      <Guard>
                        <ShopPage />
                      </Guard>
                    }
                  />
                  <Route
                    path="/projects"
                    element={
                      <Guard>
                        <ProjectsPage />
                      </Guard>
                    }
                  />
                  <Route
                    path="/projects/:id"
                    element={
                      <Guard>
                        <ProjectDetail />
                      </Guard>
                    }
                  />
                  <Route path="/calendar" element={<Navigate to="/progress" />} />
                </Routes>
              </Shell>
            }
          />
        </Routes>
        </Frame>
      </BrowserRouter>
    </AppProvider>
  )
}
