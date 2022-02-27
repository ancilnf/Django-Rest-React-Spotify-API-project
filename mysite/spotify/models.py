from django.db import models
from django.utils import timezone
from apiA.models import Room

class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at= models.DateTimeField(default= timezone.now)
    refresh_token = models.CharField(max_length=50,null=True)
    access_token = models.CharField(max_length=50)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)

class Vote(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at= models.DateTimeField(default= timezone.now)
    song_id = models.CharField(max_length=50)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
