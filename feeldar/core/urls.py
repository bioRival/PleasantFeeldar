from django.urls import path
from . import views

urlpatterns = [
    path('', views.register, name='register'),
    path('select_video/', views.select_video, name='select_video'),
    path('select_emotion/<int:video_id>/', views.select_emotion, name='select_emotion'),
    path('video_list/', views.video_list, name='video_list'),
    path('video_details/<int:video_id>/', views.video_details, name='video_details'),
]
