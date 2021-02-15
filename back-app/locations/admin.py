from django.contrib import admin
from locations.models import Location


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    """ Locations addet to the admin panel """
    search_fields = ('id', 'tipo', 'color')
