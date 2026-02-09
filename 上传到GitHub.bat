@echo off
chcp 65001 >nul
echo ============================================
echo   SmartTuneAI - GitHub 上传脚本
echo ============================================
echo.

cd /d "%~dp0"

echo [1/4] 配置 Git 用户信息...
git config --global user.email "lunafranklin@example.com"
git config --global user.name "lunafranklin"
echo   完成！
echo.

echo [2/4] 添加所有文件到 Git...
git add .
echo   完成！
echo.

echo [3/4] 提交代码（请在打开的窗口中输入提交信息）...
echo.
echo 请在新打开的窗口中输入以下提交信息：
echo.
echo   Initial commit: SmartTuneAI v0.1
echo.
echo   - User auth system (register/login)
echo   - Brand design (Logo + Icons)
echo   - Optimization tool page
echo   - Rule store
echo   - Responsive layout (PC/Mobile)
echo   - UI/UX optimization
echo.
pause

git commit
echo.
echo   完成！
echo.

echo [4/4] 推送到 GitHub...
echo.
echo 请在下面输入你的 GitHub 仓库地址（回车使用默认值）：
echo   https://github.com/lunafranklin/Prompt-Optimizer.git
set /p repo_url="或者输入新地址: "
if "%repo_url%"=="" set repo_url=https://github.com/lunafranklin/Prompt-Optimizer.git

git remote add origin %repo_url%
git branch -M main
git push -u origin main

echo.
echo ============================================
echo   上传完成！
echo ============================================
echo.
echo 下一步：部署到 Vercel
echo 1. 访问 https://vercel.com
echo 2. 用 GitHub 账号登录
echo 3. 点击 "Add New..." -> "Project"
echo 4. 选择仓库 lunafranklin/Prompt-Optimizer
echo 5. 配置：
echo    - Framework Preset: Vite
echo    - Build Command: npm run build
echo    - Output Directory: dist
echo 6. 点击 "Deploy"
echo.
pause
