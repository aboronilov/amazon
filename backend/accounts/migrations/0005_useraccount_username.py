# Generated by Django 4.1.2 on 2022-12-29 06:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_remove_useraccount_auth_provider'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='username',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]