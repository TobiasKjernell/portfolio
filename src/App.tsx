import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Intro } from './components/Intro/Intro'
import { ScrollNavigation } from './components/ScrollNavigation'
import WorkSearchPage from './pages/WorkSearchPage'

function App() {
  return (
    <BrowserRouter>
      <Intro />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/worksearch' element={<WorkSearchPage />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <ScrollNavigation />
    </BrowserRouter>
  )
}

export default App
