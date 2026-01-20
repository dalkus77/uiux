// 앱 초기화
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

// 앱 초기화 함수
async function initApp() {
    try {
        // 대시보드 데이터 로드
        await loadDashboard();
        
        // 추천 목록 로드
        await loadRecommendations();
        
        // 습관 목록 로드
        await loadHabits();
    } catch (error) {
        console.error('앱 초기화 오류:', error);
        showError('데이터를 불러오는 중 오류가 발생했습니다.');
    }
}

// 페이지 전환 함수
function showPage(pageId) {
    // 모든 페이지 숨기기
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 선택한 페이지 보이기
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 네비게이션 활성화
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 클릭된 네비게이션 아이템 활성화
    event.target.closest('.nav-item')?.classList.add('active');
    
    // 페이지별 데이터 로드
    if (pageId === 'dashboard') {
        loadDashboard();
    } else if (pageId === 'recommendations') {
        loadRecommendations();
    } else if (pageId === 'habits') {
        loadHabits();
    } else if (pageId === 'documents') {
        // 문서 트리는 이미 렌더링됨
    }
}

// 대시보드 로드
async function loadDashboard() {
    try {
        // 건강 분석 로드
        const analysis = await getHealthAnalysis();
        displayHealthScore(analysis);
        
        // 건강 지표 로드
        const indicators = await getHealthIndicators();
        displayIndicators(indicators);
        
        // 습관 목록 로드
        const habits = await getHabits();
        displayHabits(habits, 'habits-list');
        updateProgress(habits);
        
        // 추천 미리보기 로드
        const recommendations = await getRecommendations();
        displayRecommendationsPreview(recommendations);
    } catch (error) {
        console.error('대시보드 로드 오류:', error);
        // 오류 시 목업 데이터 사용
        displayMockData();
    }
}

// 건강 점수 표시
function displayHealthScore(analysis) {
    const healthScoreDiv = document.getElementById('health-score');
    
    const score = analysis.score || 75;
    const status = analysis.status || '주의 필요';
    const confidence = analysis.confidence || 85;
    const reasons = analysis.reasons || [
        '운동 부족: -15점',
        '식단 불균형: -10점',
        '수면 부족: -5점'
    ];
    
    const statusColor = score >= 80 ? '#4CAF50' : score >= 60 ? '#FF9800' : '#F44336';
    const statusText = score >= 80 ? '건강함' : score >= 60 ? '주의 필요' : '위험';
    
    const aiIconSvg = `<svg class="ai-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px;">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
        <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
        <circle cx="16" cy="8" r="1.5" fill="currentColor"/>
        <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
    </svg>`;
    
    healthScoreDiv.innerHTML = `
        <div class="score-display">
            <div class="score-number" style="color: ${statusColor}">${score}</div>
            <div class="score-status" style="color: ${statusColor}">${statusText}</div>
        </div>
        <div class="confidence-bar">
            <div class="confidence-label">신뢰도: ${confidence}%</div>
            <div class="confidence-progress">
                <div class="confidence-fill" style="width: ${confidence}%; background-color: ${statusColor}"></div>
            </div>
        </div>
        <div class="score-reasons">
            <h3>이 점수가 나온 이유:</h3>
            <ul>
                ${reasons.map(reason => `<li>${reason}</li>`).join('')}
            </ul>
        </div>
        <div class="feedback-section">
            <p>이 분석이 도움이 되었나요?</p>
            <div class="feedback-buttons">
                <button class="btn-feedback" onclick="submitFeedbackHandler('analysis', 'health_score', 'positive')">👍 예</button>
                <button class="btn-feedback" onclick="submitFeedbackHandler('analysis', 'health_score', 'negative')">👎 아니오</button>
            </div>
        </div>
    `;
}

// 건강 지표 표시
function displayIndicators(indicators) {
    const indicatorsGrid = document.getElementById('indicators');
    
    const indicatorData = [
        { label: 'BMI', value: indicators.bmi || '24.5' },
        { label: '운동', value: indicators.exercise || '30분' },
        { label: '식단', value: indicators.diet || '균형' },
        { label: '수면', value: indicators.sleep || '6시간' }
    ];
    
    indicatorsGrid.innerHTML = indicatorData.map(ind => `
        <div class="indicator">
            <div class="indicator-label">${ind.label}</div>
            <div class="indicator-value">${ind.value}</div>
        </div>
    `).join('');
}

// 습관 목록 표시
function displayHabits(habits, containerId) {
    const container = document.getElementById(containerId);
    
    if (!habits || habits.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">등록된 습관이 없습니다.</p>';
        return;
    }
    
    container.innerHTML = habits.map(habit => `
        <div class="habit-item ${habit.completed ? 'completed' : ''}">
            <div class="habit-content">
                <input 
                    type="checkbox" 
                    class="habit-checkbox" 
                    ${habit.completed ? 'checked' : ''}
                    onchange="toggleHabitHandler(${habit.id}, this.checked)"
                >
                <div class="habit-info">
                    <div class="habit-title">${habit.title}</div>
                    <div class="habit-description">${habit.description}</div>
                </div>
            </div>
            <span class="status-badge ${habit.completed ? 'completed' : 'pending'}">
                ${habit.completed ? '완료' : '진행중'}
            </span>
        </div>
    `).join('');
}

// 습관 완료 토글 핸들러
async function toggleHabitHandler(habitId, completed) {
    try {
        await toggleHabit(habitId, completed);
        // 습관 목록 다시 로드
        const habits = await getHabits();
        displayHabits(habits, 'habits-list');
        displayHabits(habits, 'habits-list-page');
        updateProgress(habits);
        updateHabitsProgress(habits);
    } catch (error) {
        console.error('습관 토글 오류:', error);
        alert('습관 상태 변경에 실패했습니다.');
    }
}

// 진행률 업데이트
function updateProgress(habits) {
    if (!habits || habits.length === 0) {
        document.getElementById('progress-bar-fill').style.width = '0%';
        document.getElementById('progress-percent').textContent = '0%';
        return;
    }
    
    const completed = habits.filter(h => h.completed).length;
    const progress = (completed / habits.length) * 100;
    
    document.getElementById('progress-bar-fill').style.width = progress + '%';
    document.getElementById('progress-percent').textContent = Math.round(progress) + '%';
}

// 습관 페이지 진행률 업데이트
function updateHabitsProgress(habits) {
    if (!habits || habits.length === 0) {
        document.getElementById('habits-progress-bar').style.width = '0%';
        document.getElementById('habits-progress-percent').textContent = '0%';
        return;
    }
    
    const completed = habits.filter(h => h.completed).length;
    const progress = (completed / habits.length) * 100;
    
    document.getElementById('habits-progress-bar').style.width = progress + '%';
    document.getElementById('habits-progress-percent').textContent = Math.round(progress) + '%';
}

// 추천 미리보기 표시
function displayRecommendationsPreview(recommendations) {
    const container = document.getElementById('recommendations-grid');
    
    if (!recommendations || recommendations.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">추천 정보가 없습니다.</p>';
        return;
    }
    
    const preview = recommendations.slice(0, 2);
    container.innerHTML = preview.map(rec => `
        <div class="recommendation-card">
            <h3>${rec.title}</h3>
            <p>${rec.description}</p>
            <div class="feasibility">
                <span>실행 가능성: </span>
                <span class="stars">${'⭐'.repeat(rec.feasibility || 3)}${'☆'.repeat(5 - (rec.feasibility || 3))}</span>
            </div>
            <div class="card-actions">
                <button class="btn btn-secondary" onclick="showRecommendationDetail(${rec.id})">왜 추천되었나요?</button>
                <button class="btn btn-primary">지금 시작하기</button>
            </div>
        </div>
    `).join('');
}

// 추천 목록 로드
async function loadRecommendations() {
    try {
        const recommendations = await getRecommendations();
        displayRecommendations(recommendations);
    } catch (error) {
        console.error('추천 목록 로드 오류:', error);
    }
}

// 추천 목록 표시
function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendations-list');
    
    if (!recommendations || recommendations.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">추천 정보가 없습니다.</p>';
        return;
    }
    
    container.innerHTML = recommendations.map(rec => `
        <div class="recommendation-card">
            <h3>${rec.title}</h3>
            <p>${rec.description}</p>
            <div class="feasibility">
                <span>실행 가능성: </span>
                <span class="stars">${'⭐'.repeat(rec.feasibility || 3)}${'☆'.repeat(5 - (rec.feasibility || 3))}</span>
            </div>
            <div class="card-actions">
                <button class="btn btn-secondary" onclick="showRecommendationDetail(${rec.id})">왜 추천되었나요?</button>
                <button class="btn btn-primary">지금 시작하기</button>
            </div>
        </div>
    `).join('');
}

// 추천 상세 표시
async function showRecommendationDetail(recommendationId) {
    try {
        const detail = await getRecommendationDetail(recommendationId);
        displayRecommendationDetail(detail);
    } catch (error) {
        console.error('추천 상세 로드 오류:', error);
        alert('추천 상세 정보를 불러오는데 실패했습니다.');
    }
}

// 추천 상세 모달 표시
function displayRecommendationDetail(detail) {
    document.getElementById('detail-title').textContent = detail.title;
    
    const content = `
        <div class="detail-section">
            <div class="reason-card">
                <h3>추천 이유</h3>
                <p>${detail.reason}</p>
            </div>
        </div>
        <div class="detail-section">
            <h3>실행 방법</h3>
            <ol class="steps-list">
                ${detail.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
        <div class="detail-section">
            <h3>기대 효과</h3>
            <ul class="effects-list">
                ${detail.effects.map(effect => `<li>${effect}</li>`).join('')}
            </ul>
        </div>
        <div class="feedback-section">
            <p>이 추천이 도움이 되었나요?</p>
            <div class="feedback-buttons">
                <button class="btn-feedback" onclick="submitFeedbackHandler('recommendation', ${detail.id}, 'positive')">👍 예</button>
                <button class="btn-feedback" onclick="submitFeedbackHandler('recommendation', ${detail.id}, 'negative')">👎 아니오</button>
                <button class="btn-feedback" onclick="submitFeedbackHandler('recommendation', ${detail.id}, 'comment')">💬 의견</button>
            </div>
        </div>
    `;
    
    document.getElementById('detail-content').innerHTML = content;
    document.getElementById('recommendation-detail-modal').classList.add('active');
}

// 추천 상세 모달 닫기
function closeRecommendationDetail() {
    document.getElementById('recommendation-detail-modal').classList.remove('active');
}

// 습관 목록 로드
async function loadHabits() {
    try {
        const habits = await getHabits();
        displayHabits(habits, 'habits-list-page');
        updateHabitsProgress(habits);
        
        // 주간 통계 로드
        const stats = await getWeeklyStats();
        displayWeeklyStats(stats);
    } catch (error) {
        console.error('습관 목록 로드 오류:', error);
    }
}

// 주간 통계 표시
function displayWeeklyStats(stats) {
    const container = document.getElementById('weekly-stats');
    // 실제 구현 시 차트 라이브러리 사용
    container.innerHTML = `
        <div class="chart-placeholder">
            <p>📊 차트 영역</p>
            <p class="chart-note">주간 통계 데이터 표시</p>
            <p style="margin-top: 16px; font-size: 14px;">
                이번 주 평균 실천률: ${stats?.average_completion || 0}%
            </p>
        </div>
    `;
}

// 습관 입력 모달 표시
function showHabitInput() {
    document.getElementById('habit-input-modal').classList.add('active');
}

// 습관 입력 모달 닫기
function closeHabitInput() {
    document.getElementById('habit-input-modal').classList.remove('active');
    document.getElementById('habit-form').reset();
}

// 습관 제출
async function submitHabit(event) {
    event.preventDefault();
    
    const habitData = {
        type: document.getElementById('habit-type').value,
        title: document.getElementById('habit-title').value,
        description: document.getElementById('habit-description').value,
        target: parseInt(document.getElementById('habit-target').value),
        unit: document.getElementById('habit-unit').value
    };
    
    try {
        await addHabit(habitData);
        alert('습관이 등록되었습니다!');
        closeHabitInput();
        
        // 습관 목록 다시 로드
        await loadHabits();
        await loadDashboard();
    } catch (error) {
        console.error('습관 등록 오류:', error);
        alert('습관 등록에 실패했습니다.');
    }
}

// 피드백 제출
async function submitFeedbackHandler(type, targetId, feedback) {
    try {
        await submitFeedback(type, targetId, feedback);
        alert('피드백이 전송되었습니다. 감사합니다!');
    } catch (error) {
        console.error('피드백 제출 오류:', error);
    }
}

// 오류 메시지 표시
function showError(message) {
    alert(message);
}

// 목업 데이터 표시 (API 오류 시)
function displayMockData() {
    displayHealthScore({
        score: 75,
        status: '주의 필요',
        confidence: 85,
        reasons: ['운동 부족: -15점', '식단 불균형: -10점', '수면 부족: -5점']
    });
    
    displayIndicators({
        bmi: '24.5',
        exercise: '30분',
        diet: '균형',
        sleep: '6시간'
    });
    
    const mockHabits = [
        { id: 1, title: '30분 걷기', description: '하루 30분 이상 걷기', completed: true },
        { id: 2, title: '물 2L 마시기', description: '하루 물 2L 이상 마시기', completed: false },
        { id: 3, title: '채소 3끼 먹기', description: '아침, 점심, 저녁에 채소 포함', completed: false }
    ];
    
    displayHabits(mockHabits, 'habits-list');
    updateProgress(mockHabits);
}
