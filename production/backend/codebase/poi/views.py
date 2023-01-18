from rest_framework import generics
from rest_framework.response import Response

from api.mixins import StaffEditorPermissionMixin, UserQuerysetMixin

from .models import POI
from .serializers import POISerializer


class POIDetailAPIView(
    UserQuerysetMixin,
    StaffEditorPermissionMixin, 
    generics.RetrieveAPIView):
    queryset = POI.objects.all()
    serializer_class = POISerializer

poi_detail_view = POIDetailAPIView.as_view()


class POIListCreateAPIView(
    UserQuerysetMixin,
    StaffEditorPermissionMixin,
    generics.ListCreateAPIView):
    queryset = POI.objects.all()
    serializer_class = POISerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        

poi_list_view = POIListCreateAPIView.as_view()


class POICreateAPIView(
    UserQuerysetMixin,
    generics.CreateAPIView):
    queryset = POI.objects.all()
    serializer_class = POISerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        try:
            self.perform_create(serializer)
            return Response(serializer.data)
        except Exception:
            return Response(serializer.data)

    def perform_create(self, serializer):
        return serializer.save(user = self.request.user)

poi_create_view = POICreateAPIView.as_view()


class POIUpdateAPIView(
    UserQuerysetMixin,
    StaffEditorPermissionMixin,
    generics.UpdateAPIView):
    queryset = POI.objects.all()
    serializer_class = POISerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        serializer.save()

poi_update_view = POIUpdateAPIView.as_view()


class POIDestroyAPIView(
    UserQuerysetMixin,
    StaffEditorPermissionMixin,
    generics.DestroyAPIView):
    queryset = POI.objects.all()
    serializer_class = POISerializer
    lookup_field = 'pk'

    def perform_destroy(self, instance):
        super().perform_destroy(instance)

poi_delete_view = POIDestroyAPIView.as_view()