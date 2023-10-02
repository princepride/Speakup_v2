# Generated by Django 4.2.1 on 2023-10-02 14:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0013_remove_youtube_user_id"),
    ]

    operations = [
        migrations.CreateModel(
            name="Achievement",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("achievement_id", models.CharField(max_length=10)),
                ("user_id", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="Apikey",
            fields=[
                ("user_id", models.IntegerField(primary_key=True, serialize=False)),
                ("api_key", models.CharField(max_length=255)),
            ],
        ),
    ]
