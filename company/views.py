from rest_framework.views import APIView
from rest_framework.status import (
    HTTP_201_CREATED, HTTP_400_BAD_REQUEST
)
from rest_framework.response import Response
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveAPIView
)
from rest_framework.parsers import (
    MultiPartParser,
    FormParser
)

from .models import (
    Company,
    Product
)
from .serializers import (
    CompanySignupSerializer,
    CompanySerializer,
    ProductSerializer
)


class CompanySignupView(APIView):
    serializer_class = CompanySignupSerializer

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


class CompanyRetrieveView(RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    lookup_field = 'username'


class CompanyDetailView(RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    lookup_field = 'id'


class ProductListCreateView(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return self.queryset.filter(company=self.kwargs['company'])


class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'
