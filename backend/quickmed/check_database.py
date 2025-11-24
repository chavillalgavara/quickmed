#!/usr/bin/env python
"""
Script to check database connection and verify all user data is being saved correctly
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quickmed.settings')
django.setup()

from home.models import User, Vendor, Delivery, Doctor
from django.db import connection

def check_database_connection():
    """Check if database connection is working"""
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT version();")
            version = cursor.fetchone()
            print("=" * 60)
            print("DATABASE CONNECTION STATUS")
            print("=" * 60)
            print(f"✅ Database connected successfully!")
            print(f"Database: {connection.settings_dict['NAME']}")
            print(f"Engine: {connection.settings_dict['ENGINE']}")
            print(f"Version: {version[0] if version else 'Unknown'}")
            print("=" * 60)
            return True
    except Exception as e:
        print("=" * 60)
        print("❌ DATABASE CONNECTION FAILED")
        print("=" * 60)
        print(f"Error: {e}")
        print("\nPlease check:")
        print("1. PostgreSQL is running")
        print("2. Database 'quickmed_db' exists")
        print("3. Credentials in settings.py are correct")
        print("=" * 60)
        return False

def check_tables():
    """Check if all tables exist"""
    print("\n" + "=" * 60)
    print("CHECKING DATABASE TABLES")
    print("=" * 60)
    
    tables = ['home_user', 'home_vendor', 'home_delivery', 'home_doctor', 'home_review']
    
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        """)
        existing_tables = [row[0] for row in cursor.fetchall()]
        
        for table in tables:
            if table in existing_tables:
                print(f"✅ {table} - EXISTS")
            else:
                print(f"❌ {table} - MISSING")
    
    print("=" * 60)

def show_user_data():
    """Show all user data in database"""
    print("\n" + "=" * 60)
    print("USER DATA IN DATABASE")
    print("=" * 60)
    
    # Users
    users = User.objects.all()
    print(f"\n👤 USERS: {users.count()} records")
    for user in users:
        print(f"  - ID: {user.id}, Name: {user.full_name}, Email: {user.email}, Phone: {user.phone}")
        print(f"    Address: {user.address or 'N/A'}, City: {user.city or 'N/A'}, Pincode: {user.pincode or 'N/A'}")
        print(f"    Created: {user.created_at}")
    
    # Vendors
    vendors = Vendor.objects.all()
    print(f"\n🏪 VENDORS: {vendors.count()} records")
    for vendor in vendors:
        print(f"  - ID: {vendor.id}, Name: {vendor.full_name}, Email: {vendor.email}, Phone: {vendor.phone}")
        print(f"    Business: {vendor.business_name}")
        print(f"    Address: {vendor.address}, City: {vendor.city}, Pincode: {vendor.pincode}")
        print(f"    License: {vendor.license_number or 'N/A'}, GST: {vendor.gst_number or 'N/A'}")
        print(f"    Created: {vendor.created_at}")
    
    # Delivery
    deliveries = Delivery.objects.all()
    print(f"\n🚚 DELIVERY AGENTS: {deliveries.count()} records")
    for delivery in deliveries:
        print(f"  - ID: {delivery.id}, Name: {delivery.full_name}, Email: {delivery.email}, Phone: {delivery.phone}")
        print(f"    Address: {delivery.address}, City: {delivery.city}, Pincode: {delivery.pincode}")
        print(f"    Vehicle: {delivery.vehicle_number or 'N/A'}, License: {delivery.license_number or 'N/A'}")
        print(f"    Available: {delivery.is_available}")
        print(f"    Created: {delivery.created_at}")
    
    # Doctors
    doctors = Doctor.objects.all()
    print(f"\n👨‍⚕️ DOCTORS: {doctors.count()} records")
    for doctor in doctors:
        print(f"  - ID: {doctor.id}, Name: {doctor.full_name}, Email: {doctor.email}, Phone: {doctor.phone}")
        print(f"    Specialization: {doctor.specialization}, Qualification: {doctor.qualification}")
        print(f"    License: {doctor.license_number}, Experience: {doctor.experience_years} years")
        print(f"    Fee: ₹{doctor.consultation_fee}")
        print(f"    Created: {doctor.created_at}")
    
    print("=" * 60)

def verify_table_structure():
    """Verify table structure matches models"""
    print("\n" + "=" * 60)
    print("VERIFYING TABLE STRUCTURE")
    print("=" * 60)
    
    with connection.cursor() as cursor:
        # Check home_user table
        cursor.execute("""
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'home_user'
            ORDER BY ordinal_position;
        """)
        print("\n📋 home_user columns:")
        for row in cursor.fetchall():
            nullable = "NULL" if row[2] == 'YES' else "NOT NULL"
            print(f"  - {row[0]}: {row[1]} ({nullable})")
        
        # Check home_vendor table
        cursor.execute("""
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'home_vendor'
            ORDER BY ordinal_position;
        """)
        print("\n📋 home_vendor columns:")
        for row in cursor.fetchall():
            nullable = "NULL" if row[2] == 'YES' else "NOT NULL"
            print(f"  - {row[0]}: {row[1]} ({nullable})")
    
    print("=" * 60)

if __name__ == "__main__":
    print("\nQuickMed Database Verification Tool\n")
    
    if check_database_connection():
        check_tables()
        verify_table_structure()
        show_user_data()
        
        print("\n✅ Database check complete!")
        print("\nTo view data in PostgreSQL:")
        print("  psql -U postgres -d quickmed_db")
        print("  SELECT * FROM home_user;")
        print("  SELECT * FROM home_vendor;")
        print("  SELECT * FROM home_delivery;")
        print("  SELECT * FROM home_doctor;")
    else:
        print("\n❌ Please fix database connection issues first!")

