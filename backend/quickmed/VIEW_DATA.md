# How to View Data in PostgreSQL Database

## 🔍 Quick Commands

### View All Users
```sql
SELECT * FROM home_user;
```

### View All Vendors (with all details)
```sql
SELECT 
    id, 
    full_name, 
    email, 
    phone, 
    business_name, 
    address, 
    city, 
    pincode, 
    license_number, 
    gst_number, 
    is_active,
    created_at 
FROM home_vendor 
ORDER BY created_at DESC;
```

### View All Delivery Agents
```sql
SELECT 
    id, 
    full_name, 
    email, 
    phone, 
    address, 
    city, 
    pincode, 
    vehicle_number, 
    license_number, 
    is_available,
    created_at 
FROM home_delivery 
ORDER BY created_at DESC;
```

### View All Doctors
```sql
SELECT 
    id, 
    full_name, 
    email, 
    phone, 
    specialization, 
    qualification, 
    license_number, 
    experience_years, 
    consultation_fee,
    created_at 
FROM home_doctor 
ORDER BY created_at DESC;
```

## 📊 Using Django Shell

```bash
cd backend/quickmed
python manage.py shell
```

Then in the shell:
```python
from home.models import User, Vendor, Delivery, Doctor

# View all users
users = User.objects.all()
for user in users:
    print(f"{user.full_name} - {user.email} - {user.phone}")

# View all vendors with details
vendors = Vendor.objects.all()
for vendor in vendors:
    print(f"Business: {vendor.business_name}")
    print(f"Address: {vendor.address}, {vendor.city} - {vendor.pincode}")
    print(f"GST: {vendor.gst_number or 'N/A'}")
    print("---")

# View specific vendor details
vendor = Vendor.objects.first()
if vendor:
    print(f"Name: {vendor.full_name}")
    print(f"Email: {vendor.email}")
    print(f"Phone: {vendor.phone}")
    print(f"Business: {vendor.business_name}")
    print(f"Address: {vendor.address}")
    print(f"City: {vendor.city}")
    print(f"Pincode: {vendor.pincode}")
    print(f"License: {vendor.license_number or 'N/A'}")
    print(f"GST: {vendor.gst_number or 'N/A'}")
```

## ✅ Verification Checklist

After signup, verify:
- [ ] User data appears in `home_user` table
- [ ] Vendor data appears in `home_vendor` table with ALL fields
- [ ] All required fields are filled (not NULL)
- [ ] Optional fields are saved if provided
- [ ] Timestamps (created_at, updated_at) are set

