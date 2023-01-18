from rest_framework.routers import DefaultRouter


from poi.viewsets import POIViewSet

router = DefaultRouter()
router.register('poi', POIViewSet, basename='poi')

urlpatterns = router.urls