from django.urls import path
from . import views
from django.conf import settings

urlpatterns = [
    path('', views.getData),
    path('getRoute/', views.newData),
    path('imgpredict/', views.imagePredict),
    path('numberPredict/', views.numberPredict),
    path('videoPredict/',views.videoPredict)
]
