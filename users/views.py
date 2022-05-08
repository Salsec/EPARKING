from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect


from . import forms

# Create your views here.
from .forms import SignupForm, UpdateForm
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
<<<<<<< HEAD
    return render(request, 'new/admin_page.html')
=======
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
            return redirect('users:administrator')
    else:
        form = forms.SignupForm()
    clients = User.objects.all().order_by('-id')
    return render(request, 
                'new/admin_page.html', 
                context={'form': form, 'clients': clients})
>>>>>>> 07fecf520fd1b4483c659ad38f960b6dcd1d60fb


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
                    return redirect('users:homee')
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


def user_update(request, id):
    is_update=True
    userUpdate = User.objects.get(id=id)
    if request.method == 'POST':
        form = forms.UpdateForm(request.POST, instance=userUpdate)
        if form.is_valid():
            form.save()
            return redirect('users:administrator')
    else:
        form = forms.UpdateForm(instance=userUpdate)   
    return render(request, 
                'new/admin_page.html', 
                context={'form': form, 'userUpdate':userUpdate, 'is_update':is_update})


def user_delete(request, id):
    is_deleted=True
    userDelete = User.objects.get(id=id)
    if request.method == 'POST':
        userDelete.delete()
        return redirect('users:administrator')
    return render(request, 
                'new/admin_page.html',
                context={'userDelete': userDelete,  'is_deleted':is_deleted,})

