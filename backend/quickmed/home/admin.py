from django.contrib import admin
from .models import Review, User, Vendor, Delivery, Doctor

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'rating', 'status', 'created_at')
    list_filter = ('status', 'rating', 'created_at')
    search_fields = ('name', 'email', 'comment')
    readonly_fields = ('created_at', 'updated_at')
    list_editable = ('status',)
    
    fieldsets = (
        ('Review Information', {
            'fields': ('name', 'email', 'rating', 'comment')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'user_type', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('full_name', 'email', 'phone')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('User Information', {
            'fields': ('full_name', 'email', 'phone', 'password', 'user_type', 'is_active')
        }),
        ('Additional Details', {
            'fields': ('date_of_birth', 'address', 'city', 'pincode'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'business_name', 'email', 'phone', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('full_name', 'business_name', 'email', 'phone')
    readonly_fields = ('created_at', 'updated_at')

@admin.register(Delivery)
class DeliveryAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'is_available', 'is_active', 'created_at')
    list_filter = ('is_available', 'is_active', 'created_at')
    search_fields = ('full_name', 'email', 'phone', 'vehicle_number')
    readonly_fields = ('created_at', 'updated_at')

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'specialization', 'email', 'phone', 'is_active', 'created_at')
    list_filter = ('specialization', 'is_active', 'created_at')
    search_fields = ('full_name', 'email', 'phone', 'specialization', 'license_number')
    readonly_fields = ('created_at', 'updated_at')
