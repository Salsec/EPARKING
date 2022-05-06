import random
from io import BytesIO

import qrcode
from PIL.Image import Image
from django.contrib.auth.hashers import make_password
from django.db import models
from django.core.files import File

from users.models import User

CHOICES_TYPE = [
    ('0', '---------'),
    ('1', 'Mensuel'),
    ('3', 'Trimestriel'),
    ('6', 'Semestriel'),
    ('12', 'Annuel'),
]

class Parking(models.Model):
    nom = models.CharField(max_length=50, null=False)
    adresse = models.CharField(max_length=60)
    nombre_place_libre = models.IntegerField(default=0)
    nombre_place_occuper = models.IntegerField(default=0)
    nombre_place_total = models.IntegerField(default=0)
    etat_place = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.nom


class Paiement(models.Model):
    CHOICES = [
        ('1', 'Carte de crédit'),
        ('2', 'Mobile monney'),
        ('3', 'Compte banquaire'),
    ]
    montant_payer = models.IntegerField(default=0)
    moyen_paiement = models.CharField(max_length=60, choices=CHOICES)
    date_paiement = models.DateTimeField(auto_now_add=True)


class Guichet(models.Model):
    numero = models.IntegerField(default=0)
    position = models.CharField(max_length=60, blank=True, null=True)
    m_Parking = models.ForeignKey(Parking, on_delete=models.CASCADE)


class Stationnement(models.Model):
    numero_place = models.IntegerField(default=0)
    heure_entrer = models.DateTimeField(auto_now_add=True, verbose_name="Heure d'entré")
    status_stationnement = models.BooleanField(default=True)
    heure_sortie = models.DateTimeField(blank=True, null=True, verbose_name='heure de sortie')
    m_Paiement = models.ForeignKey(Paiement, on_delete=models.CASCADE, null=True, blank=True)

    m_Parking = models.ForeignKey(Parking, on_delete=models.CASCADE, )

    m_User = models.ForeignKey(User, on_delete=models.CASCADE)


class Reservation(models.Model):
    nombre_place = models.IntegerField(default=1)
    status = models.BooleanField(default=False)
    places_octroyer = models.CharField(max_length=50, null=True, blank=True)
    date_reservation = models.DateTimeField(auto_now_add=True, blank=True)
    m_User = models.ForeignKey(User, on_delete=models.CASCADE)

    m_Parking = models.ForeignKey(Parking, on_delete=models.CASCADE)

    m_Paiement = models.ForeignKey(Paiement, null=True, blank=True, on_delete=models.CASCADE)

    def create_reservation(self, *args, **kwargs):
        pass


class Abonnement(models.Model):

    date_debut_abonnement = models.DateTimeField(auto_now_add=True)
    date_fin_abonnement = models.DateTimeField(blank=True, null=True)
    status_abonnement = models.BooleanField(default=False)
    type_abonnement = models.CharField(max_length=30, choices=CHOICES_TYPE)

    m_Parking = models.ForeignKey(Parking, on_delete=models.CASCADE)

    m_Paiement = models.ForeignKey(Paiement, blank=True, null=True, on_delete=models.CASCADE)

    m_User = models.ForeignKey(User, on_delete=models.CASCADE)


class Gestion_reservation(models.Model):
    code = models.IntegerField(default=0)
    reservation_id = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    status = models.BooleanField(default=True)
    qr_code = models.CharField(max_length=1000,  blank=True, null=True)
    qr_image = models.ImageField(upload_to="reserv_code_qr", blank=True, null=True)

    def save(self, *args, **kwargs):
        aleat = random.randint(0, 1000000)
        infos = f'{self.code}-{self.id}-{self.reservation_id}-{aleat}'
        self.qr_code = make_password(infos, None, 'pbkdf2_sha256')
        qr_image = qrcode.make(self.qr_code)
        qr_offset = Image.new('RGB', (500, 500), 'white')
        qr_offset.paste(qr_image)
        me = f'{self.id}-{aleat}qrcode'
        file_name = me + '.png'
        stream = BytesIO()
        qr_offset.save(stream, 'PNG')
        self.qr_image.save(file_name, File(stream), save=False)
        qr_offset.close()
        super().save(*args, **kwargs)
