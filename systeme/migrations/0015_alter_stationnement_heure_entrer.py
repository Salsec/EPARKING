# Generated by Django 4.0.4 on 2022-05-07 17:19

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('systeme', '0014_alter_abonnement_date_fin_abonnement'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stationnement',
            name='heure_entrer',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 7, 17, 19, 8, 577258), verbose_name="Heure d'entré"),
        ),
    ]
