# Generated by Django 4.1.2 on 2022-11-30 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_alter_useraccount_last_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='auth_provider',
            field=models.CharField(blank=True, default='email', max_length=50),
        ),
    ]
