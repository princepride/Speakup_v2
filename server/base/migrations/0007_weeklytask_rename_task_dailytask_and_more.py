# Generated by Django 4.2.1 on 2023-08-04 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0006_task_alter_bookmark_options_alter_evaluation_options_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="WeeklyTask",
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
                ("task_id", models.CharField(max_length=10)),
                ("name_en", models.CharField(max_length=255)),
                ("name_zh", models.CharField(max_length=255)),
                ("description_en", models.TextField()),
                ("description_zh", models.TextField()),
                ("exp", models.IntegerField()),
                ("created_time", models.DateTimeField(auto_now_add=True)),
                ("last_update_time", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "Weekly Task",
                "verbose_name_plural": "Weekly Tasks",
            },
        ),
        migrations.RenameModel(
            old_name="Task",
            new_name="DailyTask",
        ),
        migrations.AlterModelOptions(
            name="dailytask",
            options={
                "verbose_name": "Daily Task",
                "verbose_name_plural": "Daily Tasks",
            },
        ),
    ]
