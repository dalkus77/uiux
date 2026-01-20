# Render 배포 가이드

## Render Blueprint를 사용한 배포

이 프로젝트는 Render의 Blueprint 기능을 사용하여 배포할 수 있습니다.

## 배포 방법

### 방법 1: Blueprint로 배포 (권장)

1. **GitHub에 프로젝트 푸시**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Render 대시보드에서 Blueprint 배포**
   - [Render Dashboard](https://dashboard.render.com) 접속
   - "New +" → "Blueprint" 선택
   - GitHub 저장소 연결
   - `render.yaml` 파일이 자동으로 감지됨
   - "Apply" 클릭하여 배포 시작

3. **배포 완료**
   - 배포가 완료되면 자동으로 URL이 생성됩니다
   - 예: `https://health-habit-solution.onrender.com`

### 방법 2: 수동 배포

1. **Render 대시보드에서 새 웹 서비스 생성**
   - "New +" → "Web Service" 선택
   - GitHub 저장소 연결

2. **설정 입력**
   - **Name**: `health-habit-solution`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && gunicorn app:app --bind 0.0.0.0:$PORT`
   - **Health Check Path**: `/api/health`

3. **환경 변수 설정** (선택사항)
   - `PYTHON_VERSION`: `3.12.0`

4. **배포 시작**
   - "Create Web Service" 클릭

## 프로젝트 구조

```
프로젝트/
├── render.yaml          # Render Blueprint 설정
├── .renderignore       # 배포 시 제외할 파일
├── backend/
│   ├── app.py          # Flask 애플리케이션
│   ├── requirements.txt # Python 패키지
│   └── data/           # 데이터 저장 (자동 생성)
└── app/                # 프론트엔드 (정적 파일)
    ├── index.html
    ├── css/
    └── js/
```

## 중요 사항

### 포트 설정
- Render는 `$PORT` 환경 변수를 제공합니다
- Gunicorn이 자동으로 이 포트를 사용합니다
- 로컬 개발 시에는 5000 포트를 사용합니다

### 데이터 저장
- 현재는 JSON 파일로 데이터를 저장합니다
- Render의 무료 플랜에서는 파일 시스템이 영구적이지 않을 수 있습니다
- 프로덕션 환경에서는 데이터베이스(PostgreSQL 등) 사용을 권장합니다

### 정적 파일
- Flask가 `app/` 폴더의 정적 파일을 서빙합니다
- `app.py`에서 `static_folder='../app'`로 설정되어 있습니다

## 환경 변수

현재 필요한 환경 변수는 없지만, 향후 추가할 수 있는 변수들:

- `FLASK_ENV`: `production` (프로덕션 환경)
- `DATABASE_URL`: 데이터베이스 연결 문자열 (PostgreSQL 사용 시)

## 무료 플랜 제한사항

- 서비스가 15분간 비활성화되면 자동으로 슬립 모드로 전환됩니다
- 첫 요청 시 약 30초 정도의 콜드 스타트 시간이 발생할 수 있습니다
- 디스크 공간: 512MB 제한

## 문제 해결

### 배포 실패 시
1. Build Log 확인
2. `requirements.txt`의 패키지 버전 확인
3. Python 버전 확인 (3.12.0 권장)

### 서비스가 시작되지 않을 때
1. Logs 탭에서 오류 메시지 확인
2. Health Check Path가 올바른지 확인 (`/api/health`)
3. 포트 설정 확인 (Gunicorn이 `$PORT`를 사용하는지)

### 정적 파일이 로드되지 않을 때
1. `app.py`의 `static_folder` 경로 확인
2. 파일 경로가 올바른지 확인

## 업데이트 배포

코드를 수정한 후:
```bash
git add .
git commit -m "Update"
git push
```

Render가 자동으로 변경사항을 감지하고 재배포합니다.

## 추가 리소스

- [Render 문서](https://render.com/docs)
- [Render Blueprint](https://render.com/docs/blueprint-spec)
- [Gunicorn 문서](https://gunicorn.org/)
