# Generated by Django 4.2.1 on 2023-09-20 09:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0010_userinformation_bookmark_user_id_dailytask_user_id_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="userinformation",
            old_name="user_email",
            new_name="email",
        ),
        migrations.RenameField(
            model_name="userinformation",
            old_name="user_password",
            new_name="password",
        ),
    ]
