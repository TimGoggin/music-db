from django.contrib import admin

from .models import User, Artist, Rating, Genre

admin.site.register(User)
admin.site.register(Artist)
admin.site.register(Rating)
admin.site.register(Genre)