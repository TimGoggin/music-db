from django.shortcuts import render
from django.http import HttpResponse
from .models import User, Artist, Rating
from .forms import RegisterForm, RetrieveForm, GenreForm


# Create your views here.
def index(request):
    return render(request, "index.html")

def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)

        if form.is_valid():
            user = form.cleaned_data['username']
            passw = form.cleaned_data['password']
            try:
                u = User.objects.get(pk=user)
            except:
                u = User.objects.create(username=user, password=passw)
                u.save()
                context = {'form':form, 'submittext':'Successfully registered!'}
            else:
                context = {'form':form, 'submittext':'Username already taken!'}
            return render(request, "register.php", context)
    else:
        form = RegisterForm()
    
    context = {'form':form, 'submittext':''}
    return render(request, "register.php",{'form':form})

def retrieve(request):
    if request.method == 'GET':
        form = RetrieveForm(request.GET)

        if form.is_valid():
            try:
                u = User.objects.get(pk=request.GET['username'])
            except:
                context = {'form':form, 'ratings':Rating.objects.none(), 'auxtext':"Not a valid user!"}
            else:
                context = {'form':form, 'ratings':Rating.objects.filter(username=u), 'auxtext':""}
            return render(request, "retrieve.php", context)
    else:
        form = RetrieveForm()
    
    context = {'form':form, 'ratings':Rating.objects.none(), 'auxtext':""}
    return render(request, "retrieve.php", context)

def genres(request):
    if request.method == 'GET':
        form = GenreForm(request.GET)

        if form.is_valid():
            u = Artist.objects.filter(genre__sub_genre=request.GET['primary_genre'])
            if(len(u) == 0):
                context = {'form':form, 'ratings':Artist.objects.none(), 'auxtext':"No songs with that genre!"}
            else:
                context = {'form':form, 'ratings':u, 'auxtext':"Number of songs with genre " + request.GET['primary_genre'] + ": " + str(len(u))}
            return render(request, "genres.php", context)
    else:
        form = GenreForm()
    
    context = {'form':form, 'ratings':Artist.objects.none(), 'auxtext':""}
    return render(request, "genres.php", context)