from io import BytesIO

import qrcode
from PIL import Image
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser, UserManager
from django.core.files import File
from django.db import models

# Create your models here.



class CustomUserManager(UserManager):

    def _create_user(self, email, username, first_name, last_name, telephone, password, **extra_fields):
        if not email:
            raise ValueError('The given email address must be set')
        if not username:
            raise ValueError('The given username must be set')
        if not first_name:
            raise ValueError('The given nom must be set')
        if not last_name:
            raise ValueError('The given prenom must be set')
        if not telephone:
            raise ValueError('The given telephone must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, username=None, first_name=None, last_name=None, telephone=None, password=None,
                    **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, username, first_name, last_name, telephone, password, **extra_fields)


class User(AbstractUser):
    email = models.EmailField(max_length=150, unique=True)
    telephone = models.IntegerField(default=0)
    qr_id = models.CharField(max_length=1000, blank=True, null=True)
    thumbnail = models.ImageField(upload_to="codeqr", blank=True, null=True)
    photo = models.ImageField(upload_to="photos", verbose_name='Photo de profil', blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        infos = f'{self.email}-{self.last_name}-{self.id}'
        self.qr_id = make_password(infos, None, 'pbkdf2_sha256')
        qr_image = qrcode.make(self.qr_id)
        qr_offset = Image.new('RGB', (500, 500), 'white')
        qr_offset.paste(qr_image)
        me = f'{self.email}qrcode'
        file_name = me + '.png'
        stream = BytesIO()
        qr_offset.save(stream, 'PNG')
        self.thumbnail.save(file_name, File(stream), save=False)
        qr_offset.close()
        super().save(*args, **kwargs)



class Vehicule(models.Model):
    couleur = models.CharField(max_length=50, null=False)
    imatriculation = models.CharField(max_length=60)
    m_User = models.ForeignKey(User, on_delete=models.CASCADE)
