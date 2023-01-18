from rest_framework import serializers
from django.db.models import Avg

from api.serializers import UserPublicSerializer
from .models import POI


class POISerializer(serializers.ModelSerializer):
    owner = UserPublicSerializer(source='user', read_only=True)
    rating = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = POI
        fields = [
            'pk',
            'guid',
            'location',
            'name',
            'type',
            'owner',
            'rating'
        ]

    def get_rating(self, obj):
        poi = obj
        rating_value = list(poi.rating_set.aggregate(Avg('value')).values())[0]
        if rating_value is not None:
            return round(rating_value, 1)
        return rating_value
