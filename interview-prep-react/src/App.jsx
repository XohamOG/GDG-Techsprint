import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import Home from './pages/Home'
import Practice from './pages/Practice'
import Interviews from './pages/Interviews'
import Companies from './pages/Companies'
import Stats from './pages/Stats'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <Router>
      <div className="min-h-screen relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/interviews/*" element={<Interviews />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
