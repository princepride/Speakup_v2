# Generated by Django 4.2.1 on 2023-07-28 06:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0004_bookmark"),
    ]

    operations = [
        migrations.AddField(
            model_name="youtube",
            name="youtube_duration",
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]