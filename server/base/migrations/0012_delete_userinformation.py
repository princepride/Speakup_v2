# Generated by Django 4.2.1 on 2023-09-22 13:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_rename_user_email_userinformation_email_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='UserInformation',
        ),
    ]