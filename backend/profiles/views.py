from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from .models import UserProfile, ResumeData
from .serializers import UserProfileSerializer, ResumeDataSerializer
from .resume_parser import parse_resume
from .gemini_analyzer import get_interview_recommendations
from .question_generator import generate_interview_questions
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
        
        # Debug: Print parsed name
        print(f"Parsed name: {parsed_data.get('full_name')}")
        print(f"Parsed email: {parsed_data.get('email')}")
        print(f"Skills count: {len(parsed_data.get('skills', []))}")
        
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


@api_view(['GET'])
@permission_classes([AllowAny])
def get_recommendations(request):
    """Get AI-powered interview recommendations based on resume data"""
    try:
        uid = request.GET.get('uid') or request.headers.get('X-User-UID')
        
        if not uid:
            return Response({
                'error': 'UID is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = UserProfile.objects.get(uid=uid)
            resume_data = ResumeData.objects.get(user=user)
            
            # Convert resume data to dict for analysis
            resume_dict = {
                'full_name': resume_data.full_name,
                'email': resume_data.email,
                'skills': resume_data.skills,
                'experience': resume_data.experience,
                'education': resume_data.education,
                'projects': resume_data.projects,
                'certifications': resume_data.certifications,
                'years_of_experience': resume_data.years_of_experience,
                'key_strengths': resume_data.key_strengths,
            }
            
            # Get AI recommendations
            recommendations = get_interview_recommendations(resume_dict)
            
            return Response({
                'recommendations': recommendations,
                'resume_summary': {
                    'name': resume_data.full_name,
                    'years_experience': resume_data.years_of_experience,
                    'skills_count': len(resume_data.skills),
                    'projects_count': len(resume_data.projects),
                    'key_strengths': resume_data.key_strengths
                }
            }, status=status.HTTP_200_OK)
            
        except UserProfile.DoesNotExist:
            return Response({
                'error': 'User profile not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except ResumeData.DoesNotExist:
            return Response({
                'error': 'Resume not found. Please upload your resume first.'
            }, status=status.HTTP_404_NOT_FOUND)
            
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def generate_questions(request):
    """Generate interview questions based on configuration and resume"""
    try:
        data = request.data
        uid = data.get('uid')
        goal = data.get('goal')  # full, focused, quick
        target_level = data.get('level')  # entry, mid, etc.
        domain = data.get('domain')  # dsa, web, ml, core
        
        if not all([uid, goal, target_level, domain]):
            return Response({
                'error': 'Missing required parameters (uid, goal, level, domain)'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Get user's resume data for personalization
        resume_dict = None
        try:
            user = UserProfile.objects.get(uid=uid)
            resume_data = ResumeData.objects.get(user=user)
            
            resume_dict = {
                'full_name': resume_data.full_name,
                'years_of_experience': resume_data.years_of_experience,
                'skills': resume_data.skills,
                'key_strengths': resume_data.key_strengths,
                'projects': resume_data.projects,
            }
        except (UserProfile.DoesNotExist, ResumeData.DoesNotExist):
            print("No resume data found, generating generic questions")
        
        # Generate questions using AI
        questions = generate_interview_questions(goal, target_level, domain, resume_dict)
        
        return Response({
            'questions': questions,
            'total': len(questions),
            'config': {
                'goal': goal,
                'level': target_level,
                'domain': domain
            }
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error generating questions: {e}")
        import traceback
        traceback.print_exc()
        return Response({
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)