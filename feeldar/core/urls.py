from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('merch', views.merch, name='merch'),
    path('about-me', views.about_me, name='about_me'),
    path('select_video/', views.select_video, name='select_video'),
    path('select_emotion/<int:video_id>/', views.select_emotion, name='select_emotion'),
    path('video_list/', views.video_list, name='video_list'),
    path('video_details/<int:video_id>/', views.video_details, name='video_details'),
]
