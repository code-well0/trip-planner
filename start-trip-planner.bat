@echo off
echo Starting Trip Planner...
echo.

REM Change to the project directory
cd /d "c:\Users\bikra\code\Github\trip-planner"

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

REM Start the React development server in background
echo Starting React development server...
start /b npm start

REM Wait a few seconds for the server to start
echo Waiting for server to start...
timeout /t 10 /nobreak > nul

REM Open the browser
echo Opening browser at http://localhost:3000
start http://localhost:3000

REM Keep the command window open to show server logs
echo.
echo Trip Planner is now running!
echo.
echo The application should open in your browser at: http://localhost:3000
echo.
echo To stop the server, close this window or press Ctrl+C
echo.

REM Wait for the npm start process to finish (it won't until manually stopped)
npm start

pause
