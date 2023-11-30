from django.db import models
from django.contrib.auth.models import User


class Content(models.Model):
    title = models.CharField(max_length=255)  # заголовок видео
    youtube_id = models.CharField(max_length=255, blank=True)  # ID видео на Youtube
    emotions = models.ManyToManyField('Emotion', through='ContentEmotion')  # связь многие ко многим

    emotion_funny = models.IntegerField(default=0)
    emotion_cute = models.IntegerField(default=0)
    emotion_sad = models.IntegerField(default=0)
    emotion_sexy = models.IntegerField(default=0)
    emotion_scary = models.IntegerField(default=0)
    emotion_awkward = models.IntegerField(default=0)
    emotion_nostalgic = models.IntegerField(default=0)
    emotion_angry = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Emotion(models.Model):
    # EMOTIONS = (
    #     ('🤣 смешное', '🤣 смешное'),
    #     ('😊 няшное', '😊 няшное'),
    #     ('😭 грустное', '😭 грустное'),
    #     ('🍓 секси', '🍓 секси'),
    #     ('😱 страшное', '😱 страшное'),
    #     ('😟 кринж', '😟 кринж'),
    #     ('🧐 ностальгическое', '🧐 ностальгическое'),
    #     ('😈 злобное', '😈 злобное'),
    # )
    codename = models.CharField(max_length=30, unique=True)  # Name in english to use in code - funny
    name = models.CharField(max_length=50, default="null")  # Name to use for UI - смешное
    emoji = models.CharField(max_length=50, blank=True)  # Emoji in text format - 🤣

    def __str__(self):
        return self.name


class ContentEmotion(models.Model):
    video = models.ForeignKey(Content, on_delete=models.CASCADE)  # связь многие ко многим
    emotion = models.ForeignKey(Emotion, on_delete=models.CASCADE)  # связь многие ко многим
    creation_date = models.DateTimeField(auto_now_add=True)  # дата создания
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # связь с пользователем

    def __str__(self):
        return f"{self.video.title} -> {self.emotion.name} ({self.user.username})"
