@echo off
cd /d "%~dp0"
echo ===================================================
echo   Starting Shipra Porwal Portfolio Local Server
echo ===================================================
echo Opening your browser at http://localhost:8080 ...
echo (Press Ctrl+C in this command window when you want to stop)
echo.

start http://localhost:8080

python -m http.server 8080

if %errorlevel% neq 0 (
    echo Python server exited, trying npx serve...
    npx --yes serve -p 8080 .
)
pause
