# Generated by Django 5.1.2 on 2024-12-19 11:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0005_category_project"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="category",
            options={"ordering": ["title"], "verbose_name_plural": "Categories"},
        ),
        migrations.AlterModelOptions(
            name="project",
            options={"ordering": ["-completion_date"]},
        ),
    ]
