from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import note
from django.db.models import Q
from .serializers import NoteSerializer
import os
from django.shortcuts import render
from django.conf import settings
import json
from django.http import JsonResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notes_list(request):
    user=request.user
    notes=note.objects.filter(owner=user).order_by("-id")
    serializer=NoteSerializer(notes,many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_note(request):
    user=request.user
    count=note.objects.filter(owner=user).count() + 1
    currentNote=note.objects.create(owner=user)
    currentNote.title="New Note "+str(count)
    currentNote.body="Body of Note "+str(count)
    currentNote.save()
    return Response({"status":True})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def del_note(request):
    id=request.data.get("id", "null")
    note.objects.get(id=id).delete()
    return Response({"status":True})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_note(request):
    id=request.data.get("id", None)
    type = request.data.get("type", "")
    txt = request.data.get("txt", "")
    note_to_be_updated=note.objects.get(id=id)
    if type=="title":
        note_to_be_updated.title=txt
    else:
        note_to_be_updated.body=txt
    note_to_be_updated.save()
    return Response({"status":True})

def getroutes(request):
    directories1=os.listdir(str(settings.BASE_DIR))
    directories2=os.listdir(str(settings.BASE_DIR)+'noteapp_react/')
    # directories3=os.listdir(str(settings.BASE_DIR)+'noteapp_react/build/')
    dict={"entries1":directories1,
          "entries2":directories2,
        #   "entries3":directories3
          }
    return JsonResponse(dict)

@api_view(['POST'])
def verifyexists(request):
    email=request.data.get("email", None)
    username=email.split("@")[0]
    password="JFek54}T@p0$#Q"
    if (User.objects.filter(username=username).exists()):
       pass
    else:
        User.objects.create(username=username,password=password)

    return Response({"status":True,"username":username,"password":password})

# @api_view(['GET'])
# def getRoutes(request):
#     routes=[
#         '/api/token',
#         '/api/token/refresh'
#     ]
#     return Response(routes)