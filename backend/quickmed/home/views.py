from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import render
from django.db.models import Q, Count, Avg
from .models import Review
from .serializers import ReviewSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    
    def get_queryset(self):
        """
        Optionally filter reviews by status.
        By default, only show approved reviews for public access.
        """
        queryset = Review.objects.all()
        status_filter = self.request.query_params.get('status', None)
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        else:
            # For public access, only show approved reviews
            # Admin can access all by passing status parameter
            queryset = queryset.filter(status='approved')
        
        return queryset.order_by('-created_at')
    
    def create(self, request, *args, **kwargs):
        """
        Create a new review.
        Reviews are automatically set to 'approved' status.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Set status to approved by default for new reviews
        review = serializer.save(status='approved')
        
        # Return the review with computed fields (avatar, date)
        response_serializer = self.get_serializer(review)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['patch'])
    def approve(self, request, pk=None):
        """Approve a review (admin action)"""
        review = self.get_object()
        review.status = 'approved'
        review.save()
        serializer = self.get_serializer(review)
        return Response(serializer.data)
    
    @action(detail=True, methods=['patch'])
    def reject(self, request, pk=None):
        """Reject a review (admin action)"""
        review = self.get_object()
        review.status = 'rejected'
        review.save()
        serializer = self.get_serializer(review)
        return Response(serializer.data)

def reviews_portal(request):
    """Backend portal view for managing reviews"""
    return render(request, 'admin/reviews_portal.html')
