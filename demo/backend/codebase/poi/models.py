from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class POI(models.Model):
    guid = models.CharField(default=999999, unique=True, max_length = 20)
    location = models.CharField(max_length = 120)
    type =  models.CharField(max_length = 120)
    name = models.CharField(max_length = 120, null=True, default= 'null')
    user = models.ForeignKey(User, default=1, null=True, on_delete=models.SET_NULL)
    