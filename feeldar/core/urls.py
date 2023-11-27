from django.conf import settings
from django.template.context_processors import static
from django.urls import path
from . import views

urlpatterns = [
    path('', views.select_video, name='select_video'),
    path('select_emotion/<int:video_id>/', views.select_emotion, name='select_emotion'),
    path('video_list/', views.video_list, name='video_list'),
    path('video_details/<int:video_id>/', views.video_details, name='video_details'),
    path('chat-bot', views.chatbot, name='chat-bot'),
    path('update_bot/', views.update_bot, name='update_bot'),
    path('save_emotion/', views.save_emotion, name='save_emotion'),
]