from django.urls import path

from . import views

urlpatterns = [
    path('<int:pk>/', views.poi_detail_view, name='get_detail_poi'),
    path('', views.poi_list_view, name='get_list_poi'),
    path('create/', views.poi_create_view, name='get_post_poi'),
    path('update/<int:pk>/', views.poi_update_view, name='get_update_poi'),
    path('delete/<int:pk>/', views.poi_delete_view, name='get_delete_poi')
]

