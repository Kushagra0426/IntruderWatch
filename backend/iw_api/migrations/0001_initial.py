# Generated by Django 4.2.3 on 2024-09-21 07:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tracker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=255)),
                ('is_email_verified', models.BooleanField(default=False)),
                ('name', models.CharField(max_length=255)),
                ('email_token', models.CharField(max_length=255)),
                ('public_key', models.CharField(max_length=255, unique=True)),
                ('private_key', models.CharField(max_length=255, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Alert',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip_address', models.CharField(max_length=255)),
                ('useragent', models.CharField(max_length=255)),
                ('country', models.CharField(max_length=255)),
                ('country_flag', models.CharField(max_length=255)),
                ('region', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=255)),
                ('coordinates', models.CharField(max_length=255)),
                ('zip_code', models.CharField(max_length=255)),
                ('isp', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('tracker_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='iw_api.tracker')),
            ],
        ),
    ]
