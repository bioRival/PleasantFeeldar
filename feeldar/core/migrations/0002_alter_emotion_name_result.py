# Generated by Django 4.2.7 on 2023-11-29 15:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='emotion',
            name='name',
            field=models.CharField(choices=[('🤣 смешное', '🤣 смешное'), ('😊 няшное', '😊 няшное'), ('😭 грустное', '😭 грустное'), ('🍓 секси', '🍓 секси'), ('😱 страшное', '😱 страшное'), ('😟 кринж', '😟 кринж'), ('🧐 ностальгическое', '🧐 ностальгическое'), ('😈 злобное', '😈 злобное')], max_length=50),
        ),
        migrations.CreateModel(
            name='Result',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]