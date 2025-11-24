#!/usr/bin/env python
"""
Simple script to verify database connection and tables
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quickmed.settings')
django.setup()

from django.db import connection
from home.models import User, Vendor, Delivery, Doctor

print("=" * 60)
print("Database Connection Verification")
print("=" * 60)

# Check connection
try:
    with connection.cursor() as cursor:
        cursor.execute("SELECT version();")
        version = cursor.fetchone()
        print(f"\n[OK] Connected to PostgreSQL")
        print(f"   Database: {connection.settings_dict['NAME']}")
        print(f"   User: {connection.settings_dict['USER']}")
        print(f"   Host: {connection.settings_dict['HOST']}")
        print(f"   Port: {connection.settings_dict['PORT']}")
except Exception as e:
    print(f"\n[ERROR] Connection failed: {e}")
    exit(1)

# Check tables
print("\n[INFO] Checking tables...")
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
    
    all_exist = True
    for table in expected:
        if table in tables:
            print(f"   [OK] {table}")
        else:
            print(f"   [MISSING] {table}")
            all_exist = False

# Check data counts
print("\n[INFO] Current data counts...")
try:
    print(f"   Users: {User.objects.count()}")
    print(f"   Vendors: {Vendor.objects.count()}")
    print(f"   Delivery Agents: {Delivery.objects.count()}")
    print(f"   Doctors: {Doctor.objects.count()}")
except Exception as e:
    print(f"   [ERROR] Could not query: {e}")

print("\n" + "=" * 60)
if all_exist:
    print("[SUCCESS] Database is ready! All tables exist.")
    print("\nYou can now:")
    print("1. Sign up users/vendors from frontend")
    print("2. All data will be saved to PostgreSQL database 'quickmed'")
    print("3. Check data using: python manage.py shell")
else:
    print("[WARNING] Some tables are missing!")
print("=" * 60)

