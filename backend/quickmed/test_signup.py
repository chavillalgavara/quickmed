#!/usr/bin/env python
"""
Test script to verify signup is saving all data correctly
Run this after fixing database connection
"""
import os
import django
import requests

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quickmed.settings')
django.setup()

from home.models import User, Vendor, Delivery, Doctor

def test_user_signup():
    """Test if user data is saved with all fields"""
    print("=" * 60)
    print("TESTING USER SIGNUP DATA")
    print("=" * 60)
    
    users = User.objects.all()
    if users.exists():
        user = users.first()
        print(f"\n✅ User found: {user.full_name}")
        print(f"   ID: {user.id}")
        print(f"   Email: {user.email}")
        print(f"   Phone: {user.phone}")
        print(f"   User Type: {user.user_type}")
        print(f"   Address: {user.address or 'Not set'}")
        print(f"   City: {user.city or 'Not set'}")
        print(f"   Pincode: {user.pincode or 'Not set'}")
        print(f"   Date of Birth: {user.date_of_birth or 'Not set'}")
        print(f"   Is Active: {user.is_active}")
        print(f"   Created: {user.created_at}")
        print(f"   Updated: {user.updated_at}")
    else:
        print("❌ No users found in database")
    
    print("\n" + "=" * 60)

def test_vendor_signup():
    """Test if vendor data is saved with all fields"""
    print("=" * 60)
    print("TESTING VENDOR SIGNUP DATA")
    print("=" * 60)
    
    vendors = Vendor.objects.all()
    if vendors.exists():
        vendor = vendors.first()
        print(f"\n✅ Vendor found: {vendor.full_name}")
        print(f"   ID: {vendor.id}")
        print(f"   Email: {vendor.email}")
        print(f"   Phone: {vendor.phone}")
        print(f"   User Type: {vendor.user_type}")
        print(f"   Business Name: {vendor.business_name}")
        print(f"   Address: {vendor.address}")
        print(f"   City: {vendor.city}")
        print(f"   Pincode: {vendor.pincode}")
        print(f"   License Number: {vendor.license_number or 'Not set'}")
        print(f"   GST Number: {vendor.gst_number or 'Not set'}")
        print(f"   Is Active: {vendor.is_active}")
        print(f"   Created: {vendor.created_at}")
        print(f"   Updated: {vendor.updated_at}")
    else:
        print("❌ No vendors found in database")
    
    print("\n" + "=" * 60)

def test_delivery_signup():
    """Test if delivery data is saved with all fields"""
    print("=" * 60)
    print("TESTING DELIVERY SIGNUP DATA")
    print("=" * 60)
    
    deliveries = Delivery.objects.all()
    if deliveries.exists():
        delivery = deliveries.first()
        print(f"\n✅ Delivery Agent found: {delivery.full_name}")
        print(f"   ID: {delivery.id}")
        print(f"   Email: {delivery.email}")
        print(f"   Phone: {delivery.phone}")
        print(f"   Address: {delivery.address}")
        print(f"   City: {delivery.city}")
        print(f"   Pincode: {delivery.pincode}")
        print(f"   Vehicle Number: {delivery.vehicle_number or 'Not set'}")
        print(f"   License Number: {delivery.license_number or 'Not set'}")
        print(f"   Is Available: {delivery.is_available}")
    else:
        print("❌ No delivery agents found in database")
    
    print("\n" + "=" * 60)

def test_doctor_signup():
    """Test if doctor data is saved with all fields"""
    print("=" * 60)
    print("TESTING DOCTOR SIGNUP DATA")
    print("=" * 60)
    
    doctors = Doctor.objects.all()
    if doctors.exists():
        doctor = doctors.first()
        print(f"\n✅ Doctor found: {doctor.full_name}")
        print(f"   ID: {doctor.id}")
        print(f"   Email: {doctor.email}")
        print(f"   Phone: {doctor.phone}")
        print(f"   Specialization: {doctor.specialization}")
        print(f"   Qualification: {doctor.qualification}")
        print(f"   License Number: {doctor.license_number}")
        print(f"   Experience: {doctor.experience_years} years")
        print(f"   Consultation Fee: ₹{doctor.consultation_fee}")
        print(f"   Bio: {doctor.bio or 'Not set'}")
    else:
        print("❌ No doctors found in database")
    
    print("\n" + "=" * 60)

def show_all_data():
    """Show summary of all data"""
    print("\n" + "=" * 60)
    print("DATABASE SUMMARY")
    print("=" * 60)
    print(f"Total Users: {User.objects.count()}")
    print(f"Total Vendors: {Vendor.objects.count()}")
    print(f"Total Delivery Agents: {Delivery.objects.count()}")
    print(f"Total Doctors: {Doctor.objects.count()}")
    print("=" * 60)

if __name__ == "__main__":
    try:
        test_user_signup()
        test_vendor_signup()
        test_delivery_signup()
        test_doctor_signup()
        show_all_data()
        print("\n✅ All tests completed!")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\nMake sure:")
        print("1. Database connection is working")
        print("2. Migrations are applied: python manage.py migrate")
        print("3. PostgreSQL is running")

