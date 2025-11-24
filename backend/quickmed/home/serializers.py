from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    avatar = serializers.ReadOnlyField()
    date = serializers.ReadOnlyField()
    
    class Meta:
        model = Review
        fields = ['id', 'name', 'email', 'rating', 'comment', 'status', 'created_at', 'updated_at', 'avatar', 'date']
        read_only_fields = ['id', 'created_at', 'updated_at', 'status']

