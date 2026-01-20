# AI기반 건강습관 개선정보 제공 솔루션

## 프로젝트 구조

```
프로젝트/
├── app/                    # 프론트엔드 (순수 HTML/CSS/JS)
│   ├── index.html         # 메인 HTML 파일
│   ├── css/
│   │   └── style.css      # 스타일시트
│   └── js/
│       ├── api.js         # API 호출 함수
│       └── app.js         # 메인 애플리케이션 로직
├── backend/                # 백엔드 (Python Flask)
│   ├── app.py             # Flask 애플리케이션
│   ├── requirements.txt   # Python 패키지 목록
│   └── data/              # 데이터 저장 디렉토리 (자동 생성)
│       ├── habits.json    # 습관 데이터
│       └── feedback.json  # 피드백 데이터
├── start.bat              # 서버 시작 배치 파일
└── README.md              # 프로젝트 문서
```

## 기술 스택

### 프론트엔드
- **HTML5**: 마크업
- **CSS3**: 스타일링
- **JavaScript (ES6+)**: 클라이언트 로직
- **Fetch API**: 서버 통신

### 백엔드
- **Python 3.12**: 프로그래밍 언어
- **Flask**: 웹 프레임워크
- **Flask-CORS**: CORS 처리
- **JSON**: 데이터 저장

## 시작하기

### ⚠️ 중요: 올바른 파일 사용

프로젝트에는 여러 배치 파일이 있지만, **프로젝트 루트의 `start.bat`만 사용**하세요.

- ✅ **`프로젝트/start.bat`** - Python 백엔드 서버 시작 (현재 사용)
- ❌ **`프로젝트/prototype/start.bat`** - 이전 React 프로토타입용 (사용 안 함, Node.js 필요)

### 방법 1: 배치 파일 사용 (권장)

1. **서버 시작**
   ```bash
   # 프로젝트 루트 폴더에서 실행
   start.bat
   ```
   
   이 파일은 Python만 사용하며 Node.js가 필요 없습니다.

2. **프론트엔드 열기**
   - `app/index.html` 파일을 브라우저에서 직접 열기
   - 또는 웹 서버를 통해 접근

### 방법 2: 수동 실행

1. **백엔드 서버 시작**
   ```bash
   cd backend
   C:\python312\python.exe -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   python app.py
   ```

2. **프론트엔드 열기**
   - `app/index.html` 파일을 브라우저에서 직접 열기

## API 엔드포인트

### 건강 관련
- `GET /api/health/analysis` - 건강 상태 분석
- `GET /api/health/indicators` - 건강 지표 조회
- `GET /api/health` - 헬스 체크

### 습관 관련
- `GET /api/habits` - 습관 목록 조회
- `POST /api/habits` - 습관 추가
- `POST /api/habits/<id>/toggle` - 습관 완료 토글

### 추천 관련
- `GET /api/recommendations` - 추천 목록 조회
- `GET /api/recommendations/<id>` - 추천 상세 조회

### 통계 관련
- `GET /api/stats/weekly` - 주간 통계 조회

### 피드백 관련
- `POST /api/feedback` - 피드백 제출

## 주요 기능

1. **건강 상태 대시보드**
   - AI 기반 건강 점수 분석
   - 주요 건강 지표 표시
   - 오늘 할 일 목록

2. **맞춤형 건강 정보 추천**
   - AI 기반 개인화 추천
   - 추천 근거 설명 (XAI)
   - 실행 가능성 평가

3. **건강 습관 실천 및 추적**
   - 습관 등록 및 관리
   - 실천 현황 추적
   - 주간 통계

4. **피드백 수집**
   - 추천 만족도 평가
   - 분석 결과 피드백

## 데이터 저장

- 습관 데이터: `backend/data/habits.json`
- 피드백 데이터: `backend/data/feedback.json`

데이터는 JSON 파일로 저장되며, 서버 재시작 시에도 유지됩니다.

## 문제 해결

### Python 경로 오류
- `start.bat` 파일에서 Python 경로를 수정하세요
- 기본값: `C:\python312\python.exe`

### 포트 충돌
- 백엔드 서버는 기본적으로 5000 포트를 사용합니다
- 다른 포트를 사용하려면 `backend/app.py`의 `app.run()` 부분을 수정하세요

### CORS 오류
- `backend/app.py`에서 `CORS(app)` 설정이 되어 있습니다
- 프론트엔드는 `http://localhost:5000`에서 실행되는 백엔드와 통신합니다

## 개발 환경

- Python: 3.12 이상
- 브라우저: Chrome, Firefox, Edge 등 최신 버전
- 운영체제: Windows 10 이상

## 폴더 구조 설명

### ✅ 현재 사용하는 폴더
- **`app/`** - 순수 HTML/CSS/JS 프론트엔드 (현재 사용)
- **`backend/`** - Python Flask 백엔드 (현재 사용)

### ❌ 더 이상 사용하지 않는 폴더
- **`prototype/`** - 이전 React 프로토타입 (Node.js 필요, 사용 안 함)
- **`prototype-simple/`** - 간단한 HTML 버전 (참고용)

**⚠️ 중요**: `prototype/start.bat`는 Node.js를 요구하지만, 이 파일은 사용하지 않습니다.
프로젝트 루트의 `start.bat`만 사용하세요 (Python만 필요).

## 배포

### Render 배포

이 프로젝트는 Render의 Blueprint를 사용하여 배포할 수 있습니다.

**빠른 배포:**
1. GitHub에 프로젝트 푸시
2. [Render Dashboard](https://dashboard.render.com)에서 "New +" → "Blueprint" 선택
3. 저장소 연결 후 `render.yaml` 파일이 자동으로 감지됨
4. "Apply" 클릭하여 배포

자세한 내용은 [RENDER_DEPLOY.md](RENDER_DEPLOY.md)를 참조하세요.

## 라이선스

이 프로젝트는 프로토타입 목적으로 제작되었습니다.
