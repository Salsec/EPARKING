from datetime import date, timedelta
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.shortcuts import render, get_object_or_404, redirect

import datetime
from systeme.forms import ReservationForm, AbonnementForm, PaiementForm
from systeme.models import Parking, Reservation, Stationnement, Gestion_reservation, Abonnement, Paiement
from systeme.qrcode import read_qr_code
from users.models import User

RESERVATION = "2reserv2"
ABONNEMENT = "3abonn3"
STATIONNEMENT = "1staion1"
PRIX_HEURE = 200
RESERVATION_FORFAIT = 500
FORFAIS_MENSUEL = 10000


def essai(request):
    return render(request, 'qr.html')


def ess(request):
    return render(request, 'system/stionnement_page.html')


def upd_abonnement():
    Date_required = date.today() + timedelta(days=1)
    abonnement_exps = Abonnement.objects.filter(status_abonnement=True).filter(date_fin_abonnement=Date_required)
    for abonnement_exp in abonnement_exps:
        Abonnement.objects.filter(id=abonnement_exp.id).update(status_abonnement=False)


def creat_table():
    parking = get_object_or_404(Parking, id=1)
    if parking.etat_place == None:
        places = {(i + 1): '0' for i in range(int(parking.nombre_place_total))}
    else:
        etats = list(parking.etat_place)
        places = {(i + 1): etats[i] for i in range(int(parking.nombre_place_total))}
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
    stations = Stationnement.objects.filter(m_Paiement=None).filter(heure_sortie=None).filter(status_stationnement=True)
    context = {
        "places": places,
        "stations": stations
    }
    return render(request, 'system/home_content.html', context)


def systeme_sortie(request):
    places = creat_table()
    stations_sorties = Stationnement.objects.filter(m_Paiement=not None).filter(status_stationnement=False)
    context = {
        "places": places,
        "stations_sorties": stations_sorties
    }
    return render(request, 'system/sortie_station.html', context)


def verif_date(z, n):
    if z.month + n > 12:
        m = (z.month + n) - 12
        date_exp = date(z.year + 1, m, z.day)
    else:
        date_exp = date(z.year, z.month + n, z.day)
    return date_exp


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
                messages.info(request,
                              'Votre reservation sera effective une fois le paiement effectuer!!')
                return redirect('systeme:paiement', RESERVATION, nombre_place, m_Parking)
            else:
                messages.error(request, 'Nous sommes desolé de ne pas pouvoire prendre'
                                        ' en compte votre demande, actuellement nos places '
                                        'libres sont inssuffisantes')
                return redirect('systeme:reserv')
    user_reservations = Reservation.objects.filter(m_User=request.user.id).filter(status=True)
    gestion_reserves = Gestion_reservation.objects.filter(reservation_id_id__in=user_reservations)

    return render(request, 'system/reservation.html', context={'form': form,
                                                               'gestion_reserves': gestion_reserves,
                                                               "user_reservations": user_reservations})


@login_required
def reservation_qr_code(request, pk):
    if request.user.is_authenticated:
        user_reservations = Reservation.objects.filter(m_User=request.user)
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
        somme = int(types) * FORFAIS_MENSUEL
    elif signal == RESERVATION:
        somme = int(types) * RESERVATION_FORFAIT
    else:
        somme = int(types) * PRIX_HEURE

    if request.method == 'POST':
        form = PaiementForm(request.POST)
        moyen = request.POST['moyen']
        if moyen == 1:
            moyen_pay = 'orange money'
        elif moyen == 2:
            moyen_pay = 'moov money'
        else:
            moyen_pay = 'coris money'
        if form.is_valid():
            numero = form.cleaned_data['numero']
            parking = get_object_or_404(Parking, nom=park)
            if signal == ABONNEMENT:
                paiement = Paiement.objects.create(montant_payer=somme, moyen_paiement=moyen_pay, numero=numero)
                paiement.save()
                today = date.today()
                fin_abonnement = verif_date(today, int(types))
                abonnement = Abonnement.objects.create(date_fin_abonnement=fin_abonnement, status_abonnement=True,
                                                       type_abonnement=types,
                                                       m_Parking=get_object_or_404(Parking, nom=parking),
                                                       m_Paiement=paiement, m_User=request.user)
                abonnement.save()
                messages.success(request, 'Abonnement effectuer avec succès')
                return redirect('systeme:abonnement')
            elif signal == RESERVATION:
                TT = []
                tab, etat_place = place_vide()
                for i in range(int(types)):
                    TT.append(str((tab[i]) + 1))
                    etat_place[int(tab[i])] = "2"
                paiement = Paiement.objects.create(montant_payer=somme, moyen_paiement=moyen_pay, numero=numero)
                paiement.save()
                if int(types) == 1:
                    reservation = Reservation.objects.create(nombre_place=int(types), status=True,
                                                             places_octroyer="".join(TT), m_User=request.user,
                                                             m_Parking=parking, m_Paiement=paiement)
                    reservation.save()
                    Parking.objects.filter(id=parking.id).update(etat_place="".join(etat_place))
                    messages.success(request, 'Reservation effectuer avec succès')
                    return redirect('systeme:reserv')
                else:
                    reservation = Reservation.objects.create(nombre_place=int(types), status=True,
                                                             places_octroyer=" ".join(TT), m_User=request.user,
                                                             m_Parking=parking, m_Paiement=paiement)
                    reservation.save()
                    for i in range(int(types)):
                        etat_place[int(tab[i])] = '2'
                        gestion = Gestion_reservation.objects.create(code=tab[i] + 1, reservation_id=reservation)
                        gestion.save()
                        Parking.objects.filter(id=parking.id).update(etat_place="".join(etat_place))
                    messages.success(request, 'Reservation effectuer avec succès')
                    return redirect('systeme:reserv', )
            elif signal == STATIONNEMENT:
                paiement = Paiement.objects.create(montant_payer=somme, moyen_paiement=moyen_pay, numero=numero)
                paiement.save()
                Stationnement.objects.filter(m_User=request.user.id).filter(status_stationnement=True).filter(
                    m_Parking=parking).filter(m_Paiement=None).update(m_Paiement=paiement.id)
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
            qrco_user_user = User.objects.filter(qr_id=qr)
            qrco_user_gestion = Gestion_reservation.objects.filter(qr_code=qr).filter(status=True)
            if qrco_user_user:
                qrco_user = qrco_user_user.get(qr_id=qr)
                reservation_query = Reservation.objects.filter(m_User=qrco_user)
                if reservation_query:
                    reservation = reservation_query.get(m_User=qrco_user, status=True)
                    if reservation and reservation.nombre_place == 1:
                        if etat_place[int(reservation.places_octroyer) - 1] == '1':
                            messages.info(request, 'Cet stationnement est déjà en cour')
                            return redirect('systeme:systeme')
                        else:
                            etat_place[int(reservation.places_octroyer) - 1] = '1'
                            Parking.objects.filter(id=reservation.m_Parking.id).update(etat_place=''.join(etat_place))
                            station = Stationnement.objects.create(numero_place=reservation.places_octroyer,
                                                                   qr_code=qrco_user.qr_id,
                                                                   m_Parking=reservation.m_Parking, m_User=qrco_user)
                            station.save()
                            messages.success(request, "Vous etes autoriser à stationner" + reservation.places_octroyer)
                            return redirect('systeme:systeme')
                    else:
                        messages.info(request, 'Veuillez utiliser un des qr code générer à la reservation!!!!')
                        return redirect('systeme:systeme')
                else:
                    if len(place_libre) > 0:
                        stationn = Stationnement.objects.filter(qr_code=qrco_user.qr_id).filter(heure_sortie=None)
                        if stationn:
                            esse = stationn.get(qr_code=qrco_user.qr_id)
                            if esse:
                                messages.info(request, 'Cet stationnement est déjà en cour')
                                return redirect('systeme:systeme')
                        else:
                            etat_place[place_libre[0]] = '1'
                            parking = get_object_or_404(Parking, id=1)
                            Parking.objects.filter(id=1).update(etat_place=''.join(etat_place))
                            station = Stationnement.objects.create(numero_place=int(place_libre[0] + 1),
                                                                   qr_code=qrco_user.qr_id,
                                                                   m_Parking=parking, m_User=qrco_user)
                            station.save()
                            messages.success(request, "Vous etes autoriser à stationner à la place " + str(
                                int(place_libre[0]) + 1))
                            return redirect('systeme:systeme')
                    else:
                        messages.success(request, "Désolé!!!place vide non disponible")
                        return redirect('systeme:systeme')

            if qrco_user_gestion:
                qrco_user1 = qrco_user_gestion.get(qr_code=qr)
                stationne = Stationnement.objects.filter(qr_code=qrco_user1.qr_code).filter(heure_sortie=None)
                if stationne:
                    exes = stationne.get(qr_code=qrco_user1.qr_code)
                    if exes:
                        messages.info(request, 'Cet stationnement est déjà en cour')
                        return redirect('systeme:systeme')
                else:
                    etat_place[int(qrco_user1.code) - 1] = '1'
                    Parking.objects.filter(id=qrco_user1.reservation_id.m_Parking.id).update(
                        etat_place="".join(etat_place))
                    station = Stationnement.objects.create(numero_place=int(place_libre[0] + 1),
                                                           qr_code=qrco_user1.qr_code,
                                                           m_Parking=qrco_user1.reservation_id.m_Parking,
                                                           m_User=qrco_user1.reservation_id.m_User)
                    station.save()
                    messages.success(request,
                                     "Vous etes autoriser à stationner à la place " + str(int(qrco_user1.code)))
                    return redirect('systeme:systeme')

            if not qrco_user_gestion and not qrco_user_user:
                messages.success(request, "INVALIDE QR CODE")
                return redirect('systeme:systeme')
        else:
            return redirect('systeme:systeme')
    return redirect('systeme:systeme')


def stationnement_page(request):
    stations = Stationnement.objects.filter(m_User=request.user).filter(status_stationnement=True)
    abonnement_users = Abonnement.objects.filter(m_User=request.user).filter(status_abonnement=True)
    reservation_users = Reservation.objects.filter(m_User=request.user).filter(status=True)
    context = {
        'stations': stations,
        'abonnement_users': abonnement_users,
        'reservation_users': reservation_users
    }
    return render(request, 'system/stionnement_page.html', context)


def sortie_stationnement(request, signal):
    if signal == 0:
        messages.error(request, "Mauvais réquette")
        return redirect('systeme:systeme_sortie')
    else:
        qr = read_qr_code(signal)
        if qr:
            place_libre, etat_place = place_vide()
            qrco_user_user = User.objects.filter(qr_id=qr)
            qrco_user_gestios = Gestion_reservation.objects.filter(qr_code=qr).filter(status=True)
            if qrco_user_user:
                qrco_user = qrco_user_user.get(qr_code=qr)
                stations = Stationnement.objects.filter(m_User=qrco_user).filter(status_stationnement=True)
                abonnement_users = Abonnement.objects.filter(m_User=qrco_user).filter(status_abonnement=True)
                reservation_users = Reservation.objects.filter(m_User=qrco_user).filter(status=True)
                if stations and abonnement_users:
                    stationnement_user = stations.get(m_User=qrco_user)
                    abonnement_user = abonnement_users.get(m_User=qrco_user)
                    etat_place[int(stationnement_user.numero_place) - 1] = '0'
                    Parking.objects.filter(id=stationnement_user.m_Parking.id).update(etat_place="".join(etat_place))
                    Stationnement.objects.filter(id=stationnement_user.id).update(status_stationnement=False,
                                                                                  heure_sortie=datetime.datetime.now(),
                                                                                  m_Paiement=abonnement_user.m_Paiement)
                    messages.success(request, 'sortie de stationnement autorisé!!!!')
                    return redirect("systeme:systeme_sortie")
                elif (stations and not abonnement_users) or (stations and not reservation_users):
                    stationnement_user = stations.get(m_User=qrco_user)
                    if stationnement_user.m_Parking == None:
                        messages.error(request, 'Veillez payer le stations en fin de pouvoir quitter')
                        return redirect("systeme:systeme_sortie")
                    else:
                        etat_place[int(stationnement_user.numero_place) - 1] = '0'
                        Parking.objects.filter(id=stationnement_user.m_Parking.id).update(
                            etat_place="".join(etat_place))
                        Stationnement.objects.filter(id=stationnement_user.id).update(status_stationnement=False,
                                                                                      heure_sortie=datetime.datetime.now())
                        messages.success(request, 'sortie de stationnement autorisé!!!!')
                        return redirect("systeme:systeme_sortie")
                elif stations and reservation_users:
                    stationnement_user = stations.get(m_User=qrco_user)
                    reservation_user = reservation_users.get(m_User=qrco_user)
                    if reservation_user.nombre_place == 1:
                        etat_place[int(stationnement_user.numero_place) - 1] = '2'
                        Parking.objects.filter(id=stationnement_user.m_Parking.id).update(
                            etat_place="".join(etat_place))
                        Stationnement.objects.filter(id=stationnement_user.id).update(status_stationnement=False,
                                                                                      heure_sortie=datetime.datetime.now(),
                                                                                      m_Paiement=reservation_user.m_Paiement)
                        messages.success(request, 'sortie de stationnement autorisé!!!!')
                        return redirect("systeme:systeme_sortie")
                    else:
                        messages.info(request, "Veillez utiliser utiliser le qr code de l'entrer du stationnement!!!!")
                        return redirect("systeme:systeme_sortie")
                else:
                    messages.error(request, "Impossible de quitter la ce stationnement, vous n'etes pas stationner")
                    return redirect("systeme:systeme_sortie")
            elif qrco_user_gestios:
                qrco_user_gestion = qrco_user_gestios.get(qr_code=qr)
                stations = Stationnement.objects.filter(m_User=qrco_user_gestion).filter(status_stationnement=True)
                if stations:
                    stationnement_user = stations.get(m_User=qrco_user_gestion)
                    etat_place[int(stationnement_user.numero_place) - 1] = '2'
                    Parking.objects.filter(id=stationnement_user.m_Parking.id).update(
                        etat_place="".join(etat_place))
                    Stationnement.objects.filter(id=stationnement_user.id).update(status_stationnement=False,
                                                                                  heure_sortie=datetime.datetime.now(),
                                                                                  m_Paiement=qrco_user_gestion.reservation_id.m_Paiement)
                    messages.success(request, 'sortie de stationnement autorisé!!!!')
                    return redirect("systeme:systeme_sortie")
                else:
                    messages.error(request, "Impossible de quitter la ce stationnement, vous n'etes pas stationner")
                    return redirect("systeme:systeme_sortie")
            else:
                messages.error(request, "QR CODE INVALIDE")
                return redirect("systeme:systeme_sortie")
        else:
            return redirect('systeme:systeme_sortie')
