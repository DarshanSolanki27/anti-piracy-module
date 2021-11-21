from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from .views import (
    CustomerSignupView,
    ProductAuthenticationView
)

urlpatterns = [
    path('token/obtain', TokenObtainPairView.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),

    path('signup', CustomerSignupView.as_view()),
    path('product/<int:product>/<str:mac_id>', ProductAuthenticationView.as_view())
]
