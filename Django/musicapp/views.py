from django.shortcuts import render
from django.http import HttpResponse
from .models import User, Artist, Rating
from .forms import RegisterForm


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
    return render(request, "retrieve.php")

def results(request):
    string = ""
    try:
        u = User.objects.get(pk=request.GET['username'])
    except User.DoesNotExist:
        string = "User not found in database!"
        return HttpResponse(string)
    else:
        ratings = Rating.objects.filter(username=u)
        context = {'username':request.GET['username'], 'ratings':ratings}
        return render(request, "results.html", context)