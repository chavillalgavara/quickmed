from rest_framework import serializers
from .models import User, Vendor, Delivery, Doctor

class UserUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user profile"""
    class Meta:
        model = User
        fields = ['phone', 'date_of_birth', 'address', 'city', 'pincode']
        extra_kwargs = {
            'phone': {'required': True},
            'date_of_birth': {'required': False},
            'address': {'required': False},
            'city': {'required': False},
            'pincode': {'required': False},
        }

class VendorUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating vendor profile"""
    class Meta:
        model = Vendor
        fields = ['phone', 'business_name', 'license_number', 'address', 'city', 'pincode', 'gst_number']
        extra_kwargs = {
            'phone': {'required': True},
            'business_name': {'required': False},
            'license_number': {'required': False},
            'address': {'required': False},
            'city': {'required': False},
            'pincode': {'required': False},
            'gst_number': {'required': False},
        }

class DeliveryUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating delivery profile"""
    class Meta:
        model = Delivery
        fields = ['phone', 'vehicle_number', 'license_number', 'address', 'city', 'pincode', 'is_available']
        extra_kwargs = {
            'phone': {'required': True},
            'vehicle_number': {'required': False},
            'license_number': {'required': False},
            'address': {'required': False},
            'city': {'required': False},
            'pincode': {'required': False},
            'is_available': {'required': False},
        }

class DoctorUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating doctor profile"""
    class Meta:
        model = Doctor
        fields = ['phone', 'specialization', 'qualification', 'license_number', 
                  'experience_years', 'consultation_fee', 'bio']
        extra_kwargs = {
            'phone': {'required': True},
            'specialization': {'required': False},
            'qualification': {'required': False},
            'license_number': {'required': False},
            'experience_years': {'required': False},
            'consultation_fee': {'required': False},
            'bio': {'required': False},
        }

