@echo off
echo ============================================================
echo QuickMed Backend Server Startup
echo ============================================================
echo.

cd /d "%~dp0"

echo Checking Python installation...
python --version
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Installing/Checking dependencies...
pip install -r requirements.txt

echo.
echo Creating database migrations...
python manage.py makemigrations

echo.
echo Applying migrations...
python manage.py migrate

echo.
echo Creating admin user (if not exists)...
python -c "import os, django; os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quickmed.settings'); django.setup(); from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@quickmed.com', 'admin123')"

echo.
echo ============================================================
echo Starting Django Server...
echo ============================================================
echo.
echo Backend Server: http://localhost:8000
echo Admin Portal: http://localhost:8000/admin/
echo Reviews Portal: http://localhost:8000/portal/
echo API Endpoint: http://localhost:8000/api/reviews/
echo.
echo Default Admin Credentials:
echo Username: admin
echo Password: admin123
echo.
echo Press Ctrl+C to stop the server
echo ============================================================
echo.

python manage.py runserver

pause

