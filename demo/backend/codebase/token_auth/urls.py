from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)
from . import views

urlpatterns = [
    path('login/', views.MyObtainTokenPairView.as_view(), name="token_obtain_pair"),
    path('login/refresh/', TokenRefreshView.as_view(), name="token_refresh"),
    path('login/verify/', TokenVerifyView.as_view(), name="token_verify"),
    path('register/', views.RegisterView.as_view(), name="token_register")
]