from django.contrib import admin
from .models import Content, Emotion, ContentEmotion

admin.site.register(Content)
admin.site.register(Emotion)
admin.site.register(ContentEmotion)
