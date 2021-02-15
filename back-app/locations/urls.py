from django.urls import path, include
from rest_framework.routers import DefaultRouter
from locations.views import LocationsViewset


locations_router = DefaultRouter()
locations_router.register('', LocationsViewset, basename='locations')

urlpatterns = [
    path('locations/', include(locations_router.urls)),
]
