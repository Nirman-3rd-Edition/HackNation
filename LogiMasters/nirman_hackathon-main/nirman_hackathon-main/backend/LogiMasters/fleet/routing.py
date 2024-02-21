from django.urls import path
from .consumers import FleetTrackConsumer,NotificationToFleet

websocket_urlpatterns=[
    path('ws/fleettracking/<str:truckid>/',FleetTrackConsumer.as_asgi()),
    path('ws/sendnotification/<str:fleetuser>/',NotificationToFleet.as_asgi()),
]