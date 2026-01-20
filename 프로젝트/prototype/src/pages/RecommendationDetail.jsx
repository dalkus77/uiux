import { useParams, Link } from 'react-router-dom'
import { mockRecommendations } from '../data/mockData'

const RecommendationDetail = () => {
  const { id } = useParams()
  const recommendation = mockRecommendations.find(r => r.id === parseInt(id))

  if (!recommendation) {
    return (
      <div className="page">
        <p>추천 정보를 찾을 수 없습니다.</p>
        <Link to="/recommendations">목록으로 돌아가기</Link>
      </div>
    )
  }

  return (
    <div className="page recommendation-detail">
      <header className="page-header">
        <Link to="/recommendations" className="back-link">← 돌아가기</Link>
        <h1>{recommendation.title}</h1>
        <span className="ai-badge">[AI]</span>
      </header>

      <div className="detail-content">
        <div className="detail-section">
          <h2>추천 이유</h2>
          <div className="reason-card">
            <p>{recommendation.reason}</p>
          </div>
        </div>

        <div className="detail-section">
          <h2>상세 설명</h2>
          <p className="detail-description">{recommendation.description}</p>
        </div>

        <div className="detail-section">
          <h2>실행 방법</h2>
          <ol className="steps-list">
            {recommendation.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="detail-section">
          <h2>기대 효과</h2>
          <ul className="effects-list">
            {recommendation.effects.map((effect, index) => (
              <li key={index}>{effect}</li>
            ))}
          </ul>
        </div>

        <div className="detail-actions">
          <button className="btn-primary">지금 시작하기</button>
          <button className="btn-secondary">나중에 알림받기</button>
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

export default RecommendationDetail
