from re import X
from django.urls import path
from . import views
from django.conf.urls.static import static

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('serch/',views.serch,name='serch'),
    path('add_page/', views.add_page, name='add_page'),
    path('new_page/',views.new_page,name='new_page'),
    path('<str:pk>/',views.article,name='detail'),
    path('<str:blog_title>/', views.article, name='link'),
]