from dataclasses import field
from rest_framework import serializers

from api.serializers import UserPublicSerializer
from poi.serializers import POISerializer
from poi.models import POI
from .models import Rating

class RatingSerializer(serializers.ModelSerializer):
    owner = UserPublicSerializer(source='user', read_only=True)
    created_date = serializers.DateTimeField(source='created_at', read_only=True)
    updated_date = serializers.DateTimeField(source='updated_at', read_only=True)
    poi = POISerializer(read_only=True, source='guid')
    guid = serializers.CharField(write_only=True)
    class Meta:
        model = Rating
        fields = [
            'pk',
            'guid',
            'poi',
            'value',
            'created_date',
            'updated_date',
            'owner'
        ]
        
    