from django.contrib import admin
from .models import *


admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(AnonymousText)
admin.site.register(QuizResult)
