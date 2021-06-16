from typing import Text
from django.conf import Settings, settings
from django.db import models
from django.utils import timezone
from bs4 import BeautifulSoup
from django.templatetags.static import static
import os


class Post(models.Model):
    title = models.CharField(max_length=200)
    header_img = models.TextField()
    text = models.TextField()
    lead = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
    
    def lead(self):
        text=""
        try:
            print(os.getcwd())
            f=open(os.getcwd()+"/blog/static"+"/"+self.text)
            soup = BeautifulSoup(f, "html.parser")
            for sentence in soup.find_all("p"):
                text=text+sentence.text
                if len(text)>225:
                    break
            self.lead=text
        except FileNotFoundError:
            self.lead=""
    