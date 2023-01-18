from django.db import models
from django.conf import settings

from poi.models import POI

User = settings.AUTH_USER_MODEL

class Rating(models.Model):

    class Value(models.IntegerChoices):
        LOW = 1
        AVERAGE = 2
        HIGH = 3

    value = models.IntegerField(choices=Value.choices, default=Value.AVERAGE)
    user = models.ForeignKey(User, default=1, null=True, on_delete=models.SET_NULL)
    guid = models.ForeignKey(POI, default=999999, to_field='guid', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
