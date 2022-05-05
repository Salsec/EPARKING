"""EPARKING URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path

from . import views

app_name = 'systeme'
urlpatterns = [
    # path('', views.login_page, name='login_page'),
    path('station_entrer/<str:signal>/', views.entrer_stationnement, name='station_entrer'),
    path('reservation_detail/<str:pk>/', views.reservation_qr_code, name='reservation_detail'),
    path('home', views.read_qr_code, name='home'),
    path('hom', views.station_recent, name='hom'),
    path('reserv', views.reservation_page, name='reserv'),
    path('systeme', views.systeme, name='systeme'),
]
