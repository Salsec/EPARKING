from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect


from . import forms

# Create your views here.
from .forms import SignupForm
from .models import User


def acceil(request):
    if not request.user.is_authenticated:
        return redirect('users:login_page')
    return render(request, 'new/homet.html')


def re_404(request):
    return render(request, '404.html')


def admin_page(request):
    if not request.user.is_authenticated:
        return redirect('users:login_page')
    return render(request, 'new/admin_page.html')


# views.py
def login_page(request):
    message = ''
    if request.method == 'POST':
        form = forms.LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user is not None:
                login(request, user)
                if user.is_superuser:
                    return redirect('admin:index')
                elif user.is_staff:
                    return redirect('users:administrator')
                else:
                    return redirect('systeme:stationnement_page')
            else:
                message = messages.error(request, "Identifiants invalides!")
        else:
            message = messages.error(request, "Identifiants invalides!")
    else:
        form = forms.LoginForm()

    return render(request, 'new/login.html', context={'form': form, 'message': message})


def signup(request):
    form = forms.SignupForm()
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = User.objects.create_user(email=form.cleaned_data['email'],
                                            username=form.cleaned_data['username'],
                                            first_name=form.cleaned_data['first_name'],
                                            last_name=form.cleaned_data['last_name'],
                                            telephone=form.cleaned_data['telephone'], )
            user.set_password(form.cleaned_data['password'])
            user.save()
            return redirect('users:login_page')
    return render(request, 'new/sigup.html', context={'form': form})


def logout_user(request):
    logout(request)
    return redirect('users:login_page')
