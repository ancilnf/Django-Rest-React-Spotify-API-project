from django.db import models
from django.utils import timezone
import string
import random

def generate_unique_code():
    length = 6

    while True:
        code_check = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code_check).count() == 0:
            break
    return code_check


#models here
class Room(models.Model):
    code= models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at= models.DateTimeField(default= timezone.now)
    current_song = models.CharField(max_length=50, null=True)
