from django.contrib import admin
from django.urls import path,include
from noteapp_django import views
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)
from .views import MyTokenObtainPairView
from django.views.generic import TemplateView

urlpatterns = [
    path('',TemplateView.as_view(template_name='index.html')),
    path('login/',TemplateView.as_view(template_name='index.html')),
    
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('allnotes/',views.notes_list,name="notes_list"),
    path('getroutes/',views.getroutes),
    path('add/',views.add_note,name="add_note"),
    path('verifyexists/',views.verifyexists),
    path('delete/',views.del_note,name="del_note"),
    path('update/',views.update_note,name="update_note"),
]