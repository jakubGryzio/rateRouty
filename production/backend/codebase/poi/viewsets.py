from rest_framework import viewsets

from .models import POI
from .serializers import POISerializer

class POIViewSet(viewsets.ModelViewSet):
    queryset = POI.objects.all()
    serializer_class = POISerializer
    lookup_field = 'pk'

    