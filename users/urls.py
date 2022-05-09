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
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static

from EPARKING import settings
from . import views
from django.conf.urls.static import static
from EPARKING import settings
app_name = 'users'
urlpatterns = [
    path('', views.login_page, name='login_page'),
    path('signup/', views.signup, name='signup'),
    path('homee/', views.acceil, name='homee'),
    path('logout_user/', views.logout_user, name='logout_user'),
    path('gestionnaire/', views.admin_page, name='gestionnaire'),
    path('gestionnaire/<int:id>/update', views.user_update, name='user-update'),
    path('gestionnaire/<int:id>/delete', views.user_delete, name='user-delete'),
    path('homee/<int:id>/update', views.user_update, name='update-mycompte'),

]
