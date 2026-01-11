from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from .models import UserProfile, ResumeData
from .serializers import UserProfileSerializer, ResumeDataSerializer
from .resume_parser import parse_resume
import json


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def create_profile(request):
    """Create a new user profile"""
    try:
        data = request.data
        
        # Check if user already exists
        if UserProfile.objects.filter(uid=data.get('uid')).exists():
            return Response({
                'message': 'Profile already exists',
                'profile': UserProfileSerializer(UserProfile.objects.get(uid=data.get('uid'))).data
            }, status=status.HTTP_200_OK)
        
        # Create new profile
        serializer = UserProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Profile created successfully',
                'profile': serializer.data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_profile(request):
    """Get user profile by Firebase UID"""
    try:
        # Get UID from query params or request headers
        uid = request.GET.get('uid') or request.headers.get('X-User-UID')
        
        if not uid:
            return Response({
                'error': 'UID is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            profile = UserProfile.objects.get(uid=uid)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({
                'error': 'Profile not found'
            }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def upload_resume(request):
    """Upload and parse resume - NO cloud storage needed, just extract and save data"""
    try:
        uid = request.data.get('uid') or request.headers.get('X-User-UID')
        
        if not uid:
            return Response({
                'error': 'UID is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user exists
        try:
            user = UserProfile.objects.get(uid=uid)
        except UserProfile.DoesNotExist:
            return Response({
                'error': 'User profile not found'
            }, status=status.HTTP_404_NOT_FOUND)
        
        # Get uploaded file
        if 'file' not in request.FILES:
            return Response({
                'error': 'No file uploaded'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        uploaded_file = request.FILES['file']
        
        # Parse resume and extract all important data
        # We don't store the file, just the extracted information!
        parsed_data = parse_resume(uploaded_file, uploaded_file.name)
        
        # Update or create resume data in SQLite
        resume_data, created = ResumeData.objects.update_or_create(
            user=user,
            defaults=parsed_data
        )
        
        serializer = ResumeDataSerializer(resume_data)
        
        return Response({
            'message': 'Resume analyzed and data saved successfully',
            'resume': serializer.data
        }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_resume(request):
    """Get resume data by user UID"""
    try:
        uid = request.GET.get('uid') or request.headers.get('X-User-UID')
        
        if not uid:
            return Response({
                'error': 'UID is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = UserProfile.objects.get(uid=uid)
            resume_data = ResumeData.objects.get(user=user)
            serializer = ResumeDataSerializer(resume_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({
                'error': 'User profile not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except ResumeData.DoesNotExist:
            return Response({
                'error': 'Resume not found'
            }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

