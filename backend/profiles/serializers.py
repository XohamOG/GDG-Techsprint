from rest_framework import serializers
from .models import UserProfile, ResumeData


class ResumeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumeData
        fields = '__all__'
        read_only_fields = ('user', 'uploaded_at', 'updated_at')


class UserProfileSerializer(serializers.ModelSerializer):
    resume = ResumeDataSerializer(read_only=True, required=False)
    
    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
