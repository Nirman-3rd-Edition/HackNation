from channels.routing import URLRouter,ProtocolTypeRouter
import os
import fleet.routing
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'LogiMasters.settings')

application=ProtocolTypeRouter({
    'http':get_asgi_application(),
    'websocket':AuthMiddlewareStack(URLRouter(fleet.routings.websocket_urlpatterns)),
})