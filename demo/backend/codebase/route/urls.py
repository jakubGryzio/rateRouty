from django.urls import path

from . import views

urlpatterns = [
    path('', views.route_get_view, name='get_route')
]
