import { Link } from 'react-router-dom'

const RecommendationCard = ({ recommendation }) => {
  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <div className="recommendation-card">
      <div className="card-header">
        <h3>{recommendation.title}</h3>
        <span className="ai-badge">[AI]</span>
      </div>
      <div className="card-content">
        <p className="card-description">{recommendation.description}</p>
        <div className="feasibility">
          <span>실행 가능성: </span>
          <span className="stars">{renderStars(recommendation.feasibility)}</span>
        </div>
      </div>
      <div className="card-actions">
        <Link 
          to={`/recommendation/${recommendation.id}`}
          className="btn-secondary"
        >
          왜 추천되었나요?
        </Link>
        <button className="btn-primary">지금 시작하기</button>
      </div>
    </div>
  )
}

export default RecommendationCard
