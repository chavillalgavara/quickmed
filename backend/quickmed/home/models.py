from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password

# Create your models here.

class BaseUser(models.Model):
    """Base model for all user types"""
    USER_TYPE_CHOICES = [
        ('user', 'User'),
        ('vendor', 'Vendor'),
        ('delivery', 'Delivery'),
        ('doctor', 'Doctor'),
    ]
    
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=10, unique=True)
    password = models.CharField(max_length=255)  # Store hashed password
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
        ordering = ['-created_at']
    
    def set_password(self, raw_password):
        """Hash and set password"""
        self.password = make_password(raw_password)
    
    def check_password(self, raw_password):
        """Check if password matches"""
        return check_password(raw_password, self.password)
    
    def __str__(self):
        return f"{self.full_name} ({self.user_type})"

class User(BaseUser):
    """Regular User/Patient model"""
    date_of_birth = models.DateField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    pincode = models.CharField(max_length=10, null=True, blank=True)
    
    class Meta:
        db_table = 'home_user'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

class Vendor(BaseUser):
    """Vendor/Pharmacy model"""
    business_name = models.CharField(max_length=200)
    license_number = models.CharField(max_length=100, null=True, blank=True)
    address = models.TextField()
    city = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    gst_number = models.CharField(max_length=15, null=True, blank=True)
    
    class Meta:
        db_table = 'home_vendor'
        verbose_name = 'Vendor'
        verbose_name_plural = 'Vendors'

class Delivery(BaseUser):
    """Delivery Agent model"""
    vehicle_number = models.CharField(max_length=20, null=True, blank=True)
    license_number = models.CharField(max_length=50, null=True, blank=True)
    address = models.TextField()
    city = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    is_available = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'home_delivery'
        verbose_name = 'Delivery Agent'
        verbose_name_plural = 'Delivery Agents'

class Doctor(BaseUser):
    """Doctor model"""
    specialization = models.CharField(max_length=100)
    qualification = models.CharField(max_length=200)
    license_number = models.CharField(max_length=100)
    experience_years = models.IntegerField(default=0)
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    bio = models.TextField(null=True, blank=True)
    
    class Meta:
        db_table = 'home_doctor'
        verbose_name = 'Doctor'
        verbose_name_plural = 'Doctors'

class Review(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)], default=5)
    comment = models.TextField(max_length=500)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='approved')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'
    
    def __str__(self):
        return f"{self.name} - {self.rating} stars"
    
    @property
    def avatar(self):
        """Generate avatar initials from name"""
        initials = ''.join([word[0].upper() for word in self.name.split()[:2]])
        return initials
    
    @property
    def date(self):
        """Return date in YYYY-MM-DD format"""
        return self.created_at.date().isoformat()
