from django.db import models
from django.utils import timezone


class UserProfile(models.Model):
    """
    User profile model that stores information from Firebase authentication
    and additional profile data
    """
    uid = models.CharField(max_length=255, unique=True, primary_key=True)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'user_profiles'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.email})"


class ResumeData(models.Model):
    """
    Resume data model that stores parsed information from uploaded resumes
    """
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name='resume')
    
    # Personal Information
    full_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    
    # Professional Summary
    summary = models.TextField(blank=True, null=True)
    
    # Experience (stored as JSON)
    experience = models.JSONField(default=list, blank=True)
    
    # Education (stored as JSON)
    education = models.JSONField(default=list, blank=True)
    
    # Skills
    skills = models.JSONField(default=list, blank=True)
    
    # Projects (stored as JSON)
    projects = models.JSONField(default=list, blank=True)
    
    # Certifications (stored as JSON)
    certifications = models.JSONField(default=list, blank=True)
    
    # Languages
    languages = models.JSONField(default=list, blank=True)
    
    # Raw text from resume
    raw_text = models.TextField(blank=True, null=True)
    
    # File info
    file_name = models.CharField(max_length=255, blank=True, null=True)
    file_url = models.URLField(blank=True, null=True)
    uploaded_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'resume_data'
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"Resume of {self.user.name}"

