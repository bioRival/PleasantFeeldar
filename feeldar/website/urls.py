# urls.py
from django.urls import path
from .views import quiz, anonymous_box, list_boxes

urlpatterns = [
    path('quiz/', quiz, name='quiz'),
    path('quiz/<int:question_id>/', quiz, name='next_question'),
    path('', anonymous_box, name='anonymous_box'),
    path('list_boxes/', list_boxes, name='list_boxes'),
]
