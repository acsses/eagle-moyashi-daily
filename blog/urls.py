from re import X
from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('serch/',views.serch,name='serch'),
    path('<str:pk>/',views.article,name='detail'),
    path('<str:blog_title>/', views.article, name='link'),
]