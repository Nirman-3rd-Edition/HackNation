import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'LogiMasters.settings')
import django
django.setup()

from asgiref.sync import sync_to_async

from Users.models import Fleets
from .models import LocationInfo
from channels.generic.websocket import AsyncJsonWebsocketConsumer

class FleetTrackConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        print("Websocket connected...")
        
        self.group_name=self.scope['url_route']['kwargs']['truckid']

        fleet_exists = await sync_to_async(Fleets.objects.filter)(hardware_id=self.group_name)
        exists = await sync_to_async(fleet_exists.exists)()
        if exists:
            print("log1")
            await self.channel_layer.group_add(self.group_name,self.channel_name)
            await self.accept()
        # else:
        #     self.disconnect()

    async def receive_json(self, content, **kwargs):
        print("Message received...",content['latitude'])    
        truck_hardware_id=self.scope['url_route']['kwargs']['truckid']
        # print(self.group_name)
        fleet=await sync_to_async(Fleets.objects.get)(hardware_id=truck_hardware_id)
        print("log2")
        loc_info=LocationInfo(
            fleet=fleet,
            latitude=content['latitude'],
            longitude=content['longitude']
        )
        await sync_to_async(loc_info.save)()
        await self.channel_layer.group_send(self.group_name,{
            'type':'show.location', 
            'message':content
        })

    async def show_location(self,event):
        print("Location found",event)
        await self.send_json({
            'type':'websocket.send',
            'text':event['message']
        })

    async def disconnect(self, code):
        return await super().disconnect(code)


class NotificationToFleet(AsyncJsonWebsocketConsumer):

    async def connect(self):
        self.group_name=self.scope['url_route']['kwargs']['fleetuser']
        await self.channel_layer.group_add(self.group_name,self.channel_name)
        await self.accept()

    async def receive_json(self, content, **kwargs):
        print(content)
        await self.channel_layer.group_send(self.group_name,{
            'type':'send.notification', 
            'message':content
        })
    
    async def send_notification(self,notification):
        await self.send_json({
            'type':'websocket.send',
            'text':notification['message']
        })

    async def disconnect(self, code):
        return await super().disconnect(code)