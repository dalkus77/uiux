import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HabitInput = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    type: 'exercise',
    title: '',
    description: '',
    target: '',
    unit: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // 실제 구현 시 API 호출
    alert('습관이 기록되었습니다!')
    navigate('/habits')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="page habit-input">
      <header className="page-header">
        <h1>습관 기록하기</h1>
      </header>

      <div className="input-content">
        <form onSubmit={handleSubmit} className="habit-form">
          <div className="form-group">
            <label>습관 유형</label>
            <select 
              name="type" 
              value={formData.type} 
              onChange={handleChange}
              className="form-select"
            >
              <option value="exercise">운동</option>
              <option value="diet">식단</option>
              <option value="sleep">수면</option>
              <option value="water">물 섭취</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div className="form-group">
            <label>습관 제목</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="예: 아침 운동하기"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>설명</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="습관에 대한 설명을 입력하세요"
              className="form-textarea"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>목표</label>
            <div className="target-input-group">
              <input
                type="number"
                name="target"
                value={formData.target}
                onChange={handleChange}
                placeholder="30"
                className="form-input target-input"
              />
              <select 
                name="unit" 
                value={formData.unit} 
                onChange={handleChange}
                className="form-select unit-select"
              >
                <option value="분">분</option>
                <option value="시간">시간</option>
                <option value="회">회</option>
                <option value="L">L</option>
                <option value="kcal">kcal</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/habits')} className="btn-secondary">
              취소
            </button>
            <button type="submit" className="btn-primary">
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HabitInput
