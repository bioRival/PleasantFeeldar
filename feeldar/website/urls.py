# urls.py
from django.urls import path
from .views import quiz

urlpatterns = [
    path('', quiz, name='quiz'),  # начало викторины и обработка ответов
    path('quiz/<int:question_id>/', quiz, name='next_question'),  # следующий вопрос
]
