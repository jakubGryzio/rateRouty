from unittest import result
from urllib import request
from rest_framework import generics

from poi.models import POI
from poi.serializers import POISerializer


class SearchListView(generics.ListAPIView):
    queryset = POI.objects.all()
    serializer_class = POISerializer

    def get_queryset(self, *args, **kwargs):
        qs = super().get_queryset(*args, **kwargs)
        query = self.request.GET.get('q')
        user = None
        if query is None:
            return POI.objects.none()

        if self.request.user.is_authenticated:
            user = self.request.user
        results = qs.search(query, user=user)
        return results
