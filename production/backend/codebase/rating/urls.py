from django.urls import path

from . import views

urlpatterns = [
    path('<int:pk>/', views.rating_detail_view, name='get_detail_rating'),
    path('', views.rating_list_view, name='get_list_rating'),
    path('favorite/', views.favorite_rating_list_view, name='get_favorite_list_rating'),
    path('create/', views.rating_create_view, name='get_post_rating'),
    path('update/<int:pk>', views.rating_update_view, name='get_update_rating'),
    path('delete/<int:pk>', views.rating_delete_view, name='get_delete_rating'),
    path('attributes/create/', views.rating_attributes_create_view, name='get_post_rating_attributes'),
    path('attributes/<guid>', views.rating_attributes_detail_view, name='get_detail_rating_attributes'),
    path('user_attributes/create/', views.rating_user_attributes_create_view, name='get_post_rating_user_attributes'),
    path('user_attributes/<guid>', views.rating_user_attributes_detail_view, name='get_detail_rating_user_attributes'),
    path('user_attributes/update/<guid>', views.rating_user_attributes_update_view, name='get_update_rating_user_attributes'),
    path('user_attributes/delete/<guid>', views.rating_user_attributes_delete_view, name='get_delete_rating_user_attributes')
]

