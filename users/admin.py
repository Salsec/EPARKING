from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin

from systeme.models import Parking, Paiement, Guichet, Stationnement, Reservation, Abonnement, Gestion_reservation
from users.models import User, Vehicule

admin.site.register(User)
admin.site.register(Parking)
admin.site.register(Paiement)
admin.site.register(Guichet)
admin.site.register(Stationnement)
admin.site.register(Reservation)
admin.site.register(Abonnement)
admin.site.register(Gestion_reservation)
admin.site.register(Vehicule)