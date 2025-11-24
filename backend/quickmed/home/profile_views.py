from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Vendor, Delivery, Doctor
from .auth_serializers import (
    UserResponseSerializer, VendorResponseSerializer, 
    DeliveryResponseSerializer, DoctorResponseSerializer
)
from .profile_serializers import (
    UserUpdateSerializer, VendorUpdateSerializer,
    DeliveryUpdateSerializer, DoctorUpdateSerializer
)

@api_view(['GET'])
def get_doctors(request):
    """Get all registered doctors for consultation booking"""
    try:
        # Get all active doctors
        doctors = Doctor.objects.filter(is_active=True, user_type='doctor').order_by('-created_at')
        
        # Serialize doctors
        serializer = DoctorResponseSerializer(doctors, many=True)
        
        # Format response for frontend
        doctors_list = []
        for doctor_data in serializer.data:
            formatted_doctor = {
                'id': doctor_data.get('id'),
                'name': f"Dr. {doctor_data.get('full_name', '')}",
                'specialty': doctor_data.get('specialization', 'General Physician'),
                'rating': 4.5,  # Default rating, can be calculated from reviews later
                'experience': f"{doctor_data.get('experience_years', 0)} years",
                'languages': ['English', 'Hindi'],  # Default, can be added to model later
                'consultationFee': float(doctor_data.get('consultation_fee', 0)),
                'image': '👨‍⚕️',  # Default emoji
                'bio': doctor_data.get('bio', ''),
                'qualifications': doctor_data.get('qualification', ''),
                'email': doctor_data.get('email', ''),
                'phone': doctor_data.get('phone', ''),
            }
            doctors_list.append(formatted_doctor)
        
        return Response({
            'doctors': doctors_list,
            'count': len(doctors_list)
        }, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def get_profile(request):
    """Get current user's profile based on user_id and user_type"""
    user_id = request.GET.get('user_id')
    user_type = request.GET.get('user_type', 'user')
    
    if not user_id:
        return Response(
            {'error': 'user_id is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = None
        response_serializer = None
        
        if user_type == 'user':
            try:
                user = User.objects.get(id=user_id, user_type='user')
                response_serializer = UserResponseSerializer(user)
            except User.DoesNotExist:
                return Response(
                    {'error': 'User not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        elif user_type == 'vendor':
            try:
                user = Vendor.objects.get(id=user_id, user_type='vendor')
                response_serializer = VendorResponseSerializer(user)
            except Vendor.DoesNotExist:
                return Response(
                    {'error': 'Vendor not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        elif user_type == 'delivery':
            try:
                user = Delivery.objects.get(id=user_id, user_type='delivery')
                response_serializer = DeliveryResponseSerializer(user)
            except Delivery.DoesNotExist:
                return Response(
                    {'error': 'Delivery agent not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        elif user_type == 'doctor':
            try:
                user = Doctor.objects.get(id=user_id, user_type='doctor')
                response_serializer = DoctorResponseSerializer(user)
            except Doctor.DoesNotExist:
                return Response(
                    {'error': 'Doctor not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        else:
            return Response(
                {'error': 'Invalid user type'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Format response for frontend
        user_data = response_serializer.data
        formatted_data = {
            'id': user_data.get('id'),
            'fullName': user_data.get('full_name'),
            'email': user_data.get('email'),
            'phone': user_data.get('phone'),
            'userType': user_data.get('user_type'),
            'address': user_data.get('address', ''),
            'city': user_data.get('city', ''),
            'pincode': user_data.get('pincode', ''),
            'dateOfBirth': user_data.get('date_of_birth', ''),
        }
        # Add all other fields from user_data
        formatted_data.update(user_data)
        
        return Response({
            'user': formatted_data
        }, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['PUT', 'PATCH'])
def update_profile(request):
    """Update current user's profile"""
    user_id = request.data.get('user_id') or request.data.get('id')
    user_type = request.data.get('user_type', 'user')
    
    if not user_id:
        return Response(
            {'error': 'user_id is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = None
        update_serializer = None
        response_serializer = None
        
        if user_type == 'user':
            try:
                user = User.objects.get(id=user_id, user_type='user')
                update_serializer = UserUpdateSerializer(user, data=request.data, partial=True)
                response_serializer_class = UserResponseSerializer
            except User.DoesNotExist:
                return Response(
                    {'error': 'User not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        elif user_type == 'vendor':
            try:
                user = Vendor.objects.get(id=user_id, user_type='vendor')
                update_serializer = VendorUpdateSerializer(user, data=request.data, partial=True)
                response_serializer_class = VendorResponseSerializer
            except Vendor.DoesNotExist:
                return Response(
                    {'error': 'Vendor not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        elif user_type == 'delivery':
            try:
                user = Delivery.objects.get(id=user_id, user_type='delivery')
                update_serializer = DeliveryUpdateSerializer(user, data=request.data, partial=True)
                response_serializer_class = DeliveryResponseSerializer
            except Delivery.DoesNotExist:
                return Response(
                    {'error': 'Delivery agent not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        elif user_type == 'doctor':
            try:
                user = Doctor.objects.get(id=user_id, user_type='doctor')
                update_serializer = DoctorUpdateSerializer(user, data=request.data, partial=True)
                response_serializer_class = DoctorResponseSerializer
            except Doctor.DoesNotExist:
                return Response(
                    {'error': 'Doctor not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        else:
            return Response(
                {'error': 'Invalid user type'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if update_serializer.is_valid():
            updated_user = update_serializer.save()
            updated_user.refresh_from_db()
            response_serializer = response_serializer_class(updated_user)
            
            # Format response for frontend
            user_data = response_serializer.data
            formatted_data = {
                'id': user_data.get('id'),
                'fullName': user_data.get('full_name'),
                'email': user_data.get('email'),
                'phone': user_data.get('phone'),
                'userType': user_data.get('user_type'),
                'address': user_data.get('address', ''),
                'city': user_data.get('city', ''),
                'pincode': user_data.get('pincode', ''),
                'dateOfBirth': user_data.get('date_of_birth', ''),
            }
            # Add all other fields from user_data
            formatted_data.update(user_data)
            
            return Response({
                'message': 'Profile updated successfully',
                'user': formatted_data
            }, status=status.HTTP_200_OK)
        else:
            return Response(update_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

