#!/bin/bash

echo "============================================================"
echo "QuickMed Backend Server Startup"
echo "============================================================"
echo ""

cd "$(dirname "$0")"

echo "Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python3 is not installed"
    exit 1
fi

python3 --version

echo ""
echo "Installing/Checking dependencies..."
pip3 install -r requirements.txt

echo ""
echo "Creating database migrations..."
python3 manage.py makemigrations

echo ""
echo "Applying migrations..."
python3 manage.py migrate

echo ""
echo "Creating admin user (if not exists)..."
python3 << EOF
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quickmed.settings')
django.setup()
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@quickmed.com', 'admin123')
    print("Admin user created!")
else:
    print("Admin user already exists")
EOF

echo ""
echo "============================================================"
echo "Starting Django Server..."
echo "============================================================"
echo ""
echo "Backend Server: http://localhost:8000"
echo "Admin Portal: http://localhost:8000/admin/"
echo "Reviews Portal: http://localhost:8000/portal/"
echo "API Endpoint: http://localhost:8000/api/reviews/"
echo ""
echo "Default Admin Credentials:"
echo "Username: admin"
echo "Password: admin123"
echo ""
echo "Press Ctrl+C to stop the server"
echo "============================================================"
echo ""

python3 manage.py runserver

