#!/usr/bin/env python
"""
Setup database tables in PostgreSQL
"""
import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quickmed.settings')
django.setup()

from django.db import connection
from django.core.management import call_command

def setup_database():
    """Create all database tables"""
    print("=" * 60)
    print("Setting up PostgreSQL Database")
    print("=" * 60)
    
    # Check connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT version();")
            version = cursor.fetchone()
            print(f"\n[OK] Connected to PostgreSQL")
            print(f"   Database: {connection.settings_dict['NAME']}")
            print(f"   Version: {version[0][:50]}...")
    except Exception as e:
        print(f"\n[ERROR] Connection failed: {e}")
        return False
    
    # Check existing tables
    print("\n[INFO] Checking existing tables...")
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name LIKE 'home_%'
            ORDER BY table_name;
        """)
        existing_tables = [row[0] for row in cursor.fetchall()]
        print(f"   Found {len(existing_tables)} tables: {existing_tables if existing_tables else 'None'}")
    
    # Reset migration state for home app
    print("\n[INFO] Resetting migration state...")
    try:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM django_migrations WHERE app = 'home';")
            print("   [OK] Migration state reset")
    except Exception as e:
        print(f"   [WARNING] Could not reset: {e}")
    
    # Create tables
    print("\n[INFO] Creating tables...")
    try:
        call_command('migrate', 'home', verbosity=1)
        print("   [OK] Migrations applied")
    except Exception as e:
        print(f"   [ERROR] Error: {e}")
        return False
    
    # Verify tables
    print("\n[INFO] Verifying tables...")
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name IN ('home_user', 'home_vendor', 'home_delivery', 'home_doctor', 'home_review')
            ORDER BY table_name;
        """)
        tables = [row[0] for row in cursor.fetchall()]
        expected = ['home_user', 'home_vendor', 'home_delivery', 'home_doctor', 'home_review']
        
        for table in expected:
            if table in tables:
                print(f"   [OK] {table}")
            else:
                print(f"   [MISSING] {table}")
    
    print("\n" + "=" * 60)
    print("[SUCCESS] Database setup complete!")
    print("=" * 60)
    
    return True

if __name__ == "__main__":
    success = setup_database()
    sys.exit(0 if success else 1)

