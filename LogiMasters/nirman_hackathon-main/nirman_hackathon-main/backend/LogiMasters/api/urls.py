from Users.views import FleetManagerRegistration
# /FleetRegistration

from django.urls import path,include
from rest_framework.routers import DefaultRouter 

router=DefaultRouter()

router.register(r'fleetmanagerregistration',FleetManagerRegistration,basename='fleetmanagerregistration')
# router.register(r'fleetregistration',FleetRegistration,basename='fleetregistration')

urlpatterns = router.urls

urlpatterns=[
    path('',include(router.urls))
]
