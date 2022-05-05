from datetime import date

from django.contrib import messages
from django.shortcuts import render, get_object_or_404, redirect

# Create your views here.
import users
from EPARKING import settings
from systeme.forms import ReservationForm
from systeme.models import Parking, Reservation, Stationnement, Gestion_reservation
from systeme.qrcode import read_qr_code
from users.models import User


def essai(request):
    return render(request, 'qr.html')


def ess(request):
    return render(request, 'system/cam.html')


def creat_table():
    parking = get_object_or_404(Parking, id=1)
    if parking.etat_place is None:
        places = {i + 1: 0 for i in range(parking.nombre_place_total)}
    else:
        etats = list(parking.etat_place)
        places = {i + 1: etats[i] for i in range(parking.nombre_place_total)}
    return places


def station_recent(request):
    stations = Stationnement.objects.all()
    contex = {
        "stations": stations
    }
    print(contex)
    return render(request, 'system/sidebar_template.html', contex)


def systeme(request):
    places = creat_table()
    stations = Stationnement.objects.filter(heure_entrer=date.today()).filter(heure_sortie=None)
    context = {
        "places": places,
        "stations": stations
    }
    return render(request, 'system/home_content.html', context)


def entrer_stationnement(request, signal):
    if signal == 0:
        messages.error(request, "Mauvais réquette")
        return redirect('systeme:systeme')
    else:
        try:
            qr = read_qr_code(signal)
            if qr:
                qrco = User.objects.get(qr_id=qr)
                if qrco:
                    try:
                        reservation = Reservation.objects.get(m_User=qrco.id, status=True)
                        if reservation and reservation.date_reservation.date() == date.today():
                            place_oct = list(reservation.places_octroyer)
                            parking = get_object_or_404(Parking, id=reservation.m_Parking_id)
                            place = reservation.places_octroyer.find('0')
                            if place > 0:
                                place_oct[place] = '1'
                                Reservation.objects.filter(id=reservation.id).update(places_octroyer=''.join(place_oct))
                                place_park = list(parking.etat_place)
                                position = place_oct[place - 1]
                                place_park[int(position) + 1] = '1'
                                Parking.objects.filter(id=reservation.m_Parking).update(etat_place=''.join(place_park))
                                Stationnement.objects.create(numero_place=int(position), m_Parking=parking, m_User=qrco)
                                messages.success(request, "Vous etes autoriser à stationner" + position)
                                return redirect('systeme:systeme')
                            else:
                                place_list = list(parking.etat_place)
                                place_vide = parking.etat_place.find('0')
                                if place_vide > -1:
                                    messages.info(request,
                                                  'Vos places reservés sont saturés!!! vous serez facturé pour se stationnement')
                                    place_list[place_vide] = '1'
                                    Parking.objects.filter(id=parking.id).update(etat_place=''.join(place_list))
                                    Stationnement.objects.create(numero_place=place_vide + 1,
                                                                 status_stationnement=False,
                                                                 m_Parking=parking, m_User=qrco)
                                    messages.success(request, "Vous etes autoriser à stationner" + (place_vide + 1))
                                    return redirect('systeme:systeme')
                                else:
                                    messages.warning(request, "Place vide non disponible")
                                    return redirect('systeme:systeme')
                        else:
                            parking = get_object_or_404(Parking, id=1)
                            place_list = list(parking.etat_place)
                            place_vide = parking.etat_place.find('0')
                            if place_vide > -1:
                                messages.info(request,
                                              'Vos places reservés sont saturés!!! vous serez facturé pour se stationnement')
                                place_list[place_vide] = '1'
                                Parking.objects.filter(id=parking.id).update(etat_place=''.join(place_list))
                                Stationnement.objects.create(numero_place=place_vide + 1, status_stationnement=False,
                                                             m_Parking=parking, m_User=qrco)
                                messages.success(request, "Vous etes autoriser à stationner" + (place_vide + 1))
                                return redirect('systeme:systeme')
                            else:
                                messages.warning(request, "Place vide non disponible")
                                return redirect('systeme:systeme')
                    except Reservation.DoesNotExist:
                        parking = get_object_or_404(Parking, id=1)
                        place_list = list(parking.etat_place)
                        place_vide = parking.etat_place.find('0')
                        if place_vide > -1:
                            messages.info(request,
                                          'Vos places reservés sont saturés!!! vous serez facturé pour se stationnement')
                            place_list[place_vide] = '1'
                            Parking.objects.filter(id=parking.id).update(etat_place=''.join(place_list))
                            Stationnement.objects.create(numero_place=place_vide + 1, status_stationnement=False,
                                                         m_Parking=parking, m_User=qrco)
                            messages.success(request, "Vous etes autoriser à stationner à la place" + (place_vide + 1))
                            return redirect('systeme:systeme')
                        else:
                            messages.warning(request, "Place vide non disponible")
                            return redirect('systeme:systeme')
                else:
                    messages.error(request, "QR CODE INVALIDE")
                    return redirect('systeme:systeme')
            return redirect('systeme:systeme')
        except User.DoesNotExist:
            messages.error(request, "QR CODE INVALIDE")
            return redirect('systeme:systeme')


def reservation_page(request):
    form = ReservationForm()
    if request.method == 'POST':
        form = ReservationForm(request.POST)
        if form.is_valid():
            tab = []
            nombre_place = form.cleaned_data['nombre_place']
            m_Parking = form.cleaned_data['m_Parking']
            table = creat_table()
            etat_place = list(table.values())
            for i in range(len(etat_place)):
                if etat_place[i] == '0':
                    tab.append(i)
            if len(tab) >= nombre_place:
                resevation = Reservation.objects.create(nombre_place=nombre_place,
                                                        places_octroyer=' '.join(tab),
                                                        m_Parking=m_Parking,
                                                        m_User=request.user.id)
                resevation.save()
                for i in range(nombre_place):
                    etat_place[tab[i]] = '2'
                    Gestion_reservation.objects.create(code=tab[i] + 1, reservation_id=resevation)
                messages.info(request, 'Votre réservation sera prise en '
                                       'compte une fois le paiement effectué. Vous disposé '
                                       'de 15 minutes pour effectuer le paiement ')
                return redirect('systeme:paiement')
            else:
                messages.error(request, 'Nous sommes desolé de ne pas pouvoire prendre'
                                        ' en compte votre demande, actuellement nos places '
                                        'libres sont inssuffisantes')
                return redirect('systeme:reserv')
    user_reservations = Reservation.objects.filter(m_User=request.user.id).filter(status=True)
    return render(request, 'system/reservation.html', context={'form': form,
                                                               'user_reservations': user_reservations})

def reservation_qr_code(request, id):
    if request.user.is_authenticated:
        user_reservations = Reservation.objects.filter(id=id)
        qr_codes = Gestion_reservation.objects.filter(reservation_id=id)
        context = {
            'qr_codes': qr_codes,
            'user_reservations': user_reservations
        }
        return render(request, 'system/code_qr.html', context)
    else:
        return redirect('users:login_page')