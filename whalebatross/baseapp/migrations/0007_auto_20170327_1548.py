# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-27 20:48
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('baseapp', '0006_sitesettings'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='sitesettings',
            options={'verbose_name': 'site settings', 'verbose_name_plural': 'site settings'},
        ),
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, max_length=255, null=True, upload_to='featured_images/%Y/%m/%d/'),
        ),
        migrations.AlterField(
            model_name='post',
            name='publish',
            field=models.DateTimeField(default=datetime.datetime(2017, 3, 27, 20, 48, 18, 793721, tzinfo=utc), verbose_name='publish'),
        ),
        migrations.AlterField(
            model_name='sitesettings',
            name='logo',
            field=models.ImageField(blank=True, max_length=255, null=True, upload_to='sitesettings/logo/'),
        ),
    ]
