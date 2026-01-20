import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HealthScore from '../components/HealthScore'
import RecommendationCard from '../components/RecommendationCard'
import HabitCard from '../components/HabitCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { mockRecommendations, mockHabits } from '../data/mockData'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [habits, setHabits] = useState(mockHabits)

  useEffect(() => {
    // AI 분석 시뮬레이션
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  const handleHabitToggle = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ))
  }

  const completedCount = habits.filter(h => h.completed).length
  const progress = (completedCount / habits.length) * 100

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="page dashboard">
      <header className="page-header">
        <h1>내 건강 상태</h1>
      </header>

      <div className="dashboard-content">
        {/* 건강 점수 카드 */}
        <HealthScore score={75} status="주의 필요" confidence={85} />

        {/* 주요 지표 */}
        <div className="health-indicators">
          <h2>주요 지표</h2>
          <div className="indicators-grid">
            <div className="indicator-card">
              <div className="indicator-label">BMI</div>
              <div className="indicator-value">24.5</div>
            </div>
            <div className="indicator-card">
              <div className="indicator-label">운동</div>
              <div className="indicator-value">30분</div>
            </div>
            <div className="indicator-card">
              <div className="indicator-label">식단</div>
              <div className="indicator-value">균형</div>
            </div>
            <div className="indicator-card">
              <div className="indicator-label">수면</div>
              <div className="indicator-value">6시간</div>
            </div>
          </div>
        </div>

        {/* 오늘 할 일 */}
        <div className="today-tasks">
          <div className="section-header">
            <h2>오늘 할 일</h2>
            <div className="progress-info">
              진행률: {Math.round(progress)}%
            </div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="habits-list">
            {habits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={handleHabitToggle}
              />
            ))}
          </div>
        </div>

        {/* 맞춤형 추천 */}
        <div className="recommendations-section">
          <div className="section-header">
            <h2>맞춤형 추천 <span className="ai-badge">[AI]</span></h2>
            <Link to="/recommendations" className="view-all-link">
              모두 보기 →
            </Link>
          </div>
          <div className="recommendations-grid">
            {mockRecommendations.slice(0, 3).map(rec => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
