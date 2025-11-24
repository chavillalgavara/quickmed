#!/usr/bin/env python
"""
Create all tables in PostgreSQL database
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quickmed.settings')
django.setup()

from django.db import connection
from django.core.management import execute_from_command_line

def create_tables():
    """Create all tables using Django migrations"""
    print("Creating database tables...")
    
    # First, un-fake the migration
    print("\n1. Resetting migration state...")
    try:
        execute_from_command_line(['manage.py', 'migrate', 'home', '0001_initial', '--fake'])
    except:
        pass
    
    # Drop existing tables if they exist
    print("\n2. Dropping existing tables if any...")
    with connection.cursor() as cursor:
        tables = ['home_user', 'home_vendor', 'home_delivery', 'home_doctor']
        for table in tables:
            try:
                cursor.execute(f'DROP TABLE IF EXISTS {table} CASCADE;')
                print(f"   Dropped {table}")
            except Exception as e:
                print(f"   {table}: {e}")
    
    # Create tables fresh
    print("\n3. Creating tables...")
    execute_from_command_line(['manage.py', 'migrate', 'home', '--run-syncdb'])
    
    print("\n✅ Tables created successfully!")
    
    # Verify
    print("\n4. Verifying tables...")
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name LIKE 'home_%'
            ORDER BY table_name;
        """)
        tables = [row[0] for row in cursor.fetchall()]
        print(f"   Found {len(tables)} tables: {', '.join(tables)}")

if __name__ == "__main__":
    create_tables()

