from rest_framework import serializers

from locations.models import Location


class LocationSerializer(serializers.ModelSerializer):
    """ Location's serializer object for the api responses """
    class Meta:
        model = Location
        fields = [
            'id', 'geometry', 'tipo', 'latitude', 'longitude', 'color'
            ]