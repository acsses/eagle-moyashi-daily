from django.urls import path

from .consumers import Consumer

websocket_urlpatterns = [
    path('ws/test', Consumer.as_asgi()),
]