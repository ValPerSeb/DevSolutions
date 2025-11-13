@echo off
title DevSolutions - Startup Script
echo ===============================================
echo   INICIANDO ENTORNO DE DESARROLLO DEVSOLUTIONS
echo ===============================================
echo.

:: 1 - Backend
echo [1/3] Iniciando Backend en puerto 4500...
start cmd /k "cd backend && npm run dev"

timeout /t 3 >nul

:: 2 - Frontend
echo [2/3] Iniciando Frontend en puerto 5173...
start cmd /k "cd frontend && npm run dev"

timeout /t 3 >nul

:: 3 - Ngrok (solo backend)
echo [3/3] Iniciando Ngrok en puerto 4500...
start cmd /k "ngrok http 4500"

echo.
echo ===============================================
echo   Todo está arriba: Backend, Frontend y Ngrok 
echo ===============================================
echo.
pause