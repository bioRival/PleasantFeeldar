# Generated by Django 4.2.7 on 2023-11-29 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_emotion_codename'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emotion',
            name='codename',
            field=models.CharField(max_length=30, unique=True),
        ),
    ]
