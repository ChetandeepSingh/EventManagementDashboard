from django.contrib import admin
from .models import Event,RegisteredEvent
# Register your models here.

admin.site.register(Event)
admin.site.register(RegisteredEvent)