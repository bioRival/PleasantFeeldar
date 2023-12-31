# Generated by Django 4.2.7 on 2023-11-29 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_remove_emotioncount_emotion_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='content',
            name='emotion_angry',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='content',
            name='emotion_awkward',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='content',
            name='emotion_cute',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='content',
            name='emotion_funny',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='content',
            name='emotion_nostalgic',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='content',
            name='emotion_sad',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='content',
            name='emotion_scary',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='content',
            name='emotion_sexy',
            field=models.IntegerField(default=0),
        ),
    ]
