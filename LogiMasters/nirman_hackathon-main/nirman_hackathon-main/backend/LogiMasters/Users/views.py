from django.shortcuts import render
from .models import FleetManagers
from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import RegisterFleetManagerSerializer,RegisterFleetSerializer
from .models import Fleets
# Create your views here.

class FleetManagerRegistration(viewsets.ModelViewSet):
    queryset=FleetManagers.objects.all()
    serializer_class=RegisterFleetManagerSerializer
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        data = request.data 
        serializer = RegisterFleetManagerSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({"Message": "Registration Successful", "token": str(token)}, status.HTTP_201_CREATED)
        
        print(serializer.errors)
        return Response({"Message": "Registration not Successful"}, status.HTTP_400_BAD_REQUEST)
    
class FleetRegistration(viewsets.ModelViewSet):
    queryset=Fleets.objects.all()
    serializer_class=RegisterFleetSerializer
    http_method_names=['post']

    def create(self, request, *args, **kwargs):
        data=request.data 
        print(data)
        data['companyName']=FleetManagers.objects.get(CompanyName=data['companyName']).id 
        serializer=self.serializer_class(data=data)
        if serializer.is_valid():
            user=serializer.save()
            return Response({"Message":"Registration Successfull"},status.HTTP_201_CREATED)
        return Response({"Message":"Registration not successfull"},status.HTTP_201_CREATED)