#!/usr/bin/env python
"""
QuickMed Backend Server Startup Script
This script sets up and runs the Django backend server
"""
import os
import sys
import subprocess
from pathlib import Path

def check_dependencies():
    """Check if required packages are installed"""
    try:
        import django
        import rest_framework
        import corsheaders
        print("✅ All required packages are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing package: {e}")
        print("Installing dependencies...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        return True

def setup_database():
    """Set up database migrations"""
    print("\n📦 Setting up database...")
    try:
        # Make migrations
        subprocess.check_call([sys.executable, "manage.py", "makemigrations"])
        print("✅ Migrations created")
        
        # Run migrations
        subprocess.check_call([sys.executable, "manage.py", "migrate"])
        print("✅ Database migrations applied")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error setting up database: {e}")
        return False

def create_superuser_if_needed():
    """Check if superuser exists, if not, create one"""
    print("\n👤 Checking for admin user...")
    try:
        from django.contrib.auth import get_user_model
        User = get_user_model()
        if not User.objects.filter(is_superuser=True).exists():
            print("No admin user found. Creating default admin user...")
            print("Username: admin")
            print("Password: admin123")
            print("Email: admin@quickmed.com")
            User.objects.create_superuser('admin', 'admin@quickmed.com', 'admin123')
            print("✅ Admin user created successfully!")
        else:
            print("✅ Admin user already exists")
    except Exception as e:
        print(f"⚠️  Could not create admin user: {e}")
        print("You can create one manually with: python manage.py createsuperuser")

def run_server():
    """Run the Django development server"""
    print("\n🚀 Starting Django development server...")
    print("=" * 60)
    print("Backend Server: http://localhost:8000")
    print("Admin Portal: http://localhost:8000/admin/")
    print("API Endpoint: http://localhost:8000/api/reviews/")
    print("=" * 60)
    print("\nPress Ctrl+C to stop the server\n")
    
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quickmed.settings')
    subprocess.call([sys.executable, "manage.py", "runserver"])

if __name__ == "__main__":
    # Change to the script's directory
    os.chdir(Path(__file__).parent)
    
    print("=" * 60)
    print("QuickMed Backend Setup & Server")
    print("=" * 60)
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Setup database
    if not setup_database():
        print("⚠️  Continuing anyway...")
    
    # Create superuser
    create_superuser_if_needed()
    
    # Run server
    run_server()

