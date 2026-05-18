@echo off
title Organnah V3 - Sync GitHub
cd /d "%~dp0"

echo.
echo  ====================================
echo   ORGANNAH V3 - SYNC GITHUB
echo  ====================================
echo.

:: Procurar Git
set "GIT=git"
git --version >nul 2>&1
if errorlevel 1 set "GIT=C:\Program Files\Git\bin\git.exe"
"%GIT%" --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Git nao encontrado.
    echo Instale em: https://git-scm.com/download/win
    goto FIM
)

:: Verificar se e repositorio git
if not exist ".git" (
    echo Repositorio Git nao encontrado. Inicializando...
    "%GIT%" init
    "%GIT%" remote add origin https://github.com/severoads3/organnah-v3.git
    "%GIT%" branch -M main
    echo Repositorio inicializado com sucesso!
    echo.
)

:: Checar se ha mudancas
set "CHANGES="
for /f "usebackq delims=" %%L in (`"%GIT%" status --porcelain`) do set "CHANGES=1"

if not defined CHANGES (
    echo Nenhuma mudanca. Projeto ja esta atualizado!
    goto FIM
)

:: Mostrar mudancas
echo Arquivos modificados:
echo.
"%GIT%" status --short
echo.

:: Timestamp simples
set "DT=%DATE:~6,4%-%DATE:~3,2%-%DATE:~0,2% %TIME:~0,5%"
set "MSG=auto-deploy %DT%"

echo Commit: %MSG%
echo.

:: Git add + commit + push
"%GIT%" add .
"%GIT%" commit -m "%MSG%"
if errorlevel 1 (
    echo.
    echo ERRO ao criar commit.
    goto FIM
)

"%GIT%" push origin main
if errorlevel 1 (
    echo.
    echo ERRO no push. Verifique a internet ou autenticacao.
    goto FIM
)

echo.
echo  ====================================
echo   SUCESSO! Site enviado ao GitHub.
echo   Vercel atualiza em aprox. 1 minuto.
echo  ====================================
echo.

:FIM
echo Pressione qualquer tecla para fechar...
pause >nul
