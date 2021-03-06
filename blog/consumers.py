from email.mime import image
import json

from channels.db import database_sync_to_async
from channels.generic.websocket import JsonWebsocketConsumer

from .models import Post

import requests
from bs4 import BeautifulSoup


class Consumer(JsonWebsocketConsumer):
    def connect(self):
        self.accept()

    def receive_json(self, data):
        print(data)
        send_data={}
        try:
            html= requests.get(data["data"])
            soup = BeautifulSoup(html.content, "html.parser")
            print()
            try:
                title=soup.find("meta",property="og:title")['content']
            except:
                title=""
            try:
                description=soup.find("meta",property="og:description")['content']
            except:
                description=""
            try:
                image=soup.find("link",rel="shortcut icon")['href']
            except:
                try:
                    image=soup.find("link",rel="fluid-icon")['href']
                except:
                    image=""
            send_data={
                "title":title,
                "descriptin":description,
                "image":image
            }
        except:
            send_data={}

        print(send_data)
        return self.send(json.dumps({
            "type": "websocket.accept",
            "send": send_data
        }))