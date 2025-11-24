from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import IntegrityError
from .models import User, Vendor, Delivery, Doctor
from .auth_serializers import (
    UserSignupSerializer, VendorSignupSerializer, DeliverySignupSerializer, DoctorSignupSerializer,
    UserResponseSerializer, VendorResponseSerializer, DeliveryResponseSerializer, DoctorResponseSerializer
)

@api_view(['POST'])
def signup(request):
    """Handle signup for all user types"""
    user_type = request.data.get('user_type', 'user')
    
    try:
        if user_type == 'user':
            serializer = UserSignupSerializer(data=request.data)
            response_serializer_class = UserResponseSerializer
        elif user_type == 'vendor':
            serializer = VendorSignupSerializer(data=request.data)
            response_serializer_class = VendorResponseSerializer
        elif user_type == 'delivery':
            serializer = DeliverySignupSerializer(data=request.data)
            response_serializer_class = DeliveryResponseSerializer
        elif user_type == 'doctor':
            serializer = DoctorSignupSerializer(data=request.data)
            response_serializer_class = DoctorResponseSerializer
        else:
            return Response(
                {'error': 'Invalid user type. Must be: user, vendor, delivery, or doctor'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if serializer.is_valid():
            user = serializer.save()
            # Refresh from database to ensure all fields are loaded
            user.refresh_from_db()
            response_serializer = response_serializer_class(user)
            return Response({
                'message': f'Account created successfully as {user_type}',
                'user': response_serializer.data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except IntegrityError as e:
        if 'email' in str(e):
            return Response(
                {'error': 'Email already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )
        elif 'phone' in str(e):
            return Response(
                {'error': 'Phone number already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response(
            {'error': 'User already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def login(request):
    """Handle login for all user types"""
    email = request.data.get('email', '').lower()
    password = request.data.get('password', '')
    user_type = request.data.get('user_type', 'user')
    
    if not email or not password:
        return Response(
            {'error': 'Email and password are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = None
        response_serializer = None
        
        if user_type == 'user':
            try:
                user = User.objects.get(email__iexact=email, user_type='user', is_active=True)
                response_serializer_class = UserResponseSerializer
            except User.DoesNotExist:
                pass
        elif user_type == 'vendor':
            try:
                user = Vendor.objects.get(email__iexact=email, user_type='vendor', is_active=True)
                response_serializer_class = VendorResponseSerializer
            except Vendor.DoesNotExist:
                pass
        elif user_type == 'delivery':
            try:
                user = Delivery.objects.get(email__iexact=email, user_type='delivery', is_active=True)
                response_serializer_class = DeliveryResponseSerializer
            except Delivery.DoesNotExist:
                pass
        elif user_type == 'doctor':
            try:
                user = Doctor.objects.get(email__iexact=email, user_type='doctor', is_active=True)
                response_serializer_class = DoctorResponseSerializer
            except Doctor.DoesNotExist:
                pass
        else:
            return Response(
                {'error': 'Invalid user type'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if user and user.check_password(password):
            response_serializer = response_serializer_class(user)
            return Response({
                'message': 'Login successful',
                'user': response_serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response(
                {'error': 'Invalid email, password, or user type'},
                status=status.HTTP_401_UNAUTHORIZED
            )
    
    except Exception as e:
        return Response(
            {'error': 'Login failed. Please try again.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

