@echo off
setlocal

:: Maven Wrapper Script for Windows

set MAVEN_HOME=%~dp0\.mvn\wrapper
set MAVEN_OPTS=-Xmx1024m -XX:MaxPermSize=256m

if not exist "%MAVEN_HOME%\mvnw.cmd" (
    echo "Maven wrapper not found. Please run mvnw to download it."
    exit /b 1
)

call "%MAVEN_HOME%\mvnw" %*