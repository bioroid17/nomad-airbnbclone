# Generated by Django 5.0.6 on 2024-08-07 15:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        (
            "experiences",
            "0003_alter_experience_category_alter_experience_host_and_more",
        ),
        ("medias", "0003_alter_photo_file_alter_video_file"),
    ]

    operations = [
        migrations.AlterField(
            model_name="video",
            name="experience",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="video",
                to="experiences.experience",
            ),
        ),
    ]