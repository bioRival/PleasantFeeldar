# Generated by Django 4.2.7 on 2023-11-29 16:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_emotioncount_contentemotioncount'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='emotioncount',
            name='emotion_id',
        ),
        migrations.DeleteModel(
            name='ContentEmotionCount',
        ),
        migrations.DeleteModel(
            name='EmotionCount',
        ),
    ]