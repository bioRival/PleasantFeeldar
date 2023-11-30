from django.contrib import admin
from .models import Content, Emotion, ContentEmotion, AnonymousText

admin.site.register(Content)
admin.site.register(Emotion)
admin.site.register(ContentEmotion)
admin.site.register(AnonymousText)
