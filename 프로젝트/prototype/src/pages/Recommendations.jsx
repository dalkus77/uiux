import { useState, useEffect } from 'react'
import RecommendationCard from '../components/RecommendationCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { mockRecommendations } from '../data/mockData'

const Recommendations = () => {
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    // AI 추천 시뮬레이션
    setTimeout(() => {
      setRecommendations(mockRecommendations)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return <LoadingSpinner message="맞춤형 추천을 생성하고 있습니다..." />
  }

  return (
    <div className="page recommendations">
      <header className="page-header">
        <h1>건강 정보 알아보기</h1>
        <p className="page-subtitle">AI 분석 기반 추천</p>
      </header>

      <div className="recommendations-content">
        <div className="recommendations-grid">
          {recommendations.map(rec => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </div>

        <div className="feedback-section">
          <p>이 추천이 도움이 되었나요?</p>
          <div className="feedback-buttons">
            <button className="btn-feedback">👍 예</button>
            <button className="btn-feedback">👎 아니오</button>
            <button className="btn-feedback">💬 의견</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommendations
