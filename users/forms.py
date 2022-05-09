from django import forms

from systeme.models import Reservation
from users.models import User


class LoginForm(forms.Form):
    username = forms.CharField(max_length=150)
    password = forms.CharField(max_length=150, widget=forms.PasswordInput)


class SignupForm(forms.Form):
    username = forms.CharField(max_length=150, widget=forms.TextInput(attrs={"class": "form-control"}))
    email = forms.EmailField(max_length=150, widget=forms.EmailInput(attrs={"class": "form-control"}))
    first_name = forms.CharField(label="Nom", max_length=50, widget=forms.TextInput(attrs={"class": "form-control"}))
    last_name = forms.CharField(label="Prenom", max_length=50, widget=forms.TextInput(attrs={"class": "form-control"}))
    telephone = forms.IntegerField(widget=forms.NumberInput(attrs={"class": "form-control"}))
    password = forms.CharField(max_length=150, widget=forms.PasswordInput(attrs={"class": "form-control"}))
    password_conf = forms.CharField(max_length=150, widget=forms.PasswordInput(attrs={"class": "form-control"}))

    def clean_email(self):
        value = self.cleaned_data['email'].strip()
        if User.objects.filter(email=value):
            raise forms.ValidationError("That email is already taken")
        return value

    def clean_username(self):
        value = self.cleaned_data['username'].strip()
        if User.objects.filter(username=value):
            raise forms.ValidationError("That username is already taken")
        return value

    def clean_nom(self):
        value = self.cleaned_data['first_name'].strip()
        return value

    def clean_prenom(self):
        value = self.cleaned_data['last_name'].strip()
        return value

    def clean_telephone(self):
        value = self.cleaned_data['telephone']
        return value

    def clean(self):
        cleaned_data = super().clean()
        if cleaned_data['password'] != cleaned_data['password_conf']:
            raise forms.ValidationError("The passwords you entered did not match")


class UpdateForm(forms.ModelForm):
    class Meta:
       model = User
       exclude = ('password', 'password_conf') 
       fields = ('email','username','first_name','last_name','telephone','password', 'password_conf')
    email = forms.EmailField(widget=forms.EmailInput(attrs={"class": "form-control"}))
    username = forms.CharField(widget=forms.TextInput(attrs={"class": "form-control"}))
    first_name = forms.CharField(widget=forms.TextInput(attrs={"class": "form-control"}))
    last_name = forms.CharField(widget=forms.TextInput(attrs={"class": "form-control"}))
    telephone = forms.IntegerField(widget=forms.NumberInput(attrs={"class": "form-control"}))
    #password = forms.CharField(max_length=150, widget=forms.PasswordInput(attrs={"class": "form-control"}))
   # password_conf = forms.CharField(max_length=150, widget=forms.PasswordInput(attrs={"class": "form-control"}))



