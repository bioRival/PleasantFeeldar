from django.db import models
from django.contrib.auth.models import User


class Content(models.Model):
    title = models.CharField(max_length=255) # заголовок видео
    url = models.URLField() # ссылка на видео
    emotions = models.ManyToManyField('Emotion', through='ContentEmotion') # связь многие ко многим

class Emotion(models.Model):
    name = models.CharField(max_length=50) # имя эмоции

class ContentEmotion(models.Model):
    video = models.ForeignKey(Content, on_delete=models.CASCADE) # связь многие ко многим
    emotion = models.ForeignKey(Emotion, on_delete=models.CASCADE) # связь многие ко многим
    creation_date = models.DateTimeField(auto_now_add=True) # дата создания
    user = models.ForeignKey(User, on_delete=models.CASCADE) # связь с пользователем
