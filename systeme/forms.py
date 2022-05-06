from django import forms
from django.forms import ModelForm

from systeme.models import Reservation, Parking, Abonnement, CHOICES_TYPE, Paiement


class ReservationForm(ModelForm):
    class Meta:
        model = Reservation
        fields = ['nombre_place', 'm_Parking']
    nombre_place = forms.IntegerField(min_value=1, widget=forms.NumberInput(attrs={"class": "form-control"}))
    m_Parking = forms.ModelChoiceField(queryset=Parking.objects.all(), widget=forms.Select(attrs={"class": "form-control"}))


class AbonnementForm(ModelForm):
    class Meta:
        model = Abonnement
        fields = ['type_abonnement', 'm_Parking']
    type_abonnement = forms.CharField(widget=forms.Select(choices=CHOICES_TYPE, attrs={"class": "form-control"}))
    m_Parking = forms.ModelChoiceField(queryset=Parking.objects.all(), widget=forms.Select(attrs={"class": "form-control"}))


class PaiementForm(ModelForm):
    class Meta:
        model = Paiement
        fields = []