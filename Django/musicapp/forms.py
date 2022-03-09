from django import forms

class RegisterForm(forms.Form):
    username = forms.CharField(label='Username', max_length=255)
    password = forms.CharField(label='Password', max_length=255)

class RetrieveForm(forms.Form):
    username = forms.CharField(label='Username', max_length=255)

class GenreForm(forms.Form):
    primary_genre = forms.CharField(label='Primary_genre', max_length=255)