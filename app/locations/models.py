from django.db import models
from django.contrib.gis.db.models import GeometryField


class Location(models.Model):
    geometry = GeometryField(null=True,srid=4326)
    tipo = models.CharField(max_length=50)
    latitude = models.DecimalField(
        max_digits=14,decimal_places=8, default=0.0)
    longitude = models.DecimalField(
        max_digits=14,decimal_places=8, default=0.0)
    color = models.CharField(max_length=6)

    def __str__(self):
        return self.id
