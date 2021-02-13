from rest_framework import serializers

from locations.models import Location


class LocationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Location
        fields = [
            'id', 'the_geom', 'tipo', 'latitude', 'longitude', 'color'
            ]