import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Intro } from './components/Intro/Intro'
import { ScrollNavigation } from './components/ScrollNavigation'
import WorkSearchPage from './pages/WorkSearchPage'
import TutorialsPage from './pages/TutorialsPage'
import SystemDesignPage from './pages/TutorialsPage/SystemDesign'
import TypeScriptReactPage from './pages/TutorialsPage/TypeScriptReact'
import DockerKubernetesPage from './pages/TutorialsPage/DockerKubernetes'

function App() {
  return (
    <BrowserRouter>
      <Intro />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/worksearch' element={<WorkSearchPage />} />
        <Route path='/tutorials' element={<TutorialsPage />} />
        <Route path='/tutorials/system-design' element={<SystemDesignPage />} />
        <Route path='/tutorials/typescript-with-react' element={<TypeScriptReactPage />} />
        <Route path='/tutorials/docker-and-kubernetes' element={<DockerKubernetesPage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <ScrollNavigation />
    </BrowserRouter>
  )
}

export default App
    