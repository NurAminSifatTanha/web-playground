# Generated by Django 3.1.5 on 2021-01-06 13:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='degree',
            new_name='description',
        ),
    ]