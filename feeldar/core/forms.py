from django import forms
from .models import Content

# class EmotionCountForm(forms.Form):
#    class Meta:
#        model = ContentEmotionCount
#        fields = [
#            'content',
#            'emotion_count_list',
#        ]

from django import forms
from .models import AnonymousText


class AnonymousTextForm(forms.ModelForm):
    class Meta:
        model = AnonymousText
        fields = ['text']
