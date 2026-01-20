import { useState } from 'react'
import { Link } from 'react-router-dom'
import HabitCard from '../components/HabitCard'
import { mockHabits } from '../data/mockData'

const Habits = () => {
  const [habits, setHabits] = useState(mockHabits)

  const handleHabitToggle = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ))
  }

  const completedCount = habits.filter(h => h.completed).length
  const progress = (completedCount / habits.length) * 100

  return (
    <div className="page habits">
      <header className="page-header">
        <h1>건강 습관 실천하기</h1>
      </header>

      <div className="habits-content">
        {/* 진행률 */}
        <div className="progress-section">
          <div className="progress-header">
            <h2>오늘의 목표</h2>
            <div className="progress-percentage">{Math.round(progress)}%</div>
          </div>
          <div className="progress-bar-large">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 습관 목록 */}
        <div className="habits-list">
          {habits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={handleHabitToggle}
            />
          ))}
        </div>

        {/* 이번 주 현황 */}
        <div className="weekly-stats">
          <h2>이번 주 실천 현황</h2>
          <div className="stats-chart">
            <div className="chart-placeholder">
              <p>📊 차트 영역</p>
              <p className="chart-note">실제 구현 시 차트 라이브러리 사용</p>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="action-buttons">
          <Link to="/habit-input" className="btn-primary">
            습관 기록하기
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Habits
