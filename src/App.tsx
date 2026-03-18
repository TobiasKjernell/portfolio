import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { Intro } from './components/Intro/Intro'
import { ScrollNavigation } from './components/ScrollNavigation'

function App() {
  return (
    <BrowserRouter>
      <div className='hidden lg:block'>
      <Intro />
      </div>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
      <ScrollNavigation />
    </BrowserRouter>
  )
}

export default App
