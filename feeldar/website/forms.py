from django import forms
from .models import AnonymousText


class AnonymousTextForm(forms.ModelForm):
    class Meta:
        model = AnonymousText
        fields = ['text']
