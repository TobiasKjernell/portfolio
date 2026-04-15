import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Intro } from './components/Intro/Intro'
import { ScrollNavigation } from './components/ScrollNavigation'
import WorkSearchPage from './pages/WorkSearchPage'

function App() {
  return (
    <BrowserRouter>
      <div className='hidden lg:block'>
      <Intro />
      </div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/worksearch' element={<WorkSearchPage />} />
      </Routes>
      <ScrollNavigation />
    </BrowserRouter>
  )
}

export default App
