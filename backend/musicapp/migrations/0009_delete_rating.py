# Generated by Django 4.0.2 on 2022-04-08 19:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('musicapp', '0008_remove_rating_song_delete_artist'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Rating',
        ),
    ]
