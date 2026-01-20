import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Recommendations from './pages/Recommendations'
import Habits from './pages/Habits'
import RecommendationDetail from './pages/RecommendationDetail'
import HabitInput from './pages/HabitInput'
import Navigation from './components/Navigation'

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/recommendation/:id" element={<RecommendationDetail />} />
          <Route path="/habit-input" element={<HabitInput />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
