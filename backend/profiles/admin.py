from django.contrib import admin
from .models import UserProfile, ResumeData


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('uid', 'name', 'email', 'created_at')
    search_fields = ('name', 'email', 'uid')
    list_filter = ('created_at',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(ResumeData)
class ResumeDataAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'file_name', 'uploaded_at')
    search_fields = ('full_name', 'email', 'user__email')
    list_filter = ('uploaded_at',)
    readonly_fields = ('uploaded_at', 'updated_at')
    
    fieldsets = (
        ('User Information', {
            'fields': ('user', 'full_name', 'email', 'phone', 'location')
        }),
        ('Professional Links', {
            'fields': ('linkedin', 'github', 'website')
        }),
        ('Resume Data', {
            'fields': ('summary', 'skills', 'experience', 'education', 'projects', 'certifications', 'languages')
        }),
        ('File Information', {
            'fields': ('file_name', 'file_url', 'uploaded_at', 'updated_at')
        }),
        ('Raw Data', {
            'fields': ('raw_text',),
            'classes': ('collapse',)
        }),
    )

