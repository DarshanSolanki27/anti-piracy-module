from rest_framework.views import APIView
from rest_framework.status import (
    HTTP_201_CREATED, HTTP_400_BAD_REQUEST
)
from rest_framework.response import Response
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
    get_object_or_404
)

from .models import Customer, Purchase
from .serializers import (
    CustomerSignupSerializer,
    CustomerSerializer,
    ProductAuthenticationSerializer,
    PurchaseSerializer
)


class CustomerSignupView(APIView):
    serializer_class = CustomerSignupSerializer

    def post(self, request, format=None):
        email = request.data.get('email')
        if email is None:
            return Response({'email': ['Email Required']}, status=HTTP_400_BAD_REQUEST)

        password = request.data.get('password')
        if password is None:
            return Response({'password': ['Password Required']}, status=HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.create(validated_data=serializer.validated_data)
            user.save()

            return Response(status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


"""
Reference https://www.django-rest-framework.org/api-guide/generic-views/#creating-custom-mixins
"""


class MultipleFieldLookupMixin:
    """
    Apply this mixin to any view or viewset to get multiple field filtering
    based on a `lookup_fields` attribute, instead of the default single field filtering.
    """

    def get_object(self):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        for field in self.lookup_fields:
            if self.kwargs[field]:  # Ignore empty fields.
                filter[field] = self.kwargs[field]
        obj = get_object_or_404(queryset, **filter)  # Lookup the object
        self.check_object_permissions(self.request, obj)
        return obj


class ProductAuthenticationView(MultipleFieldLookupMixin, UpdateAPIView):
    queryset = Purchase.objects.all()
    serializer_class = ProductAuthenticationSerializer
    lookup_fields = ['product', 'mac_id']


class CustomerRetrieveView(RetrieveAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    lookup_field = 'username'


class CustomerPurchaseListView(ListAPIView):
    queryset = Purchase
    serializer_class = PurchaseSerializer
    lookup_field = 'customer'
