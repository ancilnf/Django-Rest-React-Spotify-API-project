# Generated by Django 3.2.5 on 2022-02-26 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiA', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='current_song',
            field=models.CharField(max_length=50, null=True),
        ),
    ]