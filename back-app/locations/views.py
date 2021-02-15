from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from locations.models import Location
from locations.serializers import LocationSerializer


class LocationsViewset(viewsets.ViewSet):
    """ ViewSet object to process the Locations API requests """
    def list(self, request):
        """ GET: Method that responds all the locations in the Locations tables
        Args:
            request (request): request recibed from the client.
        Returns:
            JSON: A list with all the locations in the database.
        """
        locations = Location.objects.all()
        serialized = LocationSerializer(locations, many=True)
        return Response(serialized.data, status=status.HTTP_200_OK)

    def create(self, request):
        """ POST: Create new objects in the Locations model
        Args:
            request (request): request recibed from the client.
        Returns:
            JSON: The successfully saved object.
        """
        serializer = LocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'status': 'Location successfuly saved!'},
                status=status.HTTP_201_CREATED)

        return Response(serializer.error_messages ,status=status.HTTP_400_BAD_REQUEST)
