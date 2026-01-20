// API 설정
// 같은 서버에서 제공되므로 상대 경로 사용
const API_BASE_URL = '/api';

// API 호출 헬퍼 함수
async function apiCall(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API 호출 오류:', error);
        throw error;
    }
}

// 건강 상태 분석 API
async function getHealthAnalysis() {
    return await apiCall('/health/analysis');
}

// 건강 지표 조회 API
async function getHealthIndicators() {
    return await apiCall('/health/indicators');
}

// 습관 목록 조회 API
async function getHabits() {
    return await apiCall('/habits');
}

// 습관 완료 토글 API
async function toggleHabit(habitId, completed) {
    return await apiCall(`/habits/${habitId}/toggle`, {
        method: 'POST',
        body: JSON.stringify({ completed })
    });
}

// 습관 추가 API
async function addHabit(habitData) {
    return await apiCall('/habits', {
        method: 'POST',
        body: JSON.stringify(habitData)
    });
}

// 추천 목록 조회 API
async function getRecommendations() {
    return await apiCall('/recommendations');
}

// 추천 상세 조회 API
async function getRecommendationDetail(recommendationId) {
    return await apiCall(`/recommendations/${recommendationId}`);
}

// 주간 통계 조회 API
async function getWeeklyStats() {
    return await apiCall('/stats/weekly');
}

// 피드백 제출 API
async function submitFeedback(type, targetId, feedback) {
    return await apiCall('/feedback', {
        method: 'POST',
        body: JSON.stringify({ type, target_id: targetId, feedback })
    });
}
