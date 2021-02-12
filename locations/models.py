from django.db import models
from django.contrib.gis.db.models import PointField

# Create your models here.
class Location(models.Model):
    the_geom = PointField(null=True,srid=4326)
    tipo = models.CharField(max_lenth=50)
    latitude = models.DecimalField(
        max_digits=14,decimal_places=8, default=0.0)
    longitude = models.DecimalField(
        max_digits=14,decimal_places=8, default=0.0)
    color = models.CharField(max_length=6)

    def __str__(self):
        return self.id
