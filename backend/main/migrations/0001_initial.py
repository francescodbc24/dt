# Generated by Django 5.0.1 on 2024-02-02 07:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RequestHTTP',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('url', models.TextField()),
                ('share', models.CharField(max_length=20, unique=True)),
                ('method', models.CharField(max_length=10)),
                ('domain', models.TextField()),
                ('scheme', models.TextField()),
                ('path', models.TextField()),
                ('page_load', models.FloatField()),
                ('first_iteration', models.FloatField()),
            ],
            options={
                'db_table': 'request_http',
            },
        ),
        migrations.CreateModel(
            name='ResponseHTTP',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('code', models.IntegerField()),
                ('server', models.TextField()),
                ('location', models.TextField(blank=True)),
                ('time', models.FloatField()),
                ('reason', models.TextField()),
                ('http_version', models.TextField()),
                ('request', models.ForeignKey(db_column='request_id', on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='main.requesthttp')),
            ],
            options={
                'db_table': 'response_http',
            },
        ),
    ]