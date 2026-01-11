from django.urls import path
from . import views

urlpatterns = [
    path('profile/create/', views.create_profile, name='create_profile'),
    path('profile/', views.get_profile, name='get_profile'),
    path('resume/upload/', views.upload_resume, name='upload_resume'),
    path('resume/', views.get_resume, name='get_resume'),
]
