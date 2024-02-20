from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class FleetManagers(AbstractUser):
    CompanyName=models.CharField(max_length=50)

class Fleets(models.Model):
    companyName = models.ForeignKey(FleetManagers, on_delete=models.CASCADE)
    hardware_id = models.CharField(max_length=100, unique=True)
    registration_no = models.CharField(max_length=20, unique=True)
    mobile_no = models.CharField(max_length=10,null=True)

    def __str__(self):
        return self.registration_no
    class Meta:
        verbose_name_plural="Fleet"