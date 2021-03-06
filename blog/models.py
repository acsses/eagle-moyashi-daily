from typing import Text
from django.conf import Settings, settings
from django.db import models
from django.utils import timezone
from bs4 import BeautifulSoup
from django.templatetags.static import static
import os
from PIL import Image

class Post(models.Model):
    id_url=models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    header_img = models.TextField()
    text = models.TextField()
    lead = models.TextField()
    tag = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)

    def publish(self):
        self.published_date = timezone.now()
        img=Image.open(os.getcwd()+"/blog/static"+"/"+self.header_img)
        img.resize((3000,2000))
        img.save(os.getcwd()+"/blog/static"+"/"+self.header_img)
        self.save()

    def __str__(self):
        return self.title

    def image_set(self):
        img=Image.open(os.getcwd()+"/media"+"/"+self.header_img)
        print("hi")
        img.resize((3000,2000))
        img.save(os.getcwd()+"/blog/static"+"/"+self.header_img)
    
    def lead(self):
        text=""
        try:
            f=self.text
            soup = BeautifulSoup(f, "html.parser")
            for sentence in soup.find_all("p"):
                text=text+sentence.text
                if len(text)>110:
                    break
            self.lead=text
        except FileNotFoundError:
            self.lead=""
    