# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-26 21:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('baseapp', '0005_auto_20170131_0727'),
    ]

    operations = [
        migrations.CreateModel(
            name='SiteSettings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='title')),
                ('logo', models.ImageField(blank=True, max_length=255, null=True, upload_to='baseapp/images/logo/')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
