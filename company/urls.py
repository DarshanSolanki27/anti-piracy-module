from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from .views import (
    CompanyDetailView,
    CompanySignupView,
    CompanyRetrieveView,
    ProductDetailView,
    ProductListCreateView,
    ProductListView
)

urlpatterns = [
    path('token/obtain', TokenObtainPairView.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),

    path('signup', CompanySignupView.as_view()),
    path('u/<int:id>', CompanyDetailView.as_view()),
    path('u/<str:username>', CompanyRetrieveView.as_view()),

    path('products/<int:id>', ProductDetailView.as_view()),
    path('products', ProductListView.as_view()),
    path('<int:company>/products', ProductListCreateView.as_view()),
]
