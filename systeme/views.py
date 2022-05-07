from datetime import date, timedelta
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.shortcuts import render, get_object_or_404, redirect

# Create your views here.
import users
from EPARKING import settings
from systeme.forms import ReservationForm, AbonnementForm, PaiementForm
from systeme.models import Parking, Reservation, Stationnement, Gestion_reservation, Abonnement, Paiement
from systeme.qrcode import read_qr_code
from users.models import User

RESERVATION="2reserv2"
ABONNEMENT="3abonn3"
STATIONNEMENT="1staion1"
PRIX_HEURE = 200
RESERVATION_FORFAIT = 500
FORFAIS_MENSUEL = 10000


def essai(request):
    return render(request, 'qr.html')


def ess(request):
    return render(request, 'system/cam.html')

def upd_abonnement():
    Date_required = date.today() + timedelta(days=1)
    abonnement_exps = Abonnement.objects.filter(status_abonnement=True).filter(date_fin_abonnement=Date_required)
    for abonnement_exp in abonnement_exps:
        Abonnement.objects.filter(id=abonnement_exp.id).update(status_abonnement=False)

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

def verif_date(z, n):
    if z.month + n > 12:
        m = (z.month + n)-12
        date_exp = date(z.year+1, m, z.day)
    else:
        date_exp = date(z.year, z.month+n, z.day)
    return date_exp


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


def place_vide():
    tab = []
    table = creat_table()
    etat_place = list(table.values())
    for i in range(len(etat_place)):
        if etat_place[i] == '0':
            tab.append(i)
    return tab, etat_place


@login_required
def reservation_page(request):
    form = ReservationForm()
    if request.method == 'POST':
        form = ReservationForm(request.POST)
        if form.is_valid():
            nombre_place = form.cleaned_data['nombre_place']
            m_Parking = form.cleaned_data['m_Parking']
            tab, etat_place = place_vide()
            if len(tab) >= nombre_place:
                # for i in range(nombre_place):
                #     etat_place[int(tab[i])] = '2'
                #     Gestion_reservation.objects.create(code=tab[i] + 1, reservation_id=resevation)
                messages.info(request,
                              'Votre reservation sera effective une fois le paiement effectuer!!')
                return redirect('systeme:paiement', RESERVATION, nombre_place, m_Parking)
            else:
                messages.error(request, 'Nous sommes desolé de ne pas pouvoire prendre'
                                        ' en compte votre demande, actuellement nos places '
                                        'libres sont inssuffisantes')
                return redirect('systeme:reserv')
    user_reservations = Reservation.objects.filter(m_User=request.user.id).filter(status=True)
    return render(request, 'system/reservation.html', context={'form': form,
                                                               'user_reservations': user_reservations})


@login_required
def reservation_qr_code(request, pk):
    if request.user.is_authenticated:
        user_reservations = Reservation.objects.filter(id=pk)
        qr_codes = Gestion_reservation.objects.filter(reservation_id=pk)
        context = {
            'qr_codes': qr_codes,
            'user_reservations': user_reservations
        }
        return render(request, 'system/code_qr.html', context)
    else:
        return redirect('users:login_page')


@login_required
def abonnement(request):
    form = AbonnementForm()
    if request.method == 'POST':
        form = AbonnementForm(request.POST)
        if form.is_valid():
            type_abonnement = form.cleaned_data['type_abonnement']
            m_Parking = form.cleaned_data['m_Parking']
            abonnement_anterieur = Abonnement.objects.filter(m_User=request.user.id).filter(m_Parking=m_Parking).filter(
                status_abonnement=True)
            if abonnement_anterieur:
                messages.info(request, "Un abonnement pour le même parking est en cour, veillez attendre l'expiration")
                return redirect('systeme:abonnement')
            else:
                messages.info(request, 'Votre abonnement sera effective une fois le paiement effectuer')
                return redirect('systeme:paiement', ABONNEMENT, type_abonnement, m_Parking)
    user_abonnements = Abonnement.objects.filter(m_User=request.user.id).filter(status_abonnement=True)
    context = {
        'form': form,
        'user_abonnements': user_abonnements
    }
    return render(request, 'system/abonnement.html', context)


@login_required
def paiement_page(request, signal, types, park):
    form = PaiementForm()
    if signal == ABONNEMENT:
        somme = int(types)*FORFAIS_MENSUEL
    elif signal == RESERVATION:
        somme = int(types)*RESERVATION_FORFAIT
    else:
        somme = int(types)*PRIX_HEURE

    if request.method == 'POST':
        form = PaiementForm(request.POST)
        moyen=request.POST['moyen']
        if moyen == 1:
            moyen_pay = 'orange money'
        elif moyen == 2:
            moyen_pay = 'moov money'
        else:
            moyen_pay = 'coris money'
        if form.is_valid():
            numero = form.cleaned_data['numero']
            if signal == ABONNEMENT:
                paiement = Paiement.objects.create(montant_payer=somme, moyen_paiement=moyen_pay, numero=numero)
                paiement.save()
                today = date.today()
                fin_abonnement = verif_date(today, int(types))
                abonnement=Abonnement.objects.create(date_fin_abonnement=fin_abonnement, status_abonnement=True, type_abonnement=types, m_Parking=get_object_or_404(Parking, nom=park), m_Paiement=paiement, m_User=request.user)
                abonnement.save()
                messages.success(request, 'Abonnement effectuer avec succès')
                return redirect('systeme:abonnement')
            elif signal == RESERVATION:
                TT = []
                tab, etat_place = place_vide()
                for i in range(int(types)):
                    TT.append(tab[i] + 1)
                paiement = Paiement.objects.create(montant_payer=somme, moyen_paiement=moyen_pay, numero=numero)
                paiement.save()
                if int(types) == 1:
                    reservation = Reservation.objects.create(nombre_place=int(types), status=True,
                                                             places_octroyer="".join(TT), m_User=request.user.id,
                                                             m_Parking=park, m_Paiement=paiement.id)
                    reservation.save()
                    messages.success(request, 'Reservation effectuer avec succès')
                    return redirect('systeme:reserv')
                else:
                    reservation = Reservation.objects.create(nombre_place=int(types), status=True, places_octroyer=" ".join(TT), m_User=request.user.id, m_Parking=park, m_Paiement=paiement.id)
                    reservation.save()
                    for i in range(int(types)):
                        etat_place[int(tab[i])] = '2'
                        gestion = Gestion_reservation.objects.create(code=tab[i] + 1, reservation_id=reservation.id)
                        gestion.save()
                    messages.success(request, 'Reservation effectuer avec succès')
                    return redirect('systeme:reserv')
            elif signal == STATIONNEMENT:
                paiement = Paiement.objects.create(montant_payer=somme, moyen_paiement=moyen_pay, numero=numero)
                paiement.save()
                Stationnement.objects.filter(m_User=request.user.id).filter(status_stationnement=True).filter(m_Parking=park).filter(m_Paiement=None).update(m_Paiement=paiement.id)
                messages.success(request, 'Paiement effectuer avec succès')
                return redirect('systeme:stationnement')
            else:
                messages.error(request, "Impossible d'effectuer ce paiement")
                return redirect('users:homee')

    context = {
        'form': form,
        'sommme': somme
    }
    return render(request, 'system/paiement.html', context)


def stationnement(request, signal):
    if signal == 0:
        messages.error(request, "Mauvais réquette")
        return redirect('systeme:systeme')
    else:
        qr = read_qr_code(signal)
        if qr:
            place_libre, etat_place = place_vide()
            try:
                qrco_user = User.objects.get(qr_id=qr)
                if qrco_user:
                    try:
                        reservation = Reservation.objects.get(m_User=qrco_user, status=True)
                        etat_place[int(reservation.places_octroyer)-1]='1'
                        Parking.objects.filter(id=reservation.m_Parking.id).update(etat_place=''.join(etat_place))
                        parking = get_object_or_404(Parking, id=reservation.m_Parking.id)
                        station = Stationnement.objects.create(numero_place=reservation.places_octroyer, m_Parking=parking, m_User=qrco_user)
                        station.save()
                        messages.success(request, "Vous etes autoriser à stationner" + reservation.places_octroyer)
                        return redirect('systeme:systeme')
                    except Reservation.DoesNotExist:
                        if len(place_libre) != 0:
                            etat_place[place_libre[0]] = '1'
                            parking = get_object_or_404(Parking, id=1)
                            Parking.objects.filter(id=1).update(etat_place=''.join(etat_place))
                            station = Stationnement.objects.create(numero_place=int(place_libre[0] + 1), m_Parking=parking, m_User=qrco_user)
                            station.save()
                            messages.success(request, "Vous etes autoriser à stationner à la place " + str(int(place_libre[0])+1))
                            return redirect('systeme:systeme')
                        else:
                            messages.success(request, "Désolé!!!place vide non disponible")
                            return redirect('systeme:systeme')
            except User.DoesNotExist:
                    qrco_user = Gestion_reservation.objects.get(qr_code=qr)
                    if qrco_user:
                        etat_place[int(qrco_user.code)-1]='1'
                        station = Stationnement.objects.create(numero_place=int(place_libre[0] + 1), m_Parking=1, m_User=qrco_user)
                        station.save()
                        messages.success(request, "Vous etes autoriser à stationner à la place " + str(int(qrco_user.code)))
                    return redirect('systeme:systeme')
        else:
            messages.success(request, "INVALIDE QR CODE")
            return redirect('systeme:systeme')

