const HealthScore = ({ score = 75, status = '주의 필요', confidence = 85 }) => {
  const getStatusColor = () => {
    if (score >= 80) return '#4CAF50'
    if (score >= 60) return '#FF9800'
    return '#F44336'
  }

  const getStatusText = () => {
    if (score >= 80) return '건강함'
    if (score >= 60) return '주의 필요'
    return '위험'
  }

  return (
    <div className="health-score-card">
      <div className="score-header">
        <h2>건강 점수</h2>
        <span className="ai-badge">[AI]</span>
      </div>
      <div className="score-display">
        <div className="score-number" style={{ color: getStatusColor() }}>
          {score}점
        </div>
        <div className="score-status" style={{ color: getStatusColor() }}>
          {getStatusText()}
        </div>
      </div>
      <div className="confidence-bar">
        <div className="confidence-label">신뢰도: {confidence}%</div>
        <div className="confidence-progress">
          <div 
            className="confidence-fill" 
            style={{ width: `${confidence}%`, backgroundColor: getStatusColor() }}
          ></div>
        </div>
      </div>
      <div className="score-reasons">
        <h3>이 점수가 나온 이유:</h3>
        <ul>
          <li>운동 부족: -15점</li>
          <li>식단 불균형: -10점</li>
          <li>수면 부족: -5점</li>
        </ul>
      </div>
      <div className="feedback-section">
        <p>이 분석이 도움이 되었나요?</p>
        <div className="feedback-buttons">
          <button className="btn-feedback">👍 예</button>
          <button className="btn-feedback">👎 아니오</button>
        </div>
      </div>
    </div>
  )
}

export default HealthScore
