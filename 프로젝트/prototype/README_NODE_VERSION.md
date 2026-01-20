# Node.js 버전 문제 해결 가이드

## 문제 상황

현재 시스템의 Node.js 버전이 12.14.0입니다.
Vite는 Node.js 18.0.0 이상이 필요합니다.

## 해결 방법

### 방법 1: Node.js 업그레이드 (권장)

1. **Node.js 다운로드**
   - [Node.js 공식 사이트](https://nodejs.org/) 방문
   - LTS 버전 (18.x 또는 20.x) 다운로드
   - Windows Installer (.msi) 선택

2. **설치**
   - 다운로드한 파일 실행
   - 기본 설정으로 설치 진행
   - 설치 완료 후 명령 프롬프트 재시작

3. **버전 확인**
   ```bash
   node --version
   ```
   - 18.0.0 이상이면 성공

4. **프로토타입 실행**
   ```bash
   cd 프로젝트\prototype
   npm install
   npm run dev
   ```

### 방법 2: 간단한 HTML 버전 사용

Node.js 업그레이드가 어려운 경우, 간단한 HTML 버전을 사용할 수 있습니다.

**사용 방법:**
1. `프로젝트\prototype-simple\index.html` 파일을 브라우저에서 직접 열기
2. 또는 웹 서버를 통해 실행

**장점:**
- Node.js 설치 불필요
- 브라우저만 있으면 실행 가능
- 빠른 프로토타입 확인

**단점:**
- React 기능 제한
- 라우팅 기능 없음
- 빌드 도구 없음

### 방법 3: nvm 사용 (고급)

여러 Node.js 버전을 관리하고 싶은 경우:

1. **nvm-windows 설치**
   - https://github.com/coreybutler/nvm-windows/releases
   - nvm-setup.exe 다운로드 및 설치

2. **Node.js 18 설치**
   ```bash
   nvm install 18
   nvm use 18
   ```

3. **버전 확인**
   ```bash
   node --version
   ```

## 현재 시스템 정보

- Node.js: v12.14.0
- npm: 6.13.4
- 필요 버전: Node.js 18.0.0 이상

## 추가 도움말

문제가 계속되면:
1. Node.js 완전 제거 후 재설치
2. npm 캐시 클리어: `npm cache clean --force`
3. node_modules 삭제 후 재설치: `rm -rf node_modules && npm install`
