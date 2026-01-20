# AI기반 건강습관 개선정보 제공 솔루션 - 프로토타입

## 프로젝트 개요

이 프로토타입은 AI기반 건강습관 개선정보 제공 솔루션의 MVP 버전입니다.
React와 Vite를 사용하여 구현되었습니다.

## 필수 요구사항

- **Node.js 18.0.0 이상** (필수)
- **npm 9.0.0 이상** (권장)

### Node.js 버전 확인

```bash
node --version
```

버전이 18 미만인 경우, Node.js를 업그레이드해야 합니다.

## 설치 및 실행

### 방법 1: 배치 파일 사용 (권장)

```bash
cd 프로젝트\prototype
start.bat
```

### 방법 2: 수동 실행

```bash
cd 프로젝트\prototype
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## Node.js 버전이 낮은 경우

### 옵션 1: Node.js 업그레이드 (권장)

1. [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 다운로드
2. 설치 후 재시도

### 옵션 2: 간단한 HTML 버전 사용

프로젝트 루트에 `prototype-simple` 폴더에 HTML/CSS/JS 버전이 있습니다.
브라우저에서 직접 열어서 사용할 수 있습니다.

## 주요 기능

- 건강 상태 대시보드 (AI 분석 결과 표시)
- 맞춤형 건강 정보 추천 (AI 기반)
- 추천 근거 설명 (XAI)
- 건강 습관 실천 및 추적
- 습관 기록 입력

## 프로토타입 구조

```
prototype/
├── src/
│   ├── components/     # 재사용 가능한 컴포넌트
│   ├── pages/         # 화면 컴포넌트
│   ├── data/          # 목업 데이터
│   └── styles/         # 스타일시트
├── index.html
├── package.json
├── vite.config.js
└── start.bat          # 실행 스크립트
```

## 화면 구성

1. **건강 대시보드** (`/`)
   - 건강 점수 및 상태 표시
   - 주요 건강 지표
   - 오늘 할 일 목록
   - 맞춤형 추천 미리보기

2. **건강 정보 알아보기** (`/recommendations`)
   - AI 기반 맞춤형 추천 목록
   - 추천 근거 확인 가능

3. **건강 습관 실천하기** (`/habits`)
   - 일일 목표 및 진행률
   - 습관 실천 현황
   - 이번 주 통계

4. **추천 상세** (`/recommendation/:id`)
   - 추천 이유 상세 설명
   - 실행 방법 가이드
   - 기대 효과

5. **습관 기록** (`/habit-input`)
   - 새로운 습관 입력 폼

## 기술 스택

- **React 18**: UI 라이브러리
- **React Router**: 라우팅
- **Vite**: 빌드 도구
- **CSS3**: 스타일링

## 주요 특징

- 반응형 디자인 (모바일/태블릿/PC 지원)
- AI 기능 시뮬레이션 (목업 데이터 사용)
- 설명가능한 AI (XAI) UI 구현
- 사용자 피드백 수집 UI
- 직관적인 네비게이션

## 문제 해결

### 오류: "Cannot use import statement outside a module"

**원인**: Node.js 버전이 18 미만입니다.

**해결**:
1. Node.js를 18 이상으로 업그레이드
2. 또는 간단한 HTML 버전 사용

### 오류: "vite: command not found"

**해결**: `npm install`을 실행하여 패키지를 설치하세요.

## 향후 개선 사항

- 실제 AI API 연동
- 차트 라이브러리 통합 (Chart.js 등)
- 사용자 인증 및 데이터 저장
- 웨어러블 기기 연동
- 푸시 알림 기능
