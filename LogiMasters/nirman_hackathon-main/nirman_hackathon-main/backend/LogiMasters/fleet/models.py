from django.db import models
from Users.models import Fleets,FleetManagers

# Create your models here.
class LocationInfo(models.Model):

    fleet=models.ForeignKey(Fleets,on_delete=models.CASCADE)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.fleet.registration_no}'s location at {self.timestamp}"