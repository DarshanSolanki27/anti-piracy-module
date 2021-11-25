from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from .views import (
    CompanySignupView,
    CompanyRetrieveView,
    ProductListCreateView,
    ProductListView
)

urlpatterns = [
    path('token/obtain', TokenObtainPairView.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),

    path('signup', CompanySignupView.as_view()),
    path('u/<str:username>', CompanyRetrieveView.as_view()),

    path('products', ProductListView.as_view()),
    path('<int:id>/products', ProductListCreateView.as_view()),
]
