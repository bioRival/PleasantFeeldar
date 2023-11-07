from django.db import models
from django.contrib.auth.models import User


class Content(models.Model):
    title = models.CharField(max_length=255) # заголовок видео
    url = models.CharField(max_length=255, blank=True) # ссылка на видео... пока оставим varchar
    emotions = models.ManyToManyField('Emotion', through='ContentEmotion') # связь многие ко многим

    def __str__(self):
        return self.title

class Emotion(models.Model):
    EMOTIONS = (
        ('Interesting', 'Интересно'),
        ('sad', 'Грустно'),
        ('funny', 'Смешно'),
        ('excited', 'Восторженно'),
    )
    name = models.CharField(max_length=50, choices=EMOTIONS) # имя эмоции

    def __str__(self):
        return self.name

class ContentEmotion(models.Model):
    video = models.ForeignKey(Content, on_delete=models.CASCADE) # связь многие ко многим
    emotion = models.ForeignKey(Emotion, on_delete=models.CASCADE) # связь многие ко многим
    creation_date = models.DateTimeField(auto_now_add=True) # дата создания
    user = models.ForeignKey(User, on_delete=models.CASCADE) # связь с пользователем

    def __str__(self):
        return f"{self.video.title} -> {self.emotion.name} ({self.user.username})"
