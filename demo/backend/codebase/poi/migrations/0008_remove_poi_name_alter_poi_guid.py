# Generated by Django 4.0.7 on 2022-10-18 08:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poi', '0007_alter_poi_guid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='poi',
            name='name',
        ),
        migrations.AlterField(
            model_name='poi',
            name='guid',
            field=models.CharField(default=999999, max_length=20, unique=True),
        ),
    ]
