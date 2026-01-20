@echo off
chcp 65001 >nul
echo ========================================
echo Node.js 12.14.0 제거 스크립트
echo ========================================
echo.

REM 관리자 권한 확인
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [경고] 관리자 권한이 필요할 수 있습니다.
    echo 스크립트를 마우스 우클릭 후 "관리자 권한으로 실행"을 선택하세요.
    echo.
)

REM Node.js 설치 경로
set NODE_PATH=C:\node-v12.14.0-win-x64

echo [1/3] Node.js 설치 경로 확인...
if exist "%NODE_PATH%" (
    echo 발견된 경로: %NODE_PATH%
) else (
    echo [경고] %NODE_PATH% 경로를 찾을 수 없습니다.
    echo 다른 경로에 설치되어 있을 수 있습니다.
    pause
    exit /b 1
)
echo.

echo [2/3] PATH 환경 변수에서 Node.js 경로 제거...
echo 현재 사용자 PATH에서 Node.js 경로를 제거합니다...

REM PowerShell을 사용하여 PATH에서 Node.js 경로 제거
powershell -Command "$env:Path = ($env:Path -split ';' | Where-Object { $_ -notlike '*node*' }) -join ';'; [Environment]::SetEnvironmentVariable('Path', $env:Path, 'User')"

if %errorlevel% equ 0 (
    echo PATH 환경 변수에서 Node.js 경로가 제거되었습니다.
) else (
    echo [경고] PATH 환경 변수 수정에 실패했습니다.
    echo 수동으로 제거해야 할 수 있습니다.
)
echo.

echo [3/3] Node.js 폴더 삭제...
echo 경고: %NODE_PATH% 폴더를 삭제합니다.
echo.
set /p CONFIRM="정말 삭제하시겠습니까? (Y/N): "
if /i "%CONFIRM%"=="Y" (
    if exist "%NODE_PATH%" (
        rmdir /s /q "%NODE_PATH%"
        if %errorlevel% equ 0 (
            echo Node.js 폴더가 삭제되었습니다.
        ) else (
            echo [오류] 폴더 삭제에 실패했습니다.
            echo 관리자 권한으로 실행하거나 수동으로 삭제하세요.
        )
    ) else (
        echo 폴더가 이미 삭제되었거나 존재하지 않습니다.
    )
) else (
    echo 삭제가 취소되었습니다.
)
echo.

echo ========================================
echo 제거 완료
echo ========================================
echo.
echo 참고사항:
echo 1. 새 명령 프롬프트를 열어야 PATH 변경사항이 적용됩니다.
echo 2. 기존 명령 프롬프트에서는 "node --version"이 여전히 작동할 수 있습니다.
echo 3. 완전히 제거하려면 컴퓨터를 재시작하거나 새 명령 프롬프트를 여세요.
echo.

pause
