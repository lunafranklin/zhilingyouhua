@echo off
chcp 65001 >nul
echo ============================================
echo   SmartTuneAI 智能指令优化 - 快速启动
echo ============================================
echo.

cd %~dp0

echo [1/2] 正在启动后端服务...
cd backend
start "后端服务" cmd /k "npm start"
echo   后端服务启动中...
cd ..

echo.
echo [2/2] 正在启动前端服务...
cd frontend
start "前端服务" cmd /k "npm run dev"
echo   前端服务启动中...
cd ..

echo.
echo ============================================
echo   ✅ 服务启动中，请稍候...
echo.
echo   前端地址: http://localhost:5173
echo   后端地址: http://localhost:3001
echo.
echo   建议打开浏览器访问 http://localhost:5173
echo ============================================
echo.
pause