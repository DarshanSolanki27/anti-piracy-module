from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from .views import (
    CustomerPurchaseListView,
    CustomerRetrieveView,
    CustomerSignupView,
    ProductAuthenticationView,
    PurchaseCreateView
)

urlpatterns = [
    path('token/obtain', TokenObtainPairView.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),

    path('signup', CustomerSignupView.as_view()),
    path('purchase/<str:product>/<str:mac_id>',
         ProductAuthenticationView.as_view()),

    path('purchase', PurchaseCreateView.as_view()),
    path('<str:username>', CustomerRetrieveView.as_view()),
    path('<int:customer>/purchases', CustomerPurchaseListView.as_view()),
]
