@echo off
chcp 65001 >nul
echo ============================================
echo   SmartTuneAI - GitHub Upload Script
echo ============================================
echo.

cd /d "%~dp0"

echo [1/5] Configure Git user...
git config --global user.email "lunafranklin@example.com"
git config --global user.name "lunafranklin"
echo   Done!
echo.

echo [2/5] Add all files to Git...
git add .
echo   Done!
echo.

echo [3/5] Commit code...
git commit -m "Initial commit: SmartTuneAI v0.1

- User auth system (register/login)
- Brand design (Logo + Icons)
- Optimization tool page
- Rule store
- Responsive layout (PC/Mobile)
- UI/UX optimization (skeleton, lazy loading)
- Login redirect and page navigation"
echo   Done!
echo.

echo [4/5] Push to GitHub...
git remote add origin https://github.com/lunafranklin/Prompt-Optimizer.git
git branch -M main
git push -u origin main
echo   Done!
echo.

echo ============================================
echo   Upload Complete!
echo ============================================
echo.
echo Next: Deploy to Vercel
echo 1. Visit https://vercel.com
echo 2. Login with GitHub account
echo 3. Click "Add New..." -> "Project"
echo 4. Select repository: lunafranklin/Prompt-Optimizer
echo 5. Configure:
echo    - Framework Preset: Vite
echo    - Build Command: npm run build
echo    - Output Directory: dist
echo 6. Click "Deploy"
echo.
pause
