from rest_framework import generics

from api.mixins import StaffEditorPermissionMixin, UserQuerysetMixin

from .models import Rating
from .serializers import RatingSerializer
from poi.models import POI
from rest_framework.response import Response
from django.conf import settings


class RatingDetailAPIView(
    UserQuerysetMixin,
    StaffEditorPermissionMixin,
    generics.RetrieveAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

rating_detail_view = RatingDetailAPIView.as_view()


class RatingListCreateAPIView(
    UserQuerysetMixin,
    generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

rating_list_view  = RatingListCreateAPIView.as_view()

class FavoriteRatingListCreateAPIView(
    UserQuerysetMixin,
    generics.ListCreateAPIView):
    favorite_value = 3
    queryset = Rating.objects.filter(value=favorite_value)
    serializer_class = RatingSerializer

favorite_rating_list_view  = FavoriteRatingListCreateAPIView.as_view()


class RatingCreateAPIView(
    UserQuerysetMixin,
    generics.CreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    
    def perform_create(self, serializer):
        guid = serializer.validated_data['guid']
        poi = POI.objects.get(guid=guid)
        return serializer.save(user=self.request.user, guid=poi)

rating_create_view = RatingCreateAPIView.as_view()


class RatingUpdateAPIView(
    UserQuerysetMixin,
    StaffEditorPermissionMixin,
    generics.UpdateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        serializer.save()
        
rating_update_view = RatingUpdateAPIView.as_view()

class RatingDestroyAPIView(
    UserQuerysetMixin,
    StaffEditorPermissionMixin,
    generics.DestroyAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    lookup_field = 'pk'

    def perform_destroy(self, instance):
        super().perform_destroy(instance)

rating_delete_view = RatingDestroyAPIView.as_view()

class RatingAttributesCreateAPIView(
    generics.CreateAPIView):
    
    def post(self, request):
        try:
            data = request.data
            attributes = {key: value for key, value in data.items() if key != 'guid'}
            settings.REDIS_INSTANCE.hmset(f'Rating:{data["guid"]}', attributes)
            settings.REDIS_INSTANCE.bgsave(False)
            return Response(data)
        except Exception:
            Response({"invalid": f"{data} is invalid data"})

rating_attributes_create_view = RatingAttributesCreateAPIView.as_view()


class RatingAttributesCreateAPIView(
    generics.RetrieveAPIView):
    
    def get(self, request, guid):
        type = request.GET.get('type')
        keys = [key for key in settings.REDIS_INSTANCE.keys(f'Rating:{guid}')]
        data = settings.REDIS_INSTANCE.hgetall(f'rating_{type}')
        if keys:
            for key in keys:
                data = settings.REDIS_INSTANCE.hgetall(key)
                return Response(data)
        return Response(data)

rating_attributes_detail_view = RatingAttributesCreateAPIView.as_view()



