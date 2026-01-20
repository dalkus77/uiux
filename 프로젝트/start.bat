@echo off
chcp 65001 >nul
echo ========================================
echo AI기반 건강습관 개선정보 제공 솔루션
echo 서버 시작 스크립트
echo ========================================
echo.

REM Python 경로 설정 (C:\python312 사용)
set PYTHON_PATH=C:\python312\python.exe

REM Python 설치 확인
if not exist "%PYTHON_PATH%" (
    echo [경고] C:\python312\python.exe를 찾을 수 없습니다.
    echo Python 경로를 확인하거나 시스템 Python을 사용합니다.
    where python >nul 2>&1
    if %errorlevel% neq 0 (
        echo [오류] Python이 설치되어 있지 않습니다.
        echo Python 3.12를 설치해주세요.
        pause
        exit /b 1
    ) else (
        set PYTHON_PATH=python
        echo 시스템 Python을 사용합니다.
    )
)

echo [1/4] Python 버전 확인...
"%PYTHON_PATH%" --version
echo.

REM 백엔드 디렉토리로 이동
cd backend

REM 가상환경 생성
echo [2/4] 가상환경 생성...
if not exist ".venv" (
    echo 가상환경을 생성합니다...
    "%PYTHON_PATH%" -m venv .venv
    if %errorlevel% neq 0 (
        echo [오류] 가상환경 생성에 실패했습니다.
        pause
        exit /b 1
    )
    echo 가상환경 생성 완료
) else (
    echo 가상환경이 이미 존재합니다.
)
echo.

REM 가상환경 활성화
echo [3/4] 가상환경 활성화 및 패키지 설치...
call .venv\Scripts\activate.bat

REM 패키지 설치
if not exist ".venv\Lib\site-packages\flask" (
    echo 패키지를 설치합니다...
    pip install --upgrade pip
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo [오류] 패키지 설치에 실패했습니다.
        pause
        exit /b 1
    )
    echo 패키지 설치 완료
) else (
    echo 패키지가 이미 설치되어 있습니다.
)
echo.

REM 서버 시작
echo [4/4] 서버 시작...
echo.
echo ========================================
echo 서버 주소: http://localhost:5000
echo.
echo 브라우저에서 http://localhost:5000 을 열어주세요!
echo.
echo 서버를 중지하려면 Ctrl+C를 누르세요.
echo ========================================
echo.

REM Flask 서버 실행
python app.py

pause
