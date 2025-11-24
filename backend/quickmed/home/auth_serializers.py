from rest_framework import serializers
from .models import User, Vendor, Delivery, Doctor

class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['full_name', 'email', 'phone', 'password', 'confirm_password', 
                  'date_of_birth', 'address', 'city', 'pincode']
        extra_kwargs = {
            'date_of_birth': {'required': False},
            'address': {'required': False},
            'city': {'required': False},
            'pincode': {'required': False},
        }
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data, user_type='user')
        user.set_password(password)
        user.save()
        return user

class VendorSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Vendor
        fields = ['full_name', 'email', 'phone', 'password', 'confirm_password',
                  'business_name', 'license_number', 'address', 'city', 'pincode', 'gst_number']
        extra_kwargs = {
            'business_name': {'required': True},
            'address': {'required': True},
            'city': {'required': True},
            'pincode': {'required': True},
            'license_number': {'required': False},
            'gst_number': {'required': False},
        }
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        vendor = Vendor.objects.create(**validated_data, user_type='vendor')
        vendor.set_password(password)
        vendor.save()
        return vendor

class DeliverySignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Delivery
        fields = ['full_name', 'email', 'phone', 'password', 'confirm_password',
                  'vehicle_number', 'license_number', 'address', 'city', 'pincode']
        extra_kwargs = {
            'address': {'required': True},
            'city': {'required': True},
            'pincode': {'required': True},
            'vehicle_number': {'required': False},
            'license_number': {'required': False},
        }
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        delivery = Delivery.objects.create(**validated_data, user_type='delivery')
        delivery.set_password(password)
        delivery.save()
        return delivery

class DoctorSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Doctor
        fields = ['full_name', 'email', 'phone', 'password', 'confirm_password',
                  'specialization', 'qualification', 'license_number', 
                  'experience_years', 'consultation_fee', 'bio']
        extra_kwargs = {
            'specialization': {'required': True},
            'qualification': {'required': True},
            'license_number': {'required': True},
            'experience_years': {'required': False},
            'consultation_fee': {'required': False},
            'bio': {'required': False},
        }
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        doctor = Doctor.objects.create(**validated_data, user_type='doctor')
        doctor.set_password(password)
        doctor.save()
        return doctor

class UserResponseSerializer(serializers.ModelSerializer):
    """Serializer for user response (without password) - includes ALL fields"""
    class Meta:
        model = User
        fields = ['id', 'full_name', 'email', 'phone', 'user_type', 'is_active',
                  'date_of_birth', 'address', 'city', 'pincode', 
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_active']

class VendorResponseSerializer(serializers.ModelSerializer):
    """Serializer for vendor response (without password) - includes ALL fields"""
    class Meta:
        model = Vendor
        fields = ['id', 'full_name', 'email', 'phone', 'user_type', 'is_active',
                  'business_name', 'license_number', 'address', 'city', 'pincode', 
                  'gst_number', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_active']

class DeliveryResponseSerializer(serializers.ModelSerializer):
    """Serializer for delivery response (without password) - includes ALL fields"""
    class Meta:
        model = Delivery
        fields = ['id', 'full_name', 'email', 'phone', 'user_type', 'is_active',
                  'vehicle_number', 'license_number', 'address', 'city', 'pincode', 
                  'is_available', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_active']

class DoctorResponseSerializer(serializers.ModelSerializer):
    """Serializer for doctor response (without password) - includes ALL fields"""
    class Meta:
        model = Doctor
        fields = ['id', 'full_name', 'email', 'phone', 'user_type', 'is_active',
                  'specialization', 'qualification', 'license_number', 'experience_years', 
                  'consultation_fee', 'bio', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_active']

