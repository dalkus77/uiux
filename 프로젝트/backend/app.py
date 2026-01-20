from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from datetime import datetime, timedelta
import json
import os

app = Flask(__name__, static_folder='../app', static_url_path='')
CORS(app)  # CORS 허용

# 데이터 저장 파일 경로
DATA_DIR = 'data'
HABITS_FILE = os.path.join(DATA_DIR, 'habits.json')
FEEDBACK_FILE = os.path.join(DATA_DIR, 'feedback.json')

# 데이터 디렉토리 생성
os.makedirs(DATA_DIR, exist_ok=True)

# 초기 데이터 로드
def load_json_file(filepath, default=[]):
    if os.path.exists(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return default
    return default

def save_json_file(filepath, data):
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# 초기 습관 데이터
def init_default_habits():
    default_habits = [
        {
            "id": 1,
            "type": "exercise",
            "title": "30분 걷기",
            "description": "하루 30분 이상 걷기",
            "target": 30,
            "unit": "분",
            "completed": True,
            "created_at": datetime.now().isoformat()
        },
        {
            "id": 2,
            "type": "water",
            "title": "물 2L 마시기",
            "description": "하루 물 2L 이상 마시기",
            "target": 2,
            "unit": "L",
            "completed": False,
            "created_at": datetime.now().isoformat()
        },
        {
            "id": 3,
            "type": "diet",
            "title": "채소 3끼 먹기",
            "description": "아침, 점심, 저녁에 채소 포함",
            "target": 3,
            "unit": "회",
            "completed": False,
            "created_at": datetime.now().isoformat()
        }
    ]
    return default_habits

# API 라우트

@app.route('/api/health/analysis', methods=['GET'])
def get_health_analysis():
    """건강 상태 분석"""
    return jsonify({
        "score": 75,
        "status": "주의 필요",
        "confidence": 85,
        "reasons": [
            "운동 부족: -15점",
            "식단 불균형: -10점",
            "수면 부족: -5점"
        ]
    })

@app.route('/api/health/indicators', methods=['GET'])
def get_health_indicators():
    """건강 지표 조회"""
    return jsonify({
        "bmi": "24.5",
        "exercise": "30분",
        "diet": "균형",
        "sleep": "6시간"
    })

@app.route('/api/habits', methods=['GET'])
def get_habits():
    """습관 목록 조회"""
    habits = load_json_file(HABITS_FILE, init_default_habits())
    return jsonify(habits)

@app.route('/api/habits', methods=['POST'])
def add_habit():
    """습관 추가"""
    habits = load_json_file(HABITS_FILE, init_default_habits())
    
    # 새 습관 ID 생성
    new_id = max([h.get('id', 0) for h in habits], default=0) + 1
    
    new_habit = {
        "id": new_id,
        "type": request.json.get('type'),
        "title": request.json.get('title'),
        "description": request.json.get('description', ''),
        "target": request.json.get('target'),
        "unit": request.json.get('unit'),
        "completed": False,
        "created_at": datetime.now().isoformat()
    }
    
    habits.append(new_habit)
    save_json_file(HABITS_FILE, habits)
    
    return jsonify(new_habit), 201

@app.route('/api/habits/<int:habit_id>/toggle', methods=['POST'])
def toggle_habit(habit_id):
    """습관 완료 토글"""
    habits = load_json_file(HABITS_FILE, init_default_habits())
    
    for habit in habits:
        if habit['id'] == habit_id:
            habit['completed'] = request.json.get('completed', False)
            habit['updated_at'] = datetime.now().isoformat()
            save_json_file(HABITS_FILE, habits)
            return jsonify(habit)
    
    return jsonify({"error": "습관을 찾을 수 없습니다"}), 404

@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    """추천 목록 조회"""
    recommendations = [
        {
            "id": 1,
            "title": "아침 운동 습관 만들기",
            "description": "간단한 아침 운동으로 하루를 활기차게 시작하세요. 10분만 투자해도 건강에 큰 도움이 됩니다.",
            "feasibility": 4,
            "reason": "현재 운동 시간이 부족하여 건강 점수에 영향을 주고 있습니다. 아침 시간을 활용하면 업무 스케줄에 맞춰 운동을 지속할 수 있습니다.",
            "steps": [
                "아침에 일어나자마자 5분 스트레칭",
                "간단한 유산소 운동 10분 (걷기, 조깅)",
                "물 한 잔 마시기",
                "일주일간 지속 후 습관화"
            ],
            "effects": [
                "건강 점수 10점 향상 예상",
                "에너지 레벨 증가",
                "스트레스 감소"
            ]
        },
        {
            "id": 2,
            "title": "수면 시간 개선하기",
            "description": "규칙적인 수면으로 건강을 개선하세요. 충분한 수면은 모든 건강 지표에 긍정적인 영향을 줍니다.",
            "feasibility": 3,
            "reason": "현재 평균 수면 시간이 6시간으로 부족합니다. 수면 부족은 건강 점수에 -5점의 영향을 주고 있습니다.",
            "steps": [
                "매일 같은 시간에 잠자리에 들기",
                "잠들기 1시간 전 스마트폰 사용 중단",
                "침실 환경 조성 (어둡고 조용하게)",
                "수면 시간 7-8시간 목표"
            ],
            "effects": [
                "건강 점수 5점 향상 예상",
                "집중력 향상",
                "면역력 강화"
            ]
        },
        {
            "id": 3,
            "title": "물 섭취량 늘리기",
            "description": "하루 물 2L 마시기로 건강을 개선하세요. 충분한 수분 섭취는 신진대사를 촉진합니다.",
            "feasibility": 5,
            "reason": "수분 섭취가 부족하여 신진대사가 느려지고 있습니다. 간단한 습관으로 큰 효과를 볼 수 있습니다.",
            "steps": [
                "아침에 일어나자마자 물 한 잔",
                "식사 전후 물 마시기",
                "물병을 항상 가까이 두기",
                "앱 알림으로 리마인더 설정"
            ],
            "effects": [
                "건강 점수 3점 향상 예상",
                "피부 건강 개선",
                "소화 기능 향상"
            ]
        },
        {
            "id": 4,
            "title": "채소 섭취 늘리기",
            "description": "하루 3끼 식사에 채소를 포함시켜 영양 균형을 맞추세요.",
            "feasibility": 4,
            "reason": "식단 불균형으로 건강 점수에 -10점의 영향을 주고 있습니다. 채소 섭취를 늘리면 개선할 수 있습니다.",
            "steps": [
                "아침에 샐러드 추가",
                "점심에 반찬으로 채소 2가지",
                "저녁에 채소 중심 메뉴 선택",
                "주간 채소 구매 계획 세우기"
            ],
            "effects": [
                "건강 점수 8점 향상 예상",
                "비타민 섭취 증가",
                "체중 관리에 도움"
            ]
        }
    ]
    
    return jsonify(recommendations)

@app.route('/api/recommendations/<int:recommendation_id>', methods=['GET'])
def get_recommendation_detail(recommendation_id):
    """추천 상세 조회"""
    recommendations = [
        {
            "id": 1,
            "title": "아침 운동 습관 만들기",
            "reason": "현재 운동 시간이 부족하여 건강 점수에 영향을 주고 있습니다. 아침 시간을 활용하면 업무 스케줄에 맞춰 운동을 지속할 수 있습니다.",
            "steps": [
                "아침에 일어나자마자 5분 스트레칭",
                "간단한 유산소 운동 10분 (걷기, 조깅)",
                "물 한 잔 마시기",
                "일주일간 지속 후 습관화"
            ],
            "effects": [
                "건강 점수 10점 향상 예상",
                "에너지 레벨 증가",
                "스트레스 감소"
            ]
        },
        {
            "id": 2,
            "title": "수면 시간 개선하기",
            "reason": "현재 평균 수면 시간이 6시간으로 부족합니다. 수면 부족은 건강 점수에 -5점의 영향을 주고 있습니다.",
            "steps": [
                "매일 같은 시간에 잠자리에 들기",
                "잠들기 1시간 전 스마트폰 사용 중단",
                "침실 환경 조성 (어둡고 조용하게)",
                "수면 시간 7-8시간 목표"
            ],
            "effects": [
                "건강 점수 5점 향상 예상",
                "집중력 향상",
                "면역력 강화"
            ]
        },
        {
            "id": 3,
            "title": "물 섭취량 늘리기",
            "reason": "수분 섭취가 부족하여 신진대사가 느려지고 있습니다. 간단한 습관으로 큰 효과를 볼 수 있습니다.",
            "steps": [
                "아침에 일어나자마자 물 한 잔",
                "식사 전후 물 마시기",
                "물병을 항상 가까이 두기",
                "앱 알림으로 리마인더 설정"
            ],
            "effects": [
                "건강 점수 3점 향상 예상",
                "피부 건강 개선",
                "소화 기능 향상"
            ]
        },
        {
            "id": 4,
            "title": "채소 섭취 늘리기",
            "reason": "식단 불균형으로 건강 점수에 -10점의 영향을 주고 있습니다. 채소 섭취를 늘리면 개선할 수 있습니다.",
            "steps": [
                "아침에 샐러드 추가",
                "점심에 반찬으로 채소 2가지",
                "저녁에 채소 중심 메뉴 선택",
                "주간 채소 구매 계획 세우기"
            ],
            "effects": [
                "건강 점수 8점 향상 예상",
                "비타민 섭취 증가",
                "체중 관리에 도움"
            ]
        }
    ]
    
    recommendation = next((r for r in recommendations if r['id'] == recommendation_id), None)
    if recommendation:
        return jsonify(recommendation)
    return jsonify({"error": "추천을 찾을 수 없습니다"}), 404

@app.route('/api/stats/weekly', methods=['GET'])
def get_weekly_stats():
    """주간 통계 조회"""
    habits = load_json_file(HABITS_FILE, init_default_habits())
    completed_count = sum(1 for h in habits if h.get('completed', False))
    total_count = len(habits)
    average_completion = round((completed_count / total_count * 100) if total_count > 0 else 0)
    
    return jsonify({
        "average_completion": average_completion,
        "total_habits": total_count,
        "completed_habits": completed_count
    })

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    """피드백 제출"""
    feedbacks = load_json_file(FEEDBACK_FILE, [])
    
    new_feedback = {
        "id": len(feedbacks) + 1,
        "type": request.json.get('type'),
        "target_id": request.json.get('target_id'),
        "feedback": request.json.get('feedback'),
        "created_at": datetime.now().isoformat()
    }
    
    feedbacks.append(new_feedback)
    save_json_file(FEEDBACK_FILE, feedbacks)
    
    return jsonify({"message": "피드백이 저장되었습니다"}), 201

@app.route('/api/health', methods=['GET'])
def health_check():
    """헬스 체크"""
    return jsonify({"status": "ok"})

@app.route('/api/documents', methods=['GET'])
def get_documents_list():
    """문서 목록 조회"""
    import glob
    doc_files = []
    doc_dir = '../'
    
    # 프로젝트 루트의 md 파일 찾기
    md_files = [
        '00_마스터지침.md',
        '01_업무분석_요구사항정의.md',
        '02_페르소나.md',
        '03_사용자여정지도.md',
        '04_페인포인트분석.md',
        '05_멘탈모형설계.md',
        '06_IA설계.md',
        '07_기능설계.md',
        '08_UIUX설계.md',
        '09_프로토타입.md'
    ]
    
    for filename in md_files:
        filepath = os.path.join(doc_dir, filename)
        if os.path.exists(filepath):
            doc_files.append({
                "name": filename,
                "size": os.path.getsize(filepath)
            })
    
    return jsonify({"documents": doc_files})

@app.route('/api/documents/<filename>', methods=['GET'])
def get_document(filename):
    """문서 내용 조회"""
    import urllib.parse
    
    # 파일명 디코딩
    filename = urllib.parse.unquote(filename)
    
    # 보안: 상위 디렉토리 접근 방지
    if '..' in filename or '/' in filename or '\\' in filename:
        return jsonify({"error": "잘못된 파일 경로"}), 400
    
    # 프로젝트 루트의 md 파일만 허용
    allowed_files = [
        '00_마스터지침.md',
        '01_업무분석_요구사항정의.md',
        '02_페르소나.md',
        '03_사용자여정지도.md',
        '04_페인포인트분석.md',
        '05_멘탈모형설계.md',
        '06_IA설계.md',
        '07_기능설계.md',
        '08_UIUX설계.md',
        '09_프로토타입.md'
    ]
    
    if filename not in allowed_files:
        return jsonify({"error": "접근할 수 없는 파일"}), 403
    
    # backend 폴더에서 상위로 이동하여 프로젝트 루트 접근
    filepath = os.path.join(os.path.dirname(os.path.dirname(__file__)), filename)
    
    if not os.path.exists(filepath):
        return jsonify({"error": "파일을 찾을 수 없습니다"}), 404
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        return jsonify({
            "filename": filename,
            "content": content
        })
    except Exception as e:
        return jsonify({"error": f"파일 읽기 오류: {str(e)}"}), 500

@app.route('/')
def index():
    """프론트엔드 메인 페이지"""
    return send_from_directory('../app', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    """정적 파일 제공"""
    return send_from_directory('../app', path)

# 초기 데이터 파일 생성 (앱 시작 시 한 번만 실행)
habits = load_json_file(HABITS_FILE, init_default_habits())
save_json_file(HABITS_FILE, habits)

if __name__ == '__main__':
    # 로컬 개발용
    print("=" * 50)
    print("AI기반 건강습관 개선정보 제공 솔루션")
    print("서버 시작")
    print("=" * 50)
    print(f"프론트엔드: http://localhost:5000")
    print(f"API 엔드포인트: http://localhost:5000/api/health")
    print("=" * 50)
    print("브라우저에서 http://localhost:5000 을 열어주세요!")
    print("=" * 50)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
