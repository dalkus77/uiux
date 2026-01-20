const LoadingSpinner = ({ message = '분석 중입니다. 잠시만 기다려주세요...' }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  )
}

export default LoadingSpinner
