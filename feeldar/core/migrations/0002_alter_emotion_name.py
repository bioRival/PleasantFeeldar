# Generated by Django 4.2.7 on 2023-11-10 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emotion',
            name='name',
            field=models.CharField(choices=[('Interesting', 'Интересно'), ('sad', 'Грустно'), ('funny', 'Смешно'), ('excited', 'Восторженно')], max_length=50),
        ),
    ]
