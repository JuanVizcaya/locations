from django.db import models
from django.contrib.gis.db.models import GeometryField
from django.contrib.gis.geos import GEOSGeometry


class Location(models.Model):
    """ Locations model to be mapped in the database """
    geometry = GeometryField(null=True,srid=4326)
    tipo = models.CharField(max_length=50)
    latitude = models.DecimalField(
        max_digits=14,decimal_places=8, default=0.0)
    longitude = models.DecimalField(
        max_digits=14,decimal_places=8, default=0.0)
    color = models.CharField(max_length=6)

    def save(self, *args, **kwargs):
        """ Overrided save method for making the geometry to be saved. """
        if not self.geometry:
            self.geometry = GEOSGeometry(f'SRID=4326;POINT({self.latitude} {self.longitude})')
        return super(Location, self).save(*args, **kwargs)

    def __str__(self):
        """ Model representation in the admin panel """
        return f'{self.id}'
